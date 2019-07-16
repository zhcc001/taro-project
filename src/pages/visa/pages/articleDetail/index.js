import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image,ScrollView,RichText ,Swiper, SwiperItem } from '@tarojs/components'
import { AtTabs, AtTabsPane ,AtActivityIndicator,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast,AtInput} from 'taro-ui'
import {likePro,getlike,getCanCellike} from '../../../../api/common'
import {geZiXunDetail} from '../../../../api/visa'
import {shareTitle} from '../../../../api/commonVariable'
import backHomeIcon from './images/shouyedianliang.png'

import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '文章详情页'
  }

  constructor(){
    super(...arguments)
    this.state={
        contentId:0,
        zuXunContent:{},
        Labels:[],
        likeFlag:'',
        likeText:''
    }
  }

  componentWillMount () {
      
    this.state.contentId = this.$router.params.id
    
  }
  componentDidMount () {
      this._getZiXunDetail()
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
    likePro(105,0,this.state.contentId)
    .then(res=>{
        if(res.Success){
            this.setState({
                likeFlag:res.Result
            },()=>{
                console.log(this.state.likeFlag)
                if(this.state.likeFlag==true){
                  this.setState({
                    likeText:'已收藏'
                  },()=>{
                    console.log(this.state.likeText)
                  })
                }else{
                  this.setState({
                    likeText:'收藏'
                  },()=>{
                    console.log(this.state.likeText)
                  })
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
    .catch(err=>{

    })
}
_getLike() {
  if (this.state.likeFlag == true) {
    getCanCellike(105,0,this.state.contentId)
      .then(res => {
          this.setState({
              likeFlag:false
          },()=>{
              console.log(this.state.likeFlag)
              this.setState({
                likeText: '收藏'
              }, () => {
                console.log(this.state.likeText)
              })
          })
         Taro.showToast({
           title: '取消收藏',
           icon: 'none',
           mask: true
         })
      })
      .catch(err => {
        
      })
  } else {
    getlike(105, 0, this.state.contentId)
      .then(res => {
        this.setState({
          likeFlag: true
        }, () => {
          console.log(this.state.likeFlag)
          this.setState({
            likeText: '已收藏'
          }, () => {
            console.log(this.state.likeText)
          })
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
// 获取资讯详情
_getZiXunDetail() {
  geZiXunDetail(this.state.contentId)
    .then(res => {
        if(res.Success){
            this.setState({
                zuXunContent:res.Result,
                Labels: res.Result.Labels
            },()=>{
                console.log(this.state.zuXunContent)
                console.log(this.state.Labels)
            })
      
      }
    })
    .catch(err => {
      
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
    const {zuXunContent,Labels} = this.state
  
    return (
      <View className='articleDetail'>
        < View className = "bannerBox" >
          <Image className='bannerImg' src={zuXunContent.ImageUrl} />
          {Labels.length>0&&<View className="biaoQian" >
          {Labels.map((item,index)=>{
            return(
              <View className='labelSpan' key={index}>{item}</View>
            )
          })}
          </View>}
        </View>
        <View className="articContent">
          <View className="itemArtic">
            <View className="boxH1">{zuXunContent.Title}</View>
            <View className='fuhao'>”</View>
            <RichText style='width: 100%;margin: 0 auto;' nodes={zuXunContent.Contents} />
          </View>
        </View>
         <View className='footer'>
            <View className="box">
                < View className = "keFu" onClick={this.backHome}>
                    <Image className='footerIcon' src={backHomeIcon}/>
                    <View className='footerP'>回到首页</View>
                </View>
                    <View className='reserveBtn' onClick={this._getLike.bind(this)}>{this.state.likeText}</View>
               
            </View>
        </View>
    </View>
    );
  }
}