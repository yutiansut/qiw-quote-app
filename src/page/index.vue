<template>
	<div class="index">
		<TabBar></TabBar>
		<header>
			<div class="tab">
				<template v-for="(v, index) in tabList">
					<span>{{v}}</span>
				</template>
			</div>
			<i class="icon icon_search"></i>
		</header>
		
		
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
			return{
				tabList: ['自选', '市场'],
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	header{
		position: fixed;
		top: 0;
		left: 0;
		width: $w;
		height: 1rem;
		background: $bg;
	}
	.tab{
		
	}
</style>