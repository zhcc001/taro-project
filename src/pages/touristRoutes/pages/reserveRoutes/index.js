import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,ScrollView ,Picker } from '@tarojs/components'
import { AtTabs, AtTabsPane ,AtActivityIndicator,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast,AtInput,AtInputNumber} from 'taro-ui'
import {getPrice,getOninfo,submitOrder,payOrder} from '../../../../api/touristRoutes'
import souSuoIcon from './images/sousuo.png'
import clearIcon from './images/quxiao.png'
import sanJiaoIcon from './images/sanjiao.png'
import sanJiaoCheckIcon from './images/sanjiaoCheck.png'
import dingWeiIcon from './images/dingweiweizhi-3.png'
import jianTouIcon from './images/rightJiantou.png'
import backIcon from '../../../../common/image/backHome.png'
import {shareTitle} from '../../../../api/commonVariable'

import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '线路预订'
  }

  constructor(){
    super(...arguments)
    this.state={
      selector: [],
    selectorChecked: '2019-06-10',
    Mobile:'',
    Name:'',
    chengRenValue: 1,
    erTongValue:0,
    tirketOrderObj:{},
    ID:'',
    ChildSalePrice:'',
    AdultSalePrice:'',
    tuanQiData:[],
    loginData:{},
    PriceId:'',
    showOrerMask: false
    }
  }

  componentWillMount () {
    this._getOninfo()
    this.state.ID = this.$router.params.ID
    if(Taro.getStorageSync('tirketOrderMsg')){
      this.state.tirketOrderObj=JSON.parse(Taro.getStorageSync('tirketOrderMsg'))
    }
    
  }
  componentDidMount () {
    this._getPrice()
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 获取当前登录人
  _getOninfo(){
    getOninfo()
    .then(res=>{
      if(res.Success){
        console.log(res,'当前登录人')
        this.setState({
          loginData:res.Result,
          Name: res.Result.Name,
          Mobile:res.Result.Mobile
        },()=>{
          console.log(this.state.loginData)
          console.log(this.state.Name)
          console.log(this.state.Mobile)
        })
      }else{

      }
    })
  }
  // 获取团期
  _getPrice(){
    getPrice(this.state.ID)
    .then(res=>{
      if(res.Success){
        let testArr = res.Result.Result
        testArr.map((item, index) => {
          let arr1 = item.UseDate.split("T");
          let d1 = arr1[0];
          item.UseDate = d1
          this.state.selector.push(d1)
        })
        this.setState({
          selector: this.state.selector,
          selectorChecked:this.state.selector[0],
          tuanQiData: testArr,
          AdultSalePrice: testArr[0].AdultSalePrice,
          ChildSalePrice: testArr[0].ChildSalePrice,
          PriceId: testArr[0].Id
        },()=>{
          console.log(this.state.selector)
          console.log(this.state.tuanQiData)
        })
        console.log(testArr,'团期')
      }else{

      }
    })
  }
onChange = e => {
  console.log(e,'团期')
  this.setState({
    selectorChecked: this.state.selector[e.detail.value],
    AdultSalePrice: this.state.tuanQiData[e.detail.value].AdultSalePrice,
    ChildSalePrice: this.state.tuanQiData[e.detail.value].ChildSalePrice,
    PriceId: this.state.tuanQiData[e.detail.value].Id,
  },()=>{
    console.log(this.state.selectorChecked)
    console.log(this.state.AdultSalePrice)
    console.log(this.state.ChildSalePrice)
    console.log(this.state.PriceId)
  })
}
handleBigChange(value) {
  this.setState({
    chengRenValue:value
  }, () => {
    console.log(this.state.chengRenValue)
  })
}
handleSmallChange(value) {
  this.setState({
    erTongValue:value
  },()=>{
    console.log(this.state.erTongValue)
  })
}
handleMobileChange (value) {
    
    this.setState({
      Mobile:value,
    },()=>{
      console.log(this.state.Mobile)
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return this.state.Mobile
    
}
nameChange(value) {
  this.setState({
    Name: value
  }, () => {
    console.log(this.state.Name)

  })
  // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  return this.state.Name
}
backHome() {
  Taro.switchTab({
    url: '/pages/index/index'
  })
}

// 分享
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
// 提交订单
sureSubmitOrder() {
  let telReg = /^[1][1-9][0-9]{9}$/
  if (this.state.chengRenValue==0&&this.state.erTongValue==0) {
    Taro.showToast({
      title: '请至少选择一位',
      icon: 'none',
      mask: true
    })
    return
  }
  if(this.state.Name==''){
    Taro.showToast({
      title: '请填写联系人姓名',
      icon: 'none',
      mask: true
    })
    return
  }else if(this.state.Mobile==''){
    Taro.showToast({
      title: '请填写手机号',
      icon: 'none',
      mask: true
    })
    return
  } else if (!telReg.test(this.state.Mobile)) {
    Taro.showToast({
      title: '手机号格式错误',
      icon: 'none',
      mask: true
    })
    return
  }else{
    this.setState({
      showOrerMask:true
    },()=>{
      console.log(this.state.showOrerMask)
    })
    
  }
}
// 关闭订单弹层
handleCloseMask() {
  this.setState({
    showOrerMask: false,
  }, () => {
    console.log(this.state.showOrerMask)
  })
}
// 提交订单
sureBtn(){
  Taro.showLoading({
      title: '加载中',
      mask: true
    })
    let ProductBook={
      PriceId: this.state.PriceId,
      AdultCount: this.state.chengRenValue,
      ChildCount: this.state.erTongValue,
    }
    //提交订单接口
    submitOrder(this.state.ID,this.state.Name,this.state.Mobile,ProductBook)
    .then(res=>{
      if(res.Success){
        Taro.hideLoading()
        Taro.redirectTo({
          url: `/pages/touristRoutes/pages/routesOrderDetail/index?orderNumber=${res.Result}`

        })
      
      }else{
        Taro.showToast({
          title: res.Message,
          icon: 'none',
          mask: true
        })
      }
    })
}
//拖动不超过规定范围
setTouchMove(e) {
  if (e.touches[0].clientX < 650 && e.touches[0].clientY < 1110 && e.touches[0].clientX > 0 && e.touches[0].clientY > 0) {
    if (e.touches[0].clientX <= 304 && e.touches[0].clientY <= 413) {
      this.setState({
        left: e.touches[0].clientX,
        top: e.touches[0].clientY,
      }, () => {
        console.log(this.state.left, 'e.touches[0].clientX < 650 && e.touches[0].clientY < 1110 && e.touches[0].clientX > 0 && e.touches[0].clientY > 0')
        console.log(this.state.top, 'e.touches[0].clientX < 650 && e.touches[0].clientY < 1110 && e.touches[0].clientX > 0 && e.touches[0].clientY > 0')
      })
    } else {
      this.setState({
        left: 304,
        top: 413
      }, () => {
        console.log(this.state.left)
        console.log(this.state.top)
      })
    }
  } else {
    this.setState({
      left: 10,
      top: 10
    }, () => {
      console.log(this.state.left)
      console.log(this.state.top)
    })
  }

}
  render() {
    const {tirketOrderObj,AdultSalePrice,ChildSalePrice,erTongValue,chengRenValue,loginData} = this.state
    return (
      <View className='reserveTicket'>
        <View className="topProMsg">
          <View className="ticketLi" >
                          <View className="proImgBox">
                            <Image className='proPicImg' src={tirketOrderObj.ImageUrl}/>
                            {/* <View className='dingWeiBox'>
                              <Image className='dingWeiIcon' src={dingWeiIcon}/>
                              <Text className='dingWeiCity'>上海</Text>
                            </View> */}
                          </View>
                          <View className="rightBox">
                            <View className="proTitle">{tirketOrderObj.Name}</View>
                            <View className="otherBox">
                              <View className="priceBox">
                                <Text className='priceFuHao'>¥</Text>
                                <Text className='priceNum'>{tirketOrderObj.SalePrice}</Text>
                                <Text className="priceFuHao">起</Text>
                              </View>
                              <View className='proTextBox'>
                                {/* <View className="score">4.6分</View>
                                <View className='score'>|</View> */}
                                <View className="score">销量{tirketOrderObj.SaleCount}份</View>
                              </View>
                              
                            </View>
                          </View>
                        </View>
        </View>
        <View className="personMsg">
          <View className="box">
            <View className="itemLi">
              <View className='leftTxet' style='margin-right: 10px;'>团期</View>
              <View className="rightContent" style = 'flex-grow: 1;'>

                <Picker mode='selector'  range={this.state.selector} onChange={this.onChange} style = 'flex-grow: 1;'>
                  <View className='picker'>
                    {this.state.selectorChecked}
                  </View>
              </Picker>
              <View className="imgBox">
                <Image className='jiantou' src={jianTouIcon}/>
              </View>
              </View>
              
            </View>
            <View className="itemLi">
              <View className='leftTxet'>成人单价</View>
              <View className="leftTxet">￥{AdultSalePrice}/人</View>
            </View>
            <View className="itemLi">
              <View className='leftTxet'>儿童单价</View>
              <View className="leftTxet">￥{ChildSalePrice}/人</View>
            </View>
            <View className="itemLi">
              <View className='leftTxet'>出行人数</View>
              <View className="rightContent">
                <View className="leftTxet" style='margin-right: 20px;'>成人</View>
                <AtInputNumber
                  min={0}
                  max={10}
                  step={1}
                  value={this.state.chengRenValue}
                  onChange={this.handleBigChange.bind(this)}
                />
              </View>
            </View>
            <View className="itemLi" style='border:none;'>
              <View className="leftTxet" style='flex-grow: 1;'></View>
              <View className="rightContent">
                <View className="leftTxet" style='margin-right: 20px;'>儿童</View>
                <AtInputNumber
                  min={0}
                  max={10}
                  step={1}
                  value={this.state.erTongValue}
                  onChange={this.handleSmallChange.bind(this)}
                />
                </View>
              </View>
            <View className="itemLi">
              <View className='leftTxet' style='margin-right: 20px;'>联系人</View>
              <View className="rightContent" style='flex-grow: 1;'>
                <AtInput style = 'flex-grow: 1;'
                  name='Name'
                  type='text'
                  border={false}
                  placeholder='请输入姓名'
                  value={this.state.Name}
                  onChange={this.nameChange.bind(this)}
                />
              </View>
            </View>
            <View className="itemLi">
              <View className='leftTxet' style='margin-right: 20px;'>手机号</View>
              <View className="rightContent" style='flex-grow: 1;'>
                <AtInput style='flex-grow: 1;'
                      name='Mobile'
                      border={false}
                      type='phone'
                      placeholder='请输入手机号码'
                      value={this.state.Mobile}
                      onChange={this.handleMobileChange.bind(this)}
                    />
              </View>
            </View>
          </View>
        </View>
        <View className="footer">
            <View className="backHome">
                <View className="footerText">总价</View>
                <View className="totalPrice">￥{AdultSalePrice*chengRenValue+ChildSalePrice*erTongValue}</View>

            </View>
            <View className="buyBtn" onClick={this.sureSubmitOrder.bind(this)}>提交订单</View>
        </View>
        {/* 提交订单弹层 */}
        {showOrerMask&&<View className="cabinMask"></View>}
        {showOrerMask&&<View className="orderMask">
        <View className='orderMsgMaskTitle'>
                {/* <View className='at-col at-col-1 at-col--auto' onClick={this.handleCloseMask}>
                    <Image src={closeIcon} />
                </View> */}
                <View className='at-col' style='text-align: center;'>请核对订单信息</View>
              </View>
              <View className="box" style='padding-top:50px;'>
          <View class="hangBanMsg">
              <View class="biaoTi"><Text>线路信息</Text></View>
                  <View class="neiRong" style='padding-top:10px;'>
                    <Text className='textB'>{tirketOrderObj.Name}</Text>
                    {/* <View className='textP'></View>
                    <View className='textSpan'></View> */}
              </View>
          </View>
          <View class="hangBanMsg">
              <View class="biaoTi"><Text>联系人信息</Text></View>
               < View class = "neiRong"
               style = 'padding-top:10px;' >
                    <View className='textSpan'>姓名：{this.state.Name}</View> 
                    <View className='textSpan'>手机号：{this.state.Mobile}</View>
                    <View className='textSpan'>出行人数：成人{this.state.chengRenValue}人,儿童{this.state.erTongValue}人</View>
                    </View>
          </View> 
          <View class="hangBanMsg">
              <View class="biaoTi"><Text>合计金额</Text></View>
                    <View className='textSpan'>￥{AdultSalePrice*chengRenValue+ChildSalePrice*erTongValue}</View> 
          </View>  

          <View className='btn-Box'>
              <View className='cancel-Btn' onClick={this.handleCloseMask}>取消</View>
              <View  class="add-btn" onClick={this.sureBtn}>确定</View>
              </View> 
              </View>                
        </View>}
         {/* 返回首页 */}
        <View  style={`top:${this.state.top}px;left:${this.state.left}px;margin: 10% 0px 0px 0%;`} className='backBox' onClick={this.backHome} onTouchMove={this.setTouchMove.bind(this)}>
              <View className='backIconText'>
                  <Image className='backIcon' src={backIcon}/>
                  <View className='backText'>首页</View>
              </View>
        </View>
    </View>
    );
  }
}