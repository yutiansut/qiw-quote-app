<template>
	<div id="tabbar">
    	<li v-for="k in navList" @click="toPages">
    		<img :src="k.src" alt="" />
    		<p>{{k.name}}</p>
    	</li>
	</div>
</template>
<script>
	export default {
		name:"TabBar",
		data(){
			return{
				navList: [{
						name: '行情',
						src: require('../assets/images/quotation_02.png')
					},
					{
						name: '模拟交易',
						src: require('../assets/images/mockTrading_02.png')
					},
					{
						name: '资讯',
						src: require('../assets/images/information_02.png')
					},
					{
						name: '我的',
						src: require('../assets/images/mine_02.png')
					}
				]
			}
		},
		computed:{
			routepath(){
				return this.$route.path;
			}
		},
		methods:{
			toPages: function(e) {
				var tar = e.currentTarget.children[1].innerHTML;
				switch(tar) {
					case '行情':
						this.$router.push({
							path: '/index'
						});
						break;
					case '模拟交易':
						this.$router.push({
							path: '/tradeLogin'
						});
						break;
					case '资讯':
						this.$router.push({
							path: '/information'
						});
						break;
					case '我的':
						if(!localStorage.user) {
							this.$router.push({
								path: '/login'
							});
							return;
						}
						this.$router.push({
							path: '/account'
						});
						break;
				}
			}
		},
		watch:{
			routepath:function(n,o){
				switch(n){
					case '/index':
						$('li>p').removeClass('current');
						$('li:first-child>p').addClass('current');
						this.navList[0].src = require('../assets/images/quotation_01.png');
						this.navList[1].src = require('../assets/images/mockTrading_02.png');
						this.navList[2].src = require('../assets/images/information_02.png');
						this.navList[3].src = require('../assets/images/mine_02.png');
						break;
					case '/tradeLogin':
						$('li>p').removeClass('current');
						$('li:nth-child(2)>p').addClass('current');
						this.navList[0].src = require('../assets/images/quotation_02.png');
						this.navList[1].src = require('../assets/images/mockTrading_01.png');
						this.navList[2].src = require('../assets/images/information_02.png');
						this.navList[3].src = require('../assets/images/mine_02.png');
						break;
					case '/information':
						$('li>p').removeClass('current');
						$('li:nth-child(3)>p').addClass('current');
						this.navList[0].src = require('../assets/images/quotation_02.png');
						this.navList[1].src = require('../assets/images/mockTrading_02.png');
						this.navList[2].src = require('../assets/images/information_01.png');
						this.navList[3].src = require('../assets/images/mine_02.png');
						break;
					case '/account':
						$('li>p').removeClass('current');
						$('li:nth-child(4)>p').addClass('current');
						this.navList[0].src = require('../assets/images/quotation_02.png');
						this.navList[1].src = require('../assets/images/mockTrading_02.png');
						this.navList[2].src = require('../assets/images/information_02.png');
						this.navList[3].src = require('../assets/images/mine_01.png');
						break;
				}
			}
		},
		mounted: function() {
			var path = this.$route.path;
//			console.log(path)
			switch(path) {
				case '/index':
					$('li>p').removeClass('current');
					$('li:first-child>p').addClass('current');
					this.navList[0].src = require('../assets/images/quotation_01.png');
					break;
				case '/tradeLogin':
					$('li>p').removeClass('current');
					$('li:nth-child(2)>p').addClass('current');
					this.navList[1].src = require('../assets/images/mockTrading_01.png');
					break;
				case '/information':
					$('li>p').removeClass('current');
					$('li:nth-child(3)>p').addClass('current');
						this.navList[2].src = require('../assets/images/information_01.png');
					break;
				case '/account':
					$('li>p').removeClass('current');
					$('li:nth-child(4)>p').addClass('current');
					this.navList[3].src = require('../assets/images/mine_01.png');
					break;
				default:
					$('li>p').removeClass('current');
					$('li:first-child>p').addClass('current');
					this.navList[0].src = require('../assets/images/quotation_01.png');
					break;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";
	#tabbar{
		width: 7.5rem;
		height: 1rem;
		position: fixed;
		bottom: 0;
		background-color:$titleBlue ;
		display: flex;
		justify-content: space-around;
		border-top: 1px solid #12141a;
		li{
			width: 1.2rem;
			display:flex;
			flex-direction: column;
			text-align: center;
			font-size: 0.2rem;
			p{
				margin-top: 0.08rem;
				color: $fontBlue;
			}
			img{
				margin-left: 0.4rem;
				width: 0.4rem;
				height: 0.4rem;
				margin-top: 0.15rem;
			}
		}
		.current{
			color: $blue;
		}
	}
</style>