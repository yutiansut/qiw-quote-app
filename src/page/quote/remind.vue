<template>
	<div id="remind">
		<header>
			<i class="icon icon_back"></i>
			<div class="title">
				<div class="name fl">
					<span>美黄金</span>
					<span>GC1702</span>
				</div>
			</div>
		</header>
		<div class="main">
			<div class="title">
				<div class="row">
					<em class="red">1276.1</em>
					<em class="red">+2.1</em>
					<em class="red">+0.29%</em>
				</div>
				<div class="row">
					<span>提醒方式</span>
					<div class="reminda_ways fl">
						<i class="icon icon_check"></i>
						<span>通知提醒</span>
					</div>
					<div class="reminda_ways fl">
						<i class="icon icon_checked"></i>
						<span>短信提醒</span>
					</div>
				</div>
				<div class="row">
					<p>实时智能盯盘，免费短信预警，不再担心错过行情，价格波动实时短信提醒，现已免费提供。</p>
				</div>
			</div>
			<div class="cont">
				<div class="row">
					<span class="type">价格上涨到</span>
					<input type="text" class="ipt_lg" />
					<div class="switch">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">最近</span>
					<input type="text" class="ipt_sm" />
					<span>天最高价</span>
					<b>--</b>
				</div>
				<div class="row">
					<span class="type">价格下跌到</span>
					<input type="text" class="ipt_lg" />
					<div class="switch">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">最近</span>
					<input type="text" class="ipt_sm" />
					<span>天最低价</span>
					<b>--</b>
				</div>
				<div class="row">
					<span class="type">当日涨幅超过</span>
					<input type="text" class="ipt_sm" />
					<span>%</span>
					<div class="switch">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">当日跌幅超过</span>
					<input type="text" class="ipt_sm" />
					<span>%</span>
					<div class="switch">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">最新价高于</span>
					<input type="text" class="ipt_sm" />
					<div class="switch">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">最新价低于</span>
					<input type="text" class="ipt_sm" />
					<div class="switch">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">突破当日最高价</span>
					<div class="switch">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">突破当日最低价</span>
					<div class="switch">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">提醒频率</span>
					<div class="fr">
						<span>每日一次</span>
						<i class="icon icon_arrow"></i>
					</div>
				</div>
				<div class="row">
					<p>价格提醒服务，依赖于网络，可能出现通知延迟状况，请保持网络通畅。</p>
				</div>
			</div>
			<div class="btn_box">
				<btn name="完成" className="bluelg"></btn>
			</div>
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default {
		name: 'remind',
		components: {btn, },
		data(){
			return{
				value: true,
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
		display: flex;
		width: 7.5rem;
		height: 1rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		box-sizing: border-box;
		.icon_back{
			width: 0.24rem;
			height: 1rem;
			background: url(../../assets/images/back_icon.png) no-repeat center 0.34rem;
			background-size: 0.24rem 0.32rem;
			position: fixed;
			top: 0;
			left: 0.3rem;
		}
		.title{
			margin: auto;
			.name{
				height: 1rem;
			}
			span{
				display: block;
				&:first-child{
					color: $white;
					font-size: $fs32;
					margin: 0.2rem 0 0.05rem 0;
				}
			}
		}
	}
	.main{
		margin-top: 1.01rem;
		.title{
			width: 7.5rem;
			height: 3rem;
			border-bottom: 0.15rem solid $black;
		}
		.cont{
			.type{
				width: 2rem;
			}
			
		}
		.btn_box{
			padding: 0.98rem 0.3rem 0.3rem 0.3rem;
		}
		.row{
			height: 0.96rem;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			span{
				float: left;
				display: inline-block;
				line-height: 0.96rem;
				font-size: $fs28;
			}
			input{
				float: left;
				display: inline-block;
				height: 0.64rem;
				background: #1b1f26;
				border-radius: 0.1rem;
				margin: 0.16rem 0;
				padding: 0 0.1rem;
				color: $white;
				&.ipt_lg{
					width: 2rem;
				}
				&.ipt_sm{
					width: 1rem;
					margin-right: 0.15rem;
				}
			}
			em{
				line-height: 0.96rem;
				margin-right: 0.15rem;
				&:first-child{
					font-size: 0.48rem;
					margin-right: 0.3rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
			b{
				color: $white;
				font-weight: bold;
				line-height: 0.96rem;
				margin-left: 0.05rem;
			}
			.icon_arrow{
				width: 0.22rem;
				height: 0.96rem;
				background: url(../../assets/images/arrow.png) no-repeat right 0.38rem;
				background-size: 0.12rem 0.2rem;
			}
			.switch{
				float: right;
				width: 0.96rem;
				height: 0.48rem;
				background: #1b1f26;
				border-radius: 0.24rem;
				border: 0.01rem solid $black;
				margin: 0.24rem 0;
				position: relative;
				.icon_zero{
					width: 0.4rem;
					height: 0.4rem;
					background: #525866;
					border-radius: 100%;
					position: absolute;
					top: 0.04rem;
					left: 0.04rem;
				}
				&.current{
					.icon_zero{
						left: 0.48rem;
						background: $blue;
					}
				}
			}
			.reminda_ways{
				float: right;
				margin-left: 0.3rem;
				span{
					font-size: $fs24;
				}
				.icon{
					float: left;
					width: 0.24rem;
					height: 0.96rem;
					margin: 0 0.1rem 0 0;
					&.icon_check{
						background: url(../../assets/images/check.png) no-repeat center 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
					&.icon_checked{
						background: url(../../assets/images/checked.png) no-repeat center 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
				}
			}
			p{
				line-height: 0.38rem;
				color: $white;
				margin-top: 0.1rem;
			}
		}
	}
</style> 