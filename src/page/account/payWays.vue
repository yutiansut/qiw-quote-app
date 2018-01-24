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
				
			}
		},
		computed: {
			iframe(){
				return 'http://pay.duokongtai.cn/app/appPayinfo?mobile='+ this.$route.query.phone +'&money='+ this.$route.query.money;
			}
		},
		methods:{
			
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