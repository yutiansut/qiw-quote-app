<template>
	<div id="tradeApply">
		<div class="choose">
			<div class="p_left">选择融资本金(本金越多，可持仓手数越多)</div>
			<div class="picture">
				<p><span>{{financing}}</span>元</p>
				<mt-range v-model="rangeValue" :barHeight="5" :min="this.startMin" :max="this.startMax" class="range"></mt-range>
				<ul class="section">
					<li><span>{{startMin}}</span>元</li>
					<li><span>{{startMax}}</span>元</li>
				</ul>
			</div>
			<div class="p_left">选择融倍数，（倍数越多，可持仓手数越多）</div>
			<div class="picture1">
				<p><span>{{times}}倍</span></p>
				<mt-range v-model="rangeValue1" :barHeight="5" :min="0" :max="100" :step="5" class="range"></mt-range>
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
				payMoney:"",
				balance:"",
				isLogin:false,
				isPresentedgive:false
			}
		},
		methods:{
			//获取基础配置信息
			getParameters:function(){
				pro.fetch("post","/futureManage/getApplyData","","").then((res)=>{
//					console.log("res==="+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.tradableList = res.data.tradableList;
						this.lossScale = res.data.lossScale;
						this.lossLine = this.rangeValue*this.lossScale + this.rangeValue*this.rangeValue1;
						this.rate = res.data.rate;
						this.balance = res.data.balance;
					}
				}).catch((err)=>{
//					console.log("err==="+JSON.stringify(err));
					var data = err.data;
					if(data == undefined){
						this.$toast({message:'网络不给力，请稍后再试',duration: 2000});
					}else if(data.code == -9999){
						this.$toast({message:'登录超时，请重新登录',duration: 2000});
						this.$router.push({path:"/login"});
					}else{
						this.$toast({message:'网络不给力，请稍后再试',duration: 2000});
					}
				})
			},
			clickBtn:function(){
				if(this.isLogin == false){
					console.log("您还没有登录")
				}else{
					if(this.isPresentedgive == false){
						
					}else{
						
					}
				}
			}
		},
		mounted:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.financing = this.rangeValue;
			this.totalMoney = this.rangeValue + this.rangeValue*this.rangeValue1;
			this.payMoney = this.rangeValue/100;
			this.getParameters();
			if(this.userInfo == ''){
				//未登录
				console.log("未登录");
				this.startMin = 300;
				this.startMax = 1000;
				this.rangeValue = this.startMin;
				this.isLogin = false;
			}else{
				//已登录
				this.isLogin = true;
			}
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
		},
		watch:{
			rangeValue:function(){
				this.financing = this.rangeValue;
				this.totalMoney = this.rangeValue + this.rangeValue*this.rangeValue1;
				this.lossLine = this.rangeValue*this.lossScale + this.rangeValue*this.rangeValue1;
				this.payMoney = this.rangeValue/100;
				console.log(this.rangeValue)
			},
			rangeValue1:function(){
				this.times = this.rangeValue1;
				this.totalMoney = this.rangeValue + this.rangeValue*this.rangeValue1;
				this.lossLine = this.rangeValue*this.lossScale + this.rangeValue*this.rangeValue1;
				console.log(this.rangeValue1)
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
			}
			.range{
					width: 90%;
					margin: auto;
				}
			.picture1{
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