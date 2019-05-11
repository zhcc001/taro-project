import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import logo from './images/psd格式-行路商旅logo.png'
// import {_login} from '../../api/login'
import './index.scss'

export default class Index extends Component  {

   config = {
       navigationBarTitleText: '授权登录'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
    }
  }

  componentWillMount () {
  }
  componentDidMount () {
    // this.login()
    
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  gotoMsg(){
    Taro.navigateTo({
      url: '/pages/msgLogin/index'
      
    })
  };
  
  tobegin=(res)=> {
      console.log(res,'1234')
      Taro.setStorageSync("userinfo",JSON.stringify(res.detail.userInfo));
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
        
  render() {
    const canIUse= wx.canIUse('button.open-type.getUserInfo')
       
    return (
      <View className='authorize'>
      {canIUse&&<View>
    <View class='header'>
        <Image src={logo}/>
    </View>

    <View class='content'>
        <View>申请获取以下权限</View>
        <Text>获得你的公开信息(昵称，头像等)</Text>
    </View>

    <Button class='bottom' type="primary" open-type="getUserInfo" onGetUserInfo={this.tobegin}>
        授权登录
    </Button>
    {/* <Button class='bottom' onClick={this.login}>
        授权登录
    </Button> */}
    </View>}
        

        {!canIUse&&<View >请升级微信版本</View>}
        </View>
    );
  }
}