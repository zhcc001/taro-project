import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Picker} from '@tarojs/components'
import { AtSteps ,AtInput} from 'taro-ui'
import {changeInfo,getOninfo} from '../../api/common'
import rightIcon1 from './image/right1.png'
import rightIcon from './image/right.png'
import jianTouIcon from '../../common/image/down-trangle.png'
import {shareTitle,edition} from '../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '个人资料'
  }

  constructor(){
    super(...arguments)
    this.state={
      personalObj:{},
        yuDingRenName:'',
        yuDingRenEName:'',
        yuDingRenSurname:'',
        yuDingRentel:'',
        nationality:'中国',
        cabinflag:0,
        cabinData:[{
          Name:'身份证',
          Id:'401'
        }, {
          Name: '护照',
          Id: '402'
        }, ],
        showCertificates:false,
        passport:'',
        sexData:[
          {
            Name:'男',
            Id:'1'
          }, {
            Name: '女',
            Id: '2'
          },
        ],
        validity:'请选择有效期',
        birthday:'请选择出生日期',
        sexId:'0',
        cabinflag:'401',
        typeText:'身份证',
        colorV:false,
        colorB:false,
        showHuZhao:false,
        typePlaceholder:'请输入身份证号码'

      
    }
  }

  componentWillMount () {
    this._getOninfo()
      
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {
    
  } 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  _getOninfo(){
     Taro.showLoading({
       title: '加载中',
       mask: true
     })
    getOninfo()
        .then(res=>{
          console.log(res)
          if(res.Success){
            Taro.hideLoading()
            console.log('重新')
            this.setState({
              personalObj: res.Result,
              passport: res.Result.IdentityNo,
              yuDingRenName: res.Result.Name,
              yuDingRentel: res.Result.Mobile,
              yuDingRenEName: res.Result.LastName,
              yuDingRenSurname: res.Result.FirstName,
              nationality: res.Result.NationalityName,
              
            },()=>{
             console.log(this.state.personalObj)
             console.log(this.state.passport)
             console.log(this.state.yuDingRenName)
             console.log(this.state.yuDingRentel)
             console.log(this.state.yuDingRenEName)
             console.log(this.state.yuDingRenSurname)
             console.log(this.state.nationality)
            
            })
          }else{
            Taro.showToast({
              title: res.Message,
              icon: 'none',
              mask: true
            })
          }
        })
        .catch(err=>{
          Taro.hideLoading()
        })
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
      let data = {
        Name: this.state.yuDingRenName,
        NickName:'' ,
        Mobile: this.state.yuDingRentel,
        Email:'' ,
        Gender: this.state.sexId,
        HeadImage: '',
        FirstName: this.state.yuDingRenEName,
        LastName: this.state.yuDingRenSurname,
        BirthDate: this.state.birthday == '请选择出生日期' ? '' : this.state.birthday,
        NationalityName: this.state.nationality,
        Documents: [{
          DocumentTypeId: this.state.cabinflag,
          DocumentNo: this.state.passport,
          IssueDate:'',
          ExpiredDate: this.state.validity == '请选择有效期' ? '' : this.state.validity
        }]
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
      }else {
        if(this.state.cabinflag==402){
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
            
            changeInfo(data)
              .then(res => {
                if (res.Success) {
                  Taro.hideLoading()
                  Taro.showToast({
                    title: '修改成功',
                    icon: 'none',
                    mask: true
                  })
                  Taro.switchTab({
                    url:`/pages/myMsg/index`
                  })
                } else {
                  Taro.hideLoading()
                  Taro.showToast({
                    title: res.Message,
                    icon: 'none',
                    mask: true
                  })
                }
              })
          }
        }else{
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
          }else{
            changeInfo(data)
              .then(res => {
                if (res.Success) {
                  Taro.hideLoading()
                  Taro.showToast({
                    title: '修改成功',
                    icon: 'none',
                    mask: true
                  })
                  Taro.switchTab({
                    url: `/pages/myMsg/index`
                  })
                } else {
                  Taro.hideLoading()
                  Taro.showToast({
                    title: res.Message,
                    icon: 'none',
                    mask: true
                  })
                }
              })
          }
        }
      }
      


    }
    // 显示证件类型
    typeChange(num,flag,item,index) {
      if(num==1||num==3){
        this.setState({
          showCertificates: flag,
        }, () => {
          console.log(this.state.showCertificates)
        })
      }else{
          this.setState({
            showCertificates: flag,
            yuDingRenName: this.state.personalObj.Name,
            yuDingRentel: this.state.personalObj.Mobile,
            yuDingRenEName: this.state.personalObj.LastName,
            yuDingRenSurname: this.state.personalObj.FirstName,
            nationality: this.state.personalObj.NationalityName,
            sexId: this.state.personalObj.Gender,
            birthday:this.state.personalObj.BirthDate != '' ? this.state.personalObj.BirthDate : '请选择出生日期', 
            validity: this.state.personalObj.Documents.length > 0 && this.state.personalObj.Documents[index].ExpiredDate != '' ? this.state.personalObj.Documents[index].ExpiredDate : '请选择护照有效期',
            passport: this.state.personalObj.Documents[index].DocumentNo,
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
          this.setState({
            cabinflag: item.Id,
            typeText: item.Name,
          }, () => {
            console.log(this.state.cabinflag)
            console.log(this.state.typeText)

          })
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
    const {}=this.state
    return (
      <View className='personalData'>
        <View className='addPassenger'>
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
                              type='text'
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
            <View className="banBen">版本号{edition}</View>
            <View className='btnSure' onClick={this.saveAddEdit.bind(this)}>确定</View>
        </View>
        {/* 证件类型 */}
            {this.state.showCertificates&&<View className='cabinMask' style='z-index:600' onClick={this.typeChange.bind(this,3,false)}>
              <View className="dialog-box" >
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