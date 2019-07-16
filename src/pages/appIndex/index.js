import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import logo from '../../common/image/xingluqidong.png'
import indexIMg from '../../pages/appIndex/images/indexIMg.png'
import {_login} from '../../api/login'
import leftIcon from '../../common/image/left.png'
import rightIcon from '../../common/image/right.png'
import {shareTitle} from '../../api/commonVariable'
import './index.scss'
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
       
    return (
      // 逸旅云界面
      // <View className='appIndexYi'>
      //     <View className="yiLvYunBox">
      //       <View className="yiLvYunText1">让公司出行</View>
      //       <View className="yiLvYunText2">省钱又省心</View>
      //     </View>
      //       <Image className='yiLvYun'  src={indexIMg}/>
           
      // </View>
      // 行路界面
      <View className='appIndex'>
        <View className="logoBox">
            <Image className='logoImg' src={logo}/>
          </View>
          <View className="contentBox">
          <View className="content">
              <Image className='leftIcon' src={leftIcon}/>
              提供一站式差旅解决方案
              <Image className='rightIcon'  src={rightIcon}/>
          </View>
          </View>
          <View className='englishText'>Provide one-stop travel solutions</View>
          
      </View>
    );
  }
}