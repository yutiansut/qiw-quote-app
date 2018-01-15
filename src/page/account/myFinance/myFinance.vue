<template>
	<div id="myFinance">
		<mt-header title="我的融资" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;line-height: 1rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/account" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">规则</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container" v-show="exist">
			<div class="list" v-for="n in 10">
				<div class="state" @click="toDetails">
					<ul>
						<li>
							<i></i>
						</li>
						<li>哈哈哈</li>
						<li>
							<span>2017-01-01 19:25 ></span>
						</li>
					</ul>
				</div>
				<div class="info">
					<ul>
						<li>融资保证金：<span>1280</span>元</li>
						<li>总操盘资金：<span>1280</span>元</li>
					</ul>
					<ul>
						<li>融资金额：<span>1280</span>元</li>
						<li>亏损平仓线：<span>1280</span>元</li>
					</ul>
				</div>
				<div id="black"></div>
			</div>
		</div>
		<div id="none" v-show="none">
			<p>暂无融资记录，快去申请吧！</p>
			<mt-button class="btn">立即申请</mt-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:"myFinance",
		data(){
			return{
				exist:true,
				none:false
			}
		},
		methods:{
			toDetails:function(){
				this.$router.push({path:"/financeDetails"});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#myFinance{
		width: 7.5rem;
		color:$fontBlue ;
	}
	#back{
		background: url(../../../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		.state{
			padding-right:0.3rem;
			width: 100%;
			height: 0.9rem;
			border-bottom: 1px solid #12141a;
			line-height: 0.9rem;
			ul{
				display: flex;
				justify-content: space-between;
			}
			i{
				display: block;
				width: 0.87rem;
				height: 0.87rem;
				background: url(../../../assets/images/account/state_01.png);
				background-size: 100% 100%;
			}
		}
		.info{
			padding:0rem 0.3rem;
			width: 100%;
			height: 1.3rem;
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #12141a;
			ul{
				height: 0.65rem;
				display: flex;
				justify-content: space-between;
				line-height: 0.65rem;
				&:nth-child(1){
					padding-top: 0.2rem;
				}
				&:nth-child(2){
					padding-bottom: 0.2rem;
				}
				span{
					color: $white;
					margin: 0 0.1rem;
				}
			}
		}
	}
	#black{
		height: 0.2rem;
		width: 100%;
		background-color: #1b1f26;
	}
	#none{
		width: 100%;
		padding: 0rem 0.3rem;
		p{
			font-size: $fs32;
			margin-top: 60%;
			text-align: center;
		}
		.btn{
			margin-top: 0.3rem;
			width:100%;
			height: 0.8rem;
			background-color:$blue;
			color: $white;
			border: none;
			font-size: $fs32;
		}
	}
</style>