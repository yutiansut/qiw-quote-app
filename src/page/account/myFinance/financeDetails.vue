<template>
	<div id="financeDetails">
		<mt-header title="融资详情" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/myFinance" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/account" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">规则</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<ul class="nav">
				<li @click="change" class="current" >融资方案明细</li>
				<li @click="change">历史成交记录</li>
			</ul>
			<div id="schemeDetails" v-show="showSchemeDetails">
				<div class="cp" v-show="showcp">
					<ul>
						<li>交易账号：<span>{{account}}</span></li>
						<li>
							<mt-button class="btn2">立即交易</mt-button>
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
						<li><mt-button class="btn2">追加保证金</mt-button></li>
					</ul>
					<ul>
						<li>融资金额：<span>{{financMoney | financMoneyChange}}元</span></li>
						<li>
						</li>
					</ul>
					<ul>
						<li>总操盘资金：<span>{{totalTradeFund}}元</span></li>
						<li></li>
					</ul>
					<ul>
						<li>亏损平仓线：<span>{{lossCloseoutLine}}元</span></li>
						<li>
						</li>
					</ul>
					<div class="btn1">
						<btn className="bluelg" name="申请终结方案"></btn>
					</div>
				</div>
				<div class="end" v-show="showEnd">
					<div class="state">
						<p>已结算</p>
					</div>
					<div class="black"></div>
					<ul>
						<li>结算金额：<span>+{{clearmoney}}元</span></li>
						<li>交易手续费：<span>{{tradefee}}元</span></li>
						<li>提示：<span>结算金额=操盘保证金+追加保证金+交易盈亏-交易手续费</span></li>
					</ul>
					<div class="black"></div>
					<ul >
						<li>融资保证金：<span>{{tradeDeposit}}元</span></li>
						<li>融资金额：<span>{{financMoney}}元</span></li>
						<li>总操盘资金：<span>{{totalTradeFund}}元</span></li>
						<li>亏损平仓线：<span>{{lossCloseoutLine}}元</span></li>
						<li>方案结算时间：<span>{{endTime}}</span></li>
						<li>交易盈亏：<span>{{tradeprofitandloss}}元</span></li>
						<li>美元结算汇率：<span>1美元={{rate}}人民币</span></li>
					</ul>
					<div class="levle">
						操盘手数
					</div>
					<ul class="handle">
						<li v-for="n in 10">富时A50 <span>1手</span></li>
					</ul>
				</div>
			</div>
			<!--已结算历史记录-->
			<div id="historyRecords" v-show="showHistoryRecords">
				<div class="list_title">
					<ul>
						<li>序号</li>
						<li>成交时间</li>
						<li>客户编号</li>
						<li>币种</li>
						<li>交易所</li>
						<li>品种</li>
						<li>买/卖方向</li>
						<li>成交价</li>
						<li>平仓盈亏</li>
						<li>交易手续费</li>
					</ul>
				</div>
				<div class="list_title_row list_title" v-for="(n,index) in 5">
					<ul>
						<li>{{index}}</li>
						<li>
							<p>2017-12-25</p>
							<span>18:06:06</span>
						</li>
						<li>客户编号</li>
						<li>币种</li>
						<li>港交所</li>
						<li>国际原油</li>
						<li>买</li>
						<li>20.00</li>
						<li>0.200</li>
						<li>20..00</li>
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
				lossCloseoutLine:"亏损平仓线",
				addDepositToTotal:"追加保证金金额",
				endTime:"结算时间",
				clearmoney:"结算金额",
				tradefee:"交易手续费",
				tradeprofitandloss:"交易盈亏",
				state:"交易状态",
				rate:"结算汇率"
			}
		},
		methods:{
			change:function(e){
				var index = $(e.currentTarget).index();
				$(".nav li").removeClass("current");
				$(".nav li").eq(index).addClass("current");
				switch (index){
					case 0:
						this.showSchemeDetails = true;
						this.showHistoryRecords = false;
						break;
					case 1:
						this.showHistoryRecords = true;
						this.showSchemeDetails = false;
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
					console.log("res==="+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.account=res.data.program.account,
						this.accountPassword=res.data.program.accountPassword,
						this.applyTime=res.data.program.applyTime,
						this.financMoney=res.data.program.financMoney,
						this.tradeDeposit=res.data.program.tradeDeposit,
						this.totalTradeFund=res.data.program.totalTradeFund,
						this.lossCloseoutLine=res.data.program.lossCloseoutLine,
						this.addDepositToTotal=res.data.program.addDepositToTotal,
						this.endTime=res.data.program.endTime,
						this.clearmoney=res.data.program.clearmoney,
						this.tradefee=res.data.program.tradefee,
						this.tradeprofitandloss=res.data.program.tradeprofitandloss,
						this.state=res.data.program.state,
						this.rate=res.data.program.rate
					}
				}).catch((err)=>{
					console.log("res==="+JSON.stringify(err));
				})
			}
		},
		mounted:function(){
//			this.$router.push({path:"/financeDetails/schemeDetails"})
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.id = this.$route.query.id;
			console.log(this.userInfo);
			if(this.userInfo == ''){
				console.log("1111")
			}else{
				this.getDetails();
			}
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.id = this.$route.query.id;
		},
		filters:{
			financMoneyChange:function(e){
				if(e == undefined){
					return e = 0;
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
		background: url(../../../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
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
				color:$fontBlue;
			}
			.list_title{
				width: 100%;
				background-color:$titleBlue;
				overflow-x: scroll;
				height: 0.8rem;
				border-bottom: 1px solid #12141a;
				ul{
					li{
						line-height: 0.8rem;
						height: 0.8rem;
						float: left;
						width: 1.5rem;
						text-align: left;
						&:nth-child(1){
							text-indent: 0.3rem;
						}
					}
				}
			}
			.list_title_row{
				color: $white;
				ul{
					li{
						&:nth-child(2){
							text-align: center;
							display: flex;
							flex-direction: column;
							line-height: 0.4rem;
							padding-right: 0.1rem;
						}
					}
				}
				span{
					color:$fontBlue;
				}
			}
	}
</style>