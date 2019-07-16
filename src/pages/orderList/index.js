import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane ,AtActivityIndicator,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast} from 'taro-ui'
import {getOrderList,cancelOrderMsg,delOrderMsg,payOrder} from '../../api/common'
import sanjiaoIcon from './images/sanjiao.png'
import sanjiaoCheckIcon from './images/sanjiaoCheck.png'
import timeIcon from './images/shijian.png'
import guanBiIcon from './images/guanBi.png'
import duiHao from './images/duiHao.png'
import {shareTitle} from '../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '订单列表'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      current: 0,
      cabinflag:0,
      BookTypeFlag:-1,
      title: [{
        Id: 102,
        Name: '机票',
        typeNum: '',
      }, {
        Id:101,
        typeNum: 10000,
        Name: '线路',
      }, {
        Id: 101,
        typeNum: 10043,
        Name: '门票',

      }, 
      {
        Id: 107,
        Name: '签证',
        typeNum: '',
      }
    ],
      OrderList:[],
      payStatusId:'',
      refundStatusId:'',
      ps:10,
      pi:1,
      piMax:1,
      "enablePullDownRefresh": true, 
      onReachBottomDistance:50,
      dargStyle: {//下拉框的样式
        top: 0 + 'px'
    },
    downDragStyle: {//下拉图标的样式
        height: 0 + 'px'
    },
    downText: '下拉刷新',
    upDragStyle: {//上拉图标样式
        height: 0 + 'px'
    },
    pullText: '上拉加载更多',
    start_p: {},
    scrollY:true,
    dargState: 0,//刷新状态 0不做操作 1刷新 -1加载更多
    orderTips:'',
    orderTipsContent:'',
    showMask:false,
    PayStatus:'',
    orderId:'',
    payFlag:false,
    canCelFlag:false,
    showLoading:false,
    BookType:[{
      Id:4,
      Name:'因私出行'
    },{
      Id:2,
      Name:'因公出行'
    },],
    OrderTypeNum:'',
    orderStatusData:[{
      Id:1,
      Name:'待支付'
    }, {
      Id: 2,
      Name: '已支付'
    }, {
      Id: 3,
      Name: '待退款'
    }, {
      Id:4,
      Name: '已完成'
    }, ],
    showStatus:false,
    showType:false,
    typeText:'类型',
    statusText:'订单状态',
    orderIndex:-1,
    allOrderFlag:true,
    allTypeFlag:true,
    statusId:'',
    productTypeId: 102,
    productCatalogId:'',
    showTypeFlag:true,
    numberOrder:'',
    CurrentAmount: '',
    showSuccess:false

    }
  }

  componentWillMount () {
    
    
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
    this.state.pi=1
    this.state.OrderList=[]
    this._getOrderList()
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  // 取消订单
  handleConfirm(){
    this.setState({
      showLoading:true
    })
    if(this.state.PayStatus==1){
      cancelOrderMsg(this.state.orderId)
    .then(res=>{
      console.log(res)
      if(res.Success){
        
        this.setState({
          payStatusId:'',
          refundStatusId:'',
          pi:1,
          OrderList:[]
        },()=>{
          console.log(this.state.OrderList)
          console.log(this.state.pi)
          this._getOrderList()
          
        })
      }
      this.handleCancel()
      this.setState({
        showLoading:false
      })
    })
    .catch(err=>{

    })
    
  }else{
    delOrderMsg(this.state.orderId)
    .then(res=>{
      console.log(res)
      if(res.Success){
        this.setState({
          payStatusId:'',
          refundStatusId:'',
          pi:1,
          OrderList:[]
        },()=>{
          console.log(this.state.OrderList)
          console.log(this.state.pi)
          this._getOrderList()
          
        })
      }
      this.handleCancel()
      this.setState({
        showLoading:false
      })
    })
    .catch(err=>{

    })
  }
    
  }
  handleCancel(){
    this.setState({
      showMask:false
    })
  }
  _cancelOrderMsg(ID,PayStatus){
    if(PayStatus==1){
      this.setState({
        showMask:true,
        orderTips:'取消订单',
        orderTipsContent:'确定取消订单吗？',
        PayStatus:PayStatus,
        orderId:ID
      },()=>{
        
      })
    
  }else{
    this.setState({
      showMask:true,
      orderTips:'删除订单',
      orderTipsContent:'确定删除订单吗？',
      PayStatus:PayStatus,
      orderId:ID
    })
    
  }
  }
  checkItem(item,index){
    if(item.Id==102){
       this.setState({
         showTypeFlag: true,
       }, () => {
         console.log(this.state.showTypeFlag)
       })
    }else{
     
      this.setState({
        showTypeFlag: false,
      }, () => {
        console.log(this.state.showTypeFlag)
      })
    }
    this.setState({
      productTypeId:item.Id,
      productCatalogId:item.typeNum,
      cabinflag:index,
      pi:1,
      OrderList:[]
    },()=>{
      console.log(this.state.productTypeId)
      console.log(this.state.productCatalogId)
      console.log(this.state.cabinflag)
      this._getOrderList()
    })
  }
  // 显示订单状态弹层
showStatu(){
  this.setState({
    showStatus: !this.state.showStatus,
    showType: false,
  },()=>{
    console.log(this.state.showStatus)
  })
}
// 全部订单
allOrderStatus(){
  this.setState({
    statusText: '订单状态',
    orderIndex: -1,
    allOrderFlag:true,
    pi:1,
    OrderList:[],
    statusId:''
  }, () => {
    console.log(this.state.statusText)
    console.log(this.state.orderIndex)
    console.log(this.state.allOrderFlag)
    this.hideType()
    this._getOrderList()
  })
}
// 订单状态单选
orderStatusCkeck(item,index){
  this.setState({
    statusText:item.Name,
    orderIndex:index,
    allOrderFlag:false,
    pi:1,
    OrderList:[],
    statusId:item.Id
  },()=>{
    console.log(this.state.statusText)
    console.log(this.state.orderIndex)
    console.log(this.state.allOrderFlag)
    console.log(this.state.statusId)
    this.hideType()
    this._getOrderList()
  })
}
// 显示类型弹层
showType(){
  this.setState({
    showType:!this.state.showType,
    showStatus: false,
  },()=>{
    console.log(this.state.showType)
  })
}
  // 隐藏类型弹层
  hideType(){
    this.setState({
      showType:false,
      showStatus:false,
    },()=>{
      console.log(this.state.showType)
      console.log(this.state.showStatus)
    })
  }
  // 全部类型
  allType(){
    this.setState({
      OrderTypeNum:'',
      typeText:'类型',
      BookTypeFlag:-1,
      pi:1,
      OrderList:[],
      allTypeFlag:true,
      OrderTypeNum:''
    },()=>{
      console.log(this.state.OrderTypeNum)
      console.log(this.state.BookTypeFlag)
      console.log(this.state.typeText)
      this.hideType()
      this._getOrderList()
    })
  }
  // 因公隐私单选
  checkBookType(item,index){
    this.setState({
      pi:1,
      OrderList:[],
      OrderTypeNum:item.Id,
      BookTypeFlag:index,
      typeText:item.Name,
      allTypeFlag:false,
    },()=>{
      console.log(this.state.OrderTypeNum)
      console.log(this.state.BookTypeFlag)
      console.log(this.state.typeText)
      console.log(this.state.allTypeFlag)
      this.hideType()
       this._getOrderList()
    })
  }

  _getOrderList(){
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
      getOrderList(this.state.productTypeId,this.state.productCatalogId,this.state.statusId,this.state.payStatusId, this.state.refundStatusId, this.state.ps, this.state.pi, this.state.OrderTypeNum)
      .then(res=>{
        if(res.Success){
          Taro.hideLoading()
          this.state.OrderList=this.state.OrderList.concat(res.Result.Result),   
          this.state.piMax=Math.ceil(res.Result.Pagination.TotalCount / res.Result.Pagination.PageSize),
          this.state.pi++
          this.setState({

          },()=>{
            console.log(this.state.OrderList,'订单列表')
          })
        }
        
            console.log(this.state.piMax) 
            
      })
      
      .catch(err=>{
        Taro.hideLoading()
      })
    
  }
  btnClick(num,item) {
    console.log(item, '价格CurrentAmount')
    if (num == 3) {
      this.atOncePay(item)
    } else if (num == 1) {
      this._cancelOrderMsg(item.Id,1)
    } else if (num == 2) {
      this._cancelOrderMsg(item.Id, 2)
    }
  }
  gotoDetail(item){
    if (item.ProductTypeId == 101) {
      if (item.ProductCatalogId == 10000) {
         Taro.navigateTo({
           url: `/pages/touristRoutes/pages/routesOrderDetail/index?orderNumber=${item.Id}`
         })
      } else if (item.ProductCatalogId == 10043) {
       
         Taro.navigateTo({
           url: `/pages/admissionTicket/pages/ticketOrderDetail/index?orderNumber=${item.Id}`
         })
      }else{
        Taro.showToast({
          title: '暂未开放',
          icon: 'none',
          mask: true
        })
      }
    } else if (item.ProductTypeId == 107) {
       Taro.navigateTo({
         url: `/pages/visa/pages/visaOrderDetail/index?orderNumber=${item.Id}`
       })
    }else if(item.ProductTypeId==102){
      Taro.navigateTo({
        url: `/pages/orderDetail/index?orderNumber=${item.Id}`
      })
    }
    
  }
  reduction() {//还原初始设置
    const time = 0.5;
    this.setState({
        upDragStyle: {//上拉图标样式
            height: 0 + 'px',
            transition: `all ${time}s`
        },
        dargState: 0,
        dargStyle: {
            top: 0 + 'px',
            transition: `all ${time}s`
        },
        downDragStyle: {
            height: 0 + 'px',
            transition: `all ${time}s`
        },
        scrollY:true
    })
    setTimeout(() => {
        this.setState({
            dargStyle: {
                top: 0 + 'px',
            },
            upDragStyle: {//上拉图标样式
                height: 0 + 'px'
            },
            pullText: '上拉加载更多',
            downText: '下拉刷新'
        })
    }, time * 1000);
}
touchStart(e) {
    this.setState({
        start_p: e.touches[0]
    })
}
touchmove(e) {
let that = this
    let move_p = e.touches[0],//移动时的位置
        deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
        deviationY = 70,//拉动长度（低于这个值的时候不执行）
        maxY = 100;//拉动的最大高度

    let start_x = this.state.start_p.clientX,
        start_y = this.state.start_p.clientY,
        move_x = move_p.clientX,
        move_y = move_p.clientY;


    //得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
        let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
  if (move_y - start_y > 0) {//下拉操作
    if (pY >= deviationY) {
      this.setState({ dargState: 1, downText: '释放刷新' })
    } else {
      this.setState({ dargState: 0, downText: '下拉刷新' })
    }
    if (pY >= maxY) {
      pY = maxY
    }
    this.setState({
      dargStyle: {
        top: pY + 'px',
      },
      downDragStyle: {
        height: pY + 'px'
      },
      scrollY:false//拖动的时候禁用
    })
  }
  if (start_y - move_y > 0) {//上拉操作
    console.log('上拉操作')
    if (pY >= deviationY) {
      this.setState({ dargState: -1, pullText: '释放加载更多' })
    } else {
      this.setState({ dargState: 0, pullText: '上拉加载更多' })
    }
    if (pY >= maxY) {
      pY = maxY
    }
    this.setState({
      dargStyle: {
        top: -pY + 'px',
      },
      upDragStyle: {
        height: pY + 'px'
      },
      scrollY: false//拖动的时候禁用
    })
  }

    }
}
pull() {//上拉
// console.log('上拉')
if (this.state.piMax >= this.state.pi) {
    this._getOrderList()
}else{
  this.setState({ dargState: -1, pullText: '没有更多了' })
}
}
down() {//下拉
// console.log('下拉')
this.setState({
  payStatusId:'',
  refundStatusId:'',
  pi:1,
  OrderList:[]
},()=>{
  console.log(this.state.OrderList)
  console.log(this.state.pi)
  this._getOrderList()
  
})
}
ScrollToUpper() { //滚动到顶部事件
// console.log('滚动到顶部事件')
    // this.props.Upper()
}
ScrollToLower() { //滚动到底部事件
// console.log('滚动到底部事件')
    // this.props.Lower()
}
touchEnd(e) {
    if (this.state.dargState === 1) {
        this.down()
    } else if (this.state.dargState === -1) {
        this.pull()
    }
    this.reduction()
}
atOncePay(item) {
  console.log(item, '价格CurrentAmount')
  let openid = Taro.getStorageSync('_openid')
  payOrder(item.Id, openid)
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
              that.showSuccess(true,item)
              
             },
            fail(err) { 
              console.log(err,'支付失败')
              
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
          title :res.Message ,
          icon : 'none' ,
          mask : true
        })
      })
}
showSuccess(flag,item) {
  
  this.setState({
    showSuccess: flag,
    numberOrder:item.Id,
    CurrentAmount: item.CurrentAmount,
    pi:1,
    OrderList:[]
  }, () => {
    console.log(this.state.showSuccess)
    console.log(this.state.numberOrder)
    console.log(this.state.OrderList)
    console.log(this.state.CurrentAmount, 'this.state.CurrentAmount')
    if (this.state.showSuccess == false) {
      this._getOrderList()
    }
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
    let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;

    const {OrderList,title,cabinflag,canCelFlag,payFlag,BookType,orderStatusData,showStatus,typeText,statusText,allTypeFlag,allOrderFlag,showTypeFlag,CurrentAmount} = this.state
    return (
      <View className='orderList'>
        <View className="topBox">
          <View className='ListTitle'>
            {title.map((item,index)=>{
              return(
                  <View className={cabinflag==index?'itemCabin itemCabinOn':'itemCabin'} key={index} onClick={this.checkItem.bind(this,item,index)}>
                    <Text>{item.Name}</Text>
                  </View>
                )
            })}
                        
          </View>
        {/* <View className='btnBox'>
        {BookType.map((item,index)=>{
          return (
            <View className={BookTypeFlag==index?'btn yinGongBtn':'btn'} key={index} onClick={this.checkBookType.bind(this,item,index)}>{item.Name}</View>
          )
        })}
          
        </View> */}

          <View className="topSelectBox">
            <View className="topSelect" onClick={this.showStatu.bind(this)}>
              <View className='selectBox'>
                <Text className={showStatus?'statusText statusTextOn':'statusText'}>{statusText}</Text>
                <View className="sanjiaoBox">
                  <Image className='snajiaoIcon' src={showStatus?sanjiaoCheckIcon:sanjiaoIcon}/>
                </View>
              </View>
            </View>
            {showTypeFlag&&<View className="topSelect" onClick={this.showType.bind(this)}>
                <View className='selectBox'>
                  <Text className={showType?'statusText statusTextOn':'statusText'}>{typeText}</Text>
                  <View className="sanjiaoBox">
                    <Image className='snajiaoIcon' src={showType?sanjiaoCheckIcon:sanjiaoIcon}/>
                  </View>
                </View>
            </View>}
          </View>
         
          {/* 订单弹层 */}
          {showStatus&&<View className="orderMaskBox">
              <View className="orderStatusUl">
                   <View className={allOrderFlag==true?"orderStatusLi orderStatusLiOn":"orderStatusLi"} onClick={this.allOrderStatus.bind(this)}>全部</View>
                   {orderStatusData.map((item,index)=>{
                     return (
                       <View className={orderIndex==index?"orderStatusLi orderStatusLiOn":"orderStatusLi"} key={index} onClick={this.orderStatusCkeck.bind(this,item,index)}>{item.Name}</View>
                     )
                   })}
                  
              </View>
          </View>}
          
          {/*类型弹层*/}
          {showType&&<View className="orderMaskBox">
              <View className="orderStatusUl">
                   <View className={allTypeFlag==true?"orderStatusLi orderStatusLiOn":"orderStatusLi"} onClick={this.allType.bind(this)}>全部</View>
                   {BookType.map((item,index)=>{
                     return (
                       <View className={BookTypeFlag==index?"orderStatusLi orderStatusLiOn":"orderStatusLi"} key={index} onClick={this.checkBookType.bind(this,item,index)}>{item.Name}</View>
                     )
                   })}
                  
              </View>
          </View>}
        </View>
         {/* 筛选弹层 */}
          {(showType||showStatus)&&<View className="cabinMask" onClick={this.hideType.bind(this)}></View>}
        <View>
            {/* <View className="tipsTextBg"><Text>提示：座位预留时间由航空公司决定，建议您在20分钟内付款，若由于航空公司清位导致出票失败，我方会全额退款，感谢理解。</Text></View> */}
            <View className='dragUpdataPage'>
                <View className='downDragBox' style={downDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.downText}</Text>
                </View>
                <ScrollView
                    style={dargStyle}
                    onTouchMove={this.touchmove}
                    onTouchEnd={this.touchEnd}
                    onTouchStart={this.touchStart}
                    onScrollToUpper={this.ScrollToUpper}
                    onScrollToLower={this.ScrollToLower}
                    className='dragUpdata'
                    scrollY={this.state.scrollY}
                    scrollWithAnimation>
                    <View style='width:100%;height:100vh;' >

                      <View className="OrderList">
                {OrderList.map((item,index)=>{
                  return (
                    <View className="OrderList_item" key={index} >
                    <View className="Number-Condition">
                        <View className="number">订单编号: {item.Id}</View>
                        <View className="condition">{item.StatusInfo}</View>
                    </View>
                    <View  className="OrderMessage" onClick={this.gotoDetail.bind(this,item)}>
                    {/* 门票线路签证需要展示产品图片 */}
                      {item.ProductTypeId!=102&&<View className="leftImg">
                        <Image className='proImg' src={item.ImageUrl}/>
                      </View>}
                      <View className="rightBox">
                          {item.ProductTypeId==102&&<View className="smallmask">{item.OrderType.Name}</View>}
                          {item.ProductTypeId==102&&<View className="nullBox" style='width: 100%;height:14px;'></View>}
                      <View className="planePlace">
                          <Text className="place">{item.Name}</Text> 
                          {/* <Text>{item.startMark}</Text>
                          <Image src={orderArrow}  className="arrow"/>
                          <Text className="place">{item.Name}</Text>
                          <Text>{item.arrivalMark}</Text> */}
                      </View>
               
               {item.ProductTypeId!=102&&<View className="tongyongUp">
                  <View className='timePrice'>
                    {/* <View className="leftTime">
                        <Image src={timeIcon}/>
                        <Text>办理日期: 7-10个工作日</Text>
                    </View> */}
                    <Text className="rightPrice">￥{item.CurrentAmount}</Text>
                  </View>
               </View>}
               {item.ProductTypeId==102&&<View className="jipiaoUp">
                  <View className="startData">
                      {/* <Image src={publicOrder_Date}  className="publicOrder_Date"/> */}
                      <View>
                          {/* <Text>出发时间：</Text> */}
                          <Text>{item.Contents}</Text>
                          {/* <Text> {item.startDay}</Text> */}
                      </View>
                  </View>
                  <View className="plane">
                    {/* <Image src={plane}  className="plane_img"/> */}
                      <View className="plane_desc">
                        <Text>{item.Title}</Text>
                        {/* <ext>| </Text>
                        <Text>{item.planesize} </Text>
                        <Text>| </Text>
                        <Text>{item.planeclassName}</Text> */}
                      </View>
                  </View>
               </View>}
              </View>
               
            </View>
            {item.Operates.length>0&&<View className="Btn">
              
                {item.Operates.map((t,i)=>{
            return (
              <View className={t.Id==3?'payOrder':'OneMoreOrder'} onClick={this.btnClick.bind(this,t.Id,item)}>{t.Name}</View>
            )
            
          })}
            </View>}
                </View>
                  )
                })}
                
              </View>
            </View>
                </ScrollView>
                <View className='upDragBox' style={upDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.pullText}</Text>
                </View>
            </View>
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
                        <Text>{numberOrder}</Text>
                      </View>
                      </View>
                      <View className='tipsNull'>
                      <View className='tipsMsg'>
                        <Text className='tipsText1'>订单金额：</Text>
                        <Text>￥{CurrentAmount}</Text>
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

          {this.state.showLoading==true&&<AtToast isOpened={true} text="加载中" hasMask={true} duration={0}  status="loading" ></AtToast>}
    </View>
    );
  }
}