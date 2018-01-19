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
					console.log(222);
					let data = {
						Method: "QryHistory",
						Parameters:{
							ExchangeNo: this.currentdetail.ExchangeNo,
							CommodityNo: this.currentdetail.CommodityNo,
							ContractNo: this.currentdetail.MainContract,
							HisQuoteType: 0,
							BeginTime: "",
							EndTime: "",
							Count: 0
						}
					};
					this.$store.state.isshow.isfens = true;
					this.quoteSocket.send(JSON.stringify(data));
				}
			}
		},
		mounted: function(){
			let h = this.$parent.chartsHight;
			$("#fens").css('height', h/10*6.9 + 'rem');
			$("#volume").css('height', h/10*3 + 'rem');
			if(this.currentdetail != undefined && this.currentdetail != null && this.currentdetail != ''){
				console.log(111);
				let data = {
					Method: "QryHistory",
					Parameters:{
						ExchangeNo: this.currentdetail.ExchangeNo,
						CommodityNo: this.currentdetail.CommodityNo,
						ContractNo: this.currentdetail.MainContract,
						HisQuoteType: 0,
						BeginTime: "",
						EndTime: "",
						Count: 0
					}
				};
				console.log(data);
				this.$store.state.isshow.isfens = true;
				this.quoteSocket.send(JSON.stringify(data));
			}
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