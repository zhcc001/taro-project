import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {AtToast,AtInput} from 'taro-ui'
import {loginCode,loginMsg} from '../../api/common'
import telIcon from './images/tel.1.png'
import codeIcon from './images/yanzhengma.png'
import pasEyeOff from './images/pasEyeOff.png'
import pasEyeOpen from './images/pasEyeOpen.png'
import pasword from './images/pasword.png'
import {shareTitle} from '../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '短信登录'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      toast:false,
      toastText:'',
      count: 60,
      liked: true,
      tel:'',
      Password:'',
      Mobile:'',
      Code:'',
      showBtn:true,
      codeFlag:false,
    }
  }

  componentWillMount () {
    if(this.$router.params.Mobile){
      this.state.Mobile=this.$router.params.Mobile
    }
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  gotoMsg(){
    if (this.state.Mobile != '') {
      Taro.navigateTo({
        url: '/pages/login/index?Mobile=' + this.state.Mobile

      })
    } else {
      Taro.navigateTo({
        url: '/pages/login/index'

      })
    }
  }
  handleMobileChange (value) {
    
    this.setState({
      Mobile:value,
    },()=>{
      this.changeVal(value)
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return this.state.Mobile
    
}
handleCodeChange (value) {
  this.setState({
    Code:value,
  }, () => {
    this.changeVal(value)
  })
  // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  return this.state.Code
  
}
changeVal(val){
  if(this.state.Mobile!=''&&this.state.Code!=''&&val!=''){
    this.setState({
      showBtn:false
    })
  }else{
    this.setState({
      showBtn:true
    })
  }
}
  countDown() {
    const {count} = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
        codeFlag:false,
      },()=>{
        console.log(this.state.codeFlag)
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
        

      });
      setTimeout(this.countDown.bind(this), 1000);
    }
  }
  
  handleClick = () => {
    let telReg = /^[1][1-9][0-9]{9}$/
    if(this.state.Mobile==''){
         Taro.showToast({
             title : '请输入有效手机号' ,
             icon : 'none' ,
             mask : true
           })
     }else if(!telReg.test(this.state.Mobile)){
         Taro.showToast({
             title : '手机号格式错误' ,
             icon : 'none' ,
             mask : true
           })
     }else{
       this.setState({
        codeFlag:true,
       },()=>{
         console.log(this.state.codeFlag)
       })
      loginCode({
        Mobile:this.state.Mobile,
        VCode:this.state.Code
      })
      .then(res=>{
        if(res.Success){
          const {sendMsg} = this.props;
          const {liked} = this.state;
          if (!liked) {
            return;
          }
          this.countDown();
        }else{
          this.setState({
            codeFlag:false,
           },()=>{
             console.log(this.state.codeFlag)
           })
          Taro.showToast({
            title : res.Message ,
            icon : 'none' ,
            mask : true
          })
        }
        
      })
      .catch(err => {
        if (!err.message) {
          return
        }
        this.setState({
          codeFlag:false,
         },()=>{
           console.log(this.state.codeFlag)
         })
        Taro.showToast({
          title : err.Message ,
          icon : 'none' ,
          mask : true
        })
      })
    
  }
  };
  // 登录
  loginMessage(){
    let telReg = /^[1][1-9][0-9]{9}$/
    if(this.state.Mobile==''){
         Taro.showToast({
             title : '请输入有效手机号' ,
             icon : 'none' ,
             mask : true
           })
     }else if(!telReg.test(this.state.Mobile)){
         Taro.showToast({
             title : '手机号格式错误' ,
             icon : 'none' ,
             mask : true
           })
     }else{
    loginMsg({
      Mobile:this.state.Mobile,
      Password: this.state.Password,
      VCode: this.state.Code,
      VendorId: 0,
      OpenId: Taro.getStorageSync('_openid'),
      From: "WeixinMiniProgram"
    })
    .then(res=>{
      if(res.Success){
        Taro.switchTab({
          url: '/pages/index/index'
        
        })
      }else{
        Taro.showToast({
          title : res.Message ,
          icon : 'none' ,
          mask : true,
          duration: 3000,
        })
      }
    })
    .catch(err => {
      // if (!err.message) {
      //   return
      // }
      // Taro.showToast({
      //   title : err.Message ,
      //   icon : 'none' ,
      //   mask : true
      // })
    })
  }
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }
  // 新企业注册
  gotoRegister() {
    Taro.navigateTo({
      url: `/pages/companyRegister/index`
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
  render() {
    const {showBtn}=this.state
    return (
      <View className='msgLogin'>
        <View className='box'>
            <View className='systemName'>差旅自助系统</View>
            <View className='InvitationName'>短信登录</View>
            <View className='formBox'>
            <View className="tipsText">
              <View className="tipsSpan">如果您没有账号,可以</View>
              <View className="tipsSpan2" onClick={this.gotoRegister}>注册企业/团队</View>
              <View className="tipsSpan">账号,邀请伙伴一起使用</View>
            </View>
                <View className='li'>
                    <View className='imgBox'>
                       <Image className='IconImg' src={telIcon} />
                    </View>
                    {/* <Input placeholder="手机号" type='tel' value={this.state.Mobile} onChange={this.handleMobileChange.bind(this)}/> */}
                  
                    <AtInput style='flex-grow: 1;'
                      name='Mobile'
                      border={false}
                      type='phone'
                      placeholder='请输入手机号码'
                      value={this.state.Mobile}
                      onChange={this.handleMobileChange.bind(this)}
                    />
                </View>
                <View className='liBox'>
                   <View className='li'  style='width:60%'>
                        <View className='imgBox'>
                           <Image className='IconImg' src={codeIcon}/>
                        </View>
                        
                        <AtInput style='flex-grow: 1;' 
                          name='Code' 
                          type='number' 
                          border={false}
                          placeholder='请输入验证码'
                          value={this.state.Code}
                          onChange={this.handleCodeChange.bind(this)}
                        />
                   </View>
                   <Button className='code' disabled={this.state.codeFlag} onClick={() => this.handleClick()}>{this.state.liked
            ? '获取验证码'
            : `${this.state.count} 秒后重发`}</Button>
                </View>
            </View>
             <Button disabled={showBtn} className={showBtn==true?'btn':'btn btnBg'} onClick={this.loginMessage}>登 录</Button>
             {/* <View className='btn btnBg' onClick={this.loginMessage}>登 录</View> */}
             <View className="goToBtnBox" style='padding-top: 40px;'>
              <View className="registerBtn" onClick={this.gotoRegister}>新企业/团队注册</View>
             </View>
             <View className='goToBtnBox'>
                <View className='goToBtn' onClick={this.gotoMsg}>密码登录</View>
             </View>
        </View>
      </View>
    );
  }
}