import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text ,Swiper, SwiperItem, Button,Input,Image} from '@tarojs/components'
import {AtSteps,AtToast,AtModal, AtModalHeader, AtModalContent, AtModalAction,AtCheckbox,AtCalendar,AtTabs, AtTabsPane} from 'taro-ui'
import {getflightList} from '../../api/common'
import feiJiIcon from './images/demo.png'
import juLiIcon from './images/arrow.png'
import sanjiaoIcon from './images/sanjiao.png'
import riLiIcon from './images/time.png'
import close from './images/close.jpg'
import './index.scss'
const  onTime = new Date();

export default class Index extends Component  {

   config = {
       navigationBarTitleText: '航班详情'
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
      showLoading:true,
      checkTime:'',
      dataTile:[],
      abcd:onTime,
      timeFlag:0,
      
    }
  }

  componentWillMount () {
    this._getflightList()
    this.dataFun()
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  gotoTicketInfo(ID,Code,Datetime,startThreeCode,endThreeCode){
    Taro.navigateTo({
      url: `/pages/ticketInfo/index?Number=${ID}&Code=${Code}&Datetime=${Datetime}&startThreeCode=${startThreeCode}&endThreeCode=${endThreeCode}`
      
    })
  };
  // 获取航班信息
  _getflightList(){
    getflightList()
      .then(res=>{
        console.log(res)
        this.setState({
          showLoading:false,
          flightList:res.Result[0].Flights

        })
        
        })
      .catch(err => {
        if (!err.message) {
          return
        }
        
      })
  }
  // 显示时间选择
  showTimeClick(flag){
    this.setState({
      showTime:flag
    })
  };
  onSelectDate(value){
    console.log(value,'value')
    this.setState({
      checkTime:value.value.start
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
selectTime(i){
  this.setState({
    timeFlag:i
  })
  
}
 dataFun(){
   for(let i=0;i<370;i++){
         let month = (this.state.abcd.getMonth()+1)<10?`0${(this.state.abcd.getMonth()+1)}`:(this.state.abcd.getMonth()+1)
         let year=this.state.abcd.getFullYear()
         let day=(this.state.abcd.getDate())<10?`0${(this.state.abcd.getDate())}`:(this.state.abcd.getDate())
         this.state.dataTile[i]=`${year}-${month}-${day}`;
         this.state.abcd = this.addDate(month+"/"+this.state.abcd.getDate()+"/"+this.state.abcd.getFullYear(),+1);
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
    const {flightList,dataTile} = this.state
    return (
      <View className='flightInfo'>
        <View className='topSteps'>
            <AtSteps items={items} current={this.state.current} onChange={this.onChange.bind(this)} />
        </View>
        <View className='riLiBox'>
            <View className="timeList">
              <View className="list-wrapper">
                <Swiper
                    className='test-h'
                    displayMultipleItems={5}>
                    {dataTile.map((item, index) => {
                    return (
                      <SwiperItem key={index} className='swiper_item' onClick={this.selectTime.bind(this,index)}>
                            <View className='big_image_wrap'>
                            <View className={timeFlag==index?'list-item list-item-select':'list-item'} >
                              <View class="dateWeek">周{new Date().getDay(item.slice(5))}</View>
                              <View class="dateMonth">{item.slice(5)}</View>
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
        {flightList==0&&<AtToast isOpened={true} text="加载中" duration={0}  status="loading"></AtToast>}
        {flightList.map((item,index)=>{
          return (
            <View className='list' key={index} onClick={this.gotoTicketInfo.bind(this,item.Number,item.Airline.Code,item.Arrival.Datetime,item.Arrival.Airport.ThreeCode,item.Departure.Airport.ThreeCode)}>
            
            {item.num!==''&&<View className='sanJiao'>
                <Image src={sanjiaoIcon}/>
                <Text>{item.num}张</Text>
            </View>}
            <View className="flight-list">
            <View className='cell'>
              <View className='cell-toText flex'>
                <View className='toText-left flex'>
                  <View className='toText-left-cell cell-other'>
                    <Text className='elliTextsis flight-time'>{item.Arrival.Datetime}</Text>
                    <Text className='elliTextsis flight-city'>{item.Arrival.Airport.Name}{item.Arrival.Terminal}</Text>
                  </View>
                  <View className='toText-left-cell cell-mid'>
                    <Text className='flight-interval'>3时5分</Text>
                    <Image className='mid-icon'  src={juLiIcon}/>
                  </View>
                  <View className='toText-left-cell cell-other'>
                    <Text className='elliTextsis flight-time'>{item.Departure.Datetime}</Text>
                    <Text className='elliTextsis flight-city'>{item.Departure.Airport.Name}{item.Departure.Terminal}</Text>
                  </View>
                </View>
                <View className='toText-right'>
                  <View className='flight-Textrice'>
                    <Text className='Textrice-sym'>¥</Text>
                    <Text className='Textrice'>{item.StartPrice.Price}</Text>
                  </View>
                  <Text  className='flight-discount'>3折</Text>
                </View>
              </View>
              <View className='cell-bot'>
                <Image className='flight-icon'  src={item.Airline.Logo}/>
                <Text className='elliTextsis comTextany'>{item.Airline.Name}{item.Airline.Code}{item.Equipment.Name}{item.Equipment.Size}</Text>
              </View>
            </View>
          </View>
            </View>
          )
        })}
        {this.state.showTime && 
         <View > <View className='cabinMask'></View> <View className='riLiMask'><Image className='closeIcon' onClick={this.showTimeClick.bind(this,false)} src={close}/><AtCalendar minDate={Date.now()} isVertical='true' onSelectDate={this.onSelectDate.bind(this)}/></View> </View>}
    </View>
    );
  }
}