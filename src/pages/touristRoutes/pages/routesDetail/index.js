import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,ScrollView,RichText  } from '@tarojs/components'
import { AtTabs, AtTabsPane ,AtActivityIndicator,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast,AtInput} from 'taro-ui'
import {getRoutesDetail,likePro,getCanCellike,getlike} from '../../../../api/touristRoutes'
import likeIcon from './images/like.png'
import homeIcon from './images/home.png'
import keFuIcon from './images/kefu.png'
import likedIcon from './images/xinxin.png'
import {shareTitle} from '../../../../api/commonVariable'

import './index.scss'
import { isIndexedAccessTypeNode } from 'typescript';
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '线路详情页'
  }

  constructor(){
    super(...arguments)
    this.state={
        titleData:[{
            Id:1,
            Name:'行程精粹',
            hrefName: 'jingCun'
        }, {
            Id: 1,
            Name: '行程安排',
            hrefName: 'anPai'
        }, {
            Id: 1,
            Name: '费用说明',
            hrefName: 'feiYong'
        }, {
            Id: 1,
            Name: '预定须知',
            hrefName: 'yuDing'
        }, ],
        titleFlag:0,
        maoDianID:'',
        isFixed:false,
        ID:'',
        detailObj:{},
        nodes: [{children: [{
        style: 'width: 100%;margin: 0 auto;'
        }]}],
        likeFlag:false
    }
  }

  componentWillMount () {
      
    this.state.ID=this.$router.params.ID
    
  }
  componentDidMount () {
      this._getRoutesDetail()
      this._likePro()
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {
      
  } 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {}
//   获取是否收藏
    _likePro(){
        likePro(this.state.ID)
        .then(res=>{
            if(res.Success){
                this.setState({
                    likeFlag:res.Result
                },()=>{
                    console.log(this.state.likeFlag)
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

        })
    }
    _getLike() {
        if (this.state.likeFlag == true) {
            getCanCellike(this.state.ID)
            .then(res => {
                this.setState({
                    likeFlag:false
                },()=>{
                    console.log(this.state.likeFlag)
                })
                Taro.showToast({
                title: '已取消',
                icon: 'none',
                mask: true
                })
            })
            .catch(err => {
                
            })
        } else {
            getlike(this.state.ID)
            .then(res => {
                this.setState({
                likeFlag: true
                }, () => {
                console.log(this.state.likeFlag)
                })
                Taro.showToast({
                title: '已收藏',
                icon: 'none',
                mask: true
                })
            })
            .catch(err => {
                
            })
        }


    }
// 获取产品详情
  _getRoutesDetail() {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    getRoutesDetail(this.state.ID)
    .then(res=>{
      if(res.Success){
          
        Taro.hideLoading()
        this.setState({
            detailObj: res.Result
        },()=>{
            console.log(this.state.detailObj)
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
    .catch(err => {
      Taro.showToast({
        title: '接口出错',
        icon: 'none',
        mask: true
      })
      Taro.hideLoading()
    })
  } 
  titleCheck(item,index){
    this.setState({
        titleFlag:index,
        maoDianID:item.hrefName
    },()=>{
        console.log(this.state.titleFlag)
        console.log(this.state.maoDianID)
    })
    
  }
  onPageScroll = (e) => {
      console.log(e)
  };

onScrollToUpper(e){
    console.log(e.detail)
  }
  
  onScroll(e){
    console.log(e.detail)
    let menuTop = 280; //当距离不确定时,可以用createSelectorQuery来测量
    if (e.detail.scrollTop > menuTop) {
      this.setState({
        isFixed: true
      }, () => {
        console.log(this.state.isFixed)
      })
    } else {
      this.setState({
        isFixed: false
      }, () => {
        console.log(this.state.isFixed)
      })
    }
  }
// 进入预定
gotoReserve(){
    
    Taro.setStorageSync('tirketOrderMsg',JSON.stringify(this.state.detailObj))
    Taro.navigateTo({
        url: `/pages/touristRoutes/pages/reserveRoutes/index?ID=${this.state.ID}`
    })
}
backHome() {
  Taro.switchTab({
    url: '/pages/index/index'
  })
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
    const {titleData,maoDianID,isFixed,detailObj} = this.state
    const scrollStyle = {
      height: '90vh'
    }
    const scrollTop = 0
    const Threshold = 20
    const vStyleA = {
      height: '300px',
      
    }
    const vStyleB = {
       height: '300px',
    }
    const vStyleC = {
      height: '300px',
      color: '#333'
    }
    return (
      <View className='admissionDetail'>
       <ScrollView
                className='scrollview'
                scrollY
                scrollWithAnimation
                scrollTop={scrollTop}
                style={scrollStyle}
                lowerThreshold={Threshold}
                upperThreshold={Threshold}
                onScrollToUpper={this.onScrollToUpper}
                onScroll={this.onScroll}
                scrollIntoView={maoDianID}
            >
        <View className="topImgBox">  
            <Image src={detailObj.ImageUrl} className='proTopImg'/>
            <View className="likeBox" onClick={this._getLike.bind(this)}>
                <Image className='likeIcon' src={likeFlag==true?likedIcon:likeIcon}/>
            </View>
        </View>
        <View className="proMsgBox">
            <View className="nullBox">
                <View className='box'>
                    <View className="proName">{detailObj.Name}</View>
                    
                    {detailObj.Labels.length>0&&<View className="biaoqian">
                    {detailObj.Labels.map((item,index)=>{
                        return (
                            <View className="biaoQianSpan" key={index}>{item}</View>
                        )
                    })}
                        
                    </View>}
                    <View className="proCity">{detailObj.DepartCityName}-{detailObj.ArriveCityName}</View>
                    <View className="priceBox">
                        <View className="price">
                            <Text className='priceFuHao'>¥</Text>
                            <Text className='priceNum'>{detailObj.SalePrice}</Text>
                            <Text className="priceFuHao">起</Text>
                        </View>
                        <View className="saleNum">已售{detailObj.SaleCount}件</View>
                    </View>
                </View>
            </View> 
        </View>
        <View className="otherMsgBox">
            <View className={isFixed==true?"titleBox tag-fixed":'titleBox'}>
                <View className="box">
                    {titleData.map((item,index)=>{
                        return (
                            <View onClick={this.titleCheck.bind(this,item,index)} className={titleFlag==index?'itemTitle itemTitleOn':'itemTitle'} key={index}>{item.Name}</View>
                        )
                    })}
                    
                </View>
            </View>
            {/* <View className="jingCun" id='jingCun'>123</View>
            <View className="anPai" id='anPai'>345</View>
            <View className="feiYong" id='feiYong'>678</View>
            <View className="yuDing" id='yuDing'>902</View> */}
           
            <View className="box">
               <View style='margin-bottom: 20px;' className="jingCun" id='jingCun'>
                <View className="textContent">
                   <RichText style='width: 100%;margin: 0 auto;' nodes={detailObj.ItineraryInfo} />
                </View>
                </View>
                <View className="anPai" id='anPai' style='margin-bottom: 20px;'>
                    <View className="textContent">
                    {detailObj.Schedules.map((item,index)=>{
                        return (
                            <View className='xingChengItem' key={index}>
                                <View>第{item.TheDay}天</View>
                                <RichText style='width: 100%;margin: 0 auto;' nodes={item.Contents} />
                            </View>
                            
                        )
                    })}
                        
                    </View>
                </View>
                    <View className="feiYong" id='feiYong' style='margin-bottom: 20px;'>
                        <View className="textContent">
                           <RichText style='width: 100%;margin: 0 auto;' nodes={detailObj.ExpenseInfo} />
                        </View>
                    </View>
                    <View className="yuDing" id='yuDing' style='margin-bottom: 20px;'>
                    <View className="textContent">
                        <RichText style='width: 100%;margin: 0 auto;' nodes={detailObj.KnowledgeInfo} />
                    </View>    
                    </View> 
              </View>
            
        </View>
        </ScrollView>
        
        <View className="footer">
        < View className = "iconBox" >
            <View className="backHome" onClick={this.backHome.bind(this)}>
                <Image src={homeIcon} className='homeIcon'/>
                <View className="footerText">首页</View>
            </View>
            </View>
            <View className="keFu">
            <Button open-type="contact" ></Button>
                <Image src={keFuIcon} className='keFuIcon'/>
                <View className="footerText">咨询</View>
            </View>
            <View className="buyBtn" onClick={this.gotoReserve.bind(this)}>立即购买</View>
        </View>
    </View>
    );
  }
}