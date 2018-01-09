<template>
	<div id="help">
		<mt-header title="意见反馈" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<mt-navbar v-model="selected" class="navbar">
			    <mt-tab-item id="1">自选相关</mt-tab-item>
			    <mt-tab-item id="2">交易相关</mt-tab-item>
			    <mt-tab-item id="3">兑换相关</mt-tab-item>
			    <mt-tab-item id="4">提醒相关</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected" >
			    <mt-tab-container-item id="1">
			    	<mt-cell v-for="n in 10" :title="'内容 ' + n" />
			    </mt-tab-container-item>
			    	<mt-tab-container-item id="2">
			    <mt-cell v-for="n in 4" :title="'测试 ' + n" />
			   		</mt-tab-container-item>
			    <mt-tab-container-item id="3">
			   		<mt-cell v-for="n in 6" :title="'选项 ' + n" />
			    </mt-tab-container-item>
			    <mt-tab-container-item id="4">
			   		<mt-cell v-for="n in 3" :title="'不想加班' + n" />
			    </mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
	export default{
		name:"help",
		data(){
			return{
				selected:"自选相关"
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#help{
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
		border-top: 1px solid #12141a;
		.navbar{
			background-color: $bg;
		}
	}
</style>