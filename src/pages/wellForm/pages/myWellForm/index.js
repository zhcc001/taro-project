import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane ,AtActivityIndicator,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast} from 'taro-ui'
import {getWellFormList} from '../../../../api/wellForm'
import chuFaIcon from '../../../../common/image/chuFaIcon.png'
import daoDaIcon from '../../../../common/image/daoDaIcon.png'
import riqiIcon from '../../../../common/image/riqi.png'
import quChengIcon from '../../../../common/image/quCheng.png'
import huiChengIcon from '../../../../common/image/huicheng.png'
import renYuanIcon from '../../../../common/image/renyuan.png'
import {shareTitle} from '../../../../api/commonVariable'


import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '我的公出单'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      current: 0,
      cabinflag:0,
      BookTypeFlag:-1,
      title: [{

        Name: '我申请的',
      }, {
        Name: '我出行的',
      }],
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
    showStatus:false,
    showType:false,
    orderIndex:-1,
    allOrderFlag:true,
    allTypeFlag:true,
    statusId:'',
    productTypeId: 102,
    productCatalogId:'',
    showTypeFlag:true,
    wellFormData:[],
    apply:true,
    travel:false,
    showNullFlag:false

    }
  }

  componentWillMount () {
    
    
  }
  componentDidMount () {
    this._getWellFormList()
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  
  checkItem(item,index){
    if(index==0){
      this.setState({
      cabinflag:index,
      pi:1,
      wellFormData:[],
      apply:true,
      travel:false,
    },()=>{
      console.log(this.state.productTypeId)
      console.log(this.state.productCatalogId)
      console.log(this.state.cabinflag)
      console.log(this.state.apply)
      console.log(this.state.travel)
      this._getWellFormList()
    })
      
    }else{
      this.setState({
        cabinflag: index,
        pi: 1,
        wellFormData: [],
        apply: false,
        travel: true,
      }, () => {
        console.log(this.state.productTypeId)
        console.log(this.state.productCatalogId)
        console.log(this.state.cabinflag)
        console.log(this.state.apply)
        console.log(this.state.travel)
        this._getWellFormList()
      })
    }
    
  }
 
  _getWellFormList() {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
      getWellFormList(this.state.apply, this.state.travel,this.state.ps,this.state.pi)
      .then(res=>{
        if(res.Success){
          // Taro.hideLoading()
          this.state.wellFormData = this.state.wellFormData.concat(res.Result.Result),
          this.state.piMax=Math.ceil(res.Result.Pagination.TotalCount / res.Result.Pagination.PageSize),
          this.state.pi++
          this.setState({
            wellFormData: this.state.wellFormData
          },()=>{
            console.log(this.state.wellFormData, '订单列表')
            if(this.state.wellFormData.length==0){
              this.setState({
                showNullFlag:true
              },()=>{
                console.log(this.state.showNullFlag)
              })
            }else{
              this.setState({
                showNullFlag: false
              }, () => {
                console.log(this.state.showNullFlag)
              })
            }
            Taro.hideLoading()
          })
        }
        
            console.log(this.state.piMax) 
      })
      .catch(err=>{
        Taro.hideLoading()
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
    this._getWellFormList()
}else{
  this.setState({ dargState: -1, pullText: '没有更多了' })
}
}
down() {//下拉
// console.log('下拉')
this.setState({
  pi:1,
  wellFormData: []
},()=>{
  console.log(this.state.wellFormData)
  console.log(this.state.pi)
  this._getWellFormList()
  
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
// 进入公出单详情
gotoWellformDetail(items) {
  Taro.navigateTo({
    url: `/pages/wellForm/pages/wellFormDetail/index?wellFormId=${items.Id}&wellFormCode=${items.Code}`
  })
}
  render() {
    let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;

    const {title,cabinflag,showNullFlag} = this.state
    return (
      <View className='myWellForm'>
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
         
        </View>
        
        <View style='padding-top: 20%;'>
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
                    {showNullFlag&&<View className="nullText" style='color:#CECECE;padding-top:50%;text-align:center'>暂无数据</View>}
                    {wellFormData.length>0&&<View style='width:100%;height:100vh;' >
                    {wellFormData.map((items,indexs)=>{
                      return (
                        <View className="nullBox" key={indexs}>
                        <View className='wellForm'>
                          <View className="downBox">
                            <View className="wellFormTitle">[{items.Code}]+{items.Name}</View>
                            <View className="applicant">申请人：{items.ApplyStaff.Name}</View>
                            <View className="line"></View>
                          </View>
                          
                            <View className="wellFormContent">
                              <View className="CityLi">
                                <View className="iconBox"><Image src={chuFaIcon}/></View>
                                <Text className='textNth1'>出发</Text>
                                <Text className='textNth2'>{items.LocusLocality}</Text>
                              </View>
                              <View className="CityLi">
                                <View className="iconBox"><Image src={chuFaIcon}/></View>
                                <Text className='textNth1'>到达</Text>
                                <Text className='textNth2'>{items.TargetLocality}</Text>
                              </View>
                              <View className="riQiLi">
                                <View className="iconBox"><Image src={riqiIcon}/></View>
                                <Text className='textNth1'>出发</Text>
                                <Text className='textNth2'>{items.DepartureDate}</Text>
                              </View>
                              <View className="riQiLi">
                                <View className="iconBox"><Image src={riqiIcon}/></View>
                                <Text className='textNth1'>回程</Text>
                                <Text className='textNth2'>{items.ReturnDate}</Text>
                              </View>
                              {items.Departures.length>0&&<View className="quCheng">
                                <View className="iconBox"><Image src={quChengIcon}/></View>
                                <Text className='textNth1'>去程</Text>
                                <View className="textBox">
                                {items.Departures.map((item,index)=>{
                                  return (
                                    <View className="textBoxData" key={index}>
                                      <Text>{item.DepartureDate}</Text>
                                      <Text>{item.DepartureCity.Name}-{item.ArrivalCity.Name}</Text>
                                    </View>
                                  )
                                })}
                                    
                                </View>
                              </View>}
                              {items.Returns.length>0&&<View className="quCheng">
                                <View className="iconBox"><Image src={huiChengIcon}/></View>
                                <Text className='textNth1'>回程</Text>
                                <View className="textBox">
                                {items.Returns.map((item,index)=>{
                                  return (
                                     <View className="textBoxData" key={index}>
                                      <Text>{item.DepartureDate}</Text>
                                      <Text>{item.DepartureCity.Name}-{item.ArrivalCity.Name}</Text>
                                    </View>
                                  )
                                })}
                                
                                </View>
                              </View>}
                              <View className="renYuan">
                                <View className="iconBox"><Image src={renYuanIcon}/></View>
                                <Text className='textNth1'>出行人员</Text>
                                <Text>{items.StaffCount}人</Text>
                              </View>
                            </View>
                            <View className="btnDetail" onClick={this.gotoWellformDetail.bind(this,items)}>公出单详情，并购票</View>
                        </View>
                      </View>
                      )
                    })}
                      
                        
                    </View>}
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
        
    </View>
    );
  }
}