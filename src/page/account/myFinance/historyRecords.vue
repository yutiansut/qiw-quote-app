<template>
	<div id="historyRecords">
		<div class="list_title">
			<ul>
				<li>序号</li>
				<li>成交时间</li>
				<li>客户编号</li>
				<li>币种</li>
				<li>交易所</li>
				<li>品种</li>
				<li>买/卖方向</li>
				<li>成交价</li>
				<li>平仓盈亏</li>
				<li>交易手续费</li>
			</ul>
		</div>
		<div class="list_title_row list_title" v-for="(n,index) in 5">
			<ul>
				<li>{{index}}</li>
				<li>
					<p>2017-12-25</p>
					<span>18:06:06</span>
				</li>
				<li>客户编号</li>
				<li>币种</li>
				<li>港交所</li>
				<li>国际原油</li>
				<li>买</li>
				<li>20.00</li>
				<li>0.200</li>
				<li>20..00</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:"historyRecords",
		data(){
			return{
//				arr:["成交时间","客户编号","币种","交易所","品种","买/卖方向","成交价","平仓盈亏","交易手续费"]
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#historyRecords{
		width: 7.5rem;
		color:$fontBlue;
	}
	.list_title{
		width: 100%;
		background-color:$titleBlue;
		overflow: hidden;
		height: 0.8rem;
		border-bottom: 1px solid #12141a;
		ul{
			li{
				line-height: 0.8rem;
				height: 0.8rem;
				float: left;
				width: 1.5rem;
				text-align: left;
				&:nth-child(1){
					text-indent: 0.3rem;
				}
			}
		}
	}
	.list_title_row{
		color: $white;
		ul{
			li{
				&:nth-child(2){
					text-align: center;
					display: flex;
					flex-direction: column;
					line-height: 0.4rem;
					padding-right: 0.1rem;
				}
			}
		}
		span{
			color:$fontBlue;
		}
	}
</style>