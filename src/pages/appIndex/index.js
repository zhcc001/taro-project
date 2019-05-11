import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {_login} from '../../api/login'
import pageInit from '../../utils/pageInit'
@pageInit()
export default class Index extends Component  {

   config = {
       navigationBarTitleText: ''
  }

  constructor(){
    super(...arguments)
    this.state={
    }
  }

  componentWillMount () {
  }
  componentDidMount () {
    this.login()
    
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  login() {
    // this.stateLogin = true
    _login(function(res) {
      console.log(res)
    })
  }
  render() {
    const canIUse= wx.canIUse('button.open-type.getUserInfo')
       
    return (
      <View className='appIndex'>
     
        </View>
    );
  }
}