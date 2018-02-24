1<template>
	<div id="normalOrder" class="fm">
		<div class="row">
			<b>合约代码</b>
			<div class="slt fl" @tap="openSelectBox">
				<input type="text" class="ipt_lg" :value="currentOrder" readonly="readonly" />
				<i class="icon icon_select"></i>
			</div>
		</div>
		<div class="row">
			<b>订单类型</b>
			<div class="slt slt_dm fl">
				<input type="text" class="ipt_sm" value="市价" readonly="readonly" />
				<i class="icon icon_select"></i>
			</div>
			<input type="text" class="ipt_md ml" value="市价" readonly />
		</div>
		<div class="row">
			<b>委托数量</b>
			<div class="num_box">
				<span class="add">+</span>
				<input type="number" />
				<span class="reduce">-</span>
			</div>
		</div>
		<div class="btn_box">
			<btn name="买入/市价" className="redmd"></btn>
			<btn name="卖出/市价" className="greenmd"></btn>
		</div>
		<selectBox ref="selectBox" :obj="commodityAll" type="order"></selectBox>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import selectBox from "../../components/selectBox.vue"
	export default {
		name: 'normalOrder',
		components: {btn, selectBox},
		data(){
			return{
				currentOrder: '',
			}
		},
		computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			commodityAll(){
				return this.$store.state.account.commodityAll;
			},
//			currentOrder(){
//				return this.commodityAll[0].commodityName + " " + this.commodityAll[0].commodityNo + this.orderTemplist[this.commodityAll[0].commodityNo].MainContract;
//			},
			currentNo(){
				return this.commodityAll[0].commodityNo;
			}
		},
		methods: {
			openSelectBox: function(){
				$(".select_cont").css({bottom: 0});
				this.$refs.selectBox.shadeShow = true;
			}
		},
		mounted: function(){
			//初始当前合约
			this.currentOrder = this.commodityAll[0].commodityName + " " + this.commodityAll[0].commodityNo + this.orderTemplist[this.commodityAll[0].commodityNo].MainContract;
		},
		activated: function(){
//			this.objCont = this.commodityAll;
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.fm{
		width: 7.5rem;
		height: 5.02rem;
		border-bottom: 0.01rem solid $black;
		padding: 0.3rem 0 0 0;
		.row{
			width: 7.5rem;
			padding: 0 0.3rem;
			height: 0.88rem;
			overflow: hidden;
			margin-bottom: 0.3rem;
			b{
				float: left;
				display: inline-block;
				width: 1.3rem;
				height: 0.88rem;
				line-height: 0.88rem;
				font-weight: normal;
				font-size: $fs28;
			}
			.slt{
				width: 5.6rem;
				height: 0.88rem;
				overflow: hidden;
				position: relative;
				&.slt_dm{
					width: 1.2rem;
				}
				.icon{
					width: 0.1rem;
					height: 0.1rem;
					position: absolute;
					bottom: 0.1rem;
					right: 0.1rem;
					&.icon_select{
						background: url(../../assets/images/account/subscript_01.png) no-repeat center center;
						background-size: 100% 100%;
					}
					&.icon_selected{
						background: url(../../assets/images/account/subscript_02.png) no-repeat center center;
						background-size: 100% 100%;
					}
				}
			}
			input{
				float: left;
				display: inline-block;
				height: 0.88rem;
				color: $white;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				background: #1b1f26;
				text-align: center;
				font-size: $fs28;
				&.ipt_lg{
					width: 5.6rem;
				}
				&.ipt_sm{
					width: 1.2rem;
				}
				&.ipt_md{
					width: 4rem;
				}
			}
			.ml{
				margin-left: 0.35rem;
			}
			.num_box{
				float: left;
				width: 5.6rem;
				height: 0.88rem;
				border: 0.01rem solid $black;
				background: #1b1f26;
				border-radius: 0.1rem;
				span{
					display: inline-block;
					float: left;
					width: 0.8rem;
					height: 0.88rem;
					line-height: 0.88rem;
					text-align: center;
					border-right: 0.01rem solid $black;
					font-size: $fs32;
					&.reduce{
						float: right;
						border: none;
						border-left: 0.01rem solid $black;
					}
				}
				input{
					border: none;
					width: 3rem;
					height: 0.6rem;
					line-height: 0.6rem;
					margin: 0.14rem 0;
				}
			}
		}
		.btn_box{
			padding: 0 0.3rem;
			display: flex;
			justify-content: space-between;
		}
	}
</style>