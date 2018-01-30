<template>
	<div id="realName">
		<mt-header title="实名认证" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<ul>
				<li>
					<i></i>
					<input type="text" class="input1" placeholder="请输入您的真实姓名" v-model="realName"/>
				</li>
			</ul>
			<ul>
				<li>
					<i></i>
					<input type="text" class="input1" placeholder="请输入18位身份证号码" v-model="cardNo"/>
				</li>
			</ul>
			<btn className="bluelg" name="确认" class="btn" @click.native="confirm"></btn>
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import pro from "../../assets/js/common.js"
	export default{
		name:"realName",
		components:{btn},
		data(){
			return{
				userInfo:"",
				realName:"",
				cardNo:"",
				cardReg:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
			}
		},
		methods:{
			confirm:function(){
				var headers = {
					token : JSON.parse(localStorage.user).token,
					secret : JSON.parse(localStorage.user).secret
				}
				var data = {
					realName:this.realName,
					cardNo:this.cardNo
				}
				if(this.realName == ''){
					this.$toast({message:"请输入姓名",duration: 1000});
				}else if(typeof(this.realName)!='string'){
					this.$toast({message:"请输入正确姓名",duration: 1000});
				}else if(this.cardNo == ''){
					this.$toast({message:"请输入身份证号码",duration: 1000});
				}else if(this.cardNo.length<18){
					this.$toast({message:"请输入18位身份证号码",duration: 1000});
				}else if(this.cardReg.test(this.cardNo)==false){
					this.$toast({message:"请输入正确的身份证号码",duration: 1000});
				}else {
					pro.fetch("post",'/account/realNameAuth',data,headers).then(function(res){
						if(res.success == true){
							if(res.code == 1){
								this.$toast({message:"认证成功",duration: 1000});
								this.$router.push({path:'/account'});
							}
						}
					}.bind(this)).catch(function(err){
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
						}else if(data.code == -9999){
							this.$toast({message:"登录超时，请重新登录",duration: 1000});
							this.$router.push({path:'/login'});
						}else{
							this.$toast({message:data.message,duration: 1000});
						}
					})
				}
			}
		},
		mounted:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#realName{
		width: 7.5rem;
	}
	#back{
		background: url(../../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		padding: 0 0.3rem;
		display: flex;
		flex-direction: column;
			ul{
				&:nth-child(1){
					li{
						position: relative;
						i{
							background: url(../../assets/images/account/realname_01.png);
							background-size: 100% 100%;
							position: absolute;
							top: 0.56rem;
							left: 0.3rem;	
							display: inline-block;
							width: 0.42rem;
							height: 0.42rem;
						}
					
					}
				}
				&:nth-child(2){
					li{
						position: relative;
						i{
							background: url(../../assets/images/account/realname_02.png);
							background-size: 100% 100%;
							position: absolute;
							top: 0.56rem;
							left: 0.3rem;	
							display: inline-block;
							width: 0.42rem;
							height: 0.42rem;
						}
					
					}
				}
				
			}
			.btn{
				margin-top: 0.3rem;
			}
			.input1{
				background-color: #1b1f26;
				border: 1px solid #12141a;
				outline: none;
				border-radius: 0.1rem;
				height: 0.88rem;
				width: 6.9rem;
				text-indent: 1rem;
				color: $white;
				margin-top: 0.3rem;
			}
	}
</style>