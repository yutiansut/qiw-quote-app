<template>
	<div id="trade">
		<TabBar></TabBar>
		<header>
			<h1>ID:10081</h1>
			<i class="icon icon_menu"></i>
		</header>
		<div class="main">
			<div class="nav">
				<ul>
					<li class="current"><span>交易</span></li>
					<li><span>持仓</span></li>
					<li><span>资金明细</span></li>
				</ul>
			</div>
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
					<span class="current">普通单</span>
					<span>条件单</span>
				</div>
				<div class="fm">
					<div class="row">
						<b>合约代码</b>
						<div class="slt fl">
							<input type="text" class="ipt_lg" value="美黄金 GC1702" readonly="readonly" />
							<i class="icon icon_select"></i>
						</div>
					</div>
					<div class="row">
						<b>订单类型</b>
						<div class="slt fl">
							<input type="text" class="ipt_sm" value="市价" readonly="readonly" />
							<i class="icon icon_selected"></i>
						</div>
						<input type="text" class="ipt_md ml" value="市价" disabled />
					</div>
					<div class="row">
						<b>委托数量</b>
						<div class="num_box">
							<span class="add">+</span>
							<input type="text" class="ipt_md" />
							<span class="reduce">-</span>
						</div>
					</div>
					<div class="btn_box">
						<btn name="买入/市价" className="redmd"></btn>
						<btn name="卖出/市价" className="greenmd"></btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TabBar from "../components/TabBar.vue"
	import btn from "../components/btn.vue"
	export default{
		name: "trade",
		components: {TabBar, btn},
		data(){
			return{
				
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
	.main{
		margin-top: 1.01rem;
		.nav{
			width: 7.5rem;
			height: 0.8rem;
			border-bottom: 0.01rem solid $black;
			li{
				float: left;
				width: 2.5rem;
				text-align: center;
				span{
					display: inline-block;
					height: 0.8rem;
					line-height: 0.8rem;	
				}
				&.current{
					span{
						color: $blue;
						border-bottom: 0.05rem solid $blue;
					}
				}
			}
		}
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
			.fm{
				width: 7.5rem;
				height: 5.02rem;
				border-bottom: 0.01rem solid $black;
				padding: 0.3rem 0.3rem 0 0.3rem;
				.row{
					height: 0.88rem;
					margin-bottom: 0.3rem;
					b{
						float: left;
						display: inline-block;
						width: 1.3rem;
						height: 0.88rem;
						line-height: 0.88rem;
						font-weight: normal;
						font-size: $fs28;
					}
					.slt{
						position: relative;
						.icon{
							width: 0.1rem;
							height: 0.1rem;
							position: absolute;
							bottom: 0.1rem;
							right: 0.1rem;
							&.icon_select{
								background: url(../assets/images/account/subscript_01.png) no-repeat center center;
								background-size: 100% 100%;
							}
							&.icon_selected{
								background: url(../assets/images/account/subscript_02.png) no-repeat center center;
								background-size: 100% 100%;
							}
						}
					}
					input{
						float: left;
						height: 0.88rem;
						line-height: 0.88rem;
						color: $white;
						border: 0.01rem solid $black;
						border-radius: 0.1rem;
						background: #1b1f26;
						text-align: center;
						margin: auto;
						&.ipt_lg{
							width: 5.58rem;
						}
						&.ipt_sm{
							width: 1.2rem;
						}
						&.ipt_md{
							width: 3.96rem;
						}
					}
					.ml{
						margin-left: 0.35rem;
					}
					.num_box{
						float: left;
						width: 5.58rem;
						height: 0.88rem;
						border: 0.01rem solid $black;
						background: #1b1f26;
						border-radius: 0.1rem;
						span{
							display: inline-block;
							float: left;
							width: 0.8rem;
							height: 0.88rem;
							line-height: 0.88rem;
							text-align: center;
							border-right: 0.01rem solid $black;
							font-size: $fs32;
							&.reduce{
								float: right;
								border: none;
								border-left: 0.01rem solid $black;
							}
						}
						input{
							border: none;
							height: 0.82rem;
							line-height: 0.82rem;
						}
					}
				}
				.btn_box{
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>