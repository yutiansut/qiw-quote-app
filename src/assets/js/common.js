/*  
 * @description: 公用JS 
 * @author: name  
 * @update: 2018-01-12
 */

var pro = {};
/***************************************************************/
/**
 * axios
 * 
 */
import axios from 'axios'
import qs from 'qs'
import store from '../../store'
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = store.getters.PATH;
//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});
pro.fetch = function(type, url, params, header){
	return new Promise((resolve, reject) => {
        axios({
        	method: type,
			url: url,
			headers: {
				token:  header.token ? header.token : '',
				secret: header.secret ? header.secret : '',
				version: header.version ? header.version : ''
			},
			data: params
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        }).catch((error) => {
           reject(error)
        });
    });
}

/**
 * 时间搓转化成2017-07-07 02:05:00
 * 
 */
pro.getDate=function(d,time){
	var date=new Date(time);
    var year=date.getYear()+1900;
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    var minu=date.getMinutes();
    var sec=date.getSeconds();
    if(day < 10){
    	day = "0" + day;
    }
    if(month < 10){
    	month = "0" + month;
    }
    if(hour < 10){
    	hour = "0" + hour;
    }
    if(minu < 10){
    	minu = "0" + minu;
    }
    if(sec < 10){ 
    	sec = "0" + sec;
    }
    var d1 = year + "-"+ month + "-" + day + " " + hour + ":" + minu + ":" + sec;
    var d2 = year + "-"+ month + "-" + day;
    var d3 = hour+":"+minu+":"+sec;
    var d4 = hour+":"+minu;
    var d5 = year+"年"+month+"月"+day+"日";
    var d6 = day
    if(d == "y-m-d"){
        return d2;
    }else if(d == "y-m-d h:i:s"){
        return d1;
    }else if(d == "h:i:s"){
    	return d3;
    }else if(d == "h:m"){
    	return d4;
    }else if(d == "yy-mm-dd"){
    	return d5;
    }else if(d == "d"){
    	return d6;
    }
}

/**
 * 数组取最大值、最小值
 * 
 */
pro.getMaximin = function(arr,maximin){ 
	if(maximin == "max"){ 
		return Math.max.apply(Math, arr); 
	}else if(maximin == "min"){ 
		return Math.min.apply(Math, arr); 
	} 
} 

/**
 * 微信授权登录
 * 
 */
pro.toweixin=function(){
	mui.plusReady(function(){
		document.getElementById("wechat").addEventListener("tap",function(){
			// 需要认证用户身份的请求调用接口
			weixinLogin(this);
			function weixinLogin(this1) {
				app.setState(null);
				//第三方登录
				var authBtns = ['qihoo', 'weixin', 'sinaweibo', 'qq']; //配置业务支持的第三方登录
				var auths = {};
				plus.oauth.getServices(function(services) {
					for(var i in services) {
						var service = services[i];
						auths[service.id] = service;
//						if(~authBtns.indexOf(service.id)) {
//							var isInstalled = app.isInstalled(service.id);
							//						var btn = document.createElement('div');
							//如果微信未安装，则为不启用状态
//													btn.setAttribute('class', 'oauth-btn' + (!isInstalled && service.id === 'weixin' ? (' disabled') : ''));
//													btn.authId = service.id;
//													btn.style.backgroundImage = 'url("images/' + service.id + '.png")'
//													oauthArea.appendChild(btn);
//						}
					}
//					if(this1.classList.contains('disabled')) {
//						mui.toast('抱歉，您尚未安装微信，请安装后再试！');
//						return;
//					}
					var id = "weixin"
					var auth = auths[id];
					auth.login(function() {
						mui.toast("微信授权成功");
						auth.getUserInfo(function() {
//							var userInfo = userweixinLogin(auth);
//							console.log("--------------------")
//							console.log(JSON.stringify(auth));
							localStorage.setItem("weixinUser",JSON.stringify(auth));
						}, function(e) {
							mui.toast("获取用户信息失败：1" + e.message);
						});
					}, function(e) {
						mui.toast("登录认证失败：2" + e.message);
					});
				}, function(e) {
					mui.toast("获取登录认证失败：3" + e.message);
				});
			}
		})
	})
}
pro.getClentId = function(){
	mui.plusReady(function(){
		var info = plus.push.getClientInfo();
		var clientid = info.clientid;
		localStorage.setItem("clientid",JSON.stringify(clientid));
	})
}
export default pro