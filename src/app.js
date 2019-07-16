import '@tarojs/async-await'
import Taro, {Component} from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import {Provider} from '@tarojs/redux'
import Index from './pages/index'
import configStore from './store'
import {_login} from './api/login'
import pageInit from './utils/pageInit'

// import './api/fly'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {

    config = {
        pages: [
            'pages/appIndex/index',
            'pages/authorize/index',
            'pages/index/index',
            'pages/selectCity/index',
            'pages/register/index',
            'pages/login/index',
            'pages/msgLogin/index',
            'pages/orderList/index',
            'pages/myMsg/index',
            'pages/orderDetail/index',
            'pages/passengers/index',
            'pages/personalData/index',
            'pages/changePassword/index',
            'pages/companyRegister/index',
            
        ],
        "permission": {
          "scope.userLocation": {
            "desc": "将获取您的位置信息"
          }
        },
         
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black',
            backgroundColor: "#ffffff",
        },
        tabBar: {
            borderStyle: "black",
            selectedColor: "#ffd400",
            backgroundColor: "#ffffff",
            color: "#c7c7c7",
            list: [
              {
                pagePath: "pages/index/index",
                selectedIconPath: "./common/image/home1.png",
                iconPath: "./common/image/home.png",
                text: "首页"
              },
              {
                pagePath: "pages/orderList/index",
                selectedIconPath: "./common/image/order1.png",
                iconPath: "./common/image/order.png",
                text: "订单"
              },
              {
                pagePath: "pages/myMsg/index",
                selectedIconPath: "./common/image/my1.png",
                iconPath: "./common/image/my.png",
                text: "我"
              }
            ]
          },
        subPackages: [{
            root: 'pages/planeTicket',
            pages: [
                'pages/flightInfo/index',
                'pages/ticketInfo/index',
                'pages/reserveMsg/index',
            ]
        },{
                root:'pages/admissionTicket',
                pages:[
                    'pages/ticketList/index',
                    'pages/admissionDetail/index',
                    'pages/reserveTicket/index',
                    'pages/ticketOrderDetail/index',
                ]
          },{
                root:'pages/touristRoutes',
                pages:[
                    'pages/reserveRoutes/index',
                    'pages/routesDetail/index',
                    'pages/routesList/index',
                    'pages/routesOrderDetail/index',
                    'pages/collection/index'
                ]
          },{
                root:'pages/wellForm',
                pages:[
                    'pages/myWellForm/index',
                    'pages/reserveWellForm/index',
                    'pages/wellFormDetail/index'
                ]
          },{
                root:'pages/visa',
                pages:[
                    'pages/index/index',
                    'pages/selectCity/index',
                    'pages/visaList/index',
                    'pages/visaDetail/index',
                    'pages/articleDetail/index',
                    'pages/visaReserve/index',
                    'pages/visaOrderDetail/index',
                    
                ]
          }]
    };
    componentWillMount () {
        if(this.$router.params.query.type){
            Taro.setStorageSync('query',JSON.stringify(this.$router.params.query))
        }
    }
    componentDidMount() {
		//将redux状态写入 Taro 中，方便使用
        Taro.$store = store;
        
    }

    componentDidShow() {
        
    }

    componentDidHide() {
    }

    componentCatchError() {
    }

    componentDidCatchError() {
    }
    
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    
    render() {
        return (
            <Provider store={store}>
                <Index/>
            </Provider>
        )
    }
}

Taro.render(<App/>, document.getElementById('app'))
