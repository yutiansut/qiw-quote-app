<template>
	<div id="information_details">
		<mt-header title="登录" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/account" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
	</div>
</template>

<script>
	export default{
		name:"information_details",
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
</style>