import Taro from '@tarojs/taro'
import request from '../utils/request'
import {getOninfo,getPerson} from '../api/common'

export function _login() {
  Taro.login({
    success: function (res) {
      if (res.code) {
       request(`/v1/exterior/person`,{Code:res.code,From:"WeixinMiniProgram",AutoLogin: true},"POST")
          .then(resp => {
            if (resp.Success) {
              // console.log(resp, '/v1/exterior/person')
              let res = resp.Result
              Taro.setStorageSync('_openid', res.OpenId)
              if (res.Id < 1) {
                //取userInfo
                //未登录，未注册，存oppenid,userInfo
                // 查看是否授权
                Taro.getSetting({
                  success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                      // console.log('已授权')
                      
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                      Taro.getUserInfo({
                        success: function (res) {
                          // Taro.setStorageSync('_userInfo', res.userInfo)
                          if(Taro.getStorageSync('query')){
                            console.log('register')
                            let query=JSON.parse(Taro.getStorageSync('query')) 
                            if(query.type=='register'){
                              Taro.redirectTo({
                                url: '/pages/register/index'
                              })
                            } else if (query.type == 'invite') {
                              Taro.redirectTo({
                                url: '/pages/companyRegister/index'
                              })
                            }
                          }else{
                            console.log('login')
                            Taro.redirectTo({
                              url: '/pages/login/index'
                            })
                          }
                          
                        }
                      })
                    } else {
                      // console.log('未授权')
                     Taro.redirectTo({
                        url: '/pages/authorize/index'
                      })
                     
                    }
                  }
                })
              } else {
                //已注册,登录成功，存memberid
                // console.log('已授权，Id>1')
                Taro.setStorageSync('loginData',JSON.stringify(res))
                Taro.switchTab({
                  url: '/pages/index/index'
                })
              }
            }
          })
      } else {
        ('登录失败！' + res.errMsg)
      }
    }
  })
}