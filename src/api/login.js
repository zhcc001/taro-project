import Taro from '@tarojs/taro'
import request from '../utils/request'

export function _login() {
  Taro.login({
    success: function (res) {
      console.log(res,'eeeee')
      if (res.code) {
       request(`/v1/exterior/person`,{code:res.code,from:"WeixinMiniProgram"},"POST")
          .then(resp => {
            if (resp.Success) {
              let res = resp.Result
              if (res.Id < 1) {
                //取userInfo
                //未登录，未注册，存oppenid,userInfo
                Taro.setStorageSync('_openid', res.OpenId)
                // 查看是否授权
                Taro.getSetting({
                  success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                      ('已授权');
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                      Taro.getUserInfo({
                        success: function (res) {
                          (res, '已授权获取信息');
                          Taro.setStorageSync('_userInfo', res.userInfo)
                          console.log(res,'判断ID')
                          if(Taro.getStorageSync('path')&&Taro.getStorageSync('path')=='pages/register/index'){
                              Taro.navigateTo({
                              url: '/pages/register/index'
                            })
                          }else{
                            Taro.navigateTo({
                              url: '/pages/login/index'
                            })
                          }
                          
                        }
                      })
                    } else {
                     Taro.navigateTo({
                              url: '/pages/authorize/index'
                      })
                     
                    }
                  }
                })
              } else {
                //已注册,登录成功，存memberid
                Taro.switchTab({
                  url: '/pages/index/index'
                })
                // callback(res)
              }
            }
          })
      } else {
        ('登录失败！' + res.errMsg)
      }
    }
  })
}