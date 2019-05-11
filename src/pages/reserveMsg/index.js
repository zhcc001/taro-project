import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Picker} from '@tarojs/components'
import { AtSteps,AtTabs, AtTabsPane,AtTextarea,AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import feiJiIcon from './images/demo.png'
import juLiIcon from './images/arrow.png'
import bgImg from './images/矩形 524 拷贝.png'
import add from './images/add.jpg'
import del from './images/fillInOrder_delete.png'
import rightIcon from './images/right.png'
import rightIcon1 from './images/right1.png'
import close from './images/关闭.png'
import arrow from './images/arrow1.jpg'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '预定信息'
  }

  constructor(){
    super(...arguments)
    this.state={
      current: 2,
      tablecurrent:0,
      contactArr:[],
      payData:[
        {Name:'公司支付',ID:1,},{Name:'个人支付',ID:2}
      ],
      cabinflag:0,
      companyArr:[],
      payData:[
        {Name:'公司支付',ID:1,},{Name:'个人支付',ID:2}
      ],
      checkPersonArr:[],
      selector: ['中国建设银行', '中国农业银行', '中国工商银行', '中国银行'],
      value: '',
      isOpened:false,
    }
  }

  componentWillMount () { 
     
     if(this.$router.params.tablecurrent){
       console.log(typeof this.$router.params.tablecurrent)
        this.state.tablecurrent=parseInt(this.$router.params.tablecurrent) 
     }
     if(Taro.getStorageSync('contactArr')){
        this.state.contactArr=JSON.parse(Taro.getStorageSync('contactArr'))
     }
     if(Taro.getStorageSync('checkPersonArr')){
      this.state.checkPersonArr=JSON.parse(Taro.getStorageSync('checkPersonArr'))
     }
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 选择因私或因公
  handleClick (value) {
    this.setState({
      tablecurrent: value,
    })
    console.log(this.state.tablecurrent,'this.state.tableID')
  }
  // 选择支付方式
  checkItem(index){
    this.setState({
     cabinflag:index
     
   })
  }
  // 删除预定人
  delRenMsg(i){
    console.log(i,'iiiiii')
    console.log(this.state.contactArr,'this.state.contactArr.splice(i,1)')
    this.state.contactArr.splice(i,1)
    this.state.checkPersonArr.splice(i,1)
    Taro.setStorageSync(`checkPersonArr`, `${JSON.stringify(this.state.checkPersonArr)}`)
    Taro.setStorageSync(`contactArr`, `${JSON.stringify(this.state.contactArr)}`)
    this.setState({
      contactArr:this.state.contactArr,
      checkPersonArr:this.state.checkPersonArr
    })

    // contactArr.splice(i,1)
    // this.checkPersonArr.splice(i,1)
    // localStorage.setItem('contactArr',JSON.stringify(this.contactArr))
    // localStorage.setItem('checkPersonArr',JSON.stringify(this.checkPersonArr))
    
}
onChange = e => {
  this.setState({
    selectorChecked: this.state.selector[e.detail.value]
  })
}
gotoSelectReserve(type){
  Taro.navigateTo({
    url: `/pages/selectReserve/index?type=${type}&tablecurrent=${this.state.tablecurrent}`
    
  })
};
handleChange (event) {
  this.setState({
    value: event.target.value
  })
}
// 显示订单弹层
showMask(){
  this.setState({
    isOpened:true
  })
}
// 关闭订单弹层
handleCloseMask(){
  this.setState({
    isOpened:false
  })
}
sureOrder(){
  this.handleCloseMask()
    Taro.redirectTo({
      url: '/pages/paySuccess/index'
      
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
    const tabList = [{ title: '因公出行'}, { title: '因私出行'}]
    const {contactArr,payData,companyArr}=this.state
    return (
      <View className='ticketInfo'>
        <View className='topSteps'>
            <AtSteps items={items} current={this.state.current} />
        </View>
        <View className='content'>
          <View className="order-msg">
              <View className="orderMsgUp">
                <View className="leftBiaoQian">中转</View>
                <View className="midMsg">
                  <Text className='timeBiao'>12-19（周三）    15:00-18：37</Text>
                  <View className='cityBiao'>
                      <Text>上海</Text>
                      <Image src={arrow} />
                      <Text>北京</Text> 
                      <Text>经济舱</Text>
                  </View>
                </View>
              </View>
              <View className="orderMsgDown">
                <Text className='TextSpan'>4折</Text>
                <View className="rightText">
                  <View className="textMore">
                    <Text className='TextPrice'>¥900/人</Text>
                    <Text className='spanPrice'>¥2000</Text>
                    <View className='tipsP'> 不包含机建燃油</View>
                  </View>
                <View className='tipsP1'>退改签¥338起 ></View>
                </View>
              </View>
          </View>
          <View className='tableModel'>
            <AtTabs current={this.state.tablecurrent} tabList={tabList} onClick={this.handleClick.bind(this)}>
              <AtTabsPane  current={this.state.tablecurrent} index={0} >
                <View className='tableItem'>
                  <View className="usualpassenger">
                    <View className='usualUl'>
                    {companyArr.map((item,index)=>{
                      return (
                        <View className="msg" key={index}>
                            <View className="name"><Text> {item.Name} </Text><Text>{item.tel} </Text></View>
                            <View className="card">身份证：{item.IDCard} </View>
                            <Picker mode='selector' range={this.state.selector} onChange={this.onChange.bind(this)}>
                              <View className='picker'>
                                选择公务员卡：{this.state.selectorChecked}
                              </View>
                              </Picker>
                            <Image src={del} />
                        </View>
                      )
                    })}
                      <View className='addView' onClick={this.gotoSelectReserve.bind(this,2)}>
                          <View className='addBox'>
                            <Image src={add}/>
                            <Text>选择更多同事</Text>
                          </View>
                      </View>
                      <View class="select-payment">
                          <View class="payTitle">请选择支付方式</View>
                          <View class="btn">
                          {payData.map((item,index)=>{
                            return (
                              <Text  className={cabinflag==index?'buttonText isSelect':'buttonText'} key={index} onClick={this.checkItem.bind(this,index)}>{item.Name}</Text>
                            )
                          })}
                            
                          </View>
                      </View>
                      <AtTextarea value={this.state.value} onChange={this.handleChange.bind(this)} maxLength={200} placeholder='你的问题是...'  />
                    </View>
                  </View>
                </View>
              </AtTabsPane >
              <AtTabsPane  current={this.state.tablecurrent} index={1}>
                <View className='tableItem'>
                  <View className="usualpassenger">
                    <View className='usualUl'>
                    {contactArr.map((item,index)=>{
                      return (
                        <View className="msg" key={index}>
                            <View className="name"><Text> {item.Name} </Text><Text>{item.tel} </Text></View>
                            <View className="card">身份证：{item.IDCard} </View>
                            <Image src={del} onClick={this.delRenMsg.bind(this,index)}/>
                        </View>
                      )
                    })}
                      <View className='addView' onClick={this.gotoSelectReserve.bind(this,1)}>
                          <View className='addBox'>
                            <Image src={add}/>
                            <Text>选择更多同事</Text>
                          </View>
                      </View>
                      <View class="select-payment">
                          <View class="payTitle">请选择支付方式</View>
                          <View class="btn">
                          {payData.map((item,index)=>{
                            return (
                              <Text  className={cabinflag==index?'buttonText isSelect':'buttonText'} key={index} onClick={this.checkItem.bind(this,index)}>{item.Name}</Text>
                            )
                          })}
                            
                          </View>
                      </View>
                    </View>
                  </View>
                </View>
              </AtTabsPane >
            </AtTabs>
            
          </View>
        </View>
        <View className="total">
            <View className="msg">
                <Text className="font">累计 </Text>
                <Text className="totalprice"> ￥124</Text>
                <Text className="peoplenum">(4人)</Text>
            </View>
            <View className='sureBtn' onClick={this.showMask.bind(this)}>提交订单</View>
        </View>
        <AtModal isOpened={this.state.isOpened} onClick={this.handleCloseMask}>
            <View className='orderMsgMask'>
              <View className='at-row orderMsgMaskTitle'>
                <View className='at-col at-col-1 at-col--auto' onClick={this.handleCloseMask}>
                    <Image src={close} />
                </View>
                <View className='at-col' style='text-align: center;'>订单详情</View>
              </View>
              <View class="select-shipping">
                <View class="hangBanMsg">
                  <View class="biaoTi">
                    <Text>航班信息</Text>
                  </View>
                  <View class="neiRong">
                    <Text className='textB'>北京 (首都机场) - 上海 (虹桥机场)</Text>
                    <Text className='textP'>GUI34 T1</Text>
                    <Text className='textSpan'>2019-09-01 周六  12:34:00</Text>
                  </View>
                </View>
                <View class="hangBanMsg">
                  <View class="biaoTi">
                    <Text>乘机人</Text>
                  </View>
                  <View class="neiRong">
                    <Text className='textSpan'>张三  1726364384898</Text>
                  </View>
                </View>
              </View>
              <View  class="add-btn" onClick={this.sureOrder}>确定</View>
              
            </View>
        </AtModal>
      </View>
    );
  }
}