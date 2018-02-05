<template>
	<div id="help">
		<mt-header title="帮助中心" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<ul class="navbar">
					<!--<li class="current">自选相关</li>
					<li>交易相关</li>
					<li>兑换相关</li>
					<li>提醒相关</li>-->
					<li v-for="(k,index) in this.titleList" :class="{current:current1 == index}" @click="check(index,$event)">{{k.name}}</li>
			</ul>
			<div >
				<div class="nextStep">
					<div class="project">
						<div class="question">
							<p>期货是什么？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>期货是以某种大众产品如棉花、大豆、石油等及金融资产如股票、债券等为标的标准化可交易合约。</p>
							<!--<i></i>-->
						</div>
						<div class="question">
							<p>期货交易所有哪些？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>国内有：大连商品交易所、郑州商品交易所、上海期货交易所、中国金融期货交易所。国际有：芝加哥商业交易所（CME）、纽约商业交易所（NYMEX）、伦敦金属交易所(LME)、新加坡国际金融交易所(SIMEX)、香港期货交易所(HKFE)等。</p>
							<!--<i></i>-->
						</div>
						<div class="question">
							<p>期货保证金是什么？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>期货交易者按照规定标准交纳的资金，用于结算和保证履约。</p>
							<!--<i></i>-->
						</div>
						<div class="question">
							<p>做多做空是什么意思？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>在保证金交易制度下，期货交易者可以先买后卖，也可以先卖后买，前者称之为做多交易，后者称之为做空交易。做空交易者可能并不拥有其所卖出的期货合约的标的物，他们假设能以低于开仓卖出的价格买回期货合约平仓。</p>
							<!--<i></i>-->
						</div>
						<div class="question">
							<p>什么是开仓、平仓？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>【开仓】：是指期货交易者买入或者卖出，并持有期货合约的交易的行为。<br>
							【平仓】：是指期货交易者买入或者卖出与其所持期货合约的品种、数量及交割月份相同但交易方向相反的期货合约，了结期货交易的行为。
							</p>
							<!--<i></i>-->
						</div>
					</div>
				</div>
				<div class="nextStep">
					<div class="project">
						<div class="question">
							<p>什么是最小变动价位？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>期货合约的单位价格涨跌变动的最小值。</p>
							<!--<i></i>-->
						</div>
						<div class="question">
							<p>什么是最后交易日？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>某一期货合约在合约交割月份中进行交易的最后一个交易日。</p>
							<!--<i></i>-->
						</div>
						<div class="question">
							<p>为何要追加保证金？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>当交易者的必须保证金少于一定数量时（这个数量由交易所和经纪公司根据市场行情确定），按照需要补足的保证金进行缴纳。交易者也可以自行增加保证金获得更大开仓手数。</p>
							<!--<i></i>-->
						</div>
						<div class="question">
							<p>什么是套利交易？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>同时买进或卖出两种相关商品，并希望在日后对冲交易部位时有所获利。套利交易关心的是合约之间的相互价格关系，而不是绝对价格水平。</p>
							<!--<i></i>-->
						</div>
					</div>
				</div>
				<div class="nextStep">
					<div class="project">
						<div class="question">
							<p>行情可以最多叠加多少个？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>目前支持最多5个不同行情的叠加对比。</p>
							<!--<i></i>-->
						</div>
						<div class="question">
							<p>所有行情都可以叠加和提醒吗？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>是的，所有行情均支持叠加、提醒。</p>
							<!--<i></i>-->
						</div>
					</div>
				</div>
				<div class="nextStep">
					<div class="project">
						<div class="question">
							<p>短信提醒最多可以发多少条？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>无条数限制。</p>
							<!--<i></i>-->
						</div>
						<div class="question">
							<p>设置好上涨的点位，超过了又跌下来会提醒吗？</p>
							<!--<i></i>-->
						</div>
						<div class="answer">
							<p>不会提醒。若需要跌下来后再进行提醒，可设置参数"下跌到XX点进行提醒"</p>
							<!--<i></i>-->
						</div>
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
				selected:"自选相关",
				titleList:[{name:"期货入门"},{name:"期货进阶"},{name:"行情相关"},{name:"短信提醒"}],
				current1:0
			}
		},
		methods:{
			check:function(index,e){
				this.current1 = index;
				$(".nextStep").eq(index).css("display","block")
				$(".nextStep").eq(index).siblings().css("display","none");
			},
		},
		mounted:function(){
			$(".nextStep").eq(0).siblings().css("display","none");
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
				font-size: $fs24;
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
			border-bottom: 0.04rem solid $blue;
		}
	}
</style>