import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import { AtSteps } from 'taro-ui'
import duiHao from './images/duiHao.png'
import errIcon from './images/err.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '支付成功'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      showFlag:true,
      current: 4,
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
    const items = [
      { 'title': '航空公司'},
      { 'title': '选择舱位'},
      { 'title': '预订信息'},
      { 'title': '在线支付'},
      { 'title': '预订成功'}
    ]
    return (
      <View className='paySuccess'>
        
        <View className='topSteps'>
            <AtSteps items={items} current={this.state.current} onChange={this.onChange.bind(this)} />
        </View>
        <View className='box'>
            <View className='tipsBox'>
                <View className='tipsText'>
                    <View className='imgBox'>
                        {this.state.showFlag==true?<Image src={duiHao}/>:<Image src={errIcon}/>}
                        {this.state.showFlag==true?<Text>支付成功</Text>:<Text>支付失败</Text>}
                    </View>
                    <Text className='tipsMsg'>订单号：2019043012008</Text>
                    <View className='btn' onClick={this.gotoOrderDetail}>查看订单</View>
                </View>
            </View>
      </View>
    </View>
    );
  }
}