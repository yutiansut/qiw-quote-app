<template>
	<div id="selectBox" class="select_box">
		<div class="bg" v-show="shadeShow" @tap="closeSelectEvent"></div>
		<div class="select_cont">
			<ul>
				<template v-for="(v, index) in obj">
					<li @tap="selectEvent(v.commodityNo)">
						<span>{{v.commodityName}}&nbsp;&nbsp;{{v.commodityNo + v.contractNo}}</span>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'selectBox',
		props: ['obj', 'type'],
		data(){
			return{
				shadeShow: false,
			}
		},
		computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
		},
		methods: {
			closeSelectEvent: function(){
				this.shadeShow = false;
				$(".select_cont").css({bottom: -5.3 + 'rem'});
			},
			selectEvent: function(num){
				if(this.type == 'order'){
					this.$parent.currentOrder = this.orderTemplist[num].CommodityName + " " + num + this.orderTemplist[num].MainContract;
				}
				this.shadeShow = false;
				$(".select_cont").css({bottom: -5.3 + 'rem'});
			}
		},
		mounted: function(){
			console.log(this.obj);
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	.select_box{
		.select_cont{
			position: fixed;
			bottom: -5.3rem;
			left: 0;
			z-index: 100;
			width: 7.5rem;
			height: 5.3rem;
			overflow-y: auto;
			background: $white;
			transition: all .3s;
			li{
				width: 7.5rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-bottom: 0.01rem solid #e6e6e6;
				/*&:first-child{
					span{
						font-weight: bold;
					}
				}*/
				span{
					color: #1a1a1a;
					font-size: $fs28;
				}
			}
		}
	}
</style>
