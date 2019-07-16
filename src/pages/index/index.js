import Taro, { Component,Config } from '@tarojs/taro'
import { View, Text,Swiper, SwiperItem ,Image,Button,MovableArea} from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction,AtCheckbox,AtCalendar,AtToast} from "taro-ui"
import {getWellFormList} from '../../api/wellForm'
import cityIcon from './images/home_aircraft.png'
import close from './images/close.jpg'
import chuFaIcon from '../../common/image/chuFaIcon.png'
import daoDaIcon from '../../common/image/daoDaIcon.png'
import riqiIcon from '../../common/image/riqi.png'
import {shareTitle} from '../../api/commonVariable'
import {getData,tuiJianPosition,getService,getloction,getShowWellForm} from '../../api/common'
import './index.scss'
const date = new Date();
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props) {
    super(props)
    this.state = {
      list: [], // 广告列表
      start: 1,
      showTime:false,
      showCabin:false,
      cabinData:[{
        Id:2,
        title: '因公出行',
      },{
        Id:4,
        title: '因私出行',
      }],
      cabinflag:0,
      tablecurrent:2,
      companyName:'上海牛邦网络科技有限公司',
      companyObj:{
        Name:'文波',
        Tel:'15349876543',
        staffNum:5,
        orderNum:3,
      },
      recommendList: [],
      bannerNum:'B101',
      articNum:'A101',
      proNum:'P101',
      siteId:1001,
      checkTime:'选择时间',
      startCity:'上海',
      endCity:'北京',
      toast:false,
      toastText:'',
      weekDayText:'',
      timeStr:'',
      startCityObj:{Code:'HRB',Name:'哈尔滨'},
      endCityObj:{Code:'BJS',Name:'北京'},
      showImg:false,
      nowTime:'',
      latitude:'',
      longitude:'',
      wellFormObj:{},
      showWellForm:false,
      emptyFlag:false,
      TotalCount:''
    }
  }
  
  
  componentWillMount () {
    this._getShowWellForm()
    Taro.setStorageSync(`startCityObj`, JSON.stringify(this.state.startCityObj))
    Taro.setStorageSync(`endCityObj`, JSON.stringify(this.state.endCityObj))
    this.getFullYearFun()
    this.getDataFun()
   }

  componentDidMount () {
    this.getBannerList();
    
    this.getTuiJian();
    this._getService()
    this._weiXingetLoction()
  }

  componentWillUnmount () {
   
   }

  componentDidShow () { 
    this._getWellFormList()

     // 解决当选择因私出行时， 点击选择出发地和目的地之后， 返回页面会自动跳转回因公出行
    if(!Taro.getStorageSync('saveStatus')){
      this._getShowWellForm()
    }
    
    if(Taro.getStorageSync('startCityObj')){
      this.setState({
        startCityObj:JSON.parse(Taro.getStorageSync('startCityObj'))
        
      },()=>{
        console.log(this.state.startCityObj,'定位城市Show')
      })
    }
    if(Taro.getStorageSync('endCityObj')){
      this.setState({
        endCityObj:JSON.parse(Taro.getStorageSync('endCityObj'))
          
        })
    }
  }

  componentDidHide () { }
    _getShowWellForm(){
      getShowWellForm()
      .then(res=>{
        if(res.Success){
          this.setState({
            cabinData: res.Result.BookType,
            tablecurrent:res.Result.BookType[0].Id,
            cabinflag:0
          },()=>{
            console.log(this.state.cabinData)
            console.log(this.state.tablecurrent)
            Taro.setStorageSync('tablecurrent', this.state.tablecurrent)
            Taro.setStorageSync('cabinflag', this.state.cabinflag)
            
          })
        }
      })
      .catch(err=>{

      })
    }
  getBannerList(){
    getData()
    .then(res=>{
      if(res.Success){
        this.setState({
          list: res.Result
        }, () => {
          console.log(this.state.list)
        })
      }else{
        Taro.showToast({
          title: res.Message,
          icon: 'none',
          mask: true
        })
      }
    })
    .catch(err=>{

    })

  }

  // 定位
  _weiXingetLoction(){
    Taro.getLocation({
          type: 'wgs84',
          
        }).then(res=>{
          this.setState({
            latitude: res.latitude,
            longitude: res.longitude,
          }, () => {
            console.log(this.state.latitude, this.state.longitude)
            Taro.setStorageSync('latitude', this.state.latitude)
            Taro.setStorageSync('longitude', this.state.longitude)
            this._getLoction()
          })
        })
  }
  _getLoction(){
    getloction(this.state.latitude, this.state.longitude)
      .then(data => {
        if (data.Success) {
          this.setState({
            startCityObj: data.Result
          })
          Taro.setStorageSync(`startCityObj`, JSON.stringify(data.Result))
          Taro.setStorageSync(`dingWeiName`, data.Result.Name)
        } else {

        }
      })
  }
  getDataFun(){
    const now=new Date()
    now.setDate(now.getDate()+7)
    let Y = now.getFullYear() + '-';
    let M = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1) + '-';
    // let D = date.getDate();
    let D = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    this.setState({
      checkTime:`${Y}${M}${D}`
    },()=>{
      this.getweekFun(this.state.checkTime)
      Taro.setStorageSync('timeData',this.state.checkTime)
    
      console.log(typeof this.state.checkTime,'默认日期')
    })
    
    
    
  }
  getFullYearFun(){
    let d1=new Date(); 
    let y = d1.getFullYear()+1;
    let m = d1.getMonth()+1;
    let n=d1.getFullYear()
    let d = d1.getDate();
    let str=`${y}/${m}/${d}`
    let nowStr=`${n}/${m}/${d}`
    this.setState({
      timeStr:str,
      nowTime:nowStr
    },()=>{
    console.log(this.state.nowTime,'现在的时间')
      
    })
  }
  getweekFun(checkTime){
    // console.log(checkTime,'调用周')
    let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        let dateStr = checkTime;
        let myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        this.setState({
          weekDayText:weekDay[myDate.getDay()]
        })
        console.log(weekDay[myDate.getDay()])

  }
  gotoPanel(){
    console.log(this.state.startCityObj, this.state.endCityObj, 'this.state.startCityObj')
    if (this.state.startCityObj.Name&&this.state.endCityObj.Name) {
    if(this.state.checkTime==''){
      Taro.showToast({
        title : '请选择时间' ,
        icon : 'none' ,
        mask : true
      })
    } else if (this.state.startCityObj.Name == '') {
      Taro.showToast({
        title: '请选择正确的开始地',
        icon: 'none',
        mask: true
      })
    } else if (this.state.endCityObj.Name == '') {
      Taro.showToast({
        title: '请选择正确的目的地',
        icon: 'none',
        mask: true
      })
    } else if (this.state.startCityObj.Name === this.state.endCityObj.Name) {
      Taro.showToast({
        title : '请选择正确的起始地' ,
        icon : 'none' ,
        mask : true
      })
    }else{
      // let timeText=this.state.checkTime.split('-')
      var timeTextStr = this.state.checkTime;
      var timeText = timeTextStr.split("-").join("");
      console.log(timeText);

      let startThree=this.state.startCityObj.Code
      let engThree=this.state.endCityObj.Code
      let urlCode=`${startThree}${engThree}${timeText}`
      Taro.navigateTo({
        url: '/pages/planeTicket/pages/flightInfo/index?urlCode=' + urlCode
      
      })
    }
    }else{
      Taro.showToast({
        title: '请选择正确的目的地',
        icon: 'none',
        mask: true
      })
    }
  }


  // 切换目的地
  changeCityFun(){
    let linshiObjA=this.state.startCityObj
    let linshiObjB=this.state.endCityObj
    this.setState({
      startCityObj:linshiObjB,
      endCityObj:linshiObjA,
      showImg:!this.state.showImg
    },()=>{
      console.log(this.state.startCityObj,'切换目的地1')
      console.log(this.state.endCityObj,'切换目的地2')
      Taro.setStorageSync(`startCityObj`, JSON.stringify(this.state.startCityObj))
      Taro.setStorageSync(`endCityObj`, JSON.stringify(this.state.endCityObj))
    })

  }


  gotoCity(type){
    // 解决当选择因私出行时， 点击选择出发地和目的地之后， 返回页面会自动跳转回因公出行
    Taro.setStorageSync('saveStatus','saveStatus')
    Taro.navigateTo({
      url: '/pages/selectCity/index?type='+type
    })
  }
  _getWellFormList(){
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    getWellFormList(true,true,1,1)
    .then(res=>{
      if(res.Success){
        Taro.hideLoading()
        console.log(res,'公出单')
        this.setState({
          TotalCount: res.Result.Pagination.TotalCount
        },()=>{
          console.log(this.state.TotalCount, 'this.state.TotalCount')
          
        })
        if (res.Result.Result.length>0) {
        this.setState({
          wellFormObj:res.Result.Result[0],
          emptyFlag:false,
        },()=>{
          console.log(this.state.wellFormObj)
          console.log(this.state.emptyFlag)
        })
      }else{
        this.setState({
          emptyFlag:true
        },()=>{
          console.log(this.state.emptyFlag)
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
    })
    .catch(err=>{

    })
  }
  getTuiJian=async()=>{
    
    const res = await tuiJianPosition();
    console.log(res.Result,'oooo')
    this.setState({
      recommendList: res.Result
      
    });
  }
  // 显示时间选择
  showTimeClick(flag){
    this.setState({
      showTime:flag
    })
  };
 
  // 显示航仓
  showCabinClick(flag){
     this.setState({
      showCabin:flag
    })
  };
  checkItem(item,index){
    console.log(item,'因公因私')
    // tablecurrent=2因公tablecurrent=4因私
     this.setState({
      cabinflag:index,
      tablecurrent:item.Id
    },()=>{
      Taro.setStorageSync('tablecurrent',this.state.tablecurrent)
      Taro.setStorageSync('cabinflag', this.state.cabinflag)
    })
  };
  onSelectDate(value){
    console.log(value,'value')
    Taro.setStorageSync('timeData',value.value.start)
    let checkTimeValue=value.value.start
    this.setState({
      checkTime:checkTimeValue
    },()=>{
    this.getweekFun(this.state.checkTime)
      
      console.log(typeof this.state.checkTime,'日历选择')
      
    })
    this.showTimeClick(false)
  }
  //专属服务
  _getService(){
    getService()
      .then(res => {
        if(res.Success){
          this.setState({
            serviceList:res.Result
          })
        }
        
      })
      .catch(err => {
        if (!err.message) {
          return
        }
        layer.open({
              content: err.message,
              skin: 'msg',
              time: 2 //2秒后自动关闭
          })
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
  gotoTicker(Url){
    Taro.navigateTo({
      url:`${Url}`
    })
  }
  // 精选产品详情页
  gotoDetail(item) {
    if (item.ProductTypeId == 101) {
      if (item.ProductCategoryId == 10000) {
         Taro.navigateTo({
           url: `/pages/touristRoutes/pages/routesDetail/index?ID=${item.Id}`
         })
      } else if (item.ProductCategoryId == 10043) {
       
         Taro.navigateTo({
           url: `/pages/admissionTicket/pages/admissionDetail/index?ID=${item.Id}`
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
         url: `/pages/visa/pages/visaDetail/index?id=${item.Id}`
       })
    }
  }
  // 进入公出单详情
  gotoWellformDetail() {
    Taro.navigateTo({
      url: `/pages/wellForm/pages/wellFormDetail/index?wellFormId=${this.state.wellFormObj.Id}&wellFormCode=${this.state.wellFormObj.Code}`
    })
  }
  gotoWellForm() {
    Taro.navigateTo({
      url: '/pages/wellForm/pages/myWellForm/index'

    })
  }
  render () {
    const {list,cabinData,cabinflag,recommendList,timeStr,serviceList,startCityObj,endCityObj,nowTime,wellFormObj,emptyFlag,TotalCount} = this.state
    return (
      <View className='index'>
        <View className='bannerBox'>
        <Swiper
            className='test-h'
            circular
            autoplay='true'>
            {list.map((item, index) => {
              return (
                <SwiperItem key={index} className='swiper_item' >
                  <View className='big_image_wrap'>
                    <Image mode='aspectFill' className='big_image' src={item.ImageUrl}/>
                    {/* <View className='big_title'>{item.title}</View> */}
                  </View>
                </SwiperItem>
              )
            })}
      </Swiper>
        </View>
        <View className={tablecurrent==0&&!emptyFlag?'top topHeight':'top'} >
        <View className='topBox'>
         {cabinData.length>=2&&<View className='topSelect'>
            {cabinData.map((item, index) => {
              return (
                <View className={cabinflag==index?'checkCabin':'checkCabin checkCabinOn'} onClick={this.checkItem.bind(this,item,index)}>
                   <Text className='cabinText'>{item.Name}</Text>
                </View>
              )
            })}
          </View>}
          {tablecurrent!=0&&<View className="nullBox">
            <View className='cityBox' style='padding-top:20px;width: 100%;'>
              <View className='setOutCity' >
                <View className='cityBox' onClick={this.gotoCity.bind(this,1)}>
                  <Text className='cityText' >{startCityObj.Name}</Text>
                  </View>
                  <Image  className={showImg?'xuanZhuan cityImg':'cityImg'} src={cityIcon} onClick={this.changeCityFun}/>
                <View className='cityBox endCityBox' onClick={this.gotoCity.bind(this,2)}>
                  <Text className='cityText' >{endCityObj.Name}</Text>
                  </View>
              </View>
            </View>
            <View className='checkTime' onClick={this.showTimeClick.bind(this,true)}>
                <Text className='checkTimeText'>{this.state.checkTime}({this.state.weekDayText})</Text>
            </View>
              <View className='btn' style='margin-bottom:24px;' onClick={this.gotoPanel} >开始预订</View>
            </View>}
            
            {tablecurrent==0&&<View className="nullBox">
            {emptyFlag&&<View className="nullText" style='color:#CECECE;padding:60px 0;text-align:center'>暂无数据</View>}
              {!emptyFlag&&<View className='wellForm'>
                <View className="downBox">
                  <View className="wellFormTitle">[{wellFormObj.Code}]+{wellFormObj.Name}</View>
                  <View className="applicant">
                    <Text>申请人：{wellFormObj.ApplyStaff.Name}</Text>
                    <Text>出行人员：{wellFormObj.StaffCount}人</Text>
                    
                  </View>
                </View>
                  <View className="wellFormContent">
                    <View className="CityLi">
                      <View className="iconBox"><Image src={chuFaIcon}/></View>
                      <Text className='textNth1'>出发</Text>
                      <Text className='textNth2'>{wellFormObj.LocusLocality}</Text>
                    </View>
                    <View className="CityLi">
                      <View className="iconBox"><Image src={chuFaIcon}/></View>
                      <Text className='textNth1'>到达</Text>
                      <Text className='textNth2'>{wellFormObj.TargetLocality}</Text>
                    </View>
                    <View className="riQiLi">
                      <View className="iconBox"><Image src={riqiIcon}/></View>
                      <Text className='textNth1'>出发</Text>
                      <Text className='textNth2'>{wellFormObj.DepartureDate}</Text>
                    </View>
                    <View className="riQiLi">
                      <View className="iconBox"><Image src={riqiIcon}/></View>
                      <Text className='textNth1'>回程</Text>
                      <Text className='textNth2'>{wellFormObj.ReturnDate}</Text>
                    </View>
                  </View>
              </View>}
              {!emptyFlag&&<View className='btn' onClick={this.gotoWellformDetail} >公出单详情，并购票</View>}
              <View className="allBtn" onClick={this.gotoWellForm}>全部({TotalCount})></View>
            </View>}
          </View>
        </View>
        <View className='vipService'>
             <Text className='vipTitle'>专属服务</Text>
              < Swiper style = 'height:100px;'
                    className='test-h'
                    displayMultipleItems={serviceList.length>=4?3.5:serviceList.length}>
                    {serviceList.map((item, index) => {
                    return (
                       
                      <SwiperItem key={index} className='swiper_item' onClick={this.gotoTicker.bind(this,item.TargetUrl)}>
                            <View className='big_image_wrap'>
                               <Image mode='aspectFill' className='big_image' src={item.ImageUrl}/>
                              <View className='big_title'>{item.Title}</View>
                             </View>
                      </SwiperItem>
                    )
                })}
              </Swiper>
        </View>
      
      <View className='recommend'>
        <View className='box'>
            <Text className='vipTitle'>精选产品</Text>
            <View className='proData'>
                      <View className="productUl">
                {recommendList.map((item,index)=>{
                  return (
                    
                        <View className="productLi" key={index} onClick={this.gotoDetail.bind(this,item)}>
                            <View className="imgBox">
                              {item.ProductTypeId==101&&item.ProductCategoryId==10000&&<View className="biaoQian">线路</View>}
                              {item.ProductTypeId==101&&item.ProductCategoryId==10043&&<View className="biaoQian">门票</View>}
                              {item.ProductTypeId==107&&<View className="biaoQian">签证</View>}
                              <Image className='proImg' src={item.ImageUrl}/>
                            
                            </View>
                            <View className="proMsgBox">
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
                            </View>
                            {item.Labels.length>0&&<View className="biaoQianLabel">
                                {item.Labels.map((item,index)=>{
                                return (
                                <View className="labelText" key={index}>{item}</View>
                                )
                                })}
                                </View>}
                        </View>
                     
               
                  )
                })}
                  </View>
                    </View>
            </View>
            
      </View>
          {/* 选择日历 */}
         {this.state.showTime && 
         <View > <View className='cabinMask'></View> <View className='riLiMask'><Image className='closeIcon' onClick={this.showTimeClick.bind(this,false)} src={close}/><AtCalendar isVertical='true' minDate={nowTime}  maxDate={timeStr} onSelectDate={this.onSelectDate.bind(this)}/></View> </View>}
      </View>
    )
  }
}
