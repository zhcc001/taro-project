import request from '../utils/request'
// 获取公出单列表
export function getWellFormList(apply, travel,ps,pi) {
    const url = `/api/travel/bill?apply=${apply}&travel=${travel}&ps=${ps}&pi=${pi}`
    return request(url,{},'GET')
}

// 获取公出单详情
export function getWellFormDetail(ID,code){
    const url = `/api/travel/bill?id=${ID}&code=${code}`
    return request(url,{},'GET')
}

// 获取出行人
export function getSchedule(ID, flightId, date, cabinClassId, discount, price) {
    const url = `/api/travel/schedule?id=${ID}&checkLevel=${true}&flightId=${flightId}&date=${date}&cabinClassId=${cabinClassId}&discount=${discount}&price=${price}`
    return request(url,{},'GET')
}