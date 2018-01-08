<template>
	<div>
		<mt-tabbar v-model="selected" fixed style="background-color:#2d3340;">  
	      	<mt-tab-item id="行情" style="background-color:#2d3340;">  
			    <img slot="icon" src="../assets/images/quotation_02.png">  
			    <span style="color: #7a8599;">行情 </span> 
			</mt-tab-item>  
		   	<mt-tab-item id="模拟交易" style="background-color:#2d3340;">  
		        <img slot="icon" src="../assets/images/mockTrading_02.png">  
		        <span style="color: #7a8599;">模拟交易 </span>  
		    </mt-tab-item>  
		    <mt-tab-item id="资讯" style="background-color:#2d3340;">  
		        <img slot="icon" src="../assets/images/information_02.png">  
		        <span style="color: #7a8599;">资讯 </span> 
		    </mt-tab-item>  
		    <mt-tab-item id="我的" style="background-color:#2d3340;">  
		        <img slot="icon" src="../assets/images/mine_01.png">  
		         <span style="color: #00a1f2;">我的 </span> 
	      	</mt-tab-item>  
    	</mt-tabbar> 
	</div>
	
</template>

<script>
	export default {
		name:"TabBar",
		data(){
			return{
				selected:"我的"
			}
		},
		watch:{
			selected:function(val){
				switch(val){
					case "我的":
						console.log("111");
						break;
					case "资讯":
						console.log("222222");
						break;
					case "模拟交易":
						console.log("333");
						break;
					case "行情":
						console.log("444");
						break;
				}
			}
		}
	}
</script>

<style>
</style>