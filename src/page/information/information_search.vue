<template>
	<div id="information_search">
		<div class="search">
			<i></i>
			<input type="text" placeholder="请输入你感兴趣的内容"/>
			<span @click="back">取消</span>
		</div>
		<div class="showInfo">
			<div class="title">
				<span class="current">7x24</span>
				<span>要闻</span>
			</div>
			<div class="exist" v-for="n in 5">
				<ul>
					<li>16:44</li>
					<li>【多部门将联手打击黑色产涉案金额非常大，而且危害是非常大的。”</li>
				</ul>
			</div>
			<div class="none">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"information_search",
		data(){
			return{
			}
		},
		methods:{
			back:function(){
				this.$router.push({path:'/information'})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	
	#information_search{
		width: 7.5rem;
		.search{
			height:1rem;
			line-height:1rem;
			border-bottom: 1px solid #12141a;
			position:relative;
			i{
				position: absolute;
				top: 0.3rem;
				left: 0.6rem;
				background: url(../../assets/images/search.png);
				width: 0.4rem;
				height: 0.4rem;
				display: inline-block;
				background-size: 100% 100%;
			}
			input{
				background-color: #1b1f26;
				width: 6.9rem;
				height: 0.64rem;
				margin-left: 0.3rem;
				border-radius: 0.1rem;
				text-indent: 1.16rem;
				color: $white;
				border: 1px solid #12141a;
			}
			span{
				position: absolute;
				right: 0.6rem;
				color: $fontBlueTitle;
			}
		}
		.showInfo{
			width: 100%;
			.title{
				background-color: $titleBlue;
				height: 0.8rem;
				line-height: 0.8rem;
				padding: 0 0.3rem;
				border-bottom: 1px solid #12141a;
				span{
					margin-right: 0.4rem;
				}
			}
			.current{
				color: $blue;
			}
			.exist{
				border-bottom: 1px solid #12141a;
				padding: 0 0.3rem;
				li{
					&:nth-child(1){
						height: 0.6rem;
						line-height: 0.6rem;
					}
					&:nth-child(2){
						font-size: $fs28;
						color: $white;
						line-height: 0.6rem;
					}
				}
			}
		}
	}
</style>