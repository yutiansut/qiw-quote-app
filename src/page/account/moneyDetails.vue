<template>
	<div id="moneyDetails">
		<mt-header title="资金明细" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<div id="info">
				<ul>
					<li>
						收入:&nbsp;<span>{{total.inItems}}</span>笔<i>{{total.inMoney | fixMoney}}</i>元
					</li>
					<li>
						支出:&nbsp;<span>{{total.outItems}}</span>笔<i>{{total.outMoney | fixMoney}}</i>元
					</li>
				</ul>
			</div>
			<mt-loadmore :bottom-method="loadBottom"  ref="loadmore" :auto-fill="false" :top-method="loadTop">
				<div class="list" v-for="k in this.moneyDetails">
					<div class="black"></div>
					<div class="details">
						<ul class="color_red" v-if="k.type == 1">
							<li>
								<span>入金</span>
								<p>{{k.createTime | showTime}}</p>
							</li>
							<li>+{{k.money}}元</li>
						</ul>
						<ul class="color_green" v-else="k.type == 2">
							<li>
								<span>出金</span>
								<p>{{k.createTime | showTime}}</p>
							</li>
							<li>-{{k.money}}元</li>
						</ul>
						<ul>
							<li>{{k.describe}}</li>
						</ul>
					</div>
				</div>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"moneyDetails",
		data(){
			return{
				moneyDetails:"",
				total:'',
				pageno:"",
				pagesize:''
			}
		},
		methods:{
			//下拉刷新
			loadTop:function(){
//				console.log("11111111");
				this.getMoneyDetail(1,20);
			},
			//加载更多
			loadBottom:function(){
				this.pagesize+=20;
				var pagesize1 = this.pagesize
				this.getMoneyDetail("",pagesize1);
			},
			getMoneyDetail:function(pageno,pagesize){
				var data ={
					pageNo:this.pageno,
					pageSize:this.pagesize
				}
				var headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/account /getMoneyDetail",data,headers).then((res)=>{
//					console.log("res==="+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.total = res.data;
						this.moneyDetails=res.data.inAndOutDetaiList.list;
					}
				}).catch((err)=>{
//					console.log("err==="+JSON.stringify(err));
					var data = err.data;
					if(data == undefined){
						this.$toast({message:'网络不给力，请稍后再试',duration: 2000});
					}else{
						this.$toast({message:data.message,duration: 2000});
					}
				})
			}
		},
		filters:{
			showTime:function(e){
				var a = pro.getDate("y-m-d h:i:s",e);
				return a;
			},
			fixMoney:function(e){
				var b = Number(e).toFixed(2);
				return b;
			}
		},
		mounted:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
		},
		activated: function(){
			//获取平台账户登录信息
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.getMoneyDetail(1,20);
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#login{
		width: 7.5rem;
	}
	#back{
		display: inline-block;
		width: 0.64rem;
		height: 1rem;
		background: url(../../assets/images/back_icon.png) no-repeat 0.15rem 0.34rem;
		background-size: 0.24rem 0.32rem;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		#info{
			li{
				padding: 0 0.3rem;
				height: 0.9rem;
				line-height: 0.9rem;
				&:nth-child(1){
					border-bottom: 1px solid #12141a;
				}
				span{
					color: $white;
					margin:0 0.14rem;
				}
				i{
					color: $white;
					margin-left: 0.24rem;
					margin-right: 0.16rem;
				}
			}
		}
		.list{
			overflow: auto;
			.black{
				width: 100%;
				height: 0.2rem;
				background-color:#1b1f26;
			}
			.details{
				display: flex;
				flex-direction: column;
				ul{
					border-bottom: 1px solid #12141a;
					display: flex;
					justify-content: space-between;
					padding: 0 0.3rem;
					color: $white;
					&:nth-child(1){
						/*background-color: #3a2d36;*/
						li{
							height: 0.9rem;
							display: flex;
							flex-direction: column;
							&:nth-child(1){
								padding-top: 0.16rem;
								p{
									margin-top: 0.16rem;
									color: $fontBlue;
								}
							}
							&:nth-child(2){
								padding-top: 0.3rem;
								/*color: $red;*/
							}
						}
					}
					&:nth-child(2){
						li{
							height: 0.9rem;
							padding-top: 0.3rem;
						}
					}
				}
				.color_red{
					background-color: #3a2d36;
					li{
						&:nth-child(2){
							color: #ff4c4c;
							font-weight: 600;
						}
					}
				}
				.color_green{
					background-color: #273a3b;
					li{
						&:nth-child(2){
							color: #12b362;
							font-weight: 600;
						}
					}
				}
			}
		}
	}
</style>