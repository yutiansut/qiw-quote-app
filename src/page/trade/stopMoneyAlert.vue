<template>
	<div id="stopMoneyAlert" v-if="show">
		<div class="bg"></div>
		<div class="main">
			<h1>改单</h1>
			<div class="row">
				<span>委托价格</span>
				<input type="text" />
			</div>
			<div class="row">
				<span>委托数量</span>
				<input type="text" />
			</div>
			<div class="btn_box">
				<span @tap="confirmEvent">确认</span>
				<span @tap="cancelEvent">取消</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: "stopMoneyAlert",
		components: {},
		data(){
			return{
				show: false,
			}
		},
		methods: {
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
		margin: -1.82rem 0 0 -3rem;
		width: 6rem;
		height: 3.64rem;
		overflow: hidden;
		border-radius: 0.1rem;
		background: $bg;
		h1{
			width: 6rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			font-size: $fs30;
			border-bottom: 0.01rem solid $black;
		}
		.row{
			width: 6rem;
			height: 0.88rem;
			overflow: hidden;
			border-bottom: 0.01rem solid $black;
			span{
				float: left;
				display: inline-block;
				width: 1.6rem;
				text-align: center;
				line-height: 0.88rem;
				border-right: 0.01rem solid $black;
			}
			input{
				display: inline-block;
				width: 4.2rem;
				height: 0.64rem;
				line-height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.12rem 0.1rem;
				color: $white;
				text-align: center;
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