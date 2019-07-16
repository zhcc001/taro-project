import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane ,AtActivityIndicator,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast,AtInput} from 'taro-ui'
import {getRoutesList,getSearch} from '../../../../api/touristRoutes'
import souSuoIcon from './images/sousuo.png'
import clearIcon from './images/quxiao.png'
import sanJiaoIcon from './images/sanjiao.png'
import sanJiaoCheckIcon from './images/sanjiaoCheck.png'
import dingWeiIcon from './images/dingweiweizhi-3.png'
import {shareTitle} from '../../../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '线路列表'
  }

  constructor(){
    super(...arguments)
    this.state={
      showSelectFlag:false,
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
    sortTextFlag: false,
    destination:[{
      Id:1,
      Name:'上海'
    },{
      Id:2,
      Name:'北京'
    },{
      Id:3,
      Name:'广州'
    },{
      Id:4,
      Name:'深圳'
    },{
      Id:5,
      Name:'杭州'
    },],
    destinationFlag:-1,
    chuXingDay:[{
      Id:'',
      Name:'不限天数'
    },{
      Id:2,
      Name:'1-3天'
    },{
      Id:3,
      Name:'5-8天'
    },{
      Id:4,
      Name:'10-15天'
    },],
    chuXingDayFlag:-1,
    comprehensive:false,
    destinationId:'',//目的地ID
    chuXingDayId:'',//出行天数ID
    comprehensiveFlag:0,
    comprehensiveData:[
    //   {
    //   Id:'',
    //   Name:'默认综合排序'
    // }, {
    //   Id: 1,
    //   Name: '价格从低到高'
    // }, {
    //   Id: 2,
    //   Name: '价格从高到低'
    // }, {
    //   Id: 3,
    //   Name: '销量从低到高'
    // }, {
    //   Id: 4,
    //   Name: '销量从高到低'
    // }
  ],
    comprehensiveId:'',//综合排序ID
    ticketData:[],
    keyWord:'',
    clearFlag:false,
    departCity:[],
    departCityId:'',
    departCityFlag: -1,
    moreSelect:'更多筛选',
    sortText: '综合排序',
    textSelectFlag: false,
    showNullFlag:false
    }
  }

  componentWillMount () {
    this._getSearch()
    this._getRoutesList()
    
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
  // 获取门票列表
  _getRoutesList() {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
      getRoutesList(this.state.destinationId, this.state.chuXingDayId, this.state.departCityId,this.state.comprehensiveId, this.state.keyWord, this.state.ps, this.state.pi)
      .then(res=>{
        if(res.Success){
          Taro.hideLoading()
          this.state.ticketData=this.state.ticketData.concat(res.Result.Result),   
          this.state.piMax=Math.ceil(res.Result.Pagination.TotalCount / res.Result.Pagination.PageSize),
          this.state.pi++
          this.setState({
            ticketData: this.state.ticketData
          },()=>{
            console.log(this.state.ticketData,'订单列表')
            Taro.hideLoading()
          })
          if (this.state.ticketData.length == 0) {
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
        }else{
         Taro.hideLoading()
         Taro.showToast({
           title: res.Message,
           icon: 'none',
           mask: true
         })
        }
        
            console.log(this.state.piMax) 
      })
      .catch(err=>{
        Taro.hideLoading()
        Taro.showToast({
          title: '接口出错',
          icon: 'none',
          mask: true
        })
      })
    
  }
  // 查询条件
  _getSearch(){
    getSearch()
    .then(res=>{
      if(res.Success){
        console.log(res.Result)
        this.setState({
          chuXingDay: res.Result.OrderBys,
          comprehensiveData: res.Result.DurationDays,
          destination:res.Result.ArriveCities,
          departCity: res.Result.DepartCities
        },()=>{
          console.log(this.state.comprehensiveData)
          console.log(this.state.chuXingDay)
          console.log(this.state.destination)
        })
      }else{

      }
    })
    .catch(err => {
      Taro.showToast({
        title: '接口出错',
        icon: 'none',
        mask: true
      })
    })
  }
// 显示筛选弹层
showSelect(){
  this.setState({
    showSelectFlag: !this.state.showSelectFlag,
    textSelectFlag: true,
    comprehensive: false,
  },()=>{
    console.log(this.state.showSelectFlag)
    console.log(this.state.comprehensive)
  })
}
// 关闭筛选弹层
hideSelect() {
  
  this.setState({
    showSelectFlag: false
  }, () => {
    console.log(this.state.showSelectFlag)
  })
}
departCityIdCheck(item, index) {
  this.setState({
    departCityFlag: index,
    departCityId: item.Id
  }, () => {
    console.log(this.state.departCityFlag)
    console.log(this.state.departCityId)
  })
}
// 目的地选择
destinationCheck(item,index){
  this.setState({
    destinationFlag:index,
    destinationId:item.Id
  },()=>{
    console.log(this.state.destinationFlag)
    console.log(this.state.destinationId)
  })
}
// 不限出行天数
buXianCheck(){
  this.setState({
    chuXingDayFlag: -1,
    chuXingDayId: ''
  }, () => {
    console.log(this.state.chuXingDayFlag)
    console.log(this.state.chuXingDayId)
  })
}
// 出行天数选择
chuxingDayCheck(item,index){
  this.setState({
    chuXingDayFlag: index,
    chuXingDayId: item.Id
  }, () => {
    console.log(this.state.chuXingDayFlag)
    console.log(this.state.chuXingDayId)
  })
}
// 重置
resetMore(){
  this.setState({
    chuXingDayFlag:-1,
    destinationFlag:-1,
    destinationId:'',
    chuXingDayId:'',
    departCityId:'',
    departCityFlag:-1,
    moreSelect: '更多筛选',
  },()=>{
    console.log(this.state.chuXingDayFlag)
    console.log(this.state.destinationFlag)
    console.log(this.state.moreSelect)
  })
}
// 显示综合排序弹层
showComprehensive(){
  this.hideSelect()
   this.setState({
     comprehensive: !this.state.comprehensive
   }, () => {
     console.log(this.state.comprehensive)
   })
}
// 选择综合排序
comprehensiveCheck(item,index){
 if (item.Id != 'auto') {
   this.setState({
     comprehensiveFlag: index,
     comprehensiveId: item.Id,
     comprehensive: false,
     sortTextFlag: true,
     pi: 1,
     ticketData: [],
     sortText: item.Name
   }, () => {
     console.log(this.state.comprehensiveFlag)
     console.log(this.state.comprehensiveId)
     console.log(this.state.comprehensive)
     console.log(this.state.sortTextFlag)
     this._getRoutesList()
   })
 } else {
   this.setState({
     comprehensiveFlag: index,
     comprehensiveId: item.Id,
     comprehensive: false,
     sortTextFlag: false,
     pi: 1,
     ticketData: [],
     sortText: item.Name
   }, () => {
     console.log(this.state.comprehensiveFlag)
     console.log(this.state.comprehensiveId)
     console.log(this.state.comprehensive)
     console.log(this.state.sortTextFlag)
     this._getRoutesList()
   })
 }
}
onChange(value) {
  this.setState({
    keyWord: value,
    clearFlag:true
  }, () => {
    console.log(this.state.keyWord)
    if (this.state.keyWord=='') {
      this.setState({
        clearFlag:false
      },()=>{
        console.log(this.state.clearFlag)
      })
    }
  })
  // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  return this.state.keyWord
}
// 清除关键字
clearKeyWord(){
  this.setState({
    keyWord: '',
    clearFlag:false,
    pi: 1,
    ticketData: []
  }, () => {
    console.log(this.state.keyWord)
    console.log(this.state.clearFlag)
    this._getRoutesList()
  })
}
// 搜索关键字
searchClick(){
  this.setState({
    pi: 1,
    ticketData: [],
    keyWord:this.state.keyWord
  }, () => {
    this._getRoutesList()
  })
}
// 确定筛选条件
sureSubmit(){
  if (this.state.chuXingDayFlag != -1 || this.state.destinationFlag != -1||this.state.departCityFlag!=-1) {
    console.log('筛选(更多)筛选(更多)筛选(更多)')
    this.setState({
      moreSelect: '筛选(更多)',
      textSelectFlag: true
    }, () => {
      console.log(this.state.moreSelect)
      console.log(this.state.textSelectFlag)
    })
  } else {
    this.setState({
      moreSelect: '更多筛选',
      textSelectFlag: false
    }, () => {
      console.log(this.state.moreSelect)
      console.log(this.state.textSelectFlag)
    })
  }
  this.hideSelect()
  this.setState({
    pi:1,
    ticketData: []
  },()=>{
    this._getRoutesList()
  })
  
}
gotoDetail(ID){
  Taro.navigateTo({
    url: `/pages/touristRoutes/pages/routesDetail/index?ID=${ID}`
  })
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
    this._getRoutesList()
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
  ticketData: []
},()=>{
  console.log(this.state.ticketData)
  console.log(this.state.pi)
  this._getRoutesList()
  
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
    let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;

    const {destination,chuXingDay,showSelectFlag,comprehensiveFlag,comprehensiveData,ticketData,clearFlag,textSelectFlag,sortText,moreSelect,showNullFlag} = this.state
    return (
      <View className='ticketList'>
        <View className="topBox">
          <View className="box">
            <View className='searchBox'>
              <View className="inputBox">
                <View className="imgBox">
                    <Image className='souSuoIcon' src={souSuoIcon}/>
                </View>
                <AtInput style='width:80%' value={this.state.keyWord} placeholder="搜索关键字"  onChange={this.onChange.bind(this)} onConfirm={this.searchClick.bind(this)}/>
                <View className="imgBox" onClick={this.clearKeyWord.bind(this)}>
                    {clearFlag==true&&<Image className='closeIcon' src={clearIcon}/>}
                </View>
              </View>
              <View className="searchBtn" onClick={this.searchClick.bind(this)}>
                  搜索
              </View>
            </View>
            <View className='btnBox'>
              <View className="selectBox" onClick={this.showSelect.bind(this)}>
                <View className="itemBox">
                  <Text className={textSelectFlag==true?'selectText selectTextOn':'selectText'}>{moreSelect}</Text>
                  <View className="selectIcon">
                    <Image className='sanJiaoIcon' src={textSelectFlag==true?sanJiaoCheckIcon:sanJiaoIcon}/>
                  </View>
                  
                </View>
              </View>
              <View className="selectBox" onClick={this.showComprehensive.bind(this)}>
                <View className="itemBox">
                  <Text className='selectText' className={sortTextFlag==true?'selectText selectTextOn':'selectText'}>{sortText}</Text>
                  <View className="selectIcon">
                    <Image className='sanJiaoIcon' src={sortTextFlag==true?sanJiaoCheckIcon:sanJiaoIcon}/>
                  </View>
                  
                </View>
              </View>
            </View>

            {/* 筛选弹层 */}
            {/* 更多筛选 */}
            {showSelectFlag&&<View className="selectMask">
              <View className='selectContent'>
              <View className="itemModel">
                  <View className="moreH5">出发地</View>
                  <View className='itemSelectBox'>
                    {departCity.map((item,index)=>{
                      return (
                        <View className={departCityFlag==index?'itemSelect itemSelectOn':'itemSelect'} key={index} onClick={this.departCityIdCheck.bind(this,item,index)}>{item.Name}</View>
                      )
                    })}
                  </View>
                </View>
                <View className="itemModel">
                  <View className="moreH5">目的地</View>
                  <View className='itemSelectBox'>
                    {destination.map((item,index)=>{
                      return (
                        <View className={destinationFlag==index?'itemSelect itemSelectOn':'itemSelect'} key={index} onClick={this.destinationCheck.bind(this,item,index)}>{item.Name}</View>
                      )
                    })}
                  </View>
                </View>
                <View className="itemModel">
                  <View className="moreH5">出行天数</View>
                  <View className='itemSelectBox'>
                  <View className={chuXingDayFlag==-1?'itemSelectDay itemSelectDayOn':'itemSelectDay'} onClick={this.buXianCheck.bind(this)}>不限天数</View>
                    {chuXingDay.map((item,index)=>{
                      return (
                        <View className={chuXingDayFlag==index?'itemSelectDay itemSelectDayOn':'itemSelectDay'} key={index} onClick={this.chuxingDayCheck.bind(this,item,index)}>{item.Name}</View>
                      )
                    })}
                  </View>
                </View>
              </View>
              <View className="maskBtn">
                <View className="cancelBtn" onClick={this.resetMore.bind(this)}>重置</View>
                <View className="sureBtn" onClick={this.sureSubmit}>确定</View>
              </View>
            </View>}

            {/* 综合排序 */}
            {comprehensive&&<View className="comprehensive">
              {comprehensiveData.map((item,index)=>{
                return (
                  <View className={comprehensiveFlag==index?"comprehensiveLi comprehensiveLiOn":"comprehensiveLi"} key={index} onClick={this.comprehensiveCheck.bind(this,item,index)}>{item.Name}</View>
                )
              })}
                    
            </View>}
          </View>
        </View>
        {showNullFlag&&<View className="nullText" style='color:#CECECE;padding-top:50%;text-align:center'>暂无数据</View>}
        {ticketData.length>0&&<View className='pageBox'>
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
                      <View className="ticketList">
                      {ticketData.map((item,index)=>{
                        return (
                           <View className="ticketLi" onClick={this.gotoDetail.bind(this,item.Id)} key={index}>
                          <View className="proImgBox">
                            <Image className='proPicImg' src={item.ImageUrl}/>
                            <View className='dingWeiBox'>
                              <Image className='dingWeiIcon' src={dingWeiIcon}/>
                              <Text className='dingWeiCity'>{item.DepartCityName}</Text>
                            </View>
                          </View>
                          <View className="rightBox">
                            <View className="proTitle">{item.Name}</View>
                            <View className="otherBox">
                              <View className="priceBox">
                                <Text className='priceFuHao'>¥</Text>
                                <Text className='priceNum'>{item.SalePrice}</Text>
                                <Text className="priceFuHao">起</Text>
                              </View>
                              <View className='proTextBox'>
                                {/* <View className="score">4.6分</View>
                                <View className='score'>|</View> */}
                                <View className="score">销量{item.SaleCount}份</View>
                              </View>
                              
                            </View>
                            <View className="biaoQian">
                                {item.Labels.map((item,index)=>{
                                return (
                                <View className="labelText" key={index}>{item}</View>
                                )
                                })}
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
			</View>}
          {showSelectFlag&&<View className="tickertMask" onClick={this.hideSelect}></View>}
          {comprehensive&&<View className="tickertMask"></View>}
          {this.state.showLoading==true&&<AtToast isOpened={true} text="加载中" hasMask={true} duration={0}  status="loading" ></AtToast>}
    </View>
    );
  }
}