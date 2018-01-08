<template>
	<div class="index">
		<TabBar></TabBar>
	</div>
</template>

<script>
	import TabBar from "../components/TabBar.vue"
	export default {
		name: 'index',
		components: {
			TabBar
		},
		data(){
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
</style>