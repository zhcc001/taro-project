import Taro from '@tarojs/taro'
import md5 from 'js-md5'
import { insertToken , changeAppOnLaunch } from '../actions/app'
import {AppId,ApplianceId,AppSecret} from '../api/commonVariable'
//获取数据
export default class Auth {
	//app授权
	static appCheckAuth(){
		return new Promise(function (resolve) {
			const state = Taro.$store.getState();
			//如果有授权信息
			if( Auth.checkAuth() && !state.app.appOnLaunch ){
				//直接返回
				resolve(true);
			}else{
				//判断session_key是否过期
				Taro.checkSession().then(async ()=>{
					//未过期检查token是否有效
					if( !Auth.checkAuth() ){
						//判断是否 token 请求成功
						let flag = await getAuthToken();
						if( flag ) {
							//更新app状态
							Taro.$store.dispatch(changeAppOnLaunch());
							resolve(true);
						}else{
							//提示
							Taro.showToast({
								title : '获取授权信息失败' ,
								icon : 'none' ,
								mask : true
							})
						}
					}else{
						//更新app状态
						Taro.$store.dispatch(changeAppOnLaunch());
						//token 没有过期，直接返回
						resolve(true);
					}
				}).catch(async (err)=> {
					console.log(err);
					let flag = await getAuthToken();
					//判断是否 token 请求成功
					if( flag ) {
						//更新app状态
						Taro.$store.dispatch(changeAppOnLaunch());
						resolve(true);
					}else{
						//提示
						Taro.showToast({
							title : '获取授权信息失败' ,
							icon : 'none' ,
							mask : true
						})
					}
				})
			}
		})
	}

	// 检查令牌是否有效 true--> 有效  false--> 无效
	static checkAuth(){
		const state = Taro.$store.getState();
		//从缓存读取授权信息
		let authorize = state.authorize || Taro.getStorageSync('authorize') || {},
			expiryTime = 0,
			nowTime = ~~(Date.now() / 1000);

		if (authorize.exp) {
			expiryTime = authorize.exp;
		}

		return expiryTime - nowTime > 300;
	}

	//获取token
	static getToken(){
		const state = Taro.$store.getState();
		let authorize = state.authorize || Taro.getStorageSync('authorize');
		// if(authorize==''){
		// 	let flag = await getAuthToken();
		// 				if( flag ) {
		// 					//更新app状态
		// 					Taro.$store.dispatch(changeAppOnLaunch());
		// 					resolve(true);
		// 				}else{
		// 					//提示
		// 					Taro.showToast({
		// 						title : '获取授权信息失败' ,
		// 						icon : 'none' ,
		// 						mask : true
		// 					})
		// 				}
			
		// }
		// console.log(authorize,'qqqqq')
		return authorize;
	}
}

//授权用户 token
async function getAuthToken(){
	const state = Taro.$store.getState();
	//login
	let res = await Taro.login();
	let url = `${state.app.baseURL}/v1/authorize/token`
	let TimeStamp = new Date().getTime()
	let AppSecretMd5 = md5(TimeStamp + AppSecret)
	let PersonId = 0
	  if(Taro.getStorageSync('loginData')){
		PersonId=JSON.parse(Taro.getStorageSync('loginData')).Id
	  }
	//获取token
	let response = await Taro.request({
		url : `${url}` ,
		data : {
				AppId: AppId,
      			AppSecret: AppSecretMd5,
				TimeStamp: TimeStamp,
				PersonId:PersonId,
			  	ApplianceId: ApplianceId
		} ,
		method : 'POST'
	})
	//判断是否成功
	if( response.data.Success && response.data.Result.Value ){
		//写入token
		let authorize = response.data.Result.Value;
		saveAuthToken(authorize);
		return true;
	}else{
		console.log('获取token失败');
		return false;
	}
}

//写入信息
function saveAuthToken (authorize) {
	//写入状态管理
	Taro.$store.dispatch(insertToken(authorize));
	//写入缓存
	Taro.setStorageSync('authorize',authorize)
}