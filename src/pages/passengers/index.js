import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {AtModal} from 'taro-ui'
import person_blank from './images/person_blank.png'
import frequentContacts_edit from './images/frequentContacts_edit.jpg';
import frequentContacts_delete from './images/frequentContacts_delete.jpg';

import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '外部出行人'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      current: 0,
      // 删除提示
      showDelMsg: false,
      delItem: '',
      // 添加删除乘机人
      showAddEdit: false,
      type: 1, // 1 添加 2 编辑
      passengerName: '',
      passengerTel: '',
      passengerIdcard: '',
      //
      desc: '暂无常用联系人',
      listArr: [
        {
          name: '孙大圣1',
          phone: 16645647894,
          idCard: 152415197825253232
        },
        {
          name: '孙大圣2',
          phone: 16645647894,
          idCard: 152415197825253232
        },
      ],
      yuDingrenId:'',
      delName:'',
      isOpened:false,
      maskH1:'',
      maskType:0,
      maskTypeFlag:false,
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
  
  // 显示订单弹层
showMask(type){
  if(type==1){
    this.setState({
      maskH1:'添加',
      maskType:1,
      maskTypeFlag:true
    })
  }else if(type==2){
    this.setState({
      maskH1:'编辑',
      maskType:2,
      maskTypeFlag:true
    })
  }else if(type==3){
    this.setState({
      maskH1:'删除',
      maskType:3,
      maskTypeFlag:false
    })
  }
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
sureAdd(){
  if(this.state.maskType==1){
    console.log('添加乘机人')
  }else if(this.state.maskType==2){
    console.log('编辑乘机人')
  }else if(this.state.maskType==3){
    console.log('删除乘机人')
  }
  this.handleCloseMask()
  
}
  render() {
    const {listArr}=this.state
    return (
      <View className='passengers'>
        <View  className="is-has">
          <View className="list">
            {listArr.map((item,index)=>{
              return (
                <View  className="cell flex">
                  <View className="edit" onClick={this.showMask.bind(this,2)}>
                    <Image className="edit-icon" src={frequentContacts_edit} />
                  </View>
                  <View className="item-info">
                    <View className="top">{item.name}   {item.phone}</View>
                    <View className="bot">身份证号:   {item.idCard}</View>
                  </View>
                  <View className="del" onClick={this.showMask.bind(this,3)}>
                    <Image className="del-icon" src={frequentContacts_delete} />
                  </View>
                </View>
              )
            })}
          </View>
          <View  className="add-btn" onClick={this.showMask.bind(this,1)}>添加</View>
        </View>
        {this.state.isOpened&&<View className='cabinMask' onClick={this.handleCloseMask}>
          <View class="dialog-box">
            <View className='dialog-h1'>{this.state.maskH1}乘机人</View>
            {!this.state.maskTypeFlag&&<View class="dialog-title">确定删除张三乘机人?</View>}
           {this.state.maskTypeFlag&&<View class="dialog-form">
              <Input class="form-one" type="text" placeholder="请输入姓名" /> 
              <Input class="form-one" type="text" placeholder="请输入手机号" /> 
              <Input class="form-one" type="text" placeholder="请输入身份证号" /> 
            </View>}
            <View class="dialog-btn flex">
              <View  class="cancel-btn" onClick={this.handleCloseMask}>取消</View>
              <View class="submit-btn" onClick={this.sureAdd.bind(this,1)}>确定</View>
            </View>
          </View>
        </View>}
      </View>
    );
  }
}