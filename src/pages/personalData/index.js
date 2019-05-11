import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import { AtSteps } from 'taro-ui'
import duiHao from './images/duiHao.png'
import errIcon from './images/err.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '个人资料'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      tel:'1565556678'
      
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
  gotoOrderDetail(){
    Taro.navigateTo({
      url: '/pages/orderDetail/index'
      
    })
  }
  render() {
    
    return (
      <View className='personalData'>
        <View className='msgContent'>
          <View className='companyName'>{this.state.companyName}</View>
          <View className='tel'>{this.state.tel}</View>
          <Input placeholder='请输入姓名'/>
          <Input placeholder='请输入身份证号码'/>
          <View className='btn'>确定修改</View>
        </View>
    </View>
    );
  }
}