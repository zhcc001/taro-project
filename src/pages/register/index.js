import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {AtToast} from 'taro-ui'
import {register,registerCode} from '../../api/common'
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
       navigationBarTitleText: '注册'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyObj:{VendorId:"80000",companyName:"黑龙江商旅"},
      toast:false,
      toastText:'',
      Mobile: "",
      Name: "",
      NickName: "",
      IdentityNo: "",
      Password: "",
      VCode: "",
      count: 60,
      liked: true,
      checkIcon:true,
    }
  }

  componentWillMount () {
    if(this.$router.params.query){
      console.log(this.$router.params.query)
        this.state.companyObj=this.$router.params.query
    }
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  gotoLogin(){
    Taro.navigateTo({
      url: '/pages/registerSuccess/index'
      
    })
  }
  mobileChange = (event) => {
    this.setState({
      Mobile: event.target.value
    },()=>{
      this.changeVal()
    })
  }
  changeVal() {
    if (this.state.Mobile =='') {
      this.setState({
        showBtn:true
      })
    } else {
      this.setState({
        showBtn:false
      })
    }
    
    
}
  nameChange = (event) => {
    let value=event.target.value
    this.setState({
      Name: value
    })
  }
  IdentityNoChange = (event) => {
    let value=event.target.value
    this.setState({
      IdentityNo: value
    })
  }
  passwordChange = (event) => {
    let value=event.target.value
    this.setState({
      Password: value
    })
  }
  vCodeChange = (event) => {
    let value=event.target.value
    this.setState({
      VCode: value
    })
  }
  checkIcon(){
    this.setState({
      checkIcon: !this.state.checkIcon
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
  // 发送短信验证码
  handleClick = () => {
    if(this.state.Mobile==''){
      this.setState({
        toast:true,
        toastText:'请输入手机号'
    })
      console.log('请输入手机号')
      return
    }else{
      registerCode(this.state.Mobile)
      .then(res=>{
        if(res.Success){
          console.log(res.Success)
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
  registerMsg(){
    this.setState({
      toast:false,
      toastText:''
  })
    if(this.state.Mobile==''){
      this.setState({
        toast:true,
        toastText:'请输入手机号'
    })
      console.log('请输入手机号')
      return
    }if(this.state.VCode==''){
      this.setState({
        toast:true,
        toastText:'请输入验证码'
    })
      console.log('请输入验证码')
      return
    }if(this.state.IdentityNo==''){
      this.setState({
        toast:true,
        toastText:'请输入身份证'
    })
      console.log('请输入身份证')
      return
    }if(this.state.Password==''){
      this.setState({
        toast:true,
        toastText:'请输入密码'
    })
      console.log('请输入密码')
      return
    }if(this.state.Name==''){
      this.setState({
        toast:true,
        toastText:'姓名'
    })
      console.log('姓名')
      return
    }else{
      register({
        From: "WeixinMiniProgram",
        OpenId: Taro.getStorageSync('_openid'),
        VendorId: this.companyObj.VendorId,
        Mobile:this.state.Mobile,
        Name: this.state.Name,
        NickName: "",
        IdentityNo: this.state.IdentityNo,
        Password: this.state.Password,
        VCode: parseInt(this.state.VCode)
      })
      .then(res=>{
        console.log(res,'注册')
        if(res.Success){
          Taro.navigateTo({
            url:'/pages/registerSuccess/index'
          })
        }else{
          console.log(res.Meassge)
        }
      })
      .catch(err=>{
        if(!err.Meassge){
          return
        }
      })
    }
  }
  render() {
    return (
      <View className='register'>
        <View className='box'>
            <View className='systemName'>逸旅云差旅自助系统</View>
            <View className='InvitationName'>邀请注册-{this.state.companyObj.companyName}</View>
            <View className='formBox'>
                <View className='li'>
                    <View className='imgBox'>
                       <Image className='IconImg' src={tel}></Image>
                    </View>
                    <Input placeholder="手机号" type='tel' value={this.state.Mobile} onChange={this.mobileChange.bind(this)}/>
                  </View>
                <View className='liBox'>
                   <View className='li'>
                   <View className='imgBox'>
                       <Image className='IconImg' src={code}></Image>
                   </View>
                   <Input placeholder="输入验证码" type='number' value={this.state.VCode} onChange={this.vCodeChange.bind(this)}/>
                   </View>
                   <View className='code' onClick={this.handleClick}>{this.state.liked
            ? '获取验证码'
            : `${this.state.count} 秒后重发`}</View>
                </View>
                <View className='li'>
                <View className='imgBox'>
                    <Image className='IconImg' src={idcard}></Image>
                </View>
                <Input placeholder="身份证" type='number' value={this.state.IdentityNo} onChange={this.IdentityNoChange.bind(this)}/></View>
                <View className='li'>
                <View className='imgBox'>
                    <Image className='IconImg' src={pasword}></Image>
                </View>
                <Input placeholder="密码" type='password' value={this.state.Password} onChange={this.passwordChange.bind(this)}/>
                <View className='imgBox'>
                <Image className='IconImg' src={pasEyeOff}></Image><Image className='IconImg' src={pasEyeOpen}></Image>
                 </View>
                </View>
                <View className='li'>
                <View className='imgBox'>
                    <Image className='IconImg' src={name}></Image>
                </View>
                <Input placeholder="姓名" type='text' value={this.state.Name} onChange={this.nameChange.bind(this)}/></View>
            </View>
            <View className='xieYi' onClick={this.checkIcon}>
                <View className='iconBox'>
                    <Image className='IconXieYi' src={this.state.checkIcon==true?checkBoxIcon:weiChenkBoxIcon}/>
               </View>
               <Text>同意用户协议</Text>
            </View>
            <Text className='btn' onClick={this.registerMsg}>注 册</Text>
        </View>
        <AtToast isOpened={this.state.toast} text={toastText} ></AtToast>
      </View>
    );
  }
}