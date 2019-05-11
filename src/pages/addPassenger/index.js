import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import { AtSteps,AtSwipeAction,AtToast  } from 'taro-ui'
import {addPassenger} from '../../api/common'
import edit from './images/editInfo.png'
import right from './images/right.png'
import right1 from './images/right1.png'
import add from './images/椭圆 4.png'
import juLiIcon from './images/arrow.png'
import wenHao from './images/wenhao.png'
import more from './images/more.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '新增预订人'
  }

  constructor(){
    super(...arguments)
    this.state={
        toast:false,
        toastText:'',
        name:'',
        IDCard:'',
        Tel:'',
        
      
      
    }
  }

  componentWillMount () {  
      this.state.type=this.$router.params.type
      
      console.log(this.$router.params.type)
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {
    
  } 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  handleNameChange = (event) => {
    let value=event.target.value
    this.setState({
        name: value
    })
}
handleIDCardChange = (event) => {
    let value=event.target.value
    this.setState({
        IDCard: value
    })
}
handleTelChange = (event) => {
    let value=event.target.value
    this.setState({
        Tel: value
    })
}
  addFun(){
    console.log(this.state.name,'添加')
    let telReg = /^[1][1-9][0-9]{9}$/
    this.setState({
        toast:false,
        toastText:''
    })
    if(this.state.name==''){
        // alert('请填写与证件一致的姓名')
        this.setState({
            toast:true,
            toastText:'请填写与证件一致的姓名'
        })
    }else if (this.state.IDCard=='') {
        this.setState({
            toast:true,
            toastText:'请输入公民证件号码'
        })
    }else if(this.state.Tel==''){
        this.setState({
            toast:true,
            toastText:'请填写有效手机号码'
        })
    }else{
      let huZhaoObj=[{
          "DocumentTypeId": 401,
          "DocumentNo": `${this.state.IDCard}`
      }]
      let documents=[...huZhaoObj]
      console.log(documents)
    
      if(this.state.type==3){
          let data={
            Id:0,
            Name:this.state.name,
            Mobile:this.state.tel,
            Documents:documents,
          }
        addPassenger(data)
        .then(res=>{
            console.log(res)
            
        })
      .catch(err => {
        if (!err.message) {
          return
        }
        
      })
      }
    }
  }
  
  render() {
    return (
        <View className='addPassenger'>
            <View class="contactsMsg">
                <View class="box">
                    <View className='ulBox'>
                        <View className='liBox'>
                            <Text className='leftText'>姓名</Text>
                            <Input className='inputText' type="text"  placeholder="与证件的姓名保持一致 " value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
                        </View>
                        <View className='liBox'>
                            <Text className='leftText'>身份证号码</Text>
                            <Input className='inputText' type="number" placeholder="请输入公民证件号码" onChange={this.handleIDCardChange.bind(this)} value={this.state.IDCard}/>
                        </View>
                        <View className='liBox'>
                            <Text className='leftText'>手机号码</Text>
                            <Input className='inputText' type="tel" placeholder="请输入联系人手机号码"  onChange={this.handleTelChange.bind(this)} value={this.state.Tel}/>
                        </View>
                    </View>
                </View>
            </View>
            <View className='btnSure' onClick={this.addFun.bind(this)}>确定</View>
            <AtToast isOpened={this.state.toast} text={toastText} ></AtToast>
        </View>
    );
  }
}