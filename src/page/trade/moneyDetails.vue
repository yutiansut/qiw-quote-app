<template>
	<div id="moneyDetails">
		<div class="title">
			<span>币种</span>
			<span>昨结存</span>
			<span>今权益</span>
			<span>今可用</span>
			<span>保证金</span>
			<span>冻结奖金</span>
			<span>逐笔浮盈</span>
			<span>平仓盈亏</span>
			<span>入金</span>
			<span>出金</span>
		</div>
		<div class="cont">
			<ul>
				<li>
					<span>美元</span>
					<span>人民币</span>
					<span>欧元</span>
					<span>港币</span>
					<span>日元</span>
				</li>
				<li>
					<span>0.00</span>
					<span>0.00</span>
					<span>0.00</span>
					<span>0.00</span>
					<span>0.00</span>
				</li>
				<li>
					<span>0.00</span>
					<span>0.00</span>
					<span>0.00</span>
					<span>0.00</span>
					<span>0.00</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: "moneyDetails",
		components: {},
		data(){
			return{
				
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
	.title{
		float: left;
		width: 1.6rem;
		overflow: hidden;
		span{
			display: inline-block;
			width: 1.6rem;
			height: 0.88rem;
			line-height: 0.88rem;
			background: $titleBlue;
			border-bottom: 0.01rem solid $black;
			border-right: 0.01rem solid $black;
			padding-left: 0.3rem;
			color: $fontBlue;
			font-size: $fs28;
			
		}
	}
	.cont{
		float: left;
		width: 5.9rem;
		overflow-x: auto;
		li{
			width: 7.5rem;
			height: 0.88rem;
			border-bottom: 0.01rem solid $black;
			padding-left: 0.3rem;
			span{
				display: inline-block;
				width: 1.35rem;
				line-height: 0.88rem;
				text-align: left;
				color: $fontBlue;
				font-size: $fs28;
				
			}
		}
	}
</style>