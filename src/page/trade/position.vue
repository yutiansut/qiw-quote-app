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
					<div class="list_cont" @click.stop="clickEvent(index, v.commodityNocontractNo)">
						<div class="name">
							<em>{{v.CommodityName}}</em>
							<em>{{v.commodityNocontractNo}}</em>
						</div>
						<span class="type" :class="v.type_color">{{v.type}}</span>
						<span class="num">{{v.HoldNum}}</span>
						<span class="price">{{v.price}}</span>
						<span class="status" :class="v.total_color">{{v.total}}</span>
					</div>
					<div class="tools" v-show="v.toolShow">
						<btn name="平仓" className="orangesm" @click.native="closePosition"></btn>
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
	import { Toast, MessageBox } from 'mint-ui';
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
			jCacheTotalAccount(){
				return this.$store.state.market.CacheAccount.jCacheTotalAccount;
			},
		},
		methods: {
			backTrade: function(){   //反手
				this.$refs.editOrder.show = true;
			},
			stopMoney: function(){   //止损止盈
				this.$refs.stopMoneyAlert.show = true;
			},
			clickEvent: function(i, id){
				this.selectedNum = i;
				this.currentOrderID = id;
				this.positionListCont.forEach((o, i) => {
					o.toolShow = false;
					if(o.commodityNocontractNo == id){
						o.toolShow = true;
					}
				});
			},
			closePosition: function(){
				var confirmText;
				if(this.currentOrderID != ''){
					this.positionListCont.forEach(function(o,i){
						if(this.currentOrderID == o.commodityNocontractNo){
							var buildIndex = 0;
							if(buildIndex > 100) buildIndex = 0;
							var Contract = o.commodityNocontractNo.substring(0, o.commodityNocontractNo.length-4);
							var drection;
							o.type == '多' ? drection = 1 : drection = 0;
							var b = {
								"Method": 'InsertOrder',
								"Parameters":{
									"ExchangeNo": this.orderTemplist[Contract].ExchangeNo,
									"CommodityNo": this.templateList[Contract].CommodityNo,
									"ContractNo": this.templateList[Contract].ContractNo,
									"OrderNum": o.HoldNum,
									"Drection": drection,
									"PriceType": 1,
									"LimitPrice": 0.00,
									"TriggerPrice": 0,
									"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
								}
							};
							confirmText = '提交订单:【'+ o.commodityNocontractNo +'】,价格【市价】,手数【'+ o.HoldNum +'】？';
							MessageBox.confirm(confirmText,"提示").then(action=>{
								if(this.buyStatus == true) return;
								this.$store.state.market.buyStatus = true;
								this.tradeSocket.send(JSON.stringify(b));
								this.currentOrderID = '';
								this.selectedNum = -1;
								o.toolShow = false;
							}).catch(err=>{});
						}
					}.bind(this));
				}else{
					Toast({message: '请选择一条数据', position: 'bottom', duration: 1000});
				}
			},
			backTrade: function(){
				var confirmText;
				if(this.currentOrderID != ''){
					this.positionListCont.forEach(function(o,i){
						if(this.currentOrderID == o.commodityNocontractNo){
							if(o.price > this.jCacheTotalAccount.TodayCanUse){
								Toast({message: '当前余额不足，反手操作失败', position: 'bottom', duration: 1000});
								return;
							}
							var buildIndex = 0;
							if(buildIndex > 100) buildIndex = 0;
							var Contract = o.commodityNocontractNo.substring(0, o.commodityNocontractNo.length-4);
							var drection, _drection;
							o.type == '多' ? drection = 1 : drection = 0;
							var b = {
								"Method": 'InsertOrder',
								"Parameters":{
									"ExchangeNo": this.orderTemplist[Contract].ExchangeNo,
									"CommodityNo": this.templateList[Contract].CommodityNo,
									"ContractNo": this.templateList[Contract].ContractNo,
									"OrderNum": o.HoldNum,
									"Drection": drection,
									"PriceType": 1,
									"LimitPrice": 0.00,
									"TriggerPrice": 0,
									"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
								}
							};
							confirmText = '确定反手:【'+ o.commodityNocontractNo +'】,价格【市价】,手数【'+ o.HoldNum +'】？';
							MessageBox.confirm(confirmText,"提示").then(action=>{
								if(this.buyStatus == true) return;
								this.$store.state.market.buyStatus = true;
								this.tradeSocket.send(JSON.stringify(b));
								setTimeout(function(){
									this.tradeSocket.send(JSON.stringify(b));
									this.currentOrderID = '';
									this.selectedNum = -1;
								}.bind(this), 500);
								o.toolShow = false;
							}).catch(err=>{});
						}
					}.bind(this));
				}else{
					Toast({message: '请选择一条数据', position: 'bottom', duration: 1000});
				}
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
						data.toolShow = false;
						
						this.$store.state.market.positionListCont.unshift(data);
					}.bind(this));
				}
			}
		},
		mounted: function(){
			//获取持仓列表数据
			this.operateData(this.qryHoldTotalArr);
			console.log(this.positionListCont);
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