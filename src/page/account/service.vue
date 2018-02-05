<template>
	<div id="service">
		<mt-header title="在线客服" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="" slot="left">
		    	<i id="back"  @click="backRounter"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<iframe :src="iframe"></iframe>
		</div>
	</div>
</template>

<script>
	export default{
		name:"service",
		data(){
			return{
				
			}
		},
		computed: {
			userInfo: function(){
				return this.$store.state.account;
			},
			iframe: function() {
				return  /*this.PATH + */'http://www.vs.com/topic/consistentBeauty/consistentbeauty.html?phone=' + this.$store.state.account.phone + '&userName=' + this.$store.state.account.username;
			}
		},
		methods:{
			backRounter:function(){
				this.$router.back(-1)
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