import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index.vue'
import account from "../page/account.vue"
import information from "../page/information.vue"
import mockTrading from "../page/mockTrading.vue"
import login from "../page/login.vue"
import regisiter from "../page/regisiter.vue"
import wechatRegisiter from "../page/wechatRegisiter.vue"
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
		path:'/login',
		component:login
	},{
		path:'/regisiter',
		component:regisiter
	},{
		path:'/wechatRegisiter',
		component:wechatRegisiter
	}]
})