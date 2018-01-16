<template>
	<div id="index">
		<TabBar :selected="selected" :tabs="tabs"></TabBar>
		<header>
			<div class="tab">
				<template v-for="(v, index) in tabList">
					<span :class="{current: currentNum == index}" @touchstart="tavEvent(index)">{{v}}</span>
				</template>
			</div>
			<i class="icon icon_search" @touchstart="toSearch"></i>
			<i class="icon icon_set" v-show="setShow" @touchstart="toOptionalManage"></i>
		</header>
		<div class="cont" v-if="isInit">
			<components :is="currentView"></components>
		</div>
	</div>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	import TabBar from "../components/TabBar.vue"
	import optionalList from "./quote/optionalList.vue"
	import optionalBox from "./quote/optionalBox.vue"
	import market from "./quote/market.vue"
	import pro from '../assets/js/common.js'
	import { Toast } from 'mint-ui'
	export default {
		name: 'index',
		components: {TabBar, optionalList, optionalBox, market},
		data(){
			return{
				currentNum: 1,
				tabList: ['自选', '市场'],
				currentView: 'market',
				setShow: false,
				isInit: false,
				selected:"行情",
				tabs:[require("../assets/images/quotation_01.png"),require("../assets/images/mockTrading_02.png"),
				require("../assets/images/information_02.png"),require("../assets/images/mine_02.png")],
			}
		},
		computed: {
			quoteInitStatus(){
				return this.$store.state.market.quoteInitStatus;
			},
			quoteInitStep(){
				return this.$store.state.market.quoteInitStep;
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			}
		},
		methods: {
			...mapActions([
				'initQuoteClient'
			]),
			tavEvent: function(index){
				this.currentNum = index;
				if(index == 0){
					this.currentView = 'optionalList';
					this.setShow = true;
				}else{
					this.currentView = 'market';
					this.setShow = false;
				}
			},
			toSearch: function(){
				this.$router.push({path: '/search'});
			},
			toOptionalManage: function(){
				this.$router.push({path: '/optionalManage'});
			},
			getCommodityInfoNoType: function(){
				pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.$store.state.market.commodityOrder = res.data[0].list;
						//初始化行情
						if(this.$store.state.market.commodityOrder){
							this.initQuoteClient();
							this.isInit = true;
						}
					}
				}).catch((err) => {
					Toast({message: err.message, position: 'bottom', duration: 2000});
				});
			}
		},
		mounted: function(){
			//获取所有合约
			this.getCommodityInfoNoType();
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	header{
		position: fixed;
		top: 0;
		left: 0;
		width: $w;
		height: 1rem;
		overflow: hidden;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		margin: auto;
		.tab{
			width: 2rem;
			height: 0.6rem;
			margin: 0.2rem auto;
			span{
				display: inline-block;
				float: left;
				width: 1rem;
				height: 0.6rem;
				line-height: 0.6rem;
				text-align: center;
				background: $lightBlue;
				font-size: $fs28;
				&.current{
					background: $black;
					color: $white;
				}
			}
		}
		.icon_search{
			width: 0.6rem;
			height: 1rem;
			background: url(../assets/images/search.png) no-repeat right 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.3rem;
		}
		.icon_set{
			width: 0.6rem;
			height: 1rem;
			background: url(../assets/images/set.png) no-repeat left 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: absolute;
			top: 0;
			right: 0.9rem;
		}
	}
	
</style>