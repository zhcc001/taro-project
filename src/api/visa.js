import request from '../utils/request'
const proNum='VP101'//产品推荐位
const siteId = 1001
const visaArticNum = 'V101'//文章推荐位
const bannerCode='VB101'//banner广告位
const cityNum = 'H101'//热门国家广告位

// 获取广告位
export function getData() {
  return request(`/v1/site/advert?code=${bannerCode}&siteId=${siteId}`, {}, 'GET')
}
// 获取推荐位
export function tuiJianPosition() {
  return request(`/v1/site/commend?code=${proNum}&siteId=${siteId}`, {}, 'GET')
}
// 获取热门签证目的地
export function getVisaHotCity() {
  return request(`/v1/site/advert?code=${cityNum}&siteId=${siteId}`, {}, 'GET')
}
// 获取国家
export function getCity(typeIds, isDomestic, keyWord) {
  return request(`/api/flight/locality?typeIds=${typeIds}&isDomestic=${isDomestic}&name=${keyWord}`, {}, 'GET')
}

// 列表查询条件
export function getMask() {
  const url = `/api/visa/search`
  return request(url,{},'GET')
}

// 签证列表
 export function getList(countryId,visaTypeId,consulateId,entryTimesId,localityId,orderBys,pi,ps,keyWord) {
    const url = `/api/visa/product?countryId=${countryId}&visaTypeId=${visaTypeId}&consulateId=${consulateId}&entryTimesId=${entryTimesId}&localityId=${localityId}&orderBys=${orderBys}&pi=${pi}&ps=${ps}&name=${keyWord}`
    return request(url,{},'GET')
  }

// 获取详情页基础信息
export function getVisaDetail(id) {
  const url = `/api/visa/product?id=${id}`
  return request(url, {}, 'GET')
}

  // 生成订单
  export function getOrder(params) {
    const url = `/api/visa/book`
    return request(url, params, 'POST')
  }


  // 签证精选文章
  export function getArtic() {
    return request(`/v1/site/commend?code=${visaArticNum}&siteId=${siteId}`, {}, 'GET')
  }
  // 获取资讯详情
  export function geZiXunDetail(id) {
    const url = `/api/information/info?id=${id}`
    return request(url, {}, 'GET')
  }