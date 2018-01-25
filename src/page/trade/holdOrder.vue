<template>
	<div id="holdOrder">
		<div class="nav">
			<ul>
				<template v-for="(v, index) in navList">
					<li :class="{current: currentNum == index}">{{v}}</li>
				</template>
			</ul>
		</div>
		<div class="">
			<components :is="currentView"></components>
		</div>
	</div>
</template>

<script>
	import position from "./position.vue"
	export default{
		name: "holdOrder",
		components: {position},
		data(){
			return{
				navList: ['持仓','挂单', '委托', '条件单', '止损单', '当日成交', '历史成交'],
				currentNum: 0,
				currentView: 'position',
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
	.nav{
		width: 7.5rem;
		height: 0.8rem;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid $black;
		overflow-x: auto;
		ul{
			width: 8rem;
			overflow: hidden;
			li{
				float: left;
				height: 0.8rem;
				line-height: 0.8rem;
				margin-right: 0.35rem;
				font-size: $fs28;
				&:last-child{
					margin-right: 0;
				}
				&.current{
					color: $blue;
				}
			}
		}
	}
</style>