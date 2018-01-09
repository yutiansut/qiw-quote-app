<template>
	<div id="moneyDetails">
		<mt-header title="资金明细" fixed style="background-color:#242933;font-size: 0.32rem;height: 0.8rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<div id="info">
				<ul>
					<li>
						收入:&nbsp;<span>3</span>笔<i>3000</i>元
					</li>
					<li>
						支出:&nbsp;<span>3</span>笔<i>3000</i>元
					</li>
				</ul>
			</div>
			<div class="list" v-for="n in 6">
				<div class="black"></div>
				<div class="details">
					<ul>
						<li>
							<span>入金</span>
							<p>2017-12-09 19:25</p>
						</li>
						<li>+1000元</li>
					</ul>
					<ul>
						<li>注册账户获得1000元</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"moneyDetails"
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#login{
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
		#info{
			li{
				padding: 0 0.3rem;
				height: 0.9rem;
				line-height: 0.9rem;
				&:nth-child(1){
					border-bottom: 1px solid #12141a;
				}
				span{
					color: $white;
					margin:0 0.14rem;
				}
				i{
					color: $white;
					margin-left: 0.24rem;
					margin-right: 0.16rem;
				}
			}
		}
		.list{
			.black{
				width: 100%;
				height: 0.2rem;
				background-color:#1b1f26;
			}
			.details{
				display: flex;
				flex-direction: column;
				ul{
					border-bottom: 1px solid #12141a;
					display: flex;
					justify-content: space-between;
					padding: 0 0.3rem;
					color: $white;
					&:nth-child(1){
						background-color: #3a2d36;
						li{
							height: 0.9rem;
							display: flex;
							flex-direction: column;
							&:nth-child(1){
								padding-top: 0.16rem;
								p{
									margin-top: 0.16rem;
									color: $fontBlue;
								}
							}
							&:nth-child(2){
								padding-top: 0.3rem;
								color: $red;
							}
						}
					}
					&:nth-child(2){
						li{
							height: 0.9rem;
							padding-top: 0.3rem;
						}
					}
				}
			}
		}
	}
</style>