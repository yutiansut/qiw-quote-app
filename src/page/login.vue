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
					<input type="password"  value="" placeholder="请输入密码" class="input1 input2" v-model="password"/>
					<div class="eye" @click="eyeEvent" v-show="showEye"></div>
					<div class="eye1" @click="eyeEvent" v-show="showNo"></div>
				</li>
			</ul>
			<div id="toForgetPassword">
				<a @click="toForgetPassword">忘记密码？</a>
			</div>
			<mt-button class="btn" @click.native="login">登录</mt-button>
			<p @click="toRegisiter">新用户注册>></p>
			<div id="wechat">
				<i @click="getWechatId"></i>
			</div>
		</div>
		<codeDialog ref="codeDialog" :objstr="sendMsg" type="login"></codeDialog>
	</div>
</template>

<script>
	import owner from "../assets/js/app.js"
	import pro from "../assets/js/common.js"
	import codeDialog from "../components/codeDialog.vue"
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
				showNo:false
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
					this.$toast({message: '密码由6到18位字母和数字组成',duration: 2000});
				}else{
					//登录请求
					var info = {
						mobile:this.phone,
						password:this.password
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
				this.weixinLogin(this);
					
			}
			,
			weixinLogin:function (this1) {
//			console.log("222222")
			owner.setState(null);
			//第三方登录
			var authBtns = ['qihoo', 'weixin', 'sinaweibo', 'qq']; //配置业务支持的第三方登录
			var auths = {};
//			console.log(JSON.stringify(plus.oauth));
//			console.log("666666666666666")
			console.log("auths==="+JSON.stringify(auths))
			plus.oauth.getServices(function(services) {
//				console.log("1111111")
				console.log(JSON.stringify(services))
				console.log("1111111")
				for(var i in services) {
					var service = services[i];
					auths[service.id] = service;
					if(~authBtns.indexOf(service.id)) {
						var isInstalled = owner.isInstalled(service.id);
						//						var btn = document.createElement('div');
						//如果微信未安装，则为不启用状态
						//						btn.setAttribute('class', 'oauth-btn' + (!isInstalled && service.id === 'weixin' ? (' disabled') : ''));
						//						btn.authId = service.id;
						//						btn.style.backgroundImage = 'url("images/' + service.id + '.png")'
						//						oauthArea.appendChild(btn);
					}
				}
				if(this1.classList.contains('disabled')) {
					mui.toast('抱歉，您尚未安装微信，请安装后再试！');
					return;
				}
				var id = "weixin"
				var auth = auths[id];
				console.log(JSON.stringify(auth))
				console.log("22222222222")
				auth.login(function() {
					//					mui.toast("登录认证成功");
					console.log(JSON.stringify(auth))
					console.log("88888888")
					auth.getUserInfo(function() {
						var name = auth.userInfo.nickname || auth.userInfo.name;
//						console.log("333333333333")
//						console.log(JSON.stringify(auth))
						userweixinLogin(auth)
//						app.createState(name, function() {
//							//							mui.open_window_data("weixinRegister.html", "weixinRegister",{"openid": auth.userInfo.openid,"headimgurl":auth.userInfo.headimgurl,"nickName":auth.userInfo.nickname});
//						});
					}, function(e) {
//						mui.toast("获取用户信息失败：1" + e.message);
					});
				}, function(e) {
//					mui.toast("登录认证失败：2" + e.message);
				});
			}, function(e) {
//				mui.toast("获取登录认证失败：3" + e.message);
			});
		},

		userweixinLogin:function (auth) {
			var name = auth.userInfo.nickname || auth.userInfo.name;
//			mui.app_request('/wechatToLogin ', {
//				'wxOpenId': auth.userInfo.unionid
//			}, function(result) {
//				mui.toast("登录成功！");
//				//存储用户信息
//				var win = mui.get_window_data();
//				mui.cacheUser.save(result.data.token, result.data.secret);
//				//				if(win.backpageID) {
//				//						mui.app_back(win.backpageID, true,win.url);
//				//					 //放回businessPageId页面，并且刷新该页面信息
//				//					return;
//				//				}
//				mui.openWindow("../simulationQuote/simulationQuote.html", "simulationQuote");
//				return;
//
//			}, function(result) {
//				if(result.code == 2) {
//					mui.toast("网络异常，发送失败！");
//					return;
//				} else if(result.code == 3) {
//					mui.toast("抱歉，你尚未注册！");
//					mui.open_window_data("weixinRegister.html", "weixinRegister",{"headimgurl":auth.userInfo.headimgurl,"unionid":auth.userInfo.unionid,"nickName":name});
//					return;
//				} else if(result.code == 4) {
//					mui.toast("参数错误！");
//					return;
//				}
//
//			});

		}
		},
		mounted:function(){
			
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
		.eye{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			background: url(../assets/images/eye_icon.png);
			background-size: 100% 100%;
		}
		.eye1{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			background: url(../assets/images/eyeopen_icon.png);
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