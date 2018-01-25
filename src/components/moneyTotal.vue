<template>
	<div id="moneyTotal">
		<div class="total">
			<div class="col">
				<em>总资产</em>
				<span>30000</span>
			</div>
			<div class="col">
				<em>持仓盈亏</em>
				<span>15540</span>
			</div>
			<div class="col">
				<em>平仓线：<span>52.70</span></em>
				<em>风险度：<span>95%</span></em>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'moneyTotal',
		props: [],
		computed: {},
		methods: {
			
		}
	}	
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	.total{
		width: 7.5rem;
		height: 0.95rem;
		background: $lightBlue;
		border-bottom: 0.01rem solid $black;
		.col{
			float: left;
			width: 2.5rem;
			height: 0.95rem;
			text-align: center;
			border-left: 0.01rem solid $black;
			&:first-child{
				border: none;
			}
			em{
				display: block;
				color: $fontBlue;
				margin: 0.14rem 0;
			}
			span{
				display: inline-block;
				text-align: center;
				color: $white;
				font-size: $fs28;
			}
		}
	}
</style>