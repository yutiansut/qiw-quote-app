<template>
	<div id="recharge">
		<mt-header title="我要充值" fixed style="background-color:#242933;font-size: 0.32rem;height: 0.8rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/customerServices" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<div class="ipt">
				<input type="number" v-model="rechargeMoney" placeholder="请输入充值金额"/>
			</div>
			<div class="title_lev2">
				余额：<span>{{accountMoney}}</span>元
			</div>
			<div id="btn">
				<mt-button class="btn" @click.native="recharge"  type="danger">立即充值</mt-button>
			</div>
			<p>充值后余额：<span>{{totalMoney}}</span>元</p>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"recharge",
		data(){
			return{
				rechargeMoney:"",
				rechargeReg:/^[0-9]+([.][0-9]+)?$/,
				accountMoney:"",
				totalMoney:"",
				phone:"",
				minRecharge:""
			}
		},
		watch:{
			rechargeMoney:function(e){
				this.totalMoney = Number(this.accountMoney) + Number(e) ;
				return
			}
		},
		methods:{
			recharge:function(){
//				console.log(typeof this.minRecharge)
//				console.log("this.rechargeMoney====="+this.rechargeMoney)
				if(this.rechargeMoney == undefined){
					this.$toast({message:"充值金额不能为空",duration: 1000});
				}else if(this.rechargeReg.test(this.rechargeMoney) == false){
					this.$toast({message:"充值金额格式错误",duration: 1000});
				}else if(this.rechargeMoney<this.minRecharge){
					this.$toast({message:"最小充值金额为"+this.minRecharge+"元",duration: 1000});
				}else{
					this.$router.push({path:"/payWays",query:{phone:this.phone,money:this.rechargeMoney}});
				}
			},
			getUserInfo:function(){
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/account/getBasicMsg","",headers).then((res)=>{
//					console.log("res==="+JSON.stringify(res))
					if(res.code == 1 && res.success == true){
						this.accountMoney = res.data.balance;
						if(this.rechargeMoney!='' && this.rechargeMoney!=undefined){
							this.totalMoney = Number(this.accountMoney)+Number(this.rechargeMoney);
						}else{
							this.totalMoney = this.accountMoney;
						}
						this.phone = res.data.mobile;
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
			getMinRecharge:function(){
				pro.fetch("post","/others/getSysparam","","").then((res)=>{
					if(res.code == 1 && res.success == true){
						this.minRecharge = Number(res.data.minPayMoney);
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
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.rechargeMoney = this.$route.query.rechargeMoney;
			if(this.rechargeMoney == undefined){
				this.rechargeMoney = ''
			}
			if(this.userInfo == ''){
//				console.log("未登录");
			}else{
//				console.log("一登录")
				this.getUserInfo();
				this.getMinRecharge();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#newsNotice{
		width: 7.5rem;
	}
	#back{
		display: inline-block;
		width: 0.64rem;
		height: 1rem;
		background: url(../../assets/images/back_icon.png) no-repeat 0.15rem 0.34rem;
		background-size: 0.24rem 0.32rem;
	}
	#container{
		color:$fontBlue ;
		width: 100%;
		margin-top: 1rem;
		border-top: 1px solid #12141a;
		.ipt{
			height: 1.5rem;
			padding: 0rem 0.3rem;
			width:100%;
			input{
				width: 100%;
				height: 0.9rem;
				border: 1px solid #12141a;
				background-color:#1B1F26;
				margin-top: 0.3rem;
				border-radius: 0.1rem;
				text-indent: 0.2rem;
				color: $white;
				font-size: $fs28;
			}
		}
		.title_lev2{
			height: 0.64rem;
			width: 100%;
			line-height: 0.64rem;
			text-align: left;
			padding-left: 0.4rem;
			border-bottom: 1px solid #12141a;
			border-top: 1px solid #12141a;
			background-color: $titleBlue;
			color: $fontBlue;
			font-size: $fs24;
			span{
				color: $white;
				margin: 0rem 0.1rem;
			}
		}
		#btn{
			width: 100%;
			padding: 0rem 0.3rem 0.3rem;
			.btn{
				margin-top: 0.3rem;
				width:100%;
				height: 0.8rem;
				background-color: $red;
				color: $white;
				border: none;
				font-size: $fs32;
			}
		}
		p{
			padding-left: 0.3rem;
			span{
				color: $white;
				margin: 0 0.1rem;
			}
		}
	}
</style>