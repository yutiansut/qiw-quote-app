<template>
	<div id="historyOrder" class="list">
		<div class="search">
			<div class="col">
				<i class="icon icon_time"></i>
				<input type="text" placeholder="开始时间" />
			</div>
			<span class="fl">-</span>
			<div class="col">
				<i class="icon icon_time"></i>
				<input type="text" placeholder="结束时间" />
			</div>
			<button>查询</button>
		</div>
		<ul>
			<li>
				<div class="list_title">
					<span class="num">序号</span>
					<span class="name">合约代码</span>
					<span class="num">交易所</span>
					<span class="num">币种</span>
					<span class="type">买卖</span>
					<span class="price">成交价</span>
					<span class="price">成交量</span>
					<span class="price">手续费</span>
					<span class="status">平仓盈亏</span>
					<span class="status">成交时间</span>
				</div>
			</li>
			<li class="current">
				<div class="list_cont">
					<div class="name">
						<em>日经225</em>
						<em>CNQ16</em>
					</div>
					<span class="num">1</span>
					<span class="type">买</span>
					<span class="price red">51.03</span>
					<span class="status green">51.03</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default{
		name: "historyOrder",
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
		.search{
			height: 0.96rem;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			.col{
				float: left;
				width: 2.1rem;
				height: 0.64rem;
				overflow: hidden;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.16rem 0;
				.icon{
					float: left;
					width: 0.4rem;
					height: 0.4rem;
					background: url(../../assets/images/time.png) no-repeat center center;
					background-size: 100% 100%;
					margin: 0.11rem 0 0 0.11rem;
				}
				input{
					float: left;
					display: inline-block;
					width: 1.55rem;
					height: 0.64rem;
					padding: 0.1rem;
				}
			}
			span{
				line-height: 0.96rem;
				font-weight: bold;
				margin: 0 0.1rem;
			}
			button{
				width: 1.12rem;
				height: 0.56rem;
				line-height: 0.56rem;
				text-align: center;
				background: $yellow;
				border-radius: 0.1rem;
				margin: 0.2rem 0.1rem;
				padding: 0;
			}
		}
		li{
			span{
				display: inline-block;
				font-size: $fs28;
			}
			.name{
				float: left;
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
			.price, .status{
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
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
			&.current{
				.list_cont{
					background: $lightBlue;
				}
			}
			.list_cont{
				height: 0.88rem;
				border-bottom: 0.01rem solid $black;
				padding-left: 0.3rem;
				span{
					line-height: 0.88rem;
					color: $white;
				}
				.name{
					em{
						display: inline-block; 
						&:first-child{
							font-size: $fs28;
							color: $white;
							margin: 0.15rem 0 0.05rem 0;
						}
					}
				}
			}
			.tools{
				height: 0.96rem;
				border-bottom: 0.01rem solid $black;
				display: flex;
				justify-content: center;
				#btn{
					margin: 0.16rem 0.1rem;
				}
			}
		}
	}
</style>