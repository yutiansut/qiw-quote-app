<template>
	<div id="regisiter">
		<mt-header title="注册" fixed style="background-color:#242933;font-size: 0.24rem;">
		  	<router-link to="/" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/" slot="right">
		    	<mt-button style="font-size: 0.16rem;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<div class="container_1">
				<input type="text" name="" id="" value="" placeholder="请输入手机号"/>
			</div>
			<div class="container_2">
				<input type="text" name="" id="" value="" placeholder="请输入验证码"/>
			</div>
			<div  class="container_3">
				<input type="text" name="" id="" value="" placeholder="请输入密码"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'regisiter',
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	@import "../assets/css/common.scss";
	#regisiter{
		width: 7.5rem;
	}
	#back{
		background: url(../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#container input{
		border-bottom: 0.01rem solid #A3AACC;
		width: 100%;
		height: 1.15rem;
	}
</style>