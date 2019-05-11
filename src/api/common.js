import request from '../utils/request'

//接口
const code='B101'//banner广告位
const siteId=1001
const proNum='P101'//推荐位
// 获取广告位
export function getData () {
	return request(`/v1/site/advert?code=${code}&siteId=${siteId}`,{},'GET')
}
// 获取推荐位
export function tuiJianPosition(){
	return request(`/v1/site/commend?code=${proNum}&siteId=${siteId}`,{},'GET')
}
// 获取城市
export function getCity(typeIds,isDomestic,keyWord){
	return request(`/api/destination/prefix?typeIds=${typeIds}&isDomestic=${isDomestic}&name=${keyWord}`,{},'GET')
}
// 获取航班列表
export function getflightList(){
	return request(`/api/flight/list?appId=1001&appSecret=abcdef654321&vendorId=80000&schedule=PEKSHA20190910`,{},'GET')
}
// 获取航班详情
export function getflighInfo(ID,Code,Datetime,startThreeCode,endThreeCode){
	return request(`/api/flight/detail?appId=1001&appSecret=abcdef654321&vendorId=80000&schedule=PEKSHA20190910&Number=${ID}&Code=${Code}&Datetime=${Datetime}&startThreeCode=${startThreeCode}&endThreeCode=${endThreeCode}`,{},'GET')
}
// export function getflighInfo(ID,Code,Datetime,startThreeCode,endThreeCode){
// 	return request(`/api/flight/detail`,{
// 		appId:1001,
// 		appSecret:`abcdef654321`,
// 		vendorId:`80000`,
// 		schedule:`PEKSHA20190910`,
// 		Number:`${ID}`,
// 		Code:`${Code}`,
// 		Datetime:`${Datetime}`,
// 		startThreeCode:`${startThreeCode}`,
// 		endThreeCode:`${endThreeCode}`
// 	},'POST')
// }
// 注册
export function register(data){
	const url=`/api/person/register`
	return request(url,data,'POST')
}
// 注册验证码
export function registerCode(Mobile){
	const url=`/api/common/sms?Mobile=${Mobile}`
	return request(url,{Mobile:`${Mobile}`},'POST')
}
//登录
export function loginMsg(data){
	const url=`/api/person/login`
	return request(url,data,'POST')
}
// 发送短信验证码登录
export function loginCode(data){
	const url=`/api/person/vcode`
	return request(url,data,'POST')
}

// 获取常用游客信息
export function getYouKeList(DocumentTypeId) {
	const url = `/api/mine/passenger?documentTypeIds=${DocumentTypeId}`
	return request(url)
}
// 添加常用游客
export function addPassenger(data) {
	const url = `/api/mine/passenger`
 	return request(url,data,"POST")
  }
// 编辑常用游客
// export function addPassenger(data) {
// 	const url = `/api/mine/passenger`
//  	return request(url,data,"POST")
//   }