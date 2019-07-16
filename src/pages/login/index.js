import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {AtInput,AtToast } from 'taro-ui'
import {loginMsg} from '../../api/common'
import telIcon from './images/tel.1.png'
import code from './images/code.png'
import pasEyeOff from './images/pasEyeOff.png'
import pasEyeOpen from './images/pasEyeOpen.png'
import paswordIcon from './images/mima.png'
import {shareTitle} from '../../api/commonVariable'
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
      toast:false,
      toastText:'',
      showBtn:true,
      inputType:'password',
      inputTypeFlag:false,
    }
  }

  componentWillMount () {
    if (this.$router.params.Mobile) {
      this.state.Mobile = this.$router.params.Mobile
    }
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {
    
  } 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  gotoMsg(){
    if (this.state.Mobile!='') {
      Taro.navigateTo({
        url: '/pages/msgLogin/index?Mobile=' + this.state.Mobile

      })
    }else{
      Taro.navigateTo({
        url: '/pages/msgLogin/index'

      })
    }
    
  };
  
  handleMobileChange (value) {
    
    this.setState({
      Mobile:value,
    },()=>{
      this.changeVal(value)
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return this.state.Mobile
    
}
handlePasswordChange (value) {
  this.setState({
    Password:value
  }, () => {
    this.changeVal(value)
  })
  // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  return this.state.Password
}
changeVal(val){
  if(this.state.Mobile!=''&&this.state.Password!=''&&val!=''){
    this.setState({
      showBtn:false
    })
  }else{
    this.setState({
      showBtn:true
    })
  }
}
  _loginMsg(){
    let telReg = /^[1][1-9][0-9]{9}$/
   if(this.state.Mobile==''){
        Taro.showToast({
            title : '请输入有效手机号' ,
            icon : 'none' ,
            mask : true
          })
    }else if(!telReg.test(this.state.Mobile)){
        Taro.showToast({
            title : '手机号格式错误' ,
            icon : 'none' ,
            mask : true
          })
    }else if(this.state.Password==''){
      Taro.showToast({
          title : '请输入密码' ,
          icon : 'none' ,
          mask : true
        })
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
      if(res.Success){
        Taro.setStorageSync('loginData',JSON.stringify(res.Result))
        Taro.switchTab({
          url: '/pages/index/index'
        
        })
        Taro.removeStorageSync('cabinflag')
        Taro.removeStorageSync('tablecurrent')
      }else{
        Taro.showToast({
          title : res.Message ,
          icon : 'none' ,
          mask : true,
          duration:3000,
        })
      }
    })
    .catch(err => {
      // if (!err.message) {
      //   return
      // }
      // Taro.showToast({
      //   title : err.message ,
      //   icon : 'none' ,
      //   mask : true
      // })
    })
  }
}
// 密码显示隐藏
showPassword(){
  if(this.state.inputType=='password'){
    this.setState({
      inputType:'text',
      inputTypeFlag:true,
    })
  }else{
    this.setState({
      inputType:'password',
      inputTypeFlag:false,
    })
  }
  
}
// 新企业注册
gotoRegister(){
  Taro.navigateTo({
    url: `/pages/companyRegister/index`
  })
}
onShareAppMessage(res) {
  if (res.from === 'menu') {
    // 右上角默认菜单的转发
    console.log(res.target)
  }
  return {
    title: `${shareTitle}`,
    path: 'pages/appIndex/index'
  }
}
  render() {
    const {showBtn,inputType,inputTypeFlag}=this.state
    return (
      <View className='login'>
        <View className='box'>
            <View className='systemName'>差旅自助系统</View>
            <View className='InvitationName'>密码登录</View>
            
            <View className='formBox'>
            <View className="tipsText">
              <View className="tipsSpan">如果您没有账号,可以</View>
              <View className="tipsSpan2" onClick={this.gotoRegister}>注册企业/团队</View>
              <View className="tipsSpan">账号,邀请伙伴一起使用</View>
            </View>
                <View className='li'>
                    <View className='imgBox'>
                       <Image className='IconImg' src={telIcon}/>
                    </View>
                    {/* <Input placeholder="手机号" type='tel' value={this.state.Mobile} onChange={this.handleMobileChange.bind(this)}/> */}

                    <AtInput style='flex-grow: 1;'
                      name='Mobile'
                      border={false}
                      type='phone'
                      placeholder='请输入手机号码'
                      value={this.state.Mobile}
                      onChange={this.handleMobileChange.bind(this)}
                    />
                </View>
                <View className='li'>
                    <View className='imgBox'>
                        <Image className='IconImg' src={paswordIcon}/>
                    </View>
                    {/* <Input placeholder="密码" type='password' value={this.state.Password} onChange={this.handlePasswordChange.bind(this)}/> */}
                    <AtInput style='flex-grow: 1;' 
                      name='Password' 
                      border={false}
                      type={inputType} 
                      placeholder='请输入密码'
                      value={this.state.Password}
                      onChange={this.handlePasswordChange.bind(this)}
                    />
                    <View className='imgBox' onClick={this.showPassword}>
                        {inputTypeFlag==true?<Image className='IconImg' src={pasEyeOpen}/>:<Image className='IconImg' src={pasEyeOff}/>
                        }
                    </View>
                </View>
                <Button disabled={showBtn} className={showBtn==true?'btn':'btn btnBg'} onClick={this._loginMsg}>登 录</Button>
             {/* <View className='btn btnBg' onClick={this._loginMsg}>登 录</View> */}
             <View className="goToBtnBox" style='padding-top: 40px;'>
              <View className="registerBtn" onClick={this.gotoRegister}>新企业/团队注册</View>
             </View>
             <View className='goToBtnBox'>
             
              <View className='goToBtn' onClick={this.gotoMsg}>短信登录</View>
             </View>
             
        </View>
      </View>
      
    </View>
    );
  }
}