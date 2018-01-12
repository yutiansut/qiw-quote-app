<template>
	<div id="market">
		<nav>
			<div class="nav_box">
				<template v-for="(v, index) in typeList">
					<span :class="{current: currentNum == index}" @touchstart="clickEvent(index)">{{v.name}}</span>
				</template>
			</div>
		</nav>
		<div class="recommend">
			<template v-for="(v, index) in recommendList">
				<div class="col">
					<span class="name">{{v.describe}}</span>
					<span class="red">52.49<i class="icon icon_arrow up"></i></span>
					<span class="red">+0.05%&nbsp;&nbsp;+0.69</span>
				</div>
			</template>
		</div>
		<div class="list">
			<ul>
				<li>
					<div class="name"><span>名称</span></div>
					<span>价格</span>
					<span>成交量</span>
					<span>涨跌幅<i class="icon icon_switch"></i></span>
				</li>
				<template v-for="(v, index) in contList.list">
					<li>
						<div class="name">
							<em>{{v.describe}}</em>
							<em>{{v.commodityNo + v.contractNo}}</em>
						</div>
						<span class="red">50.15</span>
						<span>1500</span>
						<span class="red">+0.03%</span>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	import pro from '../../assets/js/common.js'
	export default {
		name: 'market',
		components: {},
		data(){
			return{
				currentNum: 0,
				typeList: [],
				contList: [],
				recommendList: [],
				goodsList: [],   //商品
				goodsRecommendList: [],
				stockList: [],   //股指期货
				stockRecommendList: [],
				foreignList: [],   //外汇
				foreignRecommendList: [],
				metalList: [],  //金属
				metalRecommendList: [],
				bondList: [],   //债券期货
				bondRecommendList: [],
				etfList: [],   //ETF
				etfRecommendList: [],
			}
		},
		methods: {
			...mapActions([
				'initQuoteClient'
			]),
			clickEvent: function(index){
				this.currentNum = index;
				switch(index){
					case 0:
						this.contList = this.goodsList;
						this.recommendList = this.goodsRecommendList
						break;
					case 1:
						this.contList = this.stockList;
						this.recommendList = this.stockRecommendList
						break;
					case 2:
						this.contList = this.foreignList;
						this.recommendList = this.foreignRecommendList
						break;
					case 3:
						this.contList = this.metalList;
						this.recommendList = this.metalRecommendList
						break;
					case 4:
						this.contList = this.bondList;
						this.recommendList = this.bondRecommendList
						break;
					case 5:
						this.contList = this.etfList;
						this.recommendList = this.etfRecommendList
						break;
					default:
						break;
				}
			},
			getCommodityInfo: function(){
				pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.typeList = res.data;
						this.goodsList = this.typeList[0];
						this.goodsList.list.forEach((o, i) => {
							if(o.isRecommend == 1) this.goodsRecommendList.push(o);
						});
						this.contList = this.goodsList;
						this.recommendList = this.goodsRecommendList;
						this.stockList = this.typeList[1];
						this.stockList.list.forEach((o, i) => {
							if(o.isRecommend == 1) this.stockRecommendList.push(o);
						});
						this.foreignList = this.typeList[2];
						this.foreignList.list.forEach((o, i) => {
							if(o.isRecommend == 1) this.foreignRecommendList.push(o);
						});
						this.metalList = this.typeList[3];
						this.metalList.list.forEach((o, i) => {
							if(o.isRecommend == 1) this.metalRecommendList.push(o);
						});
						this.bondList = this.typeList[4];
						this.bondList.list.forEach((o, i) => {
							if(o.isRecommend == 1) this.bondRecommendList.push(o);
						});
						this.etfList = this.typeList[5];
						this.etfList.list.forEach((o, i) => {
							if(o.isRecommend == 1) this.etfListRecommendList.push(o);
						});
						//初始化行情
//						this.initQuoteClient();
					}
				}).catch((err) => {
					
				});
			}
		},
		mounted: function(){
			//获取合约类型
			this.getCommodityInfo();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	nav{
		position: fixed;
		top: 1.01rem;
		left: 0;
		width: $w;
		height: 0.8rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		.nav_box{
			width: 7.51rem;
		}
		span{
			display: inline-block;
			height: 0.8rem;
			line-height: 0.8rem;
			font-size: $fs28;
			margin-left: 0.3rem;
			&:first-child{
				margin: 0;
			}
			&.current{
				color: $blue;
				border-bottom: 0.05rem solid $blue;
			}
		}
	}
	.recommend{
		position: fixed;
		top: 1.82rem;
		left: 0;
		width: 7.5rem;
		height: 1.6rem;
		border-bottom: 0.01rem solid $black;
		.col{
			float: left;
			width: 2.5rem;
			height: 1.6rem;
			border-right: 0.01rem solid $black;
			span{
				display: inline-block;
				width: 2.5rem;
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
	.list{
		width: 7.5rem;
		margin-top: 3.42rem;
		li{
			height: 0.96rem;
			line-height: 0.96rem;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			&:first-child{
				height: 0.64rem;
				line-height: 0.64rem;
				span{
					color: $fontBlue !important;
				}
			}
			span{
				float: left;
				display: inline-block;
				font-size: $fs28;
				text-align: right;
				&:nth-child(1){
					width: 3rem;
					text-align: left;
				}
				&:nth-child(2){
					width: 1.25rem;
				}
				&:nth-child(3){
					width: 1.25rem;
					color: $white;
				}
				&:nth-child(4){
					width: 1.4rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
				.icon_switch{
					width: 0.2rem;
					height: 0.24rem;
					background: url(../../assets/images/switch.png) no-repeat center center;
					background-size: 0.18rem 0.24rem;
					margin-left: 0.05rem;
					margin-top: 0.1rem;
				}
			}
			.name{
				float: left;
				width: 3rem;
				em{
					display: block;
					line-height: 0.36rem;
					&:first-child{
						margin-top: 0.1rem;
						font-size: $fs32;
						color: $white;
					}
				}
			}
		}
	}
</style>