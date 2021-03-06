import Taro from '@tarojs/taro'
import Auth from './auth'

//请求封装
async function request (url, data = {}, method = "GET"||"POST"|| "PUT"|| "DELETE"|| "OPTIONS"){
	// Taro.showLoading({
	//   title: '加载中',
	//   mask: true
	// })
	const state = Taro.$store.getState();
	const header = {};
	//没有url，直接报错
	if ( !url.trim() ) {
		Taro.showModal({
			title: '出错了',
			content: '请求接口地址不能为空！',
			showCancel: false
		})
		return;
	}

	//数据
	data = Object(data, {})

	//请求头
	header.token = Auth.getToken();

	//请求
	let res = await Taro.request({
		url: `${state.app.baseURL}${url}`,
		data,
		header,
		method
	})

	//返回promise
	return new Promise(resolve=>{
		if( res.statusCode === 200 ){
				resolve(res.data)
				
		}else{
			Taro.hideLoading()
			Taro.showModal({
				title: '接口异常',
				content: '服务器繁忙',
				showCancel: false
			})
		}
	})
}

export default request;