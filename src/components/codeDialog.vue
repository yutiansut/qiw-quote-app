<template>
	<div id="codeDialog" v-show="isshow">
		<div class="bg"></div>
		<div class="codeDialog">
			<div class="page_cont">
				<h3 class="title">请先输入图形 验证码</h3>
				<div class="code_box">
					<input type="tel" class="fl" v-model="code" />
					<a href="javascript:void(0);" class="fr"><img :src="imgPath" v-on:click="refreshCode" /></a>
				</div>
				<div class="black"></div>
				<div class="btn_box">
					<span @click="confirm">确认</span>
					<span @click="close">取消</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from '../assets/js/common.js'
	import axios from "axios"
	export default{
		name: 'codeDialog',
		data(){
			return{
				isshow: false,
				code: '',
				msg: '',
				token: '',
				secret: '',
				phone: '',
				pwd: '',
				path: ''
			}
		},
		props: ['objstr','type'],
		computed: {
			info: function(){
				if(this.objstr){
					return JSON.parse(this.objstr);
				}
			},
			imgPath: function(){
				if(this.path) return this.path;
			},
			PATH: function(){
				return this.$store.getters.PATH;
			},
			version: function(){
				return '1.1';
			},
		},
		methods: {
			close:function(){
				this.isshow=false;
			},
			refreshCode: function(){
				this.path = this.path + '&' + Math.random();
			},
			confirm: function(){
				if(this.code == ''){
					this.$toast({message: '请输入验证码',duration: 2000});
				}else{
					if(this.type == 'login'){
//						请求认证
						var data = {
							mobile: this.info.loginName,
							password: this.info.password,
							imgCode: this.code
						};
						pro.fetch("post",'/loginAndRegister/mobileLogin',data,"").then(function(){
							if(res.success == true && res.code == 1){
								this.$toast({message: "登录成功",duration: 2000});
								this.code = '';
								this.token = res.data.token;
								this.secret = res.data.secret;
								var userData = {'username': this.info.loginName, 'password': this.info.password, 'token': res.data.token, 'secret': res.data.secret};  
								localStorage.setItem("user", JSON.stringify(userData));
								setTimeout(function(){
									this.isshow = false;
								},1000)
							}
						}.bind(this)).catch(function(err){
							var data = err.data;
							if(data == undefined){
								this.$toast({message:"网络不给力，请稍后重试",duration: 2000});
							}else{
								this.$toast({message:data.message,duration: 2000});
								this.code = '';
								this.path = this.path + '&' + Math.random()*10;
							}
						}.bind(this))
					}else if(this.type == 'register'){
						//请求发送验证码
						var data ={
						 	"mobile": this.phone,
							"type": 1,
							"imageCode": this.code
						};
						pro.fetch('post', '/loginAndRegister/getSmsCode', data, "").then(function(res){
							if(res.success == true){
								if(res.code == 1){
									this.isshow = false;
									this.$toast({message: '发送成功',duration: 2000});
								}
							}
						}.bind(this)).catch(function(err){
							var data = err.data;
							if(data == undefined){
								this.$toast({message:"网络不给力，请稍后重试",duration: 2000});
							}else{
								this.code = '';
								this.isshow = false;
								this.$toast({message: data.message,duration: 2000});
							}
						}.bind(this));
					}else if(this.type == 'findpwd'){
						//请求发送验证码
						var data={
								mobile: this.phone,
								type: 2,
								imageCode: this.code
						};
						var headers = {version:this.version}
						pro.fetch("post",'/loginAndRegister/getSmsCode',data,"").then(function(res){
							if(res.success == true && res.code == 1){
									this.$toast({message:"发送成功",duration: 2000});
									setTimeout(function(){
										this.isshow = false;
									}.bind(this),1000);
							}
						}.bind(this)).catch(function(err){
							var data = err.data;
							if(data == undefined){
								this.$toast({message:"网络不给力，请稍后重试",duration: 2000});
							}else{
								this.$toast({message:data.message,duration: 2000});
							}
						}.bind(this))
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped type="text/css">
	@import "../assets/css/common.scss";
	.bg {
		z-index: 101;
		background-color: #0e1014;
		opacity: 0.6;
	}
	#codeDialog{
		width: 7.5rem;
	}
	.codeDialog {
		top: 50%;
		left: 50%;
		width: 6rem;
		height: 3.2rem;
		position: fixed;
		margin: -1.6rem 0 0 -3rem;
		border-radius:0.1rem;
		text-align: center;
		background-color: #242933;
		color: $fontBlueTitle;
		z-index: 105;
		.title {
			height: 0.9rem;
			border-radius: 0.1rem 0.1rem 0 0;
			line-height: 0.9rem;
			border-bottom: 1px solid #12141a;
		}
		.code_box{
			width: 100%;
			position: relative;
			height: 1.3rem;
			line-height:1.3rem;
			border-bottom: 1px solid #12141a;
			.fl{
				position: absolute;
				left: 0.2rem;
				top: 0.2rem;
				width: 2.4rem;
				height: 0.75rem;
				border: 1px solid #12141a;
				border-radius: 0.1rem;
				color: $white;
				font-size: $fs32;
				text-align: center;
			}
			.fr{
				position: absolute;
				top: 0.2rem;
				right: 0.2rem;
				border-radius: 0.1rem;
				border: 1px solid #12141a;
				img{
					display: block;
					width: 2.7rem;
					height: 0.9rem;
					border-radius: 0.1rem;
				}
			}
		}
		.black{
			height: 0.2rem;
			background-color: #1b1f26;
			border-bottom: 1px solid #12141a;
		}
		.btn_box{
			width: 100%;
			height: 0.9rem;
			line-height: 0.9rem;
			border-radius: 0 0 0.1rem 0.1rem;
			span{
				float: left;
				display: block;
				width: 50%;
				height: 100%;
				font-size:$fs28; 
				&:nth-child(1){
					border-radius: 0 0 0 0.1rem;
				}
				&:nth-child(2){
					border-radius: 0 0 0.1rem 0;
				}
			}
		}
	}
	
	
</style>



