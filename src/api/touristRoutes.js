// 线路API

import request from '../utils/request'

//接口类型
const tourTypeId = 10000
// 线路列表
export function getRoutesList(arriveCityId, daysRange, departCityId, orderBys, name, ps, pi) {
  const url = `/api/tour/info?tourTypeId=${tourTypeId}&arriveCityId=${arriveCityId}&daysRange=${daysRange}&departCityId=${departCityId}&orderBys=${orderBys}&name=${name}&ps=${ps}&pi=${pi}`
  return request(url, {}, 'GET')
}
// 产品详情
export function getRoutesDetail(ID) {
  const url = `/api/tour/info?id=${ID}`
  return request(url, {}, 'GET')
}

// 查询条件
export function getSearch() {
  const url = `/api/tour/search?tourTypeId=${tourTypeId}`
  return request(url, {}, 'GET')
}

//预订页取价格
export function getPrice(tourId) {
  const url = `/api/tour/price?tourId=${tourId}&pi=1&ps=0`
  return request(url, {}, 'GET')
}

// 获取当前的登录人
export function getOninfo() {
  const url = `/api/mine/info`
  return request(url, {}, 'GET')
}

// 提交订单
export function submitOrder(ProductId,LinkerName,LinkerMobile,ProductBook) {
  const url = `/api/tour/book`
  const data={
      ProductId:ProductId,
      LinkerName: LinkerName,
      LinkerMobile: LinkerMobile,
      ProductBook: ProductBook,
  }
  return request(url, data, 'POST')
}

// 支付订单
export function payOrder(orderNumber, OpenId) {
	const url=`/api/order/pay`
	return request(url,{OrderId: `${orderNumber}`,OpenId: `${OpenId}`,From: `WeixinMiniProgram`,By: `WeixinPay`},'POST')
}

// 订单详情
export function getOrderDatail(orderId){
	const url=`/api/mine/order?id=${orderId}`
	return request(url,{},'GET')
}

// 判断是否已收藏
export function likePro(contentId) {
    const url = `/api/mine/favourite?favouriteTypeId=100&contentTypeId=101&contentId=${contentId}`
    return request(url,{},'GET')
}
// 收藏
export function getlike(contentId){
     const url = `/api/mine/favourite`
     let data={
         favouriteTypeId:100,
         contentTypeId:101,
         contentId:contentId
     }
     return request(url, data, 'POST')
}
//取消收藏
export function getCanCellike(contentId) {
    const url = `/api/mine/favourite?favouriteTypeId=100&contentTypeId=101&contentId=${contentId}`
    return request(url, {}, 'DELETE')
  }