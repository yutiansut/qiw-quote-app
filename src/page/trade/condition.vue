<template>
	<div id="condition">
		<div class="order_type">
			<template v-for="(v, index) in tabList">
				<span :class="{current: currentNum == index}" @click="tabEvent(index)">{{v}}</span>
			</template>
		</div>
		<div class="list">
			<ul v-if="tabShow">
				<li>
					<div class="list_title">
						<span class="name">合约名称</span>
						<span class="num">状态</span>
						<span class="name">类型</span>
						<span class="status">条件</span>
						<span class="status">下单</span>
						<span class="name">有效日期</span>
						<span class="status">下单时间</span>
					</div>
				</li>
				<template v-for="(v, index) in conditionListCont">
					<li :class="{current: selectedNum == index}" @click="clickEvent(index, v.ConditionNo, v.Status, v.ConditionType)">
						<div class="list_cont">
							<div class="name">
								<em>{{orderTemplist[v.CommodityNo].CommodityName}}</em>
								<em>{{v.name}}</em>
							</div>
							<span class="num">{{v.status00}}</span>
							<span class="name">{{v.type}}</span>
							<span class="status">{{v.conditions}}</span>
							<span class="status">{{v.order}}</span>
							<span class="name">{{v.term}}</span>
							<span class="status">{{v.time}}</span>
						</div>
						<div class="tools" v-show="v.toolShow">
							<btn name="暂停" className="orangesm"></btn>
							<btn name="修改" className="bluesm" @tap.native="editEvent"></btn>
							<btn name="删除" className="greensm"></btn>
						</div>
					</li>
				</template>
			</ul>
			<ul v-if="!tabShow">
				<li>
					<div class="list_title">
						<span class="name">合约名称</span>
						<span class="num">状态</span>
						<span class="name">类型</span>
						<span class="status">条件</span>
						<span class="status">下单</span>
						<span class="name">有效日期</span>
						<span class="status">下单时间</span>
					</div>
				</li>
				<template v-for="v in triggerConditionListCont">
					<li>
						<div class="list_cont">
							<div class="name">
								<em>{{orderTemplist[v.CommodityNo].CommodityName}}</em>
								<em>{{v.name}}</em>
							</div>
							<span class="num">{{v.status00}}</span>
							<span class="name">{{v.type}}</span>
							<span class="status">{{v.conditions}}</span>
							<span class="status">{{v.order}}</span>
							<span class="name">{{v.term}}</span>
							<span class="status">{{v.time}}</span>
						</div>
					</li>
				</template>
			</ul>
		</div>
		<conditionTime ref="conditionTime"></conditionTime>
	</div>
</template>

<script>
	import btn from "../../components/btn.vue"
	import conditionTime from "./conditionTime.vue"
	export default{
		name: "condition",
		components: {btn, conditionTime},
		data(){
			return{
				tabList: ['未触发列表','已触发列表'],
				currentNum: 0,
				tabShow: true,
				conditionListCont: [],
				triggerConditionListCont: [],
				selectedNum: -1,
				currentId: '',
				status: '',
				statusName: '暂停',
				currentConditionOrder: '',
				conditionType: '',
//				showPriceDialog: false,
//				showTimeDialog: false,
				lastPrice: '',
				conditionNum: '',
				conditionPrice: '',
				conditionTime: '',
				additionPrice: '',
				priceType: '0',
				priceTypeName: '>',
				additionalPriceType: '0',
				additionalPriceTypeName: '>',
				directionType: '0',
				directionTypeName: '买入',
				orderType: '1',
				orderTypeName: '市价',
			}
		},
		computed: {
			conditionList(){
				return this.$store.state.market.conditionList;
			},
			triggerConditionList(){
				return this.$store.state.market.triggerConditionList;
			},
			tradeSocket(){
				return this.$store.state.tradeSocket;
			},
			orderTemplist(){
				return	this.$store.state.market.orderTemplist;
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
		},
		watch: {
			parameters: function(n,o){
				if(this.currentConditionOrder.CommodityNo != undefined){
					n.forEach(function(o, i){
						if(this.currentConditionOrder.CommodityNo == o.CommodityNo){
							this.lastPrice = this.orderTemplist[this.currentConditionOrder.CommodityNo].LastQuotation.LastPrice;
							this.lastPrice = parseFloat(this.lastPrice).toFixed(this.orderTemplist[this.currentConditionOrder.CommodityNo].DotSize);
						}
					}.bind(this));
				}
			},
			conditionList: function(n, o){
				this.regroupConditionList();
			},
			triggerConditionList: function(n, o){
				this.regroupTriggerConditionList();
			},
			additionPrice: function(n, o){
				if(n == 0){
					this.additionPrice = '';
				}
			}
		},
		methods: {
			tabEvent: function(index){
				this.currentNum = index;
				if(index == 0){
					this.tabShow = true;
				}else{
					this.tabShow = false;
					this.regroupTriggerConditionList();
				}
			},
			clickEvent: function(index, id, status, type){
				this.selectedNum = index;
				this.currentId = id;
				this.status = status;
				this.conditionType = type;
				if(this.status == 0){
					this.statusName = '暂停';
				}else{
					this.statusName = '启动';
				}
				this.conditionListCont.forEach((o, i) => {
					o.toolShow = false;
					if(o.ConditionNo == id) o.toolShow = true;
				});
				
			},
			suspendConditionOrder: function(){
				if(this.currentId == '' || this.currentId == undefined){
					layer.msg('请选择一条数据', {time: 1000});
					return;
				}
				var b, msg;
				this.conditionListCont.forEach(function(o,i){
					if(this.currentId == o.ConditionNo){
						if(o.Status == 0){    //如果处于运行中，则暂停
							msg = '是否暂停条件单？';
							b = {
								"Method": 'ModifyCondition',
								"Parameters": {
									"ConditionNo": o.ConditionNo,
									"ModifyFlag": 2, //暂停
									"Num": o.Num,
									"ConditionType": o.ConditionType,
									"PriceTriggerPonit": o.PriceTriggerPonit,
									"CompareType": o.CompareType,
									"TimeTriggerPoint": o.TimeTriggerPoint,
									"AB_BuyPoint": o.AB_BuyPoint,
									"AB_SellPoint": o.AB_SellPoint,
									"OrderType": o.OrderType,
									"StopLossType": o.StopLossType,
									"Direction": o.Drection,
									"StopLossDiff": 0.0,
									"StopWinDiff": 0.0,
									"AdditionFlag": o.AdditionFlag,
									"AdditionType": o.AdditionType,
									"AdditionPrice": o.AdditionPrice
								}
							};
						}else if(o.Status == 1){
							msg = '是否启动条件单？';
							b = {
								"Method": 'ModifyCondition',
								"Parameters": {
									"ConditionNo": o.ConditionNo,
									"ModifyFlag": 3, //启动
									"Num": o.Num,
									"ConditionType": o.ConditionType,
									"PriceTriggerPonit": o.PriceTriggerPonit,
									"CompareType": o.CompareType,
									"TimeTriggerPoint": o.TimeTriggerPoint,
									"AB_BuyPoint": o.AB_BuyPoint,
									"AB_SellPoint": o.AB_SellPoint,
									"OrderType": o.OrderType,
									"StopLossType": o.StopLossType,
									"Direction": o.Drection,
									"StopLossDiff": 0.0,
									"StopWinDiff": 0.0,
									"AdditionFlag": o.AdditionFlag,
									"AdditionType": o.AdditionType,
									"AdditionPrice": o.AdditionPrice
								}
							};
						}
						layer.confirm(msg, {
							btn: ['确定','取消']
						}, function(index){
							this.tradeSocket.send(JSON.stringify(b));
							this.currentId = '';
							this.selectedNum = -1;
							layer.close(index);
						}.bind(this));
					}
				}.bind(this));
			},
			editEvent: function(){
				this.$refs.conditionTime.show = true;
			},
			deleteConditionOrder: function(){
				if(this.currentId == '' || this.currentId == undefined){
					layer.msg('请选择一条数据', {time: 1000});
					return;
				}
				this.conditionListCont.forEach(function(o, i){
					if(this.currentId == o.ConditionNo){
						let b = {
							"Method": 'ModifyCondition',
							"Parameters": {
								"ConditionNo": o.ConditionNo,
								"ModifyFlag": 1, //删除
								"Num": o.Num,
								"ConditionType": o.ConditionType,
								"PriceTriggerPonit": o.PriceTriggerPonit,
								"CompareType": o.CompareType,
								"TimeTriggerPoint": o.TimeTriggerPoint,
								"AB_BuyPoint": o.AB_BuyPoint,
								"AB_SellPoint": o.AB_SellPoint,
								"OrderType": o.OrderType,
								"StopLossType": o.StopLossType,
								"Direction": o.Drection,
								"StopLossDiff": 0.0,
								"StopWinDiff": 0.0,
								"AdditionFlag": o.AdditionFlag,
								"AdditionType": o.AdditionType,
								"AdditionPrice": o.AdditionPrice
							}
						};
						layer.confirm('是否删除条件单？', {
							btn: ['确定','取消']
						}, function(index){
							this.tradeSocket.send(JSON.stringify(b));
							this.currentId = '';
							this.selectedNum = -1;
							layer.close(index);
						}.bind(this));
					}
				}.bind(this));
			},
			regroupConditionList:function(){
				this.conditionListCont = [];
				this.conditionList.forEach(function(o, i){
					let obj = {};
					obj.AB_BuyPoint = o.AB_BuyPoint;
					obj.AB_SellPoint = o.AB_SellPoint;
					obj.AdditionFlag=o.AdditionFlag;
					obj.AdditionPrice = o.AdditionPrice;
					obj.AdditionType = o.AdditionType;
					obj.CommodityNo = o.CommodityNo;
					obj.CompareType = o.CompareType;
					obj.ConditionNo = o.ConditionNo;
					obj.ConditionType = o.ConditionType;
					obj.ContractNo = o.ContractNo;
					obj.Drection = o.Drection;
					obj.ExchangeNo = o.ExchangeNo;
					obj.InsertDateTime = o.InsertDateTime;
					obj.Num = o.Num;
					obj.OrderType = o.OrderType;
					obj.PriceTriggerPonit = o.PriceTriggerPonit;
					obj.Status = o.Status;
					obj.StatusMsg = o.StatusMsg;
					obj.StopLossDiff = o.StopLossDiff;
					obj.StopLossType = o.StopLossType;
					obj.StopLossWin = o.StopLossWin;
					obj.TimeTriggerPoint = o.TimeTriggerPoint;
					obj.TriggedTime = o.TriggedTime;
					obj.name=o.CommodityNo+o.ContractNo;
					obj.status00 = (function(){
									if(o.Status==0){
										return '运行中';
									}else if(o.Status==1){
										return '暂停';
									}else if(o.Status==2){
										return '已触发';
									}else if(o.Status==3){
										return '已取消';
									}else if(o.Status==4){
										return '插入失败';
									}else if(o.Status==5){
										return '触发失败';
									}
								})();
					obj.type = (function(){
									if(o.ConditionType==0){
										return '价格条件';
									}else if(o.ConditionType==1){
										return '时间条件';
									}else if(o.ConditionType==2){
										return 'AB单';
									}
								})();
					obj.conditions = (function(){
									if(o.AdditionFlag==0){ //没有附件条件
										if(o.CompareType==0){
											return '>'+o.PriceTriggerPonit;
										}else if(o.CompareType==1){
											return '<'+o.PriceTriggerPonit;
										}else if(o.CompareType==2){
											return '>='+o.PriceTriggerPonit;
										}else if(o.CompareType==3){
											return '<='+o.PriceTriggerPonit;
										}else{
											let s = o.TimeTriggerPoint.split(' ');
											if(o.AdditionType==0){
												return s[1]+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return s[1]+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return s[1]+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return s[1]+' <='+o.AdditionPrice;
											}else{
												return s[1];
											}
										}
									}else{ //有附加条件
										if(o.CompareType==0){
											if(o.AdditionType==0){
												return '>'+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '>'+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '>'+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '>'+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==1){
											if(o.AdditionType==0){
												return '<'+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '<'+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '<'+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '<'+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==2){
											if(o.AdditionType==0){
												return '>='+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '>='+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '>='+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '>='+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==3){
											if(o.AdditionType==0){
												return '<='+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '<='+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '<='+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '<='+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else{
											let s = o.TimeTriggerPoint.split(' ');
											if(o.AdditionType==0){
												return s[1]+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return s[1]+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return s[1]+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return s[1]+' <='+o.AdditionPrice;
											}else{
												return s[1];
											}
										}
									}
								})();
					obj.order = (function(){
								if(o.Drection == 0){ //买
									if(o.OrderType==1){
										return '买,市价,'+o.Num+'手'
									}else{
										return '买,对手价,'+o.Num+'手'
									}
								} else if(o.Drection == 1){//卖
									if(o.OrderType==1){
										return '卖,市价,'+o.Num+'手'
									}else{
										return '卖,对手价,'+o.Num+'手'
									}
								}
							})();
					obj.term = '永久有效';
					obj.time = o.InsertDateTime;
					obj.toolShow = false;
					this.conditionListCont.push(obj);
				}.bind(this));
			},
			regroupTriggerConditionList: function(){
				this.triggerConditionListCont = [];
				this.triggerConditionList.forEach(function(o, i){
					let obj = {};
					obj.AB_BuyPoint = o.AB_BuyPoint;
					obj.AB_SellPoint = o.AB_SellPoint;
					obj.AdditionFlag=o.AdditionFlag;
					obj.AdditionPrice = o.AdditionPrice;
					obj.AdditionType = o.AdditionType;
					obj.CommodityNo = o.CommodityNo;
					obj.CompareType = o.CompareType;
					obj.ConditionNo = o.ConditionNo;
					obj.ConditionType = o.ConditionType;
					obj.ContractNo = o.ContractNo;
					obj.Drection = o.Drection;
					obj.ExchangeNo = o.ExchangeNo;
					obj.InsertDateTime = o.InsertDateTime;
					obj.Num = o.Num;
					obj.OrderType = o.OrderType;
					obj.PriceTriggerPonit = o.PriceTriggerPonit;
					obj.Status = o.Status;
					obj.StatusMsg = o.StatusMsg;
					obj.StopLossDiff = o.StopLossDiff;
					obj.StopLossType = o.StopLossType;
					obj.StopLossWin = o.StopLossWin;
					obj.TimeTriggerPoint = o.TimeTriggerPoint;
					obj.TriggedTime = o.TriggedTime;
					obj.name=o.CommodityNo+o.ContractNo;
					obj.status00 = (function(){
									if(o.Status==0){
										return '运行中';
									}else if(o.Status==1){
										return '暂停';
									}else if(o.Status==2){
										return '已触发';
									}else if(o.Status==3){
										return '已取消';
									}else if(o.Status==4){
										return '插入失败';
									}else if(o.Status==5){
										return '触发失败';
									}
								})();
					obj.type = (function(){
									if(o.ConditionType==0){
										return '价格条件';
									}else if(o.ConditionType==1){
										return '时间条件';
									}else if(o.ConditionType==2){
										return 'AB单';
									}
								})();
					obj.conditions = (function(){
									if(o.AdditionFlag==0){ //没有附件条件
										if(o.CompareType==0){
											return '>'+o.PriceTriggerPonit;
										}else if(o.CompareType==1){
											return '<'+o.PriceTriggerPonit;
										}else if(o.CompareType==2){
											return '>='+o.PriceTriggerPonit;
										}else if(o.CompareType==3){
											return '<='+o.PriceTriggerPonit;
										}else{
											let s = o.TimeTriggerPoint.split(' ');
											if(o.AdditionType==0){
												return s[1]+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return s[1]+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return s[1]+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return s[1]+' <='+o.AdditionPrice;
											}else {
												return s[1];
											}
										}
									}else{ //有附加条件
										if(o.CompareType==0){
											if(o.AdditionType==0){
												return '>'+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '>'+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '>'+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '>'+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==1){
											if(o.AdditionType==0){
												return '<'+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '<'+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '<'+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '<'+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==2){
											if(o.AdditionType==0){
												return '>='+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '>='+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '>='+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '>='+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else if(o.CompareType==3){
											if(o.AdditionType==0){
												return '<='+o.PriceTriggerPonit+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return '<='+o.PriceTriggerPonit+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return '<='+o.PriceTriggerPonit+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return '<='+o.PriceTriggerPonit+' <='+o.AdditionPrice;
											}
										}else{
											let s = o.TimeTriggerPoint.split(' ');
											if(o.AdditionType==0){
												return s[1]+' >'+o.AdditionPrice;
											}else if(o.AdditionType==1){
												return s[1]+' <'+o.AdditionPrice;
											}else if(o.AdditionType==2){
												return s[1]+' >='+o.AdditionPrice;
											}else if(o.AdditionType==3){
												return s[1]+' <='+o.AdditionPrice;
											}else {
												return s[1];
											}
										}
									}
								})();
					obj.order = (function(){
								if(o.Drection == 0){ //买
									if(o.OrderType==1){
										return '买,市价,'+o.Num+'手'
									}else{
										return '买,对手价,'+o.Num+'手'
									}
								} else if(o.Drection == 1){//卖
									if(o.OrderType==1){
										return '卖,市价,'+o.Num+'手'
									}else{
										return '卖,对手价,'+o.Num+'手'
									}
								}
							})();
					obj.term = '永久有效';
					obj.time = o.InsertDateTime;
					this.triggerConditionListCont.push(obj);
				}.bind(this));
			},
			getNowFormatDate: function(){
				let date = new Date();
			    let seperator1 = "-";
			    let month = date.getMonth() + 1;
			    let strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
			    return currentdate;
			},
		},
		mounted: function(){
			//重组数据
			this.regroupConditionList();
			console.log(this.conditionListCont);
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.order_type{
		height: 0.96rem;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid $black;
		span{
			display: inline-block;
			float: left;
			width: 3.45rem;
			height: 0.56rem;
			line-height: 0.56rem;
			text-align: center;
			background: $lightBlue;
			margin: 0.2rem 0;
			color: $white; 
			&:first-child{
				border-top-left-radius: 0.1rem;
				border-bottom-left-radius: 0.1rem;
			}
			&:last-child{
				border-top-right-radius: 0.1rem;
				border-bottom-right-radius: 0.1rem;
			}
			&.current{
				background: $blue;
			}
		}
	}
	.list{
		width: 7.5rem;
		overflow-x: auto;
		ul{
			width: 15rem;
		}
		li{
			span{
				float: left;
				display: inline-block;
				font-size: $fs28;
			}
			.name{
				float: left;
				width: 1.6rem;
			}
			.num{
				width: 1.4rem;
			}
			.type{
				width: 0.9rem;
			}
			.price{
				width: 1.3rem;
			}
			.status{
				width: 2.8rem;
			}
			.price, .status{
				&.red{
					color: $red;
				}
				&.green{
					color: $green;
				}
			}
			.list_title{
				height: 0.64rem;
				border-bottom: 0.01rem solid $black;
				background: #16597f;
				padding-left: 0.3rem;
				span{
					height: 0.64rem;
					line-height: 0.64rem;
				}
			}
			&.current{
				.list_cont{
					background: $lightBlue;
				}
			}
			.list_cont{
				height: 0.88rem;
				border-bottom: 0.01rem solid $black;
				padding-left: 0.3rem;
				span{
					line-height: 0.88rem;
					color: $white;
				}
				.name{
					em{
						display: inline-block; 
						&:first-child{
							font-size: $fs28;
							color: $white;
							margin: 0.15rem 0 0.05rem 0;
						}
					}
				}
			}
			.tools{
				/*display: none;*/
				height: 0.96rem;
				border-bottom: 0.01rem solid $black;
				padding-left: 2.9rem;
				#btn{
					float: left;
					margin: 0.16rem 0.1rem;
				}
			}
		}
	}
</style>