import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index.vue'
import account from "../page/account.vue"
import information from "../page/information.vue"
import mockTrading from "../page/mockTrading.vue"
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
	}]
})