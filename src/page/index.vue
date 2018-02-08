<template>
	<div id="index">
		<TabBar :selected="selected" :tabs="tabs"></TabBar>
		<header>
			<div class="tab">
				<template v-for="(v, index) in tabList">
					<span :class="{current: currentNum == index}" @tap="tavEvent(index)">{{v}}</span>
				</template>
			</div>
			<i class="icon icon_search" @tap="toSearch"></i>
			<i class="icon icon_set" v-show="setShow" @tap="toOptionalManage"></i>
		</header>
		<p class="connect connecting" v-show="isconnecting">网络连接已断开，正在尝试重连…</p>
		<p class="connect connected" v-show="isconnected">已连接到服务器！</p>
		<div class="cont" v-if="isInit">
			<components :is="currentView"></components>
		</div>
	</div>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	import TabBar from "../components/TabBar.vue"
	import optionalList from "./quote/optionalList.vue"
	import optionalBox from "./quote/optionalBox.vue"
	import noLogin from "./quote/noLogin.vue"
	import market from "./quote/market.vue"
	import pro from '../assets/js/common.js'
	import { Toast } from 'mint-ui'
	export default {
		name: 'index',
		components: {TabBar, optionalList, optionalBox, noLogin, market},
		data(){
			return{
				currentNum: 1,
				tabList: ['自选', '市场'],
				currentView: 'market',
				setShow: false,
				isInit: false,
				selected:"行情",
				tabs:[require("../assets/images/quotation_01.png"),require("../assets/images/mockTrading_02.png"),
				require("../assets/images/information_02.png"),require("../assets/images/mine_02.png")],
				optionalList: [],
				marketList: [],
				isconnecting: false,
				isconnected: false,
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			},
			isLogin(){
				return this.$store.state.account.isLogin;
			},
			quoteStatus(){
				return sessionStorage.quoteStatus ? JSON.parse(sessionStorage.quoteStatus) : '';
			}
		},
		watch: {
			quoteStatus: function(n, o){
				if(n && n == false){
					this.isconnected = false;
					this.isconnecting = true;
				}else{
					this.isconnected = true;
					this.isconnecting = false;
				}
			}
		},
		methods: {
			...mapActions([
				'initQuoteClient'
			]),
			tavEvent: function(index){
				this.currentNum = index;
				if(index == 0){
					let userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
					if(userInfo == undefined || userInfo == null || userInfo == ''){
						this.currentView = 'noLogin';
					}else{
						this.currentView = 'optionalList';
						this.setShow = true;
						//获取用户所有自选 合约
						this.getUserCommodityList();
						this.$store.state.market.Parameters = [];
						this.$store.state.market.commodityOrder = [];
					}
				}else{
					this.currentView = 'market';
					this.setShow = false;
					this.$store.state.market.Parameters = [];
					this.$store.state.market.commodityOrder = [];
					this.$store.state.market.commodityOrder = this.marketList[0].list;
					this.marketList[0].list.forEach((o, i) => {
						this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
					});
				}
			},
			toSearch: function(){
				this.$router.push({path: '/search'});
			},
			toOptionalManage: function(){
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
							this.optionalList = res.data;
							this.$store.state.market.commodityOrder = res.data;
							res.data.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			getCommodityInfo: function(){
				pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.marketList = res.data;
						this.$store.state.market.commodityOrder = res.data[0].list;
						//初始化行情
						if(this.$store.state.market.commodityOrder){
							this.initQuoteClient();
							this.isInit = true;
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			}
		},
		updated: function(){
			//判断网络
			pro.netIsconnected(function(){    //手机
				this.isconnected = false;
				this.isconnecting = true;
			}.bind(this), function(){
				this.isconnected = true;
				this.isconnecting = false;
				//刷新页面
				window.location.reload();
			}.bind(this));
			
			var EventUtil = { 
				addHandler: function (element, type, handler) { 
					if (element.addEventListener) { 
						element.addEventListener(type, handler, false); 
					}else if(element.attachEvent) { 
						element.attachEvent("on" + type, handler); 
					}else{ 
						element["on" + type] = handler; 
					} 
				} 
			}; 
			EventUtil.addHandler(window, "online", function () { 
				window.location.reload();
			}); 
			EventUtil.addHandler(window, "offline", function () { 
				this.isconnecting = true;
				console.log('网络已断开');
			}); 
		},
		mounted: function(){
			//获取所有合约
			this.getCommodityInfo();
		},
		activated: function(){
			if(this.isLogin == true){
				this.$store.state.account.isLogin = false;
				this.currentNum = 1;
				this.currentView = 'market';
				window.location.reload();
//				this.setShow = false;
//				this.$store.state.market.Parameters = [];
//				this.$store.state.market.commodityOrder = [];
//				this.$store.state.market.commodityOrder = this.marketList[0].list;
//				this.marketList[0].list.forEach((o, i) => {
//					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
//				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	header{
		position: fixed;
		top: 0;
		left: 0;
		width: $w;
		height: 1rem;
		overflow: hidden;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		margin: auto;
		.tab{
			width: 2rem;
			height: 0.6rem;
			margin: 0.2rem auto;
			span{
				display: inline-block;
				float: left;
				width: 1rem;
				height: 0.6rem;
				line-height: 0.6rem;
				text-align: center;
				background: $lightBlue;
				font-size: $fs28;
				&.current{
					background: $black;
					color: $white;
				}
			}
		}
		.icon_search{
			width: 0.6rem;
			height: 1rem;
			background: url(../assets/images/search.png) no-repeat right 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.3rem;
		}
		.icon_set{
			width: 0.6rem;
			height: 1rem;
			background: url(../assets/images/set.png) no-repeat left 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.9rem;
		}
	}
	.cont{
		overflow-y: auto;
		padding-bottom: 1.3rem;
	}
	.connect{
		position: fixed;
		bottom: 1.25rem;
		left: 0;
		width: 7.5rem;
		height: 0.48rem;
		line-height: 0.48rem;
		text-align: center;
		overflow: hidden;
		border-bottom: 0.01rem solid $black;
		color: $white;
		&.connecting{
			background: #e64560;
		}
		&.connected{
			background: #0f996b;
		}
	}
</style>