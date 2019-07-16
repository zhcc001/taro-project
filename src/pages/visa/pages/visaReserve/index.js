import Taro , { Component,Config, navigateTo } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Picker} from '@tarojs/components'
import { AtSteps ,AtInput} from 'taro-ui'
import {getOrderMsg,getVisaTrippers,saveTrpper,getOninfo,getVisaCkeckTripper,delTrippers,addPassenger } from '../../../../api/common'
import {getOrder} from '../../../../api/visa'
import duiHao from './images/duiHao.png'
import delIcon from './images/fillInOrder_delete.png'
import backIcon from '../../../../common/image/backHome.png'
import doenIcon from './images/doen.png'
import rightIcon from './images/right.png'
import closeIcon from './images/guanBi.png'
import edit from './images/editInfo.png'
import rightIcon1 from './images/right1.png'
import addIcon from './images/add.png'
import jianTouIcon from '../../../../common/image/down-trangle.png'
import {shareTitle} from '../../../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '签证预订'
  }

  constructor(){
    super(...arguments)
    this.state={
      top: '',
      left: '',
      windowWidth: '',
      windowHeight: '',
      visaReserveObj:{},
      contactArr:[],
        isGuara:[],
        showImg:-1,
        guaranteeData:[
            {   
                ID:1,
                title:'拒签退款',
                content:'这里写拒签退款的说明',
                price:'567',
            },{   
                ID:2,
                title:'拒签退款',
                content:'这里写拒签退款的说明',
                price:'567',
            }
        ],
        contactsName:'',
        contactsTel:'',
        contactsEmail:'',
        express:'顺丰',
        address:'',
        showDetail:false,
        visaShow:false,
        visaName:'',
        ID:'',
        Labels:[],
        checkPersonArr:[],
        price:'',
        loginInfo:{},
        orderId:'',
        isOpened:false,
        list:[],
        flagStr:'',
        showSelect:false,
        contactId: [],
        contactArr:[],
        proSonNum:0,
        showAddEdit:false,
        maskTextAddEdit: '',
        yuDingRenName:'',
        yuDingRenEName:'',
        yuDingRenSurname:'',
        yuDingRentel:'',
        nationality:'中国',
        cabinflag:0,
        cabinData:[{
          Name:'护照',
          Id:'402'
        },{
          Name:'身份证',
          Id:'401'
        }],
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
        cabinflag:'402',
        typeText:'护照',
        colorV:false,
        colorB:false,
        showHuZhao:true,
        addEditId:'',
        ID:'',
        editId:'',
        linShiArr:[],
        chengRenNum:'',
        erTongNum:'',
        
    }
  }

  componentWillMount () {
    this.getFlagTime()
    
    this.state.ID = this.$router.params.ID
    if (Taro.getStorageSync('visaReserveObj')) {
      this.state.visaReserveObj = JSON.parse(Taro.getStorageSync('visaReserveObj'))

    }
    this._getOninfo()
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
       

  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 时间戳
  getFlagTime() {
    let d1 = new Date();
    let y = d1.getFullYear();
    let m = d1.getMonth() + 1;
    let d = d1.getDate();
    let h = d1.getHours();
    let f = d1.getMinutes()
    let s = d1.getSeconds()
    if (m < 10) {
      m = `0${m}`
    }
    if (d < 10) {
      d = `0${d}`
    }
    if (h < 10) {
      h = `0${h}`
    }
    if (f < 10) {
      f = `0${f}`
    }
    if (s < 10) {
      s = `0${s}`
    }
    this.setState({
      flagStr: `${y}${m}${d}${h}${f}${s}`
    }, () => {
      console.log(this.state.flagStr)
      this._getCkeckTripper()
    })
  }
  handleMobileChange(value) {
    this.setState({
      contactsTel: value,
    }, () => {
      console.log(this.state.contactsTel)

    })
    

  }
  nameChange(value) {
    this.setState({
      contactsName: value
    }, () => {
      console.log(this.state.contactsName)

    })
    
  }
  handleEmailChange(value) {
    this.setState({
      contactsEmail: value
    }, () => {
      console.log(this.state.contactsEmail)

    })
    
  }
  handleAddressChange(value) {
    this.setState({
      address: value
    }, () => {
      console.log(this.state.address)

    })

  }
  // 明细的显示隐藏
  showDetailFun() {
    this.setState({
      showDetail:!this.state.showDetail
    },()=>{
      console.log(this.state.showDetail)
    })
  }
  hideDetailFun() {
    this.setState({
      showDetail: false
    }, () => {
      console.log(this.state.showDetail)
    })
  }
  showOrderDetail(flag){
    console.log('显示订单弹层')
    if(this.state.contactArr.length==0){
      Taro.showToast({
        title: '请选择预订人',
        icon: 'none',
        mask: true
      })
      return
    }
    let telReg = /^[1][1-9][0-9]{9}$/
    if (this.state.contactsName == '') {
      Taro.showToast({
        title: '请输入联系人姓名',
        icon: 'none',
        mask: true
      })
    } else if (this.state.contactsTel == '') {
      Taro.showToast({
        title: '请输入联系人手机号',
        icon: 'none',
        mask: true
      })
    } else if (!telReg.test(this.state.contactsTel)) {
      Taro.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        mask: true
      })
    }else{
      this.setState({
        isOpened: flag,
        showDetail: false
      }, () => {
        console.log(this.state.isOpened)
        console.log(this.state.showDetail)
      })
    }
    
  }
  // 获取常用有列表
_getYouKeList() {
  Taro.showLoading({
    title: '加载中',
    mask: true
  })
  let linShiNum=[]
  getVisaTrippers(this.state.flagStr)
    .then(res => {
      if (res.Success) {
        Taro.hideLoading()
        this.setState({
          list: res.Result
        }, () => {
          console.log(this.state.list)
          this.state.list.map((item, index) => {
            if (item.IsSelected == true) {
              linShiNum.push(item.IsSelected)
            } else {
              linShiNum.splice(index, 1)
            }
          })
          this.setState({
            proSonNum: linShiNum.length
          }, () => {
            console.log(this.state.proSonNum)
          })
        })
        
    }else{
       Taro.showToast({
         title: res.Message,
         icon: 'none',
         mask: true
       })
    }
    })
    .catch(err => {
     
      
    })
}
showYuDing(num,flag,item){
  console.log(num,'num实际')
  if(num==1){//关闭选择预订人
    this.setState({
      showSelect: flag,
    }, () => {
      console.log(this.state.showSelect)
      this._getYouKeList()
    })
  }else if(num==2){
    if(flag==true){
      this.setState({
        showAddEdit: flag,
        addEditText: '编辑预订人',
        addEditId: num,
        yuDingRenName: item.Name,
        yuDingRenSurname: item.EnglishSurname,
        yuDingRenEName: item.EnglishGivename,
        yuDingRentel: item.Mobile,
        passport: item.DocumentNo,
        birthday: item.BirthDate != '' ? item.BirthDate : '请选择出生日期',
        sexId: item.Gender,
        editId: item.Id,
        nationality: item.NationalityName,
        validity: item.Documents.length > 0 && item.Documents[0].ExpiredDate != '' ? item.Documents[0].ExpiredDate : '请选择护照有效期',
        colorB: item.BirthDate != '' ? true : false,
        colorV: item.Documents.length > 0 && item.Documents[0].ExpiredDate != '' ? true : false
      }, () => {
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
        console.log(this.state.editId)
        console.log(this.state.nationality)
        console.log(this.state.validity)
        console.log(this.state.colorB)
        console.log(this.state.colorV)

      })
    }else{
      this.setState({
        showAddEdit: flag,
        addEditText: '编辑预订人',
        addEditId: num,
      }, () => {
        console.log(this.state.showAddEdit)
        console.log(this.state.addEditText)
        console.log(this.state.addEditId)
       

      })
    }
    
       
  } else if (num == 3) {
    this.setState({
        showAddEdit: flag,
        addEditText:'添加预订人',
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
        colorV: false
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
    })
  } else if (num == 4) { //关闭证件类型
    this.setState({
      showCertificates: flag
    },()=>{
      console.log(this.state.showCertificates)
    })
  }else if(num==5){
     this.setState({
       showAddEdit: flag,
     }, () => {
       console.log(this.state.showAddEdit)
     })
  }
  
}
// 选择预订人
checkPersonGroup(t, index) {
    let Id = t.Id
    let IdIndex = this.state.contactId.indexOf(Id)
    let linShiNum=[]
    if(t.Documents.length>0){
      if (t.Documents[0].DocumentNo != '' && t.Name != '') {
        this.state.list[index].IsSelected = !this.state.list[index].IsSelected
        this.setState({
          list: this.state.list
        }, () => {
          console.log(this.state.list, '常用联系人列表')
          this.state.list.map((item,index)=>{
            if(item.IsSelected==true){
              linShiNum.push(item.IsSelected)
            }else{
              linShiNum.splice(index,1)
            }
          })
          this.setState({
            proSonNum:linShiNum.length
          },()=>{
            console.log(this.state.proSonNum)
          })
        })

      } else {
        Taro.showToast({
          title: '请完善乘机人信息',
          icon: 'none',
          mask: true
        })
      }
    } 
}
    // 获取已选乘机人
    _getCkeckTripper() {
      this.state.linShiArr = []
      getVisaCkeckTripper(this.state.flagStr)
        .then(res => {
          console.log(res)
          if (res.Success) {
           this.setState({
              contactArr: res.Result,
            },()=>{
              console.log(this.state.contactArr)
              // this.state.contactArr.map((item, index) => {
              //   if (!item.NeedEdit) {
              //     // linShiArr.push(item)
              //     this.state.linShiArr.push(item)
              //     this.setState({
              //       linShiArr: this.state.linShiArr
              //     }, () => {
              //       console.log(this.state.linShiArr)

              //     })
              //   }
              // })
            })
              
          } else {
            Taro.showToast({
              title: res.Message,
              icon: 'none',
              mask: true
            })
          }
        })
        .catch(err => {
         
        })
    }
 //   确定选择预订人
 sureSelect() {
    let trippersArr = []
    this.state.list.map((c, d) => {
      if (c.IsSelected == true) {
        trippersArr.push(c.Id)
      }
    })
   this.state.contactArr=[]
     saveTrpper(4,this.state.flagStr, trippersArr)
       .then(res => {
         if (res.Success) {
           console.log(res, '保存已选乘机人')
           this.setState({
             showSelect:false,
           },()=>{
             console.log(this.state.showSelect)
              this._getCkeckTripper()
             
           })
         } else {
           Taro.showToast({
             title: res.Message,
             icon: 'none',
             mask: true
           })
         }
       })
       .catch(err => {
        
       })


 }
 // 删除预定人
 delRenMsg(ID) {
   console.log(ID, '删除预订人')
   delTrippers(4, this.state.flagStr, ID)
     .then(res => {
       if (res.Success) {
         console.log(res)
         this._getCkeckTripper()
       } else {
         Taro.showToast({
           title: res.Message,
           icon: 'none',
           mask: true
         })
       }
     })
     .catch(err => {
      
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
  // 显示证件类型
  typeChange(item){
    this.setState({
      showCertificates:true,
      typeText:item.Name
    },()=>{
      console.log(this.state.showCertificates)
      console.log(this.state.typeText)
    })
  }
// // 打开编辑添加弹层
//   gotoAddPassenger(num,item){
//     if(num==1){//打开编辑
//       this.setState({
//         showAddEdit:true,
//         addEditText:'编辑预订人'
//       },()=>{
//         console.log(this.state.showAddEdit)
//         console.log(this.state.addEditText)
//       })
//     } else if (num == 2) {//打开添加
//       this.setState({
//         showAddEdit: true,
//         addEditText: '添加预定人'
//       }, () => {
//         console.log(this.state.showAddEdit)
//         console.log(this.state.addEditText)
//       })
//     }
//   }
  // 有效期
  validityChange = e => {
    this.setState({
      validity: e.detail.value
    },()=>{
      console.log(this.state.validity)
      if (this.state.validity == e.detail.value) {
         this.setState({
           colorV: true,
         }, () => {
           console.log(this.state.colorV)
         })
      }else{
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
  checkSex(item){
    this.setState({
      sexId:item.Id
    },()=>{
      console.log(this.state.sexId)
    })
  }
  checkItem(item){
    if(item.Id=='401'){
      this.setState({
        showHuZhao: false,
        cabinflag: item.Id,
        typeText: item.Name
      }, () => {
        console.log(this.state.showHuZhao)
        console.log(this.state.cabinflag)
        console.log(this.state.typeText)
      })
    }else{
      this.setState({
        cabinflag: item.Id,
        typeText: item.Name,
        showHuZhao: true,
      }, () => {
        console.log(this.state.cabinflag)
        console.log(this.state.typeText)
        console.log(this.state.showHuZhao)

      })
    }
    
    
  }
  saveAddEdit(){
    let telReg = /^[1][1-9][0-9]{9}$/
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (this.state.yuDingRenName=='') {
      Taro.showToast({
        title: '请输入姓名',
        icon: 'none',
        mask: true
      })
    }else if(this.state.yuDingRentel==''){
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
    } 
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
      } else if (this.state.sexId==0) {
        Taro.showToast({
          title: '请选择性别',
          icon: 'none',
          mask: true
        })
      }else{
        let huZhaoObj = [{
          "DocumentTypeId": 402,
          "DocumentNo": `${this.state.passport}`,
          "ExpiredDate": `${this.state.validity}`,
        }]
        let documents = [...huZhaoObj]
        console.log(documents)
        if (this.state.addEditId == 2) {
          //编辑Api
          console.log('编辑Api')
           console.log('编辑')
           let data = {
           
               Id: this.state.editId,
               Name: this.state.yuDingRenName,
               Mobile: this.state.yuDingRentel,
               BirthDate:this.state.birthday,
               Gender: this.state.sexId,
               FirstName: this.state.yuDingRenEName,
               LastName:  this.state.yuDingRenSurname,
               Documents: documents,
               NationalityName:this.state.nationality
           }
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
                 this.showYuDing(2,false)
                 this._getYouKeList()

               }


             })
             .catch(err => {
               if (!err.message) {
                 return
               }

             })
        } else {
          //添加Api
          console.log('添加Api')
          let data = {
          
              Id:0,
              Name: this.state.yuDingRenName,
              Mobile: this.state.yuDingRentel,
              BirthDate: this.state.birthday,
              Gender: this.state.sexId,
              FirstName: this.state.yuDingRenEName,
              LastName: this.state.yuDingRenSurname,
              Documents: documents,
              NationalityName: this.state.nationality
           
          }
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
                this._getYouKeList()

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

  // 获取当前登录人
  _getOninfo(){
    getOninfo()
    .then(res=>{
      if(res.Success){
        this.setState({
          contactsName: res.Result.Name,
          contactsTel:res.Result.Mobile,
        },()=>{
          console.log(this.state.contactsName)
          console.log(this.state.contactsTel)
        })
      }else{
        Taro.showToast({
          title: res.Message,
          icon: 'none',
          mask: true
        })
      }
    })
  }
//  订单详情页
submitOrder(){
  Taro.redirectTo({
    url: `/pages/visa/pages/visaOrderDetail/index?orderNumber=1234`
  })
}
// 生成订单
_getOrder(){
  Taro.showLoading({
    title: '加载中',
    mask: true
  })
  let Passengers = this.state.contactArr
  Passengers = JSON.parse(JSON.stringify(this.state.contactArr).replace(/"Id"/g, '"PassengerId"'));
  Passengers = JSON.parse(JSON.stringify(Passengers).replace(/"documents"/g, '"PassportNo"'));
  console.log(Passengers, 'efev')
  let params={
    BookTypeId:4,
    ProductId: this.state.ID,
      LinkerName: this.state.contactsName,
      LinkerMobile: this.state.contactsTel,
      LiknerEmail: this.state.contactsEmail,
      ProductBook: {
        PriceId: 0,
        AddressInfo: this.state.address,
        Passengers: Passengers,
      }
  }
  getOrder(params)
  .then(res=>{
    if(res.Success){
      Taro.hideLoading()
      this.showOrderDetail(false)
      Taro.navigateTo({
        url: `/pages/visa/pages/visaOrderDetail/index?orderNumber=${res.Result}`
      })
    }else{
      Taro.hideLoading()
      this.showOrderDetail(false)
      Taro.showToast({
        title: res.Message,
        icon: 'none',
        mask: true,
        duration: 3000,
      })
    }
  })
}
  backHome(){
    Taro.switchTab({
      url:'/pages/index/index'
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

  
  render() {
    const {visaReserveObj,contactArr}=this.state
    return (
      <View className='visaReserve'>
          {/* <!-- 顶部模块 --> */}
        <View className="topModel">
          <View className="proImgBox">
            <Image className='proImg' src={visaReserveObj.ImageUrl} />
          </View>
            <View className="rightText">
                <View className='nameH3'>{visaReserveObj.Name}</View>
                {/* <!-- <p>这里写关于签证的介绍这里写关于签证的介绍这里写关于签证的介绍</p> --> */}
                {visaReserveObj.Labels.length>0&&<View className="biaoQian" >
                {visaReserveObj.Labels.map((item,index)=>{
                  return (
                    <View className='labelSpan' key={index}>{item}</View>
                  )
                })}
                  
                </View>}
            </View>
            
        </View>
        <View className="NullBg" ></View>
        {/* 预订人信息 */}
          <View class="reserveRen">
            <View class="box">
            <View className='nameH3'>预定人信息</View>
              {contactArr.length>0&&<View className='reserveRenUl'>
                {contactArr.map((item,index)=>{
                  return(
                    <View className='reserveRenLi' >
                      <View className="wuEdit">
                        <View class="leftText">
                            <View className='nameMsg'>
                              <View className='nameMsgB'>{item.Name}</View>
                              <View className='nameMsgI'>{item.Documents[0].DocumentNo}</View>
                            </View>
                            <View className='postClass'>职业分类：{item.PersonType.Name}</View>
                        </View>
                        <View class="delImg" onClick={this.delRenMsg.bind(this,item.Id)}>
                            <Image className='delIcon' src={delIcon}/>
                        </View>
                    </View>
                        {/* {item.NeedEdit&&<View className="editData" >
                              <View className="tipsMsg">信息不足，请先完善信息</View>
                              <View class="editImg" onClick={this.showYuDing.bind(this,2,true,item)}>
                                    <Image src={edit} />
                                </View>
                            </View>} */}
                    </View>
                  )
                })}
                  
              </View>}
                <View className='shwoYudingRen' onClick={this.showYuDing.bind(this,1,true)}>选择预定人</View>
            </View>

        </View>
        <View className="NullBg" ></View>
        {/* <!-- 联系人信息 --> */}
          <View class="contactsMsg">
              <View class="box">
              <View className='nameH3'>联系人信息</View>
                  <View className='contactsMsgUl'>
                      <View className='contactsMsgLi'>
                          <View className='contactsMsgP'>联系人姓名</View>
                          <AtInput style = 'flex-grow: 1;'
                            name='contactsName'
                            type='text'
                            border={false}
                            placeholder='这里写联系人的姓名'
                            value={this.state.contactsName}
                            onChange={this.nameChange.bind(this)}
                          />
                      </View>
                      <View className='contactsMsgLi'>
                          <View className='contactsMsgP'>联系人电话</View>
                          <AtInput style='flex-grow: 1;'
                            name='contactsTel'
                            border={false}
                            type='tel'
                            placeholder='这里写联系人的手机号码'
                            value={this.state.contactsTel}
                            onChange={this.handleMobileChange.bind(this)}
                          />
                      </View>
                      <View className='contactsMsgLi'>
                          <View className='contactsMsgP'>电子邮箱</View>
                          <AtInput style='flex-grow: 1;'
                            name='email'
                            border={false}
                            type='email'
                            placeholder='这里写联系人的邮箱'
                            value={this.state.contactsEmail}
                            onChange={this.handleEmailChange.bind(this)}
                          />
                      </View>
                  </View>
              </View>
          </View>
          <View className="NullBg" ></View>
          {/* <!-- 签收信息 --> */}
          <View className="deliversMsg">
              <View className="box">
              <View className='nameH3'>签收信息</View>
                  <View className='contactsMsgUl'>
                      <View className='contactsMsgLi'>
                          <View className='contactsMsgP'>签收地址</View>
                          <AtInput style='flex-grow: 1;'
                            name='address'
                            border={false}
                            type='text'
                            placeholder='这里写收货地址'
                            value={this.state.address}
                            onChange={this.handleAddressChange.bind(this)}
                          />
                      </View>
                  </View>
              </View>
          </View>

          {/* 明细弹层 */}
          {showDetail&&<View class="bottomMask" onClick={this.hideDetailFun}></View>}
          {showDetail&&<View className='detailMsgBox'>
                  <View className='nameH4'>{visaReserveObj.Name}</View>
                  <View className='detailMsgBoxUl'>
                      <View className='detailMsgBoxLi'>
                          <View class="itemTitle">
                              <View className='detailMsgBoxP'>签证价格</View>
                              <View className='detailMsgBoxI'></View>
                          </View>
                          <View className="contentText">
                            <View className="leftDetailMsg">
                                <View className='detailMsgBoxSapn'>签证</View>
                                <View className='detailMsgBoxB'>￥{visaReserveObj.StartPrice}X{contactArr.length}</View>
                            </View>
                            {/* <View className="leftDetailMsg">
                                <View className='detailMsgBoxSapn'>儿童签证</View>
                                <View className='detailMsgBoxB'>¥123X2</View>
                            </View> */}
                          </View>
                      </View>
                    </View>
            </View>}

            {/* 订单弹层 */}
            {this.state.isOpened&&<View className='cabinMask'>
            <View className='orderMsgMask'>
              <View className='orderMsgMaskTitle'>
                <View className='at-col' style='text-align: center;'>请核对订单信息</View>
              </View>
              <View className='nameH4' style='text-align: center;'>{visaReserveObj.Name}</View>
                  <View className='detailMsgBoxUl'>
                  <View className='detailMsgBoxLi'>
                          <View class="itemTitle">
                              <View className='detailMsgBoxP'>预订人</View>
                          </View>
                          <View className="contentText">
                          {contactArr.map((item,index)=>{
                            return(
                              <View className="leftDetailMsg">
                                <View className='detailMsgBoxSapn'>
                                  <Text style='margin-right: 20px;'>{item.Name}</Text>
                                  <Text>{item.Documents[0].DocumentNo}</Text>
                                </View>
                            </View>
                            )
                          })}
                          </View>
                      </View>
                      <View className='detailMsgBoxLi'>
                          <View class="itemTitle">
                              <View className='detailMsgBoxP'>签证价格</View>
                          </View>
                          <View className="contentText">
                            <View className="leftDetailMsg">
                                <View className='detailMsgBoxSapn'>签证</View>
                                <View className='detailMsgBoxB'>￥{visaReserveObj.StartPrice}X{contactArr.length}</View>
                            </View>
                            {/* <View className="leftDetailMsg">
                                <View className='detailMsgBoxSapn'>儿童签证</View>
                                <View className='detailMsgBoxB'>¥123X2</View>
                            </View> */}
                          </View>
                      </View>
                    </View>
              <View className='btn-Box'>
                <View className='cancel-Btn' onClick={this.showOrderDetail.bind(this,false)}>取消</View>
                <View  class="add-btn" onClick={this._getOrder.bind(this)}>确定</View>
              </View>
              
            </View>
        </View>}
          <View className='footer'>
            <View class="box">
            <View class="textMsg">
                <View class="leftFoot">
                    <View className='priceB'>￥{visaReserveObj.StartPrice*contactArr.length}</View>
                    <View className='totalPriceSpan'>总价</View>
                </View>
                <View class="rightFoot" onClick={this.showDetailFun.bind(this)}>
                    <View className='mingXiI'>明细</View>
                    <Image className='doenIcon' src={doenIcon} />
                </View>
            </View>
            <View className='showOrder' onClick={this.showOrderDetail.bind(this,true)}>提交订单</View>
            </View>
            
        </View>

          {/* 选择联系人弹层 */}
        {this.state.showSelect&&<View className='cabinMask'>
            <View className='selectReserve'>
            <View className='maskTitle'>
                  <View className='titleText'>选择预订人</View>  
                  <Image className='closeIcon' src={closeIcon} onClick={this.showYuDing.bind(this,1,false)}/>  
            </View>
            <View className='ulBox'>
                {list.map((item,index)=>{
                    return (
                        <View className='liBox'>
                            <View class="msgBox">
                            <View className='leftBox' onClick={this.checkPersonGroup.bind(this,item,index)}>
                                <View class="leftImg"  >
                                
                                {/* <Image src={this.state.checkPersonArr.indexOf(index)<0?rightIcon1:rightIcon} /> */}
                                 <Image src={item.IsSelected==true?rightIcon:rightIcon1} />
                                </View>
                                <View class="midText">
                                    <View className='itemName'>
                                    <Text>{item.Name}</Text>
                                    <Text>{item.Mobile!=null?item.Mobile:''}</Text>
                                     </View>
                                    <View className='itemCard'>证件号码：{item.Documents.length>0&&item.Documents[0].DocumentNo!=''?item.Documents[0].DocumentNo:''}</View>
                                </View>
                                </View>
                                {item.IsDefault==false&&<View class="editImg" onClick={this.showYuDing.bind(this,2,true,item)}>
                                    <Image src={edit} />
                                </View>}
                            </View>
                        </View>
                            )
                            
                        })}
                
            </View>
           <View className='addIcon' onClick={this.showYuDing.bind(this,3,true)}>
                <Image className="addImg"  src={addIcon} />
            </View>
           <View className='footer'>
                <View className='numSelect'>已选择预订人：{this.state.proSonNum}人</View>
                <View  className='sureSelect' onClick={this.sureSelect.bind(this)}>确定</View>
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
                            <Text className='leftText'>护照</Text>
                        
                          {/* <View className="leftHText" onClick={this.typeChange.bind(this)}>
                            <Text className='leftText'>{this.state.typeText}</Text>
                            <View className="imgBox">
                              <Image src={jianTouIcon} />
                            </View>
                          </View> */}
                          <AtInput style = 'flex-grow: 1;'
                              name='yuDingRentel'
                              type='text'
                              border={false}
                              placeholder='请输入护照号'
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
            {this.state.showCertificates&&<View className='cabinMask' style='z-index:600' onClick={this.showYuDing.bind(this,4,false)}>
              <View className="dialog-box" >
                <View className='dialog-h1'>证件类型</View>
                <View className='midContent'>
                {cabinData.map((item, index) => {
                  return (
                    <View className='checkCabin' onClick={this.checkItem.bind(this,item)}>
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