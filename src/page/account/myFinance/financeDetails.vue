<template>
	<div id="financeDetails">
		<mt-header title="融资详情" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/account" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">规则</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<ul class="nav">
				<li @click="next" class="current" >融资方案明细</li>
				<li @click="next">历史成交记录</li>
			</ul>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default{
		name:"financeDetails",
		data(){
			return{
				
			}
		},
		methods:{
			next:function(e){
				var index = $(e.currentTarget).index();
				$(".nav li").removeClass("current");
				$(".nav li").eq(index).addClass("current");
				switch (index){
					case 0:
						this.$router.push({path:"/financeDetails/schemeDetails"})
						break;
					case 1:
						this.$router.push({path:"/financeDetails/historyRecords"})
						break;
					default:
						break;
				}
			}
		},
		mounted:function(){
			this.$router.push({path:"/financeDetails/schemeDetails"})
		}
	}
</script>


<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#financeDetails{
		width: 7.5rem;
		color:$fontBlue ;
	}
	#back{
		background: url(../../../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		.nav{
			width: 100%;
			padding: 0rem 1rem;
			height: 0.8rem;
			border-bottom: 1px solid #12141a;
			display: flex;
			justify-content: space-between;
			li{
				height: 0.8rem;
				line-height: 0.8rem;
			}
		}
		.current{
			color: $blue;
			border-bottom: 2px solid $blue;
		}
	}
</style>