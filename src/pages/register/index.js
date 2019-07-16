import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import {AtToast,AtInput} from 'taro-ui'
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
import {shareTitle} from '../../api/commonVariable'
import guanBiIcon from './images/guanBi.png'
import duiHao from './images/duiHao.1.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '注册'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyObj:{},
      toast:false,
      toastText:'',
      Mobile: "",
      Name: "",
      NickName: "",
      IdentityNo: "",
      Password: "",
      Code: "",
      count: 60,
      liked: true,
      checkIcon:true,
      showBtn:true,
      inputType:'password',
      inputTypeFlag:false,
      codeFlag:false,
      showMask:false
    }
  }

  componentWillMount () {
    if(Taro.getStorageSync('query')){
        this.state.companyObj=JSON.parse(Taro.getStorageSync('query'))
        console.log(this.state.companyObj,'this.state.companyObj')
    }
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
 
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
  
  IdentityNoChange (value) {
    this.setState({
      IdentityNo:value
    }, () => {
      this.changeVal(value)

    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return this.state.IdentityNo
  }
  handlePasswordChange (value) {
    this.setState({
      Password:value
    }, () => {
      this.changeVal(value)

    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return this.state.Password
  }
  nameChange (value) {
    this.setState({
      Name:value
    }, () => {
      this.changeVal(value)

    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return this.state.Name
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
  changeVal(val){
    if(this.state.Mobile!=''&&this.state.Code!=''&&this.state.IdentityNo!=''&&this.state.Password!=''&&this.state.Name!=''&&val!=''){
      this.setState({
        showBtn:false
      })
    }else{
      this.setState({
        showBtn:true
      })
    }
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
  // 发送短信验证码
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
      registerCode(this.state.Mobile)
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
  registerMsg(){
    let telReg = /^[1][1-9][0-9]{9}$/
    let  reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
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
      }else if (this.state.Code=='') {
        Taro.showToast({
            title : '请输入验证码' ,
            icon : 'none' ,
            mask : true
          })
      }else if (this.state.IdentityNo=='') {
        Taro.showToast({
            title : '请输入公民证件号码' ,
            icon : 'none' ,
            mask : true
          })
      }else if (!reg.test(this.state.IdentityNo)) {
          Taro.showToast({
              title : '身份证输入不合法' ,
              icon : 'none' ,
              mask : true
            })
      }else if (this.state.Password=='') {
        Taro.showToast({
            title : '请输入密码' ,
            icon : 'none' ,
            mask : true
          })
      }else if(this.state.name==''){
        // alert('请填写与证件一致的姓名')
        Taro.showToast({
            title : '请填写与证件一致的姓名' ,
            icon : 'none' ,
            mask : true
          })
      }else{
          register({
            From: "WeixinMiniProgram",
            OpenId: Taro.getStorageSync('_openid'),
            VendorId: this.state.companyObj.VendorId,
            Mobile:this.state.Mobile,
            Name: this.state.Name,
            NickName: "",
            IdentityNo: this.state.IdentityNo,
            Password: this.state.Password,
            VCode: parseInt(this.state.Code)
          })
          .then(res=>{
            if(res.Success){
              // Taro.redirectTo({
              //   url:'/pages/registerSuccess/index'
              // })
              this.showMask(true)
              Taro.removeStorageSync('query')
            }else{
              Taro.showToast({
                title : res.Message ,
                icon : 'none' ,
                mask : true
              })
            }
          })
          .catch(err=>{
            if(!err.Meassge){
              return
            }
            Taro.showToast({
              title : err.Message ,
              icon : 'none' ,
              mask : true
            })
          })
    }
    }
    showMask(flag){
      this.setState({
        showMask: flag
      }, () => {
        console.log(this.state.showMask)
      })
    }
    gotoMsg(){
      Taro.navigateTo({
        url: '/pages/login/index'
        
      })
      Taro.removeStorageSync('query')
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
    const {showBtn,inputType,inputTypeFlag,companyObj}=this.state
    return (
      <View className='register'>
        <View className='box'>
            <View className='systemName'>差旅自助系统</View>
            <View className='InvitationName'>邀请注册-{companyObj.companyName}</View>
            <View className='formBox'>
                <View className='li'>
                    <View className='imgBox'>
                       <Image className='IconImg' src={tel}></Image>
                    </View>
                    {/* <Input placeholder="手机号" type='tel' value={this.state.Mobile} onChange={this.mobileChange.bind(this)}/> */}
                    <AtInput style='flex-grow: 1;'
                      name='Mobile'
                      border={false}
                      type='tel'
                      placeholder='请输入手机号码'
                      value={this.state.Mobile}
                      onChange={this.handleMobileChange.bind(this)}
                    />
                  </View>
                <View className='liBox'>
                   <View className='li'>
                   <View className='imgBox'>
                       <Image className='IconImg' src={code}></Image>
                   </View>
                   {/* <Input placeholder="输入验证码" type='number' value={this.state.VCode} onChange={this.vCodeChange.bind(this)}/> */}
                   <AtInput style='flex-grow: 1;' 
                      name='Code' 
                      type='number' 
                      border={false}
                      placeholder='输入验证码'
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
                    <Image className='IconImg' src={idcard}></Image>
                </View>
                {/* <Input placeholder="身份证" type='number' value={this.state.IdentityNo} onChange={this.IdentityNoChange.bind(this)}/> */}
                <AtInput style='flex-grow: 1;'
                  name='IdentityNo'
                  type='text'
                  border={false}
                  placeholder='身份证号码'
                  value={this.state.IdentityNo}
                  onChange={this.IdentityNoChange.bind(this)}
                />
                </View>
                <View className='li'>
                <View className='imgBox'>
                    <Image className='IconImg' src={pasword}></Image>
                </View>
                {/* <Input placeholder="密码" type='password' value={this.state.Password} onChange={this.passwordChange.bind(this)}/> */}
                <AtInput style='flex-grow: 1;' 
                      name='Password' 
                      type={inputType} 
                      border={false}
                      placeholder='请输入密码'
                      value={this.state.Password}
                      onChange={this.handlePasswordChange.bind(this)}
                    />
                <View className='imgBox' onClick={this.showPassword}>
                        {inputTypeFlag==true?<Image className='IconImg' src={pasEyeOpen}/>:<Image className='IconImg' src={pasEyeOff}/>
                        }
                    </View>
                </View>
                <View className='li'>
                <View className='imgBox'>
                    <Image className='IconImg' src={name}></Image>
                </View>
                {/* <Input placeholder="姓名" type='text' value={this.state.Name} onChange={this.nameChange.bind(this)}/> */}
                <AtInput style = 'flex-grow: 1;'
                  name='Name'
                  type='text'
                  border={false}
                  placeholder='请输入姓名'
                  value={this.state.Name}
                  onChange={this.nameChange.bind(this)}
                />
                </View>
            </View>
            {/* <View className='xieYi' onClick={this.checkIcon}>
                <View className='iconBox'>
                    <Image className='IconXieYi' src={this.state.checkIcon==true?checkBoxIcon:weiChenkBoxIcon}/>
               </View>
               <Text>同意用户协议</Text>
            </View> */}
            <Button  disabled={showBtn} className={showBtn==true?'btn':'btn btnBg'} onClick={this.registerMsg}>注 册</Button>
            {/* <View className='btn btnBg' onClick={this.registerMsg}>注 册</View> */}
            <View className='goToBtnBox'>
                <View className='goToBtn' onClick={this.gotoMsg}>密码登录</View>
             </View>
        </View>
         {/* 注册成功弹层 */}
        {showMask&&<View className="tickertMask"></View>}
        {showMask&&<View className="registerMask">
            <Image src={guanBiIcon} className='guanBiIcon' onClick={this.showMask.bind(this,false)}/>
                    <View className='imgBox'>
                        <Image src={duiHao}/>
                        <Text>注册成功</Text>
                    </View>
                  <Text className='tipsMsg'>本系统仅授权员工可以使用，请通知公司负责人审核通过。</Text>
        </View>}
      </View>
    );
  }
}