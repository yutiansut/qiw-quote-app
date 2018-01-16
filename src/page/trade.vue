<template>
	<div id="trade">
		<TabBar :selected="selected" :tabs="tabs" ></TabBar>
		<header>
			<h1>ID:10081</h1>
			<i class="icon icon_menu"></i>
		</header>
		<div class="nav">
			<ul>
				<li class="current"><span>交易</span></li>
				<li><span>持仓</span></li>
				<li><span>资金明细</span></li>
			</ul>
		</div>
		<div class="main">
			<div class="cont">
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
						<span :class="{current: currentOrderType == index}">{{v}}</span>
					</template>
				</div>
				<div class="order_cont">
					<component :is="currentOrderView"></component>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TabBar from "../components/TabBar.vue"
	import normalOrder from "./trade/normalOrder.vue"
	import conditionOrder from "./trade/conditionOrder.vue"
	export default{
		name: "trade",
		components: {TabBar, normalOrder, conditionOrder},
		data(){
			return{
				currentOrderType: 0,
				orderList: ['普通单','条件单'],
				currentOrderView: 'conditionOrder',
				selected:"模拟交易",
				tabs:[require("../assets/images/quotation_02.png"),require("../assets/images/mockTrading_01.png"),
				require("../assets/images/information_02.png"),require("../assets/images/mine_02.png")]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	header{
		width: 7.5rem;
		height: 1rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		position: relative;
		position: fixed;
		top: 0;
		left: 0;
		h1{
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			color: $white;
			font-size: 0.36rem;
		}
		.icon_menu{
			width: 1rem;
			height: 1rem;
			background: url(../assets/images/menu.png) no-repeat 0.3rem 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: fixed;
			top: 0;
			right: 0;
		}
	}
	.nav{
		width: 7.5rem;
		height: 0.8rem;
		border-bottom: 0.01rem solid $black;
		background: $bg;
		position: fixed;
		top: 1.01rem;
		left: 0;
		li{
			float: left;
			width: 2.5rem;
			text-align: center;
			span{
				display: inline-block;
				height: 0.8rem;
				line-height: 0.8rem;
				font-size: $fs28;	
			}
			&.current{
				span{
					color: $blue;
					border-bottom: 0.05rem solid $blue;
				}
			}
		}
	}
	.main{
		margin-top: 1.81rem;
		padding-bottom: 1rem;
		.cont{
			.total{
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
					background: url(../assets/images/triangle.png) no-repeat center 0.2rem;
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
		}
	}
</style>