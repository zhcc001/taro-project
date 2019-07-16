import request from '../utils/request'

//接口
const code='B101'//banner广告位
const siteId=1001
const proNum='P101'//产品推荐位
const hotNum="RMCS001"
const articNum='A101'//专属服务
const cityNum='H101'
//person
export function getPerson(Code) {
	const url = `/api/exterior/person`
	let data={
		Code: Code,
		From: `WeixinMiniProgram`,
		AutoLogin:true
	}
	return request(url,data,'POST')
}
// 获取广告位
export function getData () {
	return request(`/v1/site/advert?code=${code}&siteId=${siteId}`,{},'GET')
}
// 获取推荐位
export function tuiJianPosition(){
	return request(`/v1/site/commend?code=${proNum}&siteId=${siteId}`,{},'GET')
}
// 获取专属服务
export function getService(){
	return request(`/v1/site/advert?code=${articNum}&siteId=${siteId}`, {}, 'GET')
}

// 获取热门城市
export function getHotCity () {
	return request(`/v1/site/advert?code=${hotNum}&siteId=${siteId}`,{},'GET')
}
// 获取热门签证目的地
export function getVisaHotCity() {
  return request(`/v1/site/advert?code=${cityNum}&siteId=${siteId}`, {}, 'GET')
}
// 定位
export function getloction(latitude, longitude) {
  const url = `/api/location/place?latitude=${latitude}&longitude=${longitude}&type=204`
  return request(url, {}, 'GET')
}
// 获取城市
export function getCity(typeIds,isDomestic,keyWord){
	return request(`/api/flight/locality?typeIds=${typeIds}&isDomestic=${isDomestic}&name=${keyWord}`,{},'GET')
}
// 公出单显示
export function getShowWellForm(){
	const url = `/api//business/config?catalogs=BookType`
	return request(url,{},'GET')
}
// 获取航班列表
export function getflightList(schedule,sort){
	return request(`/api/flight/list?schedule=${schedule}&sort=${sort}`,{},'GET')
}
// 获取航班详情
export function getflighInfo(Code){
	return request(`/api/flight/detail?code=${Code}`,{},'GET')
}
//仓位类型
export function getCabinType(bookTypeId) {
	const url = `/api/flight/config?bookTypeId=${bookTypeId}`
	return request(url,{},'GET')
}
// 支付方式
export function getPayType(BookTypeId) {
	return request(`/api/business/config?catalogs=PayType,GPBank&&BookTypeId=${BookTypeId}`, {}, 'GET')
}
// 预定信息
export function getReserveMsg(data){
	const url=`/api/flight/book`
	return request(url,data,'POST')
}
// 订单详情
export function getOrderMsg(orderId){
	const url=`/api/mine/order?id=${orderId}`
	return request(url,{},'GET')
}
// 删除订单
export function delOrderMsg(orderId){
	const url=`/api/mine/order?id=${orderId}`
	return request(url,{},'DELETE')
}
// 取消订单
export function cancelOrderMsg(orderId){
	const url=`/api/mine/order?id=${orderId}&operate=cancel`
	return request(url,{},'PUT')
}
// 订单列表
export function getOrderList(productTypeId, productCatalogId, statusId,payStatusId, refundStatusId, ps, pi, OrderType) {
	const url = `/api/mine/order?productTypeId=${productTypeId}&productCatalogId=${productCatalogId}&statusId=${statusId}&payStatusId=${payStatusId}&refundStatusId=${refundStatusId}&ps=${ps}&pi=${pi}&orderTypeId=${OrderType}`
	return request(url,{},'GET')
}
// 支付订单
export function payOrder(orderNumber, OpenId) {
	const url=`/api/order/pay`
	return request(url,{OrderId: `${orderNumber}`,OpenId: `${OpenId}`,From: `WeixinMiniProgram`,By: `WeixinPay`},'POST')
}
// 企业注册
export function companyRegister(data) {
  const url = `/api/business/invite`
  return request(url, data, 'POST')
}
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
// 获取当前的登录人
export function getOninfo() {
	const url = `/api/mine/info`
	return request(url,{},'GET')
}
// 修改个人资料
export function changeInfo(data){
	const url=`/api/mine/info`
	return request(url,data,'POST')
}
// 修改密码
export function getChangeOninfo(data) {
	const url = `/api/mine/info`
	return request(url,data,'POST')
}
// 获取已选乘机人
export function getCkeckTripper(bookTypeId, flag) {
	const url = `/api/travel/tripper?documentTypeIds=401&bookTypeId=${bookTypeId}&flag=${flag}&_d=${Math.random()}`
	return request(url,{},'GET')
}
// 获取签证已选乘机人
export function getVisaCkeckTripper(flag) {
  const url = `/api/travel/tripper?documentTypeIds=402&bookTypeId=4&flag=${flag}&_d=${Math.random()}`
  return request(url, {}, 'GET')
}
// 查询企业员工
export function getStaffList(keyWord) {
	const url = `/api/mine/staff?contents=${keyWord}`
	return request(url,{},'GET')
}

// 获取常用游客信息
export function getYouKeList(DocumentTypeId) {
	const url = `/api/mine/passenger?documentTypeIds=${DocumentTypeId}`
	return request(url,{},'GET')
}
//外部出行人信息
export function getPassengers() {
  const url = `/api/mine/passenger?documentTypeIds=`
  return request(url, {}, 'GET')
}
// 获取预定游客信息
export function getTrippers(keyWord, bookTypeId,flag) {
  const url = `/api/travel/passenger?documentTypeIds=401&contents=${keyWord}&bookTypeId=${bookTypeId}&flag=${flag}&_d=${Math.random()}`
  return request(url, {}, 'GET')
}
// 获取签证预定游客信息
export function getVisaTrippers(flag) {
  const url = `/api/travel/passenger?documentTypeIds=402&contents=&bookTypeId=4&flag=${flag}&_d=${Math.random()}`
  return request(url, {}, 'GET')
}
// 保存已选乘机人
export function saveTrpper(bookTypeId, flag, Trippers) {
	let saveData = {
		
		BookTypeId: bookTypeId,
		Flag: flag,
		Trippers: Trippers,
	}
	const url =`/api/travel/tripper`
	return request(url, saveData, 'POST')
}
// 删除预定乘机人
export function delTrippers(bookTypeId, flag, Trippers) {
	let delData = {
	  BookTypeId: bookTypeId,
	  Flag: flag,
	  TripperId: Trippers,
	}
	const url = `/api/travel/tripper`
	return request(url, delData, 'DELETE')
}

// 添加编辑预定游客
export function addTrippers(data) {
  const url = `/api/travel/passenger`
  return request(url, data, "POST")
}
// 添加/编辑外部出行人
export function addPassenger(data) {
	const url = `/api/mine/passenger`
 	return request(url,data,"POST")
  }

// 添加删除游客
export function delPassenger(ID) {
	const url = `/api/mine/passenger?id=${ID}`
 	return request(url,{},"DELETE")
  }
// 获取当前员工所在企业
export function getOnCompany(){
	const url=`/api/mine/vendor`
	return request(url,{},'GET')
}
//   切换企业
export function changrCompany(ID){
	const url=`/api/mine/vendor?id=${ID}&from=WeixinMiniProgram`
	return request(url,{},'PUT')
}

// 微信解除绑定
export function outLogin(OpenId){
	const url=`/api/mine/exterior`
	return request(url,{From: `WeixinMiniProgram`,OpenId: `${OpenId}`},'DELETE')
}


// 分享二维码
export function shareCode(){
	const url = `/api/mine/qrcode`
	return request(url,{},'GET')
}

// 我的收藏
export function myCollection(ps,pi) {
  const url = `/api/mine/favourite?ps=${ps}&pi=${pi}`
  return request(url, {}, 'GET')
}

// 判断是否已收藏
export function likePro(favouriteTypeId, contentTypeId, contentId) {
  const url = `/api/mine/favourite?favouriteTypeId=${favouriteTypeId}&contentTypeId=${contentTypeId}&contentId=${contentId}`
  return request(url, {}, 'GET')
}
// 收藏
export function getlike(favouriteTypeId, contentTypeId, contentId) {
  const url = `/api/mine/favourite`
  let data = {
    favouriteTypeId: favouriteTypeId,
    contentTypeId: contentTypeId,
    contentId: contentId
  }
  return request(url, data, 'POST')
}
//取消收藏
export function getCanCellike(favouriteTypeId, contentTypeId, contentId) {
  const url = `/api/mine/favourite?favouriteTypeId=${favouriteTypeId}&contentTypeId=${contentTypeId}&contentId=${contentId}`
  return request(url, {}, 'DELETE')
}


// 获取国家
export function getCountry(keyWord) {
  const url = `/api/location/prefix?typeIds=202&isDomestic=false&isParent=false&name=${keyWord}`
  return request(url, {}, 'GET')
}


// 退改签原因
export function getReason(type) {
  const url = `/api/flight/reason?type=${type}`
  return request(url, {}, 'GET')
}

// 提交退改签
export function sureTuiGai(data) {
  const url = `/api/flight/operate`
  return request(url,data,'POST')
}



// 用车
	// 获取服务入口
		export function getFlightService(flightId) {
			const url = `/api/flight/service?flightId=${flightId}`
			return request(url, {}, 'GET')
		}
	// 获取规则
		export function getRule() {
			const url = `/api/vehicle/policy?usefor=flight`
			return request(url, {}, 'GET')
		}
	// 获取已选接送机信息
		export function getVehicle(targetId, bookTypeId, flag) {
			const url = `/api/vehicle/choose?usefor=flight&targetId=${targetId}&bookTypeId=${bookTypeId}&flag=${flag}`
			return request(url, {}, 'GET')
		}
	// 提交已选接送机信息
		export function saveVehicle(data) {
			const url = `/api/vehicle/choose`
			return request(url,data, 'POST')
		}
	// 删除已选接/送机信息
		export function delVehicle(data) {
			const url = `/api/vehicle/choose`
			return request(url, data, 'DELETE')
		}
	// 包车车型列表
		export function getCarData(usefor, targetId) {
			const url = `/api/vehicle/product?usefor=${usefor}&targetId=${targetId}`
			return request(url, {}, 'GET')
		}