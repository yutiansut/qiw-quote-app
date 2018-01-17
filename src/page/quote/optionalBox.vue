<template>
	<div id="index">
		<div class="main">
			<template v-for="(v,index) in typeList">
				<div>
					<div class="title">
						<span>{{v | operateData}}</span>
						<!--<i class="icon icon_show"></i>-->
						<i class="icon icon_hide"></i>
					</div>
					<div class="recommend">
						<template v-for="(o, k) in parameters">
							<div class="col" v-if="v == o.commodityType" :type="v" :types="o.commodityType">
								<span class="name">{{o.CommodityName}}</span>
								<span :class="{red: o.LastQuotation.LastPrice > o.LastQuotation.PreSettlePrice, green: o.LastQuotation.LastPrice < o.LastQuotation.PreSettlePrice}">{{o.LastQuotation.LastPrice | fixNum(o.DotSize)}}<i class="icon icon_arrow" :class="{up: o.LastQuotation.LastPrice > o.LastQuotation.PreSettlePrice, down: o.LastQuotation.LastPrice < o.LastQuotation.PreSettlePrice}"></i></span>
								<span :class="{green: o.LastQuotation.ChangeRate < 0, red: o.LastQuotation.ChangeRate > 0}"><em v-show="o.LastQuotation.ChangeRate > 0">+</em>{{o.LastQuotation.ChangeRate | fixNumTwo}}%&nbsp;&nbsp;<em v-show="o.LastQuotation.ChangeRate > 0">+</em>{{o.LastQuotation.ChangeValue | fixNum(o.DotSize)}}</span>
							</div>
						</template>
					</div>
				</div>
			</template>
			<div class="add_optional">
				<div class="box">
					<i class="icon icon_add"></i>
					<span @touchstart="addOptional">添加自选</span>
				</div>
			</div>
			<div class="icon icon_list" @touchstart="switchList"></div>
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	export default {
		name: 'index',
		components: {},
		data(){
			return{
				_typeList: [],
				typeList: [],
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
		},
		filters: {
			operateData: function(e) {
				switch(e) {
					case '1':
						return '商品';
						break;
					case '2':
						return '投指期货';
						break;
					case '3':
						return '外汇';
						break;
					case '4':
						return 'LME金属';
						break;
					case '5':
						return '债券期货';
						break;
					case '6':
						return 'ETF';
						break;
				}
			},
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			}
		},
		methods: {
			addOptional: function(){
				this.$router.push({path: '/search'});
			},
			switchList: function(){
				this.$parent.currentView = 'optionalList';
			},
			getOrderInfo: function(){
				this.$store.state.market.Parameters = [];
				this.$store.state.market.commodityOrder = [];
				let arr = [];
				if(this.$parent.userOptionalList && this.$parent.userOptionalList.length > 0){
					this.$store.state.market.commodityOrder = this.$parent.userOptionalList;
					this.$parent.userOptionalList.forEach((o,i) => {
						this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
						arr.push(o.commodityType);
					});
					arr.forEach((o, i) => {
						if(this.typeList.indexOf(o) == -1){
							this.typeList.push(o);
						}
					});
				}
				
			},
		},
		mounted: function(){
			//获取所有自合约数据
			this.getOrderInfo();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.main{
		margin-top: 1.01rem;
	}
	.title{
		width: 7.5rem;
		height: 0.64rem;
		overflow: hidden;
		background: $titleBlue;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		span{
			line-height: 0.64rem;
		}
		.icon{
			float: right;
			width: 0.2rem;
			height: 0.64rem;
			&.icon_show{
				background: url(../../assets/images/show.png) no-repeat center 0.26rem;
				background-size: 0.2rem 0.12rem;
			}
			&.icon_hide{
				background: url(../../assets/images/hide.png) no-repeat center 0.26rem;
				background-size: 0.2rem 0.12rem;
			}
		}
	}
	.recommend{
		width: 7.5rem;
		.col{
			float: left;
			width: 2.5rem;
			height: 1.6rem;
			border-right: 0.01rem solid $black;
			border-bottom: 0.01rem solid $black;
			span{
				display: block;
				text-align: center;
				font-size: $fs32;
				&.name{
					color: $white;
					margin-top: 0.25rem;
				}
				&:last-child{
					font-size: 0.2rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
					padding-top: 0;
				}
				&:nth-child(2){
					height: 0.6rem;
					line-height: 0.6rem;
					.icon_arrow{
						width: 0.13rem;
						height: 0.27rem;
						margin: 0.1rem 0 0 0.1rem;
						&.up{
							background: url(../../assets/images/arrow_up.png) no-repeat center center;
							background-size: 0.13rem 0.27rem;
						}
						&.down{
							background: url(../../assets/images/arrow_down.png) no-repeat center center;
							background-size: 0.13rem 0.27rem;
						}
					}
				}
			}
		}
	}
	.add_optional{
		width: 7.5rem;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.01rem solid $black;
		display: flex;
		justify-content: center;
		.icon_add{
			float: left;
			width: 0.4rem;
			height: 0.4rem;
			background: url(../../assets/images/add.png) no-repeat center center;
			background-size: 100% 100%;
			margin: 0.3rem 0.15rem 0 0;
		}
		span{
			color: $white;
		}
	}
	.icon_list{
		width: 0.64rem;
		height: 0.64rem;
		background: url(../../assets/images/list.png) no-repeat center center;
		background-size: 100% 100%;
		position: fixed;
		bottom: 1.5rem;
		right: 0.3rem;
	}
	
</style>