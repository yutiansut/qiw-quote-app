<template>
	<div id="forgetPassword">
		<mt-header title="找回密码" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/login" slot="left">
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
						<span @click="getCode">{{volid ? info : (time+'秒')}}</span>
					</div>
				</li>
			</ul>
			<mt-button class="btn" @click.native="toRetPassword">下一步</mt-button>
			<p @click="toRegisiter">新用户注册>></p>
		</div>
		<div id="wechat" v-show="showWhat">
			<i @click="getWechatId"></i>
		</div>
		<codeDialog ref="codeDialog"  type="findpwd"></codeDialog>
	</div>
</template>

<script>
	import pro from "../../../assets/js/common.js"
	import codeDialog from "../../../components/codeDialog.vue"
	export default{
		name:"forgetPassword",
		components : {codeDialog},
		data(){
			return{
				phone:"",
				code:"",
				time: 0,
				info: '获取验证码',
				showWhat:true,
				fullHeight:document.documentElement.clientHeight,
				fullHeight1:document.documentElement.clientHeight,
				phoneReg:/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/
			}
		},
		computed : {
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
			version: function(){
				return '1.1';
			},
			environment(){
				return this.$store.state.environment;
			}
		},
		methods:{
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
			},
			toRegisiter:function(){
				this.$router.push({path:"/regisiter"});
			},
			getCode:function(e){
				if(this.phone == ''){
					this.$toast({message: '请输入手机号',duration: 2000});
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
		toRetPassword:function(){
			if(this.phone == ''){
				this.$toast({message: '请输入手机号',duration: 2000});
			}else if(this.phoneReg.test(this.phone) == false){
				this.$toast({message: '手机格式错误',duration: 2000});
			}else if(this.code == ''){
				this.$toast({message: '请输入验证码',duration: 2000});
			}else{
				this.$router.push({path:"/resetPassword",query:{sendcode:this.code,sendphone:this.phone}});
			}
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
	#forgetPassword{
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
		}
		.input1{
			background-color: $bg;
			border: none;
			border-radius: 0 !important;
			outline: none;
			height: 0.9rem;
			width:6.9rem;
			border-bottom: 1px solid #505664;
			text-indent: 1rem;
			color: $white;
			margin-top: 0.2rem;
		}
		#code{
			position: absolute;
			width: 1.8rem;
			height: 0.24rem;
			top: 0.5rem;
			right: 0.3rem;
			border-left: 1px solid #9ba8c2;
			color: $white;
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
	}
	#wechat{
		text-align: center;
		width: 100%;
		position: fixed;
		bottom: 0.8rem;
		i{
			background:url(../../../assets/images/wechat_02.png);
			display: inline-block;
			width:0.88rem;
			height: 0.88rem;
			background-size: 100% 100%;
			
		}
	}
</style>