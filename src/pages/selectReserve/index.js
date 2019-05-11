import Taro , { Component,Config } from '@tarojs/taro'
import { View, Text , Button,Input,Image} from '@tarojs/components'
import { AtSteps,AtSwipeAction,AtToast   } from 'taro-ui'
import {getYouKeList} from '../../api/common'
import edit from './images/editInfo.png'
import right from './images/right.png'
import right1 from './images/right1.png'
import add from './images/椭圆 4.png'
import juLiIcon from './images/arrow.png'
import './index.scss'
export default class Index extends Component  {

   config = {
       navigationBarTitleText: '选择预定人'
  }

  constructor(){
    super(...arguments)
    this.state={
      companyName:'上海牛邦网络科技有限公司',
      current: 1,
      type:'',
      list:[{
          Name:'张四',
          Tel:'14544445555',
          IDCard:'5148324512845984538945',
          
      },{
        Name:'张三',
        Tel:'14544445555',
        IDCard:'',
        
    },{
        Name:'张五',
        Tel:'14544445555',
        IDCard:'5148324512845984538945',
        
    },{
        Name:'张六',
        Tel:'14544445555',
        IDCard:'5148324512845984538945',
        
    },],
    checkPersonArr:[],
    contactArr:[],
    toast:false,
    toastText:'',
    
      
      
    }
  }

  componentWillMount () {  
      this.state.type=this.$router.params.type
      if(this.state.type==1){
        this._getYouKeList()
        if(Taro.getStorageSync('checkPersonArr')){
            this.state.checkPersonArr=JSON.parse(Taro.getStorageSync('checkPersonArr')) 
          }
          if(Taro.getStorageSync('contactArr')){
            this.state.contactArr=JSON.parse(Taro.getStorageSync('contactArr')) 
          }
      }
      console.log(this.$router.params.type)
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  gotoAddPassenger(type){
    Taro.redirectTo({
      url: `/pages/addPassenger/index?type=${type}`
      
    })
  };
  checkPersonGroup(t,index) {
  
    if(t.IDCard!=''){
        this.setState({
            contactArr:[]
        })
        this.state.contactArr=[]
        console.log('indexindex')
    if (this.state.checkPersonArr.indexOf(index) < 0) {
        console.log('添加第一条')
        // this.setState({
        //     checkPersonArr:this.state.checkPersonArr
        // })
        this.state.checkPersonArr.push(index)
        
    } else {
        // this.setState({
        //     checkPersonArr:this.state.checkPersonArr
        // })
        this.state.checkPersonArr.splice(this.state.checkPersonArr.indexOf(index), 1)
       
        console.log('截取第一条')
    }
        this.state.checkPersonArr.map(item =>{
        // this.setState({
        //     contactArr:this.state.contactArr,
        // })
        this.state.contactArr.push(this.state.list[item])
        
    })
    
    }else{
        this.setState({
            toast:true,
            toastText:'请完善乘机人信息'
        })
    }
    this.setState({
        contactArr:this.state.contactArr,
        checkPersonArr:this.state.checkPersonArr
    })
    console.log(this.state.contactArr,'contactArr')
    
  }
  // 获取常用有列表
  _getYouKeList(){
    getYouKeList(402)
    .then(res=>{
        this.list = res.Result.Result
      })
    .catch(err => {
      if (!err.message) {
        return
      }
      this.setState({
        toast:true,
        toastText:err.message
    })
    })
  }
//   确定选择乘机人
//   确定选择预订人
sureSelect(){
    console.log(this.state.contactArr,'this.state.contactArr')
    if(this.state.contactArr.length==0){
        this.setState({
            toast:true,
            toastText:'请选择预订人'
        })
    }else{
        // H5环境使用
        // localStorage.setItem('contactArr',JSON.stringify(this.contactArr))
        // localStorage.setItem('checkPersonArr',JSON.stringify(this.checkPersonArr))
        Taro.setStorageSync(`checkPersonArr`, `${JSON.stringify(this.state.checkPersonArr)}`)
        Taro.setStorageSync(`contactArr`, `${JSON.stringify(this.state.contactArr)}`)
        Taro.navigateTo({
            url:`/pages/reserveMsg/index?type=${this.$router.params.type}&tablecurrent=${this.$router.params.tablecurrent}`
        })
       
    }
    
}
  render() {
    const {list,checkPersonArr}=this.state
    return (
        <View className='selectReserve'>
            {this.state.type==2&&<View class="passContent" >
                <View class="passSearch" >
                    <Input  type="text" placeholder="请输入姓名／手机号码／身份证号码"/>
                    <View className='btnSearch'>查询</View>
                </View>
            </View>}
            {this.state.type==1&&<View className='ulBox'>
                {list.map((item,index)=>{
                    return (
                        <View className='liBox'>
                    <View class="msgBox">
                        <View class="leftImg"  onClick={this.checkPersonGroup.bind(this,item,index)}>
                        
                           <Image src={this.state.checkPersonArr.indexOf(index)<0?right1:right} />
                           
                        </View>
                        <View class="midText">
                            <View className='itemName'>{item.Name} {item.Tel}</View>
                            <View className='itemCard'>证件号码|{item.IDCard}</View>
                        </View>
                        <View class="editImg" >
                            <Image src={edit} />
                        </View>
                    </View>
                </View>
                    )
                    
                })}
                
            </View>}
            <View className='addIcon' onClick={this.gotoAddPassenger.bind(this,3)}>
                <Image className="addImg"  src={add} />
            </View>
            <View className='footer'>
                <View className='numSelect'>已选择预订人：{this.state.checkPersonArr.length}人</View>
                <View  className='sureSelect' onClick={this.sureSelect.bind(this)}>确定</View>
            </View>
            <AtToast isOpened={this.state.toast} text={toastText} ></AtToast>
        </View>
    );
  }
}