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
//			PATH: function(){
//				return this.$store.getters.PATH;
//			},
			iframe(){
//				return "http://192.168.0.153:8080/qiw-platform/pay/payInfo?publickey="+this.token+"&secretkey="+this.secret+"&money="+this.$route.query.money;
//				return "http://test.api.zhishutianxia.com/pay/payInfo?publickey="+this.token+"&secretkey="+this.secret+"&money="+this.$route.query.money;
				return "http://192.168.0.153:8088/vs-pay/app/appPayinfo?mobile=18280302936&money=20";

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
		display: inline-block;
		width: 0.64rem;
		height: 1rem;
		background: url(../../assets/images/back_icon.png) no-repeat 0.15rem 0.34rem;
		background-size: 0.24rem 0.32rem;
	}
	#container{
		color:$fontBlue ;
		width: 100%;
		margin-top: 1rem;
		iframe {
			width: 100%; height: 100%; 
			position: fixed; 
			bottom: 0px;
			overflow-y: scroll;
		}
	}
</style>