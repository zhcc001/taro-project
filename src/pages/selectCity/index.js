import Taro , { Component,Config } from '@tarojs/taro';
import { View, Text , Button,Input} from '@tarojs/components';
import sousuo from './images/sousuo.png'
import dingwei from './images/定位-(1).png'
import {AtIndexes,AtToast } from "taro-ui"
import {getCity} from '../../api/common'
import './index.scss'
export default class Index extends Component {

   config = {
       navigationBarTitleText: '选择城市'
  }

    constructor(props) {
      super(...arguments)
      this.state = {
        menu:[
          {
             title: '国内城市',
          },
          // {
          //   title: '港澳台/境外城市',
          // }
        ],
        hisCountry:[{
              value:12,
              Name:"韩国",
          },{
              value:12,
              Name:"法国",
          },{
              value:12,
              Name:"泰国",
          },],
          hotCountry:[{
              value:12,
              Name:"韩国",
          },{
              value:13,
              Name:"法国",
          },{
              value:14,
              Name:"泰国",
          },{
              value:15,
              Name:"日本",
          },{
              value:16,
              Name:"加拿大",
          },{
              value:16,
              Name:"菲律宾",
          },{
              value:16,
              Name:"加拿大",
          }],
          cityList : [{
              title: 'A',
              key: 'A',
              items: [
                {
                  'name': '阿坝'
                // 此处可加其他业务字段
                },
                {
                  'name': '阿拉善'
                }]
            },
            {
              title: 'B',
              key: 'B',
              items: [
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                }]
            },{
              title: 'C',
              key: 'C',
              items: [
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                }]
            },{
              title: 'D',
              key: 'D',
              items: [
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                }]
            },{
              title: 'E',
              key: 'E',
              items: [
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                }]
            },{
              title: 'F',
              key: 'F',
              items: [
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                }]
            },{
              title: 'G',
              key: 'G',
              items: [
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                }]
            },{
              title: 'H',
              key: 'H',
              items: [
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                }]
            },{
              title: 'I',
              key: 'I',
              items: [
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                },{
                  'name': '北京'
                },{
                  'name': '北京'
                },{
                  'name': '北京'
                },{
                  'name': '北京'
                },]
            },{
              title: 'J',
              key: 'J',
              items: [
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                },
                {
                  'name': '保定'
                },
                {
                  'name': '保定'
                }]
            },{
              title: 'K',
              key: 'K',
              items: [,
                {
                  'name': '保定'
                },{
                  'name': '保定'
                },
                {
                  'name': '北京'
                },
                {
                  'name': '保定'
                }]
            },
    ],
    keyWord:'',
    }
  }
  
  componentWillMount () {
    this._getCity()
  }
  componentDidMount () {

  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  onClick (item) {
    console.log(item)
    if(this.$router.params.type==1){
      Taro.setStorageSync(`startCityName`, `${item.name}`)
      Taro.setStorageSync(`startCityValue`, `${item.value}`)
    }else{
      Taro.setStorageSync(`endCityName`, `${item.name}`)
      Taro.setStorageSync(`endCityValue`, `${item.value}`)
    }
    
    Taro.switchTab({
      url:`/pages/index/index`
    })
  };
  // 获取城市列表
  _getCity(){
    getCity(204,true,this.state.keyWord)
      .then(res=>{
        this.setState({
          cityList:res.Result
        })
        
        })
      .catch(err => {
        if (!err.message) {
          return
        }
        
      })
  }
  render() {
      const {cityList,menu,hisCountry} =this.state
    return (
      <View className='selectCity'>
        <View class="input-menu">
        <View class="select-input">
          <View class="select">
              <Image className='sousuoIcon' src={sousuo} />
              <Input value={this.state.keyWord} placeholder="搜索全球城市名称"/>
          </View>
        </View>
        <View class="tabTitle">
          <View className='olBox'>
            {menu.map((item,index)=>{
              return (
                <View className='liBox'   onClick={this.chooseMenu.bind(index)}>
              <View className="itemTab">
                <Text className='itemp'>{item.title}</Text>
                <Text className='itemi' if='index==tabFlag'></Text>  
              </View>
            </View>
              )
            })}
            
          </View>
        </View>
      
    </View>
    
        <View className='cityNav'>
            <View className='guiNei'>
            <View class="dingWei">
           <View className='dingweiH6'>定位城市</View>
           <View className='dingweiOl'> 
             <View className='dingweiLi'>
               <View className='dingweiDiv'>
                 <Image className='dingweiIcon' src={dingwei} />
                 <Text className='dingweiText'>上海市</Text>
               </View>
             </View>
             <View>
               {/* <View>
                 <Image src="../../assets/img/index/重新加载.png" />
                 <Txet>重新定位</Txet>
               </View> */}
             </View> 
           </View>
         </View>
         <View class="searchHistory">
            <View className='dingweiH6'>历史搜索</View>
            <View className='cityOlBox'>
               {hisCountry.map((item,index)=>{
                 return (
                  <View className='cityLiBox' >{item.Name}</View>
                 )
                })
              }
            </View>
          </View>
          <View class="hotCountry">
            <View className='dingweiH6'>热门国家</View>
            <View className='cityOlBox'>
               {hotCountry.map((item,index)=>{
                 return (
                  <View className='cityLiBox' >{item.Name}</View>
                 )
                })
              }
            </View>
          </View>
            </View>
        </View>
        <View className='listBox'>
        <AtIndexes
          list={cityList}
          onClick={this.onClick.bind(this)}
        >
          <View className='dingweiH6'>城市选择</View>
        </AtIndexes>
        </View>
      </View>
    );
  }
}
