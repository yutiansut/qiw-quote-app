<template>
	<div id="tradeLogin">
		<header>
			<back></back>
			<div class="tab">
				<template v-for="(v, index) in tabList" >
					<span :class="{current: currentNum == index}" @click="switchover(index)">{{v}}</span>
				</template>
			</div>
		</header>
		<div class="cont">
			<components :is="currentView"></components>
		</div>
	</div>
</template>

<script>
	import back from "../../components/back.vue"
	import tradeLoginCont from "./tradeLoginCont.vue"
	import tradeApply from "./tradeApply.vue"
	export default {
		name: 'index',
		components: {back, tradeLoginCont, tradeApply},
		data(){
			return{
				currentNum: 1,
				tabList: ['融资交易登录', '融资交易申请'],
				currentView: 'tradeApply',
			}
		},
		methods: {
			switchover:function(index){
				this.currentNum = index;
				if(index == 0){
					this.currentView = 'tradeLoginCont';
				}else{
					this.currentView = 'tradeApply';
				}
			}
		},
		mounted: function(){}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	header{
		z-index:1000;
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
			width: 4rem;
			height: 0.56rem;
			margin: 0.22rem auto;
			span{
				display: inline-block;
				float: left;
				width: 2rem;
				height: 0.56rem;
				line-height: 0.56rem;
				text-align: center;
				background: $lightBlue;
				font-size: $fs28;
				&.current{
					background: $black;
					color: $white;
				}
			}
		}
		.icon_back{
			width: 0.24rem;
			height: 1rem;
			background: url(../../assets/images/back_icon.png) no-repeat center 0.34rem;
			background-size: 0.24rem 0.32rem;
			position: fixed;
			top: 0;
			left: 0.3rem;
		}
	}
</style>