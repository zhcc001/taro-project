import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {loginMsg} from '../../api/common'
import tel from './images/tel.png'
import code from './images/code.png'
import name from './images/name.png'
import pasEyeOff from './images/pasEyeOff.png'
import pasEyeOpen from './images/pasEyeOpen.png'
import pasword from './images/pasword.png'
import idcard from './images/idcard.png'
import checkBoxIcon from './images/login_selectActive.png'
import weiChenkBoxIcon from './images/login_select.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '密码登录'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      tel:'',
      Password:'',
      Mobile:'',
      Code:'',
    }
  }

  componentWillMount () {}
  componentDidMount () {} 
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
  handleMobileChange = (event) => {
    let value=event.target.value
    this.setState({
      Mobile: value
    })
}
handlePasswordChange = (event) => {
    let value=event.target.value
    this.setState({
      Password: value
    })
}
  _loginMsg(){
    if(this.state.Mobile==''){
      console.log('请输入手机号')
      return
    }else if(this.state.Password==''){
      console.log('请输入手机号')
      return
    }else{
    loginMsg({
      Mobile:this.state.Mobile,
      Password: this.state.Password,
      VCode: this.state.Code,
      VendorId: 0,
      OpenId: Taro.getStorageSync('_openid'),
      From: "WeixinMiniProgram"
    })
    .then(res=>{
      console.log(res,'密码登录')
      if(res.Success){
        Taro.switchTab({
          url: '/pages/index/index'
        
        })
      }else{
        console.log('该手机号不存在')
      }
    })
    .catch(err => {
      if (!err.message) {
        return
      }
      
    })
  }
}
  render() {
    return (
      <View className='login'>
        <View className='box'>
            <View className='systemName'>逸旅云-差旅自助系统</View>
            <View className='InvitationName'>密码登录</View>
            <View className='formBox'>
                <View className='li'>
                    <View className='imgBox'>
                       <Image className='IconImg' src={tel}/>
                    </View>
                    <Input placeholder="手机号" type='tel' value={this.state.Mobile} onChange={this.handleMobileChange.bind(this)}/>
                </View>
                <View className='li'>
                    <View className='imgBox'>
                        <Image className='IconImg' src={pasword}/>
                    </View>
                    <Input placeholder="密码" type='password' value={this.state.Password} onChange={this.handlePasswordChange.bind(this)}/>
                    <View className='imgBox'>
                        <Image className='IconImg' src={pasEyeOff}/>
                        <Image className='IconImg' src={pasEyeOpen}/>
                    </View>
                </View>
             <Text className='btn' onClick={this._loginMsg}>登 录</Text>
             <View className='goToBtn' onClick={this.gotoMsg}>短信登录</View>
        </View>
      </View>
    </View>
    );
  }
}