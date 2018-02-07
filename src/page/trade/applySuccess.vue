<template>
	<div id="applySuccess">
		<mt-header title="申请成功" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;line-height: 1rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/customerServices" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<div class="icon">
				<i></i>
				<p>融资方案申请成功</p>
			</div>
			<div class="bt">
				<btn className="bluelg" name="立即交易"></btn>
			</div>
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default{
		name:"applySuccess",
		components:{btn},
		data(){
			return{
				
			}
		},
		methods:{
			toFinance:function(){
				setTimeout(function(){
					this.$router.push({path:"/myFinance"});
				}.bind(this),5000)
			}
		},
		mounted:function(){
		},
		activated:function(){
			this.toFinance();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#applySuccess{
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
		width: 100%;
		margin-top: 1rem;
		.icon{
			margin-top: 50%;
			text-align: center;
			width: 100%;
			i{
				margin: auto;
				background: url(../../assets/images/applySuccess.png);
				display: block;
				width: 1.5rem;
				height: 1rem;
				background-size: 100% 100%;
			}
			p{
				margin-top: 0.3rem;
				font-size: $fs32;
			}
		}
		.bt{
			margin-top: 0.8rem;
			width: 100%;
			padding: 0 0.3rem;
		}
	}
</style>