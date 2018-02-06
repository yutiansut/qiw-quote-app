<template>
	<div id="payWays">
		<mt-header title="充值" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/recharge" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<iframe :src="iframe"></iframe>
		</div>
	</div>
</template>

<script>
	export default{
		name:"payWays",
		data(){
			return{
				token:"",
				secret:""
			}
		},
		computed: {
			PATH: function(){
				return this.$store.getters.PATH;
			},
			iframe(){
//				return 'http://pay.duokongtai.cn/app/appPayinfo?mobile='+ this.$route.query.phone +'&money='+ this.$route.query.money;
				return "http://192.168.0.225/pay/payInfo?publickey="+this.token+"&secretkey="+this.secret+"&money="+this.$route.query.money;
			}
		},
		methods:{
			
		},
		mounted:function(){
			
		},
		activated:function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			if(this.userInfo == ''){
//				console.log("未登录")
			}else{
//				console.log("一登录")
				this.token = this.userInfo.token,
				this.secret = this.userInfo.secret
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";	
	#service{
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
		color:$fontBlue ;
		width: 100%;
		margin-top: 1rem;
		iframe {
			width: 100%; height: 100%; position: fixed; bottom: 0;
		}
	}
</style>