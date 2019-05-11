import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Table} from '@tarojs/components'
import duiHao from './images/duiHao.png'
import Money from './images/money.png'
import Book_Progress from './images/book_progress.png'
import PublicOrder_Date from './images/publicOrder_date.jpg'
import Book_ToolsTime from './images/book_toolsTime.png'
import plane  from './images/orderarrow.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '订单详情'
  }

  constructor(){
    super(...arguments)
    this.state={
      statusmsg:{
        statustitle:'已完成',
        price: 2378.00,
        statusdec:'您已成功完成购买！'
      },
      orderdetail:{
         number: 243653476689,
         starttime: '07:00',
         startplace: '上海',
         startplacemark: '上海浦东国际机场T1',
         arrivaltime: '10:30',
         arrivalplace: '北京',
         arrivalplacemark: '北京首都国际机场',
      },
      airmessage:{
         startdata: '2019-01-11',
         startday:'(周三)',
         timemin: '2H20MIN',
         transit: '转郑州',
         transitmark: '郑州机场T2',
         plane: '某某航空',
         planesize: '中型机',
         planeclass: '经济舱'
      },
      orderoperate:{
        left: '删除订单',
        right: '再次购买',
      },
      passengermsg:{
        passengernum: 3
      },
      summsg:{
        totalprice: 800,
        totalnum: '900*2',
        totaldiscount: 8,
        payment: '公司支付',
        paymentmark: '(默认)',
        paytime: '2019-1-10 12:30',
      },
      shengJiMsg:[{
        Name:'张三',
        Tel:'129****9999',
        status:'审核中',
        statusId:1,
      },{
        Name:'李四',
        Tel:'129****9999',
        status:'申请通过',
        statusId:2,
      },{
        Name:'王五',
        Tel:'129****9999',
        status:'申请驳回',
        statusId:3,
      },],
    }
  }

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // gotoLogin(){
  //   Taro.navigateTo({
  //     url: '/pages/orderDetail/index'
      
  //   })
  // }
  render() {
    const {shengJiMsg}=this.state
    return (
      <View className='orderDetail'>
        <View className="OrderStatus">
          <Image src={Money} />
          <View className="StatusMessage">
            <View className="child1">
              <Txet class="statustitle">{this.state.statusmsg.statustitle}</Txet>
              <Txet className="orderprice">￥{this.state.statusmsg.price}</Txet>
            </View>
            <View className="statusdec">{this.state.statusmsg.statusdec}</View>
          </View>
        </View>
        <View className='OrderDetail'>
          <View className='OrderMessage'>
            <Text class="OrderNumber">订单号： {this.state.orderdetail.number}</Text>
            <View className='PlaneMessage'>
              <View className="application">
               <Text className="status1">申请通过 /</Text>
               <Text className="status2"> 审核中 /</Text>
               <Text className="status3"> 审核驳回</Text>
              </View>
              <View className="TimeAndPlace">
                <View className="start">
                  <Text className="time">{this.state.orderdetail.starttime}</Text>
                  <Text className="place">{this.state.orderdetail.startplace}</Text>
                  <Text className="mark">{this.state.orderdetail.startplacemark}</Text>
                </View>
                <View className="arrow">
                  <Image src={Book_Progress} />
                </View>
                <View className="arrival">
                   <Text className="time">{this.state.orderdetail.arrivaltime}</Text>
                   <Text className="place">{this.state.orderdetail.arrivalplace}</Text>
                   <Text className="mark">{this.state.orderdetail.arrivalplacemark}</Text>
                </View>
             </View>
             <View className="AirMessage">
                 <View className='viewBox'>
                   <Image src={PublicOrder_Date}  style='width: 14px;height: 12px;'/>
                   <Text>出发时间：</Text>
                   <Text> {this.state.airmessage.startdata}</Text>
                   <Text> {this.state.airmessage.startday}</Text>
                 </View>
               
                  <View className='viewBox'>
                     <Image src={Book_ToolsTime}  style='width: 14px;height: 16px;'/>
                    <Text>累计时长：</Text>
                    <Text> {this.state.airmessage.timemin}</Text>
                    <Text> |</Text>
                    <Text> {this.state.airmessage.transit}</Text>
                    <Text> {this.state.airmessage.transitmark}</Text>
                 </View>
                
                
                 <View className='viewBox'>
                   <Image src={plane}  style='width: 18px;height: 14px;'/>
                   <Text>{this.state.airmessage.plane}</Text>
                   <Text> |</Text>
                   <Text> {this.state.airmessage.planesize}</Text>
                   <Text> |</Text>
                   <Text> {this.state.airmessage.planeclass}</Text>
                 </View>
                
             </View>
             <View className="explain">行李额以及机票退改签规则说明 ></View>
            </View>
          </View>
          <View className="passengermsg">
              <View className="msgtitle">
                <Text className='line'></Text>
                <Text>乘机人信息 </Text>
                <Text> ({shengJiMsg.length})</Text>
              </View>
              <View className="container">
                <View className="table">
                    <View className="tr" style='background:rgba(252,249,233,1);'>
                      <View className="th">公出人</View>
                      <View className="th">手机号</View>
                      <View className="th">审核状态</View>
                    </View>
                    {shengJiMsg.map((item,index)=>{
                      return (
                        <View className="tr" key={index}>
                          <View className="td">{item.Name}</View>
                          <View className="td">{item.Tel}</View>
                          {item.statusId==1&&<View className='td tdColor1'>{item.status}</View>}
                          {item.statusId==2&&<View className='td tdColor2'>{item.status}</View>}
                          {item.statusId==3&&<View className='td tdColor3'>{item.status}</View>}
                      </View>
                      )
                    })}
                    
                </View>
              </View>
            </View>
            <View class="summsg">
              <View className='ulBox'>
                <View className='liBox'>
                  <View className='pBox'>累计金额</View>
                  <Text>￥{this.state.summsg.totalprice}  ({this.state.summsg.totalnum})</Text>  
                </View>
                <View className='liBox'>
                  <View className='pBox'>优惠信息</View>
                  <Text>{this.state.summsg.totaldiscount}折</Text>
                </View>
                <View className='liBox'>
                  <View className='pBox'>支付方式</View>
                  <Text>{this.state.summsg.payment} </Text> 
                  <Text> {this.state.summsg.paymentmark}</Text>
                </View>
                <View className='liBox'>
                  <View className='pBox'>提交时间</View>
                  <Text>{this.state.summsg.paytime}</Text>
                </View>
              </View>
            </View>
        </View>
        <View className='footer'>
          <View className='btn'>取消订单</View>
          <View className='btn payBtn'>去支付</View>
          {/* <View className='btn'></View> */}
        </View>
      </View>
    );
  }
}