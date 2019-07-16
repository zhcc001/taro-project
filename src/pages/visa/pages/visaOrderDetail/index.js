import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Table} from '@tarojs/components'
import {AtModal,AtToast} from 'taro-ui'
import bannerBg from './images/banner.png'
import dingWeiIcon from './images/dingwei-2.png'
import visaMsgIcon from './images/qianzhengpeixun.png'
import backIcon from '../../../../common/image/backHome.png'
import guanBiIcon from './images/guanBi.png'
import duiHao from './images/duiHao.png'
import keFuIcon from './images/kefu.png'
import {shareTitle} from '../../../../api/commonVariable'
import {getOrderMsg,payOrder,cancelOrderMsg } from '../../../../api/common'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '签证订单详情'
  }

  constructor(){
    super(...arguments)
    this.state={
      orderDetailObj:{},
      orderNumber:'',
      showSuccess:false,
      orderTips: '',
      orderTipsContent: '',
      PayStatus:'',
       showMask: false,
    
    }
  }

  componentWillMount () {
    this.state.orderNumber=this.$router.params.orderNumber
    this._getVisaDetail()
  }
  componentDidMount () {
    
    
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
    
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  _getVisaDetail(){
    getOrderMsg(this.state.orderNumber)
    .then(res=>{
      if(res.Success){
        this.setState({
          orderDetailObj:res.Result
        },()=>{
          console.log(this.state.orderDetailObj)
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
  showSuccess(flag) {
      this.setState({
        showSuccess: flag
      }, () => {
        console.log(this.state.showSuccess)
        if(this.state.showSuccess==false){
          this._getVisaDetail()
        }
      })
    }
     btnClick(num) {
       if (num == 3) {
         this.atOncePay()
       } else if (num == 1) {
         this._cancelOrderMsg(1)
       } else if (num == 2) {
         this._cancelOrderMsg(2)
       }
     }
     handleCancel() {
       this.setState({
         showMask: false
       },()=>{
         console.log(this.state.showMask)
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
           cancelOrderMsg(this.state.orderNumber)
             .then(res => {
               console.log(res)
               if (res.Success) {
                 Taro.hideLoading()
                 Taro.showToast({
                   title: '订单已取消',
                   icon: 'none',
                   mask: true
                 })
                 this._getVisaDetail()
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
           delOrderMsg(this.state.orderNumber)
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
      _cancelOrderMsg(PayStatus) {
        if (PayStatus == 1) {
          this.setState({
            showMask: true,
            orderTips: '取消订单',
            orderTipsContent: '确定取消订单吗？',
            PayStatus: PayStatus,
            // orderId: this.state.orderDetailObj.Id
          }, () => {
            console.log(this.state.PayStatus)
          })

        } else {
          this.setState({
            showMask: true,
            orderTips: '删除订单',
            orderTipsContent: '确定删除订单吗？',
            PayStatus: PayStatus,
            // orderId: this.state.orderDetailObj.Id
          }, () => {
            console.log(this.state.PayStatus)
          })

        }
      }
     // 支付
     atOncePay() {
       let ID = this.state.orderDetailObj.Id
       let openid = Taro.getStorageSync('_openid')
        payOrder(ID, openid)
         .then(res => {
           console.log(res, '支付参数')
           if (res.Success) {
             let that = this
             Taro.requestPayment({
               timeStamp: res.Result.timeStamp,
               nonceStr: res.Result.nonceStr,
               package: res.Result.package,
               signType: 'MD5',
               paySign: res.Result.paySign,
               success(res) {
                 console.log(res, '支付成功')
                 that.showSuccess(true)

               },
               fail(err) {
                 console.log(err, '支付失败')
               }
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
    const {orderDetailObj,orderNumber}=this.state
    return (
      <View className='orderDetailBox'>
        <View className="topBanner">
          <View className="leftMsg">
            <View className='leftMsgP'>订单状态：{orderDetailObj.StatusInfo}</View>
              <View className='peiceMsgB'>¥{orderDetailObj.CurrentAmount}</View>
            <View className='orderNumberSpan'>订单号：{orderDetailObj.Id}</View>
          </View>
          <Image src={bannerBg} />
        </View>
         <View className="positionBox">
            <View className="personalMsg">
              <View className="box">
              <View className="dingWeiBox">
                <Image src={dingWeiIcon} />
              </View>
                
                <View className="rightMsg">
                  <View className='rightMsgText'>
                    <View className='rightMsgTextB'>{orderDetailObj.LinkerName}</View>
                    <View className='rightMsgTextB'>{orderDetailObj.LinkerMobile}</View>
                  </View>
                  <View className='rightMsgTextSpan'>地址：{orderDetailObj.ProductOrder.AddressInfo!=''?orderDetailObj.ProductOrder.AddressInfo:'暂无'}</View>
                </View>
              </View>
            </View>
          </View>
           <View className="visaMsg">
              <View className="title">
                <Image src={visaMsgIcon} />
                <View className='visaMsgH3'>签证信息</View>
              </View>
              <View className="visaPro">
                <Image src={orderDetailObj.ImageUrl} />
                <View className="proMsg">
                  <View className='visaMsgH3'>{orderDetailObj.Name}</View>
                  <View className='visaProP'>
                    <View className='visaProSpan'>数量：{orderDetailObj.ProductOrder.PersonCount}</View>
                    <View className='visaProSpan'>类型：{orderDetailObj.VisaType.Name}</View>
                  </View>
                  <View className='visaMsgH3'>￥{orderDetailObj.ProductOrder.SalePrice}</View>
                </View>
              </View>
               
            </View>
           
            <View className='footer'>
          <View className="keFu">
            <Button open-type="contact" ></Button>
                <Image src={keFuIcon} className='keFuIcon'/>
                <View className="footerText">咨询</View>
            </View>
          {orderDetailObj.Operates.map((item,index)=>{
            return (
              <View className={item.Id==3?'btn payBtn':'btn'} onClick={this.btnClick.bind(this,item.Id)}>{item.Name}</View>
            )
            
          })}
      </View>  

           {/* 支付成功弹层 */}
        {showSuccess&&<View className="tickertMask"></View>}
        {showSuccess&&<View className="registerMask">
            <Image src={guanBiIcon} className='guanBiIcon' onClick={this.showSuccess.bind(this,false)}/>
            
                    <View className='imgBox'>
                        <Image src={duiHao}/>
                        <Text>支付成功</Text>
                    </View>
                    <View className="orderMaskMsg">
                    <View className='tipsNull'>
                      <View className='tipsMsg'>
                      <Text className='tipsText1'>订单号：{orderDetailObj.Id}</Text>
                      </View>
                      </View>
                      <View className='tipsNull'>
                      <View className='tipsMsg'>
                        <Text className='tipsText1'>订单金额：￥{orderDetailObj.CurrentAmount}</Text>
                      </View>
                       </View>
                    </View>
               
        </View>}
        <AtModal
          isOpened={this.state.showMask}
          title={this.state.orderTips}
          cancelText='取消'
          confirmText='确认'
          onCancel={ this.handleCancel }
          onConfirm={ this.handleConfirm }
          content={this.state.orderTipsContent}
        />
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