<template>
	<div id="feedBack">
		<mt-header title="意见反馈" fixed style="background-color:#242933;font-size: 0.32rem;height: 0.8rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			
		</div>
	</div>
</template>

<script>
	export default{
		name:"feedBack",
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#feedBack{
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
		margin-top: 0.8rem;
		border-top: 1px solid #12141a;
	}
</style>