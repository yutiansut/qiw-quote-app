<template>
	<div id="index">
		<nav>
			<div class="nav_box">
				<template v-for="(v,index) in tabList">
					<span :class="{current: currentNum == index}" @touchstart="tabEvent(index)">{{v}}</span>
				</template>
			</div>
		</nav>
		<div class="list">
			<ul>
				<li>
					<div class="name"><span>名称</span></div>
					<span>价格</span>
					<span>成交量</span>
					<span @touchstart="switchEvent">{{changeRateName}}<i class="icon icon_switch"></i></span>
				</li>
				<template v-for="(v, index) in parameters">
					<li v-if="">
						<div class="name">
							<em>{{v.CommodityName}}</em>
							<em>{{v.CommodityNo + v.MainContract}}</em>
						</div>
						<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}<i class="icon icon_arrow" :class="{up: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, down: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}"></i></span>
						<span>{{v.LastQuotation.TotalVolume}}</span>
						<span v-show="changeRateShow" class="changeRate" :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
						<span v-show="!changeRateShow" class="changeRate" :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
					</li>
				</template>
			</ul>
		</div>
		<div class="add_optional">
			<div class="box">
				<i class="icon icon_add"></i>
				<span @touchstart="addOptional">添加自选</span>
			</div>
		</div>
		<div class="btn_box">
			<i class="icon icon_rotate" @touchstart="rotateEvent"></i>
			<i class="icon icon_box" @touchstart="switchBox"></i>
			<i class="icon icon_optional" @touchstart="optionalEvent"></i>
		</div>
	</div>
</template>

<script>
	import optionalBox from "./optionalBox.vue"
	import pro from '../../assets/js/common.js'
	export default {
		name: 'index',
		components: {optionalBox,  },
		data(){
			return{
				tabList: ['全部','商品','股指期货','外汇','LME金属','债券期货 ','ETF'],
				currentNum: 0,
				changeRateShow: true,
				changeRateName: '涨跌幅',
				contList: [],   //全部
				goodsList: [],   //商品
				stockList: [],   //股指期货
				foreignList: [],   //外汇
				metalList: [],  //金属
				bondList: [],   //债券期货
				etfList: [],   //ETF
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			}
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			}
		},
		methods: {
			tabEvent: function(index){
				this.currentNum = index;
				switch(index){
					case 0:
						this.$store.state.market.Parameters = [];
						if(this.contList.length > 0){
							this.contList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 1:
						this.$store.state.market.Parameters = [];
						if(this.goodsList.length > 0){
							this.goodsList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 2:
						this.$store.state.market.Parameters = [];
						if(this.stockList.length > 0){
							this.stockList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 3:
						this.$store.state.market.Parameters = [];
						if(this.foreignList.length > 0){
							this.foreignList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 4:
						this.$store.state.market.Parameters = [];
						if(this.metalList.length > 0){
							this.metalList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 5:
						this.$store.state.market.Parameters = [];
						if(this.bondList.length > 0){
							this.bondList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					case 6:
						this.$store.state.market.Parameters = [];
						if(this.etfList.length > 0){
							this.etfList.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
						break;
					default:
						break;
				}
			},
			switchEvent: function(){   //涨跌幅与涨跌额切换
				if(this.changeRateShow == true){
					this.changeRateShow = false;
					this.changeRateName = '涨跌额';
				}else{
					this.changeRateShow = true;
					this.changeRateName = '涨跌幅';
				}
			},
			addOptional: function(){
				this.$router.push({path: '/search'});
			},
			rotateEvent: function(){
				
			},
			switchBox: function(){
				this.$parent.currentView = 'optionalBox';
			},
			optionalEvent: function(){
				this.$router.push({path: '/optionalManage'});
			},
			getUserCommodityList: function(){
				if(this.userInfo == undefined) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data && res.data.length > 0){
							this.contList = res.data;
							res.data.forEach((o, i) => {
								if(o.commodityType == 1){
									this.goodsList.push(o);
								}else if(o.commodityType == 2){
									this.stockList.push(o);
								}else if(o.commodityType == 3){
									this.foreignList.push(o);
								}else if(o.commodityType == 4){
									this.metalList.push(o);
								}else if(o.commodityType == 5){
									this.bondList.push(o);
								}else if(o.commodityType == 6){
									this.etfList.push(o);
								}
							});
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
		},
		mounted: function(){
			//获取所有自选
			this.getUserCommodityList();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	nav{
		position: fixed;
		top: 1.01rem;
		left: 0;
		width: $w;
		height: 0.8rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		overflow-x: scroll;
		.nav_box{
			width: 8.2rem;
		}
		span{
			display: inline-block;
			height: 0.75rem;
			line-height: 0.75rem;
			border-bottom: 0.04rem solid $bg;
			font-size: $fs28;
			margin-left: 0.3rem;
			&:first-child{
				margin: 0;
			}
			&.current{
				color: $blue;
				border-color: $blue;
			}
		}
	}
	.list{
		width: 7.5rem;
		margin-top: 1.82rem;
		li{
			height: 0.96rem;
			line-height: 0.96rem;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			&:first-child{
				height: 0.64rem;
				line-height: 0.64rem;
				span{
					color: $fontBlue !important;
				}
			}
			span{
				float: left;
				display: inline-block;
				font-size: $fs28;
				text-align: right;
				&:nth-child(1){
					width: 3rem;
					text-align: left;
				}
				&:nth-child(2){
					width: 1.25rem;
				}
				&:nth-child(3){
					width: 1.25rem;
					color: $white;
				}
				&:nth-child(4), &:nth-child(5){
					width: 1.4rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
				.icon_switch{
					width: 0.2rem;
					height: 0.24rem;
					background: url(../../assets/images/switch.png) no-repeat center center;
					background-size: 0.18rem 0.24rem;
					margin-left: 0.05rem;
					margin-top: 0.1rem;
				}
			}
			.name{
				float: left;
				width: 3rem;
				em{
					display: block;
					line-height: 0.36rem;
					&:first-child{
						margin-top: 0.1rem;
						font-size: $fs32;
						color: $white;
					}
				}
			}
		}
	}
	.add_optional{
		width: 7.5rem;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.01rem solid $black;
		display: flex;
		justify-content: center;
		.icon_add{
			float: left;
			width: 0.4rem;
			height: 0.4rem;
			background: url(../../assets/images/add.png) no-repeat center center;
			background-size: 100% 100%;
			margin: 0.3rem 0.15rem 0 0;
		}
		span{
			color: $white;
		}
	}
	.btn_box{
		width: 0.9rem;
		height: 2.9rem;
		position: fixed;
		bottom: 1.3rem;
		right: 0;
		.icon{
			width: 0.64rem;
			height: 0.64rem;
			margin-bottom: 0.2rem;
			&.icon_rotate{
				background: url(../../assets/images/rotate.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_box{
				background: url(../../assets/images/box.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_optional{
				background: url(../../assets/images/optional.png) no-repeat center center;
				background-size: 100% 100%;
			}
		}
	}
	
</style>