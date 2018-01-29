<template>
	<div id="back" @tap="goback">
		<i class="icon icon_back"></i>
	</div>
</template>

<script>
	export default{
		name: 'back',
		computed: {},
		methods:{
			goback: function(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped lang="scss">
	.icon_back{
		width: 0.24rem;
		height: 1rem;
		background: url(../assets/images/back_icon.png) no-repeat center 0.34rem;
		background-size: 0.24rem 0.32rem;
		position: fixed;
		top: 0;
		left: 0.3rem;
		z-index: 2;
	}
</style>
