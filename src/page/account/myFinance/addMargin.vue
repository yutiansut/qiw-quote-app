<template>
	<div id="addMargin">
		<mt-header title="追加保证金" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;line-height: 1rem;">
		  	<router-link to="" slot="left">
		    	<i id="back" @click="backtoto"></i>
		  	</router-link>
		    <router-link to="/customerServices" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<div class="ipt">
				<input type="text" placeholder="追加金额 请输入充值金额" v-model="addMoney"/>
			</div>
			<div class="info">
				<ul>
					<li>余额：<span>{{balance}}</span>元</li>
					<li>换算汇率：<span>1美元={{cnyToUsdRate}}人民币</span></li>
					<li>换算美元：<span>{{moneyUsd}}</span>美元</li>
				</ul>
			</div>
			<div class="bt">
				<btn className="orangelg" name="立即追加" @click.native="add"></btn>
			</div>
			<div class="warn">
				<ul>
					<li>温馨提示：</li>
					<li>1.<span>最低追加保证金额为5元。</span></li>
					<li>2.<span>系统将在下个交易日前为您的操盘账户追加保证金。</span></li>
					<li>3.<span>追加成功后，系统将短信通知您。</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import btn from "../../../components/btn.vue"
	import pro from "../../../assets/js/common.js"
	export default{
		name:"addMargin",
		components:{btn},
		data(){
			return{
				id:"",
				balance:"",
				//汇率
				cnyToUsdRate:"",
				addMoney:'',
				moneyUsd:'',
				cnyToSimulationRate:'',
				addReg:/^\d+$/
			}
		},
		methods:{
			backtoto:function(){
				this.$router.back(-1);
			},
			add:function(){
				if(this.addMoney == ''){
					this.$toast({message:"请输入追加保证金金额",duration: 1000});
				}else if(this.addMoney<5){
					this.$toast({message:"充值金额必须大于元",duration: 1000});
				}else if(this.addReg.test(this.addMoney)==false){
					this.$toast({message:"输入金额格式错误",duration: 1000});
				}else{
					var data = {
						id:this.id,
						money:this.addMoney*this.cnyToSimulationRate
					}
					var headers = {
						token : this.userInfo.token,
					secret : this.userInfo.secret
					}
					pro.fetch("post","/ futureManage/addMargin",data,headers).then((res)=>{
						if(res.code == 1 && res.success == true){
							this.$toast({message:"追加成功",duration: 1000});
//							this.$router.push({path:"/"})
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
			},
			getUserInfo:function(){
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/account/getBasicMsg","",headers).then((res)=>{
//					console.log("res==="+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.balance = res.data.balance;
					
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
			},
			//获取汇率
			getCnyToUsdRate:function(){
				pro.fetch("post","/others/getSysparam","","").then((res)=>{
					console.log("res==="+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.cnyToUsdRate = 1/res.data.cnyToUsdRate;
						this.cnyToSimulationRate = res.data.cnyToSimulationRate;
						console.log("this.cnyToUsdRate==="+this.cnyToUsdRate)
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
		},
		mounted:function(){
//			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
//			this.id = this.$route.query.id;
////			console.log(this.userInfo);
//			if(this.userInfo == ''){
//				console.log("1111")
//			}else{
//				this.getUserInfo();
//				this.getCnyToUsdRate();
//			}
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.id = this.$route.query.id;
			if(this.userInfo == ''){
				console.log("1111")
			}else{
				this.getUserInfo();
				this.getCnyToUsdRate();
			}
		},
		watch:{
			addMoney:function(a){
				this.moneyUsd = a*(1/this.cnyToUsdRate);
			}
		}
	}
</script>


<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#addMargin{
		width: 7.5rem;
		color:$fontBlue ;
	}
	#back{
		background: url(../../../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		.ipt{
			width: 100%;
			padding: 0 0.3rem;
			height: 1.5rem;
			border-bottom: 1px solid #12141a;
			input{
				width: 100%;
				height: 0.9rem;
				margin-top: 0.3rem;
				border: 1px solid #12141a;
				border-radius: 0.1rem;
				background-color: #1b1f26;
				color: $white;
				text-indent: 0.24rem;
				font-size: $fs28;
			}
		}
		.info{
			height: 2.4rem;
			ul{
				li{
					&:nth-child(1){
						height: 0.6rem;
						background-color: $titleBlue;
						line-height: 0.6rem;
						font-size: $fs24;
					}
						height: 0.9rem;
						line-height:0.9rem;
						border-bottom: 1px solid #12141a;
						font-size: $fs28;
						text-indent: 0.5rem;
						span{
							color: $white;
							margin: 0.1rem;
						}
				}
			}
		}
		.bt{
			width: 100%;
			text-align: center;
			height: 1.5rem;
			border-bottom: 1px solid #12141a;
			padding-top: 0.3rem;
		}
		.warn{
			width: 100%;
			ul{
				li{
					padding:0 0.3rem; 
					&:nth-child(1){
						height: 0.6rem;
						line-height: 0.6rem;
						background-color:$titleBlue;
						margin-bottom: 0.3rem;
						border-bottom: 1px solid #12141a;
					}
					line-height: 0.4rem;	
					span{
						color: $white
					}
				}
			}
		}
	}
</style>