import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {AtInput,AtToast} from "taro-ui"
import {loginCode,getChangeOninfo,getOninfo,registerCode} from '../../api/common'
import telIcon from './images/tel.1.png'
import codeIcon from './images/yanzhengma.png'
import name from './images/name.png'
import pasEyeOff from './images/pasEyeOff.png'
import pasEyeOpen from './images/pasEyeOpen.png'
import pasword from './images/mima.png'
import {shareTitle} from '../../api/commonVariable'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '修改密码'
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
      loginData:{},
      inputType:'password',
      inputTypeFlag:false,
      codeFlag:false,
    }
  }

  componentWillMount () {
    this._getOninfo()
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
 
handleCodeChange (value) {
  
 
  this.setState({
    Code:value,
  },()=>{
    this.changeVal(value)
  })
  // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  return this.state.Code
  
}
changeVal(val){
  if(this.state.Password!=''&&this.state.Code!=''&&val!=''){
    this.setState({
      showBtn:false
    })
  }else{
    this.setState({
      showBtn:true
    })
  }
}
handlePasswordChange (value) {
  
  
  this.setState({
    Password:value
  },()=>{
    this.changeVal(value)
  })
  // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  return this.state.Password
}
_getOninfo(){
  getOninfo()
      .then(res=>{
        console.log(res)
        if(res.Success){
          console.log('重新')
          this.setState({
            loginData:res.Result
          },()=>{
            
          })
        }
      })
      .catch(err=>{

      })
}
  gotoMsg(){
    Taro.navigateTo({
      url: '/pages/login/index'
      
    })
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
    this.setState({
      codeFlag:true,
     },()=>{
       console.log(this.state.codeFlag)
     })
      registerCode(this.state.loginData.Mobile)
      .then(res=>{
        console.log(res,'短信验证码')
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
          title : err.Message,
          icon : 'none' ,
          mask : true
        })
      })
    
  };
  changePassWord(){
    if(this.state.Password==''){
      Taro.showToast({
        title: '请输入要修改的密码',
        icon: 'none',
        mask: true
      })
    }else{
    getChangeOninfo({
      Password:this.state.Password,
      VCode:this.state.Code
    })
    .then(res=>{
      if(res.Success){
        Taro.showToast({
          title : '修改成功' ,
          icon : 'none' ,
          mask : true
        })
      Taro.switchTab({
        url:'/pages/myMsg/index'
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
      if (!err.message) {
        return
      }
      Taro.showToast({
        title : err.Message,
        icon : 'none' ,
        mask : true
      })
    })
  }
  }
  // 密码显示隐藏
showPassword(){
  if(this.state.inputType=='password'){
    this.setState({
      inputType:'text',
      inputTypeFlag:true,
    })
  }else{
    this.setState({
      inputType:'password',
      inputTypeFlag:false,
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
    const {loginData,showBtn}=this.state
    return (
      <View className='changePassword'>
        <View className='box'>
            {/* <View className='systemName'>逸旅云-差旅自助系统</View>
            <View className='InvitationName'>修改密码</View> */}
            <View className='formBox'>
                <View className='li' style='background:#f5f5f5;'>
                
                    <View className='imgBox'>
                       <Image className='IconImg' src={telIcon}/>
                    </View>
                    <View className='mobileText'>{loginData.Mobile}</View>

                </View>
                {/* <View className='mobileText'>{loginData.Mobile}</View> */}
                <View className='liBox'>
                   <View className='li'>
                        <View className='imgBox'>
                           <Image className='IconImg' src={codeIcon}/>
                        </View>
                        {/* <Input placeholder="输入验证码" value={this.state.Code} onChange={this.handleVCodeChange.bind(this)}/> */}
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
                <View className='li'>
                    <View className='imgBox'>
                        <Image className='IconImg' src={pasword}/>
                    </View>
                    {/* <Input placeholder="新密码" value={this.state.Password} onChange={this.handlePasswordChange.bind(this)}/> */}
                    <AtInput style='flex-grow: 1;' 
                      name='Password' 
                      border={false}
                      type={inputType} 
                      placeholder='请输入密码'
                      value={this.state.Password}
                      onChange={this.handlePasswordChange.bind(this)}
                    />
                    <View className='imgBox' onClick={this.showPassword}>
                        {inputTypeFlag==true?<Image className='IconImg' src={pasEyeOpen}/>:<Image className='IconImg' src={pasEyeOff}/>
                        }
                    </View>
                </View>
            </View>
            <Button disabled={showBtn} className={showBtn==true?'btn':'btn btnBg'} onClick={this.changePassWord.bind(this)}>确认修改</Button>
             {/* <View className='btn btnBg' onClick={this.changePassWord.bind(this)}>确认修改</View> */}
        </View>
      </View>
    );
  }
}