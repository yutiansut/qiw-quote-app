<template>
	<div id="information">
		<!--<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange">
		    <ul>
		        <li v-for="item in list">{{ item.k }}</li>
		    </ul>
		    <div slot="top" class="mint-loadmore-top">
		      	<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
		      	<span v-show="topStatus === 'loading'">Loading...</span>
		    </div>
		</mt-loadmore>-->
		<mt-header title="资讯" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;">
		    <router-link to="/account" slot="right">
		    	<i id="search" v-show="showSearch"></i>
		    	<i id="chooseday" v-show="showChooseDay"></i>
		 	</router-link>
		</mt-header>
		<div id="container">
			<div class="navlist">
				<span class="current" @click="change">7x24</span>
				<span @click="change">财经日历</span>
				<!--<span @click="change">要闻</span>-->
			</div>
			<!--直播-->
			<div id="news" v-show="showNews">
				<div class="time">
					<span>2017-12-28</span>
					<span>星期三</span>
				</div>
				<div class="list">
					<p class="color_red">16:44</p>
					<p class="color_red">【不利因素渐显 现货煤价止涨】“CCTD秦皇岛动力煤价格”终止上行；“CCTD广州港进口煤价格”所采集相关煤种价格涨幅显著扩大；“CCTD唐山炼焦煤价格”和“CCTD徐州无烟煤价格”所采集相关煤种的价格走势保持平稳。环渤海地区三种现货动力煤价格终止上涨，一是主要发电企业的电煤采购压力难以舒缓；二是进口煤炭对市场资源的补充尚需时日；三是支持环渤海地区的动力煤价格上涨的动力减弱；四是主要煤炭生产企业主动下调动力煤销售价格。（中国煤炭市场网）</p>
					<p><span>展开</span></p>
				</div>
				<div class="list" v-for="n in 5">
					<p>16:44</p>
					<p>【不利因素渐显 现货煤价止涨】“CCTD秦皇岛动力煤价格”终止上行；“CCTD广州港进口煤价格”所采集相关煤种价格涨幅显著扩大；“CCTD唐山炼焦煤价格”和“CCTD徐州无烟煤价格”所采集相关煤种的价格走势保持平稳。环渤海地区三种现货动力煤价格终止上涨，一是主要发电企业的电煤采购压力难以舒缓；二是进口煤炭对市场资源的补充尚需时日；三是支持环渤海地区的动力煤价格上涨的动力减弱；四是主要煤炭生产企业主动下调动力煤销售价格。（中国煤炭市场网）</p>
					<p><span>展开</span></p>
				</div>
			</div>
			<!--日历-->
			<div id="calendar" v-show="showCalendar">
				<div class="time1">
					2017年10月
				</div>
				<div class="date">
					<ul>
						<li v-for="(k,index) in weekDayList">
							<span >{{k.weekday}}</span></br>
							<span :class="{span_white:current == index}">{{k.day}}</span>
						</li>
					</ul>
				</div>
				<div v-for="n in 5">
					<div class="black"></div>
					<div class="details">
						<ul>
							<li>
								<span></span>
								<span>06:30</span>
								<span>guoqi</span>
								<span>中国</span>
								<span></span>
							</li>
							<li>
								12月制造业产出环比
							</li>
							<li>
								<span>今值&nbsp;&nbsp;---</span>
								<span>预期&nbsp;&nbsp;0.02%</span>
								<span>前值&nbsp;&nbsp;0.05%</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"information",
		data(){
			return{
				showSearch:true,
				showChooseDay:false,
				showNews:true,
				showCalendar:false,
				weekDayList:[
					{day:16,weekday:"一"},
					{day:17,weekday:"二"},
					{day:18,weekday:"三"},
					{day:19,weekday:"四"},
					{day:20,weekday:"五"},
					{day:21,weekday:"六"},
					{day:22,weekday:"七"}
				],
				current:3
			}
		},
		methods:{
		    change:function(e){
		    	$(e.target).addClass("current").siblings().removeClass("current");
		    	this.showNews=!this.showNews;
		    	this.showCalendar=!this.showCalendar;
		    	this.showSearch=!this.showSearch;
		    	this.showChooseDay=!this.showChooseDay
		    }
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	
	#test{
		display: none;
	}
	#search{
		background: url(../assets/images/search.png) no-repeat;
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		background-size: 100% 100%;
	}
	#chooseday{
		background: url(../assets/images/choose_day.png) no-repeat;
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		background-size: 100% 100%;
	}
	#information{
		width: 7.5rem;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		.navlist{
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
		}
		/*直播*/
		#news{
			margin-top: 1.8rem;
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
				height: 3.2rem;
				border-bottom: 1px solid #12141a;
				p{
					overflow:hidden;
					&:nth-child(1){
						height: 0.7rem;
						line-height: 0.7rem;
						padding-left: 0.3rem;
					}
					&:nth-child(2){
						height: 1.8rem;
						line-height: 0.45rem;
						padding:0 0.3rem;
					}
					&:nth-child(3){
						height: 0.7rem;
						line-height: 0.7rem;
						text-align: right;
						span{
							margin-right: 0.1rem;
							width: 0.6rem;
							height: 0.3rem;
							line-height: 0.3rem;
							background-color: $fontBlueTitle;
							color: #242933;
							display: inline-block;
							text-align: center;
						}
					}
				}
			}
			.color_red{
				color: #ff5533;
			}
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
						color::$white; 
						&:nth-child(1){
							color: $fontBlue;
						}&:nth-child(7){
							color: $fontBlue;
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
				height: 2.4rem;
				background-color: $bg;
				padding: 0 0.3rem;
				ul{
					li{
						height: 0.8rem;
						line-height: 0.8rem;
						&:nth-child(1){
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
									background: url(../assets/images/start_1.png);
									display: inline-block;
									background-size: 100% 100%;
									height: 0.2rem;
									width: 0.22rem;
									margin-top: 0.3rem;
								}
							}
						}
						&:nth-child(2){
							color: $orange;
							font-weight: 600;
						}
						&:nth-child(3){
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
	}
</style>