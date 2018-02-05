<template>
	<div id="conditionTime" v-if="show">
		<div class="bg"></div>
		<div class="main">
			<h1>时间条件</h1>
			<div class="row">
				<span>合约</span>
				<em class="name">富时A50</em>
				<span class="percent pl">最新：<em>69.65</em></span>
			</div>
			<div class="row">
				<span>时间</span>
				<input type="text" />
			</div>
			<div class="row">
				<span>价格</span>
				<select>
					<option value="">附加</option>
					<option value="">></option>
				</select>
				<input type="text" class="ipt" />
			</div>
			<div class="row">
				<span>操作</span>
				<select>
					<option value="">买</option>
					<option value="">卖</option>
				</select>
				<select>
					<option value="">市价</option>
					<option value="">对手价</option>
				</select>
				<span>手数</span>
				<input type="text" class="ipt" />
			</div>
			<div class="row">
				<span>有效</span>
				<p>当日有效</p>
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
		name: "conditionTime",
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
		margin: -3.15rem 0 0 -3rem;
		width: 6rem;
		height: 6.3rem;
		overflow: hidden;
		border-radius: 0.1rem;
		background: $bg;
		h1{
			width: 6rem;
			height: 0.88rem;
			line-height: 0.88rem;
			text-align: center;
			font-size: $fs28;
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
				&.ipt{
					width: 1rem;
				}
			}
			select{
				float: left;
				width: 1rem;
				height: 0.65rem;
				line-height: 0.65rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.12rem 0.1rem;
				color: $white;
				padding-left: 0.2rem;
			}
			p{
				float: left;
				width: 5rem;
				height: 0.88rem;
				line-height: 0.88rem;
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