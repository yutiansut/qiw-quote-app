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
					<div class="list_cont" @click.stop="clickEvent(index, v.OrderID, v.delegatePrice, v.delegateNum)">
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
						<btn name="撤单" className="orangesm" @click.native="cancelOrder"></btn>
						<btn name="改单" className="bluesm" @click.native="editOrder"></btn>
						<!--<btn name="全撤" className="greensm"></btn>-->
					</div>
				</li>
			</template>
		</ul>
		<editOrder ref="editOrder"></editOrder>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import editOrder from "./editOrder.vue"
	import { Toast, MessageBox } from 'mint-ui';
	export default{
		name: "hangOrder",
		components: {btn, editOrder},
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
			clickEvent: function(i, id, price, num){
				this.selectedNum = i;
				this.currentOrderID = id;
				this.entrustPrice = price;
				this.entrustNum = num;
				this.orderListCont.forEach((o, i) => {
					o.toolShow = false;
					if(o.OrderID == id){
						o.toolShow = true;
					}
				});
			},
			cancelOrder: function(){
				var confirmText;
				if(this.currentOrderID != ''){
					this.orderListCont.forEach(function(o,i){
						if(this.currentOrderID == o.OrderID){
							var Contract = o.ContractCode.substring(0, o.ContractCode.length-4);
							var b = {
								"Method": 'CancelOrder',
								"Parameters":{
									"OrderSysID": '',
									"OrderID": o.OrderID,
									"ExchangeNo": this.orderTemplist[Contract].ExchangeNo,
									"CommodityNo": this.templateList[Contract].CommodityNo,
									"ContractNo": this.templateList[Contract].ContractNo,
									"OrderNum": parseFloat(o.delegateNum),
									"Direction": function(){
													if(o.buyOrSell=='买'){
														return 0;
													}else{
														return 1;
													}
												},
									"OrderPrice": parseFloat(o.delegatePrice)
								}
							};
							confirmText = '提交撤单:【'+ o.ContractCode +'】,价格【'+ o.delegatePrice +'】,手数【'+ o.delegateNum +'】,方向【'+ o.buyOrSell +'】？';
							MessageBox.confirm(confirmText,"提示").then(action=>{
								if(this.cancelStatus == true) return;
								this.$store.state.market.cancelStatus = true;
								this.tradeSocket.send(JSON.stringify(b));
								o.toolShow = false;
							}).catch(err=>{});
						}
					}.bind(this));
				}else{
					Toast({message: '请选择一条数据', position: 'bottom', duration: 1000});
				}
			},
			editOrder: function(){
				this.$refs.editOrder.show = true;
				this.$refs.editOrder.id = this.currentOrderID;
				this.$refs.editOrder.entrustPrice = this.entrustPrice;
				this.$refs.editOrder.entrustNum = this.entrustNum;
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