<template>
	<div id="search">
		<div class="search_box">
			<div class="search">
				<i class="icon icon_search"></i>
				<input type="text" placeholder="搜索并添加合约" />
			</div>
		</div>
		<div class="main">
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'optionalManage',
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
		width: 7.5rem;
		height: 0.96rem;
		border-bottom: 0.01rem solid $black;
		padding: 0.16rem 0.3rem;
		.search{
			width: 6.9rem;
			height: 0.64rem;
			background: #1b1f26;
			border-radius: 0.1rem;
			position: relative;
			input{
				width: 6.9rem;
				height: 0.64rem;
				line-height: 0.64rem;
				padding: 0 0.1rem 0 0.85rem;
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
		}
	}
	.main{
		margin-top: 1.01rem;
		
		.list{
			width: 7.5rem;
			.title{
				li{
					height: 0.64rem;
					line-height: 0.64rem;
					background: $titleBlue;
					.icon{
						height: 0.64rem;
						background: url(../../assets/images/check.png) no-repeat 0.3rem 0.36rem;
						background-size: 0.24rem 0.24rem;
						opacity: 0;
					}
					div{
						color: $fontBlue;
						font-size: $fs28;
					}
				}
			}
			li{
				height: 0.96rem;
				border-bottom: 0.01rem solid $black;
				padding-right: 0.3rem;
				.icon{
					float: left;
					width: 0.84rem;
					height: 0.96rem;
					&.icon_check{
						background: url(../../assets/images/check.png) no-repeat 0.3rem 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
					&.icon_checked{
						background: url(../../assets/images/checked.png) no-repeat 0.3rem 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
				}
				div{
					float: left;
					text-align: right;
					&.name{
						width: 3rem;
						text-align: left;
					}
					&.price{
						width: 1.5rem;
					}
					span{
						display: block;
						&:first-child{
							font-size: $fs32;
							color: $white;
							margin: 0.15rem 0 0.1rem 0;
						}
					}
					&.drag{
						float: right;
						width: 1rem;
						.icon_drag{
							float: right;
							width: 0.24rem;
							height: 0.24rem;
							background: url(../../assets/images/drag.png) no-repeat center center;
							background-size: 100% 100%;
							margin: 0.36rem 0.15rem 0 0;
						}
					}
					
				}
			}
		}
	}
	.tools{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 7.5rem;
		height: 0.96rem;
		border-top: 0.01rem solid $black;	
		background: $titleBlue;
		.col{
			float: left;
			width: 50%;
			height: 0.96rem;
			line-height: 0.96rem;
			text-align: center;
			border-left: 0.01rem solid $black;
			&:first-child{
				border: none;
			}
			.icon, span, em{
				float: left;
			}
			em{
				margin-left: 0.1rem;
				color: $white;
			}
			.icon_radio{
				width: 0.24rem;
				height: 0.24rem;
				background: $black;
				border-radius: 0.12rem;
				margin: 0.35rem 0.1rem 0 1.48rem;
			}
			.icon_del{
				width: 0.24rem;
				height: 0.24rem;
				background: url(../../assets/images/delete.png) no-repeat center center;
				background-size: 100% 100%;
				margin: 0.35rem 0.1rem 0 1.24rem;
			}
		}	
	}
</style>