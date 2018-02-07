<template>
	<div id="newsDetails">
		<mt-header title="公告详情" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/newsNotice" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<p>{{title}}</p>
			<span>{{time}}</span>
			<p>{{content}}</p>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"newsDetails",
		data(){
			return{
				id:"",
				title:"",
				content:'',
				time:""
			}
		},
		methods:{
			getDetails:function(){
				var data = {
					id:this.id
				}
				console.log(JSON.stringify(data));
				pro.fetch("post","/others/getNotice",data,"").then((res)=>{
//					console.log("res==="+JSON.stringify(res));
					if(res.code == 1 && res.success == true){
						this.title = res.data.title;
						this.content = res.data.content;
						this.time = res.data.time;
					}
				}).catch((err)=>{
//					console.log("err==="+JSON.stringify(err));
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
			}
		},
		mounted:function(){
			this.id = this.$route.query.id;
		},
		activated:function(){
			this.id = this.$route.query.id;
			this.getDetails();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#newsDetails{
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
		color:$fontBlue ;
		width: 100%;
		margin-top: 1rem;
		padding: 0 0.3rem;
		span{
			color: $fontBlueTitle;
			font-size: $fs24;
			line-height: 0.6rem;
			font-weight: 500;
		}
		p{
			&:nth-child(1){
				font-size: $fs32;
				color: $white;
				line-height: 0.6rem;
				font-weight: 600;
			}
			&:nth-child(2){
				color: $fontBlue;
				font-size: $fs28;
				line-height: 0.4rem;
			}
			
		}
	}
	
	
</style>