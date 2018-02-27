<template>
	<div id="trade">
		<TabBar></TabBar>
		<hasLogin ref="hasLogin" :name="tradeUser"></hasLogin>
		<header>
			<h1>ID:{{tradeUser}}</h1>
			<i class="icon icon_menu" @tap="menuEvent"></i>
		</header>
		<div class="nav">
			<ul>
				<template v-for="(v, index) in tabList">
					<li :class="{current: currentNum == index}" @touchstart="tabEvent(index)"><span>{{v}}</span></li>
				</template>
			</ul>
		</div>
		<div class="main">
			<div class="cont">
				<moneyTotal v-if="totalShow"></moneyTotal>
				<components :is="currentView"></components>
			</div>
		</div>
	</div>
</template>

<script>
	import TabBar from "../components/TabBar.vue"
	import moneyTotal from "../components/moneyTotal.vue"
	import tradeCenter from "./trade/tradeCenter.vue"
	import holdOrder from "./trade/holdOrder.vue"
	import moneyDetails from "./trade/moneyDetails.vue"
	import hasLogin from "./trade/hasLogin.vue"
	export default{
		name: "trade",
		components: {TabBar, moneyTotal, tradeCenter, holdOrder, moneyDetails, hasLogin},
		data(){
			return{
				tabList: ['交易','持仓','资金明细'],
				currentNum: 0,
				currentView: 'tradeCenter',
				totalShow: false,
			}
		},
		computed: {
			tradeUser(){
				return localStorage.tradeUser ? JSON.parse(localStorage.tradeUser).username : '';
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
		},
		methods: {
			tabEvent: function(index){
				this.currentNum = index;
				if(index == 0){
					this.currentView = 'tradeCenter';
				}else if(index == 1){
					this.currentView = 'holdOrder';
				}else{
					this.currentView = 'moneyDetails';
				}
			},
			menuEvent: function(){
				this.$refs.hasLogin.show = true;
			}
		},
		mounted: function(){
//			console.log(this.parameters);
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	header{
		width: 7.5rem;
		height: 1rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		position: relative;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		h1{
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			color: $white;
			font-size: 0.36rem;
		}
		.icon_menu{
			width: 1rem;
			height: 1rem;
			background: url(../assets/images/menu.png) no-repeat 0.3rem 0.3rem;
			background-size: 0.4rem 0.4rem;
			position: fixed;
			top: 0;
			right: 0;
		}
	}
	.nav{
		width: 7.5rem;
		height: 0.8rem;
		border-bottom: 0.01rem solid $black;
		background: $bg;
		position: fixed;
		top: 1.01rem;
		left: 0;
		z-index: 1;
		li{
			float: left;
			width: 2.5rem;
			text-align: center;
			span{
				display: inline-block;
				height: 0.8rem;
				line-height: 0.8rem;
				font-size: $fs28;	
			}
			&.current{
				span{
					color: $blue;
					border-bottom: 0.05rem solid $blue;
				}
			}
		}
	}
	.main{
		margin-top: 1.81rem;
		padding-bottom: 1rem;
		margin-bottom: 2rem;
		overflow-y: auto;
	}
</style>