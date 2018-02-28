<template>
	<div id="login">
		<mt-header title="登录" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="customerServices" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<ul>
				<li>
					<i></i>
					<input type="tel" value="" placeholder="请输入手机号" class="input1" v-model="phone" maxlength="11" />
				</li>
				<li>
					<i></i>
					<input type="password"  value="" placeholder="请输入密码（至少6位且包含字母）" class="input1 input2" v-model="password" />
					<div class="eye" @click="eyeEvent" v-show="showEye"></div>
					<div class="eye1" @click="eyeEvent" v-show="showNo"></div>
				</li>
			</ul>
			<div id="toForgetPassword">
				<a @click="toForgetPassword">忘记密码？</a>
			</div>
			<mt-button class="btn" @click.native="login">登录</mt-button>
			<p @click="toRegisiter">新用户注册>></p>
			<div id="wechat" v-show="showWhat">
				<i @click="getWechatId"></i>
			</div>
		</div>
		<codeDialog ref="codeDialog" :objstr="sendMsg" type="login"></codeDialog>
	</div>
</template>

<script>
	import pro from "../../../assets/js/common.js"
	import codeDialog from "../../../components/codeDialog.vue"
	export default{
		name:'login',
		components : {codeDialog},
		data(){
			return{
				phone:"",
				password:"",
				phoneReg:/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/,
				pwdReg:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
				num:"",
				str:'',
				token:"",
				secret:"",
				showEye:true,
				showNo:false,
				showWhat:true,
				fullHeight:document.documentElement.clientHeight,
				fullHeight1:document.documentElement.clientHeight
			}
		},
		computed : {
			sendMsg(){
				if(this.str) return JSON.stringify(this.str);
			},
			PATH: function(){
				return this.$store.getters.PATH;
			},
			environment(){
				return this.$store.state.environment;
			},
		},
		methods:{
			toForgetPassword:function(){
				this.$router.push({path:"/forgetPassword"})
			},
			toRegisiter:function(){
				this.$router.push({path:"/regisiter"});
			},
			eyeEvent:function(e){
				if(this.showEye == true){
					this.showEye=!this.showEye;
					this.showNo=!this.showNo;
					$(e.target).removeClass("current").siblings(".input2").attr("type",'text');
				}else{
					this.showEye=!this.showEye;
					this.showNo=!this.showNo;
					$(e.target).removeClass("current").siblings(".input2").attr("type",'password');
				}
			},
			login:function(){
				if(this.phone == ''){
					this.$toast({message: '请输入手机号',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '手机格式错误',duration: 2000});
				}else if(this.password == ''){
					this.$toast({message: '请输入密码',duration: 2000});
				}else if(this.pwdReg.test(this.password) == false){
					this.$toast({message: '密码由6到16位字母和数字组成',duration: 2000});
				}else{
					//登录请求
					var ClientId = localStorage.clientid ? JSON.parse(localStorage.clientid).id : '';
					var info = {
						mobile:this.phone,
						password:this.password,
						clientId:ClientId
					};
					pro.fetch('post', '/loginAndRegister/mobileLogin',info, "").then(function(res){
						console.log(res)
						if(res.success == true){
							if(res.code == 1){
								this.$toast({message: '登录成功',duration: 1000,});
								this.token = res.data.token;
								this.secret = res.data.secret;
								var userData = {'username':this.phone,'password':Base64.encode(this.pwd),'token':res.data.token,'secret':res.data.secret};
								localStorage.setItem("user", JSON.stringify(userData));
								this.$router.push({path:"/index"});
								this.$store.state.account.isLogin = true;
							}
						}
					}.bind(this)).catch(function(err){
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后重试",duration: 2000});
						}else{
							this.$toast({message: data.message,duration: 2000});
							this.num = data.data.failNum;
							if(this.num > 2){
								this.$refs.codeDialog.isshow = true;
								this.$refs.codeDialog.path = this.PATH + "/loginAndRegister/getImgCode.jpg" + Math.random()*1000 + "?mobile=" + this.phone;
								this.str = {
									loginName : this.phone,
									password :this.password
								}
							}
						}
					}.bind(this));
				}
			},
			getWechatId:function(){
				pro.toweixin();
				var weixinInfo = JSON.parse(localStorage.weixinUser) ? JSON.parse(localStorage.weixinUser) : "" ;
				var ClientId = JSON.parse(localStorage.clientid).id ? JSON.parse(localStorage.clientid).id : '';
				var data ={
					openId:weixinInfo.openid,
					clientId:ClientId
//					openId:"oRrdQt-T23iJ8wjd-PaCt_WoMefw"
				}
//				console.log("88888888888888")
//				this.$router.push({path:"/index"})
				pro.fetch("post","/loginAndRegister/wxLogin",data,"").then(function(res){
					if(res.code == 1 && res.success == true){
						var userData = {'username':res.data.mobile,'token':res.data.token,'secret':res.data.secret};
						localStorage.user=JSON.stringify(userData);
						this.$toast({message:"授权登录成功",duration: 1000});
						this.$router.push({path:"/index"});
						this.$store.state.account.isLogin = true;
					}
				}.bind(this)).catch(function(err){
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
					}else{
						this.$toast({message:"请先绑定手机号",duration: 1000});
						this.$router.push({path:"/wechatRegisiter",query:{weixinInfo:weixinInfo}})
					}
				}.bind(this));
			}
		},
		mounted:function(){
			pro.getClentId();
			pro.isWXInstalled();
			var isWXInstalled = localStorage.isWXInstalled ? localStorage.isWXInstalled : '';
			if(isWXInstalled == 'false'){
				this.showWhat = false;
			}else{
				this.showWhat = true;
			}
		},
		activated:function(){
			this.fullHeight1 = document.documentElement.clientHeight;
			const that = this
		    window.onresize = () => {
		        return (() => {
		          window.fullHeight = document.documentElement.clientHeight
		          that.fullHeight = window.fullHeight
		        })()
		    }
			pro.isWXInstalled();
			var isWXInstalled = localStorage.isWXInstalled ? localStorage.isWXInstalled : '';
			if(isWXInstalled == 'false'){
				this.showWhat = false;
			}else{
				this.showWhat = true;
			}
		},
		watch:{
			fullHeight (val) {
		        console.log("======"+val)
		        if(val != this.fullHeight1){
		        	this.showWhat = false;
		        }else{
		        	this.showWhat =true;
		        }
		    }
		}
}
</script>

<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#login{
		width: 7.5rem;
	}
	#back{
		display: inline-block;
		width: 0.64rem;
		height: 1rem;
		background: url(../../../assets/images/back_icon.png) no-repeat 0.15rem 0.34rem;
		background-size: 0.24rem 0.32rem;
	}
	#container{
		width: 7.5rem;
		margin-top: 1rem;
		padding-top: 0.5rem;
		li{
			/*padding: 0 0.3rem;*/
			height: 1.2rem;
			position: relative;
			&:nth-child(1){
				i{
					background: url(../../../assets/images/regisiter_icon.png);
					background-size: 100% 100%;
					position: absolute;
					top: 0.48rem;
					left: 0.58rem;	
					display: inline-block;
					width: 0.42rem;
					height: 0.42rem;
				}
			}
			&:nth-child(2){
				i{
					background: url(../../../assets/images/password_icon.png);
					background-size: 100% 100%;
					position: absolute;
					top: 0.48rem;
					left: 0.58rem;	
					display: inline-block;
					width: 0.42rem;
					height: 0.42rem;
				}
			}
			.input1{
				margin-left: 0.3rem;
				background-color: $bg;
				border: none;
				outline: none;
				height: 0.9rem;
				width: 6.9rem;
				border-bottom: 1px solid #505664;
				text-indent: 1rem;
				color: $white;
				margin-top: 0.2rem;
				border-radius: 0 !important;
				font-size: $fs32;
			}
		}
		.eye{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.6rem;
			background: url(../../../assets/images/eye_icon.png);
			background-size: 100% 100%;
		}
		.eye1{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.6rem;
			background: url(../../../assets/images/eyeopen_icon.png);
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
				margin-right: 0.3rem;
			}
		}
		.btn{
			margin-top: 0.9rem;
			width:6.9rem;
			height: 0.8rem;
			background-color: $blue;
			color: $white;
			border: none;
			margin-left: 0.3rem;
		}
		p{
			text-align: center;
			color: $white;
			margin-top: 0.8rem;
		}
		#wechat{
			text-align: center;
			position: fixed;
			bottom: 0.3rem;
			width: 100%;
			i{
				background:url(../../../assets/images/wechat_02.png);
				display: inline-block;
				width:0.88rem;
				height: 0.88rem;
				background-size: 100% 100%;
				
			}
		}
	}
</style>