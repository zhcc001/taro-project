import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import { AtSteps } from 'taro-ui'
import {getflighInfo} from '../../api/common'
import feiJiIcon from './images/demo.png'
import juLiIcon from './images/arrow.png'
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
          icon: feiJiIcon,
          flightNo: '东方航空MU45',
          plane: '波音',
          planeSize: '大'
        },
        {
          directStartTime: 1555235145,
          directEndTime: 1555238745,
          directStartPlace: '银川国际机场T2',
          directEndPlace: '上海国际机场T2',
          icon: feiJiIcon,
          flightNo: '东方航空MU45',
          plane: '波音',
          planeSize: '大'
        }],
         
      },
      // 座舱机票
      alllist:[
        {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        },
        {
          discount: 2,
          price: 567,
          label: 1,
          type: 2,
          num: 0,
        },
        {
          discount: 1,
          price: 567,
          label: 2,
          type: 1,
          num: 10
        },
        {
          discount: 5,
          price: 567,
          label: 2,
          type: 4,
          num: 10
        },
       ],
       alllist1:[
        {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        },
       
       ],
       alllist2:[
        {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        },
        {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        },
       ],
       alllist3:[
        {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        },
        {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        }, {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        },
       ],
       title:['全部','经济舱','头等舱','商务舱'],
       cabinflag:0,
       ID:'',
       Code:'',
       Datetime:'',
       startThreeCode:'',
       endThreeCode:'',
    }
  }

  componentWillMount () {  
      this.state.ID=this.$router.params.Number
      this.state.Code=this.$router.params.Code
      this.state.Datetime=this.$router.params.Datetime
      this.state.startThreeCode=this.$router.params.startThreeCode
      this.state.endThreeCode=this.$router.params.endThreeCode
      console.log(this.$router.params.Number)
      // this._getflighInfo()
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  checkItem(index){
    this.setState({
     cabinflag:index
     
   })
   if(index==0){
    this.setState({
      alllist:[
        {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        },
        {
          discount: 2,
          price: 567,
          label: 1,
          type: 2,
          num: 0,
        },
        {
          discount: 1,
          price: 567,
          label: 2,
          type: 1,
          num: 10
        },
        {
          discount: 5,
          price: 567,
          label: 2,
          type: 4,
          num: 10
        },
       ],
       alllist1:[
        {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        },
       
       ],
       alllist1:[
        {
          discount: 3,
          price: 567,
          label: 1,
          type: 3,
          num: 10
        },
       
       ],
    })
   }else if(index==1){
    this.setState({
      alllist:[{
        discount: 3,
        price: 567,
        label: 1,
        type: 3,
        num: 10
      },]
    })
   }else if(index==2){
    this.setState({
      alllist:[{
        discount: 3,
        price: 567,
        label: 1,
        type: 3,
        num: 10
      },{
        discount: 3,
        price: 567,
        label: 1,
        type: 3,
        num: 10
      },]
    })
   }else if(index==3){
    this.setState({
      alllist:[{
        discount: 3,
        price: 567,
        label: 1,
        type: 3,
        num: 10
      },{
        discount: 3,
        price: 567,
        label: 1,
        type: 3,
        num: 10
      },{
        discount: 3,
        price: 567,
        label: 1,
        type: 3,
        num: 10
      },]
    })
   }
 };
 gotoReserveMsg(ID){
   Taro.removeStorageSync('checkPersonArr')
   Taro.removeStorageSync('contactArr')
  Taro.navigateTo({
    url: `/pages/reserveMsg/index?discount=${ID}`
  })
};
// 获取航班详情
_getflighInfo(){
  getflighInfo(this.state.ID,this.state.Code,this.state.Datetime,this.state.startThreeCode,this.state.endThreeCode)
    .then(res=>{
      console.log(res,'航班详情')
      // this.setState({
      //   cityList:res.Result
      // })
      
      })
    .catch(err => {
      if (!err.message) {
        return
      }
      
    })
}
  render() {
    const items = [
      { 'title': '航空公司'},
      { 'title': '选择舱位'},
      { 'title': '预订信息'},
      { 'title': '在线支付'},
      { 'title': '预订成功'}
    ]
    const {alllist,title,cabinflag} = this.state
    return (
      <View className='ticketInfo'>
        <View className='topSteps'>
            <AtSteps items={items} current={this.state.current} onChange={this.onChange.bind(this)} />
        </View>
        <View className='infoModel'>
            <View className='infoTitle'>
                <Text>2019-12-19  (周三) 北京-上海 |   时长 3H40MIN </Text>
            </View>
            {infoData.itemList.map((item,index)=>{
              return (
                <View className="plane-list">
            <View className="plane-cell" >
              <View className="top flex">
                <View className="time">08:00</View>
                <View className="place">上海浦东国际机场T1</View>
              </View>
              <View className="mid flex">
                <View className="times">3h20min</View>
                <View className="desc">
                  <Image className="desc-icon"  alt=""/>
                  <Text>东方航空 HU7654    空客789（中） </Text>
                </View>
              </View>
              <View className="bot flex">
                <View className="time">10:15</View>
                <View className="place">北京首都国际机场T2</View>
              </View>
              <View  className="mid flex">
                <View className="times"></View>
                <View className="desc">
                  <Text>于于北京转机，转机，2H40MIN</Text>
                </View>
              </View>
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
                      <View className={cabinflag==index?'itemCabin itemCabinOn':'itemCabin'} key={index} onClick={this.checkItem.bind(this,index)}>
                      <Text>{item}</Text>
                  </View>
                  )
                    })}
                      
                  </View>
                        {alllist.map((item,index)=>{
                          return (
                            <View className='cockpit-list' key={index} onClick={this.gotoReserveMsg.bind(this,item.discount)}>
                              <View className='cockpit-cell'>
                                <View className='cockpit-discount'>2.5折</View>
                                <View className="cockpit-info">
                                    <Text className="cockpit-sym">¥</Text>
                                    <Text className="cockpit-price">{item.price}</Text>
                                    {item.label==1&&<Text className="cockpit-label label1">政</Text>}
                                    {item.label==2&&<Text className="cockpit-label label2">协</Text>}
                                </View>
                                {item.type==3&&<View className='cockpit-desc'> 经济舱 | 行李额以及机票退改签规则说明></View>}
                                {item.type==2&&<View className='cockpit-desc'> 商务舱 | 行李额以及机票退改签规则说明></View>}
                                {item.type==1&&<View className='cockpit-desc'> 头等舱 | 行李额以及机票退改签规则说明></View>}
                                {item.num!=0&&<View className="booking-btn btn1">
                                    <View className="btn">预订</View>
                                    <View className="remain-num">剩{item.num}张</View>
                                </View>}
                                {item.num==0&&<View  className="booking-btn btn2">
                                    <View className="btn">预订</View>
                                </View>}
                              </View>
                          </View>
                              )
                          })}
                </View>
            </View> 
        </View>
    );
  }
}