<template>
	<div id="customerServices">
		<mt-header title="客服" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<mt-cell title="客服热线" class="cell" @click.native="call">
				<span>400-852-8008</span>
				<img slot="icon" src="../../assets/images/account/phone.png" width="24" height="24">
			</mt-cell>
			<mt-cell title="在线客服" class="cell" @click.native="online">
				<span>随时解疑</span>
				<img slot="icon" src="../../assets/images/account/online.png" width="24" height="24">
			</mt-cell>
		</div>
		<mt-actionsheet
		  :actions="arr"
		  v-model="sheetVisible">
		</mt-actionsheet>
	</div>
</template>

<script>
	export default{
		name:"customerServices",
		data(){
			return{
				sheetVisible:false,
				arr:[{name:"确认",method:this.sure}]
			}
		},
		methods:{
			sure:function(){
				console.log("111111")
			},
			call:function(){
				this.sheetVisible=true
			},
			online:function(){
				console.log("111111111111")
				this.$router.push({path:'/service'})
//				this.$router.push({path:'/myFinance'});	
			}
		}
	}
</script>


<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#customerServices{
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
		.cell{
			padding-left: 0.1rem;
			background-color: $bg;
			color: $fontBlue;
			border-bottom:1px solid #12141a;
			height: 0.9rem;
			span{
				color: $fontBlue;
				margin-right: 0.2rem;
			}
			img{
				margin-right: 0.2rem;
			}
		}
	}
</style>