<template>
	<div id="tabbar">
		<mt-tabbar v-model="selected" fixed style="background-color:#2d3340;" >
			<mt-tab-item id="行情" style="background-color:#2d3340;" >  
			    <img slot="icon" src="../assets/images/quotation_01.png">  
			    <span style="color: #00a1f2;">行情 </span> 
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
		        <img slot="icon" src="../assets/images/mine_02.png">  
		         <span style="color: #7a8599;">我的 </span> 
	      	</mt-tab-item> 
    	</mt-tabbar> 
	</div>
</template>
<script>
	export default {
		name:"TabBar",
		data(){
			return{
				selected:"行情"
			}
		},
		watch:{
			selected:function(val){
				$("span").css("color","#7a8599");
				switch(val){
					case "我的":
						$("span").eq(3).css("color","#00a1f2");
						this.$router.push({path:'/account'});
						break;
					case "资讯":
						$("span").eq(2).css("color","#00a1f2")
						this.$router.push({path:'/information'});
						break;
					case "模拟交易":
						$("span").eq(1).css("color","#00a1f2")
						this.$router.push({path:'/mockTrading'});
						break;
					case "行情":
						$("span").eq(0).css("color","#00a1f2")
						this.$router.push({path:'/index'});
						break;
				}
			}
		}
	}
</script>

<style>
	@import "../assets/css/common.scss";
	#tabbar{
		width:7.5rem;
	}
</style>