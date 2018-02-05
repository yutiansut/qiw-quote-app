<template>
	<div id="condition" class="list">
		<ul>
			<li>
				<div class="list_title">
					<span class="name">合约名称</span>
					<span class="num">状态</span>
					<span class="type">类型</span>
					<span class="price">条件</span>
					<span class="price">下单</span>
					<span class="status">有效日期</span>
					<span class="status">下单时间</span>
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
					<btn name="暂停" className="orangesm"></btn>
					<btn name="修改" className="bluesm" @tap.native="editEvent"></btn>
					<btn name="删除" className="greensm"></btn>
				</div>
			</li>
			<li>
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
			<li>
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
		<conditionTime ref="conditionTime"></conditionTime>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import conditionTime from "./conditionTime.vue"
	export default{
		name: "condition",
		components: {btn, conditionTime},
		data(){
			return{
			}
		},
		methods: {
			editEvent: function(){
				this.$refs.conditionTime.show = true;
			}
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