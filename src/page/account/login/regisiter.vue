<template>
	<div id="regisiter">
		<mt-header title="注册" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/customerServices" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<ul>
				<li>
					<i></i>
					<input type="tel" value="" placeholder="请输入手机号" class="input1" v-model="phone" maxlength="11"/>
				</li>
				<li>
					<i></i>
					<input type="text"  value="" placeholder="请输入验证码" class="input1" v-model="code"/>
					<div id="code">
						<span :class="{current: !isClick}" @click="getCode">{{volid ? info : (time + '秒')}}</span>
					</div>
				</li>
				<li>
					<i></i>
					<input type="password"  value="" placeholder="请输入密码（至少6位且包含字母）" class="input1 input2" v-model="password"/>
					<div class="eye" @click="eyeEvent" :class="{eye1:showEye}"></div>
				</li>
			</ul>
			<button class="btn" @tap="regisiter">注册</button>
			<!--<mt-button class="btn" :class="{current: show == true}" @click.native="regisiter">注册</mt-button>-->
			<a @click="toLogin">已有账户？立即登录>></a>
			<div id="wechat"  v-show="showWhat">
				<i @click="getWechatId"></i>
			</div>
			<div id="to">
				<p>注册即代表阅读并同意<a @click="toProtocol">《指数天下用户协议》</a></p>
			</div>
		</div>
		<codeDialog ref="codeDialog" type="register"></codeDialog>
	</div>
</template>

<script>
	import codeDialog from "../../../components/codeDialog.vue"
	import pro from "../../../assets/js/common.js"
	export default{
		name:'regisiter',
		components:{codeDialog},
		data(){
			return{
				phone:"",
				code:"",
				password:"",
				phoneReg: /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/,
				pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
				info:"获取验证码",
				time: 0,
				showEye:true,
				show: false,
				isClick: false,
				showWhat:true,
				fullHeight:document.documentElement.clientHeight,
				fullHeight1:document.documentElement.clientHeight
			}
		},
		computed: {
			PATH: function(){
				return this.$store.getters.PATH;
			},
			volid: function(){
				if(this.time <= 0){
					return true
				}else{
					return false
				}
			},
			environment(){
				return this.$store.state.environment;
			},
			version: function(){
				return '1.1';
			},
//			packChannel(){
//				return this.$store.state.account.packChannel;
//			}
		},
		watch: {
			phone: function(n, o){
				if(n && n.length == 11){
					this.isClick = true;
				}else{
					this.isClick = false;
				}
			},
			// 为了解决android端 虚拟键盘弹框改变高度 影响flex的布局
			fullHeight (val) {
		        if(val != this.fullHeight1){
					console.log(1)
		        	this.showWhat = false;
		        	$("#to").hide();
		        }else{
		        	this.showWhat =true;
		        	$("#to").show();
		        }
		    }
		},
		methods:{
			toProtocol:function(){
				this.$router.push({path:"/userRegistrationProtocol"});
			},
			toLogin:function(){
				this.$router.push({path:"/login"});
			},
			eyeEvent:function(e){
				var text = this.showEye?'text':'password'
				$(e.target).removeClass("current").siblings(".input2").attr("type",text);
				this.showEye=!this.showEye;
			},
			getCode :function(e){
				if(this.isClick == false) return;
				if(this.phone == ''){
					this.$toast({message: '请输入手机号码',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '手机格式错误',duration: 2000});
				}else{
					this.$refs.codeDialog.isshow = true;
					this.$refs.codeDialog.path= `${this.PATH}/loginAndRegister/getImgCode.jpg${Math.floor(Math.random()*1000)}?mobile=${this.phone}`;
					this.$refs.codeDialog.phone = this.phone;
					//页面效果
					this.isClick = !this.isClick;
					this.time = 60;
					var timing = setInterval(function(){
						this.time--;
						if(this.time <= 0){
							clearInterval(timing);
							this.isClick = !this.isClick;
						}
					}.bind(this), 1000);
				}
			},
			regisiter:function(){
				if(this.show == true) return;
				var msg = function () {
					if(this.phone == ""){
					 	return '请输入手机号码'					
					}else if(this.code == ""){
						return '请输入短信验证码'						
					}else if(this.password == ""){
						return '请输入登录密码'						
					}else if(this.phoneReg.test(this.phone) == false){
						return '请输入正确手机格式'						
					}else if(this.pwdReg.test(this.password) == false){
						return '请输入6-16位数字加字母的密码'						
					}else{
						return ''
					}
				}.apply(this);			
				if(msg!=''){
					this.$toast({message: msg,duration: 2000});
				}
				else {
					this.show = true;
//					$(".btn").attr("disabled","disabled"); 
					var data = {
						mobile:this.phone,
						password:this.password,
						code:this.code,
						resource:"app"
					}
					pro.fetch("post","/loginAndRegister/register",data,"").then((res)=>{
						console.log("res==="+JSON.stringify(res));
						if(res.code == 1 && res.success == true){
//							$(".btn").attr("disabled",false);
							this.show = false;
							this.$toast({message:"注册成功",duration: 1000});
							this.$router.push({path:"/login"});
						}
					}).catch((err)=>{
						console.log("err==="+JSON.stringify(err));
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后重试",duration: 1000});
							this.show = false;
//							$(".btn").attr("disabled",false);
						}else{
							this.$toast({message:data.message,duration: 1000});
							this.show = false;
//							$(".btn").attr("disabled",false);
						}
					})
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
//			console.log("this.packChannel+"+this.packChannel+"111111")
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
		}
	}
</script>

<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#regisiter{
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
		display: flex;
		flex-direction: column;
		padding: 0.5rem 0 0rem 0;
		li{
			width: 7.5rem;
			height: 1.2rem;
			/*padding: 0 0.3rem;*/
			position: relative;
		}
		@for $i from 1 through 3 {
			$bg-img: url('../../../assets/images/regisiter_icon.png'),url('../../../assets/images/verification_icon.png'),url('../../../assets/images/password_icon.png');
			li:nth-child(#{$i}) {
				i {
				background: nth($bg-img,$i);
				background-size: 100% 100%;
				position: absolute;
				top: 0.48rem;
				left: 0.58rem;	
				display: inline-block;
				width: 0.42rem;
				height: 0.42rem;
				}
			}
		}
		.input1{
			margin-left: 0.3rem;
			border-radius: none;
			background-color: $bg;
			height: 0.9rem;
			width: 6.9rem;
			border-bottom: 1px solid #505664;
			text-indent: 1rem;
			color: $white;
			margin-top: 0.2rem;
			border-radius: 0 !important;
			font-size: $fs32;
		}
		#code{
			text-align: center;
			position: absolute;
			width: 1.8rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			border-left: 1px solid #9ba8c2;
			color: $white;
			span.current{
				color: grey;
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
			background: url(../../../assets/images/eyeopen_icon.png);
			background-size: 100% 100%;
		}
		.btn{
			width: 6.9rem;
			height: 0.88rem;
			margin: 0.9rem 0.3rem 0 0.3rem;
			border-radius: 0.1rem;
			background-color: $blue;
			color: $white;
			border: none;
			font-size: $fs32;
		}
		#wechat{
			text-align: center;
			width: 100%;
			margin-top: 1.9rem;
			i{
				background:url(../../../assets/images/wechat_02.png);
				display: inline-block;
				width:0.88rem;
				height: 0.88rem;
				background-size: 100% 100%;
				
			}
		}
		a{
			text-align: center;
			color: $white;
			margin-top: 0.8rem;
		}
		#to{
			width: 100%;
			position: fixed;
			bottom: 0.3rem;
			p{
				text-align:center;
				a{
					color: $white;
				}
			}
		}
		
	}
</style>