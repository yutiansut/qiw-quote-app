<template>
	<div id="personalSet">
		<mt-header title="个人设置" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<ul class="list">
				<li>昵称</li>
				<li>哈肚子</li>
				<li></li>
			</ul>
			<ul class="list">
				<li>手机号</li>
				<li>158****0000</li>
				<li @click="toResetPhone">修改&nbsp;></li>
			</ul>
			<div id="black"></div>
			<ul class="list">
				<li>登录密码</li>
				<li></li>
				<li @click="toResetPassword">修改&nbsp;></li>
			</ul>
			<ul class="list">
				<li>版本号</li>
				<li>v1.0.0</li>
				<li></li>
			</ul>
			<div id="btn">
				<mt-button class="btn">退出登录</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"personalSet",
		data(){
			return{
				
			}
		},
		methods:{
			toResetPhone:function(){
				this.$router.push({path:"/resetPhone"})
			},
			toResetPassword:function(){
				this.$router.push({path:"/resetLoginPassword"})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#personalSet{
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
		.list{
			width: 100%;
			height: 0.9rem;
			display: flex;
			justify-content: space-between;
			line-height: 0.9rem;
			li{
				&:nth-child(1){
					padding-left: 0.3rem;
					width: 20%;
				}
				&:nth-child(2){
					width: 60%;
					color: $white;
				}
				&:nth-child(3){
					text-align: right;
					width: 20%;
					padding-right: 0.3rem;
				}
			}
			&:nth-child(1){
				border-bottom: 1px solid #12141a;
			}
			&:nth-child(2){
			}
			&:nth-child(4){
				border-bottom: 1px solid #12141a;
			}
			&:nth-child(5){
				border-bottom: 1px solid #12141a;
				
			}
		}
		#black{
			width: 100%;
			height: 0.2rem;
			background-color:#1b1f26;
			border-bottom: 1px solid #12141a;
		}
		#btn{
			width: 100%;
			padding: 0 0.3rem;
			margin-top: 0.3rem;
			.btn{
				width:100%;
				height: 0.8rem;
				background-color: $blue;
				color: $white;
				border: none;
			}
		}
	}
</style>