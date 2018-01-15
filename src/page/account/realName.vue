<template>
	<div id="realName">
		<mt-header title="实名认证" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<ul>
				<li>
					<i></i>
					<input type="text" class="input1" placeholder="请输入您的真实姓名"/>
				</li>
			</ul>
			<ul>
				<li>
					<i></i>
					<input type="text" class="input1" placeholder="请输入18位身份证号码"/>
				</li>
			</ul>
			<btn className="bluelg" name="确认" class="btn"></btn>
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	export default{
		name:"realName",
		components:{btn},
		data(){
			return{
				
			}
		},
		methods:{
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#realName{
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
		display: flex;
		flex-direction: column;
			ul{
				&:nth-child(1){
					li{
						position: relative;
						i{
							background: url(../../assets/images/account/realname_01.png);
							background-size: 100% 100%;
							position: absolute;
							top: 0.56rem;
							left: 0.3rem;	
							display: inline-block;
							width: 0.42rem;
							height: 0.42rem;
						}
					
					}
				}
				&:nth-child(2){
					li{
						position: relative;
						i{
							background: url(../../assets/images/account/realname_02.png);
							background-size: 100% 100%;
							position: absolute;
							top: 0.56rem;
							left: 0.3rem;	
							display: inline-block;
							width: 0.42rem;
							height: 0.42rem;
						}
					
					}
				}
				
			}
			.btn{
				margin-top: 0.3rem;
			}
			.input1{
				background-color: #1b1f26;
				border: 1px solid #12141a;
				outline: none;
				border-radius: 0.1rem;
				height: 0.88rem;
				width: 6.6rem;
				text-indent: 1rem;
				color: $white;
				margin-top: 0.3rem;
				&:hover{
					border-color: $blue;
				}
			}
	}
</style>