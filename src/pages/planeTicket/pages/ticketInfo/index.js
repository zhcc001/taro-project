import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import { AtSteps ,AtToast} from 'taro-ui'
import {getflighInfo, getPayType,getCabinType} from '../../../../api/common'
import juLiIcon from './images/arrow.png'
import {shareTitle} from '../../../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '机票信息'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      current: 1,
      ID:'',
      infoData:{
        startTime:'2019/04/05',
        weekDay:'周二',
        itemList:[{
          directStartTime: '2019/04/05',
          directEndTime: '2019/04/05',
          directStartPlace: '北京浦东国际机场T2',
          directEndPlace: '银川国际机场T2',
          flightNo: '东方航空MU45',
          plane: '波音',
          planeSize: '大'
        },
        {
          directStartTime: 1555235145,
          directEndTime: 1555238745,
          directStartPlace: '银川国际机场T2',
          directEndPlace: '上海国际机场T2',
          flightNo: '东方航空MU45',
          plane: '波音',
          planeSize: '大'
        }],
         
      },
      // 座舱机票
      alllist:[],
        alllist0:[],
       alllist1:[],
       alllist2:[],
       alllist3:[],
       title:[],
       cabinflag:0,
       ID:'',
       Code:'',
       Datetime:'',
       startThreeCode:'',
       endThreeCode:'',
       loading:true,
       showLoading:false,
       topStartTime:'',
       weekDayText:'',
       weekDayText2: '',
       topStartPlace:'',
       topEndPlace:'',
       timeDuration:'',//时长
       bookTypeId:'',
       wellForm:false,
       wellFormID:'',
       titleShow:false,
       startCityName: '',
      endCityName: ''
    }
  }

  componentWillMount () {  
    if (Taro.getStorageSync('tablecurrent')) {
      this.state.bookTypeId = Taro.getStorageSync('tablecurrent')
      this._getCabinType()
    }
    
      this.state.ID=this.$router.params.Number
      this.state.Code=this.$router.params.Code
      this.state.Datetime=this.$router.params.Datetime
      this.state.startThreeCode=this.$router.params.startThreeCode
      this.state.endThreeCode=this.$router.params.endThreeCode
      this.state.wellForm = this.$router.params.wellForm
      this.state.wellFormID = this.$router.params.wellFormID
      this.state.startCityName=this.$router.params.startCityName
      this.state.endCityName=this.$router.params.endCityName
  }
  componentDidMount () {
      this._getflighInfo()
    
    this._getPayType('')
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  checkItem(item,index){
    this.setState({
     cabinflag:item.Id
     
   })
   if (item.Id == 503) {
    console.log('头等舱')
    this.setState({
      alllist:this.state.alllist1
    })
   } else if (item.Id == 502) {
    console.log('商务舱')
    this.setState({
      alllist:this.state.alllist2
    })
   } else if (item.Id == 501) {
    console.log('经济舱')
    this.setState({
      alllist:this.state.alllist3
    })
   }
 };
 gotoReserveMsg(ID, CabinName, CabinCode, TicketPrice, TotalPrice, Taxes, DiscountInfo, IsGovern, QuantityInfo, CabinClassId, Discount) {
   Taro.removeStorageSync('checkPersonArr')
   Taro.removeStorageSync('contactArr')
   Taro.removeStorageSync('currentPassengerG')
   Taro.removeStorageSync('currentPassengerC')
   let myData=new Date()
   let arr1=this.state.infoData.Departure.Datetime.split("T");
   let d1=arr1[0];
   let darr1 = d1.split('-');
   let t1=arr1[1];
   let tarr1 = t1.split('.000');
   let marr1 = tarr1[0].split(':');
   let dd1 =marr1[0]+":"+marr1[1];
   let arr2=this.state.infoData.Arrival.Datetime.split("T");
    let d2=arr2[0];
    let darr2 = d2.split('-');
    let t2=arr2[1];
    let tarr2 = t2.split('.000');
    let marr2 = tarr2[0].split(':');
    let dd2 =marr2[0]+":"+marr2[1];
    console.log(d2,'到达时间')
    console.log(darr2, '到达时间')
    console.log(marr2, '到达时间')
   let orderMsg={
    week:this.state.weekDayText,
    week2: this.state.weekDayText2,
    Datatime:this.state.topStartTime,
    // DepartureDatetime: d1+''+dd1, //起飞时间
    d1:d1,
    dd1:dd1,
    DepartureName:this.state.infoData.Departure.Airport.Name,//起飞机场
    DepartureTerminal:this.state.infoData.Departure.Terminal,//起飞航站楼
    // ArrivalDatetime:d2+''+dd2,//到达时间
    d2:d2,
    dd2:dd2,
    ArrivalName:this.state.infoData.Arrival.Airport.Name,//到达机场
    ArrivalTerminal:this.state.infoData.Arrival.Terminal,//到达航站楼
    companyMsg:this.state.infoData.Flights[0].Airline.Name+this.state.infoData.Flights[0].Name+'-'+this.state.infoData.Flights[0].Equipment.Name+'('+this.state.infoData.Flights[0].Equipment.Size+')',//航空公司信息
    CabinName:CabinName,
    CabinCode:CabinCode,
    TicketPrice:TicketPrice,
    TotalPrice:TotalPrice,
    DiscountInfo:DiscountInfo,
    Taxes:`${Taxes[0].Name}:￥${Taxes[0].Amount},${Taxes[1].Name}:￥${Taxes[1].Amount}`,
    VoyagePrices: [{
      VoyageCode: this.state.Code,
      PriceId: ID,
      TravelFlightId: this.state.wellFormID
    }],
    IsGovern:IsGovern,
    TransitTypeName: this.state.infoData.TransitType.Name,
    QuantityInfo: QuantityInfo,
    CabinClassId: CabinClassId,
    Discount: Discount,
    flightId: this.state.infoData.Flights[0].Id,
    startCityName: this.state.startCityName,
    endCityName:this.state.endCityName,
    TaxesArr: Taxes
    

  }
  console.log(orderMsg, 'orderMsgorderMsg')
  Taro.setStorageSync('orederMsg',JSON.stringify(orderMsg))
  if (this.state.wellForm) {
    Taro.navigateTo({
    url: `/pages/wellForm/pages/reserveWellForm/index?discount=${ID}&code=${this.state.Code}&wellFormID=${this.state.wellFormID}`
  })
  }else{
    if(Taro.getStorageSync('saveStatus')){
      Taro.removeStorageSync('saveStatus')
    }
    Taro.navigateTo({
      url: `/pages/planeTicket/pages/reserveMsg/index?discount=${ID}&code=${this.state.Code}`
    })
  }
  
};
getweekFun(checkTime,d2){
  let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  let dateStr = checkTime;
  let dateStr2=d2
  let myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
  let myDate2 = new Date(Date.parse(dateStr2.replace(/-/g, "/")));
  this.setState({
    weekDayText:weekDay[myDate.getDay()],
    weekDayText2: weekDay[myDate2.getDay()]
  },()=>{
  console.log(this.state.weekDayText)
  console.log(this.state.weekDayText2)
    
  })

}
_getCabinType(){
  getCabinType(this.state.bookTypeId)
  .then(res=>{
    if(res.Success){
      console.log(res,'仓位类型')
      this.setState({
        cabinflag: res.Result.CabinClasses[0].Id,
        title:res.Result.CabinClasses,
        titleShow:true,
      },()=>{
        console.log(this.state.title)
        console.log(this.state.cabinflag)
        console.log(this.state.titleShow)
      })
    }
  })
  .catch(err=>{

  })
}
// 获取航班详情
_getflighInfo(){
  Taro.showLoading({
    title: '加载中',
    mask: true
  })
  getflighInfo(this.state.Code)
    .then(res=>{
      if(res.Success){
        Taro.hideLoading()
      console.log(res,'机票详情')
      var myData=new Date()
      // 起飞时间
      let Datetime = res.Result.Departure.Datetime
      let arr2=Datetime.split("T");
      let d2=arr2[0];
      // 到达时间
      let ArrivalDatetime = res.Result.Arrival.Datetime
      let arr3 = Datetime.split("T");
      let d3 = arr3[0];
      // 小时
      let t2 = res.Result.Duration
      let tarr2 = t2.split('.000');
      console.log(t2,'tarr2')
      let marr2 = tarr2[0].split(':');
      let dd2 =marr2[0]+":"+marr2[1];
      let xiaoshi=`${parseInt(marr2[0])}H${marr2[1]}MIN`
      this.setState({
        topStartTime:d2,
        topStartPlace: res.Result.Departure.Airport.Name,
        topEndPlace: res.Result.Arrival.Airport.Name,
        timeDuration:xiaoshi
      },()=>{
        this.getweekFun(this.state.topStartTime,d3)
      })
      res.Result.Prices.map((item,index)=>{
        // this.setState({
        //   alllist:this.state.alllist.push(item)
        // })
        console.log(item,'航班详情')
       
          if(item.CabinClassId==501){
            this.state.alllist3.push(item)
            console.log(this.state.alllist3,'arr3经济舱')
            
            this.setState({
              alllist3:this.state.alllist3,
              alllist:this.state.alllist3
            },()=>{
              console.log(this.state.alllist3)
              if (this.state.cabinflag == 501) {
                this.setState({
                  alllist: this.state.alllist3
                }, () => {
                  console.log(this.state.alllist)
                })
              }
            })
             
        }else if(item.CabinClassId==502){
          console.log('商务舱')
          this.state.alllist2.push(item)
          this.setState({
            alllist2:this.state.alllist2
          },()=>{
            console.log(this.state.alllist2)
            if (this.state.cabinflag == 502) {
              this.setState({
                alllist: this.state.alllist2
              }, () => {
                console.log(this.state.alllist)
              })
            }
          })
        }else if(item.CabinClassId==503){
          console.log('头等舱')
          // alllist1.push(item)
          this.state.alllist1.push(item)
          this.setState({
            alllist1:this.state.alllist1
          },()=>{
            console.log(this.state.alllist1)
            if (this.state.cabinflag == 503) {
              this.setState({
                alllist: this.state.alllist1
              }, () => {
                console.log(this.state.alllist)
              })
            }
          })
        }
      })
      
      this.setState({
        infoData:res.Result,
        loading:false,
        showLoading:true
      },()=>{
        return this.state.infoData
        console.log(this.state.showLoading)
      })
      console.log(this.state.alllist,'cangwei')
    }else{
      Taro.showToast({
        title : res.Message ,
        icon : 'none' ,
        mask : true
      })
    }
      })
    .catch(err => {
      
      
    })
}
_getPayType(){
  console.log('zhixingl')
  let tablecurrent=''
  if (Taro.getStorageSync('tablecurrent')) {
    tablecurrent = parseInt(Taro.getStorageSync('tablecurrent'))
  }
  getPayType(tablecurrent)
  .then(res=>{
    console.log(res)
    if(res.Success){
      console.log('执行了吗')
      Taro.setStorageSync('payData',JSON.stringify(res.Result.PayType))
      Taro.setStorageSync('selector',JSON.stringify(res.Result.GPBank))
      // this.setState({
      //   payData:res.Result.PayType,
      //   selector:res.Result.GPBank
      // },()=>{
        
      //   console.log(this.state.selector,this.state.payData,'银行卡数组')

      // })
      
      // Taro.setStorageSync('GPBank',JSON.stringify(res.Result.GPBank))
    }
  })
  .catch(err=>{
    if (!err.message) {
      return
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
    const items = [
      { 'title': '航空公司'},
      { 'title': '选择舱位'},
      { 'title': '预订信息'},
      { 'title': '在线支付'},
      { 'title': '预订成功'}
    ]
    const {title,cabinflag,weekDayText,topStartTime,topStartPlace,topEndPlace,timeDuration} = this.state
    return (
      <View className='ticketInfo'>
        <View className='topSteps'>
            <AtSteps items={items} current={this.state.current} onChange={this.onChange.bind(this)} />
        </View>
        {/* {this.state.showLoading==true&&<AtToast isOpened={true} text="加载中" hasMask={true} duration={0}  status="loading" ></AtToast>} */}
        <View className='infoModel'>
            {this.state.showLoading==true&&<View className='infoTitle'>
                <Text>{topStartTime}  ({weekDayText}) {topStartPlace}-{topEndPlace} |   时长 {timeDuration} </Text>
            </View>}
            {infoData.Flights.map((item,index)=>{
              return (
                <View className="plane-list">
            <View className="plane-cell" >
              <View className="top flex">
                <View className="time">{item.DepartureTime}</View>
                <View className="place">{item.DepartureAirport.Name}{item.DepartureTerminal}</View>
              </View>
              <View className="mid flex">
                <View className="times">{timeDuration}</View>
                <View className="desc">
                <View className='logoBox'>
                  <Image className='logoIcon' src={item.Airline.Logo} />
                </View>
                  
                  <View className='aircraftMsg'>
                  <Text className='elliTextsis comTextany'>{item.Airline.Name}{item.Name}</Text>
                  <Text className='elliTextsis comTextany'>{item.Equipment.Name}({item.Equipment.Size})</Text>
                </View>
                </View>
              </View>
              <View className="bot flex">
                <View className="time">{item.ArrivalTime}</View>
                <View className="place">{item.ArrivalAirport.Name}{item.ArrivalTerminal}</View>
              </View>
              {/* <View  className="mid flex">
                <View className="times"></View>
                <View className="desc">
                  <Text>于于北京转机，转机，2H40MIN</Text>
                </View>
              </View> */}
            </View>
          </View>
              )
            })}
          
        </View>
        <View className='allTicket'>
                <View className='modelTitle'>
                    <View className='line'></View>
                    <Text>全部机票</Text>
                </View>
                <View className='caBinlist'>
                  <View className='ListTitle'>
                    {title.map((item,index)=>{
                      return(
                      <View className={cabinflag==item.Id?'itemCabin itemCabinOn':'itemCabin'} key={index} onClick={this.checkItem.bind(this,item,index)}>
                      <Text>{item.Name}</Text>
                  </View>
                  )
                    })}
                      
                  </View>
                  
                        {this.state.alllist.map((item,index)=>{
                          return (
                            < View className = 'cockpit-list'key = {index} onClick={this.gotoReserveMsg.bind(this, item.Id, item.Cabin.Name, item.Cabin.Code, item.TicketPrice, item.TotalPrice, item.Taxes, item.DiscountInfo, item.IsGovern,item.QuantityInfo,item.CabinClassId,item.Discount)} >
                              <View className='cockpit-cell'>
                                <View className='cockpit-discount'>{item.DiscountInfo}</View>
                                <View className="cockpit-info">
                                    <Text className="cockpit-sym">¥</Text>
                                    <Text className="cockpit-price">{item.TicketPrice}</Text><Text className='tipsText'>不含机建、燃油费</Text>
                                    {item.IsGovern&&<Text className="cockpit-label label1">政</Text>}
                                    {item.IsProtocol&&<Text className="cockpit-label label2">协</Text>}
                                </View>
                                <View className='cockpit-desc'> {item.Cabin.Name}({item.Cabin.Code})</View>
                                {item.QuantityInfo!=''&&<View className="booking-btn btn1">
                                    <View className="btn">预订</View>
                                    <View className="remain-num">剩{item.QuantityInfo}张</View>
                                </View>}
                                {item.QuantityInfo==''&&<View  className="booking-btn btn2">
                                    <View className="btn">预订</View>
                                </View>}
                              </View>
                          </View>
                          
                              )
                          })}
                </View>
            </View> 
            {/* <AtToast isOpened={this.state.loading} text="加载中" duration={0}  status="loading"></AtToast> */}
        </View>
    );
  }
}