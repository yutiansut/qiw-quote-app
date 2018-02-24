<template>
	<div id="information">
		<mt-header title="资讯" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;">
		</mt-header>
		<div id="container">
			<div id="topRight">
		    	<i id="search" v-show="showSearch" @click="toImformationSearch"></i>
		    	<i id="chooseday" v-show="showChooseDay" @click="toChooseDay('picker1')"></i>
		 	</div>
			<div class="navlist">
				<span class="current" @click="change">7x24</span>
				<span @click="change">财经日历</span>
				<span @click="change">要闻</span>
				<!--<span class="current">要闻</span>-->
			</div>
			<!--直播-->
			<div id="news" v-show="showNews">
				<mt-loadmore :bottom-method="loadBottom"  :auto-fill="false" :top-method="loadTop">
					<div class="time">
						<span>{{nowDay | changDay}}</span>
						<span>{{nowWeek}}</span>
					</div>
					<div class="list" v-for="k in this.newsInfo">
						<p>{{k.createdAt | changTime }}</p>
						<!--<p>{{k.liveTitle}}</p>-->
						<p v-if="k.liveTitle.length > 120" class="textHeight">{{k.liveTitle}}</p>
						<p v-if="k.liveTitle.length < 120">{{k.liveTitle}}</p>
						<p v-if="k.liveTitle.length > 120" @click="showAll"><span>展开</span></p>
						<p v-if="k.liveTitle.length < 120" ></p>
					</div>
					<div class="empty"></div>
				</mt-loadmore>
				
			</div>
			<!--日历-->
			<div id="calendar" v-show="showCalendar">
				<div class="time1">
					{{show_day}}
				</div>
				<div class="date">
					<ul>
						<li v-for="(k,index) in weekDayList" @click="chooseDay">
							<span >{{k.weekday}}</span></br>
							<span :class="{span_white:current == index}">{{k.day | showToday}}</span>
						</li>
					</ul>
				</div>
				<div v-for="n in list">
					<div class="black"></div>
					<div class="details">
						<ul>
							<li>
								<span></span>
								<span>{{n.timestamp | changTime}}</span>
								<span><img :src="n.flagUrl" /></span>
								<span>{{n.country}}</span>
								<span v-if="n.stars == '4'">
									<i  v-for="t in 4"></i>
								</span>
								<span v-if="n.stars != '4'">
									<i  v-for="t in (n.stars)"></i>
									<!--<i v-for="t in (4-n.stars)"></i>-->
								</span>
							</li>
							<li>
								{{n.title}}
							</li>
							<li>
								<span v-if="n.actual == ''">今值&nbsp;&nbsp;---</span>
								<span v-else-if="n.actual != ''">今值&nbsp;&nbsp;{{n.actual}}</span>
								<span v-if="n.forecast == ''">预期&nbsp;&nbsp;---</span>
								<span v-else-if="n.forecast != ''">预期&nbsp;&nbsp;{{n.forecast}}</span>
								<span v-if="n.previous == ''">前值&nbsp;&nbsp;---</span>
								<span v-else-if="n.previous != ''">前值&nbsp;&nbsp;{{n.previous}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="empty"></div>
				<mt-datetime-picker
				    ref="picker1"
				    type="date"
				    v-model="value1"
				    year-format="{value} 年"
				    month-format="{value} 月"
				    date-format="{value} 日"
				    :startDate="startDate"
				    :endDate="endDate"
				    @confirm="handleChange">
			    </mt-datetime-picker>
			</div>
			<div id="importantNews" v-show="showImportantNews">
				<div class="solider">
					<mt-swipe :show-indicators="false" :auto="3000">
						<mt-swipe-item><img src="../assets/images/solider_01.png" alt="" /></mt-swipe-item>
						<mt-swipe-item><img src="../assets/images/solider_02.png"/></mt-swipe-item>
						<mt-swipe-item><img src="../assets/images/solider_03.png"/></mt-swipe-item>
					</mt-swipe>
				</div>
				<div class="black"></div>
				<div class="news" v-for="k in this.infoArr" @click="toImporttantDetails($event,k.id,k.title,k.time)">
					<div class="newsLeft">
						<i></i>
						<ul>
							<li>{{k.title}}</li>
							<li>{{k.time}}</li>
						</ul>
					</div>
					<div class="newsRight">
						<img v-bind:src="k.imgurl" alt="" />
					</div>
				</div>
			</div>
		</div>
		<TabBar></TabBar>
	</div>
</template>

<script>
	import TabBar from "../components/TabBar.vue"
	import pro from "../assets/js/common.js"
	export default{
		name:"information",
		components: {
			TabBar
		},
		data(){
			return{
				showSearch:true,
				showChooseDay:false,
				showNews:true,
				showCalendar:false,
				showImportantNews:false,
				weekDayList:[],
				current:3,
				newsInfo:"",
				nowDay:"",
				nowWeek:'',
				times:0,
				startTime:'',
				endTime:'',
				list:5,
				value: null,
		      	value1: null,
		      	startDate: new Date('2014-1-1'),
		      	endDate: new Date('2020-12-31'),
		      	show_day:"",
				infoArr:[{title:"比特币再现巨大跌幅，自高位跌去七成 这次还能爬起来吗？",time:"2018-02-10",imgurl:require("../assets/images/important_1.jpg"),id:"1"},
				{title:"美股暴跌的原因猜想：这次可能没法指望美联储了",time:"2018-02-09",imgurl:require("../assets/images/important_2.jpg"),id:"2"},
				{title:"俄媒数据：中石油2017年海外油气开采量增17.2%",time:"2018-02-08",imgurl:require("../assets/images/important_3.jpg"),id:"3"},
				{title:"钢材总库存处于低位，沪钢稳居3900元/吨之上",time:"2018-02-05",imgurl:require("../assets/images/important_4.jpg"),id:"4"},
				{title:"铜业公司业绩喜人，铜市有望进入“长牛”",time:"2018-02-03",imgurl:require("../assets/images/important_5.jpg"),id:"5"}]
			}
		},
		methods:{
			//下拉刷新
			loadTop:function(){
				this.getNewsInfo(0);
			},
			//加载更多
			loadBottom:function(){
				this.times++;
				var data = {
					pageSize:20,
		    		pageNo:this.times
				}
				pro.fetch("post","/news/get7_24Live",data,"").then((res)=>{
					if(res.code == 1 && res.success == true){
						var b = res.data.data.data;
						this.newsInfo=this.newsInfo.concat(b);
					}
				}).catch((err)=>{
					
				})
			},
			showAll:function(e){
				var aa = $(e.target).parent().siblings().eq(1).hasClass("textHeight");
				if(aa == true){
					e.target.innerHTML = "收起"
					$(e.target).parent().siblings().eq(1).removeClass("textHeight");
				}else{
					e.target.innerHTML = "展开"
					$(e.target).parent().siblings().eq(1).addClass("textHeight");
				}
				
			},
		    change:function(e){
		    	$(e.target).addClass("current").siblings().removeClass("current");
		    	var index = $(e.target).index();
		    	switch (index){
		    		case 0:
		    			this.showNews = true;
		    			this.showCalendar = false;
		    			this.showImportantNews = false;
		    			this.showSearch=true;
						this.showChooseDay=false
		    			break;
		    		case 1:
		    			this.showNews = false;
		    			this.showCalendar = true;
		    			this.showImportantNews = false;
		    			this.showSearch=false;
						this.showChooseDay=true
		    			break;	
		    		case 2:
		    			this.showNews = false;
		    			this.showCalendar = false;
		    			this.showImportantNews = true;
		    			this.showSearch=false;
						this.showChooseDay=false
		    			break;
		    		default:
		    			break;
		    	}
		    },
		    toDetails:function(){
		    	this.$router.push({path:"/information_details"});
		    },
		    toImporttantDetails:function(e,id,title,time){
		    	this.$router.push({path:"/importantDetails",query:{id:id,title:title,time:time}})
		    },
		    getNewsInfo:function(a){
		    	var data = {
		    		pageSize:20,
		    		pageNo:a
		    	}
		    	pro.fetch("post","/news/get7_24Live",data,"").then((res)=>{
//		    		console.log("res==="+JSON.stringify(res));
		    		if(res.code == 1 && res.success == true){
		    			this.newsInfo = res.data.data.data;
		    		}
		    	}).catch((err)=>{
//		    		console.log("err==="+err)
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
		    //以上为7*24小时部分
		    getDayList:function(e){
			    var timec = Date.parse(e)/1000;
			    var today = pro.getDate("y-m-d",timec*1000);
			    //1-3天前
			    var todayBefore3 = pro.getDate("y-m-d",(timec-3*24*60*60)*1000);
			    var todayBefore2 = pro.getDate("y-m-d",(timec-2*24*60*60)*1000);
			    var todayBefore1 = pro.getDate("y-m-d",(timec-24*60*60)*1000);
			    //1-3天后
			    var todayAfter3 = pro.getDate("y-m-d",(timec+3*24*60*60)*1000);
			    var todayAfter2 = pro.getDate("y-m-d",(timec+2*24*60*60)*1000);
			    var todayAfter1 = pro.getDate("y-m-d",(timec+24*60*60)*1000);
			    var arr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
			    var time = new Date(timec*1000);
			    var week = arr[time.getDay()];
			    var weekBefore3 = arr[new Date(timec*1000-3*24*60*60*1000).getDay()];
			    var weekBefore2 = arr[new Date(timec*1000-2*24*60*60*1000).getDay()];
			    var weekBefore1 = arr[new Date(timec*1000-24*60*60*1000).getDay()];
			    var weekAfter3 = arr[new Date(timec*1000+3*24*60*60*1000).getDay()];
			    var weekAfter2 = arr[new Date(timec*1000+2*24*60*60*1000).getDay()];
			    var weekAfter1 = arr[new Date(timec*1000+24*60*60*1000).getDay()];
			    var todayObj1 = {};todayObj1.day = todayBefore3;todayObj1.weekday = weekBefore3;
			    var todayObj2 = {};todayObj2.day = todayBefore2;todayObj2.weekday = weekBefore2;
			   	var todayObj3 = {};todayObj3.day = todayBefore1;todayObj3.weekday = weekBefore1;
			   	var todayObj4 = {};todayObj4.day = today;todayObj4.weekday = week;
			   	var todayObj5 = {};todayObj5.day = todayAfter1;todayObj5.weekday = weekAfter1;
			   	var todayObj6 = {};todayObj6.day = todayAfter2;todayObj6.weekday = weekAfter2;
			   	var todayObj7 = {};todayObj7.day = todayAfter3;todayObj7.weekday = weekAfter3;
			   	var aaa = []
			   	for(var i = 0;i<7;i++){
			   		aaa[i]=eval("todayObj"+(i+1));
			   	}
			   	this.weekDayList = aaa;
			},
			chooseDay:function(e){
				var index = $(e.currentTarget).index();
				this.startTime = this.weekDayList[index].day;
				this.endTime = pro.getDate("y-m-d",(Date.parse(this.startTime)/1000+24*60*60)*1000);
				this.getInfoList(this.startTime,this.endTime);
				this.show_day = pro.getDate("yy-mm-dd",Date.parse(this.weekDayList[index].day));
				this.getDayList(this.startTime);
			},
			getInfoList:function(startTime,endTime){
				var data = {
					startTime:startTime,
					endTime:endTime
				}
				pro.fetch("post","/news/getCalendar",data,"").then((res)=>{
//					console.log("res======"+JSON.stringify(res));
					if(res.success == true && res.code == 1){
						this.list = res.data.data.data
//						console.log("list======"+JSON.stringify(this.list));
					}
				}).catch((err)=>{
//					console.log("err======="+JSON.stringify(err));
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
			toImformationSearch:function(){
				this.$router.push({path:"/information_search"});
			},
			toChooseDay:function(picker){
				this.$refs[picker].open();
			},
			handleChange:function(value){
				this.startTime = pro.getDate("y-m-d", Date.parse(value));
				this.endTime = pro.getDate("y-m-d",(Date.parse(this.startTime)/1000+24*60*60)*1000);
				this.getInfoList(this.startTime,this.endTime);
				this.getDayList(this.startTime);
				this.show_day = pro.getDate("yy-mm-dd", Date.parse(value));
			}
		},
		mounted:function(){
			this.startTime = pro.getDate("y-m-d",Date.parse(new Date()));
			this.endTime = pro.getDate("y-m-d",(Date.parse(new Date())/1000+24*60*60)*1000);
			this.getDayList(this.startTime);
			this.getInfoList(this.startTime,this.endTime);
		},
		activated:function(){
			this.times = 0;
			this.getNewsInfo(this.times);
			this.nowDay =  Date.parse(new Date()); 
			this.show_day = pro.getDate("yy-mm-dd",Date.parse(new Date()));
			var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
			this.nowWeek = dayNames[new Date().getDay()]; 
		},
		filters:{
			changTime:function(e){
				var a = pro.getDate("h:m",e*1000);
				return a;
			},
			changDay:function(e){
				var b = pro.getDate("y-m-d",e);
				return b;
			},
			changDay1:function(e){
				var c = pro.getDate("yy-mm-dd",e);
				return c;
			},
			showToday:function(e){
				var a = Date.parse(e)/1000;
				a = pro.getDate("d",a*1000);
				return a;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	
	#test{
		display: none;
	}
	#topRight{
		width: 0.6rem;
		height: 1rem;
		position: fixed;
		top: 0;
		right: 0.3rem;
		z-index: 1000;
		#search{
			background: url(../assets/images/search.png) no-repeat;
			display: inline-block;
			width: 0.4rem;
			height: 0.4rem;
			background-size: 100% 100%;
			margin-top: 0.3rem;
			float: right;
		}
		#chooseday{
			background: url(../assets/images/choose_day.png) no-repeat;
			display: inline-block;
			width: 0.4rem;
			height: 0.4rem;
			background-size: 100% 100%;
			margin-top: 0.3rem;
			float: right;
		}
	}
	#information{
		width: 7.5rem;
	}
	#container{
		width: 100%;
		margin-top: 1.8rem;
		.navlist{
			background-color: $bg;
			position: fixed;
			top: 1rem;
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 0.8rem;
			line-height: 0.8rem;
			color: $fontBlueTitle;
			padding-left: 0.3rem;
			border-bottom: 1px solid #12141a;
			span{
				margin-right:0.4rem;
			}
		}
		.current{
			color: $blue;
			border-bottom: 0.04rem solid $blue;
			height: 0.8rem;
		}
		/*直播*/
		#news{
			/*margin-top: 1.8rem;*/
			width: 100%;
			.time{
				height: 0.64rem;
				line-height: 0.64rem;
				padding-left: 0.3rem;
				background-color:$titleBlue;
				border-bottom: 1px solid #12141a;
				span{
					margin-right: 0.2rem;
				}
			}
			.list{
				width: 100%;
				/*height: 3.2rem;*/
				border-bottom: 1px solid #12141a;
				p{
					overflow:hidden;
					&:nth-child(1){
						height: 0.7rem;
						line-height: 0.7rem;
						padding-left: 0.3rem;
					}
					&:nth-child(2){
						/*height: 1.8rem;*/
						line-height: 0.45rem;
						padding:0 0.3rem;
						color: $white;
					}
					&:nth-child(3){
						height: 0.7rem;
						line-height: 0.7rem;
						text-align: right;
						span{
							margin-right: 0.1rem;
							/*width: 0.6rem;*/
							/*height: 0.3rem;*/
							line-height: 0.4rem;
							background-color: $fontBlueTitle;
							color: #242933;
							display: inline-block;
							text-align: center;
							padding: 0.01rem 0.05rem;
						}
					}
				}
				.textHeight{
					height: 1.8rem;
				}
			}
			.color_red{
				color: #ff5533;
			}
		}
		.empty{
				height: 1rem;
			}
		/*日历*/
		#calendar{
			margin-top: 1.8rem;
			width: 100%;
			.time1{
				height: 0.6rem;
				line-height: 0.6rem;
				text-align: center;
				background-color: $titleBlue;
				border-bottom: 1px solid #12141a;
				color: $white;
			}
			.date{
				ul{
					text-align: center;
					display: flex;
					justify-content: space-between;
					padding: 0 0.3rem;
					height: 1.1rem;
					border-bottom: 1px solid #12141a;
					li{
						&:nth-child(4){
							color::$white;
						}
						span{
							&:nth-child(1){
								line-height: 0.6rem;
							}
							&:nth-child(2){
								line-height: 0.5rem;
							}
						}
					}
					.span_white{
						border-radius:50%;
						padding:0.06rem;
						background-color:$fontBlueTitle ;
						color: $black;
					}
				}
			}
			.black{
				height: 0.2rem;
				border-bottom: 1px solid #12141a;
				background-color: #1B1F26;
			}
			.details{
				/*height: 2.4rem;*/
				background-color: $bg;
				padding: 0 0.3rem;
				ul{
					li{
						/*height: 0.8rem;*/
						line-height: 0.8rem;
						&:nth-child(1){
							height: 0.8rem;
							span{
								float: left;
								&:nth-child(1){
									margin-right: 0.16rem;
									background: url(../assets/images/subscription_01.png);
									display: inline-block;
									width: 0.3rem;
									height: 0.3rem;
									background-size: 100% 100%;
									margin-top: 0.2rem;
									background-color: none;
								}
								&:nth-child(2){
									margin-right: 0.16rem;
								}
								&:nth-child(3){
									margin-right: 0.16rem;
								}
								&:nth-child(4){
									margin-right: 0.16rem;
								}
								&:nth-child(5){
									float: right;
									i{
										background: url(../assets/images/start_1.png);
										display: inline-block;
										background-size: 100% 100%;
										height: 0.2rem;
										width: 0.22rem;
										margin-top: 0.3rem;
									}
								}
							}
							img{
								width: 0.45rem;
								height: 0.3rem;
							}
						}
						&:nth-child(2){
							color: $orange;
							font-weight: 600;
						}
						&:nth-child(3){
							height: 0.8rem;
							span{
								&:nth-child(1){
									float: left;
								}
								&:nth-child(2){
									float: left;
									margin-left: 1.6rem;
								}
								&:nth-child(3){
									float: right;
								}
							}
						}
					}
				}
			}
		}
		/*要闻*/
		#importantNews{
			margin-top: 1rem;
			width: 100%;
			.solider{
				width: 100%;
				height: 2.4rem;
				background-color: royalblue;
			}
			.black{
				width: 100%;
				height: 0.2rem;
				background-color: #1b1f26;
				border-top: 1px solid #12141a;
			}
			.news{
				&:last-child{
					margin-bottom: 2rem;
				}
				width: 100%;
				height: 1.8rem;
				border-top: 1px solid #12141a;
				border-bottom: 1px solid #12141a;
				display: flex;
				justify-content: space-between;
				.newsLeft{
					width: 5.3rem;
					i{
						width: 0.2rem;
						height: 0.2rem;
						background-color: $blue;
						display: block;
						margin-top: 0.36rem;
						float: left;
					}
					ul{
						width: 5.1rem;
						display: block;
						float: left;
						padding-left: 0.1rem;
						li{
							&:nth-child(1){
								padding-top: 0.3rem;
								color: $white;
								font-size: $fs28;
								line-height: 0.42rem;
							}
							&:nth-child(2){
								color: #7a8599;
								font-size: $fs24;
							}
						}
					}
				}
				.newsRight{
					position: relative;
					width: 2.2rem;
					img{
						width: 1.6rem;
						height: 1.2rem;
						margin: -0.6rem 0 0 -0.8rem;
						top: 50%;
						left: 50%;
						position: absolute;
						border: 1px solid #12141a;
						border-radius: 0.1rem;
					}
				}
			}
			.current1{
				.newsLeft{
					i{
						background-color: #16597f;
					}
					ul{
						li{
							&:nth-child(1){
								color: #7a8599;
							}
						}
					}
				}
			}
		}
	}
</style>