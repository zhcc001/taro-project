import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,Picker,Textarea,Map} from '@tarojs/components'
import { AtSteps,AtTabs, AtTabsPane,AtTextarea,AtModal, AtModalHeader, AtModalContent, AtModalAction,AtToast,AtSearchBar,AtInput} from 'taro-ui'
import {getPayType,getOninfo,getReserveMsg,payOrder,getStaffList,getYouKeList,addPassenger,getCkeckTripper,saveTrpper,getTrippers,delTrippers,addTrippers,getVehicle,getFlightService,getRule,saveVehicle,delVehicle,getCarData} from '../../../../api/common'
import {getSchedule} from '../../../../api/wellForm'
import rightIcon from './images/right.png'
import rightIcon1 from './images/right1.png'
import closeIcon from '../../../../common/carImage/guanBi.png'
import arrow from './images/arrow1.jpg'
import checkBoxIcon from '../../../../common/carImage/login_selectActive.png'
import baoCheCheckIcon from '../../../../common/carImage/zhengque.png'
import jiesongjiIcon from '../../../../common/carImage/jiejifuwu.png'
import carDel from '../../../../common/carImage/shanchu-2.png'
import doenIcon from '../../../../common/carImage/doen.png'
import feiJiIcon from '../../../../common/carImage/feiji.png'
import xiaoRenIcon from '../../../../common/carImage/renyuan-2.png'
import diDianIcon from '../../../../common/carImage/didian.png'
import shiJianIcon from '../../../../common/carImage/shijian-2.png'
import carIcon from '../../../../common/carImage/chexing.png'
import shuLiangIcon from '../../../../common/carImage/shuliang.png'
import chengKeNum from '../../../../common/carImage/chengkeNum.png'
import xingLiIcon from '../../../../common/carImage/hangliNum.png'
import carTypeIcon from '../../../../common/carImage/carType.png'
import jianIcon from '../../../../common/carImage/jian.png'
import jiaIcon from '../../../../common/carImage/tianjia-3.png'
import souSuoIcon from '../../../../common/image/sousuo.png'
import dingWeiIconC from '../../../../common/image/dingwei.png'
import dingweiIcon from '../../../../common/carImage/dingwei.png'
import jianTouIcon from '../../../../common/image/rightJiantou.png'
import backIcon from '../../../../common/image/backHome.png'
import xiaJianTouIcon from '../../../../common/carImage/xiaJiantou.png'
import {shareTitle,mapKey} from '../../../../api/commonVariable'
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');
import './index.scss'
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: mapKey // 必填
});
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '公出单预订信息'
  }

  constructor(){
    super(...arguments)
    this.state={
        current: 2,
        tablecurrent:2,
        contactArrId:[],//出行人Id
        contactArr:[],
        payData:[],
        geRenPay:{Id: "0", Name: "个人支付"},
        cabinflag:0,
        payDataflag:0,
        RemarksValue: '',
        isOpened:false,
        orderObj:{},
        PayTypeId:1,
        PayTypeText:'',
        orderNumber:'',
        startCityName:'',
        endCityName:'',
        showLoading:false,
        keyWord: '',
        list:[],
        showTextarea:true,
        flagStr:'',
        showCheck:false,
        chaBiaoFlag:false,
        tongXingData:[],
        wellFormID:'',
        // 包车拼车
        ruleContent:'',//包车拼车规则
        showBaoChe:false,
        baoCheTableFlag: 10001,
        diDianType:'',//地点类型
        diDianValue:'请选择目的地',//送机出发地
        diDianSValue:'请选择出发地',//接机目的地
        diDianValueFlag:false,//送机地点flag
        diDianSValueFlag: false, //接机地点flag
        colorV:false,
        colorSV:false,
        timeChuFa: '请选择上车时间',
        timeSChuFa: '请选择上车时间',
        cheXingType:'',//接送机选择车型
        cheXingValue:{Id:'',Name:'请选择车型'},
        cheXingSValue:{Id:'',Name:'请选择车型'},
        cheXingValueFlag:false,
        cheXingSValueFlag:false,
        shuLiangValue:1,
        shuLiangSValue:1,
        showItem:true,
        showItemS:true,
        showGuiZe:false,
        dataList: [],
        colorCar:false,
        colorCarS: false,
        carType:'请选择用车类型',
        carTypeS: '请选择用车类型',
        carTypeId:'',//接机用车类型ID
        carTypeIdS:'',//送机用车类型ID
        timeData:[],
        timeSData: [],//送机时间数组
        showDetail: false,
        vehicleTypeData: [{
            "Catalog": {
              "Id": 10001,
              "Name": "经济型"
            },
            "Items": [{
                "Id": 100001,
                "Name": "超级舒适商务车",
                "ImageUrl": "",
                "SeatInfo": "",
                "LuggageInfo": "",
                "Labels": ["免费取消", "舒适"],
                "Price": 500,
                "IsFixedPrice": true,
                "PriceInfo": ""
              },
              {
                "Id": 100002,
                "Name": "超级舒适商务车2",
                "ImageUrl": "",
                "SeatInfo": "",
                "LuggageInfo": "",
                "Labels": ["免费取消", "舒适"],
                "Price": 500,
                "IsFixedPrice": true,
                "PriceInfo": ""
              }
            ]
          },
          {
            "Catalog": {
              "Id": 10002,
              "Name": "豪华型"
            },
            "Items": [{
                "Id": 100003,
                "Name": "超级舒适商务车3",
                "ImageUrl": "",
                "SeatInfo": "",
                "LuggageInfo": "",
                "Labels": ["免费取消", "舒适"],
                "Price": 500,
                "IsFixedPrice": true,
                "PriceInfo": ""
              },
              {
                "Id": 100004,
                "Name": "超级舒适商务车4",
                "ImageUrl": "",
                "SeatInfo": "",
                "LuggageInfo": "",
                "Labels": ["免费取消", "舒适"],
                "Price": 500,
                "IsFixedPrice": true,
                "PriceInfo": ""
              }
            ]
          }
        ],
        vehicleTypeList:[],
        vehicleType:false,
        diDianText:'选择地点',
        showDiDian:false,
        diDianKeyWord:'',
        showCancel:false,
        // 接机经纬度
        latitude:'',
        longitude:'',
        //送机经纬度
        lat:'',
        lon:'',
        markers:[],
        carData: [{
            "Catalog": {
              "Id": 10001,
              "Name": "经济型"
            },
            "Items": [{
                "Id": 100001,
                "Name": "超级舒适商务车",
                "ImageUrl": "",
                "SeatInfo": "乘客X4",
                "LuggageInfo": "行李X2",
                "Labels": ["免费取消", "舒适"],
                "Price": 500,
                "IsFixedPrice": true,
                "PriceInfo": "",
                "IsSelected": false
              },
              {
                "Id": 100002,
                "Name": "超级舒适商务车2",
                "ImageUrl": "",
                "SeatInfo": "乘客X4",
                "LuggageInfo": "行李X2",
                "Labels": ["免费取消", "舒适"],
                "Price": 500,
                "IsFixedPrice": true,
                "PriceInfo": "",
                "IsSelected": false
              }
            ]
          },
          {
            "Catalog": {
              "Id": 10002,
              "Name": "豪华型"
            },
            "Items": [{
                "Id": 100003,
                "Name": "超级舒适商务车3",
                "ImageUrl": "",
                "SeatInfo": "",
                "LuggageInfo": "",
                "Labels": ["免费取消", "舒适"],
                "Price": 500,
                "IsFixedPrice": true,
                "PriceInfo": "",
                "IsSelected": false
              },
              {
                "Id": 100004,
                "Name": "超级舒适商务车4",
                "ImageUrl": "",
                "SeatInfo": "",
                "LuggageInfo": "",
                "Labels": ["免费取消", "舒适"],
                "Price": 500,
                "IsFixedPrice": true,
                "PriceInfo": "",
                "IsSelected": false
              }
            ]
          }
        ],
        selecCarFlag:'',
        dataObj: {},
        PickupFlag:false,
        SendingFlag:false,
        addressList:[],
        shangCheAddress:{},
        AddressSending:{},
        AddressPickUp:{},
        checkedDataObj:{},
        scrollFlag:true,
        sendingTime:'',
        pickUpTime:'',
        dingWeiName:'',
        baoCheSPrice:'',//送机的包车价格
        baoChePrice:'',//接机的包车价格
        pinCheTime:false,
        pinCheSTime: false,
        baoXianData:[{
          Id:1,
          Name:'航空延误险',
          detail:'飞机意外延误双保障，最高赔付¥890',
          price:'40',
          flag:false,
        },{
          Id:2,
          Name:'航空意外险',
          detail: '飞机意外延误双保障，最高赔付¥890',
          price:'40',
          flag: false,
        },{
          Id:3,
          Name:'航空退票险',
          detail: '飞机意外延误双保障，最高赔付¥890',
          price:'40',
          flag: false,
        }],
        showBaoXianFlag:false,
        // {
        //   Id: "10021",
        //   Name: "拼车"
        // }, {
        //   Id: "10022",
        //   Name: "包车"
        // }
    }
  }

  componentWillMount () { 
    this._getRule()
    this.state.wellFormID = this.$router.params.wellFormID
    // 时间戳
    // ----------------------------
    this.getFlagTime()
    this.state.startCityName=JSON.parse(Taro.getStorageSync('startCityObj')).Name
    this.state.endCityName=JSON.parse(Taro.getStorageSync('endCityObj')).Name
    this.state.dingWeiName = Taro.getStorageSync('dingWeiName')
     this.state.orderObj=JSON.parse(Taro.getStorageSync('orederMsg'))
     console.log(this.state.contactArr,'this.state.contactArr')
    this._weiXingetLoction()
     
  }
  componentDidMount () {
    this._getPayType(this.state.tablecurrent)
    this._getSchedule()
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
    this.timeFun()
    this.timeSFun()
    this.getLngLat()
    this._getFlightService()
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
// 定位
   _weiXingetLoction() {
     Taro.getLocation({
       type: 'wgs84',

     }).then(res => {
       this.setState({
         latitude: res.latitude,
         longitude: res.longitude
       }, () => {
         console.log(this.state.latitude, this.state.longitude)
       })
     })
   }
// 时间戳
  getFlagTime(){
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
      },()=>{
        console.log(this.state.flagStr)
      })
    }

// 获取支付方式
  _getPayType(BookTypeId) {
      console.log('zhixingl')
      getPayType(BookTypeId)
        .then(res => {
          console.log(res)
          if (res.Success) {
            this.setState({
              payData: res.Result.PayType,
              PayTypeId: res.Result.PayType[0].Id,
              PayTypeText: res.Result.PayType[0].Name
            }, () => {
              console.log(this.state.payData)
            })
            console.log('执行了吗')
            // Taro.setStorageSync('payData', JSON.stringify(res.Result.PayType))

          }
        })
        .catch(err => {
          if (!err.message) {
            return
          }
        })
      }
    
  

  
// 计算周几
  getweekFun(checkTime){
    // console.log(checkTime,'调用周')
    let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        let dateStr = checkTime;
        let myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        this.setState({
          weekDayText:weekDay[myDate.getDay()]
        })
        console.log(weekDay[myDate.getDay()])

  }
// 获取出行人
  _getSchedule(){
   Taro.showLoading({
     title: '加载中',
     mask: true
   })
    getSchedule(this.state.wellFormID, this.state.orderObj.flightId, this.state.orderObj.Datatime, this.state.orderObj.CabinClassId, this.state.orderObj.Discount, this.state.orderObj.TicketPrice)
    .then(res=>{
     
      if(res.Success){
         res.Result.Staffs.map((item, index) => {
           item.showCheck = false
         })
        this.setState({
          tongXingData: res.Result.Staffs
        },()=>{
          console.log(this.state.tongXingData, 'this.state.tongXingData')
        Taro.hideLoading()
          
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
    })
  }
// 出行人选择
  checkTongXing(item, index) {
    
    this.state.tongXingData[index].showCheck = !this.state.tongXingData[index].showCheck
    this.setState({
      tongXingData: this.state.tongXingData
    }, () => {
      console.log(this.state.tongXingData)
        let indexId = this.state.contactArrId.indexOf(item.Id)
      if (this.state.tongXingData[index].showCheck == true) {
        if(indexId<0){
          this.state.contactArrId.push(this.state.tongXingData[index].Id)
          this.setState({
            contactArrId: this.state.contactArrId
          }, () => {
            console.log(this.state.contactArrId)
            this._getVehicle()
          })
        }else{
          
        }
      } else {
        console.log(index,'indexindex')
        this.state.contactArrId.splice(indexId, 1)
        this.setState({
          contactArrId: this.state.contactArrId
        }, () => {
          console.log(this.state.contactArrId)
          this._getVehicle()
        })
      }
    })
    
  }
// 备注
  handleChange (event) {
    this.setState({
      RemarksValue: event.target.value
    },()=>{
      console.log(this.state.RemarksValue)
    })
  }
// 显示订单弹层
  showMask(){
    this.state.contactArr=[]
    let flagArr=[]
    this.state.tongXingData.map((c, d) => {
      if (c.showCheck == true) {
        this.state.contactArr.push(c)
        this.setState({
          contactArr: this.state.contactArr,
        },()=>{
          console.log(this.state.contactArr)
        })
      }
      if(c.MatchLevel==false){
        flagArr.push(c.MatchLevel)
      }
      
    })
    if (flagArr.length>0&& this.state.RemarksValue == '') {
      Taro.showToast({
        title: '已超标,请备注超标原因',
        icon: 'none',
        mask: true,
        duration:3000
      })
      return
    }
    if (this.state.orderObj.QuantityInfo != '' && this.state.contactArrId.length > parseInt(this.state.orderObj.QuantityInfo)) {
      Taro.showToast({
        title: `余票不足,剩${this.state.orderObj.QuantityInfo}张`,
        icon: 'none',
        mask: true,
        duration: 3000
      })
      return
    }
    if (this.state.contactArrId == 0) {
      console.log('请选择出行人')
      Taro.showToast({
        title: '请选择出行人',
        icon: 'none',
        mask: true
      })
    } else {
      this.setState({
        isOpened: true,
        showTextarea: false,
      }, () => {
        console.log(this.state.showTextarea)
        console.log(this.state.isOpened)
      })
    }
    }
// 关闭订单弹层
  handleCloseMask(){
    this.setState({
      isOpened:false,
      showTextarea: true,
    },()=>{
      console.log(this.state.showTextarea)
      console.log(this.state.isOpened)
    })
  }

// ----------------
// 明细的显示隐藏
  showDetailFun() {
    this.setState({
      showDetail:!this.state.showDetail,
      
    },()=>{
      console.log(this.state.showDetail)
      console.log(this.state.showTextarea)
      if(this.state.showTextarea==true){
        this.setState({
          showTextarea: false
        },()=>{
          console.log(this.state.showTextarea)
        })
      }else{
          this.setState({
            showTextarea: true
          }, () => {
            console.log(this.state.showTextarea)
          })
      }
    })
  }
  hideDetailFun() {
    this.setState({
      showDetail: false,
      showTextarea:true,
    }, () => {
      console.log(this.state.showDetail)
      console.log(this.state.showTextarea)
    })
  }

//------------------ ----------------------------接送机---------------------------------------
// 获取拼车包车规则
  _getRule(){
    getRule()
    .then(res=>{
      if(res.Success){
        this.setState({
          ruleContent:res.Result
        },()=>{
          console.log(this.state.ruleContent)
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
// 获取服务入口
  _getFlightService() {
    getFlightService(this.state.orderObj.flightId)
    .then(res=>{
      if(res.Success){
        this.setState({
          dataList:res.Result
        },()=>{
          console.log(this.state.dataList)
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

// 显示服务弹层
  checkFuWu(item){
     this.state.contactArr = []
     this.state.tongXingData.map((c, d) => {
       if (c.showCheck == true) {
         this.state.contactArr.push(c)
         this.setState({
           contactArr: this.state.contactArr,
         }, () => {
           console.log(this.state.contactArr)
         })
       }
     })
    if(item.Id=='108'){
      if(Taro.getStorageSync('ruleFlag')){
        this._getVehicle()
       this.setState({
         showBaoChe: true,
         showTextarea: false,
       }, () => {
         console.log(this.state.showBaoChe)
         console.log(this.state.showTextarea)
         
       })
      }else{
        this.setState({
          showGuiZe:true,
          showTextarea: false
        },()=>{
          console.log(this.state.showGuiZe)
          console.log(this.state.showTextarea)
        })
      }
      
    }
  }
// 关闭接送机弹层
  hideJieSong(){
    this.setState({
      showBaoChe:false,
      showTextarea: true
    },()=>{
      console.log(this.state.showBaoChe)
      console.log(this.state.showTextarea)
    })
  }
// 规则弹层关闭
  ruleHide(){
    this.setState({
      showGuiZe:false,
      showTextarea: true
    },()=>{
      console.log(this.state.showGuiZe)
      console.log(this.state.showTextarea)
    })
  }
  ruleAgree() {
    Taro.setStorageSync('ruleFlag',1)
    this.setState({
      showGuiZe: false,
      showBaoChe: true,
      showTextarea: false
    }, () => {
      console.log(this.state.showGuiZe)
      console.log(this.state.showBaoChe)
      console.log(this.state.showTextarea)
      this._getVehicle()
    })
  }
// 选择送机服务
  selectSFuWu(){
    this.state.SendingFlag = !this.state.SendingFlag
    this.setState({
      SendingFlag: this.state.SendingFlag
    },()=>{
      console.log(this.state.SendingFlag)
    })
  }
// 选择接机服务
  selectFuWu(){
    this.state.PickupFlag = !this.state.PickupFlag
    this.setState({
      PickupFlag: this.state.PickupFlag
    }, () => {
      console.log(this.state.PickupFlag)
    })
  }
// 选择接机用车类型
    carTypeChange = e => {
      console.log(e,'原因原因')
      this.setState({
        carType: this.state.dataObj.Pickup.Types[e.detail.value].Name,
        carTypeId: this.state.dataObj.Pickup.Types[e.detail.value].Id,
      }, () => {
        console.log(this.state.carType)
        console.log(this.state.carTypeId)
        if (this.state.carType == this.state.dataObj.Pickup.Types[e.detail.value].Name) {
          this.setState({
            colorCar: true,
            PickupFlag: true,
          }, () => {
            console.log(this.state.colorCar)
            console.log(this.state.PickupFlag)
          })
        } else {
          this.setState({
            colorCar: false,
          }, () => {
            console.log(this.state.colorCar)
          })
        }
        

      })
      if (this.state.dataObj.Pickup.Types[e.detail.value].Id == 10021) {
        this.setState({
          showItem: false,
        }, () => {
          console.log(this.state.showItem)
        })
      } else {
        this.setState({
          showItem: true,
        }, () => {
          console.log(this.state.showItem)
        })
      }
    }
// 选择送机用车类型
    carTypeSChange = e => {
      console.log(e,'原因原因')
      this.setState({
        carTypeS: this.state.dataObj.Sending.Types[e.detail.value].Name,
        carTypeSId: this.state.dataObj.Sending.Types[e.detail.value].Id,
      }, () => {
        console.log(this.state.carTypeS)
        console.log(this.state.carTypeSId)
        if (this.state.carTypeS == this.state.dataObj.Sending.Types[e.detail.value].Name) {
          this.setState({
            colorCarS: true,
            SendingFlag:true
          }, () => {
            console.log(this.state.colorCarS)
            console.log(this.state.SendingFlag)
          })
        } else {
          this.setState({
            colorCarS: false,
          }, () => {
            console.log(this.state.colorCarS)
          })
        }
        

      })
      if (this.state.dataObj.Sending.Types[e.detail.value].Id == 10021) {
        this.setState({
          showItemS: false,
        }, () => {
          console.log(this.state.showItemS)
        })
      } else {
        this.setState({
          showItemS: true,
        }, () => {
          console.log(this.state.showItemS)
        })
      }
    }
// 选择时间
  //接机时间Arr
    timeFun(){
      this.state.timeData=[]
      let hourArr = []
      let minArr = []
      let i = 1
      let m = 0
      for (i = 1; i < 25; i++) {
          if (i < 10) {
            i = `0${i}`
          }
        hourArr.push(`${i}`)
      }
      // console.log(hourArr, '小时数组')
      for (m = 0; m < 60; m++) {
        if (m < 10) {
          m = `0${m}`
        }
        minArr.push(`${m}`)
      }
      // console.log(minArr, '分钟数组')
      let DatatimeAtr = this.state.orderObj.d2
      let datt = `${DatatimeAtr}`.split('-'); //这边给定一个特定时间
      let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let riQiArr = []
      let dayArr = [-3, -2, -1, 0, 1, 2, 3]
      dayArr.map((item) => {
        console.log(item)
        let newDate = new Date(datt[0], datt[1] - 1, datt[2]);
        let befminuts = newDate.getTime() + 1000 * 60 * 60 * 24 * parseInt(item); //计算前几天用减，计算后几天用加，最后一个就是多少天的数量
        let beforeDat = new Date;
        beforeDat.setTime(befminuts);
        let befMonth = beforeDat.getMonth() + 1;
        let mon = befMonth >= 10 ? befMonth : '0' + befMonth;
        let befDate = beforeDat.getDate();
        let da = befDate >= 10 ? befDate : '0' + befDate;
        let newDateTime = beforeDat.getFullYear() + '-' + mon + '-' + da;
        // let dateStr = newDate;
        let myDate = new Date(Date.parse(newDateTime.replace(/-/g, "/")));
        let riQiStr = newDateTime + '' + weekDay[myDate.getDay()]
            riQiStr = riQiStr.substring(5)
        riQiArr.push(riQiStr)
      })
      console.log(riQiArr)
      this.state.timeData.push(riQiArr,hourArr,minArr)
      this.setState({
        timeData:this.state.timeData
      },()=>{
        console.log(this.state.timeData,'接机时间')
      })
    }
  //送机时间Arr
    timeSFun(){
      this.state.timeSData=[]
      let hourArr = []
      let minArr = []
      let i = 1
      let m = 0
      for (i = 1; i < 25; i++) {
          if (i < 10) {
            i = `0${i}`
          }
        hourArr.push(`${i}`)
      }
      // console.log(hourArr, '小时数组')
      for (m = 0; m < 60; m++) {
        if (m < 10) {
          m = `0${m}`
        }
        minArr.push(`${m}`)
      }
      // console.log(minArr, '分钟数组')
      let DatatimeAtr = this.state.orderObj.d1
      let datt = `${DatatimeAtr}`.split('-'); //这边给定一个特定时间
      let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let riQiArr = []
      let dayArr = [-3, -2, -1, 0, 1, 2, 3]
      dayArr.map((item) => {
        console.log(item)
        let newSDate = new Date(datt[0], datt[1] - 1, datt[2]);
        let befminuts = newSDate.getTime() + 1000 * 60 * 60 * 24 * parseInt(item); //计算前几天用减，计算后几天用加，最后一个就是多少天的数量
        let beforeDat = new Date;
        beforeDat.setTime(befminuts);
        let befMonth = beforeDat.getMonth() + 1;
        let mon = befMonth >= 10 ? befMonth : '0' + befMonth;
        let befDate = beforeDat.getDate();
        let da = befDate >= 10 ? befDate : '0' + befDate;
        let newSDateTime = beforeDat.getFullYear() + '-' + mon + '-' + da;
        // let dateStr = newDate;
        let myDate = new Date(Date.parse(newSDateTime.replace(/-/g, "/")));
        console.log(weekDay[myDate.getDay()])
        console.log(newSDateTime)
        let riQiStr = newSDateTime + '' + '(' + weekDay[myDate.getDay()] + ')'
        riQiStr = riQiStr.substring(5)
        riQiArr.push(riQiStr)
      })
      console.log(riQiArr)
      this.state.timeSData.push(riQiArr,hourArr,minArr)
      this.setState({
        timeSData:this.state.timeSData
      },()=>{
        console.log(this.state.timeSData,'时间列表')
      })
    }                   
  //接机时间选择
    onTimeChange = e => {
      console.log(e,'多列选择器')
      let yaerStr = this.state.timeData[0][e.detail.value[0]]
      let hourStr = this.state.timeData[1][e.detail.value[1]]
      let minStr = this.state.timeData[2][e.detail.value[2]]
      let timeStr = `${hourStr}:${minStr} ${yaerStr}`
      let saveTime = `${hourStr}:${minStr} ${yaerStr}`
      this.setState({ 
        timeChuFa: timeStr,
        pickUpTime:saveTime
      },()=>{
        console.log(this.state.timeChuFa)
        console.log(this.state.pickUpTime)
        if(this.state.timeChuFa!='请选择上车时间'){
          this.setState({
            colorV:true,
          },()=>{
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
  //送机时间选择
    onTimeSChange = e => {
      console.log(e,'多列选择器')
      let yaerStr = this.state.timeSData[0][e.detail.value[0]]
      let hourStr = this.state.timeSData[1][e.detail.value[1]]
      let minStr = this.state.timeSData[2][e.detail.value[2]]
      let timeStr = `${hourStr}:${minStr} ${yaerStr}`
      let saveTime = `${hourStr}:${minStr} ${yaerStr}`
      this.setState({
        timeSChuFa: timeStr,
        sendingTime: saveTime,
      },()=>{
        console.log(this.state.timeSChuFa)
        console.log(this.state.sendingTime)
        if(this.state.timeSChuFa!='请选择上车时间'){
          this.setState({
            colorSV:true,
          },()=>{
            console.log(this.state.colorSV)
          })
        }else{
          this.setState({
            colorSV: false,
          }, () => {
            console.log(this.state.colorSV)
          })
        }
      })
    }
// 显示车型弹层
  showVehicleType(str,num){
    this.setState({
      vehicleType:true,
      cheXingType:str,
      vehicleTypeData: [],
      vehicleTypeList: [],
      baoCheTableFlag: '',
    },()=>{
      console.log(this.state.vehicleType)
      console.log(this.state.cheXingType,this.state.vehicleTypeData,this.state.vehicleTypeList,this.state.baoCheTableFlag)
      this._getCarData(num)
    })
  }

  hideVehicleType() {
    this.setState({
      vehicleType: false,
      cheXingType:''
    }, () => {
      console.log(this.state.vehicleType)
      console.log(this.state.cheXingType)
    })
  }
// 获取车辆数据
  _getCarData(num){
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    console.log(this.state.selecCarFlag,'已选车辆')
    this.state.vehicleTypeList=[]
    getCarData(num,this.state.orderObj.flightId)
    .then(res=>{
      if(res.Success){
        Taro.hideLoading()
        console.log(res,'车辆数据')
        this.setState({
          vehicleTypeData:res.Result,
          vehicleTypeList: res.Result[0].Items,
          baoCheTableFlag:res.Result[0].Catalog.Id,
          
        },()=>{
          console.log(this.state.vehicleTypeData,this.state.vehicleTypeList,this.state.baoCheTableFlag)
          if(num==1001){
            this.setState({
              selecCarFlag: this.state.cheXingSValue.Id
            },()=>{
              console.log(this.state.selecCarFlag)
            })
          }else{
            this.setState({
              selecCarFlag: this.state.cheXingValue.Id
            }, () => {
              console.log(this.state.selecCarFlag)
            })
          }
        })
      }else{

      }
    })
  }
// 选择经济型
    checkCarType(item,index){
      this.state.vehicleTypeList=[]
      this.setState({
        baoCheTableFlag: item.Catalog.Id,
        vehicleTypeList: this.state.vehicleTypeData[index].Items
      },()=>{
        console.log(this.state.baoCheTableFlag)
        console.log(this.state.vehicleTypeList)
      })
    }
// 选择车型
    selecCar(item){
      if (this.state.cheXingType=='sending') {
        this.setState({
          selecCarFlag: item.Id,
          cheXingSValue: item,
          vehicleType: false,
          cheXingSValueFlag:true,
          baoCheSPrice:item.Price
        }, () => {
          console.log(this.state.selecCarFlag)
          console.log(this.state.cheXingSValue)
          console.log(this.state.vehicleType)
          console.log(this.state.cheXingSValueFlag,this.state.baoCheSPrice)
        })
      }else{
        if (this.state.cheXingType == 'pickUp') {
          this.setState({
            selecCarFlag: item.Id,
            cheXingValue: item,
            vehicleType: false,
            cheXingValueFlag: true,
            baoChePrice: item.Price
          }, () => {
            console.log(this.state.selecCarFlag)
            console.log(this.state.cheXingValue)
            console.log(this.state.vehicleType)
            console.log(this.state.cheXingValueFlag, this.state.baoChePrice)
          })
        }
      }
      
    }
// 获取已选接送机信息
  _getVehicle(){
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    getVehicle(this.state.orderObj.flightId,this.state.tablecurrent, this.state.flagStr)
    .then(res=>{
      if(res.Success){
        Taro.hideLoading()
         this.setState({
           checkedDataObj: res.Result,
           dataObj: res.Result
         }, () => {
           console.log(this.state.checkedDataObj)
           console.log(this.state.dataObj)
           // 送机为null清空数据
           if (res.Result.Sending.Selected == null) {
             this.setState({
               carTypeS: '请选择用车类型',
               colorCarS: false,
               diDianSValue: '请选择出发地',
               diDianSValueFlag: false,
               timeSChuFa: '请选择上车时间',
               colorSV: false,
               cheXingSValue: {
                 Id: '',
                 Name: '请选择车型'
               },
               cheXingSValueFlag: false,
               shuLiangSValue: 1,
               SendingFlag:false,
             }, () => {
               console.log(this.state.carTypeS, this.state.colorCarS, this.state.diDianSValue, this.state.diDianSValueFlag, this.state.timeSChuFa, this.state.colorSV, this.state.cheXingSValue, this.state.cheXingSValueFlag, this.state.shuLiangSValue, this.state.SendingFlag)
             })
           }else{
             if (res.Result.Sending.Selected.Type.Id=='10021') {
               this.setState({
                 pinCheSTime:true,
                 baoCheSPrice: res.Result.Sending.PoolPrice*this.state.contactArrId.length
               },()=>{
                 console.log(this.state.pinCheSTime,this.state.baoCheSPrice)
               })
             }else{
                this.setState({
                  pinCheSTime: false,
                  baoCheSPrice: res.Result.Sending.Selected.Product.Price * this.state.shuLiangSValue
                }, () => {
                  console.log(this.state.pinCheSTime,this.state.baoCheSPrice)
                })
             }
           }
           // 接机为null清空数据
           if (res.Result.Pickup.Selected == null) {
             this.setState({
               carType: '请选择用车类型',
               colorCar: false,
               diDianValue: '请选择目的地',
               diDianValueFlag: false,
               timeChuFa: '请选择上车时间',
               colorV: false,
               cheXingValue: {
                 Id: '',
                 Name: '请选择车型'
               },
               cheXingValueFlag: false,
               shuLiangValue: 1,
               PickupFlag:false,
             }, () => {
               console.log(this.state.carType, this.state.colorCar, this.state.diDianValue, this.state.diDianValueFlag, this.state.timeChuFa, this.state.colorV, this.state.cheXingValue, this.state.cheXingValueFlag, this.state.shuLiangValue, this.state.PickupFlag)
             })
           }else{
              if (res.Result.Pickup.Selected.Type.Id == '10021') {
                this.setState({
                  pinCheTime: true,
                  baoChePrice: res.Result.Pickup.PoolPrice*this.state.contactArrId.length
                }, () => {
                  console.log(this.state.pinCheTime,this.state.baoChePrice)
                })
              } else {
                this.setState({
                  pinCheTime: false,
                  baoChePrice: res.Result.Pickup.Selected.Product.Price * this.state.shuLiangValue
                }, () => {
                  console.log(this.state.pinCheTime,this.state.baoChePrice)
                })
              }
           }
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

// 显示地点弹层
  showDiDianFun(str){
    if (str == 'sending') {
      if (this.state.startCityName != this.state.dingWeiName) {
        console.log('出发地定位点不一致')
        this.setState({
            showDiDian: true,
            diDianType: str,
            diDianKeyWord: '',
            scrollFlag: false,
            showCancel: true,
            addressList: [],
            shangCheAddress:{}
        }, () => {
          console.log(this.state.showDiDian)
          console.log(this.state.diDianType)
          console.log(this.state.diDianKeyWord)
          console.log(this.state.scrollFlag)
          console.log(this.state.showCancel)
          console.log(this.state.addressList,this.state.shangCheAddress)
        })
        var that = this
        qqmapsdk.getSuggestion({
          keyword: that.state.startCityName,
          region: that.state.startCityName,
          region_fix: 1,
          policy: 0,
          get_subpois: 1,
          success: function (res) {
            that.setState({
              addressList: res.data,
              shangCheAddress:res.data[0]
            }, () => {
              console.log(that.state.addressList, that.state.shangCheAddress)
            })

          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      }else{
        console.log('出发地定位点一致')
        this.setState({
          showDiDian: true,
          diDianType: str,
          diDianKeyWord: '',
          scrollFlag: false,
          showCancel: false,
          addressList: [],
          shangCheAddress:{}
        }, () => {
          console.log(this.state.showDiDian)
          console.log(this.state.diDianType)
          console.log(this.state.diDianKeyWord)
          console.log(this.state.scrollFlag)
          console.log(this.state.showCancel)
          console.log(this.state.addressList,this.state.shangCheAddress)
          
        })
        Taro.getLocation({
          type: 'wgs84',
        }).then(res => {
          this.setState({
            latitude: res.latitude,
            longitude: res.longitude
          }, () => {
            console.log(this.state.markers,this.state.latitude, this.state.longitude)
            this.getPoiList()
          })
        })
        
      }
      
    } else if (str == 'pickUp') {
      this.setState({
        showDiDian: true,
        diDianType: str,
        diDianKeyWord: '',
        scrollFlag: false,
        showCancel: true,
        addressList: [],
        shangCheAddress:{}
      }, () => {
        console.log(this.state.showDiDian)
        console.log(this.state.diDianType)
        console.log(this.state.diDianKeyWord)
        console.log(this.state.scrollFlag)
        console.log(this.state.showCancel)
        console.log(this.state.addressList,this.state.shangCheAddress)
        var that = this
        qqmapsdk.getSuggestion({
          keyword: that.state.endCityName,
          region: that.state.endCityName,
          region_fix: 1,
          policy: 0,
          get_subpois: 1,
          success: function (res) {
            that.setState({
              addressList: res.data,
              shangCheAddress:res.data[0]
            }, () => {
              console.log(that.state.addressList, that.state.shangCheAddress)
            })

          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      })
    }
    
  }
// 关闭地点弹层
  hideDiDian(){
    this.setState({
      showDiDian:false,
      scrollFlag: true,
    },()=>{
      console.log(this.state.showDiDian)
      console.log(this.state.scrollFlag)
    })
  }
// 地址关键字搜索
  onDiDianChange(value) {
    this.setState({
      diDianKeyWord: value,
    }, () => {
      console.log(this.state.diDianKeyWord)
      let region=''
      if (this.state.diDianType == 'sending') {
        this.state.addressList = []
        this.state.shangCheAddress={}
        var that=this
          qqmapsdk.getSuggestion({
            keyword: that.state.diDianKeyWord,
            region: that.state.startCityName,
            region_fix:1,
            policy:0,
            get_subpois:1,
            success: function (res) {
                that.setState({
                  addressList: res.data,
                  shangCheAddress:res.data[0]
                }, () => {
                  console.log(that.state.addressList,that.state.shangCheAddress)
                })

              },
              fail: function (res) {
                console.log(res);
              },
              complete: function (res) {
                console.log(res);
              }
          })
      } else if (this.state.diDianType == 'pickUp') {
        this.state.addressList = []
        this.state.shangCheAddress={}
        var that = this
        qqmapsdk.getSuggestion({
          keyword: that.state.diDianKeyWord,
          region: that.state.endCityName,
          region_fix: 1,
          policy: 0,
          get_subpois: 1,

          success: function (res) {
            that.setState({
              addressList: res.data,
              shangCheAddress:res.data[0]
            }, () => {
              console.log(that.state.addressList,that.state.shangCheAddress)
            })

          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      }
    })
  
  
  }
// 显示地点列表
  showDiDianList(){
    this.setState({
      showCancel:true,
    },()=>{
      console.log(this.state.showCancel)
      if (this.state.diDianType == 'sending') {
        this.state.addressList = []
        this.state.shangCheAddress={}
        if (this.state.startCityName != this.state.dingWeiName) {
          var that = this
          qqmapsdk.getSuggestion({
            keyword: that.state.startCityName,
            region: that.state.startCityName,
            region_fix: 1,
            policy: 0,
            get_subpois: 1,
            success: function (res) {
              that.setState({
                addressList: res.data,
                shangCheAddress:res.data[0]
              }, () => {
                console.log(that.state.addressList,that.state.shangCheAddress)
              })

            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log(res);
            }
          })
        } 
      }
      
    })
  }
  hideDingWeiList(){
    this.setState({
      showCancel: false,
      diDianKeyWord: ''
    }, () => {
      console.log(this.state.showCancel)
      console.log(this.state.diDianKeyWord)
    })
  }

// 包车数量
  // 接机包车数量
    numChange(num){
      if(num==1){
        if (this.state.shuLiangValue > 8) {
          Taro.showToast({
            title:'包车数量超过上限',
            icon: 'none',
            mask: true
          })
        }else{
          this.state.shuLiangValue++
          this.setState({
            shuLiangValue: this.state.shuLiangValue
          }, () => {
            console.log(this.state.shuLiangValue)
          })
        }
        
      }else{
        if (this.state.shuLiangValue < 2) {
          Taro.showToast({
            title: '至少一辆',
            icon: 'none',
            mask: true
          })
        } else {
          this.state.shuLiangValue--
          this.setState({
            shuLiangValue: this.state.shuLiangValue,
          }, () => {
            console.log(this.state.shuLiangValue)
          })
        }
      }
    }
  // 送机包车数量
    numSChange(num){
      if(num==1){
        if (this.state.shuLiangSValue > 8) {
          Taro.showToast({
            title:'包车数量超过上限',
            icon: 'none',
            mask: true
          })
        }else{
          this.state.shuLiangSValue++
          this.setState({
            shuLiangSValue: this.state.shuLiangSValue
          }, () => {
            console.log(this.state.shuLiangSValue)
          })
        }
      }else{
        if (this.state.shuLiangSValue < 2) {
          Taro.showToast({
            title: '至少一辆',
            icon: 'none',
            mask: true
          })
        } else {
          this.state.shuLiangSValue--
          this.setState({
            shuLiangSValue: this.state.shuLiangSValue
          }, () => {
            console.log(this.state.shuLiangSValue)
          })
        }
      }
    }

// 地图选点
  getPoiList() {
    this.state.addressList=[]
    var that = this
    // 调用接口
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: that.state.latitude,
          longitude: that.state.longitude,
        },
        get_poi: 1,
        poi_options: 'policy=3;radius=3000;page_size=20;page_index=1',
        success: function(res) {
          that.setState({
            addressList: res.result.pois,
            shangCheAddress: res.result.pois[0]
          },()=>{
            console.log(that.state.addressList, 'getPoiList')
            console.log(that.state.shangCheAddress, 'shangCheAddress')
          })
                    
        },
        fail: function(res) {
          console.log(res);
        },
        complete: function(res) {
          console.log(res);
        }
      });
  }

   //获取中间点的经纬度，并mark出来
  getLngLat() {
    var that = this;
    this.mapCtx = Taro.createMapContext("map");
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setState({
          markers: [{
            id: 0,
            iconPath: that.state.dingWeiIconC,
            longitude: res.longitude,
            latitude: res.latitude,
            width: 15,
            height: 22
          }],
          longitude: res.longitude,
          latitude: res.latitude,
        },()=>{
          console.log(that.state.markers)
          console.log(that.state.longitude)
          console.log(that.state.latitude)
        })
        that.getPoiList()
      }
    })
  }
  regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    console.log(e, '地图发生变化的时候，获取中间点，也就是用户选择的位置')
      if(e.type == 'end'){
          this.getLngLat()
      }
  }
// 确定上车
  sureShangChe(){
    if(this.state.diDianType=='sending'){
      this.setState({
        AddressSending:{
          Title: this.state.shangCheAddress.title + this.state.shangCheAddress._dir_desc,
          Longitude: this.state.shangCheAddress.location.lng,
          Latitude: this.state.shangCheAddress.location.lat
        },
        diDianSValue: this.state.shangCheAddress.title + this.state.shangCheAddress._dir_desc,
        diDianSValueFlag:true,
      },()=>{
        console.log(this.state.AddressSending)
        console.log(this.state.diDianSValue)
        console.log(this.state.diDianSValueFlag)
      })
    }else if(this.state.diDianType=='pickUp'){
      this.setState({
        AddressPickUp: {
          Title: this.state.shangCheAddress.title + this.state.shangCheAddress._dir_desc,
          Longitude: this.state.shangCheAddress.location.lng,
          Latitude: this.state.shangCheAddress.location.lat
        },
        diDianValue: this.state.shangCheAddress.title + this.state.shangCheAddress._dir_desc,
        diDianValueFlag: true,
      }, () => {
        console.log(this.state.AddressPickUp)
        console.log(this.state.diDianValue)
        console.log(this.state.diDianValueFlag)
      })
    }
    this.hideDiDian()
  }
  // 选择列表地点
   selectDiDian(item){
      this.setState({
        longitude: item.location.lng,
        latitude: item.location.lat
      }, () => {
        console.log(this.state.longitude, this.state.latitude)
        this.getLngLat()
        this.setState({
          showCancel: false,
        }, () => {
          console.log(this.state.showCancel)
        })
      })
   }
// 提交用车服务
  submitFuWu(){
    let Pickup = {}//接机
    let Sending = {}//送机对象
    let sendingTime=''//送机包车时间
    let pickUpTime=''//接机包车时间
    let pickUpQuantity = ''//接机包车数量
    let sendingQuantity = ''//送机包车数量
    let sendingCarType=''//送机包车车型
    let pickUpCarType=''//接机包车车型
    if (!this.state.SendingFlag && !this.state.PickupFlag) {
      Taro.showToast({
        title: '请选择服务类型',
        icon: 'none',
        mask: true
      })
      return
    }
    if(this.state.SendingFlag==true){
      if (this.state.colorCarS == false) {
        Taro.showToast({
          title: '请选择送机服务的用车类型',
          icon: 'none',
          mask: true
        })
        return
      }
      if (this.state.carTypeSId == '10022') {
          console.log(this.state.colorSV, 'this.state.colorSVthis.state.colorSV')
        
       if (!this.state.diDianSValueFlag) {
          Taro.showToast({
            title: '请选择送机服务的出发地',
            icon: 'none',
            mask: true
          })
          return
        } else if (!this.state.colorSV) {
          Taro.showToast({
            title: '请选择送机服务的上车时间',
            icon: 'none',
            mask: true
          })
          return
        } else if (!this.state.cheXingSValueFlag) {
          Taro.showToast({
            title: '请选择送机服务的车型',
            icon: 'none',
            mask: true
          })
          return
        }else{
          sendingTime = this.state.sendingTime
          sendingQuantity = this.state.shuLiangSValue
          sendingCarType=this.state.cheXingSValue.Id
        }
      }else{
        if (!this.state.diDianSValueFlag) {
          Taro.showToast({
            title: '请选择送机服务的出发地',
            icon: 'none',
            mask: true
          })
          return
        }else{
          sendingTime = ''
          sendingQuantity = ''
          sendingCarType = 0
        }
        
      }
      Sending = {
        "VehicleTypeId": this.state.carTypeSId,
        "ProductId": sendingCarType,
        "Quantity": sendingQuantity,
        "Date": sendingTime,
        "Address": this.state.AddressSending
      }
      
    }else{
      Sending = null
    }
    if(this.state.PickupFlag==true){
      if (this.state.colorCar == false) {
         Taro.showToast({
           title: '请选择接机服务的用车类型',
           icon: 'none',
           mask: true
         })
         return
      }
      if (this.state.carTypeId == '10022') {
        if (!this.state.diDianValueFlag) {
          Taro.showToast({
            title: '请选择接机服务的目的地',
            icon: 'none',
            mask: true
          })
          return
        } else if (!this.state.colorV) {
          Taro.showToast({
            title: '请选择接机服务的上车时间',
            icon: 'none',
            mask: true
          })
          return
        } else if (!this.state.cheXingValueFlag) {
          Taro.showToast({
            title: '请选择接机服务的车型',
            icon: 'none',
            mask: true
          })
          return
        }else{
          pickUpTime = this.state.pickUpTime
          pickUpQuantity = this.state.shuLiangValue
          pickUpCarType= this.state.cheXingValue.Id
        }
      } else {
        if (!this.state.diDianValueFlag) {
          Taro.showToast({
            title: '请选择接机服务的目的地',
            icon: 'none',
            mask: true
          })
          return
        }else{
          pickUpTime = ''
          pickUpQuantity = ''
          pickUpCarType = 0
        }
        
      }
      Pickup = {
        "VehicleTypeId": this.state.carTypeId,
        "ProductId": pickUpCarType,
        "Quantity": pickUpQuantity,
        "Date": pickUpTime,
        "Address": this.state.AddressPickUp
      }
    }else{
      Pickup=null
    }
    this.setState({
      PickupObj: Pickup,
      SendingObj: Sending
    }, () => {
      console.log(this.state.PickupObj, this.state.SendingObj)
    })
    let yongCarObj = {
      BookTypeId:this.state.tablecurrent,
      "Usefor": "flight",
      "TargetId": this.state.orderObj.flightId,
      "Flag": this.state.flagStr,
      "Pickup": Pickup,
      "Sending": Sending
    }
    console.log(yongCarObj,'提交用车数据')
    saveVehicle(yongCarObj)
    .then(res=>{
      if(res.Success){
        this.hideJieSong()
        Taro.showToast({
          title: '已选用车服务',
          icon: 'none',
          mask: true
        })
        this._getVehicle()
        this.setState({
          baoChePrice:this.state.baoChePrice*this.state.shuLiangValue,
          baoCheSPrice: this.state.baoCheSPrice * this.state.shuLiangSValue,
        },()=>{
          console.log(this.state.baoChePrice,this.state.baoCheSPrice)
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
// 删除已选服务
  // 删除送机
    delVehicleSFun(){
      let delData = {
        "Usefor": "flight",
        "TargetId": this.state.orderObj.flightId,
        "BookTypeId": this.state.tablecurrent,
        "Flag": this.state.flagStr,
        "Pickup": {
          "Delete": false
        },
        "Sending": {
          "Delete": true
        }
      }
      delVehicle(delData)
      .then(res=>{
        if(res.Success){
          Taro.showToast({
            title: '已删除送机服务',
            icon: 'none',
            mask: true
          })
          
          this.setState({
            baoCheSPrice:0
          },()=>{
            console.log(this.state.baoCheSPrice)
          })
          this._getVehicle()
        }else{
          Taro.showToast({
            title: res.Message,
            icon: 'none',
            mask: true
          })
        }
      })
    }
  // 删除接机
    delVehicleFun(){
      let delData = {
        "Usefor": "flight",
        "TargetId": this.state.orderObj.flightId,
        "BookTypeId": this.state.tablecurrent,
        "Flag": this.state.flagStr,
        "Pickup": {
          "Delete": true
        },
        "Sending": {
          "Delete": false
        }
      }
      delVehicle(delData)
      .then(res=>{
        if(res.Success){
          Taro.showToast({
            title: '已删除接机服务',
            icon: 'none',
            mask: true
          })
          this.setState({
            baoChePrice: 0
          }, () => {
            console.log(this.state.baoChePrice)
          })
          this._getVehicle()
        }else{
          Taro.showToast({
            title: res.Message,
            icon: 'none',
            mask: true
          })
        }
      })
    }
  
// --------------------------------------------接送机end------------------------------
//-------------------------------------保险-----------------------------------
// 选择保险
  checkBaoXian(item,index){
    this.state.baoXianData[index].flag=!this.state.baoXianData[index].flag
    this.setState({
      baoXianData:this.state.baoXianData
    },()=>{
      console.log(this.state.baoXianData)
    })
  }
// 展开收起
  zhanKaiFun(){
    this.state.showBaoXianFlag=!this.state.showBaoXianFlag
    this.setState({
      showBaoXianFlag:this.state.showBaoXianFlag
    },()=>{
      console.log(this.state.showBaoXianFlag)
    })
  }
//-------------------------------------保险end--------------------------------
// 提交订单
  submitOrder(){
     Taro.showLoading({
       title: '加载中',
       mask: true
     })
      let orderMsgObj=JSON.parse(Taro.getStorageSync('orederMsg'))
      console.log(orderMsgObj,'orderMsgObj')
    

      let orderData={
        BookTypeId: 0,
        Remarks: this.state.RemarksValue,
        PayTypeId: this.state.PayTypeId,
        VoyagePrices:orderMsgObj.VoyagePrices,
        Staffs: this.state.contactArrId,
        Vehicle: {
          Sending: this.state.SendingObj,
          Pickup: this.state.PickupObj
        }

    }
      console.log(orderData)
      getReserveMsg(orderData)
      .then(data=>{
        if (data.Success) {
          Taro.hideLoading()
          console.log(data, '提交订单')
          Taro.redirectTo({
            url: '/pages/orderDetail/index?orderNumber=' + data.Result

          })
          
          
      }else{
        Taro.hideLoading()
        this.handleCloseMask()
        Taro.showToast({
          title: data.Message,
          icon: 'none',
          mask: true,
          duration:3000,
        })
      }
      })
      .catch(err=>{
        Taro.hideLoading()
        // Taro.showToast({
        //   title: err.Message,
        //   icon: 'none',
        //   mask: true
        // })
      })
    
  }
// 返回首页
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
// 分享
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
    const items = [
      { 'title': '航空公司'},
      { 'title': '选择舱位'},
      { 'title': '预订信息'},
      { 'title': '在线支付'},
      { 'title': '预订成功'}
    ]
    const tabList = [{ title: '因公出行'}, { title: '因私出行'}]
    const {
      PayTypeText,contactArr,payData,companyArr,currentPassenger,geRenPay,orderObj,selector,cabinData,list,tongXingData,baoCheTableData,vehicleTypeData,dataObj,vehicleTypeList,addressList,dataList,checkedDataObj} = this.state
    return (
      <View className='ticketInfo'>
        <ScrollView style = 'height: calc(88vh);' scrollY='true'>
          <View className='topSteps'>
              <AtSteps items={items} current={this.state.current} />
          </View>
          <View className='content'>
            {/* 订单基础信息 */}
            <View className="order-msg">
                <View className="orderMsgUp">
                  <View className="leftBiaoQian">{orderObj.TransitTypeName}</View>
                  <View className="midMsg">
                    <Text className='timeBiao'>{orderObj.Datatime}（{orderObj.week}）{orderObj.dd1}-{orderObj.dd2}</Text>
                    <View className='cityBiao'>
                        <Text>{orderObj.DepartureName}机场{orderObj.DepartureTerminal}</Text>
                        <Image src={arrow} />
                        <Text>{orderObj.ArrivalName}机场{orderObj.ArrivalTerminal}</Text> 
                    </View>
                    <View className='cityBiaoText'>{orderObj.companyMsg}</View>
                  </View>
                </View>
                <View className="orderMsgDown">
                  <Text className='TextSpan'>{orderObj.DiscountInfo}</Text>
                  <View className="rightText">
                    <View className="textMore">
                    <Text className='spanPrice'>{orderObj.CabinName}({orderObj.CabinCode})</Text>
                      <Text className='TextPrice'>¥{orderObj.TicketPrice}/人</Text>
                      {orderObj.IsGovern&&<Text className="cockpit-label label1">政</Text>}
                    </View>
                  <View className='tipsP1'>{orderObj.Taxes}</View>
                  </View>
                </View>
            </View>
            <View className='tableModel'>
            
            < View className = 'tableItem' >
                <View className="usualpassenger">
                    {/* 出行人信息 */}
                      <View className='usualUl'>
                        <View className="chekcAircrew">
                          <View class="payTitle">请选择乘机人({this.state.contactArrId.length}/{tongXingData.length})</View>
                          <View className="container">
                          <View className="table">
                            <View className="tr" style='background:rgba(252,249,233,1);'>
                              <View className="th">出行人</View>
                              <View className="th">手机号</View>
                              <View className="th">状态</View>
                              <View className="th">选择</View>
                            </View>
                            {tongXingData.map((item,index)=>{
                              return (
                                <View className="tr" onClick={this.checkTongXing.bind(this,item,index)}>
                                  <View className={item.MatchLevel==false?"td tdColor":"td"}>{item.Name}</View>
                                  <View className="td">{item.Mobile}</View>
                                  <View className="td">{item.Status.Name}</View>
                                  <View className="td">{item.CanBook&&<Image className='rightIcon' src={item.showCheck==true?rightIcon:rightIcon1}/>}</View>
                                  
                              </View>
                              )
                            })}
                              
                          </View> 
                          
                        </View>
                      </View>
                    {/* 其他服务如用车保险 */}
                        {dataList.length>0&&<View className="fuWuBox">
                          {dataList.map((item,index)=>{
                            return (
                              <View className="jieSongJiModel"  key={index}>
                                <View className="modelItem">
                                  <View className="itemBox" onClick={this.checkFuWu.bind(this,item)}>
                                    <View className="leftMOdelIcon">
                                      <Image src={jiesongjiIcon}/>
                                    </View>
                                    <View className="modelRight">
                                      <View className="modelName">{item.Name}</View>
                                      <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                                    </View>
                                  </View>

                                  {item.Id==108&&(checkedDataObj.Sending.Selected!=null||checkedDataObj.Pickup.Selected!=null)&&<View>
                                    <View className="yiXuanData">
                                    {/* 已选送机 */}
                                      {checkedDataObj.Sending.Selected!=null&&<View className="itemData">
                                        <View className="biaoQianSpan">{checkedDataObj.Sending.Selected.Type.Name}</View>
                                        <View className="itemLi">
                                          <View className="jieSongH2">{checkedDataObj.Sending.Name}</View>
                                          <View className="jieSongName">上车地点：{checkedDataObj.Sending.Selected.From.Title} </View>
                                          <View className="jieSongP">
                                            {!this.state.pinCheSTime&&<Text style='margin-right: 10px;'>{checkedDataObj.Sending.Selected.DateInfo}</Text>}
                                            {this.state.pinCheSTime&&<View className="rightName">
                                              {/* <Text style='margin-right:5px'>{orderObj.dd1}</Text> 
                                              <Text>{orderObj.d1.split('-')[1]}-{orderObj.d1.split('-')[2]}({orderObj.week})</Text>      */}
                                              <Text>司机会提前与您确认具体时间</Text>
                                            </View>}
                                          </View>
                                          <View className="jieSongP">{orderObj.companyMsg} | {orderObj.DepartureName}机场{orderObj.DepartureTerminal}</View>
                                            <View className="jieSongP flexBox">
                                              <Text>{checkedDataObj.Sending.Selected.Product.Name}</Text>
                                              <Text className='jieSongB'>¥{this.state.baoCheSPrice}</Text>
                                            </View>
                                            <View className="jieSongDel" onClick={this.delVehicleSFun.bind(this)}>
                                              <Image src={carDel}/>
                                            </View>
                                        </View>
                                      </View>}
                                      {/* 已选接机 */}
                                      {checkedDataObj.Pickup.Selected!=null&&<View className="itemData">
                                        <View className="biaoQianSpan">{checkedDataObj.Pickup.Selected.Type.Name}</View>
                                        <View className="itemLi">
                                          <View className="jieSongH2">{checkedDataObj.Pickup.Name}</View>
                                          <View className="jieSongName">下车地点：{checkedDataObj.Pickup.Selected.To.Title} </View>
                                          <View className="jieSongP">
                                            {!this.state.pinCheTime&&<Text style='margin-right: 10px;'>{checkedDataObj.Pickup.Selected.DateInfo}</Text>}
                                            {this.state.pinCheTime&&<View className="rightName">
                                              {/* <Text style='margin-right:5px'>{orderObj.dd2}</Text> 
                                              <Text>{orderObj.d2.split('-')[1]}-{orderObj.d2.split('-')[2]}({orderObj.week2})</Text>      */}
                                              <Text>司机会提前与您确认具体时间</Text>
                                            </View>}
                                          </View>
                                          <View className="jieSongP">{orderObj.companyMsg} | {orderObj.ArrivalName}机场{orderObj.ArrivalTerminal}</View>
                                          <View className="jieSongP flexBox">
                                            <Text>{checkedDataObj.Pickup.Selected.Product.Name}</Text>
                                            <Text className='jieSongB'>¥{this.state.baoChePrice}
                                            </Text>
                                          </View>
                                          <View className="jieSongDel" onClick={this.delVehicleFun.bind(this)}>
                                            <Image src={carDel}/>
                                          </View>
                                        </View>
                                      </View>}
                                    </View>
                                </View>}
                                {/* {item.Id==109&&this.state.showBaoXianFlag&&<View style='padding-bottom:10px;'>
                                  {baoXianData.map((t,i)=>{
                                    return (
                                      <View className="baoXianLi" key={i} onClick={this.checkBaoXian.bind(this,t,i)}>
                                        <View className="leftName">
                                          <View className="baoXianName">{t.Name}</View>
                                          <View className="baoXianContent">{t.detail}</View>
                                        </View>
                                        <View className="rightPrice">
                                          <View className="baoXianPrice">¥{t.price}x{contactArr.length}</View>
                                          <View className="checkStatu">
                                            {t.flag?<Image className='BaoXianCheckBox' src={checkBoxIcon}/>:<View className="weiCheck"></View>}
                                          </View>
                                        </View>
                                      </View>
                                    )
                                  })}
                                </View>}
                                {item.Id==109&&<View className='baoXianFlag' onClick={this.zhanKaiFun}>
                                  <View className="flagStatus">
                                    <Text>{this.state.showBaoXianFlag?'收起':'展开'}</Text>
                                    <View className="jianTouBox">
                                      <Image className={this.state.showBaoXianFlag?'zhanKai':''} src={xiaJianTouIcon}/>
                                    </View>
                                  </View>
                                </View>} */}
                                </View>
                              </View>
                            )
                          })}
                        </View>}
                    {/* 支付方式   */}
                      <View class="select-payment">
                        <View class="payTitle">请选择支付方式</View>
                          <View class="btn">
                              {payData.map((item,index)=>{
                                return (
                                  <Text  className='buttonText isSelect'>{item.Name}</Text>
                                )
                              })}
                              
                            </View>
                        </View>
                    {/* 备注 */}
                     <View className={this.state.showTextarea?'':'beiZhuBox'}>
                        <AtTextarea value={this.state.RemarksValue} onChange={this.handleChange.bind(this)} maxLength={200} placeholder='请输入备注...'  />
                      </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* 底部footer */}
          <View className='total'>
              <View class="box">
              <View class="textMsg">
                  <View class="leftFoot">
                      <Text className="font">累计 </Text>
                    <Text className="totalprice"> ￥{this.state.orderObj.TotalPrice*this.state.contactArrId.length+this.state.baoChePrice+this.state.baoCheSPrice}</Text>
                    <Text className="peoplenum">({this.state.contactArrId.length}人)</Text>
                  </View>
                  <View class="rightFoot" onClick={this.showDetailFun.bind(this)}>
                      <View className='mingXiI'>明细</View>
                      <Image className='doenIcon' src={doenIcon} />
                  </View>
              </View>
              <View className='showOrder' onClick={this.showMask.bind(this)}>提交订单</View>
              </View>
              
          </View>
        {/* 订单弹层 */}
          {this.state.isOpened&&<View className='cabinMask'>
              <View className='orderMsgMask'>
                <View className='orderMsgMaskTitle'>
                  <View className='at-col' style='text-align: center;'>请核对订单信息</View>
                </View>
                <View className="tipsText"><Text>提示：座位预留时间由航空公司决定，建议您在20分钟内付款，若由于航空公司清位导致出票失败，我方会全额退款，感谢理解。</Text></View>
                <View class="select-shipping">
                  <View class="hangBanMsg">
                    <View class="biaoTi">
                      <Text>航班信息</Text>
                    </View>
                    <View class="neiRong" style='padding-top:10px;'>
                      <Text className='textB'>{orderObj.startCityName} ({orderObj.DepartureName}机场){orderObj.DepartureTerminal} - {orderObj.endCityName} ({orderObj.ArrivalName}机场){orderObj.ArrivalTerminal}</Text>
                      <View className='textP'>{orderObj.companyMsg}</View>
                      <View className='textSpan'>{orderObj.Datatime} ({orderObj.week}) </View>
                    </View>
                  </View>
                  <View class="hangBanMsg">
                    <View class="biaoTi" >
                      <Text>乘机人</Text>
                    </View>
                    <View class="neiRong" style='padding-top:10px;'>
                        {contactArr.map((item, index) => {
                          return (
                            <View className='textSpan' style='margin-bottom: 10px;'>
                              <Text style='margin-right: 10px;'>{item.Name}</Text>
                              <Text>{item.Mobile}</Text>
                            </View>
                          )
                        })}
                    </View>
                    <View class="hangBanMsg" style='padding-top:10px;'>
                        <View class="biaoTi" >
                          <Text>支付金额</Text>
                        </View>
                        <View className='neiRong' style='padding-top:10px;'>
                        <Text className="totalprice"> ￥{this.state.orderObj.TotalPrice*this.state.contactArrId.length+this.state.baoChePrice+this.state.baoCheSPrice}</Text>
                        </View>
                      </View>
                    <View class="hangBanMsg">
                        <View class="biaoTi" >
                          <Text>支付方式</Text>
                        </View>
                        <View className='neiRong' style='padding-top:10px;'>
                          <View className='textSpan'>{PayTypeText}</View>
                        </View>
                      </View>
                      {(checkedDataObj.Sending.Selected!=null||checkedDataObj.Pickup.Selected!=null)&&<View class="hangBanMsg">
                      <View class="biaoTi" >
                        <Text>接送机服务</Text>
                      </View>
                      <View className='neiRong' style='padding-top:10px;'>
                        {checkedDataObj.Sending.Selected!=null&&<View className='textSpan' style='margin-bottom: 10px;'>
                            <Text style='margin-right: 5px;'>送机：</Text>
                            {!this.state.pinCheSTime&&<Text className='detailMsgBoxB'>{checkedDataObj.Sending.Selected.Type.Name}x{this.state.shuLiangSValue}辆</Text>}
                            {this.state.pinCheSTime&&<Text className='detailMsgBoxB'>{checkedDataObj.Sending.Selected.Type.Name}x{this.state.contactArrId.length}人</Text>}
                        </View>}
                        {checkedDataObj.Pickup.Selected&&<View className='textSpan' style='margin-bottom: 10px;'>
                            <Text style='margin-right: 5px;'>接机：</Text>
                            {!this.state.pinCheTime&&<Text className='detailMsgBoxB'>{checkedDataObj.Pickup.Selected.Type.Name}x{this.state.shuLiangValue}辆</Text>}
                            {this.state.pinCheTime&&<Text className='detailMsgBoxB'>{checkedDataObj.Pickup.Selected.Type.Name}x{this.state.contactArrId.length}人</Text>}
                        </View>}
                      </View>
                    </View>}
                      <View class="hangBanMsg">
                        <View class="biaoTi" >
                          <Text>备注</Text>
                        </View>
                        <View className='neiRong' style='padding-top:10px;'>
                          <View className='textSpan'>{this.state.RemarksValue==''?'无':this.state.RemarksValue}</View>
                        </View>
                      </View>
                  </View>
                </View>
                <View className='btn-Box'>
                <View className='cancel-Btn' onClick={this.handleCloseMask}>取消</View>
                <View  class="add-btn" onClick={this.submitOrder}>确定</View>
                </View>
                
              </View>
          </View>}
        {/* 明细弹层 */}
          {showDetail&&<View class="bottomMask" onClick={this.hideDetailFun}></View>}
          {showDetail&&<View className='detailMsgBox'>
                  <View className='nameH4'>价格明细</View>
                  <View className='detailMsgBoxUl'>
                      <View className='detailMsgBoxLi'>
                          <View class="itemTitle">
                              <View className='detailMsgBoxP'>机票价格</View>
                              <View className='detailMsgBoxI'></View>
                          </View>
                          <View className="contentText">
                            <View className="leftDetailMsg">
                                <View className='detailMsgBoxSapn'>机票价格x{this.state.contactArrId.length}</View>
                                <View className='detailMsgBoxB'>￥{orderObj.TicketPrice}/人</View>
                            </View>
                            {orderObj.TaxesArr.map((c,d)=>{
                              return (
                                <View className="leftDetailMsg" key={d}>
                                  <View className='detailMsgBoxSapn'>{c.Name}x{this.state.contactArrId.length}</View>
                                  <View className='detailMsgBoxB'>￥{c.Amount}/人</View>
                                </View>
                              )
                            })}
                          </View>
                      </View>
                      {(checkedDataObj.Sending.Selected!=null||checkedDataObj.Pickup.Selected!=null)&&<View className='detailMsgBoxLi'>
                          <View class="itemTitle">
                              <View className='detailMsgBoxP'>接送机价格</View>
                              <View className='detailMsgBoxI'></View>
                          </View>
                          <View className="contentText">
                            {checkedDataObj.Sending.Selected!=null&&<View className="leftDetailMsg">
                                {!this.state.pinCheSTime&&<View className='detailMsgBoxSapn'>送机：{checkedDataObj.Sending.Selected.Type.Name}x{this.state.shuLiangSValue}辆</View>}
                                {this.state.pinCheSTime&&<View className='detailMsgBoxSapn'>送机：{checkedDataObj.Sending.Selected.Type.Name}x{this.state.contactArrId.length}人</View>}
                                {!this.state.pinCheSTime&&<View className='detailMsgBoxB'>￥{checkedDataObj.Sending.Selected.Product.Price}/辆</View>}
                                {this.state.pinCheSTime&&<View className='detailMsgBoxB'>￥{checkedDataObj.Sending.PoolPrice}/人</View>}
                            </View>}
                            {checkedDataObj.Pickup.Selected&&<View className="leftDetailMsg">
                                {!this.state.pinCheTime&&<View className='detailMsgBoxSapn'>接机：{checkedDataObj.Pickup.Selected.Type.Name}x{this.state.shuLiangValue}辆</View>}
                                {this.state.pinCheTime&&<View className='detailMsgBoxSapn'>接机：{checkedDataObj.Pickup.Selected.Type.Name}x{this.state.contactArrId.length}人</View>}
                                {!this.state.pinCheTime&&<View className='detailMsgBoxB'>￥{checkedDataObj.Pickup.Selected.Product.Price}/辆</View>}
                                {this.state.pinCheTime&&<View className='detailMsgBoxB'>￥{checkedDataObj.Pickup.PoolPrice}/人</View>}
                            </View>}
                          </View>
                      </View>}
                    </View>
            </View>}
        {/* 接送机弹层--------------------------------------*/}
        {/* 规则弹层 */}
          {this.state.showGuiZe&&<View className='cabinMask'>
              <View className="baoCheBox" style='height: 80vh;top:0;right:0;margin:auto;width:90%;background: #ffffff;'>
                  <View className="baoCheTable"><Text className='guiZeText' style='padding:10px 0;text-align:center;display:block;'>包车拼车规则 </Text></View>
                  <View className="baoCheContent" style='width: 90%;margin: 0 auto;'>
                      <RichText style='width: 100%;margin: 0 auto;font-size:12px;' nodes={this.state.ruleContent} />
                  </View>  
                
                  <View className="btnBox" style='border-radius:0 0 5px 5px;'>
                    <View className='itemBtn btnCancel' style='flex-grow: 1;' onClick={this.ruleHide}>取消</View>
                    <View className='itemBtn btnSure' style='flex-grow: 1;' onClick={this.ruleAgree}>同意</View>
                  </View>
              </View>
          </View>}
        {/* 包车拼车 */}
          {this.state.showBaoChe&&<View className='cabinMask'>
              <View className="baoCheBox">
                <View className="baoCheTable">
                    <Text className='guiZeText' style='padding:10px 0;text-align:center;display:block;'>接送机服务 </Text>
                </View>
                  <View className="baoCheContent" style='padding-top:60px'>
                    {/* 送机服务 */}
                      {dataObj.Sending.CanUse&&<View className="itemBaoChe">
                          <View className="itemTitle" onClick={this.selectSFuWu.bind(this)}>
                              <View className="checkBaoCheIcon">
                                <Image src={this.state.SendingFlag==true?checkBoxIcon:baoCheCheckIcon}/>
                              </View>
                              <Text>送机服务（{this.state.startCityName}）</Text>
                          </View>
                          <View className="box">
                            <View className="itemUl">
                              {/* 航站楼信息 */}
                                <View className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={feiJiIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi">
                                        <View className="rightName">{orderObj.companyMsg} | {orderObj.DepartureName}机场{orderObj.DepartureTerminal}</View>
                                      </View>
                                    </View>
                                </View>
                              {/* 乘机人信息 */}
                                {contactArr.length>0&&<View className="itemLi">
                                    <View className="leftIcon"> 
                                        <Image src={xiaoRenIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      {contactArr.map((t,i)=>{
                                        return(
                                          <View className="rightLi">
                                          <View className="rightName">
                                            <Text style='margin-right:10px;'>{t.Name}</Text><Text>{t.Mobile!=''?t.Mobile:''} </Text>
                                          </View>
                                          <View className="cardNum">身份证：{t.DocumentNo}</View>
                                        </View>
                                        )
                                        
                                      })}
                                    </View>
                                </View>}
                              {/* 用车类型 */}
                                <View className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={carTypeIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <Picker mode = 'selector'  rangeKey='Name' range = {this.state.dataObj.Sending.Types} onChange = { this.carTypeSChange } style = 'flex-grow: 1;' >
                                          < View className={this.state.colorCarS?'picker pickerVColor':'picker'}>
                                            {this.state.carTypeS}
                                          </View>
                                        </Picker>
                                        <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                                      </View>
                                      
                                    </View>
                                </View>
                              {/* 拼车时的默认时间 */}
                                {!this.state.showItemS&&this.state.colorCarS&&<View        className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={shiJianIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi">
                                        <View className="rightName">
                                          {/* <Text style='margin-right:5px'>{orderObj.dd1}</Text> 
                                          <Text>{orderObj.d1.split('-')[1]}-{orderObj.d1.split('-')[2]}({orderObj.week})</Text>   */}
                                          <Text>司机会提前与您确认具体时间</Text>
                                        </View>
                                      </View>
                                    </View>
                                </View>}
                              {/* 选择地点 */}
                                {this.state.colorCarS&&<View className="itemLi" onClick={this.showDiDianFun.bind(this,'sending')}>
                                    <View className="leftIcon">
                                        <Image src={diDianIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <View className={this.state.diDianSValueFlag==true?"diDianValue diDianValueColor":"diDianValue"}>{this.state.diDianSValue}</View>
                                        <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                                      </View>
                                      
                                    </View>
                                </View>}
                              {/* 包车时的时间 */}
                                {this.state.showItemS&&this.state.colorCarS&&<View className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={shiJianIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <Picker mode = 'multiSelector' style = 'flex-grow: 1;' range={timeSData} onChange={this.onTimeSChange}>
                                          < View className={this.state.colorSV==true?'picker pickerVColor':'picker'}>
                                            {this.state.timeSChuFa}
                                          </View>
                                        </Picker>
                                        <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                                      </View>
                                      
                                    </View>
                                </View>}
                              {/* 选择车型 */}
                                {this.state.showItemS&&this.state.colorCarS==true&&<View className="itemLi" onClick={this.showVehicleType.bind(this,'sending',1001)}>
                                    <View className="leftIcon">
                                        <Image src={carIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <View className={this.state.cheXingSValueFlag==true?"diDianValue diDianValueColor":"diDianValue"}>{this.state.cheXingSValue.Name}</View>
                                        <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                                      </View>
                                      
                                    </View>
                                </View>}
                              {/* 包车数量 */}
                                {this.state.showItemS&&this.state.colorCarS&&<View className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={shuLiangIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <View className="rightName" style='flex-grow:1;'>包车数量</View>
                                        <View className="jisJianBox">
                                            <View className="jianBox" onClick={this.numSChange.bind(this,2)}>
                                                <Image src={jianIcon}/>
                                            </View>
                                              <View className="numBox">{this.state.shuLiangSValue}</View>
                                            <View className="jianBox" onClick={this.numSChange.bind(this,1)}>
                                                <Image src={jiaIcon}/>
                                            </View>
                                        </View>
                                      </View>
                                      
                                    </View>
                                </View>}
                            </View>
                          </View>
                      </View>}
                    {/* 接机服务 */}
                      {dataObj.Pickup.CanUse&&<View className="itemBaoChe">
                          <View className="itemTitle" onClick={this.selectFuWu.bind(this)}>
                              <View className="checkBaoCheIcon" >
                                <Image src={this.state.PickupFlag==true?checkBoxIcon:baoCheCheckIcon}/>
                              </View>
                              <Text>接机服务（{this.state.endCityName}）</Text>
                          </View>
                          <View className="box">
                            <View className="itemUl">
                              {/* 航站楼信息 */}
                                <View className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={feiJiIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi">
                                        <View className="rightName">{orderObj.companyMsg} | {orderObj.ArrivalName}机场{orderObj.ArrivalTerminal}</View>
                                      </View>
                                    </View>
                                </View>
                              {/* 乘机人信息 */}
                                {contactArr.length>0&&<View className="itemLi">
                                    <View className="leftIcon"> 
                                        <Image src={xiaoRenIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      {contactArr.map((t,i)=>{
                                        return(
                                          <View className="rightLi">
                                          <View className="rightName">
                                            <Text style='margin-right:10px;'>{t.Name}</Text><Text>{t.Mobile!=''?t.Mobile:''} </Text>
                                          </View>
                                          <View className="cardNum">身份证：{t.DocumentNo}</View>
                                        </View>
                                        )
                                        
                                      })}
                                    </View>
                                </View>}
                              {/* 用车类型 */}
                                <View className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={carTypeIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <Picker mode = 'selector' rangeKey='Name' range = {this.state.dataObj.Pickup.Types} onChange = { this.carTypeChange } style = 'flex-grow: 1;' >
                                          < View className={this.state.colorCar?'picker pickerVColor':'picker'}>
                                            {this.state.carType}
                                          </View>
                                        </Picker>
                                        <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                                      </View>
                                      
                                    </View>
                                </View>
                              {/* 拼车时的默认时间 */}
                                {!this.state.showItem&&this.state.colorCar&&<View className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={shiJianIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi">
                                        <View className="rightName">
                                          {/* <Text style='margin-right:5px'>{orderObj.dd2}</Text> 
                                          <Text>{orderObj.d2.split('-')[1]}-{orderObj.d2.split('-')[2]}({orderObj.week2})</Text>      */}
                                          <Text>司机会提前与您确认具体时间</Text>
                                        </View>
                                      </View>
                                    </View>
                                </View>}
                              {/* 选择地点 */}
                                {this.state.colorCar&&<View className="itemLi" onClick={this.showDiDianFun.bind(this,'pickUp')}>
                                    <View className="leftIcon">
                                        <Image src={diDianIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <View className={this.state.diDianValueFlag==true?"diDianValue diDianValueColor":"diDianValue"}>{this.state.diDianValue}</View>
                                        <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                                      </View>
                                      
                                    </View>
                                </View>}
                              {/* 包车时的时间 */}
                                {this.state.showItem&&this.state.colorCar&&<View className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={shiJianIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <Picker mode = 'multiSelector' style = 'flex-grow: 1;' range={timeData} onChange={this.onTimeChange}>
                                          < View className={this.state.colorV?'picker pickerVColor':'picker'}>
                                            {this.state.timeChuFa}
                                          </View>
                                        </Picker>
                                        <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                                      </View>
                                      
                                    </View>
                                </View>}
                              {/* 选择车型 */}
                                {this.state.showItem&&this.state.colorCar&&<View className="itemLi" onClick={this.showVehicleType.bind(this,'pickUp',1002)}>
                                    <View className="leftIcon">
                                        <Image src={carIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <View className={this.state.cheXingValueFlag==true?"diDianValue diDianValueColor":"diDianValue"}>{this.state.cheXingValue.Name}</View>
                                        <View className="rightJiantou"><Image src={jianTouIcon}/></View>
                                      </View>
                                      
                                    </View>
                                </View>}
                              {/* 包车数量 */}
                                {this.state.showItem&&this.state.colorCar&&<View className="itemLi">
                                    <View className="leftIcon">
                                        <Image src={shuLiangIcon}/>
                                    </View>
                                    <View className="rightContent">
                                      <View className="rightLi flex">
                                        <View className="rightName" style='flex-grow:1;'>包车数量</View>
                                        <View className="jisJianBox">
                                            <View className="jianBox" onClick={this.numChange.bind(this,2)}>
                                                <Image src={jianIcon}/>
                                            </View>
                                              <View className="numBox">{this.state.shuLiangValue}</View>
                                            <View className="jianBox" onClick={this.numChange.bind(this,1)}>
                                                <Image src={jiaIcon}/>
                                            </View>
                                        </View>
                                      </View>
                                      
                                    </View>
                                </View>}
                            </View>
                          </View>
                      </View>}
                  </View>
                  <View className="btnBox">
                    <View className='itemBtn btnCancel' onClick={this.hideJieSong}>取消</View>
                    <View className='itemBtn btnSure' onClick={this.submitFuWu}>确定</View>
                  </View>
              </View>
          </View>}
        {/* 选择车型 */}
          {this.state.vehicleType&&<View className='cabinMask'>
            <View className="baoCheBox" style='background: #ffffff;'>
              <View className="baoCheTable">
                <Text className='guiZeText' style='padding:10px 0;text-align:center;display:block;'>选择车型 </Text>
                <Image className='closeIcon' src={closeIcon} onClick={this.hideVehicleType}/>  
                <View className="itemTable">
                {vehicleTypeData.map((item,index)=>{
                  return(
                    <View className={this.state.baoCheTableFlag==item.Catalog.Id?"selectTable selectTableOn":"selectTable"} onClick={this.checkCarType.bind(this,item,index)} key={index}>{item.Catalog.Name}</View>
                  )
                })}
                  
                </View>
              </View>
              <View className="baoCheContent" style='padding-top:28%;'>
                {vehicleTypeList.map((item,index)=>{
                  return(
                    <View className="itemVehicleType" key={index} onClick={this.selecCar.bind(this,item)}>
                      <View className="checkVehicleBox">
                        <Image src={this.state.selecCarFlag==item.Id?checkBoxIcon:baoCheCheckIcon} />
                      </View>
                      <View className="carImg">
                        <Image src={item.ImageUrl}/>
                      </View>
                      <View className="rightCarMsg">
                        <View className="carTypeName">
                          <Text>{item.Name}</Text>
                        </View>
                        <View className="otherMsg">
                          <View className="numBox">
                            <View className="iconNum">
                              <Image src={chengKeNum}/>
                            </View>
                              <Text>{item.SeatInfo}</Text>
                            
                          </View>
                          <View className="numBox">
                            <View className="iconNum">
                              <Image src={xingLiIcon}/>
                            </View>
                              <Text>{item.LuggageInfo}</Text>
                            
                          </View>
                        </View>
                        <View className="carPriceB">
                        <View className="carTypeTips">
                          {item.Labels.map((a,b)=>{
                            return(
                              <View className="tipsSpan" key={b}>{a}</View>
                            )
                          })}
                          
                        </View>
                        <View className="jisGebox">
                            <View style='color: #F5644D;font-size:16px;'>￥{item.Price}</View><View style='color: #333333;font-size: 10px;padding-top:5px;'>/辆</View></View>
                            </View>
                        
                      </View>
                      
                  </View>
                  )
                })}
                  
              </View>
            </View>
          </View> }

        {/* 出发地点 */}
          {this.state.showDiDian&&<View className='cabinMask'>
            <View className="baoCheBox" style='background: #ffffff;'>
                <View className="baoCheTable">
                    <Text className='guiZeText'>{this.state.diDianText}</Text>
                    <View className="guaniBox" onClick={this.hideDiDian}>
                      <Image  src={closeIcon} />  
                    </View>
                    <View className="itemTable" style='display:flex;width:98%;margin:0 auto;'>
                      <Text style='font-size:12px;margin-right:10px;line-height: 30px;'>{this.state.diDianType=='sending'?this.state.startCityName:this.state.endCityName}</Text>
                      <View className='searchBox'>
                        <View className="inputBox">
                          <View className="imgBox">
                              <Image className='souSuoIcon' src={souSuoIcon}/>
                          </View>
                          <AtInput style='flex-grow:1;' value={this.state.diDianKeyWord} placeholder="请输入您的地点"  onChange={this.onDiDianChange.bind(this)} onFocus={this.showDiDianList.bind(this)}/>
                        </View>
                        {this.state.showCancel&&this.state.diDianType!='pickUp'&&(this.state.startCityName==this.state.dingWeiName)&&<View className="searchBtn" onClick={this.hideDingWeiList.bind(this)}>取消</View>}
                      </View>
                    </View>
                  </View>
                <View className="baoCheContent" style='padding-top:22%;height:76vh'>
                    {this.state.showCancel&&<View className="dingWeiList">
                      {addressList.map((item,index)=>{
                        return(
                          <View className="dingweiMsg" key={index} onClick={this.selectDiDian.bind(this,item)}>
                              <View className="dingWeiIconBox">
                                  <Image src={dingweiIcon}/>
                              </View>
                              <View className="dingWEiText" style='border-bottom: 1px solid #F2F2F2;padding-bottom: 20px;'>
                                <View className="dingWeiName">{item.title}{item._dir_desc}</View>
                                <View className="dingWeiDetail">{item.address}</View>
                              </View>
                          </View>
                        )
                      })}
                      
                    </View>}
                    {!this.state.showCancel&&<Map id="map" style='position:absolute;' longitude={this.state.longitude} latitude={this.state.latitude}
                      markers={this.state.markers}
                      style='width:100%;height:70%'
                      onRegionChange={this.regionchange.bind(this)} show-location>
                    </Map>}

                </View>
                {!this.state.showCancel&&<View className="dingWeiBox">
                    <View className="dingweiMsg" style='padding:20px 0;'>
                      <View className="dingWeiIconBox">
                          <Image src={dingWeiIconC}/>
                      </View>
                      <View className="dingWEiText">
                        <View className="dingWeiName">{this.state.shangCheAddress.title}{this.state.shangCheAddress._dir_desc}</View>
                        <View className="dingWeiDetail">{this.state.shangCheAddress.address}</View>
                      </View>
                    </View>
                    <View className="sureTrainBtn" onClick={this.sureShangChe}>确定上车</View>
                </View>}
            </View>
          </View>}
      {/* 接送机弹层end--------------------------------------*/}
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