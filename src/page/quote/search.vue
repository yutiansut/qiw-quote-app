<template>
	<div id="search">
		<div class="search_box">
			<div class="search">
				<i class="icon icon_search"></i>
				<input type="text" placeholder="搜索合约代码/简称" />
				<span>取消</span>
			</div>
		</div>
		<div class="main">
			<div class="recommend_box">
				<p class="title">大家都在搜索</p>
				<div class="recommend">
					<ul>
						<li>黄金</li>
						<li>布伦特原油</li>
						<li>美国原油</li>
						<li>黄金</li>
						<li>布伦特原油</li>
						<li>美国原油</li>
					</ul>
				</div>
			</div>
			<div class="result">
				<p class="title">搜索结果</p>
				<div class="empty">
					<p>暂无相关合约</p>
				</div>
				<div class="cont">
					<ul>
						<li>
							<div class="col">
								<span>日经225</span>
								<span>CNQ16</span>
							</div>
							<i class="icon icon_check"></i>
						</li>
						<li>
							<div class="col">
								<span>日经225</span>
								<span>CNQ16</span>
							</div>
							<i class="icon icon_checked"></i>
						</li>
					</ul>
				</div>
				<p class="tips">没有更多啦</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'search',
		components: {
		},
		data(){
			return{
				
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.search_box{
		position: fixed;
		top: 0;
		left: 0;
		width: 7.5rem;
		height: 1rem;
		border-bottom: 0.01rem solid $black;
		padding: 0.18rem 0.3rem;
		.search{
			width: 6.9rem;
			height: 0.64rem;
			background: #1b1f26;
			border: 0.01rem solid $black;
			border-radius: 0.1rem;
			position: relative;
			input{
				width: 6.9rem;
				height: 0.64rem;
				line-height: 0.64rem;
				padding: 0 0.9rem 0 0.85rem;
				box-sizing: border-box;
				color: $white;
			}
			.icon_search{
				position: absolute;
				top: 0;
				left: 0;
				width: 0.4rem;
				height: 0.4rem;
				background: url(../../assets/images/search.png) no-repeat center center;
				background-size: 100% 100%;
				margin: 0.12rem 0 0 0.3rem;
			}
			span{
				display: block;
				height: 0.64rem;
				line-height: 0.64rem;
				position: absolute;
				top: 0;
				right: 0.3rem;
			}
		}
	}
	.main{
		margin-top: 1.01rem;
		.recommend_box{
			overflow: hidden;
		}
		.title{
			height: 0.64rem;
			line-height: 0.64rem;
			padding: 0 0.3rem;
			border-bottom: 0.01rem solid $black;
			background: $titleBlue;
		}
		.recommend{
			li{
				float: left;
				width: 2.5rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-left: 0.01rem solid $black;
				border-bottom: 0.01rem solid $black;
			}
		}
		.result{
			.cont{
				li{
					height: 0.96rem;
					padding: 0 0.3rem;
					border-bottom: 0.01rem solid $black;
					.col{
						float: left;
						span{
							display: block;
							&:first-child{
								font-size: $fs32;
								color: $white;
								margin: 0.15rem 0 0.1rem 0;
							}
						}
					}
					.icon{
						float: right;
						width: 0.24rem;
						height: 0.96rem;
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
			}
			.tips{
				height: 0.96rem;
				line-height: 0.96rem;
				text-align: center;
				color: #525866;
			}
		}
		.empty{
			height: 2.4rem;
			line-height: 2.4rem;
			border-bottom: 0.01rem solid $black;
			text-align: center;
			p{
				font-size: 0.36rem;
				color: #525866;
				font-weight: bold;
			}
		}
	}
</style>