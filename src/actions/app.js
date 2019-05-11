import * as constants from '../constants/app'

//更改登录状态
export const changeAppOnLaunch = () => ({
	type : constants.CHANGE_APP_ON_LAUNCH
})

//写入请求token
export const insertToken = (authorize) => ({
	type : constants.INSERT_AUTHORIZE ,
	authorize
})
//存入用户ID
export const saveApplianceId = (applianceId) => ({
	type : constants.APPLIANCE_ID ,
	applianceId
})