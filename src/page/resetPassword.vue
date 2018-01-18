<template>
	<div id="resetPassword">
		<mt-header title="设置新密码" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/forgetPassword" slot="left">
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
					<input type="password" value="" placeholder="请输入密码(至少6位)" class="input1 input2" v-model="password"/>
					<div class="eye1_1" @click="eyeEvent" v-show="show1"></div>
					<div class="eye1_2" @click="eyeEvent" v-show="show2"></div>
				</li>
				<li>
					<i></i>
					<input type="password"  value="" placeholder="请再次输入密码" class="input1 input3" v-model="password1"/>
					<div class="eye_1" @click="eyeEvents" v-show="showNo1"></div>
					<div class="eye_2" @click="eyeEvents" v-show="showNo2"></div>
				</li>
			</ul>
			<mt-button class="btn" @click="login">确认</mt-button>
			<p @click="toRegisiter">新用户注册>></p>
			<div id="wechat">
				<i></i>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from "../assets/js/common.js"
	export default{
		name:"resetPassword",
		data(){
			return{
				code:'',
				password:"",
				password1:"",
				pwdReg:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
				phone:"",
				show1:true,
				show2:false,
				showNo1:true,
				showNo2:false
			}
		},
		methods:{
			toRegisiter:function(){
				this.$router.push({path:"/regisiter"});
			},
			eyeEvent:function(e){
				if(this.show1 == true){
					this.show1=!this.show1;
					this.show2=!this.show2;
					$(e.target).removeClass("current").siblings(".input2").attr("type",'text');
				}else{
					this.show1=!this.show1;
					this.show2=!this.show2;
					$(e.target).removeClass("current").siblings(".input2").attr("type",'password');
				}
			},
			eyeEvents:function(e){
				if(this.showNo1 == true){
					this.showNo1=!this.showNo1;
					this.showNo2=!this.showNo2;
					$(e.target).removeClass("current").siblings(".input3").attr("type",'text');
				}else{
					this.showNo1=!this.showNo1;
					this.showNo2=!this.showNo2;
					$(e.target).removeClass("current").siblings(".input3").attr("type",'password');
				}
			},
			login:function(){
				if(this.password == ''){
					this.$toast({message: '请输入密码',duration: 2000});
				}else if(this.password1 == ''){
					this.$toast({message: '请输入确认密码',duration: 2000});
				}else if(this.pwdReg.test(this.password) == false || this.pwdReg.test(this.password1) == false){
					this.$toast({message: '请输入6-16位数字加字母的密码',duration: 2000});
					this.password = "";
					this.password = "";
				}else if(this.password!=this.password1){
					this.$toast({message: '密码两次输入不一致，请仔细检查',duration: 2000});
				}else{
					var data = {
						mobile:this.phone,
						smsCode:this.code,
						newPwd:this.password
					}
					pro.fetch("post","/loginAndRegister/setNewPwd",data,"").then((res)=>{
						if( res.code == 1 && res.success == true){
							this.$toast({message: '登录密码设置成功',duration: 2000});
							this.$router.push({path:"/login"});
						}
					}).catch((err)=>{
						var data =err.data;
						if(data == undefined){
							this.$toast({message: '网络不给力，请稍后再试',duration: 2000});
						}else{
							this.$toast({message:data.message,duration: 2000});
						}
					})
				}
			}
		},
		mounted:function(){
			this.code = this.$route.query.sendcode;
			this.phone = this.$route.query.sendphone;
		},
		activited:function(){
			this.code = this.$route.query.sendcode;
			this.phone = this.$route.query.sendphone;
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	#resetPassword{
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
		.eye_1{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			background: url(../assets/images/eye_icon.png);
			background-size: 100% 100%;
		}
		.eye_2{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			background: url(../assets/images/eyeopen_icon.png);
			background-size: 100% 100%;
		}
		.eye1_1{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			background: url(../assets/images/eye_icon.png);
			background-size: 100% 100%;
		}
		.eye1_2{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			background: url(../assets/images/eyeopen_icon.png);
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
		P{
			color: $white;
			margin-top: 0.8rem;
		}
		#wechat{
			width: 100%;
			position: fixed;
			bottom: 0.8rem;
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