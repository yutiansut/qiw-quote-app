<template>
	<div id="search">
		<div class="search_box">
			<div class="search">
				<i class="icon icon_search"></i>
				<input type="text" placeholder="搜索合约代码/简称" v-model="searchCont" @keyup="searchEvent" />
				<span @touchstart="toIndex">取消</span>
			</div>
		</div>
		<div class="main">
			<div class="result" v-if="resultShow">
				<p class="title">搜索结果</p>
				<div class="empty" v-if="emptyShow">
					<p>暂无相关合约</p>
				</div>
				<div class="cont" v-if="contShow">
					<ul>
						<template v-for="(v, index) in resultList">
							<li>
								<div class="col">
									<span>{{v.CommodityName}}</span>
									<span>{{v.CommodityNo + v.MainContract}}</span>
								</div>
								<i class="icon icon_check"></i>
							</li>
						</template>
					</ul>
					<p class="tips">没有更多啦</p>
				</div>
			</div>
			<div class="recommend_box" v-show="recommendShow">
				<p class="title">大家都在搜索</p>
				<div class="recommend">
					<ul>
						<template v-for="(v,index) in recommendList">
							<li>{{v.label}}</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	export default {
		name: 'search',
		components: {
		},
		data(){
			return{
				searchCont: '',
				resultShow: false,
				emptyShow: false,
				contShow: false,
				recommendShow: true,
				totalList: [],
				resultList: [],
				recommendList: [],
			}
		},
		computed: {
			markettemp(){
				return this.$store.state.market.markettemp;
			}
		},
		methods: {
			getRecommend: function(){
				pro.fetch('post', '/quoteTrader/getRecommend', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.recommendList = res.data;
					}
				}).catch((err) => {
					Toast({message: err.message, position: 'bottom', duration: 2000});
				});
			},
			toIndex: function(){
				this.searchCont = '';
				this.$router.push({path: '/index'});
			},
			searchEvent: function(){
				if(this.searchCont != ''){
					this.resultShow = true;
					this.resultList = [];
					this.totalList.forEach((o, i) => {
						if(o.match(this.searchCont) != null){
							let obj = {};
							let arr = o.split(',');
							obj.CommodityName = arr[0];
							obj.CommodityNo = arr[1];
							obj.MainContract = arr[2];
							this.resultList.push(obj);
						}
					});
					if(this.resultList.length > 0){
						this.contShow = true;
						this.recommendShow = false;
					}else{
						this.emptyShow = true;
						this.contShow = false;
					}
				}else{
					this.resultList = [];
					this.resultShow = false;
					this.emptyShow = false;
					this.recommendShow = true;
				}
			}
		},
		mounted: function(){
			//获取推荐
			this.getRecommend();
			this.$store.state.market.markettemp.forEach((o,i) => {
				let str = o.CommodityName + ',' + o.CommodityNo + ',' + o.MainContract;
				this.totalList.push(str);
			});
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	.search_box{
		position: fixed;
		top: 0;
		left: 0;
		width: 7.5rem;
		height: 1rem;
		border-bottom: 0.01rem solid $black;
		padding: 0.18rem 0.3rem;
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
				padding: 0 0.9rem 0 0.85rem;
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
			span{
				display: block;
				height: 0.64rem;
				line-height: 0.64rem;
				position: absolute;
				top: 0;
				right: 0.3rem;
			}
		}
	}
	.main{
		margin-top: 1.01rem;
		.recommend_box{
			overflow: hidden;
		}
		.title{
			height: 0.64rem;
			line-height: 0.64rem;
			padding: 0 0.3rem;
			border-bottom: 0.01rem solid $black;
			background: $titleBlue;
		}
		.recommend{
			li{
				float: left;
				width: 2.5rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-right: 0.01rem solid $black;
				border-bottom: 0.01rem solid $black;
			}
		}
		.result{
			.cont{
				li{
					height: 0.96rem;
					padding: 0 0.3rem;
					border-bottom: 0.01rem solid $black;
					.col{
						float: left;
						span{
							display: block;
							&:first-child{
								font-size: $fs32;
								color: $white;
								margin: 0.15rem 0 0.1rem 0;
							}
						}
					}
					.icon{
						float: right;
						width: 0.24rem;
						height: 0.96rem;
						&.icon_check{
							background: url(../../assets/images/check.png) no-repeat center 0.36rem;
							background-size: 0.24rem 0.24rem;
						}
						&.icon_checked{
							background: url(../../assets/images/checked.png) no-repeat center 0.36rem;
							background-size: 0.24rem 0.24rem;
						}
					}
				}
			}
			.tips{
				height: 0.96rem;
				line-height: 0.96rem;
				text-align: center;
				color: #525866;
			}
		}
		.empty{
			height: 2.4rem;
			line-height: 2.4rem;
			border-bottom: 0.01rem solid $black;
			text-align: center;
			p{
				font-size: 0.36rem;
				color: #525866;
				font-weight: bold;
			}
		}
	}
</style>