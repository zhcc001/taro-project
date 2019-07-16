import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane ,AtActivityIndicator,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast,AtInput} from 'taro-ui'
import {getList,getMask} from '../../../../api/visa'
import souSuoIcon from './images/sousuo.png'
import clearIcon from './images/quxiao.png'
import sanJiaoIcon from './images/sanjiao.png'
import sanJiaoCheckIcon from './images/sanjiaoCheck.png'
import shiJianIcon from './images/shijian.png'
import {shareTitle} from '../../../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '签证列表'
  }

  constructor(){
    super(...arguments)
    this.state={
      showSelectFlag:false,
      ps:10,
      pi:1,
      piMax:1,
      "enablePullDownRefresh": true, 
      onReachBottomDistance:50,
      dargStyle: {//下拉框的样式
        top: 0 + 'px'
    },
    downDragStyle: {//下拉图标的样式
        height: 0 + 'px'
    },
    downText: '下拉刷新',
    upDragStyle: {//上拉图标样式
        height: 0 + 'px'
    },
    pullText: '上拉加载更多',
    start_p: {},
    scrollY:true,
    dargState: 0,//刷新状态 0不做操作 1刷新 -1加载更多
    orderTips:'',
    orderTipsContent:'',
    showMask:false,
    PayStatus:'',
    orderId:'',
    payFlag:false,
    canCelFlag:false,
    showLoading:false,
    sortTextFlag: false,
    destination:[{
      Id:1,
      Name:'上海'
    },{
      Id:2,
      Name:'北京'
    },{
      Id:3,
      Name:'广州'
    },{
      Id:4,
      Name:'深圳'
    },{
      Id:5,
      Name:'杭州'
    },],
    destinationFlag:-1,
    chuXingDay:[{
      Id:'',
      Name:'不限天数'
    },{
      Id:2,
      Name:'1-3天'
    },{
      Id:3,
      Name:'5-8天'
    },{
      Id:4,
      Name:'10-15天'
    },],
    chuXingDayFlag:-1,
    comprehensive:false,
    destinationId:'',//目的地ID
    chuXingDayId:'',//出行天数ID
    comprehensiveFlag:0,
    comprehensiveData:[],
    comprehensiveId:'',//综合排序ID
    ticketData:[],
    keyWord:'',
    clearFlag:false,
    departCity:[],
    departCityId:'',
    departCityFlag: -1,
    moreSelect:'更多筛选',
    sortText: '综合排序',
    textSelectFlag: false,
    showNullFlag:false,
    visaListLi:[],
     // 签证类型
      allType:true,
      isType:[],
      typeModelData:[],
      // 特色服务
      allService:true,
      isService:[],
      serviceModelData:[],
      // 入境次数
      allEntry:true,
      isEntryNum:[],
      entryNumData:[],
      // 目的地变量
      miDidi: '目的地',
      allCountry:true,
      allCountryFlag:false,
      itemCountry:-1,
      showDestination:false,
      leftCountry:[],
      allCity:false,
      rightCity:false,
      isCity:-1,
      cityData:[],
      cityID:0,
      // 常住地
      changZhuDi: '常住地',
      showUsual:false,
      allUsualCity:true,
      isUsualCity:-1,
      usualCityData:[],
      countryId:'',
      visaTypeId:'',
      consulateId:'',
      entryTimesId:'',
      localityId:'',
      labels:'',
      orderBys:'',
    }
  }

  componentWillMount () {
    if (this.$router.params.countryId) {
      this.state.countryId = this.$router.params.countryId
    }
    
    this._getSearch()
    this._getList()
    
  }
  componentDidMount () {
    
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 获取门票列表
  _getList() {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
      getList(this.state.countryId, this.state.visaTypeId, this.state.consulateId, this.state.entryTimesId, this.state.localityId, this.state.orderBys, this.state.pi, this.state.ps, this.state.keyWord)
      .then(res=>{
        if(res.Success){
          Taro.hideLoading()
          this.state.visaListLi = this.state.visaListLi.concat(res.Result.Result),
          this.state.piMax=Math.ceil(res.Result.Pagination.TotalCount / res.Result.Pagination.PageSize),
          this.state.pi++
          this.setState({
            visaListLi: this.state.visaListLi
          },()=>{
            console.log(this.state.visaListLi, '订单列表')
            Taro.hideLoading()
          })
          if (this.state.visaListLi.length == 0) {
            this.setState({
              showNullFlag: true
            }, () => {
              console.log(this.state.showNullFlag)
            })
          } else {
            this.setState({
              showNullFlag: false
            }, () => {
              console.log(this.state.showNullFlag)
            })
          }
        }else{
         Taro.hideLoading()
         Taro.showToast({
           title: res.Message,
           icon: 'none',
           mask: true
         })
        }
        
            console.log(this.state.piMax) 
      })
      .catch(err=>{
        Taro.hideLoading()
        Taro.showToast({
          title: '接口出错',
          icon: 'none',
          mask: true
        })
      })
    
  }
  _getSearch() {
        getMask()
        .then(res => {
          if(res.Success==true){
              this.setState({
                  typeModelData: res.Result.VisaTypes
              },()=>{
                  console.log(this.state.typeModelData)
              })
            this.typeModelData=res.Result.VisaTypes
            if(res.Result.Specials==null){
              this.state.serviceModelData=[]
            }else{
              this.setState({
                serviceModelData: res.Result.Specials
              }, () => {
                console.log(this.state.serviceModelData)
              })
            }
            this.setState({
                entryNumData:res.Result.EntryTimes,
                comprehensiveData: res.Result.OrderBys,
                usualCityData:res.Result.Provinces,
                leftCountry:res.Result.Countries
            },()=>{
                console.log(this.state.entryNumData)
                console.log(this.state.comprehensiveData)
                console.log(this.state.usualCityData)
                console.log(this.state.leftCountry)
            })
            
          }
          
        })
        .catch(err => {
          
        })
      }
// 显示筛选弹层
showSelect(num){
    if(num==1){
        this.setState({
          showSelectFlag: !this.state.showSelectFlag,
        }, () => {
          console.log(this.state.showSelectFlag)
          this.hideSelect(2)
          this.hideSelect(3)
          this.hideSelect(4)
        })
    }else if(num==2){
        this.setState({
          showDestination: !this.state.showDestination,
        }, () => {
          console.log(this.state.showDestination)
          this.hideSelect(1)
          this.hideSelect(3)
          this.hideSelect(4)
        })
    } else if (num == 3) {
      this.setState({
        showUsual: !this.state.showUsual,
      }, () => {
        console.log(this.state.showUsual)
        this.hideSelect(1)
        this.hideSelect(2)
        this.hideSelect(4)
      })
    }else if(num==4){
        this.setState({
          comprehensive: !this.state.comprehensive,
        }, () => {
          console.log(this.state.comprehensive)
          this.hideSelect(1)
          this.hideSelect(2)
          this.hideSelect(3)
        })
    }
  
}
// 关闭筛选弹层
hideSelect(num) {
   if(num==1){
       this.setState({
           showSelectFlag: false
       },()=>{
           console.log(this.state.showSelectFlag)
       })
   }else if(num==2){
       this.setState({
         showDestination: false
       }, () => {
         console.log(this.state.showDestination)
       })
   }else if(num==3){
        this.setState({
            showUsual:false
        },()=>{
            console.log(this.state.showUsual)
        })
   } else if(num==4){
       this.setState({
           comprehensive:false
       },()=>{
           console.log(this.state.comprehensive)
       })
   }
  
  
}
  // 签证类型选择
      typeCheck(item) {
          this.setState({
              allType:false
          },()=>{
              console.log(this.state.allType)
          })
        let id = item.Id
        let indexId = this.state.isType.indexOf(id);
        if (indexId < 0) {
          this.state.isType.push(id);
        } else{
          if (this.state.isType.length > 1) {
            this.state.isType.splice(indexId, 1)
          }
          
        }
        // this.visaTypeId=this.isType.join(',')
        this.setState({
            isType: this.state.isType,
            visaTypeId: this.state.isType.join(',')
        },()=>{
            console.log(this.state.isType)
            console.log(this.state.visaTypeId)
        })
      }
      //全部签证类型
      checkAllType() {
        this.setState({
            allType : true,
            isType:[],
            visaTypeId:''
          },()=>{
              console.log(this.state.allType)
              console.log(this.state.isType)
              console.log(this.state.visaTypeId)
          })
        
      }

      // 特色服务
      serviceCheck(item) {
           this.setState({
             allService: false
           }, () => {
             console.log(this.state.allService)
           })
        let id = item.Id
        let indexId = this.state.isService.indexOf(id);
        if (indexId < 0) {
          this.state.isService.push(id);
        } else{
          if (this.state.isService.length > 1) {
            this.state.isService.splice(indexId, 1)
          }
        }
        // this.labels=this.isService.join(',')
        this.setState({
          isService: this.state.isService,
          labels: this.state.isService.join(',')
        }, () => {
          console.log(this.state.isService)
          console.log(this.state.labels)
        })
      }
      //全部特色服务
      checkAllService() {
         this.setState({
           allService: true,
           isService: [],
           labels: ''
         }, () => {
           console.log(this.state.allService)
           console.log(this.state.isService)
           console.log(this.state.labels)
         })
      }

      // 入境次数
      entryNumCheck(item) {
          this.setState({
            allEntry: false
          }, () => {
            console.log(this.state.allEntry)
          })
        let id = item.Id
        let indexId = this.state.isEntryNum.indexOf(id);
        if (indexId < 0) {
          this.state.isEntryNum.push(id);
        } else{
          if (this.state.isEntryNum.length > 1) {
            this.state.isEntryNum.splice(indexId, 1)
          }
          
        }
        // this.entryTimesId=this.isEntryNum.join(',')
        this.setState({
          isEntryNum: this.state.isEntryNum,
          entryTimesId: this.state.isEntryNum.join(',')
        }, () => {
          console.log(this.state.isEntryNum)
          console.log(this.state.entryTimesId)
        })
      }
      //全部入境次数
      checkAllEntry() {
         this.setState({
           allEntry: true,
           isEntryNum: [],
           entryTimesId: ''
         }, () => {
           console.log(this.state.allEntry)
           console.log(this.state.isEntryNum)
           console.log(this.state.entryTimesId)
         })
      }


      


// 重置
resetMore(){
  this.setState({
    isType: [],
    isService: [],
    isEntryNum: [],
    entryTimesId: '',
    departCityId:'',
    Labels:'',
    visaTypeId:'',
    moreSelect: '更多筛选',
    allType:true,
    allEntry:true,
    allService:true,
  },()=>{
    console.log(this.state.isType)
    console.log(this.state.isService)
    console.log(this.state.isEntryNum)
    this.hideSelect(1)
    this.hideSelect(2)
    this.hideSelect(3)
    this.hideSelect(4)
  })
}
 // 全部国家
 allCountryClick() {
   this.setState({
     allCountry: true,
     allCountryFlag: false,
     itemCountry: -1,
     rightCity: false,
     countryId: '',
     isCity:-1,
     pi: 1,
     listData: []
   },()=>{
       console.log(this.state.allCountry)
       console.log(this.state.allCountryFlag)
       console.log(this.state.itemCountry)
       console.log(this.state.rightCity)
       console.log(this.state.countryId)
       console.log(this.state.showDestination)
       console.log(this.state.listData)
       console.log(this.state.isCity)
       this._getList()
        this.hideSelect(1)
        this.hideSelect(2)
        this.hideSelect(3)
        this.hideSelect(4)
   })

   
 }
 // 显示国家下的城市
 itemCountryClick(item, index) {
     this.setState({
          cityData:[],
          allCountry : false,
          allCountryFlag : true,
          itemCountry : index,
          rightCity : true,
          isCity:-1
     },()=>{
        console.log(this.state.cityData)
        console.log(this.state.allCountry)
        console.log(this.state.allCountryFlag)
        console.log(this.state.itemCountry)
        console.log(this.state.rightCity)
        console.log(this.state.isCity)
        console.log(this.state.cityData)
         this.setState({
            cityData: this.state.leftCountry[index].items
         },()=>{
             console.log(this.state.cityData)

         })
     })
    
 }
// 选择城市
cityCheck(item, index) {
    this.setState({
         allCity : false,
         isCity : index,
         cityID : item.ID,
         showDestination : false,
         countryId : item.value,
         pi : 1,
         visaListLi: [],
    },()=>{
        console.log(this.state.allCity)
        console.log(this.state.isCity)
        console.log(this.state.cityID)
        console.log(this.state.showDestination)
        console.log(this.state.countryId)
        console.log(this.state.visaListLi)
        this.hideSelect(1)
        this.hideSelect(2)
        this.hideSelect(3)
        this.hideSelect(4)
        this._getList()
    })
    

  }
// 常住地
usualCityCheck(item, index) {
    this.setState({
         allUsualCity: false,
         isUsualCity: index,
         localityId: item.Id,
         pi: 1,
         visaListLi: [],
    },()=>{
        console.log(this.state.allUsualCity)
        console.log(this.state.isUsualCity)
        console.log(this.state.localityId)
        console.log(this.state.visaListLi)
        this.hideSelect(1)
        this.hideSelect(2)
        this.hideSelect(3)
        this.hideSelect(4)
        this._getList()
    })
    
    
  }
  // 不限地区
  checkAllusualCity() {
      this.setState({
          allUsualCity:true,
          isUsualCity:-1,
          localityId:''
      },()=>{
          console.log(this.state.allUsualCity)
          console.log(this.state.isUsualCity)
          console.log(this.state.localityId)
          this.hideSelect(1)
          this.hideSelect(2)
          this.hideSelect(3)
          this.hideSelect(4)
          this._getList()
      })
   
    
  }

// 选择综合排序
comprehensiveCheck(item,index){
 if (item.Id != 'auto') {
   this.setState({
     comprehensiveFlag: index,
     orderBys: item.Id,
     comprehensive: false,
     sortTextFlag: true,
     pi: 1,
     visaListLi: [],
    //  sortText: item.Name
   }, () => {
     console.log(this.state.comprehensiveFlag)
     console.log(this.state.comprehensive)
     console.log(this.state.sortTextFlag)
     console.log(this.state.orderBys)
     this._getList()
   })
 } else {
   this.setState({
     comprehensiveFlag: index,
     orderBys: item.Id,
     comprehensive: false,
     sortTextFlag: false,
     pi: 1,
     visaListLi: [],
    //  sortText: item.Name
   }, () => {
     console.log(this.state.comprehensiveFlag)
     console.log(this.state.orderBys)
     console.log(this.state.comprehensive)
     console.log(this.state.sortTextFlag)
     this._getList()
   })
 }
}
onChange(value) {
  this.setState({
    keyWord: value,
    clearFlag:true
  }, () => {
    console.log(this.state.keyWord)
    if (this.state.keyWord=='') {
      this.setState({
        clearFlag:false
      },()=>{
        console.log(this.state.clearFlag)
      })
    }
  })
  // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  return this.state.keyWord
}
// 清除关键字
clearKeyWord(){
  this.setState({
    keyWord: '',
    clearFlag:false,
    pi: 1,
    visaListLi: []
  }, () => {
    console.log(this.state.keyWord)
    console.log(this.state.clearFlag)
    this._getList()
  })
}
// 搜索关键字
searchClick(){
  this.setState({
    pi: 1,
    visaListLi: [],
    keyWord:this.state.keyWord
  }, () => {
    this._getList()
  })
}
// 确定筛选条件
sureSubmit(){
    // isType: [],
    //   isService: [],
    //   isEntryNum: [],
  if (this.state.isType.length > 0 || this.state.isService.length > 0 || this.state.isEntryNum.length > 0) {
    console.log('筛选(更多)筛选(更多)筛选(更多)')
    this.setState({
      moreSelect: '筛选(更多)',
      textSelectFlag: true
    }, () => {
      console.log(this.state.moreSelect)
      console.log(this.state.textSelectFlag)
    })
  } else {
    this.setState({
      moreSelect: '更多筛选',
      textSelectFlag: false
    }, () => {
      console.log(this.state.moreSelect)
      console.log(this.state.textSelectFlag)
    })
  }
  this.hideSelect(1)
  this.hideSelect(2)
  this.hideSelect(3)
  this.hideSelect(4)
  this.setState({
    pi:1,
    visaListLi: []
  },()=>{
    this._getList()
  })
  
}
gotoDetail(item){
  Taro.navigateTo({
    url: `/pages/visa/pages/visaDetail/index?id=${item.Id}`
  })
}
  reduction() {//还原初始设置
    const time = 0.5;
    this.setState({
        upDragStyle: {//上拉图标样式
            height: 0 + 'px',
            transition: `all ${time}s`
        },
        dargState: 0,
        dargStyle: {
            top: 0 + 'px',
            transition: `all ${time}s`
        },
        downDragStyle: {
            height: 0 + 'px',
            transition: `all ${time}s`
        },
        scrollY:true
    })
    setTimeout(() => {
        this.setState({
            dargStyle: {
                top: 0 + 'px',
            },
            upDragStyle: {//上拉图标样式
                height: 0 + 'px'
            },
            pullText: '上拉加载更多',
            downText: '下拉刷新'
        })
    }, time * 1000);
}
touchStart(e) {
    this.setState({
        start_p: e.touches[0]
    })
}
touchmove(e) {
let that = this
    let move_p = e.touches[0],//移动时的位置
        deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
        deviationY = 70,//拉动长度（低于这个值的时候不执行）
        maxY = 100;//拉动的最大高度

    let start_x = this.state.start_p.clientX,
        start_y = this.state.start_p.clientY,
        move_x = move_p.clientX,
        move_y = move_p.clientY;


    //得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
        let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
  if (move_y - start_y > 0) {//下拉操作
    if (pY >= deviationY) {
      this.setState({ dargState: 1, downText: '释放刷新' })
    } else {
      this.setState({ dargState: 0, downText: '下拉刷新' })
    }
    if (pY >= maxY) {
      pY = maxY
    }
    this.setState({
      dargStyle: {
        top: pY + 'px',
      },
      downDragStyle: {
        height: pY + 'px'
      },
      scrollY:false//拖动的时候禁用
    })
  }
  if (start_y - move_y > 0) {//上拉操作
    console.log('上拉操作')
    if (pY >= deviationY) {
      this.setState({ dargState: -1, pullText: '释放加载更多' })
    } else {
      this.setState({ dargState: 0, pullText: '上拉加载更多' })
    }
    if (pY >= maxY) {
      pY = maxY
    }
    this.setState({
      dargStyle: {
        top: -pY + 'px',
      },
      upDragStyle: {
        height: pY + 'px'
      },
      scrollY: false//拖动的时候禁用
    })
  }

    }
}
pull() {//上拉
// console.log('上拉')
if (this.state.piMax >= this.state.pi) {
    this._getList()
}else{
  this.setState({ dargState: -1, pullText: '没有更多了' })
}
}
down() {//下拉
// console.log('下拉')
this.setState({
  payStatusId:'',
  refundStatusId:'',
  pi:1,
  visaListLi: []
},()=>{
  console.log(this.state.visaListLi)
  console.log(this.state.pi)
  this._getList()
  
})
}
ScrollToUpper() { //滚动到顶部事件
// console.log('滚动到顶部事件')
    // this.props.Upper()
}
ScrollToLower() { //滚动到底部事件
// console.log('滚动到底部事件')
    // this.props.Lower()
}
touchEnd(e) {
    if (this.state.dargState === 1) {
        this.down()
    } else if (this.state.dargState === -1) {
        this.pull()
    }
    this.reduction()
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
    let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;

    const {destination,chuXingDay,showSelectFlag,comprehensiveFlag,comprehensiveData,visaListLi,clearFlag,textSelectFlag,sortText,moreSelect,showNullFlag,miDidi,isType,typeModelData,entryNumData,serviceModelData,showDestination,showUsual,cityData,usualCityData} = this.state
    return (
      <View className='ticketList'>
        <View className="topBox">
          <View className="box">
            <View className='searchBox'>
              <View className="inputBox">
                <View className="imgBox">
                    <Image className='souSuoIcon' src={souSuoIcon}/>
                </View>
                <AtInput style='width:80%' value={this.state.keyWord} placeholder="搜索关键字"  onChange={this.onChange.bind(this)} onConfirm={this.searchClick.bind(this)}/>
                <View className="imgBox" onClick={this.clearKeyWord.bind(this)}>
                    {clearFlag==true&&<Image className='closeIcon' src={clearIcon}/>}
                </View>
              </View>
              <View className="searchBtn" onClick={this.searchClick.bind(this)}>
                  搜索
              </View>
            </View>
            <View className='btnBox'>
            {/* 更多筛选 */}
              <View className="selectBox" onClick={this.showSelect.bind(this,1)}>
                <View className="itemBox">
                  <Text className={textSelectFlag==true?'selectText selectTextOn':'selectText'}>{moreSelect}</Text>
                  <View className="selectIcon">
                    <Image className='sanJiaoIcon' src={textSelectFlag==true?sanJiaoCheckIcon:sanJiaoIcon}/>
                  </View>
                  
                </View>
              </View>
              {/* 目的地 */}
              <View className="selectBox" onClick={this.showSelect.bind(this,2)}>
                <View className="itemBox">
                  <Text className='selectText' className={this.state.isCity>-1?'selectText selectTextOn':'selectText'}>{miDidi}</Text>
                  <View className="selectIcon">
                    <Image className='sanJiaoIcon' src={this.state.isCity>-1?sanJiaoCheckIcon:sanJiaoIcon}/>
                  </View>
                  
                </View>
              </View>
              {/* 常住地 */}
              <View className="selectBox" onClick={this.showSelect.bind(this,3)}>
                <View className="itemBox">
                  <Text className='selectText' className={this.state.isUsualCity>-1?'selectText selectTextOn':'selectText'}>{changZhuDi}</Text>
                  <View className="selectIcon">
                    <Image className='sanJiaoIcon' src={this.state.isUsualCity>-1?sanJiaoCheckIcon:sanJiaoIcon}/>
                  </View>
                  
                </View>
              </View>
              {/* 综合排序 */}
              <View className="selectBox" onClick={this.showSelect.bind(this,4)}>
                <View className="itemBox">
                  <Text className='selectText' className={sortTextFlag==true?'selectText selectTextOn':'selectText'}>{sortText}</Text>
                  <View className="selectIcon">
                    <Image className='sanJiaoIcon' src={sortTextFlag==true?sanJiaoCheckIcon:sanJiaoIcon}/>
                  </View>
                  
                </View>
              </View>
            </View>

            {/* 筛选弹层 */}
            {/* 更多筛选 */}
            {showSelectFlag&&<View className="selectMask">
              <View className='selectContent'>
              {typeModelData.length>0&&<View className="itemModel">
                  <View className="moreH5">签证类型</View>
                  <View className='itemSelectBox'>
                   <View className={this.state.allType==true?'itemSelect itemSelectOn':'itemSelect'} key={index} onClick={this.checkAllType.bind(this)}>全部</View>
                    {typeModelData.map((item,index)=>{
                      return (
                        <View className={this.state.isType.indexOf(item.Id)>-1?'itemSelect itemSelectOn':'itemSelect'} key={index} onClick={this.typeCheck.bind(this,item)}>{item.Name}</View>
                      )
                    })}
                  </View>
                </View>}
                {serviceModelData.length>0&&<View className="itemModel">
                  <View className="moreH5">特色服务</View>
                  <View className='itemSelectBox'>
                  <View className={this.state.allService==true?'itemSelect itemSelectOn':'itemSelect'} key={index} onClick={this.checkAllService.bind(this)}>全部</View>
                    {serviceModelData.map((item,index)=>{
                      return (
                        <View className={this.state.isService.indexOf(item.Id)>-1?'itemSelect itemSelectOn':'itemSelect'} key={index} onClick={this.serviceCheck.bind(this,item)}>{item.Name}</View>
                      )
                    })}
                  </View>
                </View>}
                {entryNumData.length>0&&<View className="itemModel">
                  <View className="moreH5">入境次数</View>
                  <View className='itemSelectBox'>
                  <View className={this.state.allEntry==true?'itemSelectDay itemSelectDayOn':'itemSelectDay'} onClick={this.checkAllEntry.bind(this)}>不限次数</View>
                    {entryNumData.map((item,index)=>{
                      return (
                        <View className={this.state.isEntryNum.indexOf(item.Id)>-1?'itemSelectDay itemSelectDayOn':'itemSelectDay'} key={index} onClick={this.entryNumCheck.bind(this,item)}>{item.Name}</View>
                      )
                    })}
                  </View>
                </View>}
              </View>
              <View className="maskBtn">
                <View className="cancelBtn" onClick={this.resetMore.bind(this)}>取消</View>
                <View className="sureBtn" onClick={this.sureSubmit}>确定</View>
              </View>
            </View>}
            
            {/* 目的地 */}
            {showDestination&&<View className="muDiDiMask">
                <View className="destination" >
                    <View className={this.state.allCountryFlag==true?'leftBox leftBoxActive':'leftBox'}>
                    < View className = 'destinationOl' >
                        {this.state.allCountry==true&&<View className="destinationLi leftActive" ><View className='mididiallSpan' onClick={this.allCountryClick.bind(this)}>全部国家</View></View>}
                        {this.state.allCountryFlag==true&&<View className="destinationLi leftBoxActive" ><View className='mididiallSpan' onClick={this.allCountryClick.bind(this)}>全部国家</View></View>}
                        {this.state.leftCountry.map((item,index)=>{
                            return (
                                <View className={index==this.state.itemCountry?'destinationLi leftActive':'destinationLi'} key={index} onClick={this.itemCountryClick.bind(this,item,index)}><View className='mididiallSpan mididiSpan'>{item.name}</View></View>
                            )
                        })}
                        
                    </View>
                    </View>
                    {this.state.rightCity==true&&<View className="rightBox">
                    < View className = 'cityDataUl' >
                        {cityData.map((item,index)=>{
                            return (
                                <View key={index} className={index==this.state.isCity?'cityDataLi cityActive':'cityDataLi'} onClick={this.cityCheck.bind(this,item,index)}
                            >{item.name}</View>
                            )
                        })}
                        
                    </View>
                    </View>}
                </View>    
            </View>}
            {/* 常住地 */}
            {this.state.showUsual&&<View className="changZhuDi">
               <View className="usualBox">
                    <View className="moreH5">常住地</View>
                    <View className='usualUl'>
                        <View className={this.state.allUsualCity==true?'usualLi cityActive':'usualLi'} onClick={this.checkAllusualCity.bind(this)}>不限地区</View>
                        {usualCityData.map((item,index)=>{
                            return (
                                <View key={index} className={index==this.state.isUsualCity?'usualLi cityActive':'usualLi'} onClick={this.usualCityCheck.bind(this,item,index)}>{item.Name}</View>
                            )
                        })}
                        
                    </View>
                </View> 
            </View>}
            {/* 综合排序 */}
            {comprehensive&&<View className="comprehensive">
              {comprehensiveData.map((item,index)=>{
                return (
                  <View className={comprehensiveFlag==index?"comprehensiveLi comprehensiveLiOn":"comprehensiveLi"} key={index} onClick={this.comprehensiveCheck.bind(this,item,index)}>{item.Name}</View>
                )
              })}
                    
            </View>}


          </View>
        </View>
        {showNullFlag&&<View className="nullText" style='color:#CECECE;padding-top:50%;text-align:center'>暂无数据</View>}
        {visaListLi.length>0&&<View className='pageBox'>
            <View className='dragUpdataPage'>
                <View className='downDragBox' style={downDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.downText}</Text>
                </View>
                <ScrollView
                    style={dargStyle}
                    onTouchMove={this.touchmove}
                    onTouchEnd={this.touchEnd}
                    onTouchStart={this.touchStart}
                    onScrollToUpper={this.ScrollToUpper}
                    onScrollToLower={this.ScrollToLower}
                    className='dragUpdata'
                    scrollY={this.state.scrollY}
                    scrollWithAnimation>
                    <View style='width:100%;height:100vh;' >
                      <View className="visaList">
                        <View className='visaListUl'>
                            {visaListLi.map((items,indexs)=>{
                            return (
                                <View className='visaListLi' key={indexs} onClick={this.gotoDetail.bind(this,items)}>
                                <View className="imgBox">
                                    <Image className="leftImg" src={items.ImageUrl} />
                                </View>
                                <View className="rightBox">
                                    <View className='nameH5'>{items.Name}</View>
                                    <View className="textBox">
                                    <View className="jianNum">已售{items.SaleCount}件</View>
                                    <View className="price">¥{items.StartPrice}/人</View>
                                    </View>
                                    <View className="timeBox">
                                      <View className="timeImgBox">
                                        <Image className="shiJianIcon" src={shiJianIcon} />
                                      </View>
                                    <View className='timeBoxSpan'>预计办理时间：{items.ProcessDaysInfo}</View>
                                    </View> 
                                    {items.Labels.length>0&&<View className="biaoQian" >
                                    {items.Labels.map((item,index)=>{
                                    return (
                                        <View className='biaoQianSpan' key={index}>{item}</View>
                                    )
                                    })}
                                    </View>}
                                </View>
                                </View>
                            )
                            })}
                        </View>
                    </View>
                    </View>
                </ScrollView>
                <View className='upDragBox' style={upDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.pullText}</Text>
                </View>
            </View>
			</View>}
          {showSelectFlag&&<View className="tickertMask"></View>}
          {comprehensive&&<View className="tickertMask" onClick={this.hideSelect.bind(this,4)}></View>}
          {showDestination&&<View className="tickertMask" onClick={this.hideSelect.bind(this,2)}></View>}
          {showUsual&&<View className="tickertMask" onClick={this.hideSelect.bind(this,3)}></View>}
          {this.state.showLoading==true&&<AtToast isOpened={true} text="加载中" hasMask={true} duration={0}  status="loading" ></AtToast>}
    </View>
    );
  }
}