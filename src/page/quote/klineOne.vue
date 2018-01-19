<template>
	<div id="echarts">
		<div id="fens"></div>
		<div id="volume"></div>
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
			$("#fens").css('height', h/10*6.9 + 'rem');
			$("#volume").css('height', h/10*3 + 'rem');
			
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