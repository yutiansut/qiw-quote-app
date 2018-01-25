<template>
	<div id="holdOrder">
		<nav>
			<template v-for="(v, index) in navList">
				<span></span>
			</template>
		</nav>
	</div>
</template>

<script>
	export default{
		name: "holdOrder",
		components: {},
		data(){
			return{
				navList: ['持仓','挂单', '委托', '条件单', '止损单', '当日成交', '历史成交'],
			}
		},
		methods: {
			
		},
		mounted: function(){
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	
</style>