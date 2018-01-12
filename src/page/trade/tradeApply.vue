<template>
	<div id="tradeApply">
		<div class="choose">
			<p class="p_left">选择融资本金(本金越多，可持仓手数越多)</p>
			<div class="picture">
				<mt-range v-model="rangeValue">
				  <div slot="start">0</div>
				  <div slot="end">100</div>
				</mt-range>
			</div>
			<p class="p_left">选择融倍数，（倍数越多，可持仓手数越多）</p>
			<div class="picture">
				
			</div>
			<div class="black"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"tradeApply",
		data(){
			return{
				rangeValue:50
			}
		},
		watch:{
			rangeValue:function(){
				console.log(this.rangeValue)
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#tradeApply{
		width: 7.5rem;
		.choose{
			width:100%;
			margin-top:1rem;
			.p_left{
				height: 0.6rem;
				line-height: 0.6rem;
				background-color: $titleBlue;
				text-indent: 0.3rem;
				border-bottom: 1px solid #12141a;
			}
		}
	}
	
</style>