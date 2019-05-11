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
            'pages/flightInfo/index',
            'pages/selectCity/index',
            'pages/register/index',
            'pages/login/index',
            'pages/msgLogin/index',
            'pages/registerSuccess/index',
            'pages/ticketInfo/index',
            'pages/orderList/index',
            'pages/myMsg/index',
            'pages/reserveMsg/index',
            'pages/selectReserve/index',
            'pages/addPassenger/index',
            'pages/paySuccess/index',
            'pages/orderDetail/index',
            'pages/passengers/index',
            'pages/personalData/index',
            'pages/changePassword/index'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            borderStyle: "black",
            selectedColor: "#000000",
            backgroundColor: "#ffffff",
            color: "#c7c7c7",
            list: [
              {
                pagePath: "pages/index/index",
                // selectedIconPath: "./common/image/tab/discover@highlight.png",
                // iconPath: "./common/image/tab/discover.png",
                text: "首页"
              },
              {
                pagePath: "pages/orderList/index",
                // selectedIconPath: "./common/image/tab/discover@highlight.png",
                // iconPath: "./common/image/tab/discover.png",
                text: "订单"
              },
              {
                pagePath: "pages/myMsg/index",
                // selectedIconPath: "./common/image/tab/my@highlight.png",
                // iconPath: "./common/image/tab/my.png",
                text: "我"
              }
            ]
          }
    };
    componentWillMount () {
        console.log(123)
        if(this.$router.params.path=='pages/register/index'){
            Taro.setStorageSync('path',JSON.stringify(this.$router.params.path))
            Taro.setStorageSync('query',JSON.stringify(this.$router.params.query))
            _login()
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
