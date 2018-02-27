1<template>
	<div id="normalOrder" class="fm">
		<div class="row">
			<b>合约代码</b>
			<div class="slt fl" @tap="openSelectOrder">
				<input type="text" class="ipt_lg" :value="orderTemplist[currentNo].CommodityName + ' ' + currentNo + orderTemplist[currentNo].MainContract" readonly="readonly" />
				<i class="icon icon_select"></i>
			</div>
		</div>
		<div class="row">
			<b>订单类型</b>
			<div class="slt slt_dm fl" @tap="openSelectPrice">
				<input type="text" class="ipt_sm" :value="priceType" readonly="readonly" />
				<i class="icon icon_select"></i>
			</div>
			<input type="text" class="ipt_md ml" v-model="tradePrices" readonly />
		</div>
		<div class="row">
			<b>委托数量</b>
			<div class="num_box">
				<span class="add" @tap="addNum">+</span>
				<input type="number" class="ipt_order_num" v-model="defaultNum" />
				<span class="reduce" @tap="reduceNum">-</span>
			</div>
		</div>
		<div class="btn_box">
			<btn name="买入" className="redmd" @click.native="buy"></btn>
			<btn name="卖出" className="greenmd" @click.native="sell"></btn>
		</div>
		<selectBox ref="selectBox" :obj="obj" :type="type"></selectBox>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import selectBox from "../../components/selectBox.vue"
	import { Toast, MessageBox } from 'mint-ui';
	export default {
		name: 'normalOrder',
		components: {btn, selectBox},
		data(){
			return{
				obj: [],
				type: '',
				priceType: '市价',
				tradePrices: '市价',
				defaultNum: 1,
				priceShow: true,
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			commodityAll(){
				return this.$store.state.account.commodityAll;
			},
			currentNo(){
				return this.$store.state.market.currentNo;
			},
			currentdetail(){
				return this.$store.state.market.currentdetail;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			length(){
				return this.$store.state.market.Parameters.length;
			},
			buyStatus(){
				return this.$store.state.market.buyStatus;
			},
		},
		watch: {
			currentNo: function(n, o){
				if(n == this.commodityAll[0].commodityNo) return;
				if(n && n != undefined){
					this.$store.state.isshow.isfensshow = false;
					this.$store.state.isshow.islightshow = false;
					this.$store.state.isshow.isklineshow = false;
					this.$parent.fensShow = false;
					//初始化当前合约
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
				}
			},
			priceType: function(n, o){
				if(n && n == '限价'){
					this.tradePrices = 0;
					$('.ipt_md').attr('readonly', false);
					this.priceShow = false;
				}else if(n && n == '市价'){
					this.priceShow = true;
					this.tradePrices = '市价';
					$('.ipt_md').attr('readonly', false);
				}
			},
			defaultNum: function(n, o){
				if(n && n <= 0){
					this.defaultNum = 0;
				}
			}
		},
		methods: {
			addNum: function(){
				return this.defaultNum++;
			},
			reduceNum: function(){
				return this.defaultNum--;
			},
			openSelectOrder: function(){
				this.obj = this.commodityAll;
				this.type = 'order';
				$(".select_cont").css({bottom: 0});
				this.$refs.selectBox.shadeShow = true;
			},
			openSelectPrice: function(){
				this.obj = ['市价', '限价'];
				this.type = 'price';
				$(".select_cont").css({bottom: -3.55 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
			buy: function(){
				var buildIndex = 0, b;
				if(buildIndex > 100) buildIndex = 0;
				if(this.priceShow == true){   //市价下单
					b = {
						"Method":'InsertOrder',
						"Parameters":{
							"ExchangeNo": this.currentdetail.ExchangeNo,
							"CommodityNo": this.currentdetail.CommodityNo,
							"ContractNo": this.currentdetail.MainContract,
							"OrderNum": this.defaultNum,
							"Drection": 0,
							"PriceType": 1,
							"LimitPrice": 0.00,
							"TriggerPrice": 0,
							"OrderRef":this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
						}
					};
				}else{
					if(this.tradePrices == '' || this.tradePrices <= 0 || this.tradePrices == undefined){
						Toast({message: '请输入限价', position: 'bottom', duration: 1500}); return;
					}else if(this.defaultNum == 0){
						Toast({message: '请输入手数', position: 'bottom', duration: 1500}); return;
					}else{
						b = {
							"Method": 'InsertOrder',
							"Parameters":{
								"ExchangeNo": this.currentdetail.ExchangeNo,
								"CommodityNo": this.currentdetail.CommodityNo,
								"ContractNo": this.currentdetail.MainContract,
								"OrderNum": this.defaultNum,
								"Drection": 0,
								"PriceType": 0,
								"LimitPrice": parseFloat(this.tradePrices),
								"TriggerPrice": 0,
								"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
							}
						};
					}
				}
				//确定文案
				var contract = b.Parameters.CommodityNo + b.Parameters.ContractNo;
				var LimitPrice;
				b.Parameters.PriceType == 1 ? LimitPrice = '市价' : LimitPrice = this.tradePrices;
				var orderNum = b.Parameters.OrderNum;
				var drection;
				b.Parameters.Drection == 0 ? drection = '买' : drection = '卖';
				this.confirmText = '确认提交订单:【'+contract+'】,价格【'+LimitPrice +'】,手数【'+orderNum+'】,方向【'+drection+'】？';
				MessageBox.confirm(this.confirmText,"提示").then(action=>{
					if(this.buyStatus == true) return;
					this.$store.state.market.buyStatus = true;
					this.tradeSocket.send(JSON.stringify(b));
				}).catch(err=>{});
			},
			sell: function(){
				var buildIndex = 0, b;
				if(buildIndex > 100) buildIndex = 0;
				if(this.priceShow == true){   //市价下单
					b = {
						"Method": 'InsertOrder',
						"Parameters":{
							"ExchangeNo": this.currentdetail.ExchangeNo,
							"CommodityNo": this.currentdetail.CommodityNo,
							"ContractNo": this.currentdetail.MainContract,
							"OrderNum": this.defaultNum,
							"Drection": 1,
							"PriceType": 1,
							"LimitPrice": 0.00,
							"TriggerPrice": 0,
							"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
						}
					};
				}else{
					if(this.tradePrices == '' || this.tradePrices <= 0 || this.tradePrices == undefined){
						Toast({message: '请输入限价', position: 'bottom', duration: 1500}); return;
					}else if(this.defaultNum == 0){
						Toast({message: '请输入手数', position: 'bottom', duration: 1500}); return;
					}else{
						b = {
							"Method": 'InsertOrder',
							"Parameters":{
								"ExchangeNo": this.currentdetail.ExchangeNo,
								"CommodityNo": this.currentdetail.CommodityNo,
								"ContractNo": this.currentdetail.MainContract,
								"OrderNum": this.defaultNum,
								"Drection": 1,
								"PriceType": 0,
								"LimitPrice": parseFloat(this.tradePrices),
								"TriggerPrice": 0,
								"OrderRef": this.$store.state.market.tradeConfig.client_source+ new Date().getTime()+(buildIndex++)
							}
						};
					}
				}
				//确定文案
				var contract = b.Parameters.CommodityNo + b.Parameters.ContractNo;
				var LimitPrice;
				b.Parameters.PriceType == 1 ? LimitPrice = '市价' : LimitPrice = this.tradePrices;
				var orderNum = b.Parameters.OrderNum;
				var drection;
				b.Parameters.Drection == 0 ? drection = '买' : drection = '卖';
				this.confirmText = '确认提交订单:【'+contract+'】,价格【'+LimitPrice +'】,手数【'+orderNum+'】,方向【'+drection+'】？';
				MessageBox.confirm(this.confirmText,"提示").then(action=>{
					if(this.buyStatus == true) return;
					this.$store.state.market.buyStatus = true;
					this.tradeSocket.send(JSON.stringify(b));
				}).catch(err=>{});
			},
		},
		mounted: function(){
			
		},
		activated: function(){
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
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.fm{
		width: 7.5rem;
		height: 5.02rem;
		border-bottom: 0.01rem solid $black;
		padding: 0.3rem 0 0 0;
		.row{
			width: 7.5rem;
			padding: 0 0.3rem;
			height: 0.88rem;
			overflow: hidden;
			margin-bottom: 0.3rem;
			b{
				float: left;
				display: inline-block;
				width: 1.3rem;
				height: 0.88rem;
				line-height: 0.88rem;
				font-weight: normal;
				font-size: $fs28;
			}
			.slt{
				width: 5.6rem;
				height: 0.88rem;
				overflow: hidden;
				position: relative;
				&.slt_dm{
					width: 1.2rem;
				}
				.icon{
					width: 0.1rem;
					height: 0.1rem;
					position: absolute;
					bottom: 0.1rem;
					right: 0.1rem;
					&.icon_select{
						background: url(../../assets/images/account/subscript_01.png) no-repeat center center;
						background-size: 100% 100%;
					}
					&.icon_selected{
						background: url(../../assets/images/account/subscript_02.png) no-repeat center center;
						background-size: 100% 100%;
					}
				}
			}
			input{
				float: left;
				display: inline-block;
				height: 0.88rem;
				color: $white;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				background: #1b1f26;
				text-align: center;
				font-size: $fs28;
				&.ipt_lg{
					width: 5.6rem;
				}
				&.ipt_sm{
					width: 1.2rem;
				}
				&.ipt_md{
					width: 4rem;
				}
			}
			.ml{
				margin-left: 0.35rem;
			}
			.num_box{
				float: left;
				width: 5.6rem;
				height: 0.88rem;
				border: 0.01rem solid $black;
				background: #1b1f26;
				border-radius: 0.1rem;
				span{
					display: inline-block;
					float: left;
					width: 0.8rem;
					height: 0.88rem;
					line-height: 0.88rem;
					text-align: center;
					border-right: 0.01rem solid $black;
					font-size: $fs32;
					&.reduce{
						float: right;
						border: none;
						border-left: 0.01rem solid $black;
					}
				}
				input{
					border: none;
					width: 3.96rem;
					height: 0.6rem;
					line-height: 0.6rem;
					margin: 0.14rem 0;
				}
			}
		}
		.btn_box{
			padding: 0 0.3rem;
			display: flex;
			justify-content: space-between;
		}
	}
</style>