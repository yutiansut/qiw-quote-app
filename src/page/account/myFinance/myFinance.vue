<template>
	<div id="myFinance">
		<mt-header title="我的融资" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;line-height: 1rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/account" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">规则</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container" v-show="exist">
			<div class="list" v-for="(k,index) in list">
				<div id="black"></div>
				<div class="state" @click="toDetails(k.id)">
					<ul>
						<!--方案列表-->
						<li class="state_1" v-if="k.state == 1">
							<i></i>
						</li>
						<li class="state_2" v-else-if="k.state == 2">
							<i></i>
						</li>
						<li class="state_3" v-else-if="k.state == 3">
							<i></i>
						</li>
						<li class="state_4" v-else-if="k.state == 4">
							<i></i>
						</li>
						<!--方案列表-->
						<li></li>
						<li>
							<span>{{k.applyTime}} ></span>
						</li>
					</ul>
				</div>
				<div class="info">
					<ul>
						<li>融资保证金：<span>{{k.tradeDeposit}}</span>元</li>
						<li>总操盘资金：<span>{{k.totalTradeFund}}</span>元</li>
					</ul>
					<ul>
						<li>融资金额：<span>{{k.financmoney}}</span>元</li>
						<li>亏损平仓线：<span>{{k.lossCloseoutLine}}</span>元</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="none" v-show="none">
			<p>暂无融资记录，快去申请吧！</p>
			<mt-button class="btn">立即申请</mt-button>
		</div>
	</div>
</template>

<script>
	import pro from "../../../assets/js/common.js"
	export default{
		name:"myFinance",
		data(){
			return{
				exist:true,
				none:false,
				list:''
//				list:[{
//					id:123456789,
//					applyTime:1516355568000,
//					financmoney:200,
//					tradeDeposit:500,
//					totalTradeFund:500,
//					lossCloseoutLine:300,
//					state:1,
//					tradeprofitandloss:1213
//				},
//				{
//					id:135151315,
//					applyTime:1516223258000,
//					financmoney:100,
//					tradeDeposit:400,
//					totalTradeFund:400,
//					lossCloseoutLine:200,
//					state:4,
//					tradeprofitandloss:300
//				},
//				{
//					id:65151351,
//					applyTime:1321358258000,
//					financmoney:153,
//					tradeDeposit:6511,
//					totalTradeFund:64864,
//					lossCloseoutLine:1518,
//					state:1,
//					tradeprofitandloss:31516
//				},
//				{
//					id:61848919818,
//					applyTime:1512358258000,
//					financmoney:55757,
//					tradeDeposit:5857,
//					totalTradeFund:58587,
//					lossCloseoutLine:58578,
//					state:3,
//					tradeprofitandloss:5578
//				},
//				{
//					id:8757,
//					applyTime:1516123258000,
//					financmoney:58757,
//					tradeDeposit:5757,
//					totalTradeFund:22424,
//					lossCloseoutLine:2767867,
//					state:2,
//					tradeprofitandloss:7635424
//					}
//				]	
			}
		},
		methods:{
			toDetails:function(a){
				console.log("id==="+a)
				this.$router.push({path:"/financeDetails",query:{id:a}});
			},
			getUserInfo:function(){
				var data = {
					pageNo:"",
					pageSize:""
				}
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/futureManage/getProgramList",data,headers).then((res)=>{
					console.log("res=="+JSON.stringify(res))
					if(res.code == 1 && res.success == true){
						this.list = res.data.list;
//						console.log("this.list=="+this.list)
						if(this.list == undefined){
							this.none=true;
							this.exist=false;
						}else{
							this.none=false;
							this.exist=true
						}
					}
				}).catch((err)=>{
					console.log("res=="+JSON.stringify(err))
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
				this.getUserInfo();
			}
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
		}
	}
</script>

<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#myFinance{
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
		margin-top: 0.8rem;
		.state{
			padding-right:0.3rem;
			width: 100%;
			height: 0.9rem;
			border-bottom: 1px solid #12141a;
			line-height: 0.9rem;
			ul{
				display: flex;
				justify-content: space-between;
			}
			.state_1{
				display: block;
				width: 0.87rem;
				height: 0.87rem;
				background: url(../../../assets/images/account/state_01.png);
				background-size: 100% 100%;
			}
			.state_2{
				display: block;
				width: 0.87rem;
				height: 0.87rem;
				background: url(../../../assets/images/account/state_02.png);
				background-size: 100% 100%;
			}
			.state_3{
				display: block;
				width: 0.87rem;
				height: 0.87rem;
				background: url(../../../assets/images/account/state_03.png);
				background-size: 100% 100%;
			}
			.state_4{
				display: block;
				width: 0.87rem;
				height: 0.87rem;
				background: url(../../../assets/images/account/state_04.png);
				background-size: 100% 100%;
			}
		}
		.info{
			padding:0rem 0.3rem;
			width: 100%;
			height: 1.3rem;
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #12141a;
			ul{
				height: 0.65rem;
				display: flex;
				justify-content: space-between;
				line-height: 0.65rem;
				&:nth-child(1){
					padding-top: 0.2rem;
				}
				&:nth-child(2){
					padding-bottom: 0.2rem;
				}
				span{
					color: $white;
					margin: 0 0.1rem;
				}
			}
		}
	}
	#black{
		height: 0.2rem;
		width: 100%;
		background-color: #1b1f26;
		border-bottom: 1px solid #12141a;
	}
	#none{
		width: 100%;
		padding: 0rem 0.3rem;
		p{
			font-size: $fs32;
			margin-top: 60%;
			text-align: center;
		}
		.btn{
			margin-top: 0.3rem;
			width:100%;
			height: 0.8rem;
			background-color:$blue;
			color: $white;
			border: none;
			font-size: $fs32;
		}
	}
</style>