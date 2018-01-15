<template>
	<div id="information_details">
		<mt-header title="资讯详情" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;">
		  	<router-link to="/information" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<h1>这里是详情的标题</h1>
			<img src="../../assets/images/test01.png" alt="" />
			<p>2018年12月12日</p>
			<p>【多部门将联手打击黑色产业链，代币、虚拟币类传销平台已经超过3000多家】据央视，公安部、最高检、最高法、工信部、央行等部门宣布：将采取联合治理模式，携手更多的政府部门和企业，提高打击网络黑色产业链力度，共同构建“网络安全共同体”。腾讯安全反诈骗实验室负责人李旭阳称，“最近利用所谓的区块链概念搞的代币、虚拟币这一块，我们就发现非常活跃的这种代币有两千多种，我们发现这种传销平台已经超过3000多家，这类的犯罪因为涉案金额非常大，而且危害是非常大的。”</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:"information_details",
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#information_details{
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