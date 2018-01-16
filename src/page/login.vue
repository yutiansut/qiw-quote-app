<template>
	<div id="login">
		<mt-header title="登录" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/account" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<ul>
				<li>
					<i></i>
					<input type="text" value="" placeholder="请输入手机号" class="input1" v-model="phone"/>
				</li>
				<li>
					<i></i>
					<input type="password"  value="" placeholder="请输入密码" class="input1" v-model="password"/>
					<div id="eye">
					</div>
				</li>
			</ul>
			<div id="toForgetPassword">
				<span>请输入正确手机号</span>
				<a href="">忘记密码？</a>
			</div>
			<mt-button class="btn" @click.native="login">登录</mt-button>
			<p>新用户注册>></p>
			<div id="wechat">
				<i></i>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from "../assets/js/common.js"
	import axios from "axios"
	export default{
		name:'login',
		data(){
			return{
				phone:"",
				password:"",
				phoneReg:/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/,
				pwdReg:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
			}
		},
		methods:{
			login:function(){
				if(this.phone == ''){
					this.$toast({message: '请输入手机号',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '手机格式错误',duration: 2000});
				}else if(this.password == ''){
					this.$toast({message: '请输入密码',duration: 2000});
				}else if(this.pwdReg.test(this.password) == false){
					this.$toast({message: '密码由6到18位字母和数字组成',duration: 2000});
				}else{
					//登录请求
					var info = {
						mobile:this.phone,
						pwd:this.password,
						
					};
					pro.fetch('post', '/loginAndRegister/mobileLogin',info, "").then(function(res){
						console.log(res)
						if(res.success == true){
							if(res.code == 1){
								this.$toast({message: '登录成功',duration: 1000});
							}
						}
					}.bind(this)).catch(function(err){
						console.log(err)
						var data = err.data;
						this.num = data.data.failNum;
						if(data.success == false){
							if(this.num > 2){
								this.$refs.codeDialog.isshow = true;
								this.$refs.codeDialog.path = this.PATH + "/loginAndRegister/getImgCode.jpg" + Math.random()*1000 + "?mobile=" + this.phone;
								this.str = {
									loginName : this.phone,
									password :this.pwd
								}
							}
							if(data.data.date != undefined){
								var h = data.data.thawTime;
								var hour = h.split(':')[0];
								var minute = parseInt((h - hour) * 60);
								this.$toast({message: data.message + '，距解冻时间还有' + hour + '小时' + minute + '分',duration: 2000});
							}else{
								this.$toast({message: data.message,duration: 2000});
							}
						}else {
							this.$toast({message: '网路不给力',duration: 2000});
						}
					}.bind(this));
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	#login{
		width: 7.5rem;
	}
	#back{
		background: url(../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		text-align: center;
		padding: 0.5rem 0.3rem 0rem 0.3rem;
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
			width: 6.6rem;
			border-bottom: 1px solid #505664;
			text-indent: 1rem;
			color: $white;
			margin-top: 0.2rem;
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
		#toForgetPassword{
			margin-top: 0.2rem;
			text-align: center;
			width: 100%;
			height: 0.8rem;
			a{
				color: $white;
				float: right;
				margin-top: 0.16rem;
			}
			span{
				background-color: #2d3340;
				box-shadow: 0px 0px 5px 5px #21252e;
				padding: 0.2rem 0.5rem;
				line-height: 0.5rem;
				color: $orange;
				border-radius: 5px;
			}
		}
		.btn{
			margin-top: 0.9rem;
			width:100%;
			height: 0.8rem;
			background-color: $blue;
			color: $white;
			border: none;
		}
		p{
			color: $white;
			margin-top: 0.8rem;
		}
		#wechat{
			position: fixed;
			bottom: 0.3rem;
			width: 100%;
			i{
				background:url(../assets/images/wechat_02.png);
				display: inline-block;
				width:0.88rem;
				height: 0.88rem;
				background-size: 100% 100%;
				
			}
		}
	}
</style>