<template>
	<div id="stopMoneyAlert" v-if="show">
		<div class="bg"></div>
		<div class="main">
			<div class="title">
				<ul>
					<template v-for="(v, index) in tabList">
						<li :class="{current: currentNum == index}" @click="tabEvent(index)"><span>{{v}}</span></li>
					</template>
				</ul>
			</div>
			<div class="row">
				<span>合约</span>
				<em class="name">富时A50</em>
				<span>多空</span>
				<span class="percent pl">最新：<em>69.65</em></span>
			</div>
			<div class="row" v-show="tabShow">
				<span>方式</span>
				<div class="order fl" @tap="openSelectType">
					<b>{{priceType}}</b>
					<i class="icon icon_triangle"></i>
				</div>
				<input type="text" class="spe" />
				<span class="percent">0.00%</span>
			</div>
			<div class="row" v-show="!tabShow">
				<span>止盈价</span>
				<input type="text" />
				<span class="percent">0.00%</span>
			</div>
			<div class="row">
				<span>手数</span>
				<input type="text" />
				<span class="percent price">止损委托价：<em>市价</em></span>
			</div>
			<div class="btn_box">
				<span @tap="confirmEvent">确认</span>
				<span @tap="cancelEvent">取消</span>
			</div>
		</div>
		<selectBox ref="selectBox" :obj="obj" :type="type"></selectBox>
	</div>
</template>

<script>
	import selectBox from "../../components/selectBox.vue"
	export default{
		name: "stopMoneyAlert",
		components: {selectBox},
		data(){
			return{
				show: false,
				tabList: ['止损','止盈'],
				currentNum: 0,
				tabShow: true,
				obj: ['止损价','动态价'],
				type: 'price',
				priceType: '止损价',
			}
		},
		methods: {
			tabEvent: function(index){
				this.currentNum = index;
				if(index == 0){
					this.tabShow = true;
				}else{
					this.tabShow = false;
				}
			},
			openSelectType: function(){
				$(".select_cont").css({bottom: -3.55 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
			confirmEvent: function(){
				
			},
			cancelEvent: function(){
				this.show = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.main{
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 100;
		margin: -2.27rem 0 0 -3rem;
		width: 6rem;
		height: 4.54rem;
		overflow: hidden;
		border-radius: 0.1rem;
		background: $bg;
		.title{
			display: flex;
			justify-content: center;
			width: 6rem;
			height: 0.88rem;
			line-height: 0.88rem;
			font-size: $fs28;
			border-bottom: 0.01rem solid $black;
			li{
				float: left;
				width: 3rem;
				text-align: center;
				span{
					display: inline-block;
					line-height: 0.8rem;
				}
				&.current{
					span{
						border-bottom: 0.04rem solid $blue;
						color: $blue;
					}
				}
			}
		}
		.row{
			width: 6rem;
			height: 0.88rem;
			overflow: hidden;
			border-bottom: 0.01rem solid $black;
			span{
				float: left;
				display: inline-block;
				width: 1rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-right: 0.01rem solid $black;
				&.percent{
					width: auto;
					border: 0;
				}
				&.pl{
					padding-left: 0.1rem;
				}
				&.price{
					padding-left: 0.25rem;
					border-left: 0.01rem solid $black;
				}
				em{
					color: $white;
				}
			}
			.name{
				float: left;
				display: inline-block;
				width: 2rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-right: 0.01rem solid $black;
			}
			input{
				float: left;
				display: inline-block;
				width: 1.8rem;
				height: 0.64rem;
				line-height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.12rem 0.1rem;
				color: $white;
				text-align: center;
				&.spe{
					margin: 0.12rem 0.1rem 0.12rem 0;
				}
			}
			.order{
				width: 1.8rem;
				height: 0.64rem;
				line-height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.12rem 0.1rem;
				color: $white;
				text-align: center;
				position: relative;
				b{
					font-weight: normal;
				}
				.icon_triangle{
					width: 0.1rem;
					height: 0.1rem;
					background: url(../../assets/images/account/subscript_01.png) no-repeat center center;
					background-size: 100% 100%;
					position: absolute;
					bottom: 0.1rem;
					right: 0.1rem;
				}
			}
		}
		.btn_box{
			display: flex;
			justify-content: center;
			width: 6rem;
			height: 0.92rem;
			line-height: 0.92rem;
			border-top: 0.15rem solid #1b1f26;
			span{
				width: 50%;
				text-align: center;
			}
		}
	}
</style>