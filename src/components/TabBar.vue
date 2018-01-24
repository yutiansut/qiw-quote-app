<template>
	<div id="tabbar">
		<mt-tabbar v-model="message" fixed style="background-color:#2d3340;" >
			<mt-tab-item id="行情" style="background-color:#2d3340;" >  
			    <img slot="icon" v-bind:src="this.atabs[0]">  
			    <span>行情 </span> 
			</mt-tab-item> 
      		<mt-tab-item id="模拟交易" style="background-color:#2d3340;">  
		        <img slot="icon" v-bind:src="this.atabs[1]" >  
		        <span>模拟交易 </span>  
		    </mt-tab-item> 
      		<mt-tab-item id="资讯" style="background-color:#2d3340;">  
		        <img slot="icon" v-bind:src="this.atabs[2]">  
		        <span>资讯 </span> 
		    </mt-tab-item>
      		<mt-tab-item id="我的" style="background-color:#2d3340;">  
		        <img slot="icon" v-bind:src="this.atabs[3]" >  
		         <span>我的 </span> 
	      	</mt-tab-item> 
    	</mt-tabbar> 
	</div>
</template>
<script>
	export default {
		name:"TabBar",
		data(){
			return{
				message:this.selected,
				 atabs:this.tabs
			}
		},
		props:['selected','tabs'],
		watch:{
			 message: function (val,oldVal) {
			 	console.log("val==="+val);
			 	console.log("oldval=="+oldVal);
			 	console.log("selected==="+this.selected);
	            switch(val){
	                case '行情':
	                    this.$router.push({path:'/index'});
	                break;
	                case '模拟交易':
	                    this.$router.push({path:'/trade'});
	                break;
	                case '资讯':
	                    this.$router.push({path:'/information'});
	                break;
	                case '我的':
	                    this.$router.push({path:'/account'});
	                break;
	            }
	        }
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	#tabbar{
		width:7.5rem;
	}
	.mint-tab-item .mint-tab-item-label span{
		color:$fontBlueTitle;
	}
	.is-selected .mint-tab-item-label span{
		color: $blue;
	}
</style>