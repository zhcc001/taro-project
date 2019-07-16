import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane ,AtActivityIndicator,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast} from 'taro-ui'
import {myCollection} from '../../../../api/common'
import proImg from '../../../../common/image/234.png'
import {shareTitle} from '../../../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '我的收藏'
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
      // {
      //   Id: 107,
      //   Name: '签证',
      //   typeNum: '',
      // }
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
    showNullFlag: false

    }
  }

  componentWillMount () {
    
    
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
    this.state.OrderList=[]
    this.state.pi=1
    this._myCollection()
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  _myCollection() {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
      myCollection(this.state.ps, this.state.pi)
      .then(res=>{
        if(res.Success){
          Taro.hideLoading()
          this.state.OrderList=this.state.OrderList.concat(res.Result.Result),   
          this.state.piMax=Math.ceil(res.Result.Pagination.TotalCount / res.Result.Pagination.PageSize),
          this.state.pi++
          this.setState({
            OrderList:this.state.OrderList
          },()=>{
            console.log(this.state.OrderList,'订单列表')
            if (this.state.OrderList.length == 0) {
              this.setState({
                showNullFlag: true
              }, () => {
                console.log(this.state.showNullFlag)
              })
            } else {
              this.setState({
                showNullFlag: false
              }, () => {
                console.log(this.state.showNullFlag)
              })
            }
          })
        }
      })
      .catch(err=>{
        Taro.hideLoading()
      })
    
  }
  
  gotoDetail(item){
    if (item.ContentTypeId == 101) {
      if (item.ContentType.Id == 10000) {
         Taro.navigateTo({
           url: `/pages/touristRoutes/pages/routesDetail/index?ID=${item.ContentId}`
         })
      } else if (item.ContentType.Id == 10043) {
       
         Taro.navigateTo({
           url: `/pages/admissionTicket/pages/admissionDetail/index?ID=${item.ContentId}`
         })
      }else{
        Taro.showToast({
          title: '暂未开放',
          icon: 'none',
          mask: true
        })
      }
    } else if (item.ContentTypeId == 107) {
      Taro.navigateTo({
        url: `/pages/visa/pages/visaDetail/index?id=${item.ContentId}`
      })
    } else if (item.ContentTypeId==0) {
      Taro.navigateTo({
        url: `/pages/visa/pages/articleDetail/index?id=${item.ContentId}`
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
    this._myCollection()
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
  this._myCollection()
  
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

    const {OrderList,title,cabinflag,canCelFlag,payFlag,BookType,orderStatusData,showStatus,typeText,statusText,allTypeFlag,allOrderFlag,showTypeFlag} = this.state
    return (
      <View className='orderList'>
        {/* <View className="topBox">
          <View className='ListTitle'>
            {title.map((item,index)=>{
              return(
                  <View className={cabinflag==index?'itemCabin itemCabinOn':'itemCabin'} key={index} onClick={this.checkItem.bind(this,item,index)}>
                    <Text>{item.Name}</Text>
                  </View>
                )
            })}
                        
          </View>
        
        </View> */}
        {this.state.showNullFlag&&<View className="nullText" style='color:#CECECE;padding-top:50%;text-align:center'>暂无数据</View>}
        <View>
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
                          <View className="likeLi" key={index} onClick={this.gotoDetail.bind(this,item)}>
                          <View className="proMsgBox">
                              <View className="nullBox">
                                <View className="imgBox">
                                  <View className='typeBiaoQian'>{item.ContentType.Name}</View>
                                  <Image className='proImg' src={item.ImageUrl}/>
                                  {/* <View className="biaoqian">
                                    <View className="biaoQianSpan">大促</View>
                                  </View> */}
                                </View>
                              
                                  <View className='box'>

                                      <View className="proName">{item.ContentTitle}</View>
                                      
                                      {/* {detailObj.Labels.length>0&&<View className="biaoqian">
                                      {detailObj.Labels.map((item,index)=>{
                                          return (
                                              <View className="biaoQianSpan" key={index}>{item}</View>
                                          )
                                      })}
                                          
                                      </View>} */}
                                      {/* <View className="proCity">{detailObj.DepartCityName}-{detailObj.ArriveCityName}</View> */}
                                      
                                      {item.ContentType.Id!=105&&<View className="priceBox">
                                          <View className="price">
                                              <Text className='priceFuHao'>¥</Text>
                                              <Text className='priceNum'>{item.Price}</Text>
                                              <Text className="priceFuHao">起</Text>
                                          </View>
                                          <View className="saleNum">已售{item.SaleCount}件</View>
                                      </View>}
                                  </View>
                              </View> 
                          </View>
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