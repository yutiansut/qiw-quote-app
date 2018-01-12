<template>
	<div id="hasLogin">
		<div class="bg"></div>
		<div class="cont">
			<h1>交易账号：15182736808</h1>
			<ul>
				<li>
					<i class="icon icon_one"></i>
					<span>切换交易账号</span>
				</li>
				<li>
					<i class="icon icon_two"></i>
					<span>退出交易账号</span>
				</li>
				<li>
					<i class="icon icon_three"></i>
					<span>融资交易申请</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hasLogin',
		components: {
		},
		data(){
			return{
			}
		},
		mounted: function(){
			var h = window.screen.height;
			$(".cont").height(h);
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.bg{
		position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 99;
	    background: #000;
	    opacity: 0.5;
	}
	.cont{
		position: fixed;
		top: 0;
		right: 0;
		z-index: 100;
		width: 6.2rem;
		overflow: hidden;
		background: $bg;
		h1{
			height: 2.5rem;
			line-height: 2.5rem;
			text-align: center;
			font-size: $fs32;
			color: $white;
			border-bottom: 0.01rem solid $black;
		}
		li{
			height: 0.88rem;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			span{
				float: left;
				line-height: 0.88rem;
				font-size: $fs28;
			}
			.icon{
				float: left;
				width: 0.4rem;
				height: 0.4rem;
				margin: 0.22rem 0.2rem 0.22rem 0;
				&.icon_one{
					background: url(../../assets/images/num_01.png) no-repeat center center;
					background-size: 100% 100%;
				}
				&.icon_two{
					background: url(../../assets/images/num_02.png) no-repeat center center;
					background-size: 100% 100%;
				}
				&.icon_three{
					background: url(../../assets/images/num_03.png) no-repeat center center;
					background-size: 100% 100%;
				}
			}
		}
	}
	
</style>