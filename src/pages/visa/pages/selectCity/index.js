import Taro , { Component,Config } from '@tarojs/taro';
import { View, Text , Button,Input} from '@tarojs/components';
import sousuo from './images/sousuo.png'
import dingwei from './images/dingwei.png'
import {AtIndexes,AtToast,AtSearchBar,AtInput } from "taro-ui"
import { getCountry,getVisaHotCity} from '../../../../api/common'
import {shareTitle} from '../../../../api/commonVariable'
// import newDingIcon from './images/dingwei.png'
import './index.scss'
export default class Index extends Component {

   config = {
       navigationBarTitleText: '选择国家'
  }

    constructor(props) {
      super(...arguments)
      this.state = {
        menu:[
          {
             title: '国家',
          },
          // {
          //   title: '港澳台/境外城市',
          // }
        ],
        visaHisCountry:[],
          hotCountry:[],
          cityList : [],
          keyWord:'',
          showLoading:false,
          linshiArr:[],
          idArr:[],
          visaHisLinShiArr:[],
          latitude:'',
          longitude:'',
          dingWeiCity:{}
    }
  }
  
  componentWillMount() {
    if (Taro.getStorageSync('visaHisCountry')) {
      this.state.visaHisCountry = JSON.parse(Taro.getStorageSync('visaHisCountry'))
    }
    if (Taro.getStorageSync('visaHisLinShiArr')) {
      this.state.visaHisLinShiArr = JSON.parse(Taro.getStorageSync('visaHisLinShiArr'))
    }
    this._getCountry()
    this._hot()
  }
  componentDidMount () {
    
  } 
 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
 
  // 热门目的地
  _hot(){
    getVisaHotCity()
      .then(res => {
        this.setState({
          hotCountry:res.Result
        })
        console.log(this.hotCountry)
        
      })
      .catch(err => {
        // if (!err.message) {
        //   return
        // }
      })
  }
  onClick (item) {
    console.log('onClick')
    let name=item.neme
    let value=item.value
    let hisObj={value:`${item.value}`,Name:`${item.name}`}
    if (Taro.getStorageSync('visaHisCountry')) {
      let hisArr = JSON.parse(Taro.getStorageSync('visaHisCountry'))
      console.log()
      let hisLen = JSON.parse(Taro.getStorageSync('visaHisCountry')).length
      console.log(hisLen,'his的长度')
      if(hisLen<6){
        hisArr.map((t,i)=>{
          console.log('循环')
          // this.state.hisLinShiArr.push(item.three)
          let hisIndex = this.state.visaHisLinShiArr.indexOf(value)
          console.log(hisIndex,'下标')
          if(hisIndex<0){
            hisArr.push(hisObj)
            this.state.visaHisLinShiArr.push(value)
          }
          console.log(this.state.visaHisLinShiArr, 'this.state.visaHisLinShiArr')
          Taro.setStorageSync(`visaHisLinShiArr`, JSON.stringify(this.state.visaHisLinShiArr))
        })
       
        Taro.setStorageSync(`visaHisCountry`, JSON.stringify(hisArr))
        
      }
      
    }else{
      let hisNew=[hisObj]
      this.state.visaHisLinShiArr.push(value)
      Taro.setStorageSync(`visaHisCountry`, JSON.stringify(hisNew))
      Taro.setStorageSync(`visaHisLinShiArr`, JSON.stringify(this.state.visaHisLinShiArr))
    }
    Taro.navigateTo({
      url: `/pages/visa/pages/visaList/index?countryId=${item.value}`
    })
  };
  hisOnClick(item){
    Taro.navigateTo({
      url: `/pages/visa/pages/visaList/index?countryId=${item.value}`
    })
  }
  hotOnClick(item){
    Taro.navigateTo({
      url: `/pages/visa/pages/visaList/index?countryId=${item.value}`
    })
  }
  keyWordChange = (event) => {
    this.setState({
      keyWord: event.target.value
    })
    // return this.state.Name
    
    
  }
  // 获取城市列表
  _getCountry() {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    getCountry(this.state.keyWord)
      .then(res=>{
        if(res.Success){
          this.setState({
            cityList: res.Result,
            showLoading: false,
            // linshiArr:res.Result
          }, () => {
            Taro.hideLoading()
          })
        }
        
        
      })
        
      .catch(err => {
        if (!err.message) {
          return
        }
        
      })
  }
  
  onChange (value) {
    this.setState({
      keyWord: value
    }, () => {
      if(this.state.keyWord!=''){
        this._getCountry()
      }
      
    })
  }
  onActionClick () {
    console.log('开始搜索')
      this._getCountry()
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
      const {cityList,menu,visaHisCountry,dingWeiCity} =this.state
    return (
      <View className='selectCity'>
      {/* {this.state.showLoading==true&&<AtToast isOpened={true} text="加载中" duration={0}  status="loading"></AtToast>} */}
        <View class="input-menu">
        <View class="select-input">
          <View class="select">
          <View className='searchImgBox'>
              <Image className='sousuoIcon' src={sousuo} />
              </View>
              <AtInput style='width:80%' value={this.state.keyWord} placeholder="输入签证国家或地区"  onChange={this.onChange.bind(this)}/>
          </View>
        </View>
    </View>
    <View className='listBox' style='height: 100vh;'>
    <AtIndexes
          list={cityList}
          onClick={this.onClick.bind(this)}
        >
        <View className='cityNav' >
            <View className='guiNei'>
         {visaHisCountry.length>0&&<View class="searchHistory">
            <View className='dingweiH6'>历史搜索</View>
            <View className='cityOlBox'>
               {visaHisCountry.map((item,index)=>{
                 return (
                  <View className='cityLiBox' onClick={this.hisOnClick.bind(this,item)}>{item.Name}</View>
                 )
                })
              }
            </View>
          </View>}
          {hotCountry.length>0&&<View class="hotCountry">
            <View className='dingweiH6'>热门国家</View>
            <View className='cityOlBox'>
               {hotCountry.map((item,index)=>{
                 return (
                  <View className='cityLiBox' onClick={this.hotOnClick.bind(this,item)}>{item.Title}</View>
                 )
                })
              }
            </View>
          </View>}
            </View>
        </View>
          <View className='dingweiH6'>国家选择</View>
        </AtIndexes>
        </View>
      </View>
    );
  }
}
