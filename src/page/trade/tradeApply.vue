<template>
	<div id="tradeApply">
		<div class="choose">
			<div class="p_left">选择融资本金(本金越多，可持仓手数越多)</div>
			<div class="picture">
				<p><span>{{financing}}</span>元</p>
				<mt-range v-model="rangeValue" :barHeight="10" :min="this.startMin" :max="this.startMax" id="range" :disabled="disabled"></mt-range>
				<div class="bkg"></div>
				<ul class="section">
					<li><span>{{startMin}}</span>元</li>
					<li><span>{{startMax}}</span>元</li>
				</ul>
			</div>
			<div class="p_left">选择融倍数，（倍数越多，可持仓手数越多）</div>
			<div class="picture1">
				<p><span>{{times}}倍</span></p>
				<mt-range v-model="rangeValue1" :barHeight="10" :min="0" :max="100" :step="5" id="range1"></mt-range>
				<div class="bkg1"></div>
				<ul class="section1">
					<li><span>0</span>倍</li>
					<li><span>100</span>倍</li>
				</ul>
			</div>
			<div class="black"></div>
			<div class="commodity">
				<ul>
					<li>融资金额</li>
					<li>{{financing}}元</li>
				</ul>
				<ul>
					<li>总操盘资金</li>
					<li>{{totalMoney}}元</li>
				</ul>
				<ul>
					<li>亏损平仓线</li>
					<li>{{lossLine}}元</li>
				</ul>
			</div>
			<div class="p_left">可交易品种（一个账号可交易多个品种）</div>
			<div class="handle">
				<ul v-for="k in tradableList">
					<li>
						<span>{{k.commodityName}}</span>
						<p>{{k.commodityNo}}</p>
					</li>
					<li>
						<span>{{k.describe}}</span>
						<p>{{k.currencyNo | changeCurrency}}/手</p>
					</li>
				</ul>
			</div>
			<div class="black"></div>
			<div class="warn">
				<ul>
					<li>提交申请时请仔细阅读<span>《期货融资合作协议》</span><span>《操盘细则》</span></li>
					<li>如遇问题请咨询客服：400-852-8008</li>
				</ul>
			</div>
			<div class="bt">
				<ul>
					<li>
						支付：<span>{{payMoney}}</span>元
					</li>
					<li @click="clickBtn">
						立即支付
					</li>
				</ul>
			</div>
			<TabBar :selected="selected" :tabs="tabs" ></TabBar>
		</div>
		
	</div>
</template>

<script>
	import TabBar from "../../components/TabBar.vue"
	import pro from "../../assets/js/common.js"
	import { MessageBox } from 'mint-ui';
	export default{
		name:"tradeApply",
		components:{TabBar},
		data(){
			return{
				rangeValue:0,
				tabs:[require("../../assets/images/quotation_02.png"),require("../../assets/images/mockTrading_01.png"),
				require("../../assets/images/information_02.png"),require("../../assets/images/mine_02.png")],
				selected:"模拟交易",
				tradableList:"",
				financing:"",
				times:0,
				rangeValue1:0,
				startMin:0,
				startMax:0,
				totalMoney:'',
				lossScale:"",
				lossLine:'',
				rate:"",
				payMoney:0,
				isLogin:false,
				isPresentedgive:true,
				balance:"",
				rechargeMoney:"",
				disabled:false,
				activityType:0,
				//是否使用过注册奖励申请方案，默认为true
				isUseActivity:true
			}
		},
		methods:{
			//已领取状态下去获取是否使用状态
			getNewActivity:function(headers){
				pro.fetch("post","/futureManage/getPresent",{type:1},headers).then((res)=>{}).catch((err)=>{
//					console.log("errrrrrrrrrrrrrrrrrrrrrrr===="+JSON.stringify(err))
					var data = err.data ;
					if(data == undefined){
						this.$toast({message:'网络不给力，请稍后再试',duration: 2000});
					}else if(data.data == false){
						this.isUseActivity = false;
						this.disabled = true;
						this.activityType = 1;
						this.rangeValue = 10000
					}
				})
			},
			//获取是否领取过1w新手资金
			GetActivity:function(headers){
				pro.fetch("post","/account/getBasicMsg","",headers).then((res)=>{
//					console.log("res=="+JSON.stringify(res))
					if(res.code == 1 && res.success == true){
						this.isPresentedgive = res.data.isGetActivity;
						if(res.data.isGetActivity == true){
							this.getNewActivity(headers);
						}
					}
				}).catch((err)=>{
					var data = err.data ;
					if(data == undefined){
						this.$toast({message:'网络不给力，请稍后再试',duration: 2000});
					}else if(data.code == -9999){
						this.$toast({message:'登录超时，请重新登录',duration: 2000});
						this.$router.push({path:"/login"});
					}else{
						this.$toast({message:data.message,duration: 2000});
					}
				})
			},
			//获取基础配置信息
			getParameters:function(headers){
				pro.fetch("post","/futureManage/getApplyData","",headers).then((res)=>{
//					console.log("res==="+JSON.stringify(res.data.balance));
					if(res.code == 1 && res.success == true){
						this.tradableList = res.data.tradableList;
						this.lossScale = res.data.lossScale;
						this.lossLine = this.rangeValue*this.lossScale + this.rangeValue*this.rangeValue1;
						this.rate = res.data.rate;
						if(res.data.balance != '' && res.data.balance > 3){
							this.startMax = res.data.balance*this.rate;
							this.balance = res.data.balance;
						}else if(res.data.balance < 3 || res.data.balance == 3){
							this.startMax = 10000;
						}
//						this.balance = 100;
					}
				}).catch((err)=>{
					var data = err.data;
					if(data == undefined){
						this.$toast({message:'网络不给力，请稍后再试',duration: 2000});
					}else if(data.code == -9999){
						this.$toast({message:'登录超时，请重新登录',duration: 2000});
						this.$router.push({path:"/login"});
					}else{
						this.$toast({message:data.message,duration: 2000});
					}
				});
			},
			clickBtn:function(){
				//未登录
				if(this.isLogin == false){
					MessageBox.confirm("您还未登录平台账户，赶紧去登录吧!","提示",{confirmButtonText:"去登录",}).then(action=>{
					this.$router.push({path:"/login"});
					}).catch(err=>{});
				//已登录
				}else{
					//未领取过新手礼包
					if(this.isPresentedgive == false){
						MessageBox.alert("恭喜小主，您有1w的操盘金体验未领取，赶紧领取吧！","提示",{confirmButtonText:"去领取"}).then(action => {
							console.log("999999999")
						});
					}
					//领取过新手礼包
					else{
						//余额不足
						if(this.payMoney > this.balance){
//							console.log("去充值");
							this.rechargeMoney = this.payMoney - this.balance;
							MessageBox.confirm("余额不足：您还差"+this.rechargeMoney+"元，先去充值吧!","提示",{confirmButtonText:"去充值",}).then(action=>{
//								console.log("去充值咯");
								this.$router.push({path:"/recharge"});
							}).catch(err=>{});
						}
						//余额充足
						else{
//							console.log("去支付");
							MessageBox.confirm("确认支付"+this.payMoney+"元，申请一个融资方案?","提示",{confirmButtonText:"确认",}).then(action=>{
//								console.log("去支付咯");
								this.apply(this.activityType);
							}).catch(err=>{});
						}
					}
				}
			},
			//支付申请
			apply:function(activityType){
				var data = {
					traderFund:this.totalMoney,
					forceLine:this.lossLine,
					multiple:this.rangeValue1,
					financeBond:this.financing,
					financeMoney:this.financing*this.rangeValue1,
					activityType:activityType
				}
				var head = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				console.log("data======"+JSON.stringify(data))
				pro.fetch("post","/futureManage/openAccount",data,head).then((res)=>{
					console.log("11111111111111111"+JSON.stringify(res))
					if(res.code == 1 && res.success == true){
						this.$toast({message:'申请成功',duration: 2000});
						this.$router.push({path:"/applySuccess"});
					}
				}).catch((err)=>{
					console.log("err111111111111111111=="+JSON.stringify(err))
					var data = err.data;
					if(data == undefined){
						this.$toast({message:'网络不给力，请稍后再试',duration: 2000});
					}else{
						//领取未使用
						this.$toast({message:data.message,duration: 2000});
					}
				})	
			}
		},
		mounted:function(){
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.financing = this.rangeValue;
			this.totalMoney = this.rangeValue + this.rangeValue*this.rangeValue1;
			this.payMoney = this.rangeValue/100;
			this.startMin = 300;
			this.rangeValue = 300;
			if(this.userInfo == ''){
				//未登录
//				console.log("未登录");
				this.startMax = 1000;
				this.isLogin = false;
				var headers = ""
				this.getParameters(headers);
			}else{
				//已登录
//				console.log("一登录")
				this.isLogin = true;
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
//				console.log("headers==="+JSON.stringify(headers))
				this.getParameters(headers);
				this.GetActivity(headers);
			}
			var screenPhone=screen.width;
			if(screenPhone == 320){
				$(".bkg").css("top","0.83rem").css("height","0.34rem");
//				$(".mt-range-content").css("margin-right","0.5rem");
				$(".bkg1").css("top","0.83rem").css("height","0.34rem");
			}else if(screenPhone==375){
				$(".bkg").css("top","0.79rem").css("height","0.33rem");
				$(".bkg1").css("top","0.79rem").css("height","0.33rem");
			}
			console.log("screenPhone==="+screenPhone)
		},
		watch:{
			rangeValue:function(){
				this.financing = this.rangeValue;
				this.totalMoney = this.rangeValue + this.rangeValue*this.rangeValue1;
				this.lossLine = this.rangeValue*this.lossScale + this.rangeValue*this.rangeValue1;
				this.payMoney = this.rangeValue/100;
//				console.log(this.rangeValue)
			},
			rangeValue1:function(){
				this.times = this.rangeValue1;
				this.totalMoney = this.rangeValue + this.rangeValue*this.rangeValue1;
				this.lossLine = this.rangeValue*this.lossScale + this.rangeValue*this.rangeValue1;
//				console.log(this.rangeValue1)
			},
		},
		filters:{
			changeCurrency:function(e){
				switch (e){
					case 'USD':
						return "美元"
						break;
					case 'EUR':
					 	return "欧元"
						break;
					case 'HKD-HKFE':
						return "港币"
						break;
					case 'CNY':
						return "人民币"
						break;
					case 'JPY':
						return "日元"
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	
	#tradeApply{
		width: 7.5rem;
		.choose{
			width:100%;
			margin-top:1rem;
			.p_left{
				width: 100%;
				float: left;
				height: 0.6rem;
				line-height: 0.6rem;
				background-color: $titleBlue;
				text-indent: 0.3rem;
				border-bottom: 1px solid $black;
			}
			.picture{
				position: relative;
				float: left;
				width: 100%;
				height: 1.8rem;
				background-color: $bg;
				p{
					text-align: center;
					margin: 0.3rem 0 0;
					color:$yellow;
					span{
						font-size: $fs36;
						margin-right: 0.1rem;
						font-weight: 600;
					}
				}
				.section{
					width: 90%;
					margin: auto;
					li{
						font-size: $fs28;
						float: left;
						width: 50%;
						color: $yellow;
						&:nth-child(2){
							text-align: right;
							color: $white;
						}
					}
				}
				.bkg{
					width: 6.4rem;
					height: 0.3rem;
					/*margin: auto;*/
					border: 1px solid #ffd400;
					position: absolute;
					top:0.77rem;
					left: 0.55rem;
					border-radius: 0.15rem;
					z-index: 1;
					box-shadow:-0 0.5rem 0 #12141a inset;
				}
			}
			.picture1{
				position: relative;
				float: left;
				width: 100%;
				height: 1.8rem;
				background-color: $bg;
				p{
					text-align: center;
					margin: 0.3rem 0 0;
					color:$blue;
					span{
						font-size: $fs36;
						margin-right: 0.1rem;
						font-weight: 600;
					}
				}
				.section1{
					width: 90%;
					margin: auto;
					li{
						font-size: $fs28;
						float: left;
						width: 50%;
						color: $blue;
						&:nth-child(2){
							text-align: right;
							color: $white;
						}
					}
				}
				.bkg1{
					width: 6.4rem;
					height: 0.3rem;
					/*margin: auto;*/
					border: 1px solid $blue;
					position: absolute;
					top:0.77rem;
					left: 0.55rem;
					border-radius: 0.15rem;
					z-index: 1;
					box-shadow:-0 0.5rem 0 #12141a inset;
				}
			}
			.black{
				float: left;
				width: 100%;
				height: 0.2rem;
				background-color: #1b1f26;
				border-bottom: 1px solid $black;
			}
			.commodity{
				float: left;
				width: 100%;
				height: 1.0rem;
				border-bottom: 1px solid $black;
				ul{
					float: left;
					width:33.3%;
					text-align: center;
					height: 100%;
					&:nth-child(2){
						border-right:1px solid $black;
						border-left:1px solid $black;
					}
					li{
						line-height:0.5rem; 
						&:nth-child(2){
							color: $white;
						}
					}
				}
				
			}
			.handle{
				float: left;
				width: 100%;
				ul{
					text-align: center;
					height: 1.6rem;
					float: left;
					width: 20%;
					li{
						display: flex;
						flex-direction: column;
						padding-top: 0.16rem;
						border-bottom: 1px solid $black;
						border-right: 1px solid $black;
						padding-top: 0.06rem;
						&:nth-child(1){
							height: 0.8rem;
							background-color: $lightBlue;
							color: #ccddff;
							span{
								align-items: auto;
								/*line-height: 0.2rem;*/
								font-size: 0.24rem;
								height: 0.4rem;
							}
							p{
								height: 0.4rem;
								font-size: 0.2rem;
								line-height: 0.4rem;
							}
						}
						&:nth-child(2){
							height: 0.8rem;
							color: $white;
						}
					}
				}
			}	
			.warn{
				width: 100%;
				float: left;
				height: 3.6rem;
				ul{
					padding: 0 0.3rem;
					width: 100%;
					li{
						&:nth-child(1){
							margin-top: 0.2rem;
						}
						height:0.4rem;
						line-height: 0.4rem;
						span{
							color: $white;
						}
					}
				}
			}
			.bt{
				position: fixed;
				bottom: 1rem;
				width: 100%;
				height: 1rem;
				border-top: 1px solid $black;
				border-bottom: 1px solid $black;
				background-color: $titleBlue;
				li{
					float: left;
					height:1rem; 
					text-align: center;
					line-height:1rem; 
					&:nth-child(1){
						width: 68%;
						span{
							color: $orange;
							font-size: $fs40;
							margin: 0 0.1rem;
						}
					}
					&:nth-child(2){
						width: 32%;
						background-color: $orange;
						color: $white;
						font-size: $fs32;
					}
				}
			}
		}
	}
	
</style>