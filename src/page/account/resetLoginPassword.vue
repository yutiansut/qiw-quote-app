<template>
	<div id="resetLoginPassword">
		<mt-header title="修改登录密码" fixed style="background-color:#242933;font-size: 0.32rem;height: 0.8rem;">
		  	<router-link to="/personalSet" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<ul>
				<li>
					<i></i>
					<input type="text" class="input1" placeholder="原密码"/>
				</li>
			</ul>
			<ul>
				<li>
					<i></i>
					<input type="text" class="input1" placeholder="输入新密码(6-12位)"/>
				</li>
			</ul>
			<ul>
				<li>
					<i></i>
					<input type="text" class="input1" placeholder="确认新密码"/>
				</li>
			</ul>
			<mt-button class="btn">完成</mt-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:"resetLoginPassword"
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#resetLoginPassword{
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
		width: 100%;
		margin-top: 0.8rem;
		border-top: 1px solid #12141a;
		padding: 0 0.3rem;
		display: flex;
		flex-direction: column;
			ul{
				li{
					position: relative;
					i{
						background: url(../../assets/images/account/resetLoginPassword.png);
						background-size: 100% 100%;
						position: absolute;
						top: 0.56rem;
						left: 0.3rem;	
						display: inline-block;
						width: 0.42rem;
						height: 0.42rem;
					}
				}
			}
			.btn{
				margin-top: 0.3rem;
				width:100%;
				height: 0.8rem;
				background-color: $blue;
				color: $white;
				border: none;
			}
			.input1{
				background-color: #1b1f26;
				border: 1px solid #12141a;
				outline: none;
				border-radius: 0.1rem;
				height: 0.88rem;
				width: 100%;
				text-indent: 1rem;
				color: $white;
				margin-top: 0.3rem;
				&:hover{
					border-color: $blue;
				}
			}
	}
</style>