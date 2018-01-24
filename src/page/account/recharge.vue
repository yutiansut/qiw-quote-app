<template>
	<div id="recharge">
		<mt-header title="我要充值" fixed style="background-color:#242933;font-size: 0.32rem;height: 0.8rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/account" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<div class="ipt">
				<input type="number" v-model="rechargeMoney" placeholder="充值金额  请输入充值金额"/>
			</div>
			<div class="title_lev2">
				余额：<span>{{accountMoney}}</span>元
			</div>
			<div id="btn">
				<mt-button class="btn" @click.native="recharge">立即充值</mt-button>
			</div>
			<p>充值后余额：<span>{{totalMoney}}</span>元</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:"recharge",
		data(){
			return{
				rechargeMoney:"",
				rechargeReg:/^[0-9]*$/,
				accountMoney:1080,
				totalMoney:1080
				
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
				if(this.rechargeMoney == ''){
					this.$toast({message:"充值金额不能为空",duration: 1000});
				}else if(this.rechargeReg.test(this.rechargeReg) == true){
					this.$toast({message:"充值金额格式错误",duration: 1000});
				}else{
					this.$router.push({path:"/payWays"});
				}
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
		background: url(../../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
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