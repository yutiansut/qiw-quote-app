<template>
	<div id="echarts">
		<div id="light"></div>
	</div>
</template>

<script>
	export default{
		name: 'echarts',
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			currentdetail(){
				return this.$store.state.market.currentdetail;
			}
		},
		watch: {
			currentdetail: function(n, o){
				if(n != undefined && n != null && n != ''){
					
				}
			}
		},
		mounted: function(){
			let h = this.$parent.chartsHight;
			$("#light").css('height', h*0.98 + 'rem');
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#fens, #volume{
		width: 100%;
		margin: 0 auto;
	}
</style>