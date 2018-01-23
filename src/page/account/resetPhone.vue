<template>
	<div id="resetPhone">
		<mt-header title="修改手机号" fixed style="background-color:#242933;font-size: 0.32rem;height: 1rem; border-bottom: 1px solid #12141a;">
		  	<router-link to="/personalSet" slot="left">
		    	<i id="back"></i>
		  	</router-link>
		</mt-header>
		<div id="container">
			<div class="info">
				<p>您现在正在为账户&nbsp;{{mobile}}&nbsp;修改手机号</p>
			</div>
			<div class="phoneNumber">
				手机号:<span>{{mobile}}</span>
			</div>
			<div id="ipt">
				<ul>
					<li>
						<input type="text" class="input1" placeholder="短信验证"/>
						<i @click="getcode">{{volid ? info : (time + '秒')}}</i>
					</li>
				</ul>
				<ul>
					<li>
						<input type="text" class="input1" placeholder="新手机号"/>
					</li>
				</ul>
				<ul>
					<li>
						<input type="text" class="input1" placeholder="新验证码"/>
						<i @click="getcode1">{{volid1 ? info : (time1 + '秒')}}</i>
					</li>
				</ul>
				<mt-button class="btn">确认</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"resetPhone",
		data(){
			return{
				phone:"",
				mobile:"",
				userInfo:"",
				info:"获取验证码",
				time: 0,
				time1:0
			}
		},
		computed: {
			PATH: function(){
				return this.$store.getters.PATH;
			},
			volid: function(){
				if(this.time <= 0){
					return true
				}else{
					return false
				}
			},
			environment(){
				return this.$store.state.environment;
			},
			version: function(){
				return '1.1';
			},
			volid1:function(){
				if(this.time1 <= 0){
					return true
				}else{
					return false
				}
			}
		},
		methods:{
			getcode :function(e){
					//页面效果
					$(e.target).addClass('current');
					this.time = 60;
					var timing = setInterval(function(){
						this.time--;
						if(this.time <= 0){
							clearInterval(timing);
							$(e.target).removeClass('current');
						}
					}.bind(this), 1000);
			},
			getcode1:function(e){
				//页面效果
					$(e.target).addClass('current');
					this.time1 = 60;
					var timing = setInterval(function(){
						this.time1--;
						if(this.time1 <= 0){
							clearInterval(timing);
							$(e.target).removeClass('current');
						}
					}.bind(this), 1000);
			}
		},
		mounted:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.phone = this.$route.query.phone;
			var phone = this.$route.query.phone;
			this.mobile = phone.substr(0, 3) + '****' + phone.substr(7);
		},
		activited:function(){
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.phone = this.$route.query.phone
			this.wxNickname = this.$route.query.wxNickname
		}
	}
</script>
<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#resetPhone{
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
		.info{
			height: 0.64rem;
			border-bottom: 1px solid #12141a;
			line-height: 0.64rem;
			background-color: $titleBlue;
			padding: 0 0.3rem;
		}
		.phoneNumber{
			height: 0.9rem;
			line-height: 0.9rem;
			padding: 0 0.3rem;
			border-bottom: 1px solid #12141a;
			span{
				color: $white;
				margin-left:0.2rem;
			}
		}
		#ipt{
			padding: 0 0.3rem;
			display: flex;
			flex-direction: column;
			ul{
				li{
					position: relative;
					i{
						position: absolute;
						top: 0.34rem;
						right: 0;
						display: block;
						width: 1.7rem;
						height: 0.88rem;
						background-color: $titleBlue;
						text-align: center;
						line-height: 0.88rem;
						border-radius: 0 0.1rem 0.1rem 0;
						border-left: 1px solid #12141a;
						color: $fontBlue;
						span{
							color: $blue;
							margin: 0 0.06rem;
						}
					}
				}
			}
			.btn{
				margin-top: 0.3rem;
				width:100%;
				height: 0.8rem;
				background-color: $blue;
				color: $white;
				border: none;
			}
			.input1{
				background-color: #1b1f26;
				border: 1px solid #12141a;
				outline: none;
				border-radius: 0.1rem;
				height: 0.88rem;
				width: 6.6rem;
				text-indent: 0.2rem;
				color: $white;
				margin-top: 0.3rem;
			}
		}
	}
</style>