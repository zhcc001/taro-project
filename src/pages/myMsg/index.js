import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {AtAvatar} from 'taro-ui'
import {getOninfo,getOnCompany,changrCompany,outLogin,shareCode} from '../../api/common'
import ren from './images/ren.png'
import wode_passener from './images/wode_passener.png'
import wode_wx from './images/wode_wx.png'
import wode_gengduo from './images/wode_gengduo.png'
import settingIcon from './images/sheZhi.png'
import checkBoxIcon from './images/login_selectActive.png'
import weiChenkBoxIcon from './images/login_select.png'
import geRenZiLiao from './images/gerenziliao.png'
import xiuGaiMiMa from './images/gerenzhongxin_xiugaimima.png'
import qieHuan from './images/qiye.png'
import shareCardIcon from './images/snimicfenxiang.png'
import codeImg from './images/codeImg.png'
import tongShiShare from './images/tongshi.png'
import gongchuIcon from './images/gongchudan.png'
import {shareTitle} from '../../api/commonVariable'
import likeIcon from './images/like.png'

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
      loginData:{},
      cabinData:[],
      cabinflag:0,
      isCompany:false,
      companyId:'',
      shareMask:false,
      shareTongMask:false,
      codeSrcImg:'',
      codeTongSrcImg:'',
      tablecurrent:''
    }
  }

  componentWillMount () {
     
  }
  componentDidMount () {
    console.log('1')
  } 
  componentWillReceiveProps (nextProps,nextContext) {
    console.log('2')
  } 
  componentWillUnmount () {
    console.log('3')
  } 
  componentDidShow () {
    this._getOnCompany()
     this._getOninfo()
     console.log('4')
     this.getShareCode()
     if (Taro.getStorageSync('tablecurrent')) {
        this.state.tablecurrent = Taro.getStorageSync('tablecurrent')
        console.log(this.state.tablecurrent, 'this.state.tablecurrent')
     }
   
  } 
  componentDidHide () {
    console.log('5')
  } 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
 
  _getOninfo(){
    getOninfo()
        .then(res=>{
          console.log(res)
          if(res.Success){
            console.log('重新')
            this.setState({
              loginData:res.Result
            })
          }
        })
        .catch(err=>{

        })
  }
  // 我的公出单
  gotoWellForm(){
    Taro.navigateTo({
      url: '/pages/wellForm/pages/myWellForm/index'

    })
  }
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
  gotoCollection(){
    Taro.navigateTo({
      url: '/pages/touristRoutes/pages/collection/index'
    })
  }
  // 显示微信解绑弹层
showMask(){
  this.setState({
    isOpened:true
  })
}
// 关闭弹层
handleCloseMask(){
  this.setState({
    isOpened:false,
    isCompany:false
  })
}
// 获取当前登录人企业
_getOnCompany(){
  getOnCompany()
  .then(res=>{
    console.log(res)
    if(res.Success){
      this.setState({
        cabinData:res.Result
      })
    }
  })
  .catch(err=>{

  })
}
// 显示企业弹层
showChangeCompany(){
  console.log(this.state.loginData.Vendor.Id)
  let companyId=[]
  this.state.cabinData.map((item,index)=>{
    companyId.push(item.Id)
  })

  this.setState({
    isCompany:true,
    cabinflag: companyId.indexOf(this.state.loginData.Vendor.Id)

  })
 
}
checkItem(item,index){
  console.log(item,'企业')
   this.setState({
    cabinflag:index,
    companyId:item.Id
  },()=>{
  })
};
// 切换企业

changeCompanBtn(){
  changrCompany(this.state.companyId)
  .then(res=>{
    console.log(res)
    if(res.Success){
      Taro.setStorageSync('loginData',JSON.stringify(res.Result))
      if (Taro.getStorageSync('saveStatus')) {
        Taro.removeStorageSync('saveStatus')
      }
      this._getOninfo()
    }
    this.handleCloseMask()
  })
  .catch(err=>{})
}
// 解除绑定
_outLogin(){
  let openId=Taro.getStorageSync('_openid')
  outLogin(openId)
  .then(res=>{
    if(res.Success){
      console.log(res,'解除绑定')
      this.setState({
        isOpened:false
      })
      // Taro.clearStorage()
      if(Taro.getStorageSync('loginData')){
        Taro.removeStorageSync('loginData')
      }

      // 用车规则
      if(Taro.getStorageSync('ruleFlag')){
        Taro.removeStorageSync('ruleFlag')
      }
      
      // 首页因公因私状态
      if (Taro.getStorageSync('saveStatus')) {
        Taro.removeStorageSync('saveStatus')
      }
      Taro.redirectTo({
        url:`/pages/login/index`
      })
    }
  })
  .catch(err=>{

  })
}
getShareCode(){
  shareCode()
    .then(res => {
      if (res.Success) {
        this.setState({
          codeSrcImg: res.Result.InviteUrl,
          codeTongSrcImg:res.Result.RegisterUrl
        }, () => {
          console.log(this.state.codeSrcImg)
          console.log(this.state.codeTongSrcImg)
        })
      } else {
        Taro.showToast({
          title: res.Message,
          icon: 'none',
          mask: true
        })
      }
    })
    .catch(err => {
      Taro.showToast({
        title: err.Message,
        icon: 'none',
        mask: true
      })
    })
}
// 分享名片
shareCard(flag){
  this.setState({
      shareMask: flag,
  },()=>{
    console.log(this.state.shareMask)
  })
}
shareTongCard(flag) {
  this.setState({
    shareTongMask: flag,
  }, () => {
    console.log(this.state.shareTongMask)
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
   const {userName,phone,fullName,loginData,cabinData,cabinflag,codeSrcImg,codeTongSrcImg,tablecurrent}=this.state
    return (
      <View className='myMsg'>
        <View className='content'>
          <View className="card flex">
            <Image className="info-img" src={settingIcon} onClick={this.gotoPersonalData}/>
            <View className="head-pic">
              <View className="circle sun-center">
                <AtAvatar circle openData={{ type: 'userAvatarUrl'}}></AtAvatar>
              </View>
            </View>
            
            <View className="info-desc">
              <View className="user-name">{loginData.Name ? loginData.Name : '账号姓名'}</View>
              <View className="user-phone">{loginData.Mobile ? loginData.Mobile : '请绑定手机号'}</View>
              <View className="user-full-name">{loginData.Vendor.FullName ? loginData.Vendor.FullName  : '公司名称'}</View>
            </View>
          </View>
       
          <View class="entrance">
            {tablecurrent==0&&<View className='liBox' onClick={this.gotoWellForm.bind(this)}>
              <Image className="entrance-img" src={gongchuIcon} />
              <Text className="entrance-title">我的公出单</Text>
              <Image className="more-icon" src={wode_gengduo} />
            </View>}
            <View className='liBox' onClick={this.gotoPassenger.bind(this)}>
              <Image className="entrance-img" src={wode_passener} />
              <Text className="entrance-title">{this.state.entranceTwo}</Text>
              <Image className="more-icon" src={wode_gengduo} />
            </View> 
            <View className='liBox' onClick={this.gotoPersonalData}>
              <Image className="entrance-img" src={geRenZiLiao} />
              <Text className="entrance-title">个人资料</Text>
              <Image className="more-icon" src={wode_gengduo} />
            </View> 
            <View className='liBox' onClick={this.gotoCollection}>
              <Image className="entrance-img" src={likeIcon} />
              <Text className="entrance-title">我的收藏</Text>
              <Image className="more-icon" src={wode_gengduo} />
            </View>
            <View className='liBox' onClick={this.gotoChangePassword}>
              <Image className="entrance-img" src={xiuGaiMiMa} />
              <Text className="entrance-title">修改密码</Text>
              <Image className="more-icon" src={wode_gengduo} />
            </View> 
            {cabinData.length>1&&<View className='liBox' onClick={this.showChangeCompany}>
              <Image className="entrance-img" src={qieHuan} />
              <Text className="entrance-title">切换企业</Text>
              <Image className="more-icon" src={wode_gengduo} />
            </View>}
            <View className='liBox' onClick={this.showMask.bind(this)}>
              <Image className="entrance-img" src={wode_wx} />
              <Text className="entrance-title">{this.state.entranceThr}</Text>
              <Text  className="un-bind">解除绑定</Text>
              {/* <Text className="uid">{this.state.uid}</Text> */}
            </View>
          </View>
          <View className='otherBox'>
              <View className='liBox' onClick={this.shareCard.bind(this,true)}>
                <Image className="entrance-img" src={shareCardIcon} />
                <Text className="entrance-title">邀请企业入驻</Text>
                <Image className="more-icon" src={wode_gengduo} />
              </View>
              <View className='liBox' onClick={this.shareTongCard.bind(this,true)}>
                <Image className="entrance-img" src={tongShiShare} />
                <Text className="entrance-title">邀请同事注册</Text>
                <Image className="more-icon" src={wode_gengduo} />
              </View>
          </View>
        </View>
        {this.state.isOpened&&<View className='cabinMask' >
          <View className="dialogBox" >
            <View className='dialog-h1'>退出登录</View>
           <View className="dialog-title">确定解除微信号绑定?</View>
            <View className="dialog-btn flex">
              <View  className="cancel-btn" onClick={this.handleCloseMask}>取消</View>
              <View className="submit-btn" onClick={this._outLogin}>确定</View>
            </View>
          </View>
        </View>}
        {this.state.isCompany&&<View className='cabinMask' >
          <View className="dialog-box" >
            <View className='dialog-h1'>切换企业</View>
            <View className='midContent'>
            {cabinData.map((item, index) => {
              return (
                <View className='checkCabin' onClick={this.checkItem.bind(this,item,index)}>
                   <Text className='cabinText'>{item.Name}</Text>
                   <View className='checkBoxImg'>
                     <Image className='checkBoxIcon' src={cabinflag==index?checkBoxIcon:weiChenkBoxIcon}/>
                    </View>
                </View>
              )
            })}
            </View>
            <View className="dialog-btn flex campanyBtn">
              <View  className="cancel-btn" onClick={this.handleCloseMask}>取消</View>
              <View className="submit-btn" onClick={this.changeCompanBtn}>确定</View>
            </View>
          </View>
        </View>}

        {this.state.shareMask&&<View className='cabinMask' onClick={this.shareCard.bind(this,false)}>
            <View className='shareContent'>
                <View className='picBox'>
                  <AtAvatar  circle openData={{ type: 'userAvatarUrl'}}></AtAvatar>
                </View>
                <View className='textCodeBox'>
                  <View className='maskTitle'>邀请企业入驻</View>
                </View>
                <Image src={codeSrcImg} className='codeImg'/>
            </View>
        </View>}

        {this.state.shareTongMask&&<View className='cabinMask' onClick={this.shareTongCard.bind(this,false)}>
            <View className='shareContent'>
                <View className='picBox'>
                  <AtAvatar  circle openData={{ type: 'userAvatarUrl'}}></AtAvatar>
                </View>
                <View className='textCodeBox'>
                  <View className='maskTitle'>邀请同事注册</View>
                </View>
                <Image src={codeTongSrcImg} className='codeImg'/>
            </View>
        </View>}
    </View>
    );
  }
}