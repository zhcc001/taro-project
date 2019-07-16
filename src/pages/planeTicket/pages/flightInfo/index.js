import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text ,Swiper, SwiperItem, Button,Input,Image} from '@tarojs/components'
import {AtSteps,AtToast,AtModal, AtModalHeader, AtModalContent, AtModalAction,AtCheckbox,AtCalendar,AtTabs, AtTabsPane} from 'taro-ui'
import {getflightList} from '../../../../api/common'
import juLiIcon from './images/arrow.png'
import sanjiaoIcon from './images/sanjiao.png'
import riLiIcon from './images/time.png'
import close from './images/close.jpg'
import nullImg from './images/nullImg.png'
import priceIcon from './images/jiage.png'
import priceCheckIcon from './images/jiage1.png'
import timeIcon from './images/shijian.png'
import timeCheckIcon from './images/shijian1.png'
import {shareTitle} from '../../../../api/commonVariable'
import './index.scss'
const  onTime = new Date();

export default class Index extends Component  {

   config = {
       navigationBarTitleText: ''
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      current: 0,
      currentTime:0,
      // 航班信息列表
      flightList: [
        
      ],
      showLoading:false,
      checkTime:'',
      dataTile:[],
      abcd:onTime,
      timeFlag:0,
      codeThree:'',
      linshiTime:'',
      geRenPay:{Id: "0", Name: "个人支付"},
      timeStr:'',
      topCurrent:0,
      topArr:[],
      nowTime:'',
      showNullImg:false,
      footerSelect:[{
          text: '低-高',
          textD:'低-高',
          textG: '高-低',
          htmlText: '价格',
          src: priceIcon,
          srcCheck:priceCheckIcon,
          sort: 'priceasc',
          sortE:'pricedesc'
      },{
          text: '时间',
          textD:'早-晚',
          textG: '晚-早',
          htmlText: '时间',
          src: timeIcon,
          srcCheck: timeCheckIcon,
          sort: 'timeasc',
          sortE:'timedesc'
      }],
      selectFlag:0,
      sort: 'priceasc',
      textType:6,//1时间 2早-晚 3晚-早 4价格 5低-高 6高-低
      wellForm: '',
      startCityName:'',
      endCityName:''
      
      
    }
  }

  componentWillMount () {
    let startCity=''
    let endCity=''
      this.state.codeThree=this.$router.params.urlCode
      this.state.linshiTime=this.$router.params.urlCode
      this.state.wellForm = this.$router.params.wellForm
      // if (this.$router.params.wellForm) {
      //   startCity = this.$router.params.DepartureCity
      //   endCity = this.$router.params.ArrivalCity
      // }else{
      //   if (Taro.getStorageSync('startCityObj') && Taro.getStorageSync('endCityObj')) {
      //     startCity = JSON.parse(Taro.getStorageSync('startCityObj')).Name
      //     endCity = JSON.parse(Taro.getStorageSync('endCityObj')).Name
      //   }
      // }
      if (Taro.getStorageSync('startCityObj') && Taro.getStorageSync('endCityObj')) {
        startCity = JSON.parse(Taro.getStorageSync('startCityObj')).Name
        endCity = JSON.parse(Taro.getStorageSync('endCityObj')).Name
      }
    Taro.setNavigationBarTitle({
      title: `${startCity}-${endCity}`
    })
  }
  componentDidMount () {
    this.getFullYearFun()
    this.dataFun()
    this._getflightList()
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  gotoTicketInfo(item){
    if(this.state.wellForm){
      Taro.navigateTo({
        url: `/pages/planeTicket/pages/ticketInfo/index?Code=${item.Code}&wellForm=${this.state.wellForm}&wellFormID=${this.$router.params.wellFormID}&startCityName=${this.state.startCityName}&endCityName=${this.state.endCityName}`

      })
    }else{
      Taro.navigateTo({
        url: `/pages/planeTicket/pages/ticketInfo/index?Code=${item.Code}`

      })
    }
  };
  getFullYearFun(){
    let d1=new Date(); 
    let y = d1.getFullYear()+1;
    let n=d1.getFullYear()
    let m = d1.getMonth()+1;
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
  // 获取航班信息
  _getflightList(){
    Taro.showLoading({
      title: '加载中',
      mask:true
    })
    getflightList(this.state.codeThree,this.state.sort)
      .then(res=>{
        if(res.Success){
          this.setState({
            startCityName: res.Result.Segments[0].Departure.Name,
            endCityName: res.Result.Segments[0].Arrival.Name,
          },()=>{
            console.log(this.state.startCityName)
            console.log(this.state.endCityName)
          })
        let testArr=res.Result.Segments[0].Voyages 
        testArr.map((item,index)=>{
          let arr1=item.Arrival.Datetime.split("T");
          let d1=arr1[0];
          let darr1 = d1.split('-');
          let t1=arr1[1];
          let tarr1 = t1.split('.000');
          let marr1 = tarr1[0].split(':');
          let dd1 =marr1[0]+":"+marr1[1];
          item.Arrival.Datetime=dd1
          let arr2=item.Departure.Datetime.split("T");
          let d2=arr2[0];
          let darr2 = d2.split('-');
          let t2=arr2[1];
          let tarr2 = t2.split('.000');
          let marr2 = tarr2[0].split(':');
          let dd2 =marr2[0]+":"+marr2[1];
          item.Departure.Datetime=dd2
           // 小时
           let t3 = item.Duration
           let tarr3 = t3.split('.000');
           console.log(t3, 'tarr3')
           let marr3 = tarr3[0].split(':');
           let dd3 = marr3[0] + ":" + marr3[1];
           let xiaoshi = `${parseInt(marr3[0])}小时${marr3[1]}分`
           item.Duration = xiaoshi
      }) 
      if(res.Result.Segments[0].Voyages.length==0){
        this.setState({
          showNullImg:true,
          flightList: res.Result.Segments[0].Voyages
        },()=>{
          console.log(this.state.showNullImg)
          console.log(this.state.flightList)
        })
      }else{
        this.setState({
          showNullImg: false,
          flightList: res.Result.Segments[0].Voyages
        }, () => {
          console.log(this.state.showNullImg)
          console.log(this.state.flightList)
        })
      }
        Taro.hideLoading()
      }else{
        Taro.hideLoading()
         this.setState({
           showNullImg: false
         }, () => {
           console.log(this.state.showNullImg)
         })
        Taro.showToast({
          title : res.Message ,
          icon : 'none' ,
          mask : true
        })
      }
      
        })
      .catch(err => {
        Taro.hideLoading()
        if (!err.message) {
          return
        }
        Taro.showToast({
          title : err.Message ,
          icon : 'none' ,
          mask : true
        })
      })
  }
  // 显示时间选择
  showTimeClick(flag){
    this.setState({
      showTime:flag
    })
  };
  onSelectDate(value){
    this.setState({
      topCurrent:this.state.topArr.indexOf(value.value.start),
      timeFlag:this.state.topArr.indexOf(value.value.start),
    })
    // this.setState({
    //   showLoading:true,
    // })
    
    this.setState({
      checkTime:value.value.start
    },()=>{
      let inShiArr=this.state.linshiTime.substr(0,this.state.linshiTime.length-8)
      let timeArr=this.state.checkTime.split('-').join('')
      this.setState({
        codeThree:`${inShiArr}${timeArr}`
      },()=>{
        console.log(this.state.codeThree,'t.title')
      this._getflightList()
      })
    })
    this.showTimeClick(false)
  }
  addDate(dd,dadd){
    let a = new Date(dd)
     a = a.valueOf()
     a = a + dadd * 24 * 60 * 60 * 1000
     a = new Date(a)
     return a;
 }
 handleClick (value) {
  this.setState({
    currentTime: value
  })
}
selectTime(t,i){
  // this.setState({
  //   showLoading:true,
  // })
let inShiArr=this.state.linshiTime.substr(0,this.state.linshiTime.length-8)
let timeArr=t.title.split('-').join('')
console.log(timeArr,'timeArrtimeArrtimeArr')
  this.setState({
    timeFlag:i,
    codeThree:`${inShiArr}${timeArr}`
  },()=>{
    console.log(this.state.codeThree,'t.title')
  this._getflightList()
  })
  
  
}
 dataFun(){
  let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  
   for(let i=0;i<370;i++){
         let month = (this.state.abcd.getMonth()+1)<10?`0${(this.state.abcd.getMonth()+1)}`:
         (this.state.abcd.getMonth()+1)
         let year=this.state.abcd.getFullYear()
         let day=(this.state.abcd.getDate())<10?`0${(this.state.abcd.getDate())}`:(this.state.abcd.getDate())
         let dataStr=`${year}-${month}-${day}`
          let myDate = new Date(Date.parse(dataStr.replace(/-/g, "/")))
         this.state.dataTile[i]={title:dataStr,week:weekDay[myDate.getDay()]};
         this.state.topArr[i]=`${year}-${month}-${day}`
         this.state.abcd = this.addDate(month+"/"+this.state.abcd.getDate()+"/"+this.state.abcd.getFullYear(),+1);
     }
    console.log(this.state.topArr.indexOf(Taro.getStorageSync('timeData')),'topArrtopArr')
    this.setState({
      topCurrent:this.state.topArr.indexOf(Taro.getStorageSync('timeData')),
      timeFlag:this.state.topArr.indexOf(Taro.getStorageSync('timeData')),
    })

 }

//  底部筛选
footerSelectFun(item,index) {
  if (this.state.selectFlag!=index) {
    if(index==0){
      this.state.footerSelect[1].text = '时间'
      this.setState({
        selectFlag: index,
      }, () => {
        console.log(this.state.footerSelect)
      })
      if (this.state.sort == 'priceasc') {
        this.state.footerSelect[index].text = item.textG
        // item.text='低-高'
        this.setState({
          sort: item.sortE,
          textType: 4,
          footerSelect: this.state.footerSelect
        }, () => {
          console.log(this.state.sort)
          console.log(this.state.footerSelect)
          this._getflightList()
        })
      } else {
        this.state.footerSelect[index].text = item.textD
        // item.text='高-低'
        this.setState({
          sort: item.sort,
          textType: 5,
          footerSelect: this.state.footerSelect
        }, () => {
          console.log(this.state.sort)
          console.log(this.state.footerSelect)
          this._getflightList()

        })
      }
      
    } else if (index == 1) {
      
      this.state.footerSelect[0].text = '价格'
      this.setState({
        selectFlag: index,
      }, () => {
        console.log(this.state.selectFlag)
      })
      if (this.state.sort == 'timeasc') {
        // item.text='早-晚'
        this.state.footerSelect[index].text = item.textG
        this.setState({
          sort: item.sortE,
          textType: 2,
          footerSelect: this.state.footerSelect
        }, () => {
          console.log(this.state.sort)
          console.log(this.state.footerSelect)
          this._getflightList()
        })
      } else {
        // item.text='晚-早'
        this.state.footerSelect[index].text = item.textD
        this.setState({
          sort: item.sort,
          textType: 3,
          footerSelect: this.state.footerSelect
        }, () => {
          console.log(this.state.sort)
          console.log(this.state.footerSelect)
          this._getflightList()
        })
      }
    }
  }else {
    if (index==1) {
      if(this.state.sort=='timeasc'){
        // item.text='早-晚'
        this.state.footerSelect[index].text= item.textG
        this.setState({
          sort: item.sortE,
          textType:2,
          footerSelect: this.state.footerSelect
        }, () => {
          console.log(this.state.sort)
          console.log(this.state.footerSelect)
          this._getflightList()
        })
      }else{
        // item.text='晚-早'
        this.state.footerSelect[index].text = item.textD
        this.setState({
          sort: item.sort,
          textType:3,
          footerSelect: this.state.footerSelect
        }, () => {
          console.log(this.state.sort)
          console.log(this.state.footerSelect)
          this._getflightList()
        })
      }

    } else if (index==0) {
      if (this.state.sort == 'priceasc') {
        this.state.footerSelect[index].text = item.textG
        // item.text='低-高'
        this.setState({
          sort: item.sortE,
          textType:4,
          footerSelect: this.state.footerSelect
        }, () => {
          console.log(this.state.sort)
          console.log(this.state.footerSelect)
          this._getflightList()
        })
      } else {
        this.state.footerSelect[index].text = item.textD
        // item.text='高-低'
        this.setState({
          sort: item.sort,
          textType:5,
          footerSelect: this.state.footerSelect
        }, () => {
          console.log(this.state.sort)
          console.log(this.state.footerSelect)
          this._getflightList()

        })
      }
    }
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
    const items = [
      { 'title': '航空公司'},
      { 'title': '选择舱位'},
      { 'title': '预订信息'},
      { 'title': '在线支付'},
      { 'title': '预订成功'}
    ]
    const {flightList,dataTile,timeStr,topCurrent,showNullImg,wellForm} = this.state
    return (
      <View className='flightInfo'>
        <View className='topSteps'>
            <AtSteps items={items} current={this.state.current} onChange={this.onChange.bind(this)} />
        </View>
        <View className='riLiBox'>
            <View className="timeList">
              <View className="list-wrapper">
                <Swiper style='height:60px;'
                    className='test-h'
                    current={topCurrent}
                    displayMultipleItems={5}>
                    {dataTile.map((item, index) => {
                    return (
                      <SwiperItem key={index} className='swiper_item' onClick={this.selectTime.bind(this,item,index)}>
                            <View className='big_image_wrap'>
                            <View className={timeFlag==index?'list-item list-item-select':'list-item'} >
                              <View class="dateWeek">{item.week}</View>
                              <View class="dateMonth">{item.title.slice(5)}</View>
                              </View>
                             </View>
                      </SwiperItem>
                    )
                })}
              </Swiper>
              </View>
              
            </View>
            <View className="riLiIconBox" onClick={this.showTimeClick.bind(this,true)}>
              <Image src={riLiIcon}/>
            </View>
        </View>
       {wellForm==1&&<View className="wellFormMsg">
                <View className="wellbiaoQian">计划出发日期</View>
                <Text>{this.$router.params.time}</Text>
                <Text>{this.$router.params.city}</Text>
        </View>}
        {showNullImg&&<Image className='nullImg' src={nullImg}/>}
        {/* {this.state.showLoading==true&&<AtToast isOpened={true} text="加载中" duration={0}  status="loading" hasMask={true}></AtToast>} */}
            < View className = 'list' >

        {flightList.length!=0&&flightList.map((item,index)=>{
          return (
            <View className="flight-list" key={index} onClick={this.gotoTicketInfo.bind(this,item)}>
            {item.IsLowestDiscount&&<View className='topLeftBiaoQian1'>当天最低折扣</View>}
            {item.IsLowestPrice&&<View className='topLeftBiaoQian2'>当天最低价</View>}
            <View className='cell'>
              <View className='cell-toText flex'>
                <View className='toText-left flex'>
                  <View className='toText-left-cell cell-other'>
                    <Text className='elliTextsis flight-time'>{item.Departure.Datetime}</Text>
                    <Text className='elliTextsis flight-city'>{item.Departure.Airport.Name}{item.Departure.Terminal}</Text>
                  </View>
                  <View className='toText-left-cell cell-mid'>
                    <Text className='flight-interval'>{item.Duration}</Text>
                    <Image className='mid-icon'  src={juLiIcon}/>
                  </View>
                  <View className='toText-left-cell cell-other'>
                    <Text className='elliTextsis flight-time'>{item.Arrival.Datetime}</Text>
                    <Text className='elliTextsis flight-city'>{item.Arrival.Airport.Name}{item.Arrival.Terminal}</Text>
                  </View>
                </View>
                <View className='toText-right'>
                  <View className='flight-Textrice'>
                  <View className='priceBox'>
                    <Text className='Textrice-sym'>¥</Text>
                    <Text className='Textrice'>{item.StartPrice.TicketPrice}</Text>
                    </View>
                  </View>
                  <View className='zheKouName'>
                  <View  className='flight-discount'>{item.StartPrice.DiscountInfo}</View>
                  </View>
                </View>
              </View>
              {item.Flights.map((t,i)=>{
                return (
                  <View className='cell-bot'>
                <Image className='flight-icon'  src={t.Airline.Logo}/>
                
                <View className='aircraftMsg'>
                  <Text className='elliTextsis comTextany'>{t.Airline.Name}{t.Name}</Text>
                  <Text className='elliTextsis comTextany'>{t.Equipment.Name}({t.Equipment.Size})</Text>
                </View>
              </View>
                )
              })}
            </View>
          </View>
          )
        })}
</View>

        <View className='footerBox'>
          {this.state.footerSelect.map((item,index)=>{
            return (
              <View className='selectBox' key={index} onClick={this.footerSelectFun.bind(this,item,index)}>
                <Image src={selectFlag==index?item.srcCheck:item.src} className='selectIcon'/>
                <View className={selectFlag==index?'selectTextOn':'selectText'}>{item.text}</View>
              </View>
            )
          })}
          
        </View>
        {this.state.showTime && 
         <View > <View className='cabinMask'></View> <View className='riLiMask'><Image className='closeIcon' onClick={this.showTimeClick.bind(this,false)} src={close}/><AtCalendar minDate={nowTime}  maxDate={timeStr} isVertical='true' onSelectDate={this.onSelectDate.bind(this)}/></View> </View>}
    </View>
    );
  }
}