<template>
	<div id="app">
		<keep-alive>
				<router-view v-if="!$route.meta.notKeepAlive"></router-view>
			</keep-alive>
		<router-view v-if="$route.meta.notKeepAlive"></router-view>
	</div>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	export default {
		name: 'app',
		methods: {
			...mapActions([
				'initQuoteClient'
			]),
		},
		mounted: function(){
			//初始化行情
//			this.initQuoteClient();
		}
	}
</script>

<style lang="scss" scoped>
	@import "./assets/css/common.scss";
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		max-width: 7.5rem;
		width: 7.5rem;
		height: auto;
		overflow: hidden;
		background: $bg;
		position: relative;
	}
</style>