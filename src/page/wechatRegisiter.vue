<template>
	<div id="regisiter">
		<mt-header title="注册" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/account" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="wechatInfo">
			<ul>
				<li><img v-bind:src="this.imgurl"/></li>
				<li>
					<p>亲爱的&nbsp;<span>{{nickname}}</span></p>
					<p>{{info}}</p>
				</li>
			</ul>
		</div>
		<div id="container">
			<ul>
				<li>
					<i></i>
					<input type="text" value="" placeholder="请输入手机号" class="input1"/>
				</li>
				<li>
					<i></i>
					<input type="text"  value="" placeholder="请输入验证码" class="input1"/>
					<div id="code">
						<span @click="getCode">获取验证码</span>
					</div>
				</li>
				<li>
					<i></i>
					<input type="password"  value="" placeholder="请输入密码" class="input1"/>
					<div id="eye">
					</div>
				</li>
			</ul>
			<mt-button class="btn">立即绑定并注册</mt-button>
			<a @click="">已有账户？立即登录>></a>
		</div>
	</div>
</template>

<script>
	import pro from "../assets/js/common.js"
	export default{
		name:"wechatRegisiter",
		data(){
			return{
				info:"为了您的账户安全，请您关联您的手机号，下次可直接登录。",
				nickname:"留恋流年",
				imgurl:"http://wx.qlogo.cn/mmopen/vi_32/waVrKVVGvmjlibK4yX2TxDYdNvPLXa5nl2FyN80C2guDZtd8VbfHqeYJaicTxhMDubhphVzUdxjb0ymKgNp6n10Q/132"
			}
		},
		methods:{
			getCode:function(){
				
			},
			getinfo:function(){
				var data = {
					openId:"oRrdQt-T23iJ8wjd-PaCt_WoMefw"
				}
				pro.fetch("post","/loginAndRegister/wxLogin","").then((res)=>{
					console.log("res==="+res)
				}).catch((err)=>{
					console.log("err==="+err)
				})
			}
		},
		mounted:function(){
//			this.info = this.info1
			this.getinfo();
		}
	}
</script>

<style scoped lang="scss">
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
	#wechatInfo{
		width: 100%;
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		text-align: center;
		padding: 0rem 0.3rem 0rem 0.3rem;
		height: 1.75rem;
		border-bottom: 1px solid #12141a;
		ul{
			display: flex;
			justify-content: flex-end;
			li{
				&:nth-child(1){
					img{
						width: 0.8rem;
						height: 0.8rem;
						display: block;
						background-size: 100% 100%;
						margin-top: 0.3rem;
						border-radius: 50%;
					}
				}
				&:nth-child(2){
					padding-left: 0.26rem;
					display: flex;
					flex-direction: column;
					text-align: left;
					margin-top: 0.4rem;
					p{
						line-height: 0.3rem;
						&:nth-child(2){
							margin-top: 0.1rem;
						}
					}
					span{
						color: white;
						font-size: 0.28rem;
					}
				}
			}
		}
	}
	#container{
		width: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
		padding: 0rem 0.3rem 0rem 0.3rem;
		li{
			height: 1.2rem;
			position: relative;
			&:nth-child(1){
				i{
					background: url(../assets/images/regisiter_icon.png);
					background-size: 100% 100%;
					position: absolute;
					top: 0.48rem;
					left: 0.28rem;	
					display: inline-block;
					width: 0.42rem;
					height: 0.42rem;
				}
			}
			&:nth-child(2){
				i{
					background: url(../assets/images/verification_icon.png);
					background-size: 100% 100%;
					position: absolute;
					top: 0.48rem;
					left: 0.28rem;	
					display: inline-block;
					width: 0.42rem;
					height: 0.42rem;
				}
			}
			&:nth-child(3){
				i{
					background: url(../assets/images/password_icon.png);
					background-size: 100% 100%;
					position: absolute;
					top: 0.48rem;
					left: 0.28rem;	
					display: inline-block;
					width: 0.42rem;
					height: 0.42rem;
				}
			}
		}
		.input1{
			background-color: $bg;
			border: none;
			outline: none;
			height: 0.9rem;
			width: 100%;
			border-bottom: 1px solid #505664;
			text-indent: 1rem;
			color: $white;
			margin-top: 0.2rem;
			&:hover{
				border-color: $blue;
			}
		}
		#code{
			position: absolute;
			width: 1.8rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0;
			color: $white;
			border-left: 1px solid #505664;
		}
		#eye{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			background: url(../assets/images/eye_icon.png);
			background-size: 100% 100%;
		}
		.btn{
			margin-top: 0.9rem;
			width:100%;
			height: 0.8rem;
			background-color: $blue;
			color: $white;
			border: none;
		}
		a{
			text-align: center;
			color: $white;
			margin-top: 0.8rem;
		}
	}
</style>