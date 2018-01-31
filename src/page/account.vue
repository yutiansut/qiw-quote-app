<template>
	<div id="account">
		<mt-header title="我的" fixed style="background-color:#242933;font-size: 0.32rem;height: 0.8rem;">
		    <router-link to="/customerServices" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<div id="loginIn" v-show="showLoginIn">
				<ul>
					<li>
						<i v-show="loginVisitor"></i>
						<img v-bind:src="this.wxHeadimgurl" alt="" />
					</li>
					<li>
						<span v-show="nickname">{{wxNickname}}</span>
						<p>{{mobile}}</p>
					</li>
				</ul>
				<ul>
					<li>
						<mt-button class="btn2" @click.native="toRecharge">充值</mt-button>
					</li>
				</ul>
			</div>
			<div id="notLogin" v-show="showNotLogin">
				<ul>
					<li><i></i></li>
					<li>
						<mt-button class="btn" @click.native="toRegisiter">注册</mt-button>
						<mt-button class="btn1" @click.native="toLogin">登录</mt-button>
					</li>
				</ul>
			</div>
			<div id="black"></div>
			<div id="account_info">
				<ul>
					<li v-if="this.isLogin == true">
						<span>可用资金</span>
						<span>{{balance}}元</span>
					</li>
					<li v-else-if="this.isLogin == false">
						<span>可用资金</span>
						<span>--</span>
					</li>
				</ul>
				<ul>
					<li v-if="this.isLogin == true">
						<span>总资产</span>
						<span>{{accountMoney}}元</span>
					</li>
					<li v-if="this.isLogin == false">
						<span>总资产</span>
						<span>--</span>
					</li>
				</ul>
			</div>
			<div class="title_lev2">
				我的账户
			</div>
			<div id="about_mine">
					<ul>
						<li @click="toMyFinance">
							<i></i>
							<span>我的融资</span>
						</li>
					</ul>
					<ul>
						<li @click="toMoney">
							<i></i>
							<span>资金明细</span>
						</li>
					</ul>
					<ul>
						<li @click="toRealName">
							<i></i>
							<span>实名认证</span>
						</li>
					</ul>
					<ul>
						<li @click="toPersonalSet">
							<i></i>
							<span>个人设置</span>
						</li>
					</ul>
			</div>
			<div class="title_lev2">
				其他
			</div>
			<div id="others">
				<ul>
					<li @click="toNews">
						<i></i>
						<span>新闻公告</span>
					</li>
				</ul>
				<ul>
					<li @click="toNewbieTask">
						<i></i>
						<span>新手任务</span>
					</li>
				</ul>
				<ul>
					<li @click="toHelp">
						<i></i>
						<span>帮助中心</span>
					</li>
				</ul>
				<ul>
					<li @click="toFeedBack">
						<i></i>
						<span>意见反馈</span>
					</li>
				</ul>
			</div>
		</div>
		<TabBar :selected="selected" :tabs="tabs" ></TabBar>
	</div>
</template>

<script>
	import TabBar from "../components/TabBar.vue"
	import pro from "../assets/js/common.js"
	export default{
		name:"account",
		components: {
			TabBar
		},
		data(){
			return{
				showLoginIn:false,
				showNotLogin:true,
				selected:"我的",
				tabs:[require("../assets/images/quotation_02.png"),require("../assets/images/mockTrading_02.png"),
				require("../assets/images/information_02.png"),require("../assets/images/mine_01.png")],
				userInfo:"",
				//手机账户号码
				mobile:"",
				nickname:false,
				//是否实名
				isRealNameAuth:false,
				//微信头像
				wxHeadimgurl: "",
				//冻结资金
          		freeze: '',
          		//可以资金
          		balance: 0,
          		//微信昵称
          		wxNickname: "",
          		wxNickTruename:"",
          		//支付宝账户
          		aliaccount: 0 ,
          		accountMoney:0,
          		phone:"",
          		isLogin:false,
          		loginVisitor:true
			}
		},
		methods:{
			toRegisiter:function(){
				this.$router.push({path:'/regisiter'});
			},
			toLogin:function(){
				this.$router.push({path:'/login'});
			},
			toPersonalSet:function(){
				if(this.isLogin==true){
					this.$router.push({path:'/personalSet',query:{phone:this.phone,wxNickname:this.wxNickTruename}});
				}else{
					this.$toast({message:"您还未登录，请先登录",duration: 2000});
					this.$router.push({path:'/login'});
				}
			},
			toMoney:function(){
				if(this.isLogin==true){
					this.$router.push({path:'/moneyDetails'});
				}else{
					this.$toast({message:"您还未登录，请先登录",duration: 2000});
					this.$router.push({path:'/login'});
				}
			},
			toRealName:function(){
				if(this.isLogin==true){
					this.$router.push({path:'/realName'});
				}else{
					this.$toast({message:"您还未登录，请先登录",duration: 2000});
					this.$router.push({path:'/login'});
				}
			},
			toNewbieTask:function(){
				this.$router.push({path:"/newbieTask"});
			},
			toFeedBack:function(){
				this.$router.push({path:'/feedBack'});
			},
			toHelp:function(){
				this.$router.push({path:'/help'});
			},
			toNews:function(){
				this.$router.push({path:'/newsNotice'});
			},
			toRecharge:function(){
				this.$router.push({path:'/recharge'});
			},
			toMyFinance:function(){
				if(this.isLogin==true){
					this.$router.push({path:'/myFinance'});
				}else{
					this.$toast({message:"您还未登录，请先登录",duration: 2000});
					this.$router.push({path:'/login'});
				}
			},
			//获取用户信息
			getUserInfo:function(){
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
//				console.log(headers)
				pro.fetch("post","/account/getBasicMsg","",headers).then((res)=>{
//					console.log("res===="+JSON.stringify(res))
					if(res.code == 1 && res.success == true){
						var phoneNumber= res.data.mobile;
						this.mobile = phoneNumber.substr(0, 3) + '****' + phoneNumber.substr(7);
						this.phone=res.data.mobile;
						this.isRealNameAuth = res.data.isRealNameAuth;
		          		this.freeze=res.data.freeze;
		          		this.balance=res.data.balance;
		          		this.aliaccount= res.data.aliaccount;
		          		this.wxNickname = res.data.wxNickname;
		          		this.wxNickTruename = res.data.wxNickname;
//		          		this.accountMoney = Number(this.balance)+Number(this.this.freeze);
						if(res.data.wxNickname ==''){
							this.nickname = false;
							this.wxNickname = "游客";
						}else{
							this.nickname = true;
						}
						if(res.data.wxHeadimgurl != ''){
							this.wxHeadimgurl = res.data.wxHeadimgurl;
							this.loginVisitor = false
						}
					}
				}).catch((err)=>{
//					console.log("err==0"+JSON.stringify(err))
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
					}else{
						if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 1000});
							this.$router.push({path:"/login"});
						}
						else{
							this.$toast({message:data.message,duration: 1000});
						}
					}
				})
			}
		},
		mounted:function(){
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			if(this.userInfo == ''){
				this.showLoginIn = false;
				this.showNotLogin = true;
//				console.log("未登录")
				this.aliaccount = 0 ;
				this.balance = 0;
				this.isLogin = false
			}else{
				this.showLoginIn = true;
				this.showNotLogin = false;
//				console.log("一登录")
				this.isLogin = true;
				this.getUserInfo();
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "../assets/css/common.scss";
	#account{
		width: 7.5rem;
	}
	#container{
		width: 100%;
		margin-top: 0.8rem;
		display: flex;
		flex-direction: column;
		border-top: 1px solid #12141a;
		text-align: center;
		#notLogin{
			padding: 0 0.3rem;
			height: 1.4rem;
			border-bottom: 1px solid #12141a;
			ul{
				display: flex;
				justify-content: space-between;
				li{
					&:nth-child(1){
						i{
							background: url(../assets/images/wechat_head.png);
							width: 0.8rem;
							height: 0.8rem;
							display: block;
							background-size: 100% 100%;
							margin-top: 0.3rem;
						}
					}
					&:nth-child(2){
						display: flex;
						justify-content: space-between;
						button{
							width: 1.14rem;
							height: 0.6rem;
							color: $white;
							margin-top: 0.4rem;
							border: none;
							outline: none;
							text-align: center;
							font-size: 0.24rem;
							&:nth-child(1){
								background-color: $blue;
							}
							&:nth-child(2){
								background-color: $orange;
								margin-left: 0.3rem;
							}
						}
					}
				}
			}
		}
		#loginIn{
			padding: 0 0.3rem;
			height: 1.4rem;
			border-bottom: 1px solid #12141a;
			display: flex;
			justify-content: space-between;
			ul{
				&:nth-child(1){
					display: flex;
					justify-content: space-between;
					li{
						i{
							background: url(../assets/images/wechat_head.png);
							width: 0.8rem;
							height: 0.8rem;
							display: block;
							background-size: 100% 100%;
							margin-top: 0.3rem;
						}
						img{
							width: 0.8rem;
							height: 0.8rem;
							display: block;
							background-size: 100% 100%;
							margin-top: 0.3rem;
							border-radius: 0.4rem;
						}
						&:nth-child(1){
							
						}
						&:nth-child(2){
							text-align: left;
							margin-top: 0.4rem;
							margin-left: 0.24rem;
							span{
								color: $white;
								font-size: $fs32;
							}
							p{
								margin-top: 0.16rem;
							}
						}
					}
				}
				&:nth-child(2){
					.btn2{
						width: 1.14rem;
						height: 0.6rem;
						background-color: $yellow;
						color: $black;
						margin-top: 0.4rem;
						border-radius: 0.1rem;
						border: none;
						font-size: 0.24rem;
					}
				}
			}
		}
		#black{
			width: 100%;
			height: 0.2rem;
			background-color:#1b1f26;
			border-bottom: 1px solid #12141a;
		}
		#account_info{
			height: 1.9rem;
			border-bottom: 1px solid #12141a;
			display: flex;
			justify-content: space-around;
			ul{
				width:50%; 
				&:nth-child(2){
					border-left:1px solid #12141a ;
				}
				li{
					margin-top: 0.6rem;
					display: flex;
					flex-direction: column;
					span{
						&:nth-child(2){
							color: $white;
							margin-top: 0.06rem;
						}
					}
				}
			}
		}
		.title_lev2{
			height: 0.64rem;
			width: 100%;
			line-height: 0.64rem;
			text-align: left;
			padding-left: 0.4rem;
			border-bottom: 1px solid #12141a;
			background-color: $titleBlue;
		}
		#about_mine{
			width: 100%;
			height: 2rem;
			display: flex;
			justify-content: space-around;
			border-bottom: 1px solid #12141a;
			ul{
				margin-top: 0.6rem;
				li{
					display: flex;
					flex-direction: column;
				}
				span{
					margin-top: 0.16rem;
				}
				&:nth-child(1){
					i{
						background: url(../assets/images/account/financing_icon.png);
						display:inline;
						width: 0.4rem;
						height: 0.4rem;
						background-size: 100% 100%;
						margin-left: 0.28rem;
					}
				}
				&:nth-child(2){
					i{
						background: url(../assets/images/account/money_icon.png);
						display: block;
						width: 0.4rem;
						height: 0.4rem;
						background-size: 100% 100%;
						margin-left: 0.28rem;
					}
				}
				&:nth-child(3){
					i{
						background: url(../assets/images/account/realname_icon.png);
						display: block;
						width: 0.4rem;
						height: 0.4rem;
						background-size: 100% 100%;
						margin-left: 0.28rem;
					}
				}
				&:nth-child(4){
					i{
						background: url(../assets/images/account/personalset_icon.png);
						display: block;
						width: 0.4rem;
						height: 0.4rem;
						background-size: 100% 100%;
						margin-left: 0.28rem;
					}
				}
			}
		}
		#others{
			width: 100%;
			height: 2rem;
			display: flex;
			justify-content: space-around;
			border-bottom: 1px solid #12141a;
			ul{
				margin-top: 0.6rem;
				li{
					display: flex;
					flex-direction: column;
				}
				span{
					margin-top: 0.16rem;
				}
				&:nth-child(1){
					i{
						background: url(../assets/images/account/news_icon.png);
						display:inline;
						width: 0.4rem;
						height: 0.4rem;
						background-size: 100% 100%;
						margin-left: 0.28rem;
					}
				}
				&:nth-child(2){
					i{
						background: url(../assets/images/account/newpeople_icon.png);
						display: block;
						width: 0.4rem;
						height: 0.4rem;
						background-size: 100% 100%;
						margin-left: 0.28rem;
					}
				}
				&:nth-child(3){
					i{
						background: url(../assets/images/account/help_icon.png);
						display: block;
						width: 0.4rem;
						height: 0.4rem;
						background-size: 100% 100%;
						margin-left: 0.28rem;
					}
				}
				&:nth-child(4){
					i{
						background: url(../assets/images/account/feedback_icon.png);
						display: block;
						width: 0.4rem;
						height: 0.4rem;
						background-size: 100% 100%;
						margin-left: 0.28rem;
					}
				}
			}
		}
	}
</style>