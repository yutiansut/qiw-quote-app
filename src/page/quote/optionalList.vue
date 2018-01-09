<template>
	<div id="index">
		<TabBar></TabBar>
		<header>
			<div class="tab">
				<template v-for="(v, index) in tabList">
					<span :class="{current: selectNum == index}">{{v}}</span>
				</template>
			</div>
			<i class="icon icon_search"></i>
			<i class="icon icon_set"></i>
		</header>
		<nav>
			<div class="nav_box">
				<span class="current">全部</span>
				<span>商品</span>
				<span>股指期货</span>
				<span>外汇</span>
				<span>LME金属</span>
				<span>债券期货</span>
				<span>ETF</span>
			</div>
		</nav>
		<div class="list">
			<ul>
				<li>
					<div class="name"><span>名称</span></div>
					<span>价格</span>
					<span>成交量</span>
					<span>涨跌幅<i class="icon icon_switch"></i></span>
				</li>
				<li>
					<div class="name">
						<em>小原油</em>
						<em>QM1801</em>
					</div>
					<span class="red">50.15</span>
					<span>1500</span>
					<span class="red">+0.03%</span>
				</li>
				<li>
					<div class="name">
						<em>小原油</em>
						<em>QM1801</em>
					</div>
					<span class="green">50.15</span>
					<span>1500</span>
					<span class="green">+0.03%</span>
				</li>
				<li>
					<div class="name">
						<em>小原油</em>
						<em>QM1801</em>
					</div>
					<span class="red">50.15</span>
					<span>1500</span>
					<span class="red">+0.03%</span>
				</li>
			</ul>
		</div>
		<div class="add_optional">
			<div class="box">
				<i class="icon icon_add"></i>
				<span>添加自选</span>
			</div>
		</div>
		<div class="btn_box">
			<i class="icon icon_rotate"></i>
			<i class="icon icon_box"></i>
			<i class="icon icon_optional"></i>
		</div>
	</div>
</template>

<script>
	import TabBar from "../../components/TabBar.vue"
	export default {
		name: 'index',
		components: {
			TabBar
		},
		data(){
			return{
				selectNum: 0,
				tabList: ['自选', '市场'],
				selectTypeNum: 0,
				TypeList: [],
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
	nav{
		position: fixed;
		top: 1.01rem;
		left: 0;
		width: $w;
		height: 0.8rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		overflow-x: scroll;
		.nav_box{
			width: 8.2rem;
		}
		span{
			display: inline-block;
			height: 0.75rem;
			line-height: 0.75rem;
			border-bottom: 0.04rem solid $bg;
			font-size: $fs28;
			margin-left: 0.3rem;
			&:first-child{
				margin: 0;
			}
			&.current{
				color: $blue;
				border-color: $blue;
			}
		}
	}
	.list{
		width: 7.5rem;
		margin-top: 1.82rem;
		li{
			height: 0.96rem;
			line-height: 0.96rem;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			&:first-child{
				height: 0.64rem;
				line-height: 0.64rem;
				span{
					color: $fontBlue !important;
				}
			}
			span{
				float: left;
				display: inline-block;
				font-size: $fs28;
				text-align: right;
				&:nth-child(1){
					width: 3rem;
					text-align: left;
				}
				&:nth-child(2){
					width: 1.25rem;
				}
				&:nth-child(3){
					width: 1.25rem;
					color: $white;
				}
				&:nth-child(4){
					width: 1.4rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
				.icon_switch{
					width: 0.2rem;
					height: 0.24rem;
					background: url(../../assets/images/switch.png) no-repeat center center;
					background-size: 0.18rem 0.24rem;
					margin-left: 0.05rem;
					margin-top: 0.1rem;
				}
			}
			.name{
				float: left;
				width: 3rem;
				em{
					display: block;
					line-height: 0.36rem;
					&:first-child{
						margin-top: 0.1rem;
						font-size: $fs32;
						color: $white;
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
	.btn_box{
		width: 0.9rem;
		height: 2.9rem;
		position: fixed;
		bottom: 1.3rem;
		right: 0;
		.icon{
			width: 0.64rem;
			height: 0.64rem;
			margin-bottom: 0.2rem;
			&.icon_rotate{
				background: url(../../assets/images/rotate.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_box{
				background: url(../../assets/images/box.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_optional{
				background: url(../../assets/images/optional.png) no-repeat center center;
				background-size: 100% 100%;
			}
		}
	}
	
</style>