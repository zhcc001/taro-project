import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,SwiperItem} from '@tarojs/components'
import {AtIndexes,AtToast,AtSearchBar,AtInput } from "taro-ui"
import {tuiJianPosition,getArtic,getData,getVisaHotCity} from '../../../../api/visa'
import {shareTitle} from '../../../../api/commonVariable'
import souSuoIcon from './images/sousuo.png'
import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import icon4 from './images/icon4.png'
import icon5 from './images/icon5.png'
import sanJiaoIcon from './images/sanjiao.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '签证首页'
  }

  constructor(){
    super(...arguments)
    this.state={
      list:[],
      hotList:[],
      articList:[],
      prodouceTui:[]
    }
  }

  componentWillMount () {
    this.getBannerList()
    this._hot()
    this._artic()
    this._getProduct()
  }
  componentDidMount () {
    
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  // 轮播
  getBannerList() {
    getData()
      .then(res => {
        if (res.Success) {
          this.setState({
            list: res.Result
          }, () => {
            console.log(this.state.list)
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
// 热门目的地
_hot() {
  getVisaHotCity()
    .then(res => {
      if(res.Success){
        this.setState({
          hotList:res.Result
        },()=>{
          console.log(this.state.hotList)
        })
      }
    })
    .catch(err => {
     
    })
}
 //文章
 _artic() {
   getArtic()
     .then(res => {
       if(res.Success){
         this.setState({
            articList: res.Result
         },()=>{
           console.log(this.state.articList,'精选文章')
         })
         
       }
     })
     .catch(err => {
     })
 }
 //产品推荐
 _getProduct() {
   tuiJianPosition()
     .then(res => {
       if (res.Success) {
         this.setState({
           prodouceTui: res.Result
         }, () => {
           console.log(this.state.prodouceTui)
         })

       }
     })
     .catch(err => {})
 }
//  选择国家
 gotoCity(){
  Taro.navigateTo({
    url:`/pages/visa/pages/selectCity/index`
  })
 }
//  进入列表
gotoList(num,item){
  if(num==1){
    Taro.navigateTo({
      url: `/pages/visa/pages/visaList/index`
    })
  }else{
    Taro.navigateTo({
      url: `/pages/visa/pages/visaList/index?countryId=${item.TargetUrl}`
    })
    
  }
  
}
// //  进入文章详情页
// gotoArticleDetail(item) {
//   Taro.navigateTo({
//     url: `/pages/visa/pages/articleDetail/index?id=${item.Id}`
//   })
// }
gotoDetail(item){
  if (item.ProductTypeId == 101) {
      if (item.ProductCategoryId == 10000) {
         Taro.navigateTo({
           url: `/pages/touristRoutes/pages/routesDetail/index?ID=${item.Id}`
         })
      } else if (item.ProductCategoryId == 10043) {
       
         Taro.navigateTo({
           url: `/pages/admissionTicket/pages/admissionDetail/index?ID=${item.Id}`
         })
      }else{
        Taro.showToast({
          title: '暂未开放',
          icon: 'none',
          mask: true
        })
      }
    } else if (item.ProductTypeId == 107) {
       Taro.navigateTo({
         url: `/pages/visa/pages/visaDetail/index?id=${item.Id}`
       })
    }else if(item.ProductTypeId==105){
      Taro.navigateTo({
        url: `/pages/visa/pages/articleDetail/index?id=${item.Id}`
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
    const {list,hotList,prodouceTui,articList}=this.state
    return (
        <View className='visaIndex'>
          {/* <!-- 顶部定位、省市区、搜索 --> */}
          <View className="top">
          <View className="topBox">
            {/* <!-- <View className="address" v-on:click="enterCity()">
              <span className="city">上海</span>
              <img className="downIcon" src="./sanjiao1.png" alt="">
            </View> --> */}
            <View className="search">
              <View className="souSuoBox">
              <Image className="souSuo" src={souSuoIcon} />
              </View>
              <AtInput style='width:80%' placeholder="输入签证国家或地区" onFocus={this.gotoCity.bind(this)}  />
            </View>
          </View>
          </View>
          <View className='bannerBox'>
            <Swiper
                className='test-h'
                circular
                indicatorDots
                indicatorColor = '#E6E6E6'
                indicatorActiveColor = '#FFB701'
                autoplay='true'>
                {list.map((item, index) => {
                  return (
                    <SwiperItem key={index} className='swiper_item' >
                      <View className='big_image_wrap'>
                        <Image mode='aspectFill' className='big_image' src={item.ImageUrl}/>
                        {/* <View className='big_title'>{item.title}</View> */}
                      </View>
                    </SwiperItem>
                  )
                })}
          </Swiper>
        </View>
         {/* <!-- 热门目的地 --> */}
          {hotList.length>0&&<View className="hotDestination">
            <View className='titleH2'>热门国家</View>
            <View className="hotCountry">
              <View className='hotCountryUl'>
                {hotList.map((item,index)=>{
                  return (
                    <View className='hotCountryLi' key={index} onClick={this.gotoList.bind(this,2,item)}>
                      <Image className="countryImg" src={item.ImageUrl} />
                      <View className="countryBox">
                        <View className="line"></View>
                        <View className="countryName">{item.Title}</View>
                        <View className="countryPrice">¥{item.SubTitle}起</View>
                      </View>
                    </View>
                  )
                })}
                
              </View>
            </View>
          </View>}

           {/* <!-- 精选文章 --> */}
          {articList.length>0&&<View class="selectArticle">
            <View className='titleH2'>精选文章</View>
            <View class="articleBox">
              <Swiper style = 'height:120px;'
                    className='test-h'
                    displayMultipleItems={articList.length>=2?1.5:articList.length}>
                    {articList.map((item, index) => {
                    return (
                      <SwiperItem key={index} className='swiper_item' onClick={this.gotoDetail.bind(this,item)}>
                      <View className={`artic${index}`}>
                            <View class="service-desc">
                              <View class="service-title1">{item.Name}</View>
                              <View class="service-title2">{item.Feature}</View>
                              <View class="service-line"></View>
                              </View>
                            </View>
                      </SwiperItem>
                    )
                })}
              </Swiper>
            </View>
          </View>}

          {/* <!-- 办理流程 --> */}
          <View class="processingFlow">
            <View  className='titleH2'>办理流程</View>
            <View class="processImg">
              <View className='processImgUl'>
                <View className='processImgLi'>
                  <View>
                    <Image className="processIcon"  src={icon1} />
                    <View className='processSpan'>客户提交订单</View>
                  </View>
                </View>
                <View className="sanjiaoLi"><Image className="sanjiaoIcon"  src={sanJiaoIcon} /></View>
                <View className='processImgLi'>
                  <View>
                    <Image className="processIcon"  src={icon2} />
                    <View className='processSpan'>提交签证资料</View>
                  </View>
                </View>
                <View className="sanjiaoLi"><Image className="sanjiaoIcon" src={sanJiaoIcon} /></View>
                <View className='processImgLi'>
                  <View>
                    <Image className="processIcon"  src={icon3} />
                    <View className='processSpan'>在线审核资料</View>
                  </View>
                </View>
                <View className="sanjiaoLi"><Image className="sanjiaoIcon" src={sanJiaoIcon} /></View>
                <View className='processImgLi'>
                  <View>
                    <Image className="processIcon"  src={icon4} />
                    <View className='processSpan'>送签／面试</View>
                  </View>
                </View>
                <View className="sanjiaoLi"><Image className="sanjiaoIcon"  src={sanJiaoIcon} /></View>
                <View className='processImgLi'>
                  <View>
                    <Image className="processIcon"  src={icon5} />
                    <View className='processSpan'>签证出签成功</View>
                  </View>
                </View>
              </View>
            </View>
          </View>

           {/* <!-- 签证列表 --> */}
          <View class="visaListBox">
            {/* <!-- <div class="tableTitle">
              <ol>
                <li :class="{active:index==tableTitleFlag}" v-for="(item,index) in countryTableList" :key='index' v-on:click="countryClick(item,index)"><span>{{item.Name}}</span><i :class="{lineI:true,lineActive:index==tableTitleFlag}"></i></li>
              </ol>
            </div> --> */}
            <View className="visaList">
              {prodouceTui.length>0&&<View className='visaListUl'>
                {prodouceTui.map((items,indexs)=>{
                  return (
                    <View className='visaListLi' key={indexs} onClick={this.gotoDetail.bind(this,items)}>
                      <View className="imgBox">
                        <Image className="leftImg" src={items.ImageUrl} />
                      </View>
                      <View className="rightBox">
                        <View className='nameH5'>{items.Name}</View>
                        <View className="textBox">
                          <View className="jianNum">已售{items.SaleCount}件</View>
                          <View className="price">¥{items.SalePrice}/人</View>
                        </View>
                        {/* <!-- <View className="timeBox">
                          <img className="shiJianIcon" src="./shijian.png" alt="">
                          <span >预计办理日期7-12个工作日</span>
                        </View> --> */}
                        
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
              </View>}
            <View className='gotoMore' onClick={this.gotoList.bind(this,1)}>查看更多</View>
            </View>
          </View>
        </View>
    );
  }
}