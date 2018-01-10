<template>
	<div id="schemeDetails">
		<div class="cp" v-show="showcp">
			<ul>
				<li>交易账号：<span>000000</span></li>
				<li>
					<mt-button class="btn2">立即交易</mt-button>
				</li>
			</ul>
			<ul>
				<li>交易密码：<span>000000</span></li>
				<li></li>
			</ul>
			<div class="black"></div>
			<ul>
				<li>方案申请时间：<span>2017-12-25 19:25</span></li>
				<li>
					
				</li>
			</ul>
			<ul>
				<li>融资保证金：<span>10000元</span></li>
				<li><mt-button class="btn2">追加保证金</mt-button></li>
			</ul>
			<ul>
				<li>融资金额：<span>10000元</span></li>
				<li>
				</li>
			</ul>
			<ul>
				<li>总操盘资金：<span>20000元</span></li>
				<li></li>
			</ul>
			<ul>
				<li>亏损平仓线：<span>10000元</span></li>
				<li>
				</li>
			</ul>
			<div class="btn1">
				<btn className="bluelg" name="申请终结方案"></btn>
			</div>
		</div>
		<div class="end">
			<div class="state">
				<p>已结算</p>
			</div>
			<div class="black"></div>
			<ul>
				<li>结算金额：<span>+10000元</span></li>
				<li>交易手续费：<span>178元</span></li>
				<li>提示：<span>结算金额=操盘保证金+追加保证金+交易盈亏-交易手续费</span></li>
			</ul>
			<div class="black"></div>
			<ul >
				<li>融资保证金：<span>10000元</span></li>
				<li>融资金额：<span>10000元</span></li>
				<li>总操盘资金：<span>20000元</span></li>
				<li>亏损平仓线：<span>10000元</span></li>
				<li>方案结算时间：<span>2017-12-25 19:25</span></li>
				<li>交易盈亏：<span>+500元</span></li>
				<li>美元结算汇率：<span>1美元=6.9人民币</span></li>
			</ul>
			<div class="levle">
				操盘手数
			</div>
			<ul class="handle">
				<li v-for="n in 10">富时A50 <span>1手</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import btn from "../../../components/btn.vue"
	export default{
		name:"schemeDetails",
		components:{btn},
		data(){
			return{
				showcp:false
			}
		}
	}
</script>


<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#schemeDetails{
		width: 7.5rem;
		color:$fontBlue;
		.cp{
			display:flex;
			flex-direction: column;
			ul{
				padding:0rem 0.3rem;
				border-bottom: 1px solid #12141a;
				line-height:0.9rem;
				height:0.9rem;
				display:flex;
				justify-content: space-between;
				.btn2{
					width: 1.8rem;
					height: 0.6rem;
					background-color: $yellow;
					color: $black;
					border-radius: 0.1rem;
					border: none;
					font-size: 0.24rem;
				}
				span{
					color:$white;
				}
			}
			.btn1{
				width: 7.5rem;
				padding: 0rem 0.3rem;
				position: fixed;
				bottom: 0.3rem;
			}
		}
		.end{
			display: flex;
			flex-direction: column;
			.state{
				text-align: center;
				width: 100%;
				height: 1rem;
				border-bottom: 1px solid #12141a;
				p{
					font-size: $fs32;
					line-height: 1rem;
				}
			}
			ul{
				li{
					padding:0rem 0.3rem;
					width: 100%;
					line-height:0.9rem;
					border-bottom: 1px solid #12141a;
				}
				span{
					color:$white;
				}
			}
			.levle{
				background-color: $titleBlue;
				height: 0.64rem;
				padding-left: 0.3rem;
				line-height: 0.64rem;
				border-bottom: 1px solid #12141a;
			}
			.handle{
				text-align: center;
				li{
					&:nth-child(odd){
						width: 50%;
						float: left;
					}
					&:nth-child(even){
						width: 50%;
						float: left;
					}
				}
			}
			
		}
		.black{
			height: 0.2rem;
			width: 100%;
			background-color: #1b1f26;
			border-bottom: 1px solid #12141a;
		}
		
	}
</style>