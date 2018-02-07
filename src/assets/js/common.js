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
		var auths=null;
		// 扩展API加载完毕，现在可以正常调用扩展API
		plus.oauth.getServices(function(services){
			auths = services;
			authLogin();
		},function(e){
			mui( "微信授权失败");
		});
		// 登录操作
//		authLogin();
		function authLogin(){
			var s = auths[3];
			if (!s.authResult){
				s.login( function(e){
					mui.toast("登录认证成功！");
					authUserInfo();
				}, function(e){
					mui.toast("登录认证失败！");
				});
			}else{
				mui.toast("已经登录认证！");
			}
		}
		// 获取登录用户信息操作
		function authUserInfo(){
			var s = auths[3];
			if ( !s.authResult ) {
				mui.toast("未登录授权！");
			} else {
				s.getUserInfo( function(e){
//					console.log( "获取用户信息成功："+JSON.stringify(s.userInfo) );
					localStorage.setItem("weixinUser",JSON.stringify(s.userInfo));
				}, function(e){
					mui.toast( "获取用户信息失败，请检查微信是否在线");
				} );
			}
		}
		
	})
}
pro.getClentId = function(){
	mui.plusReady(function(){
		var info = plus.push.getClientInfo();
		var clientid = {"id":info.clientid};
		localStorage.setItem("clientid",JSON.stringify(clientid));
	})
}
export default pro