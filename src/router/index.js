import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index.vue'
import stockFutures from "../page/quote/stockFutures.vue"
import optionalList from "../page/quote/optionalList.vue"
import optionalBox from "../page/quote/optionalBox.vue"
import noLogin from "../page/quote/noLogin.vue"
import account from "../page/account.vue"
import information from "../page/information.vue"
import mockTrading from "../page/mockTrading.vue"
import login from "../page/login.vue"
import regisiter from "../page/regisiter.vue"
import wechatRegisiter from "../page/wechatRegisiter.vue"
import forgetPassword from "../page/forgetPassword.vue"
import resetPassword from "../page/resetPassword.vue"
import personalSet from "../page/account/personalSet.vue"
import resetLoginPassword from "../page/account/resetLoginPassword.vue"
import resetPhone from "../page/account/resetPhone.vue"
import moneyDetails from"../page/account/moneyDetails.vue"
import realName from"../page/account/realName.vue"
import feedBack from"../page/account/feedBack.vue"
Vue.use(Router)

export default new Router({
	routes: [{
		path: '*',
		component: index
	},{
		path: '/',
		component: index
	},{
		path:'/account',
		component:account
	},{
		path:'/information',
		component:information
	},{
		path:'/mockTrading',
		component:mockTrading
	},{
		path: '/stockFutures',
		component: stockFutures
	},{
		path: '/optionalList',
		component: optionalList
	},{
		path: '/optionalBox',
		component: optionalBox
	},{
		path: '/noLogin',
		component: noLogin
	},{
		path:'/login',
		component:login
	},{
		path:'/regisiter',
		component:regisiter
	},{
		path:'/wechatRegisiter',
		component:wechatRegisiter
	},{
		path:'/forgetPassword',
		component:forgetPassword
	},{
		path:'/resetPassword',
		component:resetPassword
	},{
		path:'/personalSet',
		component:personalSet
	},{
		path:'/resetLoginPassword',
		component:resetLoginPassword
	},{
		path:'/resetPhone',
		component:resetPhone
	},{
		path:'/moneyDetails',
		component:moneyDetails
	},{
		path:'/realName',
		component:realName
	},{
		path:'/feedBack',
		component:feedBack
	}
	]
})