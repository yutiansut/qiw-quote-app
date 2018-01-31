<template>
	<div id="help">
		<mt-header title="帮助中心" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<ul class="navbar">
					<li class="current">自选相关</li>
					<li>交易相关</li>
					<li>兑换相关</li>
					<li>提醒相关</li>
			</ul>
			<div class="zixuan">
				<div class="project">
					<div class="question">
						<p>如何成为指数天下会员？</p>
						<i></i>
					</div>
					<div class="answer">
						<p>注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘，策略跟单等服务。</p>
						<i></i>
					</div>
				</div>
			</div>
			<div class="jiaoyi">
				<div class="project">
					<div class="question">
						<p>如何成为指数天下会员？</p>
						<i></i>
					</div>
					<div class="answer">
						<p>注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘，策略跟单等服务。</p>
						<i></i>
					</div>
				</div>
			</div>
			<div class="duihuan">
				<div class="project">
					<div class="question">
						<p>如何成为指数天下会员？</p>
						<i></i>
					</div>
					<div class="answer">
						<p>注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘，策略跟单等服务。</p>
						<i></i>
					</div>
				</div>
			</div>
			<div class="tixin">
				<div class="project">
					<div class="question">
						<p>如何成为指数天下会员？</p>
						<i></i>
					</div>
					<div class="answer">
						<p>注册指数天下的平台账号就可成为指数天下会员，会员可享受模拟操盘，策略跟单等服务。</p>
						<i></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"help",
		data(){
			return{
				selected:"自选相关"
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#help{
		width: 7.5rem;
	}
	#back{
		background: url(../../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#container{
		color:$fontBlue ;
		width: 100%;
		margin-top: 1rem;
		.navbar{
			background-color: $titleBlue;
			height: 0.8rem;
			display: flex;
			flex-direction: row;
			border-bottom:1px solid #12141a;
			line-height: 0.8rem;
			padding: 0rem 0.3rem;
			li{
				margin-right: 0.4rem;
			}
		}
		.project{
			width: 100%;
			.question{
				width: 100%;
				padding: 0rem 0.3rem 0rem 0.3rem;
				height: 0.9rem;
				color:$fontBlue;
				line-height: 0.9rem;
				font-size: $fs28;
				border-bottom:1px solid #12141a;
				position:relative;
				i{
					position: absolute;
					bottom: 0.1rem;
					right: 0.3rem;
					display: inline-block;
					width: 0.1rem;
					height: 0.1rem;
					background: url(../../assets/images/account/subscript_01.png);
					background-size: 100% 100%;
				}
			}
			.answer{
				width: 100%;
				padding: 0rem 0.3rem 0rem 0.3rem;
				color:$white;
				line-height: 0.7rem;
				font-size: $fs28;
				border-bottom:1px solid #12141a;
				position:relative;
				i{
					position: absolute;
					bottom: 0.1rem;
					right: 0.3rem;
					display: inline-block;
					width: 0.1rem;
					height: 0.1rem;
					background: url(../../assets/images/account/subscript_02.png);
					background-size: 100% 100%;
				}
			}
		}
		.current{
			color: $blue;
		}
	}
</style>