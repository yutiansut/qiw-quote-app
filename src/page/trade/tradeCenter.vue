<template>
	<div id="tradeCenter">
		<div v-if="length > 0">
			<div class="tips">
				<span :class="{red: parameters[0].LastQuotation.LastPrice > parameters[0].LastQuotation.PreSettlePrice, green: parameters[0].LastQuotation.LastPrice < parameters[0].LastQuotation.PreSettlePrice}">{{parameters[0].LastQuotation.LastPrice | fixNum(parameters[0].DotSize)}}</span>
				<span :class="{green: parameters[0].LastQuotation.ChangeRate < 0, red: parameters[0].LastQuotation.ChangeRate > 0}"><em v-show="parameters[0].LastQuotation.ChangeRate > 0">+</em>{{parameters[0].LastQuotation.ChangeValue | fixNum(parameters[0].DotSize)}}</span>
				<span :class="{green: parameters[0].LastQuotation.ChangeRate < 0, red: parameters[0].LastQuotation.ChangeRate > 0}"><em v-show="parameters[0].LastQuotation.ChangeRate > 0">+</em>{{parameters[0].LastQuotation.ChangeRate | fixNumTwo}}%</span>
				<p>成交量：<em>{{parameters[0].LastQuotation.TotalVolume}}</em></p>
			</div>
			<div class="fens_title">
				<span @tap="showFens">分时图</span>
				<i class="icon icon_triangle" @tap="showFens"></i>
				<button>规则</button>
			</div>
			<div class="fens_box">
				<div id="fens"></div>
				<div id="volume"></div>
			</div>
			<div class="buy_one">
				<div class="col">
					<em>卖一</em>
					<span :class="{red: parameters[0].LastQuotation.AskPrice1 > parameters[0].LastQuotation.PreSettlePrice, green: parameters[0].LastQuotation.AskPrice1 < parameters[0].LastQuotation.PreSettlePrice}">{{parameters[0].LastQuotation.AskPrice1 | fixNum(parameters[0].DotSize)}}</span>
					<em>{{parameters[0].LastQuotation.AskQty1}}</em>
				</div>
				<div class="col">
					<em>买一</em>
					<span :class="{red: parameters[0].LastQuotation.BidPrice1 > parameters[0].LastQuotation.PreSettlePrice, green: parameters[0].LastQuotation.BidPrice1 < parameters[0].LastQuotation.PreSettlePrice}">{{parameters[0].LastQuotation.BidPrice1 | fixNum(parameters[0].DotSize)}}</span>
					<em>{{parameters[0].LastQuotation.BidQty1}}</em>
				</div>
			</div>
		</div>
		<div class="order_type">
			<template v-for="(v, index) in orderList">
				<span :class="{current: currentOrderType == index}" @touchstart="orderTypeSwitch(index)">{{v}}</span>
			</template>
		</div>
		<div class="order_cont">
			<component :is="currentOrderView"></component>
		</div>
	</div>
</template>

<script>
	import normalOrder from "./normalOrder.vue"
	import conditionOrder from "./conditionOrder.vue"
	export default{
		name: "trade",
		components: {normalOrder, conditionOrder},
		data(){
			return{
				currentOrderType: 0,
				orderList: ['普通单','条件单'],
				currentOrderView: 'normalOrder',
				fensShow: false,
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			currentNo(){
				return this.$store.state.market.currentNo;
			},
			currentdetail(){
				return this.$store.state.market.currentdetail;
			},
			commodityAll(){
				return this.$store.state.account.commodityAll;
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			length(){
				return this.$store.state.market.Parameters.length;
			},
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			}
		},
		watch: {
			length: function(n, o){
				if(n && n == 1){
					this.$store.state.market.currentdetail = this.parameters[0];
					this.$parent.totalShow = true;
//					this.parameters.forEach((o, i) => {
//						if(o.CommodityNo == this.currentNo && i == 0){
//							this.$store.state.market.currentdetail = o;
//							return;
//						}
//					});
				}
			},
			currentOrderView: function(n, o){
				if(n && n == 0){
					this.currentOrderView = 'normalOrder';
				}else{
					this.currentOrderView = 'conditionOrder';
				}
			}
		},
		methods: {
			orderTypeSwitch: function(index){
				console.log(1111);
				//初始当前合约
				this.$store.state.market.currentNo = this.commodityAll[0].commodityNo;
				this.$store.state.market.Parameters = [];
				this.$store.state.market.commodityOrder = [];
				this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + this.orderTemplist[this.currentNo].ExchangeNo + '","CommodityNo":"' + this.currentNo + '","ContractNo":"' + this.orderTemplist[this.currentNo].MainContract +'"}}');
				//初始化持仓合约行情
				let holdOrder = localStorage.subscribeOrder ?　JSON.parse(localStorage.subscribeOrder)　:　'';
				if(holdOrder != ''){
					holdOrder.forEach((o, i) => {
						this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + this.orderTemplist[o.name].ExchangeNo + '","CommodityNo":"' + o.name + '","ContractNo":"' + this.orderTemplist[o.name].MainContract +'"}}');
					});
				}
				this.currentOrderType = index;
//				if(index == 0){
//					this.currentOrderView = 'normalOrder';
//				}else{
//					this.currentOrderView = 'conditionOrder';
//				}
			},
			showFens: function(){
				if(this.fensShow == false){
					this.fensShow = true;
					$(".fens_box").css({'height': 4 + 'rem'});
					$(".icon_triangle").css({'transform': 'rotate(-180deg)'});
					//画分时图
					if(this.currentdetail){
						this.$store.state.isshow.isfens = true;
						let data = {
							Method: "QryHistory",
							Parameters:{
								ExchangeNo: this.currentdetail.ExchangeNo,
								CommodityNo: this.currentdetail.CommodityNo,
								ContractNo: this.currentdetail.MainContract,
								HisQuoteType: 0,
								BeginTime: "",
								EndTime: "",
								Count: 0
							}
						};
						this.quoteSocket.send(JSON.stringify(data));
					}
				}else{
					this.fensShow = false;
					$(".fens_box").css({'height': 0 + 'rem'});
					$(".icon_triangle").css({'transform': 'rotate(-360deg)'});
				}
			}
		},
		mounted: function(){
//			console.log(this.parameters);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.tips{
		height: 0.64rem;
		line-height: 0.64rem;
		background: $titleBlue;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		span{
			float: left;
			font-size: $fs28;
			margin-right: 0.3rem;
			&.red{
				color: $red;
			}
			&.green{
				color: $green;
			}
		}
		p{
			float: right;
			font-size: $fs28;
			em{
				color: $white;
			}
		}
	}
	.fens_title{
		height: 0.48rem;
		border-bottom: 0.01rem solid $black;
		padding-left: 3.4rem;
		span{
			float: left;
			display: inline-block;
			height: 0.48rem;
			line-height: 0.48rem;
			color: $fontBlue;
		}
		.icon_triangle{
			float: left;
			width: 0.16rem;
			height: 0.48rem;
			background: url(../../assets/images/triangle.png) no-repeat center 0.2rem;
			background-size: 0.16rem 0.08rem;
			margin: 0 0.2rem 0 0.06rem;
			transition: all .3s;
		}
		button{
			float: left;
			width: 0.64rem;
			height: 0.32rem;
			background: $yellow;
			border-radius: 0.1rem;
			margin: 0.08rem 0;
			color: $bg;
			font-size: 0.2rem;
			padding: 0;
		}
	}
	.fens_box{
		width: 7.5rem;
		height: 0;
		overflow: hidden;
		margin-bottom: 0.2rem;
		transition: all .3s;
		#fens{
			height: 2.4rem;
		}
		#volume{
			height: 1.6rem;
		}
	}
	#fens, #volume{
		width: 100%;
		margin: 0 auto;
	}
	.buy_one{
		width: 7.5rem;
		height: 0.64rem;
		line-height: 0.64rem;
		border-bottom: 0.01rem solid $black;
		display: flex;
		text-align: center;
		.col{
			width: 50%;
			background: #3a2d36;
			&:first-child{
				background: #273a3b;
			}
			em{
				color: $white;
				font-size: $fs28;
				margin: 0 0.2rem;
			}
			span{
				font-size: $fs28;
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
		}
	}
	.order_type{
		height: 0.96rem;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid $black;
		span{
			display: inline-block;
			float: left;
			width: 3.45rem;
			height: 0.56rem;
			line-height: 0.56rem;
			text-align: center;
			background: $lightBlue;
			margin: 0.2rem 0;
			color: $white; 
			&:first-child{
				border-top-left-radius: 0.1rem;
				border-bottom-left-radius: 0.1rem;
			}
			&:last-child{
				border-top-right-radius: 0.1rem;
				border-bottom-right-radius: 0.1rem;
			}
			&.current{
				background: $blue;
			}
		}
	}
</style>