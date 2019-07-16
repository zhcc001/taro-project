import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Table,Picker,MovableArea} from '@tarojs/components'
import {AtModal,AtToast,AtTextarea} from 'taro-ui'
import {getOrderMsg,payOrder,cancelOrderMsg,delOrderMsg,getReason,sureTuiGai} from '../../api/common'
import duiHao from './images/duiHao.png'
import Money from './images/money.png'
import Book_Progress from './images/book_progress.png'
import backIcon from '../../common/image/backHome.png'
import keFuIcon from './images/kefu.png'
import guanBiIcon from './images/guanBi.png'
import rightIcon1 from './images/right1.png'
import rightIcon from './images/right.png'
import carDel from '../../common/carImage/shanchu-2.png'
import jianTouIcon from '../../common/image/rightJiantou.png'
import {shareTitle} from '../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '订单详情'
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
      showSuccess:false,
      colorV:false,
      reason: '请选择',
      selector: [],
      maskTitle:'',
      showTuiGai:false,
      typeText:'',
      showTextarea:true,
      reasonValue: '',
      showchengKe:false,
      tuiGaiType:'',
      chengKeTitle:'选择改签的乘机人',
      chengKeId:[],
      reasonId:'',
      showTuiGaiBtn:true,
      chengKeData:[],
      checkedDataObj: {},
      pinCheTime:false,
      pinCheSTime:false,
      startCityName:'',
      endCityName:'',
      timeDuration:'',
      tipsFlag:false,
    }
  }

  componentWillMount () {
    this.state.orderNumber=this.$router.params.orderNumber
    this.state.startCityName = JSON.parse(Taro.getStorageSync('startCityObj')).Name
    this.state.endCityName = JSON.parse(Taro.getStorageSync('endCityObj')).Name
    
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
    this._getOrderMsg()
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
// 获取订单详情
  _getOrderMsg(){
    getOrderMsg(this.state.orderNumber)
    .then(res=>{
      if(res.Success){
        // 累计时长
         // 小时
         let t5 = res.Result.ProductOrder.Voyages[0].Duration
         let tarr5 = t5.split('.000');
         let marr5 = tarr5[0].split(':');
         let dd5 = marr5[0] + ":" + marr5[1];
         let xiaoshi = `${parseInt(marr5[0])}H${marr5[1]}MIN`
         console.log(xiaoshi, 'tarr5')
         
        // 出行时间
          let arr1=res.Result.ProductOrder.Voyages[0].Departure.Datetime.split("T");
          let d1=arr1[0];
          let darr1 = d1.split('-');
          let t1=arr1[1];
          let tarr1 = t1.split('.000');
          let marr1 = tarr1[0].split(':');
          let dd1 =marr1[0]+":"+marr1[1];
          // 到达时间
          let arr2=res.Result.ProductOrder.Voyages[0].Arrival.Datetime.split("T");
          let d2=arr2[0];
          let darr2 = d2.split('-');
          let t2=arr2[1];
          let tarr2 = t2.split('.000');
          let marr2 = tarr2[0].split(':');
          let dd2 =marr2[0]+":"+marr2[1];
          // 订单创建时间
          let arr3=res.Result.CreateDate.split("T");
          let d3=arr3[0];
          if (res.Result.ProductOrder.Vehicle!=null) {
            console.log('Vehicle!=null')
            if (res.Result.ProductOrder.Vehicle.Pickup!=null) {
              console.log('Vehicle.Pickup!=null')
              if (res.Result.ProductOrder.Vehicle.Pickup.Type.Id == '10021') {
                console.log('Pickup.Type.Id ==')
                this.setState({
                  pinCheTime: true,
                }, () => {
                  console.log(this.state.pinCheTime)
                })
              } else {
                this.setState({
                  pinCheTime: false,
                }, () => {
                  console.log(this.state.pinCheTime)
                })
              }
            }
            if (res.Result.ProductOrder.Vehicle.Sending != null) {
              if (res.Result.ProductOrder.Vehicle.Sending.Type.Id == '10021') {
                this.setState({
                  pinCheSTime: true,
                }, () => {
                  console.log(this.state.pinCheSTime)
                })
              } else {
                this.setState({
                  pinCheSTime: false,
                }, () => {
                  console.log(this.state.pinCheSTime)
                })
              }
            }
          }
          let btnArr=[]
          res.Result.Operates.map((t,i)=>{
            if(t.Id=='3'){
              btnArr.push(t.Id)
            }
          })
          if(btnArr.length>0){
            this.setState({
              tipsFlag:true
            },()=>{
              console.log(this.state.tipsFlag)
            })
          }else{
            this.setState({
              tipsFlag: false
            }, () => {
              console.log(this.state.tipsFlag)
            })
          }
        this.setState({
          orderDetailObj:res.Result,
          startPlace:res.Result.Name.split('-')[0],
          endPlace:res.Result.Name.split('-')[1],
          startTime:dd1,
          endTime:dd2,
          CreateDateText:d3,
          timeDuration:xiaoshi

        },()=>{
          console.log(this.state.startTime,this.state.endTime)
          console.log(this.state.startTime, this.state.orderDetailObj)
          console.log(this.state.startTime, this.state.startPlace)
          console.log(this.state.startTime, this.state.endPlace)
          console.log(this.state.startTime, this.state.CreateDateText,this.state.timeDuration)
          let statusId=[]
          this.state.orderDetailObj.ProductOrder.Passengers.map((item,index)=>{
            if(item.Status.Id==4){
              statusId.push(item)
              
            }else{
             
            }
          })
          if (statusId.length>0) {
            this.setState({
              showTuiGaiBtn: true
            }, () => {
              console.log(this.state.showTuiGaiBtn)
            })
          }else{
             this.setState({
               showTuiGaiBtn: false
             }, () => {
               console.log(this.state.showTuiGaiBtn)
             })
          }
          
        })
      }
    })
    .catch(err=>{

    })
  }
// 取消、删除订单
  handleConfirm(){
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    if(this.state.PayStatus==1){
      console.log('取消')
      cancelOrderMsg(this.state.orderNumber)
    .then(res=>{
      console.log(res)
      if(res.Success){
        Taro.hideLoading()
        Taro.showToast({
          title : '订单已取消' ,
          icon : 'none' ,
          mask : true
        })
        this._getOrderMsg()
        // this.setState({
        //   showLoading:false
        // })
      }else{
        Taro.hideLoading()
        Taro.showToast({
          title : res.Message ,
          icon : 'none' ,
          mask : true
        })
      }
      this.handleCancel()
    })
    .catch(err=>{
      Taro.hideLoading()
      Taro.showToast({
        title :err.Message ,
        icon : 'none' ,
        mask : true
      })
    })
    
    }else{
      console.log('删除')
      delOrderMsg(this.state.orderNumber)
      .then(res=>{
        console.log(res)
        if(res.Success){
          Taro.hideLoading()
          Taro.switchTab({
            url:`/pages/orderList/index`
          })
        }else{
          Taro.hideLoading()
          Taro.showToast({
            title : res.Message ,
            icon : 'none' ,
            mask : true
          })
        }
        this.handleCancel()
      })
      .catch(err=>{
        Taro.hideLoading()
        Taro.showToast({
          title :err.Message ,
          icon : 'none' ,
          mask : true
        })
      })
      this.handleCancel()
    }
    
  }
  handleCancel(){
    this.setState({
      showMask:false
    })
  }
  _cancelOrderMsg(PayStatus){
    if(PayStatus==1){
      this.setState({
        showMask:true,
        orderTips:'取消订单',
        orderTipsContent:'确定取消订单吗？',
        PayStatus:PayStatus,
        // orderId:this.state.orderDetailObj.Id
      },()=>{
        console.log(this.state.PayStatus)
      })
    
  }else{
    this.setState({
      showMask:true,
      orderTips:'删除订单',
      orderTipsContent:'确定删除订单吗？',
      PayStatus:PayStatus,
      // orderId:this.state.orderDetailObj.Id
    },()=>{
        console.log(this.state.PayStatus)
    })
    
  }
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
// 支付
  atOncePay(){
    let ID=this.state.orderDetailObj.Id
    let openid = Taro.getStorageSync('_openid')
        payOrder(ID, openid)
        .then(res=>{
          console.log(res,'支付参数')
          if(res.Success){
            let that=this
            Taro.requestPayment({
              timeStamp: res.Result.timeStamp,
              nonceStr:res.Result.nonceStr,
              package: res.Result.package,
              signType: 'MD5',
              paySign: res.Result.paySign,
              success(res) {
                console.log(res,'支付成功')
                // Taro.navigateTo({
                //   url: `/pages/planeTicket/pages/paySuccess/index?pay=1&orderNumber=${ID}`
                // })
                that.showSuccess(true)
                
               },
              fail(err) { 
                console.log(err,'支付失败')
                // Taro.navigateTo({
                //   url: `/pages/planeTicket/pages/paySuccess/index?pay=2&orderNumber=${ID}`
                // })
              }
            })
          }else{
            Taro.showToast({
              title :res.Message ,
              icon : 'none' ,
              mask : true
            })
          }
        })
        .catch(err=>{
          Taro.showToast({
            title :err.Message ,
            icon : 'none' ,
            mask : true
          })
        })
  }
  showSuccess(flag) {
      this.setState({
        showSuccess: flag
      }, () => {
        console.log(this.state.showSuccess)
        if(this.state.showSuccess==false){
          this._getOrderMsg()
        }
      })
    }
// 获取改签退票原因
    _getReason(){
      let type=''
      if(this.state.tuiGaiType==1){
        type = 'rebook'
      }else{
        type = 'refund'
      }
      getReason(type)
      .then(res=>{
        if(res.Success){
          this.setState({
            selector:res.Result
          },()=>{
            console.log(this.state.selector)
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
// 选择改签或退款乘机人
    checkChengKe(item,index){
      this.state.chengKeData[index].IsSelected = !this.state.chengKeData[index].IsSelected
      this.setState({
        chengKeData: this.state.chengKeData
      },()=>{
        console.log(this.state.chengKeData)
      })
      
    }
// 改签原因
    reasonChange = e => {
      console.log(e,'原因原因')
      this.setState({
        reason: this.state.selector[e.detail.value].Name
      }, () => {
        console.log(this.state.reason)
        if (this.state.reason == this.state.selector[e.detail.value].Name) {
          this.setState({
            colorV: true,
            reasonId: this.state.selector[e.detail.value].Id
          }, () => {
            console.log(this.state.colorV)
            console.log(this.state.reasonId)
          })
        } else {
          this.setState({
            colorV: false,
          }, () => {
            console.log(this.state.colorV)
          })
        }

      })
    }
// 退改签乘机人显示
    showchengKeFun(num){
      this.state.chengKeData=[]
      
      this.setState({
        showchengKe:true,
        tuiGaiType:num,
        orderDetailObj: this.state.orderDetailObj
      },()=>{
        console.log(this.state.showchengKe)
        console.log(this.state.tuiGaiType)
        console.log(this.state.orderDetailObj)
        this.state.orderDetailObj.ProductOrder.Passengers.map((item, index) => {
          if(item.Status.Id==4){
            this.state.chengKeData.push(item)
            this.setState({
              chengKeData:this.state.chengKeData
            },()=>{
              console.log(this.state.chengKeData,'退改签乘客信息1')
              this.state.chengKeData.map((item, index) => {
                item.IsSelected = false
              })
              this.setState({
                chengKeData:this.state.chengKeData
              },()=>{
                console.log(this.state.chengKeData, '退改签乘客信息2')
              })
            })
          }
        })
      })
      if(num==1){
        this.setState({
          typeText: '改签',
        },()=>{
          console.log(this.state.chengKeTitle)
        })
      }else{
        this.setState({
         typeText: '退票',
        }, () => {
          console.log(this.state.chengKeTitle)
        })
      }
    }
// 填写退改签信息弹层
    showTuiGaiFun(){
      this.setState({
        reasonId:'',
        reason:'请选择',
        reasonValue:'',
        colorV:false,
      },()=>{
        console.log(this.state.reasonId)
        console.log(this.state.reason)
        console.log(this.state.reasonValue)
        console.log(this.state.colorV)
      })
      this.state.chengKeId = []
      this.state.chengKeData.map((item, index) => {
        if(item.IsSelected==true){
          this.state.chengKeId.push(item)
          this.setState({
            chengKeId: this.state.chengKeId
          },()=>{
            console.log(this.state.chengKeId)
          })
        }
      })
      console.log(this.state.chengKeId, 'this.state.chengKeId')
      if (this.state.chengKeId.length > 0) {
        this._getReason()
        this.hideChengKeFun()
        this.setState({
          showTuiGai: true,
          chengKeId:this.state.chengKeId
        }, () => {
          console.log(this.state.showTuiGai)
          console.log(this.state.chengKeId)
        })
        if (this.state.tuiGaiType == 1) {
          this.setState({
            typeText: '改签',
            maskTitle: '申请改签'
          }, () => {
            console.log(this.state.typeText)
          })
        } else {
          this.setState({
            typeText: '退票',
            maskTitle: '申请退票'
          }, () => {
            console.log(this.state.typeText)
          })
        }
      }else{
        Taro.showToast({
          title: `请选择需要${this.state.typeText}的乘机人`,
          icon: 'none',
          mask: true,
          duration:3000,
        })
      }
      
    }
// 退改签原因
    handleChange(event) {
      this.setState({
        reasonValue: event.target.value
      },()=>{
        console.log(this.state.reasonValue)
      })
    }
// 关闭选择乘客
    hideChengKeFun(){
      this.setState({
        showchengKe: false
      }, () => {
        console.log(this.state.showchengKe)
      })
    }
// 关闭改签弹层
    hideTuiGaiFun() {
      this.setState({
        showTuiGai: false
      }, () => {
        console.log(this.state.showTuiGai)
      })
    }
// 提交退改签
    sureBtn(){
     
      let linShiArr=[]
      let type=''
      this.state.chengKeId.map((item,index)=>{
        linShiArr.push(item.Id)
      })
      if (this.state.tuiGaiType == 1) {
        type = 'rebook'
      } else {
        type = 'refund'
      }
      let data = {
        "OperateType": type,
        "OrderId":this.state.orderDetailObj.Id,
        "OrderDetailId": linShiArr,
        "ReasonId": this.state.reasonId,
        "ReasonContent": "",
        "Remarks": this.state.reasonValue
      }
       if (this.state.reasonId == '') {
         Taro.showToast({
           title: `请选择${this.state.typeText}原因`,
           icon: 'none',
           mask: true,
           duration: 3000,
         })
       }else{
         sureTuiGai(data)
         .then(res=>{
           if(res.Success){
            console.log(res,'退改签接口')
            this.hideTuiGaiFun()
            this._getOrderMsg()
           }else{
             Taro.showToast({
               title:res.Success,
               icon: 'none',
               mask: true,
             })
           }
         })
       }
    }
// 返回首页
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
render() {
    const {shengJiMsg,orderDetailObj,startTime,endTime,chengKeData,checkedDataObj}=this.state
    return (
      <View className='orderDetailBox' style={this.state.tipsFlag==true?'padding-top: 50px;':''}>
        {this.state.tipsFlag&&<View className="tipsText"><Text>提示：座位预留时间由航空公司决定，建议您在20分钟内付款，若由于航空公司清位导致出票失败，我方会全额退款，感谢理解。</Text></View>}
        <View className='OrderDetail'>
          {/* 订单详情 */}
            <View className='OrderMessage'>
              <Text class="OrderNumber">订单号： {orderDetailObj.Id}</Text>
              <View className='PlaneMessage'>
                <View className="TimeAndPlace">
                  <View className="start">
                    <Text className="time">{startTime}</Text>
                    {/* <Text className="cityNameMsg">{this.state.startCityName}</Text> */}
                    <Text className="cityNameMsg">{orderDetailObj.ProductOrder.Voyages[0].Departure.Airport.Name}机场{orderDetailObj.ProductOrder.Voyages[0].Departure.Terminal}</Text>
                  </View>
                  <View className="arrow">
                    <Image src={Book_Progress} />
                  </View>
                  <View className="arrival">
                    <Text className="time">{endTime}</Text>
                    {/* <Text className="cityNameMsg">{this.state.endCityName}</Text> */}
                    <Text className="cityNameMsg">{orderDetailObj.ProductOrder.Voyages[0].Arrival.Airport.Name}机场{orderDetailObj.ProductOrder.Voyages[0].Arrival.Terminal}</Text>
                  </View>
              </View>
              <View className="AirMessage">
                  <View className='viewBox'>
                    <Text> {orderDetailObj.Contents}</Text>
                  </View>
                  <View className='viewBox'>
                    <Text>累计时长：{this.state.timeDuration}</Text>
                  </View>
                  <View className='viewBox'>
                    <Text>{orderDetailObj.Title}</Text>
                  </View>
                  
              </View>
              </View>
            </View>
          {/* 乘机人信息 */}
            <View className="passengermsg">
              <View className="msgtitle">
                <Text className='line'></Text>
                <Text>乘机人信息 </Text>
                <Text> ({orderDetailObj.ProductOrder.Passengers.length})</Text>
              </View>
              <View className="container">
                <View className="table">
                    <View className="tr" style='background:rgba(252,249,233,1);'>
                      <View className="th">出行人</View>
                      <View className="th">手机号</View>
                      <View className="th">审核状态</View>
                    </View>
                    {orderDetailObj.ProductOrder.Passengers.map((item,index)=>{
                      return (
                        <View className="tr" key={index}>
                          <View className="td">{item.Name}</View>
                          <View className="td">{item.Mobile}</View>
                          <View className='td tdColor1'>{item.Status.Name}</View>
                      </View>
                      )
                    })}
                    
                </View>
                {this.state.showTuiGaiBtn&&<View className="tuiGaiBtn">
                    <View className="btnItem" onClick={this.showchengKeFun.bind(this,2)}>退票</View>
                    <View className="btnItem" onClick={this.showchengKeFun.bind(this,1)}>改签</View>
                </View>}
              </View>
            </View>
          {/* 其他服务如用车保险 */}
              {orderDetailObj.ProductOrder.Vehicle!=null&&<View className="fuWuBox">
                    <View className="jieSongJiModel">
                      <View className="modelItem">
                        <View className="msgtitle">
                          <Text className='line'></Text>
                          <Text>接送机服务</Text>
                        </View>
                       <View className="yiXuanData">
                        {/* 已选送机 */}
                          {orderDetailObj.ProductOrder.Vehicle.Sending!=null&&<View className="itemData">
                            <View className="biaoQianSpan">{orderDetailObj.ProductOrder.Vehicle.Sending.Type.Name}</View>
                              <View className="itemLi">
                                <View className="jieSongH2">送机</View>
                                <View className="jieSongName">上车地点：{orderDetailObj.ProductOrder.Vehicle.Sending.From.Title} </View>
                                <View className="jieSongP">
                                  {!this.state.pinCheSTime&&<Text style='margin-right: 10px;'>{orderDetailObj.ProductOrder.Vehicle.Sending.DateInfo}</Text>}
                                  {this.state.pinCheSTime&&<View className="rightName">
                                      <Text>司机会提前与您确认具体时间</Text>
                                    </View>}
                                </View>
                                <View className="jieSongP">{orderDetailObj.ProductOrder.Voyages[0].Departure.Airport.Name}机场{orderDetailObj.ProductOrder.Voyages[0].Departure.Terminal}</View>
                                <View className="jieSongP flexBox">
                                  <Text>{orderDetailObj.ProductOrder.Vehicle.Sending.Product.Name}</Text> 
                                  <Text className='jieSongB'>¥{orderDetailObj.ProductOrder.Vehicle.Sending.Amount}</Text>
                                </View>
                              </View>
                            </View>}
                        {/* 已选接机 */}
                          {orderDetailObj.ProductOrder.Vehicle.Pickup!=null&&<View className="itemData">
                            <View className="biaoQianSpan">{orderDetailObj.ProductOrder.Vehicle.Pickup.Type.Name}</View>
                            <View className="itemLi">
                              <View className="jieSongH2">接机</View>
                              <View className="jieSongName">下车地点：{orderDetailObj.ProductOrder.Vehicle.Pickup.To.Title} </View>
                              <View className="jieSongP">
                                {!this.state.pinCheTime&&<Text style='margin-right: 10px;'>{orderDetailObj.ProductOrder.Vehicle.Pickup.DateInfo}</Text>}
                                {this.state.pinCheTime&&<View className="rightName">
                                    <Text>司机会提前与您确认具体时间</Text>
                                  </View>}
                              </View>
                              <View className="jieSongP">{orderDetailObj.ProductOrder.Voyages[0].Arrival.Airport.Name}机场{orderDetailObj.ProductOrder.Voyages[0].Arrival.Terminal}</View>
                                <View className="jieSongP flexBox">
                                  <Text>{orderDetailObj.ProductOrder.Vehicle.Pickup.Product.Name}</Text>
                                  <Text className='jieSongB'>¥{orderDetailObj.ProductOrder.Vehicle.Pickup.Amount}</Text>
                                </View>
                            </View>
                          </View>}
                        </View>
                      </View>
                    </View>
                </View>}
            <View class="summsg">
              <View className='ulBox'>
                <View className='liBox'>
                  <View className='pBox'>累计金额</View>
                  <Text>￥{orderDetailObj.CurrentAmount}  
                  </Text>  
                </View>
                <View className='liBox'>
                  <View className='pBox'>支付方式</View>
                  <Text>{orderDetailObj.PayType.Name} </Text> 
                </View>
                <View className='liBox'>
                  <View className='pBox'>提交时间</View>
                  <Text>{orderDetailObj.CreateDate}</Text>
                </View>
              </View>
            </View>
        </View>
          {/* 弹层组件 */}
            <AtModal
              isOpened={this.state.showMask}
              title={this.state.orderTips}
              cancelText='取消'
              confirmText='确认'
              onCancel={ this.handleCancel }
              onConfirm={ this.handleConfirm }
              content={this.state.orderTipsContent}
            />
          {/* 底部footer */}
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
        {/* 选择退改签乘客 */}
          {this.state.showchengKe&&<View className="cabinMask">
            <View className='addPassenger chengKe' style='background:#ffffff'>
              <View className='maskTitle'>
                  <View className='titleText'>选择{this.state.typeText}的乘机人</View>  
                  <Image className='closeIcon' src={guanBiIcon} onClick={this.hideChengKeFun.bind(this)}/>  
              </View>
            <View className="containter">
              <View class="contactsMaskMsg">
                  {chengKeData.map((item,index)=>{
                    return(
                      <View className='liBox' onClick={this.checkChengKe.bind(this,item,index)}>
                          <View class="msgBox">
                            <View className='leftBox' >
                              <View class="midText">
                                <View className='itemName'><Text>{item.Name}</Text></View>
                                  <View className='itemCard'>证件号码：{item.Documents.length>0&&item.Documents[0].DocumentNo!=''?item.Documents[0].DocumentNo:''}</View>
                              </View>
                            </View>
                            <View class="leftImg"  >
                              <Image src={item.IsSelected==true?rightIcon:rightIcon1} />
                            </View>
                          </View>
                      </View>
                    )
                  })}
                      
                </View>
            </View>
            <View className='btnSure' onClick={this.showTuiGaiFun.bind(this)}>确定</View>
            </View>
       
          </View>}
        {/* 退改签弹层 */}
          {this.state.showTuiGai&&<View className="cabinMask" >
            <View className='addPassenger' >
              <View className='maskTitle'>
                  <View className='titleText'>{this.state.maskTitle}</View>  
                  <Image className='closeIcon' src={guanBiIcon} onClick={this.hideTuiGaiFun.bind(this)}/>  
              </View>
            <View className="containter">
              
            <View class="contactsMaskMsg">
                <View className="msgTitle">
                        <View className="line"></View>
                        <View className="msgH4">{this.state.typeText}人信息({this.state.chengKeId.length})</View>
                  </View>
                <View class="box">
                    <View className='ulBox'>
                    {this.state.chengKeId.map((item,index)=>{
                      return(
                        <View className='liBox'>
                            <Text className='leftText'>{item.Name}</Text>
                            <View className="telNumber">手机号码：{item.Mobile}</View>
                        </View>
                      )
                    })}
                    </View>
                </View>
            </View>
            <View class="contactsMaskMsg" style='padding-top: 30px;'>
                <View className="msgTitle">
                        <View className="line"></View>
                        <View className="msgH4">{this.state.typeText}原因</View>
                  </View>
                <View class="box">
                    <View className='ulBox'>
                          <View className='liBox' style='display:flex;padding:16px 0;'>
                            <Text className='leftText'>{this.state.typeText}原因</Text>
                            <View className="rightSelect">
                            <Picker mode = 'selector' rangeKey='Name' range = {this.state.selector} onChange = { this.reasonChange } style = 'flex-grow: 1;' >
                              < View className={colorV?'picker pickerVColor':'picker'}>
                                {this.state.reason}
                              </View>
                            </Picker>
                            <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                            </View>
                        </View>
                        <View className='liBox'>
                            <Text className='leftText' style='margin-bottom: 16px;'>{this.state.typeText}说明</Text>
                             {this.state.showTextarea&&<AtTextarea value={this.state.reasonValue} onChange={this.handleChange.bind(this)} maxLength={200} placeholder='请输入说明...'  />}
                        </View>
                    </View>
                </View>
            </View>
            </View>
            <View className='btnSure' onClick={this.sureBtn.bind(this)}>提交</View>
            </View>
       
          </View>}
        {/* 返回首页 */}
          <View  style={`top:${this.state.top}px;left:${this.state.left}px;margin: 10% 0px 0px 0%;`}    className='backBox' onClick={this.backHome} onTouchMove={this.setTouchMove.bind(this)}>
                <View className='backIconText'>
                    <Image className='backIcon' src={backIcon}/>
                    <View className='backText'>首页</View>
                </View>
          </View>
         
      </View>
    );
  }
}