<template>
	<div id="importantDetails">
		<mt-header title="要闻详情" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;">
		    <router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<h1>{{title}}</h1>
			<p>{{time}}</p>
			<div class="info">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"importantDetails",
		data(){
			return{
				id:"",
				title:"",
				time:""
			}
		},
		methods:{
			
		},
		activated:function(){
			this.id = this.$route.query.id;
			this.title = this.$route.query.title;
			this.time = this.$route.query.time;
			
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#importantDetails{
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
		width: 100%;
		margin-top: 1rem;
		padding: 0 0.3rem;
		h1{
			height: 0.9rem;
			line-height: 0.9rem;
			color: $white;
			font-weight: 600;
		}
		p{
			&:nth-child(3){
				color: $fontBlueTitle;
				line-height: 0.6rem;
			}
			&:nth-child(4){
				color: #747f92;
				line-height: 0.6rem;
			}
		}
	}
</style>