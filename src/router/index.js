import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index.vue'
import stockFutures from "../page/quote/stockFutures.vue"
import optionalList from "../page/quote/optionalList.vue"



import account from "../page/account.vue"
import information from "../page/information.vue"
import mockTrading from "../page/mockTrading.vue"
import login from "../page/login.vue"
import regisiter from "../page/regisiter.vue"
import wechatRegisiter from "../page/wechatRegisiter.vue"
import forgetPassword from "../page/forgetPassword.vue"
import resetPassword from "../page/resetPassword.vue"
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
	}]
})