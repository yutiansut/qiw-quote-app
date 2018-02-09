<template>
	<div id="customerServices">
		<mt-header title="客服" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="" slot="left">
		    	<i id="back" @click="backRounter"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<ul @click="call">
				<li><img src="../../assets/images/account/phone.png" ></li>
				<li>客服热线</li>
				<li>400-852-8008</li>
			</ul>
			<ul @click="online">
				<li><img src="../../assets/images/account/online.png" ></li>
				<li>在线客服</li>
				<li>随时解疑</li>
			</ul>
		</div>
		<mt-actionsheet
		  :actions="arr"
		  v-model="sheetVisible"
		  id="btmTop">
		</mt-actionsheet>
	</div>
</template>

<script>
	export default{
		name:"customerServices",
		data(){
			return{
				sheetVisible:false,
				arr:[{name:"400-852-8008"},{name:"工作日08:00-24:00,周末09:00-17:00"},{name:"拨打",method:this.callphone}],
			}
		},
		methods:{
			backRounter:function(){
				this.$router.back(-1)
			},
			callphone:function(){
				window.location.href = 'tel://' + 4008528008;
			},
			call:function(){
				this.sheetVisible=true
			},
			online:function(){
				this.$router.push({path:'/service'})
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
		display: flex;
		flex-direction: column;
		ul{
			height: 0.9rem;
			border-bottom: 1px solid #12141a;
			line-height: 0.9rem;
			padding: 0 0.3rem;
			li{
				float: left;
				&:last-child{
					float: right;
				}
				img{
					display: block;
					width: 0.4rem;
					height: 0.4rem;
					margin-top: 0.25rem;
					margin-right: 0.2rem;
				}
			}
		}
	}
	
</style>