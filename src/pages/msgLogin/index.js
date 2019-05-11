import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {AtToast} from 'taro-ui'
import {loginCode,loginMsg} from '../../api/common'
import tel from './images/tel.png'
import code from './images/code.png'
import name from './images/name.png'
import pasEyeOff from './images/pasEyeOff.png'
import pasEyeOpen from './images/pasEyeOpen.png'
import pasword from './images/pasword.png'
import idcard from './images/idcard.png'
import checkBoxIcon from './images/login_selectActive.png'
import weiChenkBoxIcon from './images/login_select.png'
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
    }
  }

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  gotoMsg(){
    Taro.navigateTo({
      url: '/pages/login/index'
      
    })
  }
  handleMobileChange = (event) => {
    console.log(event,'event')
    this.setState({
      Mobile: event.target.value
    },()=>{
      this.changeVal()
      
    })
    console.log('1234','受控组件')
    
}
handleVCodeChange = (event) => {
    let value=event.target.value
    this.setState({
      Code: value
    })
}
  countDown() {
    const {count} = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
      });
      setTimeout(this.countDown.bind(this), 1000);
    }
  }
  changeVal() {
    if (this.state.Mobile =='') {
      this.setState({
        showBtn:true
      },()=>{
        this.state.showBtn=this.state.showBtn
      })
    } else {
      this.setState({
        showBtn:false
      },()=>{
        this.state.showBtn=this.state.showBtn
      })
    }
    
    
}
  handleClick = () => {
    if(this.state.Mobile==''){
      this.setState({
        toast:true,
        toastText:'请输入手机号'
    })
      console.log('请输入手机号')
      return
    }else{
      loginCode({
        Mobile:this.state.Mobile,
        VCode:this.state.Code
      })
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
            toast:true,
            toastText:res.Message
        })
        }
        
      })
      .catch(err => {
        if (!err.message) {
          return
        }
        
      })
    
  }
  };
  // 登录
  loginMessage(){
    loginMsg({
      Mobile:this.state.Mobile,
      Password: this.state.Password,
      VCode: this.state.Code,
      VendorId: 0,
      OpenId: Taro.getStorageSync('_openid'),
      From: "WeixinMiniProgram"
    })
    .then(res=>{
      console.log(res,'短信登录')
      if(res.Success){
        Taro.switchTab({
          url: '/pages/index/index'
        
        })
      }else{
        console.log('该手机号不存在')
      }
    })
    .catch(err => {
      if (!err.message) {
        return
      }
      
    })
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }
  render() {
    return (
      <View className='msgLogin'>
        <View className='box'>
            <View className='systemName'>逸旅云-差旅自助系统</View>
            <View className='InvitationName'>短信登录</View>
            <View className='formBox'>
                <View className='li'>
                    <View className='imgBox'>
                       <Image className='IconImg' src={tel} />
                    </View>
                    <Input placeholder="手机号" type='tel' value={this.state.Mobile} onChange={this.handleMobileChange.bind(this)}/>
                    {/* <form onSubmit={this.handleSubmit}>
                        <label>
                        Name:
                          <input type="text" ref={this.input} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form> */}
                </View>
                <View className='liBox'>
                   <View className='li'>
                        <View className='imgBox'>
                           <Image className='IconImg' src={code}/>
                        </View>
                        <Input placeholder="输入验证码" type='number' value={this.state.Code} onChange={this.handleVCodeChange.bind(this)}/>
                   </View>
                   <View className='code' onClick={() => this.handleClick()}>{this.state.liked
            ? '获取验证码'
            : `${this.state.count} 秒后重发`}</View>
                </View>
            </View>
             <Button disabled={this.state.showBtn} className={showBtn==true?'btn':'btn btnBg'} onClick={this.loginMessage}>登 录</Button>
             <View className='goToBtn' onClick={this.gotoMsg}>密码登录</View>
        </View>
        <AtToast isOpened={this.state.toast} text={toastText} ></AtToast>
      </View>
    );
  }
}