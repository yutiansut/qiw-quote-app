<template>
	<div id="resetLoginPassword">
		<mt-header title="修改登录密码" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/personalSet" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<ul>
				<li>
					<i></i>
					<input type="password" class="input1" placeholder="旧密码" v-model="oldPassword"/>
				</li>
			</ul>
			<ul>
				<li>
					<i></i>
					<input type="password" class="input1" placeholder="新密码(6-16位数字加字母)" v-model="newPassword"/>
				</li>
			</ul>
			<ul>
				<li>
					<i></i>
					<input type="password" class="input1" placeholder="确认新密码(6-16位数字加字母)" v-model="newPassword1"/>
				</li>
			</ul>
			<mt-button class="btn" @click.native="confirm">完成</mt-button>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"resetLoginPassword",
		data(){
			return{
				oldPassword:"",
				newPassword:"",
				newPassword1:"",
				pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
			}
		},
		methods:{
			confirm:function(){
				if(this.oldPassword == ''){
					this.$toast({message:"请输入原密码",duration: 2000});
				}else if(this.newPassword == ''){
					this.$toast({message:"请输入新密码",duration: 2000});
				}else if(this.newPassword1 == ''){
					this.$toast({message:"请输入确认密码",duration: 2000});
				}else if(this.pwdReg.test(this.oldPassword)== false){
					this.$toast({message:"请输入6-16位数字加字母的密码",duration: 2000});
				}else if(this.pwdReg.test(this.newPassword)== false){
					this.$toast({message:"请输入6-16位数字加字母的密码",duration: 2000});
				}else if(this.pwdReg.test(this.newPassword1)== false){
					this.$toast({message:"请输入6-16位数字加字母的密码",duration: 2000});
				}else if(this.newPassword!=this.newPassword1){
					this.$toast({message:"两次密码输入不一致，请重新输入",duration: 2000});
				}
				else{
					var data = {
						oldPwd:this.oldPassword,
						newPwd:this.newPassword
					}
					var headers = {
						token : this.userInfo.token,
						secret : this.userInfo.secret
					}
					pro.fetch("post","/account/modifyPwd",data,headers).then((res)=>{
						if(res.code == 1 && res.success == true){
							this.$toast({message:"修改成功，请重新登录",duration: 2000});
							this.$router.push({path:"/login"});
						}
					}).catch((err)=>{
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
						}else if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 2000});
							this.$router.push({path:"/login"});
						}else{
							this.$toast({message:data.message,duration: 2000});
						}
					})
				}
			}
		},
		mounted:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#resetLoginPassword{
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
		padding: 0 0.3rem;
		display: flex;
		flex-direction: column;
			ul{
				li{
					position: relative;
					i{
						background: url(../../assets/images/account/resetLoginPassword.png);
						background-size: 100% 100%;
						position: absolute;
						top: 0.56rem;
						left: 0.3rem;	
						display: inline-block;
						width: 0.42rem;
						height: 0.42rem;
					}
				}
			}
			.btn{
				margin-top: 0.3rem;
				width:100%;
				height: 0.8rem;
				background-color: $blue;
				color: $white;
				border: none;
			}
			.input1{
				background-color: #1b1f26;
				border: 1px solid #12141a;
				outline: none;
				border-radius: 0.1rem;
				height: 0.88rem;
				width: 6.9rem;
				text-indent: 1rem;
				color: $white;
				margin-top: 0.3rem;
			}
	}
</style>