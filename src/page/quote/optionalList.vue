<template>
	<div id="index">
		<nav>
			<div class="nav_box">
				<template v-for="(v,index) in tabList">
					<span :class="{current: currentNum == index}" @touchstart="tabEvent(index)">{{v}}</span>
				</template>
			</div>
		</nav>
		<div class="list">
			<ul>
				<li>
					<div class="name"><span>名称</span></div>
					<span>价格</span>
					<span>成交量</span>
					<span @touchstart="switchEvent">{{changeRateName}}<i class="icon icon_switch"></i></span>
				</li>
				<template v-for="(v, index) in parameters">
					<li v-if="">
						<div class="name">
							<em>{{v.CommodityName}}</em>
							<em>{{v.CommodityNo + v.MainContract}}</em>
						</div>
						<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}<i class="icon icon_arrow" :class="{up: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, down: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}"></i></span>
						<span>{{v.LastQuotation.TotalVolume}}</span>
						<span v-show="changeRateShow" class="changeRate" :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
						<span v-show="!changeRateShow" class="changeRate" :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
					</li>
				</template>
			</ul>
		</div>
		<div class="add_optional">
			<div class="box">
				<i class="icon icon_add"></i>
				<span @touchstart="addOptional">添加自选</span>
			</div>
		</div>
		<div class="btn_box">
			<i class="icon icon_rotate" @touchstart="rotateEvent"></i>
			<i class="icon icon_box" @touchstart="switchBox"></i>
			<i class="icon icon_optional" @touchstart="optionalEvent"></i>
		</div>
	</div>
</template>

<script>
	import optionalBox from "./optionalBox.vue"
	export default {
		name: 'index',
		components: {optionalBox,  },
		data(){
			return{
				tabList: ['全部','商品','股指期货','外汇','LME金属','债券期货 ','ETF'],
				currentNum: 0,
//				currentType: 0,
				changeRateShow: true,
				changeRateName: '涨跌幅',
			}
		},
		computed: {
			parameters(){
				return this.$store.state.market.Parameters;
			},
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			}
		},
		methods: {
			tabEvent: function(index){
				this.currentNum = index;
			},
			switchEvent: function(){   //涨跌幅与涨跌额切换
				if(this.changeRateShow == true){
					this.changeRateShow = false;
					this.changeRateName = '涨跌额';
				}else{
					this.changeRateShow = true;
					this.changeRateName = '涨跌幅';
				}
			},
			addOptional: function(){
				this.$router.push({path: '/search'});
			},
			rotateEvent: function(){
				
			},
			switchBox: function(){
				this.$parent.currentView = 'optionalBox';
			},
			optionalEvent: function(){
				this.$router.push({path: '/optionalManage'});
			}
		},
		mounted: function(){
			console.log(this.parameters);
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
		overflow-x: scroll;
		.nav_box{
			width: 8.2rem;
		}
		span{
			display: inline-block;
			height: 0.75rem;
			line-height: 0.75rem;
			border-bottom: 0.04rem solid $bg;
			font-size: $fs28;
			margin-left: 0.3rem;
			&:first-child{
				margin: 0;
			}
			&.current{
				color: $blue;
				border-color: $blue;
			}
		}
	}
	.list{
		width: 7.5rem;
		margin-top: 1.82rem;
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
				&:nth-child(4), &:nth-child(5){
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
	.btn_box{
		width: 0.9rem;
		height: 2.9rem;
		position: fixed;
		bottom: 1.3rem;
		right: 0;
		.icon{
			width: 0.64rem;
			height: 0.64rem;
			margin-bottom: 0.2rem;
			&.icon_rotate{
				background: url(../../assets/images/rotate.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_box{
				background: url(../../assets/images/box.png) no-repeat center center;
				background-size: 100% 100%;
			}
			&.icon_optional{
				background: url(../../assets/images/optional.png) no-repeat center center;
				background-size: 100% 100%;
			}
		}
	}
	
</style>