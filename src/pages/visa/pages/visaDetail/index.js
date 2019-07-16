import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,ScrollView,RichText ,Swiper, SwiperItem } from '@tarojs/components'
import { AtTabs, AtTabsPane ,AtActivityIndicator,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast,AtInput} from 'taro-ui'
import {getVisaDetail} from '../../../../api/visa'
import {likePro,getlike,getCanCellike} from '../../../../api/common'
import likeIcon from './images/shoucang.png'
import keFuIcon from './images/zixun.png'
import likedIcon from './images/xinxin.1.png'
import iconSrc from './images/shouli.png'
import iconSrc1 from './images/zu37.png'
import iconSrc2 from './images/zu27.png'
import iconSrc3 from './images/1.png'
import iconSrc4 from './images/4-4.png'
import iconSrc5 from './images/2.png'
import shouQiIcon from './images/shouqi.png'
import {shareTitle} from '../../../../api/commonVariable'

import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '签证详情页'
  }

  constructor(){
    super(...arguments)
    this.state={
        titleData:[{
            Id:1,
            Name: '产品介绍',
            hrefName: 'jingCun'
        }, {
            Id: 2,
            Name: '所需材料',
            hrefName: 'anPai'
        }, {
          Id: 3,
          Name: '受理范围',
          hrefName: 'feiYong'
        }, {
            Id: 4,
            Name: '购买须知',
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
        likeFlag:false,
        Labels:[],
        EntryTimes:{},
        VisaType:{},
        Catalog:{},
        documents:[],
        moreMsg: false,
        checkSwiper:0,
    }
  }

  componentWillMount () {
      
    this.state.ID=this.$router.params.id
    
  }
  componentDidMount () {
      this._getVisaDetail()
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
    likePro(100,107,this.state.ID)
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
    getCanCellike(100, 107, this.state.ID)
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
    getlike(100, 107, this.state.ID)
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
  _getVisaDetail() {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    getVisaDetail(this.state.ID)
    .then(res=>{
      if(res.Success){
          
        Taro.hideLoading()
        res.Result.DocumentCatalogs.map((item, index) => {
          item.Name = res.Result.DocumentCatalogs[index].Catalog.Name
          console.log(this.state.documents)
          this.setState({
              documents: res.Result.DocumentCatalogs[0].Documents
          },()=>{
              console.log(this.state.documents)
          })

          if (item.Catalog.Id == '1') {
            res.Result.DocumentCatalogs[index].iconSrc = iconSrc1
          } else if (item.Catalog.Id == '2') {
            res.Result.DocumentCatalogs[index].iconSrc = iconSrc2
          } else if (item.Catalog.Id == '4') {
            res.Result.DocumentCatalogs[index].iconSrc = iconSrc3
          } else if (item.Catalog.Id == '8') {
            res.Result.DocumentCatalogs[index].iconSrc = iconSrc4
          } else if (item.Catalog.Id == '16') {
            res.Result.DocumentCatalogs[index].iconSrc = iconSrc5
          }
        })
        console.log(res.Result.DocumentCatalogs, 'res.Result.DocumentCatalogs')
        this.setState({
            detailObj: res.Result,
            Labels: res.Result.Labels,
            EntryTimes: res.Result.EntryTimes,
            VisaType: res.Result.VisaType,
            caiLiaoData: res.Result.DocumentCatalogs,
        },()=>{
            console.log(this.state.detailObj,'签证详情')
            console.log(this.state.Labels)
            console.log(this.state.EntryTimes)
            console.log(this.state.VisaType)
            console.log(this.state.caiLiaoData)
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
    let menuTop = 400; //当距离不确定时,可以用createSelectorQuery来测量
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
   moreMsgFun() {
       this.setState({
           moreMsg:!this.state.moreMsg
       },()=>{
           console.log(this.state.moreMsg)
       })
   }

   chickSwiper(item,index){
       this.setState({
           documents:[]
       },()=>{
           console.log(this.setState.documents)
       })
       this.state.documents=[]
       this.setState({
        checkSwiper: index,
        documents : this.state.caiLiaoData[index].Documents
       },()=>{
            console.log(this.state.checkSwiper)
            console.log(this.state.documents)
       })

   }
// 进入预定
gotoReserve(){
    let visaReserveObj={
        Name:this.state.detailObj.Name,
        Labels:this.state.detailObj.Labels,
        ImageUrl: this.state.detailObj.ImageUrl,
        StartPrice: this.state.detailObj.StartPrice
    }
    Taro.setStorageSync('visaReserveObj', JSON.stringify(visaReserveObj))
    Taro.navigateTo({
        url: `/pages/visa/pages/visaReserve/index?ID=${this.state.ID}`
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
    const {titleData,maoDianID,isFixed,detailObj,caiLiaoData,documents} = this.state
    const scrollStyle = {
      height: '90vh'
    }
    const scrollTop = 0
    const Threshold = 20
   
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
        </View>
        
        <View className="proMsgBox">
            <View className="topMsg">
                <View className="nulBox">
                    <View className="box">
                        <View className='nameH2'>{detailObj.Name}</View>
                        {detailObj.Labels.length>0&&<View className="biaoQian" >
                        {detailObj.Labels.map((item,index)=>{
                            return (
                                <View className='biaoQianSpan' key={index}>{item}</View>
                            )
                        })}
                            
                        </View>}
                        <View className="star">
                            <View className="starSpan">已售{detailObj.SaleCount}件</View>
                        </View>
                        <View className="priceBox">
                            <View className="leftText">
                            <View className='leftB'>{detailObj.StartPrice}<View className='leftSpan'>/人</View></View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        <View className="emptyBox" style='width:100%;height:8px;background:#F8F8F8;'></View>
        
        <View className = "detailModel" >
                <View className = "modelTitle" >
                        <View className = "line" > </View>
                        <View className='detailLiH3'>签证详情</View>
                </View>
                <View className="box">
                    <View className='detailUl'>
                            <View className='detailLi'>
                                <View className='detailLiP'>有效期限</View>
                                <View className='detailLiH5'>{detailObj.ValidPeriodInfo}</View>
                            </View>
                            < View className = 'detailLi' >
                                <View className='detailLiP'>停留时间</View>
                                <View className='detailLiH5'>{detailObj.StayDurationInfo}</View>
                            </View>
                            < View className = 'detailLi' >
                                <View className='detailLiP'>办理时长</View>
                                <View className='detailLiH5'>{detailObj.ProcessDaysInfo}</View>
                            </View>
                            < View className = 'detailLi' >
                                <View className='detailLiP'>入境次数</View>
                                <View className='detailLiH5'>{EntryTimes.Name}</View>
                            </View>
                            < View className = 'detailLi' >
                                <View className='detailLiP'>签证类型</View>
                                <View className='detailLiH5'>{VisaType.Name}</View>
                            </View>
                            < View className = 'detailLi' >
                                <View className='detailLiP'>是否免签</View>
                                <View className='detailLiH5'>{detailObj.NeedInterview==true?'是':'否'}</View>
                            </View>

                        </View>
                </View>
            </View>
            <View className="emptyBox" style='width:100%;height:8px;background:#F8F8F8;'></View>

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
            <View className="box">
               <View style='margin-bottom: 20px;' className="jingCun" id='jingCun'>
                    <View className='detailLiH3'>产品介绍</View>
                <View className="textContent">
                   <RichText style='width: 100%;margin: 0 auto;' nodes={detailObj.Introductions} />
                </View>
                </View>
                {/* 所需材料 */}
                <View className="anPai" id='anPai' style='margin-bottom: 20px;'>
                    <View className='detailLiH3'>所需材料</View>
                    <View className="textContent">
                    < Swiper style = 'height:80px;'
                    className='test-h'
                    // onAnimationfinish={this.chickSwiper}动画结束时回调
                    displayMultipleItems={caiLiaoData.length>=4?3.5:caiLiaoData.length}>
                    {caiLiaoData.map((item, index) => {
                    return (
                       
                      <SwiperItem key={index} className='swiper_item' onClick={this.chickSwiper.bind(this,item,index)}>
                            <View className='big_image_wrap'>
                               <View className={this.state.checkSwiper==index?'imgBg imgBgCheck':'imgBg'} >
                                    <Image src={item.iconSrc} />
                                </View>
                              <View className={this.state.checkSwiper==index?'big_title big_titleCheck':'big_title'} >{item.Name}</View>
                             </View>
                      </SwiperItem>
                    )
                })}
              </Swiper>
                    <View className="caiLiaoBox">
                            <View className="box">
                                <View className='caiLiaoUl'>
                                {documents.map((item,index)=>{
                                    return(
                                        <View key={index} className='caiLiaoLi'>
                                        <View className="caiLiaoTitle">
                                            <Image src={iconSrc} />
                                            <View className='caiLiaoLiP'>{item.Name} ({item.OriginalCopy.Name}) {item.IsMust==true?'*':''}</View>

                                        </View>
                                        {this.state.moreMsg&&item.Descriptions!=''&&<View className="caiLiaoTxet" >
                                            <RichText style='width: 100%;margin: 0 auto;' nodes={item.Descriptions} />
                                        </View>}
                                    </View>
                                    )
                                })}
                                    
                                </View>
                            </View>
                            <View className="openBtn" onClick={this.moreMsgFun.bind(this)}>
                                <View className='openBtnBox'>
                                    <View className='openBtnSpan'>{this.state.moreMsg==false?'展开':'收起'}</View>
                                    <View className="iconBox">
                                        <Image className={!this.state.moreMsg?'imgDeg':''} src={shouQiIcon} />
                                    </View>
                                   
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                    <View className="feiYong" id='feiYong' style='margin-bottom: 20px;'>
                        <View className='detailLiH3'>受理范围</View>
                        <View className="textContent">
                           <RichText style='width: 100%;margin: 0 auto;' nodes={detailObj.DealFlows} />
                        </View>
                    </View>
                    <View className="yuDing" id='yuDing' style='margin-bottom: 20px;'>
                    <View className='detailLiH3'>购买须知</View>
                    <View className="textContent">
                        <RichText style='width: 100%;margin: 0 auto;' nodes={detailObj.BookNotices} />
                    </View>    
                    </View> 
              </View>
            
        </View>
        
        </ScrollView>
         <View className='footer'>
            <View className="box">
                 <View className="keFu">
                 <Button open-type="contact" ></Button>
                    <Image className='footerIcon' src={keFuIcon} />
                    <View className='footerP'>咨询客服</View>
                </View> 
                <View className="like"  onClick={this._getLike.bind(this)}>
                    <Image className='footerIcon' src={likeFlag==true?likedIcon:likeIcon}/>
                    <View className='footerP'>收藏</View>
                </View>
                    <View className='reserveBtn' onClick={this.gotoReserve.bind(this)}>立即预订</View>
               
            </View>
        </View>
    </View>
    );
  }
}