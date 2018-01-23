<template>
	<div id="quoteDetails">
		<template v-for="(v, index) in parameters">
		<div v-if="v.CommodityNo == currentNo">
			<header>
				<i class="icon icon_back" @touchstart="goBackEvent"></i>
				<div class="title" @touchstart="switchEvent">
					<div class="name fl">
						<span>{{v.CommodityName}}</span>
						<span>{{v.CommodityNo + v.MainContract}}</span>
					</div>
					<i class="icon icon_triangle"></i>
				</div>
				<button>规则</button>
			</header>
			<div class="main">
				<div class="details">
					<div class="cont">
						<p class="name"><span>{{v.CommodityName}}</span>&nbsp;&nbsp;{{v.CommodityNo + v.MainContract}}</p>
						<p class="price" :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</p>
						<p class="change" :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}&nbsp;&nbsp;<em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</p>
						<div class="row">
							<div class="col">
								<span>现手</span>
								<span>{{v.LastQuotation.LastVolume}}</span>
							</div>
							<div class="col">
								<span>买价</span>
								<span class="default" :class="{red: v.LastQuotation.BidPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</span>
							</div>
							<div class="col">
								<span>卖价</span>
								<span class="default" :class="{red: v.LastQuotation.AskPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</span>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<span>买量</span>
								<span>{{v.LastQuotation.BidQty1}}</span>
							</div>
							<div class="col">
								<span>卖量</span>
								<span>{{v.LastQuotation.AskQty1}}</span>
							</div>
							<div class="col">
								<span>成交量</span>
								<span>{{v.LastQuotation.TotalVolume}}</span>
							</div>
							<div class="col">
								<span>持仓量</span>
								<span>{{v.LastQuotation.Position}}</span>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<span>开盘</span>
								<span class="default" :class="{red: v.LastQuotation.OpenPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.OpenPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.OpenPrice | fixNum(v.DotSize)}}</span>
							</div>
							<div class="col">
								<span>昨结</span>
								<span>{{v.LastQuotation.PreSettlePrice}}</span>
							</div>
							<div class="col">
								<span>最高价</span>
								<span class="default" :class="{red: v.LastQuotation.HighPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.HighPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.HighPrice | fixNum(v.DotSize)}}</span>
							</div>
							<div class="col">
								<span>最低价</span>
								<span class="default" :class="{red: v.LastQuotation.LowPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LowPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LowPrice | fixNum(v.DotSize)}}</span>
							</div>
						</div>
					</div>
					<div class="contrast">
						<div class="title">
							<i class="icon icon_contrast fl"></i>
							<span class="fl">对比合约</span>
						</div>
						<div class="contrast_list">
							<div class="empty" v-if="noContrast">
								<p>无对比合约</p>
							</div>
							<ul v-show="!noContrast">
								<template v-for="(v, index) in parameters">
									<li :class="{current: v.check == 1}" v-if="v.CommodityNo != currentNo">
										<div class="name fl">
											<span>{{v.CommodityName}}</span>
											<span>{{v.CommodityNo + v.MainContract}}</span>
										</div>
										<p :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}<i class="icon icon_arrow" :class="{up: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, down: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}"></i></p>
										<p :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</p>
										<i class="icon" :class="{icon_check: v.check == 0, icon_checked: v.check == 1}"></i>
									</li>
								</template>
							</ul>
						</div>
					</div>
				</div>
				<div class="chart_box">
					<div class="title">
						<div class="title_box">
							<template v-for="(key,index) in chartsList">
								<span :class="{current: currentChartsNum == index}" @touchstart="menuEvent(index)">{{key}}</span>
							</template>
						</div>
					</div>
					<div class="cont">
						<div class="chart fl">
							<components :is="currentChartsView" v-if="chartsShow"></components>
						</div>
						<div class="cont_right fl">
							<div class="tab_title">
								<template v-for="(o, index) in tabList">
									<span :class="{current: currentNum == index}" @touchstart="tabEvent(index)">{{o}}</span>
								</template>
							</div>
							<div class="tab_cont">
								<div class="five_quote" v-show="tabShow">
									<h3>卖五档</h3>
									<ul>
										<li>
											<span>卖五</span>
											<span :class="{red: v.LastQuotation.AskPrice5 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice5 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice5 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty5}}</span>
										</li>
										<li>
											<span>卖四</span>
											<span :class="{red: v.LastQuotation.AskPrice4 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice4 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice4 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty4}}</span>
										</li>
										<li>
											<span>卖三</span>
											<span :class="{red: v.LastQuotation.AskPrice3 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice3 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice3 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty3}}</span>
										</li>
										<li>
											<span>卖二</span>
											<span :class="{red: v.LastQuotation.AskPrice2 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice2 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice2 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty2}}</span>
										</li>
										<li>
											<span>卖一</span>
											<span :class="{red: v.LastQuotation.AskPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.AskQty1}}</span>
										</li>
									</ul>
									<h3 class="border_top">买五档</h3>
									<ul>
										<li>
											<span>买一</span>
											<span :class="{red: v.LastQuotation.BidPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty1}}</span>
										</li>
										<li>
											<span>买二</span>
											<span :class="{red: v.LastQuotation.BidPrice2 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice2 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice2 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty2}}</span>
										</li>
										<li>
											<span>买三</span>
											<span :class="{red: v.LastQuotation.BidPrice3 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice3 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice3 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty3}}</span>
										</li>
										<li>
											<span>买四</span>
											<span :class="{red: v.LastQuotation.BidPrice4 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice4 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice4 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty4}}</span>
										</li>
										<li>
											<span>买五</span>
											<span :class="{red: v.LastQuotation.BidPrice5 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice5 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice5 | fixNum(v.DotSize)}}</span>
											<span>{{v.LastQuotation.BidQty5}}</span>
										</li>
									</ul>
								</div>
								<div class="trade_log" v-show="!tabShow">
									<ul>
										<template v-for="k in tradeParameters[0].data">
											<li>
												<span>{{k.time | operateTime}}</span>
												<span>{{k.price}}</span>
												<span>{{k.volume}}</span>
											</li>
										</template>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</template>
		<div class="select_box" v-show="selectBoxShow">
			<ul>
				<li><span>切换合约</span></li>
				<template v-for="(v, index) in commodityAll">
					<li @touchstart="selectEvent(v)">
						<span>{{v.describe}}&nbsp;&nbsp;{{v.commodityNo + v.contractNo}}</span>
					</li>
				</template>
			</ul>
		</div>
		<mt-tabbar fixed class="menu">
			<mt-tab-item class="col" v-show="isTradeLogin">  
			    <img slot="icon" src="../../assets/images/mockTrading_02.png">  
			    <span>模拟交易</span>
			</mt-tab-item>
      		<mt-tab-item class="col" @touchstart.native="addRemind">
		        <img slot="icon" v-show="!remindShow" src="../../assets/images/remind.png">
		        <img slot="icon" v-show="remindShow" src="../../assets/images/remind_01.png">
		        <span>提醒</span>
		    </mt-tab-item>
      		<mt-tab-item class="col" @touchstart.native="addOptional">  
		        <img slot="icon" v-show="!optionalIconShow" src="../../assets/images/add_optional.png">
		        <img slot="icon" v-show="optionalIconShow" src="../../assets/images/add_optional_01.png">
		        <span :class="{current: optionalIconShow == true}">{{optionalName}}</span>
		    </mt-tab-item>
      		<mt-tab-item class="col" v-show="isTradeLogin">  
		        <img slot="icon" src="../../assets/images/position.png">  
		         <span>持仓</span>
	      	</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	import fens from './fens.vue'
	import light from './light.vue'
	import klineOne from './klineOne.vue'
	import klineFive from './klineFive.vue'
	import klineFifteen from './klineFifteen.vue'
	import klineThirty from './klineThirty.vue'
	import klineDay from './klineDay.vue'
	export default {
		name: 'quoteDetails',
		components: {fens, light, klineOne, klineFive, klineFifteen, klineThirty, klineDay},
		data(){
			return{
				currentNo: '',
				currentNum: 0,
				tabList: ['五档','明细'],
				tabShow: true,
				chartsList: ['闪电图','分时','1分','5分','15分','30分','日K'],
				currentChartsNum: 1,
				currentChartsView: 'fens',
				noContrast: false,
				chartsHight: 5.4,
				isTradeLogin: false,
				chartsShow: false,
				commodityAll: [],
				selectBoxShow: false,
				optionalIconShow: false,
				optionalName: '添加自选',
				optionalList: [],
				remindShow: false,
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			quoteInitStep(){
				return this.$store.state.market.quoteInitStep;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			},
			tradeUserInfo(){
				if(localStorage.tradeUser) return JSON.parse(localStorage.tradeUser);
			},
			tradeParameters(){
				return this.$store.state.market.tradeParameters;
			}
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			},
			operateTime: function(val){
				return val.split(':')[0] + ':' + val.split(':')[1];
			}
		},
		watch: {
			parameters: function(n, o){
				if(n.length > 1){
					this.parameters.forEach((o, i) => {
						if(o.CommodityNo == this.currentNo){
							this.$store.state.market.currentdetail = o;
							this.$store.state.market.currentNo = o.CommodityNo;
							return;
						}
					});
				}
			}
		},
		methods: {
			goBackEvent: function(){
				this.$router.go(-1);
				this.chartsShow = false;
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isklineshow = false;
			},
			tabEvent: function(index){
				this.currentNum = index;
				if(index == 0){
					this.tabShow = true;
				}else{
					this.tabShow = false;
				}
			},
			switchEvent: function(){   //打开切换合约下拉框
				this.selectBoxShow = true;
			},
			selectEvent: function(obj){    //选择合约进行切换
				this.selectBoxShow = false;
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isklineshow = false;
				let _obj = {
					"commodityNo": obj.commodityNo,
					"contrast": obj.contrast,
					"exchangeNo": obj.exchangeNo,
					"mainContract": obj.contractNo
				}
				this.operateData(_obj);
				//判断是否自选
				this.getUserCommodityList();
			},
			addRemind: function(){
				this.chartsShow = false;
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isklineshow = false;
				let userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
				if(userInfo == undefined || userInfo == '' || userInfo == null){
					this.$router.push({path: '/login'});
				}else{
					this.$router.push({path: '/remind'});
				}
			},
			menuEvent: function(index){
				this.currentChartsNum = index;
				switch(index){
					case 0:
						this.currentChartsView = 'light';
						break;
					case 1:
						this.currentChartsView = 'fens';
						break;
					case 2:
						this.currentChartsView = 'klineOne';
						break;
					case 3:
						this.currentChartsView = 'klineFive';
						break;
					case 4:
						this.currentChartsView = 'klineFifteen';
						break;
					case 5:
						this.currentChartsView = 'klineThirty';
						break;
					case 6:
						this.currentChartsView = 'klineDay';
						break;
				}
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
			},
			addOptional: function(){
				if(this.userInfo == undefined){
					Toast({message: '请先登录平台', position: 'bottom', duration: 2000});
					return;
				}
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				var datas = {
					'exchangeNo': this.orderTemplist[this.currentNo].ExchangeNo,
					'commodityNo': this.currentNo,
					'contractNo': this.orderTemplist[this.currentNo].MainContract,
				}
				pro.fetch('post', '/quoteTrader/userAddCommodity', datas, headers).then((res) => {
					if(res.success == true && res.code == 1){
						this.optionalIconShow = true;
						Toast({message: '自选添加成功', position: 'bottom', duration: 2000});
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
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
							this.optionalName = '添加自选';
							this.optionalIconShow = false;
							this.optionalList.forEach((o, i) => {
								if(o.commodityNo == this.currentNo){
									this.optionalName = '已添加自选';
									this.optionalIconShow = true;
								}
							});
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			operateData: function(val){
				//渲染画图
				this.chartsShow = true;
				this.currentChartsNum = 1;
				this.currentChartsView = 'fens';
				//重组数据
				let arr = [];
				let obj;
				if(val){
					obj = val;
				}else{
					obj = this.$route.query;
				}
				arr.push(obj);
				this.currentNo = obj.commodityNo;    //当前合约
				//对比合约
				let contrast = obj.contrast;
				if(contrast == '' || contrast == undefined){
					this.noContrast = true;
				}else{
					contrast = contrast.split(',');
					contrast.forEach((o, i) => {
						let a = {
							commodityNo: o,
							exchangeNo: this.orderTemplist[o].ExchangeNo,
							mainContract: this.orderTemplist[o].MainContract
						}
						arr.push(a);
					});
				}
				
				this.$store.state.market.Parameters = [];
				this.$store.state.market.tradeParameters = [];
				this.$store.state.market.commodityOrder = [];
				this.$store.state.market.commodityOrder = arr;
				arr.forEach((o, i) => {
					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.mainContract +'"}}');
				});
			}
		},
		beforeMount: function(){
			//获取所有市场合约
			pro.fetch('post', '/quoteTrader/getCommodityInfoNoType', '', '').then((res) => {
				if(res.success == true && res.code == 1){
					this.commodityAll = res.data;
				}
			}).catch((err) => {
				Toast({message: err.data.message, position: 'bottom', duration: 2000});
			});
		},
		mounted: function(){
			//判断交易是否登录
			if(this.tradeUserInfo != undefined && this.tradeUserInfo != null && this.tradeUserInfo != ''){
				this.isTradeUser = true;
			}
		},
		activated: function(){
			//判断是否自选
			this.getUserCommodityList();
			//重组数据
			this.operateData();
//			console.log(this.parameters);
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	header{
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		width: 7.5rem;
		height: 1rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		box-sizing: border-box;
		.icon_back{
			width: 0.24rem;
			height: 1rem;
			background: url(../../assets/images/back_icon.png) no-repeat center 0.34rem;
			background-size: 0.24rem 0.32rem;
			position: fixed;
			top: 0;
			left: 0.3rem;
		}
		.title{
			margin: auto;
			.name{
				height: 1rem;
				text-align: center;
			}
			span{
				display: block;
				&:first-child{
					color: $white;
					font-size: $fs32;
					margin: 0.2rem 0 0.05rem 0;
				}
			}
			.icon_triangle{
				float: left;
				width: 0.5rem;
				height: 1rem;
				background: url(../../assets/images/triangle.png) no-repeat 0.17rem 0.46rem;
				background-size: 0.16rem 0.08rem;
			}
		}
		button{
			width: 0.7rem;
			height: 0.4rem;
			line-height: 0.4rem;
			text-align: center;
			background: $yellow;
			font-size: 0.2rem;
			color: $bg;
			border-radius: 0.08rem;
			padding: 0;
			position: fixed;
			top: 0.3rem;
			right: 1.8rem;
		}
	}
	.menu{
		.col{
			background: $titleBlue;
			border-top: 0.01rem solid $black;
			border-left: 0.01rem solid $black;
			&:first-child{
				border-left: none;
			}
			span{
				color: $fontBlue;
				&.current{
					color: $blue;
				}
			}
		}
	}
	.main{
		margin-top: 1.01rem;
		.details{
			width: 7.5rem;
			height: 3.85rem;
			background: #1b1f26;
			border-bottom: 0.01rem solid $black;
			.cont{
				float: left;
				width: 4.2rem;
				height: 3.65rem;
				background: $bg;
				border-bottom: 0.01rem solid $black;
				border-right: 0.01rem solid $black;
				padding-left: 0.29rem;
				.name{
					height: 0.5rem;
					line-height: 0.55rem;
					span{
						color: $white;
					}
				}
				.price{
					font-size: 0.64rem;
					margin-bottom: 0.05rem;
					&.red{
						color: $red;
					}
					&.green{
						color: $green;
					}
				}
				.change{
					font-size: $fs28;
					margin-bottom: 0.2rem;
					&.red{
						color: $red;
					}
					&.green{
						color: $green;
					}
				}
				.row{
					height: 0.4rem;
					margin-bottom: 0.2rem;
					.col{
						float: left;
						width: 0.95rem;
						span{
							display: block;
							font-size: 0.2rem;
							&:last-child{
								margin-top: 0.05rem;
								color: $white;
							}
							&.default{
								&.red{
									color: $red;
								}
								&.green{
									color: $green;
								}
							}
						}
					}
				}
			}
			.contrast{
				float: left;
				width: 3.3rem;
				height: 3.65rem;
				background: $bg;
				.title{
					height: 0.49rem;
					line-height: 0.49rem;
					background: $lightBlue;
					.icon_contrast{
						width: 0.24rem;
						height: 0.16rem;
						background: url(../../assets/images/contrast.png) no-repeat center center;
						background-size: 100% 100%;
						margin: 0.17rem 0.1rem 0 0.1rem;
					}
				}
				.contrast_list{
					.empty{
						height: 3.16rem;
						line-height: 3.16rem;
						text-align: center;
						color: #525866;
						font-size: 0.36rem;
						font-weight: bold;
						border-bottom: 0.01rem solid $black;
					}
					li{
						height: 0.63rem;
						overflow: hidden;
						border-bottom: 0.01rem solid $black;
						padding: 0 0.05rem;
						&.current{
							background: #1b1f26;
						}
						.name{
							width: 1.2rem;
							height: 0.63rem;
							overflow: hidden;
							span{
								display: block;
								font-size: 0.2rem;
								&:first-child{
									color: $white;
									margin: 0.07rem 0 0.05rem 0;
								}
							}
						}
						p{
							float: left;
							width: 0.75rem;
							line-height: 0.64rem;
							font-size: 0.2rem;
							&.red{
								color: $red;
							}
							&.green{
								color: $green;
							}
						}
						.icon{
							float: right;
							width: 0.24rem;
							height: 0.64rem;
							margin-right: 0.05rem;
							&.icon_check{
								background: url(../../assets/images/check.png) no-repeat center 0.2rem;
								background-size: 0.24rem 0.24rem;
							}
							&.icon_checked{
								background: url(../../assets/images/checked.png) no-repeat center 0.2rem;
								background-size: 0.24rem 0.24rem;
							}
						}
					}
				}
			}
		}
		.chart_box{
			width: 7.5rem;
			height: 6.2rem;
			.title{
				height: 0.8rem;
				padding: 0 0.3rem;
				border-bottom: 0.01rem solid $black;
				overflow-x: scroll;
				/*.title_box{
					width: 7.6rem;
				}*/
				span{
					display: inline-block;
					height: 0.8rem;
					line-height: 0.8rem;
					/*border-bottom: 0.05rem solid $bg;*/
					font-size: $fs28;
					margin-left: 0.3rem;
					&:first-child{
						margin: 0;
					}
					&.current{
						border-bottom: 0.05rem solid $blue;
					}
				}
			}
			.cont{
				height: 5.4rem;
				border-bottom: 0.01rem solid $black;
				.chart{
					width: 5.7rem;
					height: 5.4rem;
					border-right: 0.01rem solid $black;
				}
				.cont_right{
					width: 1.8rem;
					height: 5.4rem;
					.tab_title{
						height: 0.8rem;
						line-height: 0.8rem;
						background: $titleBlue;
						border-bottom: 0.01rem solid $black;
						span{
							float: left;
							display: inline-block;
							width: 50%;
							text-align: center;
							border-left: 0.01rem solid $black;
							&.current{
								color: $blue;
							}
							&:first-child{
								border: none;
							}
						}
					}
					.tab_cont{
						.five_quote{
							h3{
								height: 0.48rem;
								line-height: 0.48rem;
								background: $lightBlue;
								padding: 0 0.1rem;
								border-bottom: 0.01rem solid $black;
								&.border_top{
									border-top: 0.01rem solid $black;
								}
							}
							li{
								height: 0.36rem;
								line-height: 0.36rem;
								display: flex;
								justify-content: space-around;
								padding: 0 0.1rem;
								span{
									display: inline-block;
									font-size: 0.2rem;
									&:first-child{
										width: 0.5rem;
									}
									&:nth-child(2){
										width: 1rem;
										text-align: center;
									}
									&.red{
										color: $red;
									}
									&.green{
										color: $green;
									}
									&:last-child{
										color: $white;
										width: 0.3rem;
										text-align: right;
									}
								}
							}
						}
						.trade_log{
							li{
								height: 0.38rem;
								line-height: 0.38rem;
								display: flex;
								justify-content: space-around;
								span{
									font-size: 0.2rem;
									&:nth-child(2){
										color: $yellow;
									}
									&:nth-child(3){
										color: $white;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.select_box{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2;
		width: 7.5rem;
		height: 5.3rem;
		overflow-y: auto;
		background: $white;
		li{
			width: 7.5rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			border-bottom: 0.01rem solid #e6e6e6;
			&:first-child{
				span{
					font-weight: bold;
				}
			}
			span{
				color: #1a1a1a;
				font-size: $fs28;
			}
		}
	}
</style> 