<template>
	<div id="index">
		<TabBar></TabBar>
		<header>
			<div class="tab">
				<template v-for="(v, index) in tabList">
					<span :class="{current: selectNum == index}">{{v}}</span>
				</template>
			</div>
			<i class="icon icon_search"></i>
		</header>
		<nav>
			<span class="current">商品</span>
			<span>股指期货</span>
			<span>外汇</span>
			<span>LME金属</span>
			<span>债券期货</span>
			<span>ETF</span>
		</nav>
		
		
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
				selectNum: 1,
				tabList: ['自选', '市场'],
				selectTypeNum: 0,
				TypeList: [],
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
		overflow: hidden;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		margin: auto;
		.tab{
			width: 2rem;
			height: 0.6rem;
			margin: 0.2rem auto;
			span{
				display: inline-block;
				float: left;
				width: 1rem;
				height: 0.6rem;
				line-height: 0.6rem;
				text-align: center;
				background: $lightBlue;
				&.current{
					background: $black;
				}
			}
		}
		.icon_search{
			width: 0.4rem;
			height: 0.4rem;
			background: url(../assets/images/search.png) no-repeat center center;
			background-size: 100% 100%;
			position: absolute;
			top: 0.3rem;
			right: 0.3rem;
		}
	}
	nav{
		position: fixed;
		top: 1.01rem;
		left: 0;
		width: $w;
		height: 0.8rem;
		line-height: 0.8rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		
	}
	
	
	
</style>