<template>
	<div id="feedBack">
		<mt-header title="意见反馈" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<div class="title_lev2">
				选择反映类型
			</div>
			<div class="type">
				<ul>
					<!--<li class="current">程序bug</li>
					<li>功能建议</li>
					<li>行情相关</li>
					<li>其他</li>-->
					<li v-for="(k,index) in choose" @click="check(index,$event)" :class="{current:current1 == index}">{{k.name}}</li>
				</ul>
			</div>
			<div class="title_lev2">
				反馈内容
			</div>
			<div class="content">
				<!--<input type="text" placeholder="您可以留下您的意见或者建议，谢谢"/>-->
				<textarea  cols="30" rows="10" placeholder="您可要留下您的意见或者建议，谢谢" v-model="suggest"></textarea>
			</div>
			<div class="title_lev2">
				请填写您的联系方式
			</div>
			<div class="phone">
				<input type="text" placeholder="手机号或者微信号" v-model="phone"/>
			</div>
			<btn className="bluelg" name="提交" class="btn" @click.native="submit"></btn>
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import pro from "../../assets/js/common.js"
	export default{
		name:"feedBack",
		components:{btn},
		data(){
			return{
				choose:[{name:"程序bug"},{name:"功能建议"},{name:"行情相关"},{name:"其他"}],
				current1:0,
				phone:"",
				suggest:""
			}
		},
		methods:{
			check:function(index,e){
				this.current1 = index;
			},
			submit:function(){
				if(this.suggest == ''){
					this.$toast({message: '内容至少输入5个字',duration: 1000});
				}else if(this.phone == ''){
					this.$toast({message: '请正确填写联系方式',duration: 1000});
				}else{
					console.log("suggest=="+this.suggest);
//					var data = {
//						
//					}
//					pro.fetch("post","/",data,headers).then((res)={
//						if(res.code == 1 && res.success == true){
							
//							this.$toast({message: '提交成功',duration: 1000});
//						}
//					}).catch((err)=>{
//						var data = err.data;
//						if(data == undefined){
//							this.$toast({message: '网络不给力，请稍后重试',duration: 1000});
//						}else{
//							this.$toast({message:data.message,duration: 1000});
//						}
//					})
				}
			},
			getinfo:function(){
//				pro.fetch("post","/",data,headers).then((res)=>{
//				
//				}).catch((err)=>{
//				
//				})
			}
		},
		mounted:function(){
			this.getinfo();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#feedBack{
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
		text-align: center;
		width: 100%;
		margin-top: 1rem;
		.title_lev2{
			height: 0.64rem;
			width: 100%;
			line-height: 0.64rem;
			text-align: left;
			padding-left: 0.4rem;
			border-bottom: 1px solid #12141a;
			background-color: $titleBlue;
			color: $fontBlue;
		}
		.type{
			ul{
				display: flex;
				flex-wrap: wrap;
				border-bottom:1px solid #12141a;
				li{
					height: 0.9rem;
					line-height: 0.9rem;
					text-align: center;
					width: 33%;
					color:$white; 
					&:nth-child(1){
						border-bottom:1px solid #12141a;
						border-right: 1px solid #12141a;
					}
					&:nth-child(2){
						border-bottom:1px solid #12141a;
						border-right: 1px solid #12141a;
					}
					&:nth-child(3){
						border-bottom:1px solid #12141a;
					}
					&:nth-child(4){
						border-right: 1px solid #12141a;
					}
				}
			}
			.current{
				color: $blue;
				background-color:$lightBlue ;
			}
		}
		.content{
			width: 100%;
			height: 2.4rem;
			textarea{
				width: 100%;
				height: 2.4rem;
				background-color: $bg;
				border: none;
				border-bottom:1px solid #12141a;
				color: $white;
				text-indent: 0.3rem;
				font-size: $fs28;
			}
		}
		.phone{
			width: 100%;
			padding: 0 0.3rem;
			border-bottom:1px solid #12141a;
			height: 1.5rem;
			input{
				width: 6.6rem;
				height: 0.9rem;
				margin-top: 0.3rem;
				border: 1px solid #12141a;
				border-radius: 0.1rem;
				background-color: #1b1f26;
				text-indent: 0.3rem;
				color: $white;
			}
		}
		.btn{
			position: fixed;
			bottom: 0.3rem;
			margin-left: 0.3rem;
		}
	}
</style>