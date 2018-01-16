<template>
	<div id="index">
		<div class="main">
			<div class="title">
				<span>外汇</span>
				<!--<i class="icon icon_show"></i>-->
				<i class="icon icon_hide"></i>
			</div>
			<div class="recommend">
				<div class="col">
					<span class="name">美原油</span>
					<span class="red">52.49<i class="icon icon_arrow up"></i></span>
					<span class="red">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
				<div class="col">
					<span class="name">美黄金</span>
					<span class="green">52.49<i class="icon icon_arrow down"></i></span>
					<span class="green">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
				<div class="col">
					<span class="name">美铜</span>
					<span class="red">1036.49<i class="icon icon_arrow up"></i></span>
					<span class="red">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
			</div>
			<div class="title">
				<span>商品</span>
				<i class="icon icon_show"></i>
				<!--<i class="icon icon_hide"></i>-->
			</div>
			<div class="recommend">
				<div class="col">
					<span class="name">美原油</span>
					<span class="red">52.49<i class="icon icon_arrow up"></i></span>
					<span class="red">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
				<div class="col">
					<span class="name">美黄金</span>
					<span class="green">52.49<i class="icon icon_arrow down"></i></span>
					<span class="green">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
				<div class="col">
					<span class="name">美铜</span>
					<span class="red">1036.49<i class="icon icon_arrow up"></i></span>
					<span class="red">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
				<div class="col">
					<span class="name">美原油</span>
					<span class="red">52.49<i class="icon icon_arrow up"></i></span>
					<span class="red">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
				<div class="col">
					<span class="name">美黄金</span>
					<span class="green">52.49<i class="icon icon_arrow down"></i></span>
					<span class="green">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
				<div class="col">
					<span class="name">美铜</span>
					<span class="red">1036.49<i class="icon icon_arrow up"></i></span>
					<span class="red">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
			</div>
			<div class="add_optional">
				<div class="box">
					<i class="icon icon_add"></i>
					<span @touchstart="addOptional">添加自选</span>
				</div>
			</div>
			<div class="icon icon_list" @touchstart="switchList"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		components: {},
		data(){
			return{
			}
		},
		methods: {
			addOptional: function(){
				this.$router.push({path: '/search'});
			},
			switchList: function(){
				this.$parent.currentView = 'optionalList';
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	header{
		position: fixed;
		top: 0;
		left: 0;
		width: $w;
		height: 1rem;
		overflow: hidden;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		margin: auto;
		.tab{
			width: 2rem;
			height: 0.6rem;
			margin: 0.2rem auto;
			span{
				display: inline-block;
				float: left;
				width: 1rem;
				height: 0.6rem;
				line-height: 0.6rem;
				text-align: center;
				background: $lightBlue;
				font-size: $fs28;
				&.current{
					background: $black;
					color: $white;
				}
			}
		}
		.icon_search{
			width: 0.6rem;
			height: 1rem;
			background: url(../../assets/images/search.png) no-repeat right 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.3rem;
		}
		.icon_set{
			width: 0.6rem;
			height: 1rem;
			background: url(../../assets/images/set.png) no-repeat left 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.9rem;
		}
	}
	.main{
		margin-top: 1.01rem;
	}
	.title{
		width: 7.5rem;
		height: 0.64rem;
		overflow: hidden;
		background: $titleBlue;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		span{
			line-height: 0.64rem;
		}
		.icon{
			float: right;
			width: 0.2rem;
			height: 0.64rem;
			&.icon_show{
				background: url(../../assets/images/show.png) no-repeat center 0.26rem;
				background-size: 0.2rem 0.12rem;
			}
			&.icon_hide{
				background: url(../../assets/images/hide.png) no-repeat center 0.26rem;
				background-size: 0.2rem 0.12rem;
			}
		}
	}
	.recommend{
		width: 7.5rem;
		.col{
			float: left;
			width: 2.5rem;
			height: 1.6rem;
			border-right: 0.01rem solid $black;
			border-bottom: 0.01rem solid $black;
			span{
				display: block;
				text-align: center;
				font-size: $fs32;
				&.name{
					color: $white;
					margin-top: 0.25rem;
				}
				&:last-child{
					font-size: 0.2rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
					padding-top: 0;
				}
				&:nth-child(2){
					height: 0.6rem;
					line-height: 0.6rem;
					.icon_arrow{
						width: 0.13rem;
						height: 0.27rem;
						margin: 0.1rem 0 0 0.1rem;
						&.up{
							background: url(../../assets/images/arrow_up.png) no-repeat center center;
							background-size: 0.13rem 0.27rem;
						}
						&.down{
							background: url(../../assets/images/arrow_down.png) no-repeat center center;
							background-size: 0.13rem 0.27rem;
						}
					}
				}
			}
		}
	}
	.add_optional{
		width: 7.5rem;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.01rem solid $black;
		display: flex;
		justify-content: center;
		.icon_add{
			float: left;
			width: 0.4rem;
			height: 0.4rem;
			background: url(../../assets/images/add.png) no-repeat center center;
			background-size: 100% 100%;
			margin: 0.3rem 0.15rem 0 0;
		}
		span{
			color: $white;
		}
	}
	.icon_list{
		width: 0.64rem;
		height: 0.64rem;
		background: url(../../assets/images/list.png) no-repeat center center;
		background-size: 100% 100%;
		position: fixed;
		bottom: 1.5rem;
		right: 0.3rem;
	}
	
</style>