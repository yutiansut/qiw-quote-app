<template>
	<div id="tradeLoginCont">
		<div class="main">
			<div class="fm">
				<div class="row">
					<span>交易账号</span>
					<input type="text" placeholder="请输入交易账号" v-model="user" />
					<button>切换账号</button>
				</div>
				<div class="row">
					<span>交易密码</span>
					<input type="password" placeholder="请输入交易密码" v-model="pwd" />
				</div>
				<btn name="交易登录" className="bluelg" class="mb30" @tap.native="tradeLogin"></btn>
				<btn name="配资方案申请" className="orangelg" class="mb30" @tap.native="tradeApply"></btn>
			</div>
			<h3>交易账号不等于注册登录账号</h3>
			<p><span>交易账号：</span>申请配资方案后系统会自动发放，用于实盘或者模拟盘交易的账号。可查询交易明细，结算后将会更换。</p>
			<p><span>登录账号：</span>使用手机注册后的平台账号，用户登录APP和网站，进行充值、查看资金明细等。</p>
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import { Toast } from 'mint-ui';
	export default {
		name: 'tradeLoginCont',
		components: {btn},
		data(){
			return{
				user: '',
				pwd: '',
			}
		},
		computed: {
			query(){
				return this.$parent.query;
			}
		},
		watch: {
			query: function(n, o){
				if(n){
					this.user = n.tradeAccount;
					this.pwd = n.password;
				}
			}
		},
		methods: {
			switchover:function(index){
				this.selectNum = index;
			},
			tradeLogin: function(){
				Toast({message: '交易功能正在内测中，敬请期待…', position: 'bottom', duration: 1500});
			},
			tradeApply: function(){
				this.$parent.currentNum = 1;
				this.$parent.currentView = 'tradeApply'; 
			}
		},
		mounted: function(){
			this.user = this.$parent.user;
			this.pwd = this.$parent.pwd;
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
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