import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import orderArrow from './images/orderarrow.png'
import publicOrder_Date from  './images/publicOrder_date.jpg'
import plane from './images/plane.jpg';
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
      title:['全部','待支付','已出票','待退款'],
      OrderList:[
        {number:2874365276543,condition:'待支付',startCity:'上海',startMark:'(虹桥机场)',arrivalCity:'北京',arrivalMark:'(首都国际机场)',startTime:'2019-01-11',startDay:'(周三)',plane:'某某航空',planesize:'中型机',planeclass:'经济舱'}
      ]
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
  
  checkItem(index){
    this.setState({
     cabinflag:index
     
   })
  }
  render() {
    const {OrderList,title,cabinflag} = this.state
    return (
      <View className='orderList'>
        <View className='ListTitle'>
          {title.map((item,index)=>{
            return(
                <View className={cabinflag==index?'itemCabin itemCabinOn':'itemCabin'} key={index} onClick={this.checkItem.bind(this,index)}>
                  <Text>{item}</Text>
                </View>
              )
          })}
                      
        </View>
        <View className="OrderList">
        {OrderList.map((item,index)=>{
          return (
            <View className="OrderList_item" key={index} >
            <View className="Number-Condition">
                <View className="number">订单编号: {item.number}</View>
                <View className="condition">{item.condition}</View>
            </View>
            <View  className="OrderMessage">
               <View className="smallmask">类型</View>
               <View className="planePlace">
                  <Text className="place">{item.startCity}</Text>
                  <Text>{item.startMark}</Text>
                  <Image src={orderArrow}  className="arrow"/>
                  <Text className="place">{item.arrivalCity}</Text>
                  <Text>{item.arrivalMark}</Text>
               </View>
               <View className="startData">
                   <Image src={publicOrder_Date}  className="publicOrder_Date"/>
                   <View>
                      <Text>出发时间：</Text><Text>{item.startTime}</Text><Text> {item.startDay}</Text>
                   </View>
               </View>
               <View className="plane">
                 <Image src={plane}  className="plane_img"/>
                  <View className="plane_desc">
                    <Text>{item.plane} </Text>
                    <Text>| </Text>
                    <Text>{item.planesize} </Text>
                    <Text>| </Text>
                    <Text>{item.planeclassName}</Text>
                  </View>
               </View>
            </View>
            <View className="Btn">
                <View className="payOrder">立即支付</View>
                <View className="OneMoreOrder">再来一单</View>
            </View>
         </View>
          )
        })}
         
      </View>
    </View>
    );
  }
}