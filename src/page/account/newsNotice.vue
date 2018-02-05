<template>
	<div id="newsNotice">
		<mt-header title="新闻公告" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<div class="exist" v-show="exist" >
				<div class="list" v-for="k in this.newList">
					<ul @click="toNewDetails(k.id,$event)">
						<li>{{k.time}}</li>
						<li v-if="k.b == 'false'" class="current">{{k.title}}</li>
						<li v-else="k.b =='true'" >{{k.title}}</li>
						<!--<li v-else="k.isNewRecord == false" class="current">{{k.title}}</li>-->
					</ul>
				</div>
				<!--<div class="list">
					<ul>
						<li>2017-12-25</li>
						<li class="current">关于期货操盘比赛第五期：黄金期货操盘的比赛公告啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</li>
					</ul>
				</div>-->
			</div>
			<div class="none" v-show="none">
				<p>暂无最新公告</p>
			</div>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"newsNotice",
		data(){
			return{
				exist:true,
				none:false,
				newList:"",
				arr:[]
			}
		},
		methods:{
			getNewList:function(){
				var data = {
					pageNo:1,
					pageSize:20
				}
				pro.fetch("post","/others/getNoticeList",data,"").then((res)=>{
//					console.log("res==="+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.newList = res.data.list;
//						console.log("this.arr==="+JSON.stringify(this.arr))
//						if(this.arr != undefined || this.arr != null){
//							for(var a of this.newList){
//								for(var i of this.arr){
//									if(i.id1 == a.id){
//										a.b="true";
//										break;
//									}else{
//										a.b="false";
//									}
//								}
//							}
//						}
//						console.log("this.newList========"+JSON.stringify(this.newList));
						if(res.data.list == ''){
							this.exist = false;
							this.none = true;
						}
					}
				}).catch((err)=>{
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
			toNewDetails:function(a,e){
//				localStorage.removeItem("NEWSID");
//				var newsId = {id:a};
//				this.arr = JSON.parse(localStorage.getItem("NEWSID"));
//				if(this.arr == null){
//					this.arr = [];
//					this.arr.push(newsId);
//				}else{
//					for(var a of this.arr){
//						console.log(JSON.stringify(a.id));
//						if(newsId.id != a.id){
//							this.arr.push(newsId);
//							break;
//						}
//					}
//				}
//				console.log("this.arr"+JSON.stringify(this.arr));
//				localStorage.setItem("NEWSID",JSON.stringify(this.arr));
//				this.$router.push({path:"/newsDetails",query:{id:a}});
//				$(e.target).removeClass("current");
			}
		},
		mounted:function(){
//			this.getNewList();
		},
		activated:function(){
			this.arr = JSON.parse(localStorage.getItem("NEWSID"));
			this.getNewList();
//			console.log("this.arr====="+JSON.stringify(this.arr));
//			console.log("id11111111111111"+JSON.stringify(id1))
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#newsNotice{
		width: 7.5rem;
	}
	#back{
		background: url(../../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#container{
		color:$fontBlue ;
		width: 100%;
		margin-top: 1rem;
		.list{
			border-bottom: 1px solid #12141a;
			padding: 0rem 0.3rem;
			li{
				&:nth-child(1){
					height: 0.65rem;
					line-height: 0.65rem;
					font-size: $fs24;
				}
				&:nth-child(2){
					padding-bottom: 0.1rem;
					line-height: 0.4rem;
					font-size: $fs28;
				}
			}
		}
		.current{
			color:$white;
		}
		.none{
			width: 100%;
			height: 0.4rem;
			margin-top: 50%;
			text-align: center;
			color: #525866;
			font-size: $fs32;
		}
	}
</style>