import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Table} from '@tarojs/components'
import {AtModal,AtToast} from 'taro-ui'
import {getWellFormDetail} from '../../../../api/wellForm'
import backIcon from '../../../../common/image/backHome.png'
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
       navigationBarTitleText: '公出单详情'
  }

  constructor(){
    super(...arguments)
    this.state={
        wellFormId:'',
        wellFormCode:'',
        wellFormDetailObj:{},
        data:[
          []
        ]
    }
  }

  componentWillMount () {
    this.state.wellFormId=this.$router.params.wellFormId
    this.state.wellFormCode=this.$router.params.wellFormCode
  }
  componentDidMount () {
    this._getWellFormDetail()
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 获取公出单详情
  _getWellFormDetail(){
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    getWellFormDetail(this.state.wellFormId,this.state.wellFormCode)
    .then(res=>{
      if(res.Success){
        Taro.hideLoading()
        this.setState({
          wellFormDetailObj: res.Result
        },()=>{
          console.log(this.state.wellFormDetailObj)
        })
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
      Taro.hideLoading()
      Taro.showModal({
        title: '出错了',
        content: '服务器异常',
        showCancel: false
      })
    })
  }
  backHome() {
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }
  //拖动不超过规定范围
  setTouchMove(e) {
    if (e.touches[0].clientX < 650 && e.touches[0].clientY < 1110 && e.touches[0].clientX > 0 && e.touches[0].clientY > 0) {
      if (e.touches[0].clientX <= 304 && e.touches[0].clientY <= 413) {
        this.setState({
          left: e.touches[0].clientX,
          top: e.touches[0].clientY,
        }, () => {
          console.log(this.state.left, 'e.touches[0].clientX < 650 && e.touches[0].clientY < 1110 && e.touches[0].clientX > 0 && e.touches[0].clientY > 0')
          console.log(this.state.top, 'e.touches[0].clientX < 650 && e.touches[0].clientY < 1110 && e.touches[0].clientX > 0 && e.touches[0].clientY > 0')
        })
      } else {
        this.setState({
          left: 304,
          top: 413
        }, () => {
          console.log(this.state.left)
          console.log(this.state.top)
        })
      }
    } else {
      this.setState({
        left: 10,
        top: 10
      }, () => {
        console.log(this.state.left)
        console.log(this.state.top)
      })
    }

  }
  gotoFlightInfo(item) {
    console.log(item,'城市城市')
    Taro.setStorageSync('timeData', item.RealDate)
    Taro.setStorageSync('startCityObj', JSON.stringify(item.DepartureCity))
    Taro.setStorageSync('endCityObj', JSON.stringify(item.ArrivalCity))
    Taro.navigateTo({
      url: `/pages/planeTicket/pages/flightInfo/index?wellForm=1&urlCode=${item.Code}&time=${item.DepartureDate}&city=${item.DepartureCity.Name}-${item.ArrivalCity.Name}&wellFormID=${item.Id}`
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
    const {wellFormDetailObj}=this.state
    return (
      <View className='wellFormDetail'>
        <View className="infoModel">
          <View className="nullBox">
              <View className='wellForm'>
                <View className="downBox">
                  <View className="wellFormTitle">[{wellFormDetailObj.Code}]+{wellFormDetailObj.Name}</View>
                  <View className="applicant">申请人：{wellFormDetailObj.ApplyStaff.Name}</View>
                  <View className="line"></View>
                </View>
                
                  <View className="wellFormContent">
                    <View className="CityLi">
                      <View className="iconBox"><Image src={chuFaIcon}/></View>
                      <Text className='textNth1'>出发</Text>
                      <Text className='textNth2'>{wellFormDetailObj.LocusLocality}</Text>
                    </View>
                    <View className="CityLi">
                      <View className="iconBox"><Image src={chuFaIcon}/></View>
                      <Text className='textNth1'>到达</Text>
                      <Text className='textNth2'>{wellFormDetailObj.TargetLocality}</Text>
                    </View>
                    <View className="riQiLi">
                      <View className="iconBox"><Image src={riqiIcon}/></View>
                      <Text className='textNth1'>出发</Text>
                      <Text className='textNth2'>{wellFormDetailObj.DepartureDate}</Text>
                    </View>
                    <View className="riQiLi">
                      <View className="iconBox"><Image src={riqiIcon}/></View>
                      <Text className='textNth1'>回程</Text>
                      <Text className='textNth2'>{wellFormDetailObj.ReturnDate}</Text>
                    </View>
                    {wellFormDetailObj.Departures.length>0&&<View className="quCheng">
                      <View className="iconBox"><Image src={quChengIcon}/></View>
                      <Text className='textNth1'>去程</Text>
                      <View className="textBox">
                      {wellFormDetailObj.Departures.map((item,index)=>{
                        return (
                           <View className="textBoxData" key={index}>
                                      <Text>{item.DepartureDate}</Text>
                                      <Text>{item.DepartureCity.Name}-{item.ArrivalCity.Name}</Text>
                                    </View>
                        )
                      })}
                      </View>
                    </View>}
                    {wellFormDetailObj.Returns.length>0&&<View className="quCheng">
                      <View className="iconBox"><Image src={huiChengIcon}/></View>
                      <Text className='textNth1'>回程</Text>
                      <View className="textBox">
                      {wellFormDetailObj.Returns.map((item,index)=>{
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
                      <Text>{wellFormDetailObj.StaffCount}人</Text>
                    </View>
                  </View>
              </View>
            </View>
            <View className="container">
                <View className="table">
                  {wellFormDetailObj.Staffs.map((items,indexs)=>{
                    return (
                      <View className="tr" style={indexs==0?'background:rgba(252,249,233,1);':''} key={indexs}>
                      {wellFormDetailObj.Staffs.length>0&&items.map((item,index)=>{
                        return (
                          <View className={index==0?"th":"td"} key={index}>{item.Name}</View>
                        )
                      })}
                      </View>
                      )
                    })}
                  </View> 
                    
                </View>
              </View>
              <View className='allTicket'>
                <View className='modelTitle'>
                    <View className='line'></View>
                    <Text>选择要购买的航班行程</Text>
                </View>
                <View className="list">
                {wellFormDetailObj.Departures.map((item,index)=>{
                  return (
                    <View className="wellFormLi" onClick={this.gotoFlightInfo.bind(this,item)} key={index}>
                      <View className="bianQian">去程{index+1}</View>
                      <View className="tripMsg">
                        <View className="riQiLi">
                          <View className="iconBox"><Image src={riqiIcon}/></View>
                          <Text className='textNth1'>出发日期</Text>
                          <Text>{item.DepartureDate}</Text>
                        </View>
                      
                        <View className="CityLi">
                          <View className="iconBox"><Image src={chuFaIcon}/></View>
                          <Text className='textNth1'>起始城市</Text>
                          <Text>{item.DepartureCity.Name}-{item.ArrivalCity.Name}</Text>
                        </View>
                       
                      </View>
                       <View className="btnBox">
                          <View className="booking-btn btn1">
                              <View className="btn">预订</View>
                          </View>
                        </View>
                  </View>
                  )
                })}
                {wellFormDetailObj.Returns.map((item,index)=>{
                  return (
                    <View className="wellFormLi" onClick={this.gotoFlightInfo.bind(this,item)} key={index}>
                      <View className="bianQian">回程{index+1}</View>
                      <View className="tripMsg">
                        <View className="riQiLi">
                          <View className="iconBox"><Image src={riqiIcon}/></View>
                          <Text className='textNth1'>出发日期</Text>
                          <Text>{item.DepartureDate}</Text>
                        </View>
                      
                        <View className="CityLi">
                          <View className="iconBox"><Image src={chuFaIcon}/></View>
                          <Text className='textNth1'>起始城市</Text>
                          <Text>{item.DepartureCity.Name}-{item.ArrivalCity.Name}</Text>
                        </View>
                       
                      </View>
                       <View className="btnBox">
                          <View className="booking-btn btn1">
                              <View className="btn">预订</View>
                          </View>
                        </View>
                  </View>
                  )
                })}  
                </View>
            </View>

         {/* 返回首页 */}
        <View  style={`top:${this.state.top}px;left:${this.state.left}px;margin: 10% 0px 0px 0%;`} className='backBox' onClick={this.backHome} onTouchMove={this.setTouchMove.bind(this)}>
              <View className='backIconText'>
                  <Image className='backIcon' src={backIcon}/>
                  <View className='backText'>首页</View>
              </View>
        </View>
      </View>
    );
  }
}