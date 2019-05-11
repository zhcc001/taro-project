import Taro, { Component,Config } from '@tarojs/taro'
import { View, Text,Swiper, SwiperItem ,Image,Button} from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction,AtCheckbox,AtCalendar} from "taro-ui"
import cityIcon from './images/home_aircraft.png'
import banner from './images/banner1.png'
import chengRenIcon from './images/home_noun_Man.png'
import childIcon from './images/home_child.png'
import yingErIcon from './images/home_baby.png'
import checkBoxIcon from './images/login_selectActive.png'
import weiChenkBoxIcon from './images/login_select.png'
import close from './images/close.jpg'
import {getData,tuiJianPosition} from '../../api/common'
// import {_login} from '../../api/login'
import './index.scss'
// import Auth from '../../utils/auth'
{/* <View></View> */}
{/* <Text></Text> */}
// import pageInit from '../../utils/pageInit'
// @pageInit()
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props) {
    super(props)
    this.state = {
      list: [{
        id:100,
        src:banner,
      },{
        id:101,
        src:banner,
      },{
        id:102,
        src:banner,
      }], // 广告列表
      start: 1,
      showTime:false,
      showCabin:false,
      cabinData:[{
        Id:1,
        title: '因公出行',
      },{
        Id:2,
        title: '因私出行',
      }],
      cabinflag:0,
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
    }
  }

  
  componentWillMount () {
    this.getList();
    this.getTuiJian();
    if(Taro.getStorageSync('startCityName')){
      this.state.startCity=Taro.getStorageSync('startCityName')
    }
    if(Taro.getStorageSync('endCityName')){
      this.state.endCity=Taro.getStorageSync('endCityName')
    }
    // this.state.startCity=this.$router.params.name
    
   }

  componentDidMount () {
  }

  componentWillUnmount () {
    
   }

  componentDidShow () { 
    
  }

  componentDidHide () { }
  
  gotoPanel(){
    Taro.navigateTo({
      url: '/pages/flightInfo/index'
      
    })
  }
  gotoCity(type){
    if(process.env.TARO_ENV == 'weapp') {
      wx.setStorage({
        key:'1',
        data:'aaa',
        success: (res) => {
          console.log("保存成功")
        }
      })
    } else {
      // h5 和 alipay
      localStorage.setItem("value", "aaa");
      console.log("local storage")
    }
    Taro.redirectTo({
      url: '/pages/selectCity/index?type='+type
    })
  }
  getList = async () => {
    
    const res = await getData();
    console.log(res,'oooo')
    
    this.setState({
      list: res.Result
    });
    
  };
  getTuiJian=async()=>{
    
    const res = await tuiJianPosition();
    console.log(res.Result,'oooo')
    this.setState({
      recommendList: res.Result
      
    });
  }
  goto = (id) => { // 去详情页面
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + id,
    })
  };
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
  checkItem(index){
     this.setState({
      cabinflag:index
    })
  };
  onSelectDate(value){
    console.log(value,'value')
    this.setState({
      checkTime:value.value.start
    })
    this.showTimeClick(false)
  }
  render () {
    const {list,cabinData,cabinflag,recommendList} = this.state
    return (
      <View className='index'>
        <View className='bannerBox'>
        <Swiper
        className='test-h'
        circular
        autoplay='true'>
        {list.map((item, index) => {
              return (
                <SwiperItem key={index} className='swiper_item' onClick={this.goto.bind(this,item.id)}>
                  <View className='big_image_wrap'>
                    <Image mode='aspectFill' className='big_image' src={item.ImageUrl}/>
                    {/* <View className='big_title'>{item.title}</View> */}
                  </View>
                </SwiperItem>
              )
            })}
      </Swiper>
        </View>
        <View className='top'>
        <View className='topBox'>
          <View className='topSelect'>
            {cabinData.map((item, index) => {
              return (
                <View className='checkCabin' onClick={this.checkItem.bind(this,index)}>
                   <View className='checkBoxImg'>
                     <Image className='checkBoxIcon' src={cabinflag==index?checkBoxIcon:weiChenkBoxIcon}/>
                    </View>
                   <Text className='cabinText'>{item.title}</Text>
                </View>
              )
            })}
          </View>
          <View className='setOutCity'>
              <Text className='cityText' onClick={this.gotoCity.bind(this,1)}>{this.state.startCity}</Text>
              <Image className='cityImg' src={cityIcon} />
              <Text className='cityText' onClick={this.gotoCity.bind(this,2)}>{this.state.endCity}</Text>
          </View>
          <View className='checkTime' onClick={this.showTimeClick.bind(this,true)}>
              <Text className='checkTimeText'>{this.state.checkTime}</Text>
          </View>
          {/* <View className='selectiveCabin'>
              <Text className='cabinText' onClick={this.showCabinClick.bind(this,true)}>选择航仓</Text>
              <View className='cabinNumBox'>
               <Image className='chengRenIcon' src={chengRenIcon} />
                <Text className='cabinNumber'>1</Text>
                <Image className='childIcon' src={childIcon} />
                <Text className='cabinNumber'>1</Text>
                <Image className='yingErIcon' src={yingErIcon} />
                <Text className='cabinNumber'>1</Text> 
              </View>
          </View> */}
          <View className='btn' onClick={this.gotoPanel} >选择航班</View>
          </View>
        </View>
        <View className='companyMsg'>
          <View className='box'>
            <Text className='text1'>您所在公司：</Text>
            <Text className='companyName'>{this.state.companyName}</Text>
            <View className='downMsg'>
               <View className='leftText'>
                  <Text>{this.state.companyObj.Name}</Text>
                  <Text>{this.state.companyObj.Tel}</Text>
               </View>
               <Text>员工：{this.state.companyObj.staffNum}</Text>
               <Text>订单：{this.state.companyObj.orderNum}</Text>
            </View>
            </View>
        </View>
        <View className='vipService'>
             <Text className='vipTitle'>专属服务</Text>
              <Swiper
                    className='test-h'
                    circular='false'
                    displayMultipleItems={2}>
                    {list.map((item, index) => {
                    return (
                      <SwiperItem key={index} className='swiper_item' onClick={this.goto.bind(this,item.id)} >
                            <View className='big_image_wrap'>
                               <Image mode='aspectFill' className='big_image' src={item.ImageUrl}/>
                       {/* <View className='big_title'>{item.title}</View> */}
                             </View>
                      </SwiperItem>
                    )
                })}
              </Swiper>
        </View>
      
      <View className='recommend'>
        <View className='box'>
            <Text className='vipTitle'>为你推荐</Text>
                {recommendList.map((item,index)=>{
                  return (
                     <View className='recommend-cell' key={index}>
                   <View className='recommend-img-box'>
                       <Image className='recommend-img' src={item.ImageUrl}></Image>
                       <View className='act'></View>
                   </View>
                   <Text className='recommend-title ellipsis'>{item.Name}</Text>
                   <View className='recommend-desc'>
                     <Text className='spanT'>{item.SalePrice}</Text>
                     <Text className='spanT'>{item.ScorePrice}</Text>
                     <Text className='spanT'>{(item.GradeValue/10).toFixed()}分</Text>
                   </View>
                   <View className='recommend-price'>
                     <Text className='price'>￥{item.SalePrice}</Text>
                     <Text className='oldPice'>￥{item.ScorePrice}</Text>
                   </View>
                 </View>
                  )
                })}
                 
            </View>
            

      </View>
      


        {/* 弹层 */}
         {/* { this.state.showCabin && <View ><View className='cabinMask'></View> 
          <View className='cabinMskContent'>
            <View className='topTitle'>
                <Image className='closeIcon' onClick={this.showCabinClick.bind(this,false)} src={close}/>
                <Text className='titleH2'>选择航仓</Text>
            </View>
            {cabinData.map((item, index) => {
              return (
                <View className='checkCabin' onClick={this.checkItem.bind(this,index)}>
                   <Text className='cabinText'>{item.title}</Text>
                   <View className='checkBoxImg'>
                     <Image className='checkBoxIcon' src={cabinflag==index?checkBoxIcon:weiChenkBoxIcon}/>
                    </View>
                </View>
              )
            })}
            <View className='btn'>确定选择</View>
          </View></View>} */}

          {/* 选择日历 */}
         {this.state.showTime && 
         <View > <View className='cabinMask'></View> <View className='riLiMask'><Image className='closeIcon' onClick={this.showTimeClick.bind(this,false)} src={close}/><AtCalendar isVertical='true' onSelectDate={this.onSelectDate.bind(this)}/></View> </View>}


      </View>
    )
  }
}
