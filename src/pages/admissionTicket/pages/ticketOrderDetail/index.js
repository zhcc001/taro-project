import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Table} from '@tarojs/components'
import {AtModal,AtToast} from 'taro-ui'
import {getOrderDatail,submitOrder,payOrder } from '../../../../api/ticket'
import {cancelOrderMsg,delOrderMsg} from '../../../../api/common'
import duiHao from './images/duiHao.1.png'
import guanBiIcon from './images/guanBi.png'
import backIcon from '../../../../common/image/backHome.png'
import proPicImg from './images/proPic.png'
import {shareTitle} from '../../../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '门票订单详情'
  }

  constructor(){
    super(...arguments)
    this.state={
      orderDetailObj:{},
      orderNumber:'',
      startPlace:'',
      endPlace:'',
      CreateDateText:'',
      showMask:false,
      orderTips:'',
      orderTipsContent:'',
      showLoading:false,
      startTime:'',
      endTime:'',
      PayStatus:'',
      showSuccess:false
    }
  }

  componentWillMount () {
    this.state.orderNumber=this.$router.params.orderNumber
  }
  componentDidMount () {
    this._getOrderDatail()
    
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 获取订单详情
  _getOrderDatail(){
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    
    getOrderDatail(this.state.orderNumber)
    .then(res=>{
      if(res.Success){
        
        this.setState({
          orderDetailObj: res.Result
        },()=>{
          console.log(this.state.orderDetailObj)
        })
      }else{
        Taro.showToast({
          title: resp.Message,
          icon: 'none',
          mask: true
        })
      }
      Taro.hideLoading()
    })
  }
  // 支付
  atOncePay(){
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    let orderNumber = this.state.orderNumber
    let openid = Taro.getStorageSync('_openid')
        payOrder(orderNumber,openid)
        .then(resp=>{
          console.log(resp, '支付参数')
          if (resp.Success) {
            let that=this
            Taro.hideLoading()
            Taro.requestPayment({
              timeStamp: resp.Result.timeStamp,
              nonceStr: resp.Result.nonceStr,
              package: resp.Result.package,
              signType: 'MD5',
              paySign: resp.Result.paySign,
              success(data) {
                console.log(data,'支付成功')
                
                that.showSuccessMask(true)
                
              },
              fail(err) { 
                console.log(err,'支付失败')
              }
            })
            // .then(res=>{
            //   console.log(res, '支付成功')
            //   if(res.Success){
            //     this.showSuccessMask(true)
            //   }else{
            //     // Taro.showToast({
            //     //   title: resp.Message,
            //     //   icon: 'none',
            //     //   mask: true
            //     // })
            //   }
            // })
          }else{
          Taro.showToast({
            title: resp.Message,
            icon: 'none',
            mask: true
          })
          // Taro.redirectTo({
          //   url: `/pages/admissionTicket/pages/ticketPaySuccess/index?orderNumber=${orderNumber}&pay=2`
          // })
          Taro.hideLoading()
         
        }
        })
        .catch(err=>{
          Taro.hideLoading()
        })
     
  }
   showSuccessMask(flag) {
     this.setState({
       showSuccess: flag
     }, () => {
       console.log(this.state.showSuccess)
       if (this.state.showSuccess == false) {
         this._getOrderDatail()
       }
     })
   }
   // 取消订单
   handleConfirm() {
     Taro.showLoading({
       title: '加载中',
       mask: true
     })
     if (this.state.PayStatus == 1) {
       console.log('取消')
       cancelOrderMsg(this.state.orderId)
         .then(res => {
           console.log(res)
           if (res.Success) {
             Taro.hideLoading()
             Taro.showToast({
               title: '订单已取消',
               icon: 'none',
               mask: true
             })
             this._getOrderDatail()
             // this.setState({
             //   showLoading:false
             // })
           } else {
             Taro.hideLoading()
             Taro.showToast({
               title: res.Message,
               icon: 'none',
               mask: true
             })
           }
           this.handleCancel()
         })
         .catch(err => {
           Taro.hideLoading()
           Taro.showToast({
             title: err.Message,
             icon: 'none',
             mask: true
           })
         })

     } else {
       console.log('删除')
       delOrderMsg(this.state.orderId)
         .then(res => {
           console.log(res)
           if (res.Success) {
             Taro.hideLoading()
             Taro.switchTab({
               url: `/pages/orderList/index`
             })
           } else {
             Taro.hideLoading()
             Taro.showToast({
               title: res.Message,
               icon: 'none',
               mask: true
             })
           }
           this.handleCancel()
         })
         .catch(err => {
           Taro.hideLoading()
           Taro.showToast({
             title: err.Message,
             icon: 'none',
             mask: true
           })
         })
       this.handleCancel()
     }

   }
   handleCancel() {
     this.setState({
       showMask: false
     })
   }
   _cancelOrderMsg(PayStatus) {
     if (PayStatus == 1) {
       this.setState({
         showMask: true,
         orderTips: '取消订单',
         orderTipsContent: '确定取消订单吗？',
         PayStatus: PayStatus,
         orderId: this.state.orderDetailObj.Id
       }, () => {
         console.log(this.state.PayStatus)
       })

     } else {
       this.setState({
         showMask: true,
         orderTips: '删除订单',
         orderTipsContent: '确定删除订单吗？',
         PayStatus: PayStatus,
         orderId: this.state.orderDetailObj.Id
       }, () => {
         console.log(this.state.PayStatus)
       })

     }
   }
  btnClick(num){
    if(num==3){
      this.atOncePay()
    }else if(num==1){
      this._cancelOrderMsg(1)
    }else if(num==2){
      this._cancelOrderMsg(2)
    }
  }
  backHome() {
    Taro.switchTab({
      url: '/pages/index/index'
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
    const {shengJiMsg,orderDetailObj,startTime,endTime}=this.state
    return (
      <View className='orderDetailBox'>
      
        <View className='OrderDetail'>

          <View className='OrderMessage'>
            <Text class="OrderNumber">订单号： {orderDetailObj.Id}</Text>
            <View className='PlaneMessage'>
             
              <View className="TimeAndPlace">
                <View className="ticketLi" >
                          <View className="rightBox">
                            <View className="proTitle">{orderDetailObj.ProductOrder.Name}</View>
                            <View className="otherBox">
                              <View className="priceBox">
                                <Text className='priceFuHao'>¥</Text>
                                <Text className='priceNum'>{orderDetailObj.ProductOrder.AdultSalePrice}</Text>
                                <Text className="priceFuHao">起</Text>
                              </View>
                              {/* <View className='proTextBox'>
                                <View className="score">4.6分</View>
                                <View className='score'>|</View>
                                <View className="score">销量59份</View>
                              </View> */}
                              
                            </View>
                          </View>
                        </View>
             </View>
             <View className="AirMessage">
                <View className="msgTextBox">
                  <View className="leftText">支付状态</View>
                  <View className="rightText">{orderDetailObj.StatusInfo}</View>
                </View>
                <View className="msgTextBox">
                  <View className="leftText">支付金额</View>
                  <View className="rightText">￥{orderDetailObj.CurrentAmount}</View>
                </View>
             </View>
             {/* <View className="explain">行李额以及机票退改签规则说明 ></View> */}
            </View>
          </View>
          <View className="passengermsg">
              <View className="msgtitle">
                <Text>联系人信息 </Text>
              </View>
              <View className="container">
                <View className="box">
                    <View className="msgTextBox">
                      <View className="leftText">联系人</View>
                      <View className="rightText">{orderDetailObj.LinkerName}</View>
                    </View>
                    <View className="msgTextBox">
                      <View className="leftText">手机号</View>
                      <View className="rightText">{orderDetailObj.LinkerMobile}</View>
                    </View>
                    <View className="msgTextBox">
                      <View className="leftText">出行人数</View>
                      <View className="rightText">成人{orderDetailObj.ProductOrder.AdultCount}人，儿童{orderDetailObj.ProductOrder.ChildCount}人</View>
                    </View>
                  </View>
              </View>
            </View>
            <View className="passengermsg">
              <View className="msgtitle">
                <Text>支付详情 </Text>
              </View>
              <View className="container">
               < View className = "box" >
                <View className="msgTextBox">
                  <View className="leftText">成人旅客</View>
                  <View className="rightText">￥{orderDetailObj.ProductOrder.AdultSalePrice}*{orderDetailObj.ProductOrder.AdultCount}</View>
                </View>
                {orderDetailObj.ProductOrder.ChildCount!=0&&< View className = "msgTextBox" >
                  <View className="leftText">儿童旅客</View>
                  <View className="rightText">￥{orderDetailObj.ProductOrder.ChildSalePrice}*{orderDetailObj.ProductOrder.ChildCount}</View>
                </View>}
                <View className="msgTextBox">
                  <View className="leftText">实付金额</View>
                  <View className="rightText">￥{orderDetailObj.PaidAmount}</View>
                </View>
                </View>
              </View>
            </View>
            <View className="passengermsg">
              <View className="msgtitle">
                <Text>订单信息 </Text>
              </View>
              <View className="container">
               < View className = "box" >
                <View className="msgTextBox">
                  <View className="leftText">订单号</View>
                  <View className="rightText">{orderDetailObj.Id}</View>
                </View>
                <View className="msgTextBox">
                  <View className="leftText">订单状态</View>
                  <View className="rightText">{orderDetailObj.PayStatus.Name}</View>
                </View>
                <View className="msgTextBox">
                  <View className="leftText">订单时间</View>
                  <View className="rightText">{orderDetailObj.CreateDate}</View>
                </View>
                {/* <View className="msgTextBox">
                  <View className="leftText">优惠信息</View>
                  <View className="rightText">￥446</View>
                </View> */}
                </View>
              </View>
            </View>
        </View>
        <AtModal
          isOpened={this.state.showMask}
          title={this.state.orderTips}
          cancelText='取消'
          confirmText='确认'
          onCancel={ this.handleCancel }
          onConfirm={ this.handleConfirm }
          content={this.state.orderTipsContent}
        />
        <View className='footer'>
          
          {orderDetailObj.Operates.map((item,index)=>{
            return (
              <View className={item.Id==3?'btn payBtn':'btn'} onClick={this.btnClick.bind(this,item.Id)}>{item.Name}</View>
            )
            
          })}
      </View> 
    {/* 支付成功弹层 */}
        {showSuccess&&<View className="tickertMask"></View>}
        {showSuccess&&<View className="registerMask">
            <Image src={guanBiIcon} className='guanBiIcon' onClick={this.showSuccessMask.bind(this,false)}/>
            
                    <View className='imgBox'>
                        <Image src={duiHao}/>
                        <Text>支付成功</Text>
                    </View>
                    <View className="orderMaskMsg">
                    <View className='tipsNull'>
                      <View className='tipsMsg'>
                      <Text className='tipsText1'>订单号：</Text>
                        <Text>{orderDetailObj.Id}</Text>
                      </View>
                      </View>
                      <View className='tipsNull'>
                      <View className='tipsMsg'>
                        <Text className='tipsText1'>订单金额：</Text>
                        <Text>￥{orderDetailObj.CurrentAmount}</Text>
                      </View>
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