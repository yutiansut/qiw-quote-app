<template>
	<div id="position" class="list">
		<ul>
			<li>
				<div class="list_title">
					<span class="name">合约名称</span>
					<span class="num">持仓数量</span>
					<span class="type">买/卖</span>
					<span class="price">持仓均价</span>
					<span class="status">浮动盈亏</span>
				</div>
			</li>
			<li>
				<div class="list_cont">
					<div class="name">
						<em>日经225</em>
						<em>CNQ16</em>
					</div>
					<span class="num">持仓数量</span>
					<span class="type">买/卖</span>
					<span class="price">持仓均价</span>
					<span class="status">浮动盈亏</span>
				</div>
				<div class="tools">
					<btn name="平仓" className="orangesm"></btn>
					<btn name="反手" className="bluesm"></btn>
					<btn name="止损止盈" className="greensm"></btn>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default{
		name: "position",
		components: {btn},
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
	.list{
		width: 7.5rem;
		overflow-x: auto;
		li{
			span{
				display: inline-block;
				font-size: $fs28;
			}
			.name{
				width: 1.6rem;
			}
			.num{
				width: 1.4rem;
			}
			.type{
				width: 0.9rem;
			}
			.price{
				width: 1.3rem;
			}
			.status{
				width: 1.6rem;
			}
			.list_title{
				height: 0.64rem;
				border-bottom: 0.01rem solid $black;
				background: #16597f;
				padding-left: 0.3rem;
				span{
					height: 0.64rem;
					line-height: 0.64rem;
				}
			}
			.list_cont{
				padding-left: 0.3rem;
			}
		}
	}
</style>