<template>
	<div id="remind">
		<template v-for="(v, index) in parameters">
		<div v-if="v.CommodityNo == currentNo">
		<header>
			<i class="icon icon_back" @touchstart="goBackEvent"></i>
			<div class="title">
				<div class="name fl">
					<span>{{v.CommodityName}}</span>
					<span>{{v.CommodityNo + v.MainContract}}</span>
				</div>
			</div>
		</header>
		<div class="main">
			<div class="title">
				<div class="row">
					<em :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</em>
					<em :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><i v-show="v.LastQuotation.ChangeRate > 0">+</i>{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</em>
					<em :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><i v-show="v.LastQuotation.ChangeRate > 0">+</i>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</em>
				</div>
				<div class="row">
					<span>提醒方式</span>
					<template v-for="(v, index) in remindWays">
						<div class="reminda_ways fl" @touchstart="checkEvent(index)">
							<i class="icon" :class="{icon_checked: v.status == 1, icon_check: v.status == 0}"></i>
							<span>{{v.name}}</span>
						</div>
					</template>
				</div>
				<div class="row">
					<p>实时智能盯盘，免费短信预警，不再担心错过行情，价格波动实时短信提醒，现已免费提供。</p>
				</div>
			</div>
			<div class="cont">
				<div class="row">
					<span class="type">价格上涨到</span>
					<input type="text" class="ipt_lg" v-model="remindList.lastPriceOverSomePrice" />
					<div class="switch lastPriceUp" @touchstart="switchEvent" :class="{current: remindList.lastPriceOverSomePriceIsOpen == 1}">
							<i class="icon icon_zero"></i>
						</transition>
					</div>
				</div>
				<div class="row">
					<span class="type">最近</span>
					<input type="text" class="ipt_sm" />
					<span>天最高价</span>
					<b>--</b>
				</div>
				<div class="row">
					<span class="type">价格下跌到</span>
					<input type="text" class="ipt_lg" v-model="remindList.lastPriceUnderSomePrice" />
					<div class="switch lastPriceDown" @touchstart="switchEvent" :class="{current: remindList.lastPriceUnderSomePriceIsOpen == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">最近</span>
					<input type="text" class="ipt_sm" />
					<span>天最低价</span>
					<b>--</b>
				</div>
				<div class="row">
					<span class="type">当日涨幅超过</span>
					<input type="text" class="ipt_sm" v-model="remindList.todayRiseRangePoint" />
					<span>%</span>
					<div class="switch changeUp" @touchstart="switchEvent" :class="{current: remindList.todayRiseRangePointIsOpen == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">当日跌幅超过</span>
					<input type="text" class="ipt_sm" v-model="remindList.todayFallRangePoint" />
					<span>%</span>
					<div class="switch changeDown" @touchstart="switchEvent" :class="{current: remindList.todayFallRangePointIsOpen == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">突破当日最高价</span>
					<div class="switch breakHightPrice" @touchstart="switchEvent" :class="{current: remindList.todayBreakHighestPriceIsOpen == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">突破当日最低价</span>
					<div class="switch breakLowPrice" @touchstart="switchEvent" :class="{current: remindList.todayBreakLowestPriceIsOpen == 1}">
						<i class="icon icon_zero"></i>
					</div>
				</div>
				<div class="row">
					<span class="type">提醒频率</span>
					<div class="fr" @touchstart="setRemindEvent">
						<span>{{remindList.remindFrequency | operateFrequency}}</span>
						<i class="icon icon_arrow"></i>
					</div>
				</div>
				<div class="row">
					<p>价格提醒服务，依赖于网络，可能出现通知延迟状况，请保持网络通畅。</p>
				</div>
			</div>
			<div class="btn_box">
				<btn name="完成" className="bluelg" @touchstart.native="saveEvent"></btn>
			</div>
		</div>
		</div>
		</template>
		<div class="select_box">
			<div class="bg" v-show="shadeShow"></div>
			<div class="select_cont">
				<ul>
					<li><span>提醒频率</span></li>
					<template v-for="v in remindFrequency">
						<li :class="{current: v.status == remindList.remindFrequency}" @touchstart="chooseRemindEvent(v.status)"><span>{{v.name}}</span></li>
					</template>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	export default {
		name: 'remind',
		components: {btn, },
		data(){
			return{
				commodityName: '',
				remindList: {},
				remindFrequency: [{
					name: '每日一次',
					status: '2'
				},{
					name: '仅一次',
					status: '1'
				},{
					name: '持续提醒',
					status: '3'
				}],
				remindWays: [{
					name: '短信提醒',
					status: 0,
				},{
					name: '通知提醒',
					status: 0,
				}],
				shadeShow: false,
				isOptional: false,
			}
		},
		computed: {
			parameters(){
				return this.$store.state.market.Parameters;
			},
			currentNo(){
				return this.$store.state.market.currentNo;
			},
			userInfo(){
				if(localStorage.user) return JSON.parse(localStorage.user);
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				return num.toFixed(dotsize);
			},
			operateFrequency: function(val){
				if(val == '1'){
					return '仅一次';
				}else if(val == '2'){
					return '每日一次';
				}else if(val == '3'){
					return '持续提醒';
				}
			}
		},
		methods: {
			goBackEvent: function(){
				this.$router.go(-1);
			},
			checkEvent: function(index){
				this.remindWays.forEach((o, i) => {
					if(i == index){
						if(o.status == 1){
							o.status = 0;
						}else{
							o.status = 1;
						}
					}
				});
			},
			setRemindEvent: function(){
				$(".select_cont").css({bottom: 0});
				this.shadeShow = true;
			},
			chooseRemindEvent: function(val){
				$(".select_cont").css({bottom: -3.5 + 'rem'});
				this.shadeShow = false;
				this.remindList.remindFrequency = val;
			},
			switchEvent: function(e){
				let obj = $(e.currentTarget).find('.icon_zero');
				if(obj.hasClass('current')){
					obj.removeClass('current');
					obj.css({'left': 0, 'background': '#525866'});
					if($(e.currentTarget).hasClass('lastPriceUp')){
						this.remindList.lastPriceOverSomePriceIsOpen = '0';
					}else if($(e.currentTarget).hasClass('lastPriceDown')){
						this.remindList.lastPriceUnderSomePriceIsOpen = '0';
					}else if($(e.currentTarget).hasClass('changeUp')){
						this.remindList.todayRiseRangePointIsOpen = '0';
					}else if($(e.currentTarget).hasClass('changeDown')){
						this.remindList.todayFallRangePointIsOpen = '0';
					}else if($(e.currentTarget).hasClass('breakHightPrice')){
						this.remindList.todayBreakHighestPriceIsOpen = '0';
					}else if($(e.currentTarget).hasClass('breakLowPrice')){
						this.remindList.todayBreakLowestPriceIsOpen = '0';
					}
				}else{
					obj.addClass('current');
					obj.css({'left': 0.48+'rem', 'background': '#00a1f2'});
					if($(e.currentTarget).hasClass('lastPriceUp')){
						this.remindList.lastPriceOverSomePriceIsOpen = '1';
					}else if($(e.currentTarget).hasClass('lastPriceDown')){
						this.remindList.lastPriceUnderSomePriceIsOpen = '1';
					}else if($(e.currentTarget).hasClass('changeUp')){
						this.remindList.todayRiseRangePointIsOpen = '1';
					}else if($(e.currentTarget).hasClass('changeDown')){
						this.remindList.todayFallRangePointIsOpen = '1';
					}else if($(e.currentTarget).hasClass('breakHightPrice')){
						this.remindList.todayBreakHighestPriceIsOpen = '1';
					}else if($(e.currentTarget).hasClass('breakLowPrice')){
						this.remindList.todayBreakLowestPriceIsOpen = '1';
					}
				}
			},
			saveEvent: function(){
				//是否自选
				this.isOptional = this.$route.query.isOptional;
				//提醒方式
				let _remindWays = [];
				this.remindWays.forEach((o, i) => {
					if(o.name == '短信提醒' && o.status == 1){
						_remindWays.push(1);
					}
					if(o.name == '通知提醒' && o.status == 1){
						_remindWays.push(2);
					}
				});
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				var datas = {
					'commodityNo': this.currentNo,
					'commodityName': this.commodityName,
					'remindType': _remindWays.join(','),
					'risePoint': this.remindList.lastPriceOverSomePrice,
					'risePointSwitch': this.remindList.lastPriceOverSomePriceIsOpen,
					'losePoint': this.remindList.lastPriceUnderSomePrice,
					'losePointSwitch': this.remindList.lastPriceUnderSomePriceIsOpen,
					'increase': this.remindList.todayRiseRangePoint,
					'increaseSwitch': this.remindList.todayRiseRangePointIsOpen,
					'decrease': this.remindList.todayFallRangePoint,
					'decreaseSwitch': this.remindList.todayFallRangePointIsOpen,
					'isBreakHighestPriceSwitch': this.remindList.todayBreakHighestPriceIsOpen,
					'isBreakLowestPriceSwitch': this.remindList.todayBreakLowestPriceIsOpen,
					'remindFrequency': this.remindList.remindFrequency,
					
				}
				pro.fetch('post', '/quoteTrader/saveRemindInfo', datas, headers).then((res) => {
					if(res.success == true && res.code == 1){
						if(this.isOptional == true){
							Toast({message: '提醒设置成功', position: 'bottom', duration: 1000});
							setTimeout(() => {
								this.$router.go(-1);
							}, 1000);
						}else{
							let info = {
								'exchangeNo': this.orderTemplist[this.currentNo].ExchangeNo,
								'commodityNo': this.currentNo,
								'contractNo': this.orderTemplist[this.currentNo].MainContract,
							}
							pro.fetch('post', '/quoteTrader/userAddCommodity', info, headers).then((res) => {
								if(res.success == true && res.code == 1){
									Toast({message: '提醒设置成功，已将该合约添加到自选', position: 'bottom', duration: 1000});
									setTimeout(() => {
										this.$router.go(-1);
									}, 1000);
								}
							}).catch((err) => {
								Toast({message: err.data.message, position: 'bottom', duration: 1000});
							});
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			getRemindInfo: function(){
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				var datas = {
					'commodityNo': this.currentNo,
				}
				pro.fetch('post', '/quoteTrader/getByIdAndCommodityNo', datas, headers).then((res) => {
					if(res.success == true && res.code == 1){
						console.log(res.data);
						this.remindList = res.data;
						this.commodityName = this.remindList.commodityName;
						//提醒方式
						let rmindWays = this.remindList.remindWay.split(',');
						rmindWays.forEach((o, i) => {
							if(o == '1'){
								this.remindWays[0].status = 1;
							}else if(o == '2'){
								this.remindWays[1].status = 1;
							}
						});
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			}
		},
		mounted: function(){
			//获取提醒相关信息
			this.getRemindInfo();
		}
		
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	header{
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		width: 7.5rem;
		height: 1rem;
		background: $bg;
		border-bottom: 0.01rem solid $black;
		padding: 0 0.3rem;
		box-sizing: border-box;
		.icon_back{
			width: 0.24rem;
			height: 1rem;
			background: url(../../assets/images/back_icon.png) no-repeat center 0.34rem;
			background-size: 0.24rem 0.32rem;
			position: fixed;
			top: 0;
			left: 0.3rem;
		}
		.title{
			margin: auto;
			.name{
				height: 1rem;
				text-align: center;
			}
			span{
				display: block;
				&:first-child{
					color: $white;
					font-size: $fs32;
					margin: 0.2rem 0 0.05rem 0;
				}
			}
		}
	}
	.main{
		margin-top: 1.01rem;
		.title{
			width: 7.5rem;
			height: 3rem;
			border-bottom: 0.15rem solid $black;
		}
		.cont{
			.type{
				width: 2rem;
			}
		}
		.btn_box{
			padding: 0.98rem 0.3rem 0.3rem 0.3rem;
		}
		.row{
			height: 0.96rem;
			overflow: hidden;
			border-bottom: 0.01rem solid $black;
			padding: 0 0.3rem;
			span{
				float: left;
				display: inline-block;
				line-height: 0.96rem;
				font-size: $fs28;
			}
			input{
				float: left;
				display: inline-block;
				height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.16rem 0;
				padding: 0 0.1rem;
				color: $white;
				&.ipt_lg{
					width: 2rem;
				}
				&.ipt_sm{
					width: 1rem;
					margin-right: 0.15rem;
				}
				&:focus{
					border-color: $blue;
				}
			}
			em{
				line-height: 0.96rem;
				margin-right: 0.15rem;
				&:first-child{
					font-size: 0.48rem;
					margin-right: 0.3rem;
				}
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
			b{
				color: $white;
				font-weight: bold;
				line-height: 0.96rem;
				margin-left: 0.05rem;
			}
			.icon_arrow{
				width: 0.22rem;
				height: 0.96rem;
				background: url(../../assets/images/arrow.png) no-repeat right 0.38rem;
				background-size: 0.12rem 0.2rem;
			}
			.switch{
				float: right;
				width: 0.96rem;
				height: 0.48rem;
				background: #1b1f26;
				border-radius: 0.24rem;
				border: 0.01rem solid $black;
				margin: 0.24rem 0;
				position: relative;
				.icon_zero{
					width: 0.4rem;
					height: 0.4rem;
					background: #525866;
					border-radius: 100%;
					position: absolute;
					top: 0.04rem;
					left: 0.04rem;
					transition: all .2s;
				}
				&.current{
					.icon_zero{
						left: 0.48rem;
						background: $blue;
					}
				}
			}
			.reminda_ways{
				float: right;
				margin-left: 0.3rem;
				span{
					font-size: $fs24;
				}
				.icon{
					float: left;
					width: 0.24rem;
					height: 0.96rem;
					margin: 0 0.1rem 0 0;
					&.icon_check{
						background: url(../../assets/images/check.png) no-repeat center 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
					&.icon_checked{
						background: url(../../assets/images/checked.png) no-repeat center 0.36rem;
						background-size: 0.24rem 0.24rem;
					}
				}
			}
			p{
				line-height: 0.38rem;
				color: $white;
				margin-top: 0.1rem;
			}
		}
	}
	.select_box{
		.select_cont{
			position: fixed;
			bottom: -3.5rem;
			left: 0;
			z-index: 100;
			width: 7.5rem;
			height: 3.5rem;
			background: $white;
			transition: all 0.3s;
			li{
				width: 7.5rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-bottom: 0.01rem solid #e6e6e6;
				&:first-child{
					span{
						font-weight: bold;
					}
				}
				&.current{
					span{
						color: $blue;
					}
				}
				span{
					color: #1a1a1a;
					font-size: $fs28;
				}
			}
		}
	}
</style> 