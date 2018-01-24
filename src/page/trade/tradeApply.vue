<template>
	<div id="tradeApply">
		<div class="choose">
			<div class="p_left">选择融资本金(本金越多，可持仓手数越多)</div>
			<div id="picture">
				<!--<mt-range v-model="rangeValue" :barHeight="10">
				  <div slot="start">0</div>
				  <div slot="end">100</div>
				</mt-range>-->
				<input type="range" />
			</div>
			<div class="p_left">选择融倍数，（倍数越多，可持仓手数越多）</div>
			<!--<div class="picture">
				<mt-range v-model="rangeValue">
				  <div slot="start">0</div>
				  <div slot="end">100</div>
				</mt-range>
			</div>-->
			<div class="black"></div>
			<div class="commodity">
				<ul>
					<li>融资金额</li>
					<li>3000元</li>
				</ul>
				<ul>
					<li>总操盘资金</li>
					<li>5540元</li>
				</ul>
				<ul>
					<li>亏损平仓线</li>
					<li>5850元</li>
				</ul>
			</div>
			<div class="p_left">可交易品种（一个账号可交易多个品种）</div>
			<div class="handle">
				<ul v-for="n in 6">
					<li>
						<span>国际原油</span>
						<p>CL1706</p>
					</li>
					<li>
						<span>10000</span>
						<p>美元/手</p>
					</li>
				</ul>
			</div>
			<div class="black"></div>
			<div class="warn">
				<ul>
					<li>提交申请时请仔细阅读<span>《期货融资合作协议》</span><span>操盘细则</span></li>
					<li>如遇问题请咨询客服：400-852-8008</li>
				</ul>
			</div>
			<div class="bt">
				<ul>
					<li>
						支付：<span>3000.00</span>元
					</li>
					<li>
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
				rangeValue:50,
				tabs:[require("../../assets/images/quotation_02.png"),require("../../assets/images/mockTrading_01.png"),
				require("../../assets/images/information_02.png"),require("../../assets/images/mine_02.png")],
				selected:"模拟交易"
			}
		},
		methods:{
			getParameters:function(){
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/futureManage/getApplyData","",headers).then((res)=>{
					console.log("res==="+JSON.stringify(res));
				}).catch((err)=>{
					console.log("err==="+JSON.stringify(err));
				})
			}
		},
		mounted:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			if(this.userInfo == ''){
				this.showLoginIn = false;
				this.showNotLogin = true;
			}else{
				this.showLoginIn = true;
				this.showNotLogin = false;
				this.getParameters();
			}
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
		},
		watch:{
			rangeValue:function(){
				console.log(this.rangeValue)
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
			#picture{
				float: left;
				/*display: none;*/
				width: 100%;
				height: 1.8rem;
				background-color: $bg;
				input{
					background-color: #13161b;
					border: 1px solid $yellow;
					width: 100%;
					height: 0.3rem;
					border-radius: 0.15rem;
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
						&:nth-child(1){
							height: 0.8rem;
							background-color: $lightBlue;
							color: #bdcdee;
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
				height: 1.6rem;
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
				bottom: 1.1rem;
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
							color: $white;
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