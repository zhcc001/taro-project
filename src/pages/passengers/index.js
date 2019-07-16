import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Picker} from '@tarojs/components'
import {AtModal,AtInput} from 'taro-ui'
import {getPassengers,delPassenger,addPassenger} from '../../api/common'
import frequentContacts_edit from './images/frequentContacts_edit.jpg';
import frequentContacts_delete from './images/frequentContacts_delete.jpg';
import jianTouIcon from '../../common/image/down-trangle.png'
import rightIcon1 from './images/right1.png'
import rightIcon from './images/right.png'
import closeIcon from './images/guanBi.png'
import {shareTitle} from '../../api/commonVariable'

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
      type: 1, // 1 添加 2 编辑
      passengerName: '',
      passengerTel: '',
      passengerIdcard: '',
      //
      desc: '暂无常用联系人',
      listArr: [],
      yuDingrenId:'',
      delName:'',
      isOpened:false,
      maskH1:'',
      maskType:0,
      maskTypeFlag:false,
       showAddEdit: false,
         maskTextAddEdit: '',
         yuDingRenName: '',
         yuDingRenEName: '',
         yuDingRenSurname: '',
         yuDingRentel: '',
         nationality: '中国',
         cabinflag: 0,
         cabinData: [{
           Name: '身份证',
           Id: '401'
         }, {
           Name: '护照',
           Id: '402'
         }, ],
         showCertificates: false,
         passport: '',
         sexData: [{
           Name: '男',
           Id: '1'
         }, {
           Name: '女',
           Id: '2'
         }, ],
         validity: '请选择有效期',
         birthday: '请选择出生日期',
         sexId: '0',
         cabinflag: '401',
         typeText: '身份证',
         colorV: false,
         colorB: false,
         showHuZhao: false,
         addEditId: '',
         ID: '',
         editId: '',
         personalObj:{},
         typePlaceholder:'请输入身份证号'
    }
  }

  componentWillMount () {
    this._getPassengers()
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {
    
  } 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  
  // 显示订单弹层
showMask(name,ID){
    this.setState({
      delName:name,
      maskTypeFlag:false,
      isOpened:true,
      yuDingrenId:ID
    })
}
// 关闭订单弹层
handleCloseMask(){
  this.setState({
    isOpened:false
  })
}
sureAdd(){
  delPassenger(this.state.yuDingrenId)
  .then(res=>{
    if(res.Success){
      this.handleCloseMask()
      this._getPassengers()
      Taro.showToast({
        title: '删除成功',
        icon: 'none',
        mask: true
      })
    }
  })
  .catch(err=>{
    Taro.showToast({
      title: err.Message,
      icon: 'none',
      mask: true
    })
  })
  
}
// 获取常用有列表
_getPassengers(){
  getPassengers()
  .then(res=>{
      console.log(res.Result,'res.Result.Result')
      if(res.Success){
          this.setState({
            listArr:res.Result.Result
          },()=>{
              return this.state.listArr
          })
          
      }
      
    })
  .catch(err => {
    if (!err.message) {
      return
    }
    this.setState({
      toast:true,
      toastText:err.message
  })
  })
}
showYuDing(num, flag, item,index) {
  console.log(num, 'num实际')
  if (num == 1) { //关闭选择预订人
    this.setState({
      showSelect: flag,
    }, () => {
      console.log(this.state.showSelect)
      this._getPassengers()
    })
  } else if (num == 2) {
    if (flag == true) {
      this.setState({
        showAddEdit: flag,
        addEditText: '编辑预订人',
        addEditId: num,
        yuDingRenName: item.Name,
        yuDingRenSurname: item.EnglishSurname,
        yuDingRenEName: item.EnglishGivename,
        yuDingRentel: item.Mobile,
        passport: item.Documents.length > 0 && item.Documents[0].DocumentNo != '' ? item.Documents[0].DocumentNo : '',
        editId: item.Id,
        personalObj:item,
        cabinflag: '401',
        typeText: '身份证',
        showHuZhao:false,
        typePlaceholder: '请输入身份证号'
      }, () => {
        console.log(this.state.showAddEdit)
        console.log(this.state.addEditText)
        console.log(this.state.addEditId)
        console.log(this.state.yuDingRenName)
        console.log(this.state.yuDingRenSurname)
        console.log(this.state.yuDingRenEName)
        console.log(this.state.yuDingRentel)
        console.log(this.state.passport)
        console.log(this.state.editId)
        console.log(this.state.personalObj)
        console.log(this.state.cabinflag)
        console.log(this.state.typeText)
        console.log(this.state.typePlaceholder)
        console.log(this.state.showHuZhao)

      })
    } else {
      this.setState({
        showAddEdit: flag,
        addEditId: num,
      }, () => {
        console.log(this.state.showAddEdit)
        console.log(this.state.addEditText)
        console.log(this.state.addEditId)


      })
    }


  } else if (num == 3) {
    this.setState({
      editId:0,
      showAddEdit: flag,
      addEditText: '添加预订人',
      addEditId: num,
      yuDingRenName: '',
      yuDingRenSurname: '',
      yuDingRenEName: '',
      yuDingRentel: '',
      passport: '',
      birthday: '请选择出生日期',
      sexId: 0,
      nationality: '',
      validity: '请选择护照有效期',
      colorB: false,
      colorV: false,
      cabinflag: '401',
      typeText: '身份证',
      showHuZhao:false,
      typePlaceholder: '请输入身份证号'
    }, () => {
      console.log(this.state.showAddEdit)
      console.log(this.state.addEditText)
      console.log(this.state.addEditId)
      console.log(this.state.showAddEdit)
      console.log(this.state.addEditText)
      console.log(this.state.addEditId)
      console.log(this.state.yuDingRenName)
      console.log(this.state.yuDingRenSurname)
      console.log(this.state.yuDingRenEName)
      console.log(this.state.yuDingRentel)
      console.log(this.state.passport)
      console.log(this.state.birthday)
      console.log(this.state.sexId)
      console.log(this.state.nationality)
      console.log(this.state.validity)
      console.log(this.state.colorB)
      console.log(this.state.colorV)
      console.log(this.state.cabinflag)
      console.log(this.state.typeText)
      console.log(this.state.typePlaceholder)
      console.log(this.state.showHuZhao)
    })
  } else if (num == 5) {
    this.setState({
      showAddEdit: flag,
      cabinflag: '401',
      typeText: '身份证',
      showHuZhao:false,
      typePlaceholder: '请输入身份证号'

    }, () => {
      console.log(this.state.showAddEdit)
      console.log(this.state.cabinflag)
      console.log(this.state.typeText)
      console.log(this.state.typePlaceholder)
      console.log(this.state.showHuZhao)
    })
  }
}
// 中文名
yuDingRenNameChange(value) {
  this.setState({
    yuDingRenName: value
  }, () => {
    console.log(this.state.yuDingRenName)

  })

}
//  英文姓
yuDingRenENameChange(value) {
  this.setState({
    yuDingRenEName: value
  }, () => {
    console.log(this.state.yuDingRenEName)

  })

}
//  英文名
surnameChange(value) {
  this.setState({
    yuDingRenSurname: value
  }, () => {
    console.log(this.state.yuDingRenSurname)

  })

}
//  英文姓
yuDingRentelChange(value) {
  this.setState({
    yuDingRentel: value
  }, () => {
    console.log(this.state.yuDingRentel)

  })

}
//  护照
passportChange(value) {
  this.setState({
    passport: value
  }, () => {
    console.log(this.state.passport)

  })

}
//  国籍
nationalityChange(value) {
  this.setState({
    nationality: value
  }, () => {
    console.log(this.state.nationality)

  })

}
 // 显示证件类型
 typeChange(num, flag, item, index) {
   if (num == 1 || num == 3) {
     this.setState({
       showCertificates: flag,
     }, () => {
       console.log(this.state.showCertificates)
     })
   } else {
     if(this.state.addEditId==2){
       console.log(index,'证件Index')
     this.setState({
       showCertificates: flag,
       yuDingRenName: this.state.personalObj.Name,
       yuDingRentel: this.state.personalObj.Mobile,
       yuDingRenEName: this.state.personalObj.LastName,
       yuDingRenSurname: this.state.personalObj.FirstName,
       nationality: this.state.personalObj.NationalityName,
       sexId: this.state.personalObj.Gender,
       birthday: this.state.personalObj.BirthDate != '' ? this.state.personalObj.BirthDate : '请选择出生日期',
       validity: this.state.personalObj.Documents.length > 0 && this.state.personalObj.Documents[index].ExpiredDate != '' ? this.state.personalObj.Documents[index].ExpiredDate : '请选择护照有效期',
       passport: this.state.personalObj.Documents.length > 0 && this.state.personalObj.Documents[index].DocumentNo!==''?this.state.personalObj.Documents[index].DocumentNo:'',
       colorB: this.state.personalObj.BirthDate != '' ? true : false,
       colorV: this.state.personalObj.Documents.length > 0 && this.state.personalObj.Documents[index].ExpiredDate != '' ? true : false
     }, () => {
       console.log(this.state.showCertificates)
       console.log(this.state.yuDingRenName)
       console.log(this.state.yuDingRentel)
       console.log(this.state.yuDingRenEName)
       console.log(this.state.yuDingRenSurname)
       console.log(this.state.nationality)
       console.log(this.state.validity)
       console.log(this.state.passport)
       console.log(this.state.sexId)
       console.log(this.state.birthday)


     })
     if (item.Id == '401') {
       this.setState({
         showHuZhao: false,
         typePlaceholder: '请输入身份证号',
       }, () => {
         console.log(this.state.showHuZhao)
         console.log(this.state.typePlaceholder)
       })
     } else {
       this.setState({
         showHuZhao: true,
         typePlaceholder: '请输入护照号',

       }, () => {
         console.log(this.state.typePlaceholder)
         console.log(this.state.showHuZhao)

       })
     }
     }
     this.setState({
       cabinflag: item.Id,
       typeText: item.Name,
     }, () => {
       console.log(this.state.cabinflag)
       console.log(this.state.typeText)

     })
   }
 }
// 有效期
validityChange = e => {
  this.setState({
    validity: e.detail.value
  }, () => {
    console.log(this.state.validity)
    if (this.state.validity == e.detail.value) {
      this.setState({
        colorV: true,
      }, () => {
        console.log(this.state.colorV)
      })
    } else {
      this.setState({
        colorV: false,
      }, () => {
        console.log(this.state.colorV)
      })
    }

  })
}
// 生日
birthdayChange = e => {
  this.setState({
    birthday: e.detail.value
  }, () => {
    console.log(this.state.birthday)
    if (this.state.birthday == e.detail.value) {
      this.setState({
        colorB: true,
      }, () => {
        console.log(this.state.colorB)
      })
    } else {
      this.setState({
        colorB: false,
      }, () => {
        console.log(this.state.colorB)
      })
    }
  })
}
//  选择性别
checkSex(item) {
  this.setState({
    sexId: item.Id
  }, () => {
    console.log(this.state.sexId)
  })
}
  saveAddEdit() {
    let telReg = /^[1][1-9][0-9]{9}$/
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
     let huZhaoObj = [{
       "DocumentTypeId": `${this.state.cabinflag}`,
       "DocumentNo": `${this.state.passport}`,
       "ExpiredDate": this.state.validity == '请选择有效期' ? '' : this.state.validity,
     }]
     let documents = [...huZhaoObj]
     console.log(documents)
     let data = {
         Id: this.state.editId,
         Name: this.state.yuDingRenName,
         Mobile: this.state.yuDingRentel,
         BirthDate: this.state.birthday == '请选择出生日期' ? '' : this.state.birthday,
         Gender: this.state.sexId,
         FirstName: this.state.yuDingRenEName,
         LastName: this.state.yuDingRenSurname,
         Documents: documents,
         NationalityName: this.state.nationality

     }
    if (this.state.yuDingRenName == '') {
      Taro.showToast({
        title: '请输入姓名',
        icon: 'none',
        mask: true
      })
    } else if (this.state.yuDingRentel == '') {
      Taro.showToast({
        title: '请输入手机号',
        icon: 'none',
        mask: true
      })
    } else if (!telReg.test(this.state.yuDingRentel)) {
      Taro.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        mask: true
      })
    } else {
      if (this.state.cabinflag == 402) {
        if (this.state.passport == '') {
          Taro.showToast({
            title: '请输入护照号码',
            icon: 'none',
            mask: true
          })
        } else if (!this.state.colorV) {
          Taro.showToast({
            title: '请选择证件有效期',
            icon: 'none',
            mask: true
          })
        } else if (!this.state.colorB) {
          Taro.showToast({
            title: '请选择出生年月日',
            icon: 'none',
            mask: true
          })
        } else if (this.state.sexId == 0) {
          Taro.showToast({
            title: '请选择性别',
            icon: 'none',
            mask: true
          })
        } else {
          Taro.showLoading({
            title: '加载中',
            mask: true
          })

          if (this.state.addEditId == 2) {
            //编辑Api
            console.log('编辑护照Api')
            console.log(this.state.addEditId, 'addEditId')
            console.log(this.state.editId, 'editId')
            console.log(data, '提交的数据')
            addPassenger(data)
              .then(res => {
                console.log(res)
                if (res.Success) {
                  Taro.showToast({
                    title: '编辑成功',
                    icon: 'none',
                    mask: true
                  })
                  this.showYuDing(2, false)
                  this._getPassengers()

                }


              })
              .catch(err => {
                if (!err.message) {
                  return
                }

              })
          } else {
            //添加Api
            console.log('添加护照Api')
            console.log(this.state.editId, 'editId')
            console.log(data, '提交的数据')
            addPassenger(data)
              .then(res => {
                console.log(res)
                if (res.Success) {
                  Taro.showToast({
                    title: '添加成功',
                    icon: 'none',
                    mask: true
                  })
                  this.showYuDing(3, false)
                  this._getPassengers()

                }


              })
              .catch(err => {
                if (!err.message) {
                  return
                }

              })
          }
        }
      } else {
        if (this.state.passport == '') {
          Taro.showToast({
            title: '请输入身份证号',
            icon: 'none',
            mask: true
          })
        } else if (!reg.test(this.state.passport)) {
          Taro.showToast({
            title: '身份证不合法',
            icon: 'none',
            mask: true
          })
        } else {
          if (this.state.addEditId == 2) {
            //编辑Api
            console.log('编辑身份证Api')
            console.log(this.state.addEditId ,'addEditId')
            console.log(this.state.editId, 'editId')
            console.log(data, '提交的数据')
            addPassenger(data)
              .then(res => {
                console.log(res)
                if (res.Success) {
                  Taro.showToast({
                    title: '编辑成功',
                    icon: 'none',
                    mask: true
                  })
                  this.showYuDing(2, false)
                  this._getPassengers()

                }


              })
              .catch(err => {
                if (!err.message) {
                  return
                }

              })
          } else {
            //添加Api
            console.log('添加身份证Api')
           console.log(this.state.editId, 'editId')
            console.log(data, '提交的数据')
            addPassenger(data)
              .then(res => {
                console.log(res)
                if (res.Success) {
                  Taro.showToast({
                    title: '添加成功',
                    icon: 'none',
                    mask: true
                  })
                  this.showYuDing(3, false)
                  this._getPassengers()

                }


              })
              .catch(err => {
                if (!err.message) {
                  return
                }

              })
          }
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
    const {listArr}=this.state
    return (
      <View className='passengers'>
        <View  className="is-has">
          <View className="list">
            {listArr.map((item,index)=>{
              return (
                <View  className="cell flex">
                <View className="leftBox"  onClick={this.showYuDing.bind(this,2,true,item,index)}>
                  <View className="edit">
                    <Image className="edit-icon" src={frequentContacts_edit} />
                  </View>
                  <View className="item-info">
                    <View className="top">
                      <Text style='margin-right: 10px;'>{item.Name}</Text>
                      <Text>{item.Mobile!=''?item.Mobile:''}</Text>
                     </View>
                    <View className="bot">身份证号:   {item.Documents[0].DocumentNo}</View>
                  </View>
                  </View>
                  <View className="del" onClick={this.showMask.bind(this,item.Name,item.Id)}>
                    <Image className="del-icon" src={frequentContacts_delete} />
                  </View>
                </View>
              )
            })}
          </View>
          <View  className="add-btn" onClick={this.showYuDing.bind(this,3,true)}>添加</View>
        </View>
        {this.state.isOpened&&<View className='cabinMask' onClick={this.handleCloseMask}>
          <View class="dialog-box">
            <View className='dialog-h1'>{this.state.maskH1}乘机人</View>
            {!this.state.maskTypeFlag&&<View class="dialog-title">确定删除{this.state.delName}乘机人?</View>}
            <View class="dialog-btn flex">
              <View  class="cancel-btn" onClick={this.handleCloseMask}>取消</View>
              <View class="submit-btn" onClick={this.sureAdd.bind(this)}>确定</View>
            </View>
          </View>
        </View>}

         {/* 添加编辑弹层 */} 
        {this.state.showAddEdit&&<View className='cabinMask' >
            <View className='addPassenger'>
              <View className='maskTitle'>
                  <View className='titleText'>{this.state.addEditText}</View>  
                  <Image className='closeIcon' src={closeIcon} onClick={this.showYuDing.bind(this,5,false)}/>  
              </View>
            <View className="containter">
              
            <View class="contactsMaskMsg">
                <View className="msgTitle">
                        <View className="line"></View>
                        <View className="msgH4">个人信息</View>
                  </View>
                <View class="box">
                    <View className='ulBox'>
                        <View className='liBox'>
                            <Text className='leftText'>中文姓名</Text>
                           <AtInput style = 'flex-grow: 1;'
                            name='yuDingRenName'
                            type='text'
                            border={false}
                            placeholder='请输入中文名'
                            value={this.state.yuDingRenName}
                            onChange={this.yuDingRenNameChange.bind(this)}
                          />
                        </View>
                        <View className='liBox'>
                            <Text className='leftText'>英文姓</Text>
                            <AtInput style = 'flex-grow: 1;'
                            name='yuDingRenEName'
                            type='text'
                            border={false}
                            placeholder='如LI'
                            value={this.state.yuDingRenEName}
                            onChange={this.yuDingRenENameChange.bind(this)}
                          />
                        </View>
                        <View className='liBox'>
                            <Text className='leftText'>英文名</Text>
                            <AtInput style = 'flex-grow: 1;'
                            name='yuDingRenSurname'
                            type='text'
                            border={false}
                            placeholder='如Nancy'
                            value={this.state.yuDingRenSurname}
                            onChange={this.surnameChange.bind(this)}
                          />
                        </View>
                        <View className='liBox'>
                            <Text className='leftText'>+86</Text>
                            <AtInput style = 'flex-grow: 1;'
                            name='yuDingRentel'
                            type='tel'
                            border={false}
                            placeholder='请输入手机号码'
                            value={this.state.yuDingRentel}
                            onChange={this.yuDingRentelChange.bind(this)}
                          />
                        </View>
                    </View>
                </View>
            </View>
            <View class="contactsMaskMsg" style='padding-top: 30px;'>
                <View className="msgTitle">
                        <View className="line"></View>
                        <View className="msgH4">证件</View>
                  </View>
                <View class="box">
                    <View className='ulBox'>
                        <View className='liBox' >
                            {/* <Text className='leftText'>护照</Text> */}
                        
                          <View className="leftHText" onClick={this.typeChange.bind(this,1,true)}>
                            <Text className='leftText'>{this.state.typeText}</Text>
                            <View className="imgBox">
                              <Image src={jianTouIcon} />
                            </View>
                          </View>
                          <AtInput style = 'flex-grow: 1;'
                              name='yuDingRentel'
                              type='text'
                              border={false}
                              placeholder={this.state.typePlaceholder}
                              value={this.state.passport}
                              onChange={this.passportChange.bind(this)}
                            />
                            </View>
                        {this.state.showHuZhao&&<View className='liBox'>
                            <Text className='leftText'>证件有效期</Text>
                            <Picker mode='date' fields='day' onChange={this.validityChange} style = 'flex-grow: 1;'>
                              < View className={colorV?'picker pickerVColor':'picker'}>
                                {this.state.validity}
                              </View>
                            </Picker>
                        </View>}
                        {this.state.showHuZhao&&<View className='liBox'>
                            <Text className='leftText'>生日</Text>
                            <Picker mode='date' fields='day' onChange={this.birthdayChange} style = 'flex-grow: 1;'>
                              <View className={colorB?'picker pickerBColor':'picker'}>
                                {this.state.birthday}
                              </View>
                            </Picker>
                        </View>}
                        {this.state.showHuZhao&&<View className='liBox'>
                            <Text className='leftText'>性别</Text>
                            <View className="sexBox">
                            {this.state.sexData.map((item,index)=>{
                              return (
                                <View className="sexItem" key={index} onClick={this.checkSex.bind(this,item)}>
                                  <View className="sexImgBox">
                                    <Image src={sexId==item.Id?rightIcon:rightIcon1}/>
                                  </View>
                                  <Text>{item.Name}</Text>
                                  
                              </View>
                              )
                            })}
                            </View>
                        </View>}
                        {this.state.showHuZhao&&<View className='liBox'>
                            <Text className='leftText'>国籍</Text>
                            <AtInput style = 'flex-grow: 1;'
                            name='nationality'
                            type='text'
                            border={false}
                            placeholder='请输入国籍'
                            value={this.state.nationality}
                            onChange={this.nationalityChange.bind(this)}
                          />
                        </View>}
                    </View>
                </View>
            </View>
            </View>
            <View className='btnSure' onClick={this.saveAddEdit.bind(this)}>确定</View>
        </View>
       
        </View>}

        {/* 证件类型 */}
            {this.state.showCertificates&&<View className='cabinMask' style='z-index:600' onClick={this.typeChange.bind(this,3,false)}>
              <View className="dialog-boxType" >
                <View className='dialog-h1'>证件类型</View>
                <View className='midContent'>
                {cabinData.map((item, index) => {
                  return (
                    <View className='checkCabin' onClick={this.typeChange.bind(this,2,false,item,index)}>
                      <Text className='cabinText'>{item.Name}</Text>
                      <View className='checkBoxImg'>
                        <Image className='checkBoxIcon' src={this.state.cabinflag==item.Id?rightIcon:rightIcon1}/>
                        </View>
                    </View>
                  )
                })}
                </View>
              </View>
            </View>}
      </View>
    );
  }
}