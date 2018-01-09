<template>
	<div id="optionalManage">
		<mt-header title="登录" fixed class="header">
		  	<router-link to="/" slot="left">
		    	<i class="icon icon_back"></i>
		  	</router-link>
	    	<router-link to="" slot="right">
		    	<mt-button class="done">完成</mt-button>
		 	</router-link>
		</mt-header>
	</div>
</template>

<script>
	export default {
		name: 'optionalManage',
		components: {
		},
		data(){
			return{
				selectNum: 0,
				tabList: ['自选', '市场'],
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.header{
		height: 1rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		font-size: 0.36rem;
		.done{
			font-size: $fs24;
			color: $fontBlue;
		}
	}
	.icon_back{
		width: 0.24rem;
		height: 0.32rem;
		background: url(../../assets/images/back_icon.png) no-repeat center center;
		background-size: 100% 100%;
	}
	
	
</style>