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
				<a href="">忘记密码？</a>
			</div>
			<mt-button class="btn" @click.native="login">登录</mt-button>
			<p>新用户注册>></p>
			<div id="wechat">
				<i @click="getWechatId"></i>
			</div>
		</div>
		<codeDialog ref="codeDialog" :objstr="sendMsg" type="login"></codeDialog>
	</div>
</template>

<script>
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
				secret:""
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
						if(res.success == true){
							if(res.code == 1){
								this.$toast({message: '登录成功',duration: 1000});
								this.token = res.data.token;
								this.secret = res.data.secret;
								var userData = {'username':this.phone,'password':Base64.encode(this.pwd),'token':res.data.token,'secret':res.data.secret};
								localStorage.setItem("user", JSON.stringify(userData));
							}
						}
					}.bind(this)).catch(function(err){
						var data = err.data;
						this.num = data.data.failNum;
						if(this.num > 2){
							this.$refs.codeDialog.isshow = true;
							this.$refs.codeDialog.path = this.PATH + "/loginAndRegister/getImgCode.jpg" + Math.random()*1000 + "?mobile=" + this.phone;
							this.str = {
								loginName : this.phone,
								password :this.password
							}
							this.$toast({message: data.message,duration: 2000});
						}
					}.bind(this));
				}
			},
			getWechatId:function(){
//				var wxopenid=getcookie('wxopenid');  
//			    var key=getcookie('key');  
//			    if (key==''){  
//			        var access_code=GetQueryString('code');  
//			        if (wxopenid==""){  
//			            if (access_code==null)  
//			            {     
//			                var fromurl=location.href;  
//			                var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid=填你自已的appid哟&redirect_uri='+encodeURIComponent(fromurl)+'&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';  
//			                location.href=url;  
//			            }  
//			            else  
//			            {     
//			                $.ajax({  
//			                    type:'get',  
//			                    url:ApiUrl+'/index.php?act=payment&op=getopenid',   
//			                    async:false,  
//			                    cache:false,  
//			                    data:{code:access_code},  
//			                    dataType:'json',  
//			                    success:function(result){                   
//			                            if (result!=null && result.hasOwnProperty('openid') && result.openid!=""){  
//			                               addcookie('wxopenid',result.openid,360000);                             
//			                               getlogininfo(result.openid);  
//			                            }   
//			                            else  
//			                            {  
//			                              alert('微信身份识别失败 \n '+result);  
//			                              location.href=fromurl;  
//			                            }  
//			                        }  
//			                    });      
//			            }  
//			        }else{  
//			           if (key=='' && wxopenid!='')  
//			               getlogininfo(wxopenid);    
//			        }  
//			  
//			        function getlogininfo(wxopenid){         
//			            $.ajax({  
//			               type:'get',  
//			               url: ApiUrl + '/index.php?act=login&op=autologininfo',  
//			               data: { wxopenid:wxopenid},  
//			               dataType:'json',  
//			               async:false,  
//			               cache:false,                 
//			               success: function (result) {                     
//			                       if (result.return_code=='OK'){  
//			                           addcookie('key',result.memberinfo.key);  
//			                           addcookie('username',result.memberinfo.username);  
//			                       }else{  
//			                           alert(result.return_msg);  
//			                           location.href=WapSiteUrl+'/tmpl/member/login.html';  
//			                       }  
//			               }  
//			            });  
//			        }  
//			    }  
//			}
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