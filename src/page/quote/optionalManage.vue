<template>
	<div id="optionalManage">
		<mt-header title="自选管理" fixed class="header">
		  	<router-link to="/" slot="left">
		    	<i class="icon icon_back"></i>
		  	</router-link>
	    	<router-link to="" slot="right">
		    	<mt-button class="done">完成</mt-button>
		 	</router-link>
		</mt-header>
		<div class="main">
			<div class="search_box">
				<div class="search">
					<i class="icon icon_search"></i>
					<input type="text" placeholder="搜索并添加合约" @touchstart="toSearch" />
				</div>
			</div>
			<div class="list">
				<ul class="title">
					<li>
						<i class="icon icon_check"></i>
						<div class="name">名称</div>
						<div class="price">现价</div>
						<div class="drag">拖动</div>
					</li>
				</ul>
				<ul class="cont">
					<template v-for="(v, index) in parameters">
						<li>
							<i class="icon" :class="{icon_check: v.check == 0, icon_checked: v.check == 1}" @touchstart="checkEvent(v.check, v.CommodityNo)"></i>
							<div class="name">
								<span>{{v.CommodityName}}</span>
								<span>{{v.CommodityNo + v.MainContract}}</span>
							</div>
							<div class="price">
								<span>{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.DateTimeStamp | operateTime}}</span>
							</div>
							<div class="drag">
								<i class="icon icon_drag"></i>
							</div>
						</li>
					</template>
				</ul>
			</div>
		</div>
		<div class="tools">
			<div class="col" @touchstart="checkAllEvemt">
				<i class="icon icon_radio"></i>
				<i class="icon icon_radios" v-show="checkedShow"></i>
				<span>全选</span>
			</div>
			<div class="col" @touchstart="deleteEvent">
				<i class="icon icon_del"></i>
				<span>删除</span>
				<em>({{this.num}})</em>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	export default {
		name: 'optionalManage',
		components: {
		},
		data(){
			return{
				checkedShow: false,
				optionalList: [],
				num: 0,
				id: '',
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			}
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			},
			operateTime: function(val){
				return val.split(' ')[1];
			}
		},
		watch: {
			parameters: function(n, o){
				let num = 0;
				if(n != undefined){
					if(this.checkedShow == true){
						n.forEach((o, i) => {
							if(o.check == 0) this.checkedShow = false;
						});
					}else{
						n.forEach((o, i) => {
							if(o.check == 0) num++;
						});
						if(num == 0){
							this.checkedShow = true;
						}
					}
				}
			}
		},
		methods: {
			toSearch: function(){
				this.$router.push({path: '/search'});
			},
			checkEvent: function(val, name){
				this.num = 0;
				if(val == 0){
					this.parameters.forEach((o, i) => {
						if(name == o.CommodityNo) o.check = 1;
						if(o.check == 1) this.num++;
					});
				}else{
					this.parameters.forEach((o, i) => {
						if(name == o.CommodityNo) o.check = 0;
						if(o.check == 1) this.num++;
					});
				}
			},
			checkAllEvemt: function(){
				if(this.checkedShow == false){
					this.checkedShow = true;
					this.num = this.parameters.length;
					this.parameters.forEach((o, i) => {
						o.check = 1;
					});
				}else{
					this.checkedShow = false;
					this.num = 0;
					this.parameters.forEach((o, i) => {
						o.check = 0;
					});
				}
			},
			deleteEvent: function(){
				if(this.userInfo == undefined) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				let arr = [];
				this.parameters.forEach((o, i) => {
					if(o.check == 1) arr.push(o.id);
				});
				this.id = arr.join(',');
				let datas = {id: this.id};
				pro.fetch('post', '/quoteTrader/userRemoveCommodity', datas, headers).then((res) => {
					if(res.success == true && res.code == 1){
						Toast({message: '删除成功', position: 'bottom', duration: 2000});
						this.num = 0;
						//重新请求自选合约列表
						this.getCommodityList();
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			getCommodityList: function(){
				if(this.userInfo == undefined) return;
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data && res.data.length > 0){
							this.$store.state.market.Parameters = [];
							this.$store.state.market.commodityOrder = [];
							this.$store.state.market.commodityOrder = res.data;
							this.$parent.optionalList = res.data;
							res.data.forEach((o, i) => {
								this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
							});
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			}
		},
		mounted: function(){
			
		},
		activated: function(){
			//重新请求自选合约列表
			this.getCommodityList();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.header{
		height: 1rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		font-size: 0.36rem;
		.done{
			font-size: $fs28;
			color: $fontBlueTitle;
		}
	}
	.icon_back{
		width: 0.24rem;
		height: 0.32rem;
		background: url(../../assets/images/back_icon.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.main{
		margin-top: 1.01rem;
		.search_box{
			width: 7.5rem;
			height: 0.96rem;
			border-bottom: 0.01rem solid $black;
			padding: 0.16rem 0.3rem;
			.search{
				width: 6.9rem;
				height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				position: relative;
				input{
					width: 6.9rem;
					height: 0.64rem;
					line-height: 0.64rem;
					padding: 0 0.1rem 0 0.85rem;
					box-sizing: border-box;
					color: $white;
				}
				.icon_search{
					position: absolute;
					top: 0;
					left: 0;
					width: 0.4rem;
					height: 0.4rem;
					background: url(../../assets/images/search.png) no-repeat center center;
					background-size: 100% 100%;
					margin: 0.12rem 0 0 0.3rem;
				}
			}
		}
		.list{
			width: 7.5rem;
			.title{
				li{
					height: 0.64rem;
					line-height: 0.64rem;
					background: $titleBlue;
					.icon{
						height: 0.64rem;
						background: url(../../assets/images/check.png) no-repeat 0.3rem 0.36rem;
						background-size: 0.24rem 0.24rem;
						opacity: 0;
					}
					div{
						color: $fontBlue;
						font-size: $fs28;
					}
				}
			}
			li{
				height: 0.96rem;
				border-bottom: 0.01rem solid $black;
				padding-right: 0.3rem;
				.icon{
					float: left;
					width: 0.84rem;
					height: 0.96rem;
					&.icon_check{
						background: url(../../assets/images/check.png) no-repeat 0.3rem 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
					&.icon_checked{
						background: url(../../assets/images/checked.png) no-repeat 0.3rem 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
				}
				div{
					float: left;
					text-align: right;
					&.name{
						width: 3rem;
						text-align: left;
					}
					&.price{
						width: 1.5rem;
					}
					span{
						display: block;
						&:first-child{
							font-size: $fs32;
							color: $white;
							margin: 0.15rem 0 0.1rem 0;
						}
					}
					&.drag{
						float: right;
						width: 1rem;
						.icon_drag{
							float: right;
							width: 0.24rem;
							height: 0.24rem;
							background: url(../../assets/images/drag.png) no-repeat center center;
							background-size: 100% 100%;
							margin: 0.36rem 0.15rem 0 0;
						}
					}
					
				}
			}
		}
	}
	.tools{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 7.5rem;
		height: 0.96rem;
		border-top: 0.01rem solid $black;	
		background: $titleBlue;
		.col{
			float: left;
			width: 50%;
			height: 0.96rem;
			line-height: 0.96rem;
			text-align: center;
			border-left: 0.01rem solid $black;
			position: rrelative;
			&:first-child{
				border: none;
			}
			.icon, span, em{
				float: left;
			}
			em{
				margin-left: 0.1rem;
				color: $white;
			}
			.icon_radio{
				width: 0.24rem;
				height: 0.24rem;
				background: $black;
				border-radius: 0.12rem;
				margin: 0.35rem 0.1rem 0 1.48rem;
			}
			.icon_radios{
				width: 0.18rem;
				height: 0.18rem;
				background: $blue;
				border-radius: 0.1rem;
				position: absolute;
				top: 0.38rem;
				left: 1.51rem;
			}
			.icon_del{
				width: 0.24rem;
				height: 0.24rem;
				background: url(../../assets/images/delete.png) no-repeat center center;
				background-size: 100% 100%;
				margin: 0.35rem 0.1rem 0 1.24rem;
			}
		}	
	}
</style>