<template>
	<div id="tradeLogin">
		<header>
			<i class="icon icon_back"></i>
			<div class="tab">
				<template v-for="(v, index) in tabList" >
					<span :class="{current: selectNum == index}" @click="switchover(index)">{{v}}</span>
				</template>
			</div>
		</header>
		<div class="main" v-show="show">
			<div class="fm">
				<div class="row">
					<span>交易账号</span>
					<input type="text" placeholder="请输入交易账号" />
					<button>切换账号</button>
				</div>
				<div class="row">
					<span>交易密码</span>
					<input type="text" placeholder="请输入交易密码" />
				</div>
				<btn name="交易登录" className="bluelg" class="mb30"></btn>
				<btn name="配资方案申请" className="orangelg" class="mb30"></btn>
			</div>
			<h3>交易账号不等于注册登录账号</h3>
			<p><span>交易账号：</span>申请配资方案后系统会自动发放，用于实盘或者模拟盘交易的账号。可查询交易明细，结算后将会更换。</p>
			<p><span>登录账号：</span>申请配资方案后系统会自动发放，用于实盘或者模拟盘交易的账号。可查询交易明细，结算后将会更换。</p>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default {
		name: 'index',
		components: {
			btn
		},
		data(){
			return{
				selectNum: 0,
				tabList: ['配资交易登录', '配资交易申请'],
				show:false
			}
		},
		methods:{
			switchover:function(index){
				this.selectNum=index;
				switch(index){
					case 0:
						this.$router.push({path:"/tradeLogin/"})
						break;
					case 1:
						this.$router.push({path:"/tradeLogin/tradeApply"});
						break;
				}
			}
		}
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
	.main{
		margin-top: 1.01rem;
		.fm{
			padding: 0.3rem 0.3rem 0 0.3rem;
			.row{
				width: 6.9rem;
				height: 0.88rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin-bottom: 0.3rem;
				span{
					float: left;
					line-height: 0.88rem;
					font-size: $fs28;
					margin: 0 0.2rem 0 0.3rem;
				}
				input{
					float: left;
					width: 3.4rem;
					height: 0.84rem;
					line-height: 0.84rem;
					color: $white;
				}
				button{
					float: right;
					width: 1.74rem;
					height: 0.86rem;
					line-height: 0.86rem;
					background: $titleBlue;
					color: $white;
					margin: 0 0.01rem 0 0;
					padding: 0;
					border-bottom-right-radius: 0.1rem;
					border-top-right-radius: 0.1rem;
				}
			}
			.mb30{
				margin-bottom: 0.3rem;
			}
		}
		h3{
			width: 7.5rem;
			height: 0.64rem;
			line-height: 0.64rem;
			padding: 0 0.3rem;
			background: $titleBlue;
			border-top: 0.01rem solid $black;
			border-bottom: 0.01rem solid $black;
			margin-bottom: 0.2rem;
		}
		p{
			padding: 0 0.3rem;
			line-height: 0.4rem;
			color: $white;
			span{
				color: $fontBlue;
			}
		}
	}
	
	
</style>