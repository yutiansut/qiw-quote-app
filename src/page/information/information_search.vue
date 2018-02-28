<template>
	<div id="information_search">
		<div class="search">
			<i></i>
			<input type="text" placeholder="搜索你感兴趣的内容" v-model="searchInfo"/>
			<span @click="back">取消</span>
		</div>
		<div class="showInfo">
			<div class="title">
				<span class="current">7x24</span>
				<!--<span>要闻</span>-->
			</div>
			<div class="exist" v-for="n in infoList" v-show="showExist">
				<ul>
					<li>{{n.createdAt | changTime}}</li>
					<li>{{n.liveTitle}}</li>
				</ul>
			</div>
			<div class="none" v-show="showNone">
				暂无相关资讯
			</div>
			<div class="default" v-show="showDefault">
				<p><span  class="title">大家都在搜索</span></p>
				<ul>
					<li v-for="k in arrList">
						<span v-for="(val,key) in k" @click="choose(val)">{{val}}</span>
					</li>
					<!--<li>
						<span>美元</span>
						<span>日元</span>
						<span>标普500</span>
					</li>
					<li>
						<span>纳斯达克</span>
						<span>上证指数</span>
						<span>深圳指数</span>
					</li>-->
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"information_search",
		data(){
			return{
				infoList:[],
				showExist:false,
				showNone:false,
				searchInfo:'',
				showDefault:true,
				arrList:[{"id":"黄金","id1":"布伦特原油","id2":"美国原油"},{"id":"美元","id1":"日元","id2":"标普500"},{"id":"纳斯达克","id1":"上证指数","id2":"深圳指数"}]
			}
		},
		activated:function(){
			this.searchInfo = '';
		},
		methods:{
			back:function(){
				this.$router.push({path:'/information'})
			},
			search:function(searchInfo){
				var data = {
					pageSize:20,
					pageNo:0,
					minTime:"",
					maxTime:"",
					keyword:searchInfo
				}
				pro.fetch("post","/news/get7_24Live",data,"").then((res)=>{
//					console.log("res========="+JSON.stringify(res))
					if(res.code == 1 && res.success == true){
						if(res.data == ''){
							this.showNone = true;
							this.showDefault = true;
						}else{
							this.infoList = res.data;
						}
					}
				}).catch((err)=>{
//					console.log("err========="+JSON.stringify(err))
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
					}else{
						if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 1000});
							this.$router.push({path:"/login"});
						}
						else{
							this.$toast({message:data.message,duration: 1000});
						}
					}
				})
			},
			choose:function(val){
				this.searchInfo = val;
			}
		},
		filters:{
			changTime:function(e){
				var a = pro.getDate("h:m",e*1000);
				return a;
			}
		},
		watch:{
			searchInfo:function(e){
				if(e != ""){
					this.showExist = true;
					this.showNone = false;
					this.showDefault = false;
					this.search(e);
				}else{
					this.infoList = []
					this.showExist=false;
					this.showNone=false;
					this.showDefault = true
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#information_search{
		width: 7.5rem;
		.search{
			height:1rem;
			line-height:1rem;
			border-bottom: 1px solid #12141a;
			position:relative;
			i{
				position: absolute;
				top: 0.3rem;
				left: 0.6rem;
				background: url(../../assets/images/search.png);
				width: 0.4rem;
				height: 0.4rem;
				display: inline-block;
				background-size: 100% 100%;
			}
			input{
				background-color: #1b1f26;
				width: 6.9rem;
				height: 0.64rem;
				margin-left: 0.3rem;
				border-radius: 0.1rem;
				text-indent: 1.16rem;
				color: $white;
				border: 1px solid #12141a;
			}
			span{
				position: absolute;
				right: 0.6rem;
				color: $fontBlueTitle;
			}
		}
		.showInfo{
			width: 100%;
			.title{
				background-color: $titleBlue;
				height: 0.8rem;
				line-height: 0.8rem;
				padding: 0 0.3rem;
				border-bottom: 1px solid #12141a;
				span{
					margin-right: 0.4rem;
				}
			}
			.current{
				color: $blue;
			}
			.exist{
				border-bottom: 1px solid #12141a;
				padding: 0 0.3rem;
				li{
					&:nth-child(1){
						height: 0.6rem;
						line-height: 0.6rem;
					}
					&:nth-child(2){
						font-size: $fs28;
						color: $white;
						line-height: 0.6rem;
					}
				}
			}
			.none{
				color: $fontBlue;
				text-align: center;
				font-size: 0.36rem;
				margin: 0.2rem 0;
			}
			.default{
				padding: 0 0.3rem;
				.title{
					text-align: center;
					color: $white;
					background-color: $blue;
					font-size: 0.26rem;
					padding: 0.02rem 0.1rem;
					border-radius: 0.05rem;
				}
				ul{
					li{
						margin-top: 0.2rem;
						/*text-align: center;*/
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}
	}
</style>