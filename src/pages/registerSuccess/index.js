import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import duiHao from './images/duiHao.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '注册成功'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      showFlag:true,
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
  gotoLogin(){
    Taro.navigateTo({
      url: '/pages/login/index'
      
    })
  }
  render() {
    return (
      <View className='registerSuccess'>
        <View className='box'>
            <View className='systemName'>逸旅云-差旅自助系统</View>
            <View className='tipsBox'>
                <View className='tipsText'>
                    <View className='imgBox'>
                        <Image src={duiHao}/>
                        <Text>注册成功</Text>
                    </View>
                    {this.state.showFlag==false?<Text className='tipsMsg'>本系统仅授权员工可以使用，请通知公司负责人审核通过。</Text>:<View className='btn' onClick={this.gotoLogin}>已通过，进入系统</View>}
                </View>
            </View>
      </View>
    </View>
    );
  }
}