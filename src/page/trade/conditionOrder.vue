<template>
	<div id="condetionOrder" class="fm">
		<div class="row">
			<b>合约代码</b>
			<div class="slt fl" @tap="openSelectOrder">
				<input type="text" class="ipt_lg" :value="currentOrder" readonly="readonly" />
				<i class="icon icon_select"></i>
			</div>
		</div>
		<div class="row">
			<b>条件类型</b>
			<div class="type_box">
				<span>价格条件</span>
				<span class="current">时间条件</span>
			</div>
		</div>
		<div class="row">
			<b>触发条件</b>
			<input type="text" class="ipt_150" />
			<b class="ml">价格附加</b>
			<div class="slt fl" @tap="openSelectPrice">
				<input type="text" class="ipt_sm" :value="conditionType" readonly="readonly" />
				<i class="icon icon_select"></i>
			</div>
			<input type="text" class="ipt_sm ml10" />
		</div>
		<div class="row">
			<b>委托价格</b>
			<div class="type_box">
				<span>市价</span>
				<span class="current">对手价</span>
			</div>
		</div>
		<div class="row">
			<b>委托数量</b>
			<div class="num_box">
				<span class="add" @tap="addNum">+</span>
				<input type="text" class="ipt_md" v-model="orderNum" />
				<span class="reduce" @tap="reduceNum">-</span>
			</div>
		</div>
		<div class="row">
			<b>委托数量</b>
			<p>永久有效</p>
		</div>
		<div class="btn_box">
			<btn name="买入/市价" className="redmd"></btn>
			<btn name="卖出/市价" className="greenmd"></btn>
		</div>
		<selectBox ref="selectBox" :obj="obj" :type="type"></selectBox>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import selectBox from "../../components/selectBox.vue"
	export default {
		name: 'condetionOrder',
		components: {btn, selectBox},
		data(){
			return{
				currentOrder: '',
				obj: [],
				type: '',
				orderNum: 1,
				conditionType: '>',
			}
		},
		computed: {
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			commodityAll(){
				return this.$store.state.account.commodityAll;
			},
		},
		watch: {
			orderNum: function(n, o){
				if(n && n <= 0){
					this.orderNum = 0;
				}
			}
		},
		methods: {
			addNum: function(){
				return this.orderNum++;
			},
			reduceNum: function(){
				return this.orderNum--;
			},
			openSelectOrder: function(){
				this.obj = this.commodityAll;
				this.type = 'order';
				$(".select_cont").css({bottom: 0});
				this.$refs.selectBox.shadeShow = true;
			},
			openSelectPrice: function(){
				this.obj = ['>', '>=', '<', '<='];
				this.type = 'condition';
				$(".select_cont").css({bottom: -1.78 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			}
		},
		mounted: function(){
			//初始当前合约
			this.currentOrder = this.commodityAll[0].commodityName + " " + this.commodityAll[0].commodityNo + this.orderTemplist[this.commodityAll[0].commodityNo].MainContract;
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.fm{
		width: 7.5rem;
		height: 8.55rem;
		border-bottom: 0.01rem solid $black;
		padding: 0.3rem 0.3rem 0 0.3rem;
		.row{
			height: 0.88rem;
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
				position: relative;
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
				height: 0.6rem;
				line-height: 0.6rem;
				padding: 0.14rem 0;
				box-sizing: content-box;
				color: $white;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				background: #1b1f26;
				text-align: center;
				font-size: $fs24;
				&.ipt_lg{
					width: 5.58rem;
				}
				&.ipt_sm{
					width: 1.2rem;
				}
				&.ipt_md{
					width: 3.96rem;
				}
				&.ipt_150{
					width: 1.5rem;
				}
			}
			.ml{
				margin-left: 0.2rem;
			}
			.ml10{
				margin-left: 0.1rem;
			}
			.type_box{
				float: left;
				width: 5.58rem;
				height: 0.88rem;
				line-height: 0.88rem;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				background: #1b1f26;
				span{
					float: left;
					display: inline-block;
					width: 2.77rem;
					height: 0.86rem;
					line-height: 0.86rem;
					text-align: center;
					box-sizing: border-box;
					&:last-child.current{
						background: $lightBlue;
						border-top-right-radius: 0.1rem;
						border-bottom-right-radius: 0.1rem;
					}
					&:first-child.current{
						background: $lightBlue;
						border-top-left-radius: 0.1rem;
						border-bottom-left-radius: 0.1rem;
					}
				}
			}
			.num_box{
				float: left;
				width: 5.58rem;
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
					box-sizing: border-box;
					border: none;
					height: 0.6rem;
					line-height: 0.6rem;
					margin: 0.14rem 0;
				}
			}
			p{
				float: left;
				width: 5.58rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				font-size: $fs28;
				color: $white;
			}
		}
		.btn_box{
			display: flex;
			justify-content: space-between;
		}
	}
</style>