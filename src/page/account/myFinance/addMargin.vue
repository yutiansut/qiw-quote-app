<template>
	<div id="addMargin">
		<mt-header title="追加保证金" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem;border-bottom: 1px solid #12141a;line-height: 1rem;">
		  	<router-link to="/account" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		    <router-link to="/customerServices" slot="right">
		    	<mt-button style="font-size: 0.24rem;color: #9ba8c2;">客服</mt-button>
		 	</router-link>
		</mt-header>
		<div id="container">
			<div class="ipt">
				<input type="text" placeholder="追加金额 请输入充值金额"/>
			</div>
			<div class="info">
				<ul>
					<li>余额：<span>1080.00</span>元</li>
					<li>换算汇率：<span>1美元=6.9人民币</span></li>
					<li>换算美元：<span>0.00</span>美元</li>
				</ul>
			</div>
			<div class="bt">
				<btn className="orangelg" name="立即追加"></btn>
			</div>
			<div class="warn">
				<ul>
					<li>温馨提示：</li>
					<li>1.<span>最低追加保证金额为5元。</span></li>
					<li>2.<span>系统将在下个交易日前为您的操盘账户追加保证金。</span></li>
					<li>3.<span>追加成功后，系统将短信通知您。</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import btn from "../../../components/btn.vue"
	export default{
		name:"addMargin",
		components:{btn},
		data(){
			return{
				
			}
		}
	}
</script>


<style scoped lang="scss">
	@import "../../../assets/css/common.scss";
	#addMargin{
		width: 7.5rem;
		color:$fontBlue ;
	}
	#back{
		background: url(../../../assets/images/back_icon.png) no-repeat;
		display: inline-block;
		width: 0.24rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		.ipt{
			width: 100%;
			padding: 0 0.3rem;
			height: 1.5rem;
			border-bottom: 1px solid #12141a;
			input{
				width: 100%;
				height: 0.9rem;
				margin-top: 0.3rem;
				border: 1px solid #12141a;
				border-radius: 0.1rem;
				background-color: #1b1f26;
				color: $white;
				text-indent: 0.24rem;
				font-size: $fs28;
			}
		}
		.info{
			height: 2.4rem;
			ul{
				li{
					&:nth-child(1){
						height: 0.6rem;
						background-color: $titleBlue;
						line-height: 0.6rem;
						font-size: $fs24;
					}
						height: 0.9rem;
						line-height:0.9rem;
						border-bottom: 1px solid #12141a;
						font-size: $fs28;
						text-indent: 0.5rem;
						span{
							color: $white;
							margin: 0.1rem;
						}
				}
			}
		}
		.bt{
			width: 100%;
			text-align: center;
			height: 1.5rem;
			border-bottom: 1px solid #12141a;
			padding-top: 0.3rem;
		}
		.warn{
			width: 100%;
			ul{
				li{
					padding:0 0.3rem; 
					&:nth-child(1){
						height: 0.6rem;
						line-height: 0.6rem;
						background-color:$titleBlue;
						margin-bottom: 0.3rem;
						border-bottom: 1px solid #12141a;
					}
					line-height: 0.4rem;	
					span{
						color: $white
					}
				}
			}
		}
	}
</style>