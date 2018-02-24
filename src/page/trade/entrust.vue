<template>
	<div id="entrust" class="list">
		<ul>
			<li>
				<div class="list_title">
					<span class="name">合约名称</span>
					<span class="num">状态</span>
					<span class="type">买卖</span>
					<span class="price">委托价</span>
					<span class="price">委托量</span>
					<span class="price">已成交</span>
					<span class="price">已撤单</span>
					<span class="price">下单时间</span>
					<span class="status">状态说明</span>
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
		name: "entrust",
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
		ul{
			width: 13rem;
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
				/*display: none;*/
				height: 0.96rem;
				border-bottom: 0.01rem solid $black;
				padding-left: 2.9rem;
				#btn{
					float: left;
					margin: 0.16rem 0.1rem;
				}
			}
		}
	}
</style>