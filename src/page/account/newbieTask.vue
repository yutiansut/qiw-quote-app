<template>
	<div id="newbieTask">
		<mt-header title="新手任务" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		  	<router-link to="customerServices" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<img src="../../assets/images/newbieTask_01.png"/>
		<div id="container">
			<span class="t2">活动内容</span>
			<p>指数天下全新版本上线，即日起，所有用户均可享受<span>免费领取10000模拟币</span>福利，模拟币可用于指数天下App内所有品种交易</p>
			<span class="t2">活动规则</span>
			<p>
				1、活动期间：长期，结束时间以平台公告为准；<br>
				2、所有新老用户均可免费领取模拟币，每人限领1次；<br>
				3、领取的模拟币可免费持仓30个自然日，自动结算后该模拟币的交易账号将不可用；<br>
				4、活动结束后领取的模拟币将统一扣除，若结算时金额小于1万则全部扣除，持仓部分将会强制平仓。<br>
				5、任何利用系统或规则漏洞进行的违规套利行为，平台将有权不予发放奖励。
			</p>
			<mt-button class="geted" v-show="notGet"  type="danger">已领取</mt-button>
			<mt-button class="btn" @click.native="getPresent" v-show="geted"  type="danger">立即领取</mt-button>
			<div class="btm">
				<label>本活动最终解释权归活动方指数天下所有</label>
			</div>
		</div>
	</div>
</template>

<script>
		import pro from "../../assets/js/common.js"
	export default{
		name:"newbieTask",
		data(){
			return{
				isLonin:false,
				notGet:true,
				geted:false
			}
		},
		methods:{
			isGet:function(){
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/account/getBasicMsg","",headers).then((res)=>{
//					console.log("res====="+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.isgetPresent = res.data.isGetActivity
						if(res.data.isGetActivity){
							this.notGet = true;
							this.geted = false
						}else{
							this.notGet = false;
							this.geted = true;
						}
					}
				}).catch((err)=>{
//					console.log("err========"+JSON.stringify(err));
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
			},
			getPresent:function(){
				if(this.isLonin == false){
					this.$toast({message:"请您先注册",duration: 1000});
					this.$router.push({path:"/regisiter"});
				}else{
					var data = {
						type:1
					}
					var headers = {
						token : this.userInfo.token,
						secret : this.userInfo.secret
					}
					pro.fetch("post","/futureManage/getPresent",data,headers).then((res)=>{
						if(res.code == 1 && res.success == true){
							this.$toast({message:"恭喜您，领取成功",duration: 1000});	
							this.notGet = true;
							this.geted = false;
						}
					}).catch((err)=>{
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
			}
		},
		mounted:function(){
			
		},
		activated:function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			if(this.userInfo == ''){
//				console.log("未登录");
				this.notGet = false;
				this.geted = true;
			}else{
//				console.log("一登录")
				this.isLonin = true;
				//获取是否领取过
				this.isGet();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#newbieTask{
		width: 7.5rem;
	}
	#back{
		display: inline-block;
		width: 0.64rem;
		height: 1rem;
		background: url(../../assets/images/back_icon.png) no-repeat 0.15rem 0.34rem;
		background-size: 0.24rem 0.32rem;
	}
	img{
		margin-top: 1rem;
	}
	#container{
		width: 100%;
		padding: 0 0.3rem;
		.t2{
			background-color: $blue;
			color: $white;
			border-radius: 0.3rem;
			display: block;
			font-size: $fs32;
			width: 2.1rem;
			height: 0.6rem;
			line-height: 0.6rem;
			margin: 0.7rem auto 0.3rem;
			text-align: center;
		}
		p{
			width: 100%;
			border: 1px dashed $blue;		
			padding: 0.2rem 0.3rem;
			text-align: left;
			font-size: $fs28;
			line-height: 0.5rem;
			border-radius: 0.1rem;
			color: $white;
			span{
				color: #ff8a00;
			}
		}
		.btn{
			width: 100%;
			height: 0.9rem;
			background-color: #ff8a00;
			color: $white;
			margin: 0.3rem 0;
		}
		.btm{
			text-align: center;
			width: 100%;
			margin-bottom: 0.3rem;
			label{
				text-align: center;
				color: #556380;
			}
		}
		.geted{
			width: 100%;
			height: 0.9rem;
			color: $white;
			margin: 0.3rem 0;
			background-color: gray;
		}
	}
	
</style>