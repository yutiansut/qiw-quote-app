<template>
	<div id="tradeLogin">
		<header>
			<div class="tab">
				<template v-for="(v, index) in tabList">
					<span :class="{current: selectNum == index}">{{v}}</span>
				</template>
			</div>
			<i class="icon icon_search"></i>
		</header>
		<div class="main">
			
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default {
		name: 'index',
		components: {
			btn
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
				font-size: $fs28;
				&.current{
					background: $black;
					color: $white;
				}
			}
		}
		.icon_search{
			width: 0.6rem;
			height: 1rem;
			background: url(../../assets/images/search.png) no-repeat right 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.3rem;
		}
	}
	.main{
		margin-top: 1.01rem;
		
	}
	
	
</style>