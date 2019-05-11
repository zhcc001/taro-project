import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {AtInput} from "taro-ui"
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
       navigationBarTitleText: '修改密码'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      codeText:'获取验证码',
      rTime: 60,
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
      url: '/pages/login/index'
      
    })
  }
  getCode(){
    let rTime = this.state.rTime;
    let interval = setInterval(() => {
      if (--this.state.rTime <= 0) {
      console.log(this.state.rTime)
        this.setState({
          rTime : rTime,
          codeText:`${rTime}秒后重新获取`
        })
        
        clearInterval(interval);
      }
    }, 1000);
  }
  render() {
    return (
      <View className='changePassword'>
        <View className='box'>
            <View className='systemName'>逸旅云-差旅自助系统</View>
            <View className='InvitationName'>修改密码</View>
            <View className='formBox'>
                <View className='li'>
                
                    <View className='imgBox'>
                       <Image className='IconImg' src={tel}/>
                    </View>
                    <Input placeholder="手机号"/>
                </View>
                <View className='liBox'>
                   <View className='li'>
                        <View className='imgBox'>
                           <Image className='IconImg' src={code}/>
                        </View>
                        <Input placeholder="输入验证码"/>
                   </View>
                   <View className='code' onClick={this.getCode}>{this.state.codeText}</View>
                </View>
                <View className='li'>
                    <View className='imgBox'>
                        <Image className='IconImg' src={pasword}/>
                    </View>
                    <Input placeholder="新密码"/>
                    <View className='imgBox'>
                        <Image className='IconImg' src={pasEyeOff}/>
                        <Image className='IconImg' src={pasEyeOpen}/>
                    </View>
                </View>
            </View>
             <Text className='btn'>确认修改</Text>
        </View>
      </View>
    );
  }
}