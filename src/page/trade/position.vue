<template>
	<div id="position" class="list">
		<ul>
			<li>
				<div class="list_title">
					<span class="name">合约名称</span>
					<span class="type">多空</span>
					<span class="num">手数</span>
					<span class="price">持仓均价</span>
					<span class="status">浮动盈亏</span>
				</div>
			</li>
			<template v-for="(v, index) in positionListCont">
				<li :class="{current: selectedNum == index}">
					<div class="list_cont">
						<div class="name">
							<em>{{v.CommodityName}}</em>
							<em>CNQ16</em>
						</div>
						<span class="type" :class="v.type_color">{{v.type}}</span>
						<span class="num">{{v.HoldNum}}</span>
						<span class="price">{{v.price}}</span>
						<span class="status" :class="v.total_color">{{v.total}}</span>
					</div>
					<div class="tools">
						<btn name="平仓" className="orangesm"></btn>
						<btn name="反手" className="bluesm" @tap.native="backTrade"></btn>
						<btn name="止损止盈" className="greensm" @tap.native="stopMoney"></btn>
					</div>
				</li>
			</template>
		</ul>
		<editOrder ref="editOrder"></editOrder>
		<stopMoneyAlert ref="stopMoneyAlert"></stopMoneyAlert>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import editOrder from "./editOrder.vue"
	import stopMoneyAlert from "./stopMoneyAlert.vue"
	export default{
		name: "position",
		components: {btn, editOrder, stopMoneyAlert},
		data(){
			return{
				selectedNum: -1,
				currentOrderID: '',
			}
		},
		computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			templateList(){
				return this.$store.state.market.templateList;
			},
			qryHoldTotalArr(){
				return this.$store.state.market.qryHoldTotalArr;
			},
			positionListCont(){
				return this.$store.state.market.positionListCont;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			buyStatus(){
				return this.$store.state.market.buyStatus;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
		},
		methods: {
			backTrade: function(){   //反手
				this.$refs.editOrder.show = true;
			},
			stopMoney: function(){   //止损止盈
				this.$refs.stopMoneyAlert.show = true;
			},
			operateData: function(obj){
				this.$store.state.market.positionListCont = [];
				if(obj){
					obj.forEach(function(o, i){
						var data = {};
						data.CommodityName = this.orderTemplist[o.CommodityNo].CommodityName;
						data.type = function(){
							if(o.Drection == 0){
								return '多'
							}else{
								return '空'
							}
						}();
						data.HoldNum = o.HoldNum;
						data.price = o.HoldAvgPrice.toFixed(this.orderTemplist[o.CommodityNo].DotSize);
						data.total = 0;
						data.type_color = function(){
							if(o.Drection==0){
								return 'red'
							}else{
								return 'green'
							}
						}();
						data.total_color = 'green';
						data.commodityNocontractNo = this.orderTemplist[o.CommodityNo].CommodityNo + this.orderTemplist[o.CommodityNo].LastQuotation.ContractNo;
						this.$store.state.market.positionListCont.unshift(data);
					}.bind(this));
				}
			}
		},
		mounted: function(){
			//获取持仓列表数据
			console.log(this.orderTemplist);
			console.log(this.qryHoldTotalArr);
			this.operateData(this.qryHoldTotalArr);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.list{
		width: 7.5rem;
		overflow-x: auto;
		li{
			span{
				display: inline-block;
				font-size: $fs28;
			}
			.name{
				float: left;
				width: 1.6rem;
			}
			.num{
				width: 1.4rem;
			}
			.type{
				width: 0.9rem;
			}
			.price{
				width: 1.3rem;
			}
			.status{
				width: 1.6rem;
			}
			.price, .status{
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
			.list_title{
				height: 0.64rem;
				border-bottom: 0.01rem solid $black;
				background: #16597f;
				padding-left: 0.3rem;
				span{
					height: 0.64rem;
					line-height: 0.64rem;
				}
			}
			&.current{
				.list_cont{
					background: $lightBlue;
				}
			}
			.list_cont{
				height: 0.88rem;
				border-bottom: 0.01rem solid $black;
				padding-left: 0.3rem;
				span{
					line-height: 0.88rem;
					color: $white;
				}
				.name{
					em{
						display: inline-block; 
						&:first-child{
							font-size: $fs28;
							color: $white;
							margin: 0.15rem 0 0.05rem 0;
						}
					}
				}
			}
			.tools{
				/*display: none;*/
				height: 0.96rem;
				border-bottom: 0.01rem solid $black;
				padding-left: 2.9rem;
				#btn{
					float: left;
					margin: 0.16rem 0.1rem;
				}
			}
		}
	}
</style>