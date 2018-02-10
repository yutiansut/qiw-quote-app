<template>
	<div id="financeDetails">
		<mt-header title="融资详情" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/myFinance" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/tradersRules" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">规则</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<ul class="nav">
				<li @click="change" class="current" >融资方案明细</li>
				<li @click="change" v-show="showDetails">历史成交记录</li>
			</ul>
			<div id="schemeDetails" v-show="showSchemeDetails">
				<div class="cp" v-show="showcp">
					<ul>
						<li>交易账号：<span>{{account}}</span></li>
						<li>
							<mt-button class="btn2" @click.native="toTradeLogin">立即交易</mt-button>
						</li>
					</ul>
					<ul>
						<li>交易密码：<span>{{accountPassword}}</span></li>
						<li></li>
					</ul>
					<div class="black"></div>
					<ul>
						<li>方案申请时间：<span>{{applyTime}}</span></li>
						<li>
							
						</li>
					</ul>
					<ul>
						<li>融资保证金：<span>{{tradeDeposit}}元</span></li>
						<li><mt-button class="btn2" @click.native="addMargin">追加保证金</mt-button></li>
					</ul>
					<ul>
						<li>追加保证金：<span>{{addDepositToTotal}}元</span></li>
						<li>
						</li>
					</ul>
					<ul>
						<li>融资金额：<span>{{financMoney}}元</span></li>
						<li>
						</li>
					</ul>
					<ul>
						<li>总操盘资金：<span>{{totalTradeFund}}元</span></li>
						<li></li>
					</ul>
					<ul>
						<li>亏损平仓线：<span>{{lossCloseOutLine}}元</span></li>
						<li>
						</li>
					</ul>
					<div class="btn1">
						<btn className="bluelg" name="申请终结方案" @click.native="end"></btn>
					</div>
				</div>
				<div class="end" v-show="showEnd">
					<div class="state">
						<p>已结算</p>
					</div>
					<div class="black"></div>
					<ul>
						<li>结算金额：<span>+{{clearMoney}}元</span></li>
						<li>交易手续费：<span>{{tradeFee}}元</span></li>
						<li>提示：<span>结算金额=操盘保证金+追加保证金+交易盈亏-交易手续费</span></li>
					</ul>
					<div class="black"></div>
					<ul >
						<li>融资保证金：<span>{{tradeDeposit}}元</span></li>
						<li>追加保证金：<span>{{addDepositToTotal}}元</span></li>
						<li>融资金额：<span>{{financMoney}}元</span></li>
						<li>总操盘资金：<span>{{totalTradeFund}}元</span></li>
						<li>亏损平仓线：<span>{{lossCloseOutLine}}元</span></li>
						<li>方案结算时间：<span>{{endTime}}</span></li>
						<li>交易盈亏：<span>{{tradeProfitAndLoss}}元</span></li>
						<!--<li>美元结算汇率：<span>1美元={{rate}}人民币</span></li>-->
					</ul>
					<div class="levle">
						操盘手数
					</div>
					<ul class="handle">
						<li v-for="(val,key,index) in this.tradeNum">{{key}}&nbsp;&nbsp;<span>{{val}}&nbsp;&nbsp;手</span></li>
					</ul>
				</div>
			</div>
			<!--已结算历史记录-->
			<div id="historyRecords" v-show="showHistoryRecords">
				<div class="list_title">
					<ul>
						<li>
							<span>序号</span>
							<span>成交时间</span>
							<span>客户编号</span>
							<span>币种</span>
							<span>交易所</span>
							<span>品种</span>
							<span>买/卖方向</span>
							<span>成交价</span>
							<span>平仓盈亏</span>
							<span>交易手续费</span>
						</li>
						<template v-for="(k,index) in this.endData">
							<li>
								<span>{{index+1}}</span>
								<span>
									{{k.tradeDatetime | changeTime("y-m-d")}}<br>
									<label>{{k.tradeDatetime | changeTime("h-m-s")}}</label>
								</span>
								<span>{{k.userNo}}</span>
								<span>{{k.currencyNo}}</span>
								<span>{{k.exchangeNo}}</span>
								<span>{{k.commodityNo}}</span>
								<span>{{k.direction}}</span>
								<span>{{k.tradePrice}}</span>
								<span>{{k.hedgeProfit}}</span>
								<span>{{k.tradeFee}}</span>
							</li>
							
						</template>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from "../../../assets/js/common.js"
	import btn from "../../../components/btn.vue"
	export default{
		name:"financeDetails",
		components:{btn},
		data(){
			return{
				id:"",
				showSchemeDetails:true,
				showHistoryRecords:false,
				showcp:true,
				showEnd:false,
				account:"交易账户",
				accountPassword:"密码",
				applyTime:"申请时间",
				financMoney:"融资金额",
				tradeDeposit:"操盘保证金",
				totalTradeFund:"总操盘资金",
				lossCloseOutLine:"亏损平仓线",
				addDepositToTotal:"追加保证金金额",
				endTime:"结算时间",
				clearMoney:"结算金额",
				tradeFee:"交易手续费",
				tradeProfitAndLoss:"交易盈亏",
				state:"交易状态",
				rate:"结算汇率",
				tradeNum:'',
				showDetails:false,
				endData:"",
				addDepositToTotal:"",
				tradeAccount:"",
				password:""
			}
		},
		methods:{
			toTradeLogin:function(){
				this.$router.push({path:"/tradeLogin",query:{tradeAccount:this.tradeAccount,password:this.password,islogin:"true"}});
			},
			end:function(){
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/futureManage/endProgram",{id:this.id},headers).then((res)=>{
//					console.log("res========_____________"+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.$toast({message:"终结成功",duration: 1000});
						this.showDetails = true;
						this.showcp = false;
						this.showEnd = true;
						this.getDetails();
						this.getEndInfo();
					}
				}).catch((err)=>{
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
					}else{
						if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 1000});
							this.$router.push({path:"/login"});
						}
						else{
							this.$toast({message:data.message,duration: 1000});
						}
					}
				})
			},
			getEndInfo:function(){
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/futureManage/getHistoryTrade",{id:this.id},headers).then((res)=>{
//					console.log("历史历史"+JSON.stringify(res));
					if(res.code == 1 && res.success){
						if(res.data!=undefined){
							this.endData = res.data;
						}
					}
				}).catch((err)=>{
//					console.log("历史历史11111111111"+JSON.stringify(err));
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
					}else{
						if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 1000});
							this.$router.push({path:"/login"});
						}
						else{
							this.$toast({message:data.message,duration: 1000});
						}
					}
				})
			},
			addMargin:function(){
				this.$router.push({path:"/addMargin",query:{id:this.id}});
			},
			change:function(e){
				var index = $(e.currentTarget).index();
				switch (index){
					case 0:
						$(".nav li").removeClass("current");
						$(".nav li").eq(index).addClass("current");
						this.showSchemeDetails = true;
						this.showHistoryRecords = false;
						break;
					case 1:
						this.showHistoryRecords = true;
						this.showSchemeDetails = false;
						$(".nav li").removeClass("current");
						$(".nav li").eq(index).addClass("current");
						break;
					default:
						break;
				}
			},
			getDetails:function(){
				var data = {
					id:this.id
				}
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/futureManage/getProgramDetail",data,headers).then((res)=>{
//					console.log("res==="+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.tradeAccount = res.data.program.account;
						this.password = res.data.program.accountPassword;
						this.account=res.data.program.account,
						this.accountPassword=res.data.program.accountPassword,
						this.applyTime=res.data.program.applyTime,
						this.financMoney=res.data.program.financMoney,
						this.tradeDeposit=res.data.program.tradeDeposit,
						this.totalTradeFund=res.data.program.totalTradeFund,
						this.lossCloseOutLine=res.data.program.lossCloseOutLine,
						this.addDepositToTotal=res.data.program.addDepositToTotal,
						this.endTime=res.data.program.endTime,
						this.clearMoney=res.data.program.clearMoney,
						this.tradeFee=res.data.program.tradeFee,
						this.tradeProfitAndLoss=res.data.program.tradeProfitAndLoss,
						this.state=res.data.program.state,
						this.rate=res.data.program.rate
						this.addDepositToTotal = res.data.program.addDepositToTotal;
						if(res.data.program.state == 1){
							this.showcp = true;
							this.showEnd = false;
						}else if(res.data.program.state == 2){
							this.showcp = false;
							this.showEnd = true;
							this.tradeNum = res.data.tradeNum;
							this.showDetails = true;
							this.getEndInfo();
						}
					}
				}).catch((err)=>{
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
					}else{
						if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 1000});
							this.$router.push({path:"/login"});
						}
						else{
							this.$toast({message:data.message,duration: 1000});
						}
					}
				})
			}
		},
		mounted:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.id = this.$route.query.id;
			if(this.userInfo == ''){
				//console.log("未登录")
			}else{
				//console.log("一登录")
				this.getDetails();
			}
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.id = this.$route.query.id;
			if(this.userInfo == ''){
				//console.log("未登录")
			}else{
				//console.log("一登录")
				this.getDetails();
			}
		},
		filters:{
			changeTime: function(e, format) {
				var a = e.split(" ");
				if(format == "y-m-d"){
					return a[0];
				}else{
					return a[1];
				}
				
			}
		}
	}
</script>


<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#financeDetails{
		width: 7.5rem;
		color:$fontBlue ;
	}
	#back{
		display: inline-block;
		width: 0.64rem;
		height: 1rem;
		background: url(../../../assets/images/back_icon.png) no-repeat 0.15rem 0.34rem;
		background-size: 0.24rem 0.32rem;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		.nav{
			width: 100%;
			padding: 0rem 1rem;
			height: 0.8rem;
			border-bottom: 1px solid #12141a;
			display: flex;
			justify-content: space-between;
			li{
				height: 0.8rem;
				line-height: 0.8rem;
			}
		}
		.current{
			color: $blue;
			border-bottom: 2px solid $blue;
		}
		/*方案详情*/
		#schemeDetails{
			width: 7.5rem;
			color:$fontBlue;
			.cp{
				display:flex;
				flex-direction: column;
				ul{
					padding:0rem 0.3rem;
					border-bottom: 1px solid #12141a;
					line-height:0.9rem;
					height:0.9rem;
					display:flex;
					justify-content: space-between;
					.btn2{
						width: 1.8rem;
						height: 0.6rem;
						background-color: $yellow;
						color: $black;
						border-radius: 0.1rem;
						border: none;
						font-size: 0.24rem;
					}
					span{
						color:$white;
					}
				}
				.btn1{
					width: 7.5rem;
					padding: 0rem 0.3rem;
					position: fixed;
					bottom: 0.3rem;
				}
			}
			.end{
				display: flex;
				flex-direction: column;
				.state{
					text-align: center;
					width: 100%;
					height: 1rem;
					border-bottom: 1px solid #12141a;
					p{
						font-size: $fs32;
						line-height: 1rem;
					}
				}
				ul{
					li{
						padding:0rem 0.3rem;
						width: 100%;
						line-height:0.9rem;
						border-bottom: 1px solid #12141a;
					}
					span{
						color:$white;
					}
				}
				.levle{
					background-color: $titleBlue;
					height: 0.64rem;
					padding-left: 0.3rem;
					line-height: 0.64rem;
					border-bottom: 1px solid #12141a;
				}
				.handle{
					text-align: center;
					li{
						&:nth-child(odd){
							width: 50%;
							float: left;
							border-right: 1px solid #12141a;
						}
						&:nth-child(even){
							width: 50%;
							float: left;
						}
					}
				}
				
			}
			.black{
				height: 0.2rem;
				width: 100%;
				background-color: #1b1f26;
				border-bottom: 1px solid #12141a;
			}
			
		}
		/*历史记录*/
		#historyRecords{
			width: 7.5rem;
			.list_title{
				width: 100%;
				overflow-x: scroll;
				border-bottom: 1px solid #12141a;
				ul{
					width: 20.6rem;
					display: block;
					padding: 0 0.3rem;
					
					li{
						border-bottom: 1px solid #12141a;
						text-align: center;
						line-height: 0.4rem;
						height: 0.8rem;
						&:nth-child(1){
							line-height: 0.8rem;
							span{
								color: $fontBlue;
							}
						}
						span{
							color: $white;
							float: left;
							width: 2rem;
							display: block;
							overflow: hidden;
							label{
								color:$fontBlue;
							}
						}
					}
				}
			}
		}
	}
</style>