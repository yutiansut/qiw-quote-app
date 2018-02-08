<template>
	<div id="regisiter">
		<mt-header title="注册" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/login" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/customerServices" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="wechatInfo">
			<ul>
				<li><img v-bind:src="this.headimgurl"/></li>
				<li>
					<p>亲爱的&nbsp;<span>{{nickname}}</span></p>
					<p>为了您的账户安全，请关联您的手机号，下次可直接登录。</p>
				</li>
			</ul>
		</div>
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
						<span @click="getCode">{{volid ? info1 : (time + '秒')}}</span>
					</div>
				</li>
				<li>
					<i></i>
					<input type="password"  value="" placeholder="请输入密码（至少6位且包含字母）" class="input1 input2" v-model="password"/>
					<div class="eye" @click="eyeEvent" v-show="showEye"></div>
					<div class="eye1" @click="eyeEvent" v-show="showNo"></div>
				</li>
			</ul>
			<mt-button class="btn" @click.native="confirm">立即绑定并注册</mt-button>
			<a @click="toLogin">已有账户？立即登录>></a>
		</div>
		<codeDialog ref="codeDialog" type="register"></codeDialog>
	</div>
</template>

<script>
	import codeDialog from "../../../components/codeDialog.vue"
	import pro from "../../../assets/js/common.js"
	export default{
		name:"wechatRegisiter",
		components:{codeDialog},
		data(){
			return{
				info:"",
				headimgurl:"",
				phone:"",
				code:"",
				password:"",
				phoneReg: /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/,
				pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
				info1:"获取验证码",
				time: 0,
				showEye:true,
				showNo:false,
				nickname:"",
				openid:"",
				nickname:"",
				sex:"",
				unionid:"",
				province:"",
				city:"",
				country:"",
				headimgurl:"",
				privilege:"",
				accessToken:""
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
			}
		},
		methods:{
			toLogin:function(){
				this.$router.push({path:"/login"})
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
			getCode:function(e){
				if($(e.target).hasClass('current')) return false;
				if(this.phone == ''){
					this.$toast({message: '请输入手机号码',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '手机格式错误',duration: 2000});
				}else{
					this.$refs.codeDialog.isshow = true;
					this.$refs.codeDialog.path= this.PATH+"/loginAndRegister/getImgCode.jpg"+Math.random()*1000+"?mobile=" + this.phone;
					this.$refs.codeDialog.phone = this.phone;
					//页面效果
					$(e.target).addClass('current');
					this.time = 60;
					var timing = setInterval(function(){
						this.time--;
						if(this.time <= 0){
							clearInterval(timing);
							$(e.target).removeClass('current');
						}
					}.bind(this), 1000);
				}
			},
			confirm:function(){
				if(this.phone == ""){
					this.$toast({message: '请输入手机号码',duration: 2000});
				}else if(this.code == ""){
					this.$toast({message: '请输入短信验证码',duration: 2000});
				}else if(this.password == ""){
					this.$toast({message: '请输入登录密码',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '请输入正确手机格式',duration: 2000});
				}else if(this.pwdReg.test(this.password) == false){
					this.$toast({message: '请输入6-16位数字加字母的密码',duration: 2000});
				}else {
					var data = {
						mobile:this.phone,
						password:this.password,
						code:this.code,
						resource:"app",
						openid:this.openid,
						nickname:this.nickname,
						sex:this.sex,
						unionid:this.unionid,
						province:this.province,
						city:this.city,
						country:this.country,
						headimgurl:this.headimgurl,
						privilege:this.privilege,
						accessToken:this.accessToken
					}
//					var data={
//						mobile: "18215606251",
//						password: "a123456",
//						code: "431755",
//						resource: "app",
//						openid: "oRrdQt-T23iJ8wjd-PaCt_WoMefw",
//						nickname: "留念流年",
//						sex: 1,
//						unionid: "oU5Yytxt6RvumWnF0YRX1vT2UX7k",
//						province: "Sichuan",
//						city: "Chengdu",
//						country: "China",
//						headimgurl: "http://wx.qlogo.cn/mmopen/vi_32/waVrKVVGvmjlibK4yX2TxDYdNvPLXa5nl2FyN80C2guDZtd8VbfHqeYJaicTxhMDubhphVzUdxjb0ymKgNp6n10Q/132",
//						privilege: [],
//						accessToken: "6_9tsZRM-EjpQIeqQU7oD6s03D-8q2QX0yHZm5t26b3HiVcRRtB0jbI3V2FFY0q9SowmPlCLgdgY1_fuusQHtbDz-l6OTKjKqk-l3LyAwye7Y"
//					}
//					console.log("data======="+JSON.stringify(data));
					pro.fetch("post","/loginAndRegister/register",data,"").then((res)=>{
//						console.log("res+++++++++++"+res)
						if(res.code == 1 && res.success == true){
							this.$toast({message:"注册成功",duration: 2000});
							this.$router.push({path:"/login"})
						}
					}).catch((err)=>{
//						console.log("err==="+JSON.stringify(err))
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后重试",duration: 2000});
						}else{
							this.$toast({message:data.message,duration: 2000});
						}
					})
				}
			}
		},
		mounted:function(){
			this.info = this.$route.query.weixinInfo;
			this.headimgurl = this.$route.query.weixinInfo.headimgurl;
			this.nickname = this.$route.query.weixinInfo.nickname;
			this.openid=this.$route.query.weixinInfo.openid;
			this.unionid=this.$route.query.weixinInfo.unionid;
			this.province=this.$route.query.weixinInfo.province;
			this.city=this.$route.query.weixinInfo.city;
			this.country=this.$route.query.weixinInfo.country;
			this.privilege=this.$route.query.weixinInfo.privilege;
			this.accessToken=this.$route.query.access_token;
			this.sex=this.$route.query.sex;
		},
		activited:function(){
			this.info = this.$route.query.weixinInfo;
			this.headimgurl = this.$route.query.weixinInfo.headimgurl;
			this.nickname = this.$route.query.weixinInfo.nickname;
			this.openid=this.$route.query.weixinInfo.openid;
			this.unionid=this.$route.query.weixinInfo.unionid;
			this.province=this.$route.query.weixinInfo.province;
			this.city=this.$route.query.weixinInfo.city;
			this.country=this.$route.query.weixinInfo.country;
			this.privilege=this.$route.query.weixinInfo.privilege;
			this.accessToken=this.$route.query.weixinInfo.access_token;
			this.sex=this.$route.query.weixinInfo.sex;
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
					background: url(../../../assets/images/regisiter_icon.png);
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
					background: url(../../../assets/images/verification_icon.png);
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
					background: url(../../../assets/images/password_icon.png);
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
			font-size: $fs32;
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
		.eye{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			background: url(../../../assets/images/eye_icon.png);
			background-size: 100% 100%;
		}
		.eye1{
			position: absolute;
			width: 0.4rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			background: url(../../../assets/images/eyeopen_icon.png);
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