<template>
	<div id="hangOrder" class="list">
		<ul>
			<li>
				<div class="list_title">
					<span class="name">合约名称</span>
					<span class="type">买卖</span>
					<span class="num">委托价</span>
					<span class="price">委托量</span>
					<span class="price">挂单量</span>
					<span class="status">挂单时间</span>
				</div>
			</li>
			<template v-for="(v, index) in orderListCont">
				<li :class="{current: selectedNum == index}">
					<div class="list_cont" @click.stop="clickEvent(index, v.ContractCode)">
						<div class="name">
							<em>{{v.commodityName}}</em>
							<em>{{v.ContractCode}}</em>
						</div>
						<span class="type">{{v.buyOrSell}}</span>
						<span class="num">{{v.delegatePrice}}</span>
						<span class="price">{{v.delegateNum}}</span>
						<span class="price">{{v.ApplyOrderNum}}</span>
						<span class="status">{{v.InsertDateTime}}</span>
					</div>
					<div class="tools" v-show="v.toolShow">
						<btn name="撤单" className="orangesm"></btn>
						<btn name="改单" className="bluesm"></btn>
						<!--<btn name="全撤" className="greensm"></btn>-->
					</div>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default{
		name: "hangOrder",
		components: {btn},
		data(){
			return{
				selectedNum: -1,
				currentOrderID: '',
				entrustPrice: '',
				entrustNum: '',
			}
		},computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			templateList(){
				return this.$store.state.market.templateList;
			},
			OnRspOrderInsertOrderListCont(){
				return this.$store.state.market.OnRspOrderInsertOrderListCont;
			},
			orderListCont(){
				return this.$store.state.market.orderListCont;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			cancelStatus(){
				return this.$store.state.market.cancelStatus;
			}
		},
		watch: {
			OnRspOrderInsertOrderListCont: function(n, o){
				if(n){
					//更新挂单列表数据
					this.operateData(n);
				}
			},
			orderListCont: function(n, o){
//				layer.closeAll();
				this.currentOrderID = '';
				this.selectedNum = -1;
			}
		},
		methods: {
			clickEvent: function(i, id){
				this.selectedNum = i;
				this.currentOrderID = id;
				this.orderListCont.forEach((o, i) => {
					o.toolShow = false;
					if(o.ContractCode == id){
						o.toolShow = true;
					}
				});
			},
			operateData: function(obj){
				this.$store.state.market.orderListCont = [];
				if(obj){
					obj.forEach(function(o, i){
						var data = {};
						data.commodityName = this.orderTemplist[o.CommodityNo].CommodityName;
						data.buyOrSell = function(){
							if(o.Drection == 0){
								return '买';
							}else{
								return '卖';
							}
						}();
						data.delegatePrice = function(){
							if(o.OrderPriceType == 1){
								return '市价';
							}else{
								return parseFloat(o.OrderPrice).toFixed(this.orderTemplist[o.CommodityNo].DotSize);
							}
						}.bind(this)();
						data.delegateNum = o.OrderNum;
						data.ApplyOrderNum = o.OrderNum-o.TradeNum;
						data.InsertDateTime = o.InsertDateTime;
						data.ContractCode = o.ContractCode;
						data.OrderID = o.OrderID;
						data.toolShow = false;
						this.$store.state.market.orderListCont.unshift(data);
					}.bind(this));
				}
			}
		},
		mounted: function(){
			//获取挂单列表数据
			this.operateData(this.OnRspOrderInsertOrderListCont);
			console.log(this.orderListCont);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.list{
		width: 7.5rem;
		overflow-x: auto;
		ul{
			width: 10rem;
		}
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
				width: 2.8rem;
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
				padding-left: 4.4rem;
				#btn{
					float: left;
					margin: 0.16rem 0.1rem;
				}
			}
		}
	}
</style>