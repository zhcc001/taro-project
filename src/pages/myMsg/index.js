import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import wode_bgc from './images/wode_bgc.png'
import ren from './images/ren.png'
import wode_publicOrder from './images/wode_publicOrder.jpg'
import wode_passener from './images/wode_passener.jpg'
import wode_wx from './images/wode_wx.jpg'
import wode_gengduo from './images/wode_gengduo.png'
import allOrder from './images/全部订单.png'
import pay from './images/待支付.png'
import piao from './images/已出票.png'
import tuiKuan from './images/待退款.png'
import setting from './images/设置.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '个人中心'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      current: 0,
      // 微信解绑
      showUnBind: false,
      // 退出登录
      showLogOut: false,
      //
      headPic: '',
      userName: '',
      phone: 18745454545,
      fullName: '上海牛邦网络科技有限公司',
      uid: '234sdk',
      entranceOne: '我的公出单',
      entranceTwo: '外部出行人',
      entranceThr: '微信绑定',
      loginInfo:{},
      isOpened:false,
      maskH1:'',
      maskType:0,
      maskTypeFlag:false,
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
  gotoOrder(){
    Taro.switchTab({
      url: '/pages/orderList/index'
      
    })
  }
  gotoPassenger(){
    Taro.navigateTo({
      url: '/pages/passengers/index'
      
    })
  }
  gotoPersonalData(){
    Taro.navigateTo({
      url: '/pages/personalData/index'
      
    })
  }
  gotoChangePassword(){
    Taro.navigateTo({
      url:'/pages/changePassword/index'
    })
  }
  // 显示订单弹层
showMask(){
  this.setState({
    isOpened:true
  })
}
// 关闭订单弹层
handleCloseMask(){
  this.setState({
    isOpened:false
  })
}
sureAdd(){
  
  this.handleCloseMask()
  
}
  render() {
   const {userName,phone,fullName}=this.state
    return (
      <View className='myMsg'>
        <View className='content'>
          <View className="card flex">
            <Image className="info-img" src={setting} />
            <View className="head-pic">
              <View className="circle sun-center">
                <Image className="pic" src={ren} />
                <View  className="nick-name">切换账号</View>
              </View>
            </View>
            <View className="info-desc">
              <View className="user-name">{userName ? userName : '账号姓名'}</View>
              <View className="user-phone">{phone ? phone : '请绑定手机号'}</View>
              <View className="user-full-name">{fullName ? fullName : '用户全称'}</View>
            </View>
          </View>
          <View className='orderModel'>
              <View className='orderItem' onClick={this.gotoOrder.bind(this)}>
                  <Image src={allOrder}/>
                  <View className='orderText'>全部订单</View>
              </View>
              <View className='orderItem' onClick={this.gotoOrder.bind(this)}>
                  <Image src={pay}/>
                  <View className='orderText'>待支付</View>
              </View>
              <View className='orderItem' onClick={this.gotoOrder.bind(this)}>
                  <Image src={piao}/>
                  <View className='orderText'>已出票</View>
              </View>
              <View className='orderItem' onClick={this.gotoOrder.bind(this)}>
                  <Image src={tuiKuan}/>
                  <View className='orderText'>待退款</View>
              </View>
          </View>
          <View class="entrance">
            <View className='liBox' onClick={this.gotoPassenger.bind(this)}>
              <Image className="entrance-img" src={wode_passener} />
              <Text className="entrance-title">{this.state.entranceTwo}</Text>
              <Image className="more-icon" src={wode_gengduo} />
            </View> 
            <View className='liBox' onClick={this.gotoPersonalData}>
              <Image className="entrance-img" src={wode_passener} />
              <Text className="entrance-title">个人资料</Text>
              <Image className="more-icon" src={wode_gengduo} />
            </View> 
            <View className='liBox' onClick={this.gotoChangePassword}>
              <Image className="entrance-img" src={wode_passener} />
              <Text className="entrance-title">修改密码</Text>
              <Image className="more-icon" src={wode_gengduo} />
            </View> 
            <View className='liBox' onClick={this.showMask.bind(this)}>
              <Image className="entrance-img" src={wode_wx} />
              <Text className="entrance-title">{this.state.entranceThr}</Text>
              <Text  className="un-bind">解除绑定</Text>
              <Text className="uid">{this.state.uid}</Text>
            </View>
          </View>
        </View>
        {this.state.isOpened&&<View className='cabinMask' onClick={this.handleCloseMask}>
          <View class="dialog-box">
            <View className='dialog-h1'>退出登录</View>
           <View class="dialog-title">确定解除微信号绑定?</View>
            <View class="dialog-btn flex">
              <View  class="cancel-btn" onClick={this.handleCloseMask}>取消</View>
              <View class="submit-btn" onClick={this.outLogin}>确定</View>
            </View>
          </View>
        </View>}
    </View>
    );
  }
}