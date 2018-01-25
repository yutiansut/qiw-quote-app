<template>
	<div id="tradeCenter">
		<div class="tips">
			<span class="red">1276.1</span>
			<span class="red">1276.1</span>
			<span class="red">1276.1</span>
			<p>成交量：<em>100123</em></p>
		</div>
		<div class="fens_title">
			<span>分时图</span>
			<i class="icon icon_triangle"></i>
			<button>规则</button>
		</div>
		<div class="buy_one">
			<div class="col">
				<em>卖一</em>
				<span>50.12</span>
				<em>20</em>
			</div>
			<div class="col">
				<em>买一</em>
				<span>50.12</span>
				<em>20</em>
			</div>
		</div>
		<div class="order_type">
			<template v-for="(v, index) in orderList">
				<span :class="{current: currentOrderType == index}" @touchstart="orderTypeSwitch(index)">{{v}}</span>
			</template>
		</div>
		<div class="order_cont">
			<component :is="currentOrderView"></component>
		</div>
	</div>
</template>

<script>
	import normalOrder from "./normalOrder.vue"
	import conditionOrder from "./conditionOrder.vue"
	export default{
		name: "trade",
		components: {normalOrder, conditionOrder},
		data(){
			return{
				currentOrderType: 0,
				orderList: ['普通单','条件单'],
				currentOrderView: 'normalOrder',
			}
		},
		methods: {
			orderTypeSwitch: function(index){
				this.currentOrderType = index;
				if(index == 0){
					this.currentOrderView = 'normalOrder';
				}else{
					this.currentOrderView = 'conditionOrder';
				}
			}
		},
		mounted: function(){
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.tips{
		height: 0.64rem;
		line-height: 0.64rem;
		background: $titleBlue;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		span{
			float: left;
			font-size: $fs28;
			margin-right: 0.3rem;
			&.red{
				color: $red;
			}
			&.green{
				color: $green;
			}
		}
		p{
			float: right;
			font-size: $fs28;
			em{
				color: $white;
			}
		}
	}
	.fens_title{
		height: 0.48rem;
		border-bottom: 0.01rem solid $black;
		padding-left: 3.4rem;
		span{
			float: left;
			display: inline-block;
			height: 0.48rem;
			line-height: 0.48rem;
			color: $fontBlue;
		}
		.icon_triangle{
			float: left;
			width: 0.16rem;
			height: 0.48rem;
			background: url(../../assets/images/triangle.png) no-repeat center 0.2rem;
			background-size: 0.16rem 0.08rem;
			margin: 0 0.2rem 0 0.06rem;
		}
		button{
			float: left;
			width: 0.64rem;
			height: 0.32rem;
			background: $yellow;
			border-radius: 0.1rem;
			margin: 0.08rem 0;
			color: $bg;
			font-size: 0.2rem;
			padding: 0;
		}
	}
	.buy_one{
		width: 7.5rem;
		height: 0.64rem;
		line-height: 0.64rem;
		border-bottom: 0.01rem solid $black;
		display: flex;
		text-align: center;
		.col{
			width: 50%;
			background: #3a2d36;
			&:first-child{
				background: #273a3b;
			}
			em{
				color: $white;
				font-size: $fs28;
				margin: 0 0.2rem;
			}
			span{
				font-size: $fs28;
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
		}
	}
	.order_type{
		height: 0.96rem;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid $black;
		span{
			display: inline-block;
			float: left;
			width: 3.45rem;
			height: 0.56rem;
			line-height: 0.56rem;
			text-align: center;
			background: $lightBlue;
			margin: 0.2rem 0;
			color: $white; 
			&:first-child{
				border-top-left-radius: 0.1rem;
				border-bottom-left-radius: 0.1rem;
			}
			&:last-child{
				border-top-right-radius: 0.1rem;
				border-bottom-right-radius: 0.1rem;
			}
			&.current{
				background: $blue;
			}
		}
	}
</style>