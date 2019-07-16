import Taro , { Component,Config } from '@tarojs/taro';
import { View, Text , Button,Input} from '@tarojs/components';
import sousuo from './images/sousuo.png'
import dingwei from './images/dingwei.png'
import {AtIndexes,AtToast,AtSearchBar,AtInput } from "taro-ui"
import {getCity,getHotCity,getloction} from '../../api/common'
import {shareTitle} from '../../api/commonVariable'
// import newDingIcon from './images/dingwei.png'
import './index.scss'
export default class Index extends Component {

   config = {
       navigationBarTitleText: '选择城市'
  }

    constructor(props) {
      super(...arguments)
      this.state = {
        menu:[
          {
             title: '国内城市',
          },
          // {
          //   title: '港澳台/境外城市',
          // }
        ],
        hisCountry:[],
          hotCountry:[],
          cityList : [],
          keyWord:'',
          showLoading:false,
          linshiArr:[],
          idArr:[],
          hisLinShiArr:[],
          latitude:'',
          longitude:'',
          dingWeiCity:{}
    }
  }
  
  componentWillMount() {
      this._weiXingetLoction()
    if(Taro.getStorageSync('hisCountry')){
      this.state.hisCountry=JSON.parse(Taro.getStorageSync('hisCountry'))
    }
    if(Taro.getStorageSync('hisLinShiArr')){
      this.state.hisLinShiArr=JSON.parse(Taro.getStorageSync('hisLinShiArr'))
    }
    this._getCity()
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
        this._getLoction()
      })
    })
  }
  _getLoction() {
    getloction(this.state.latitude, this.state.longitude)
      .then(data => {
        if (data.Success) {
          this.setState({
            dingWeiCity: data.Result
          })
          // Taro.setStorageSync(`startCityObj`, JSON.stringify(data.Result))


        } else {

        }
      })
  }
  // 点击定位
  dingWeiFun(){
    if (this.$router.params.type == 1) {
       Taro.setStorageSync(`startCityObj`, JSON.stringify(this.state.dingWeiCity))
    } else if (this.$router.params.type == 2){
      Taro.setStorageSync(`endCityObj`, JSON.stringify(this.state.dingWeiCity))
    }
   
    Taro.switchTab({
      url: `/pages/index/index`
    })
  }
  // 热门目的地
  _hot(){
    getHotCity()
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
    let hisObj={Code:`${item.value}`,Name:`${item.name}`}
    if(this.$router.params.type==1){
      let startCityObj={Code:`${item.value}`,Name:`${item.name}`}
      Taro.setStorageSync(`startCityObj`, JSON.stringify(startCityObj))
    }else{
    let endCityObj={Code:`${item.value}`,Name:`${item.name}`}
      Taro.setStorageSync(`endCityObj`, JSON.stringify(endCityObj))
    }
    if(Taro.getStorageSync('hisCountry')){
      let hisArr=JSON.parse(Taro.getStorageSync('hisCountry'))
      console.log()
      let hisLen=JSON.parse(Taro.getStorageSync('hisCountry')).length
      console.log(hisLen,'his的长度')
      if(hisLen<6){
        hisArr.map((t,i)=>{
          console.log('循环')
          // this.state.hisLinShiArr.push(item.three)
          let hisIndex=this.state.hisLinShiArr.indexOf(value)
          console.log(hisIndex,'下标')
          if(hisIndex<0){
            hisArr.push(hisObj)
            this.state.hisLinShiArr.push(value)
          }
          console.log(this.state.hisLinShiArr,'this.state.hisLinShiArr')
          Taro.setStorageSync(`hisLinShiArr`, JSON.stringify(this.state.hisLinShiArr))
        })
       
        Taro.setStorageSync(`hisCountry`, JSON.stringify(hisArr))
        
      }
      
    }else{
      let hisNew=[hisObj]
      this.state.hisLinShiArr.push(value)
      Taro.setStorageSync(`hisCountry`, JSON.stringify(hisNew))
      Taro.setStorageSync(`hisLinShiArr`, JSON.stringify(this.state.hisLinShiArr))
    }
    Taro.switchTab({
      url:`/pages/index/index`
    })
  };
  hisOnClick(item){
    console.log('hisOnClick')
    if(this.$router.params.type==1){
      let startCityObj={Code:`${item.Code}`,Name:`${item.Name}`}
      Taro.setStorageSync(`startCityObj`, JSON.stringify(startCityObj))
    }else{
    let endCityObj={Code:`${item.Code}`,Name:`${item.Name}`}
      Taro.setStorageSync(`endCityObj`, JSON.stringify(endCityObj))
    }
    Taro.switchTab({
      url:`/pages/index/index`
    })
  }
  hotOnClick(item){
    if (this.$router.params.type == 1) {
      let startCityObj = {
        Code: `${item.SubTitle}`,
        Name: `${item.Title}`
      }
      Taro.setStorageSync(`startCityObj`, JSON.stringify(startCityObj))
    } else {
      let endCityObj = {
        Code: `${item.SubTitle}`,
        Name: `${item.Title}`
      }
      Taro.setStorageSync(`endCityObj`, JSON.stringify(endCityObj))
    }
    Taro.switchTab({
      url: `/pages/index/index`
    })
  }
  keyWordChange = (event) => {
    this.setState({
      keyWord: event.target.value
    })
    // return this.state.Name
    
    
  }
  // 获取城市列表
  _getCity(){
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    getCity(204,true,this.state.keyWord)
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
        this._getCity()
      }
      
    })
  }
  onActionClick () {
    console.log('开始搜索')
      this._getCity()
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
      const {cityList,menu,hisCountry,dingWeiCity} =this.state
    return (
      <View className='selectCity'>
      {/* {this.state.showLoading==true&&<AtToast isOpened={true} text="加载中" duration={0}  status="loading"></AtToast>} */}
        <View class="input-menu">
        <View class="select-input">
          <View class="select">
          <View className='searchImgBox'>
              <Image className='sousuoIcon' src={sousuo} />
              </View>
              <AtInput style='width:80%' value={this.state.keyWord} placeholder="搜索全国城市名称"  onChange={this.onChange.bind(this)}/>
          </View>
        </View>
        <View class="tabTitle">
          <View className='olBox'>
            {menu.map((item,index)=>{
              return (
                <View className='liBox'   onClick={this.chooseMenu.bind(index)}>
              <View className="itemTab">
                <Text className='itemp'>{item.title}</Text>
                {/* <Text className='itemi' if='index==tabFlag'></Text>   */}
              </View>
            </View>
              )
            })}
            
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
            <View class="dingWei">
           <View className='dingweiH6'>定位城市</View>
           <View className='dingweiOl'> 
             <View className='dingweiLi' onClick={this.dingWeiFun.bind(this)}>
               <View className='dingweiDiv'>
                 <Image className='dingweiIcon' src={dingwei} />
                 <Text className='dingweiText'>{dingWeiCity.Name}</Text>
               </View>
             </View>
             {/* <View className='dingweiLi'>
               <View className='dingweiDiv' onClick={this._weiXingetLoction.bind(this)}>
                 <Image className='dingweiIcon' src={dingwei} />
                 <Text className='dingweiText'>重新定位</Text>
               </View>
             </View>  */}
           </View>
         </View>
         {hisCountry.length>0&&<View class="searchHistory">
            <View className='dingweiH6'>历史搜索</View>
            <View className='cityOlBox'>
               {hisCountry.map((item,index)=>{
                 return (
                  <View className='cityLiBox' onClick={this.hisOnClick.bind(this,item)}>{item.Name}</View>
                 )
                })
              }
            </View>
          </View>}
          {hotCountry.length>0&&<View class="hotCountry">
            <View className='dingweiH6'>热门城市</View>
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
          <View className='dingweiH6'>城市选择</View>
        </AtIndexes>
        </View>
      </View>
    );
  }
}
