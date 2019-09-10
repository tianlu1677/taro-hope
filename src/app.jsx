import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import { getTenant } from "@/api/tenant_api"

import Index from './pages/index'

import configStore from './store'

import './app.scss'
import './styles/index.scss';
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/home/index',
      'pages/users/mine',
      'pages/users/detail',
      'pages/users/edit',
      'pages/users/edit-detail',
      'pages/login/login',
      'pages/topics/new-topic',
      'pages/topics/topic-detail',
      'pages/topics/topic-blank',
      'pages/videos/preview',
      'pages/index',
      'pages/notifications/index',
      'pages/users/todo-list'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '心愿清单',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#666",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [
         {
          pagePath: "pages/users/todo-list",
          iconPath: "./assets/tab-bar/heart-1.png",
          selectedIconPath: "./assets/tab-bar/heart-2.png",
          text: "心愿"
        },
      {
        pagePath: "pages/home/index",
        iconPath: "./assets/tab-bar/home-1.png",
        selectedIconPath: "./assets/tab-bar/home-2.png",
        text: "广场"
      },
      {
        pagePath: "pages/users/mine",
        iconPath: "./assets/tab-bar/user-1.png",
        selectedIconPath: "./assets/tab-bar/user-2.png",
        text: "账号"
      }]
    }
  }

  componentDidMount () {
    getTenant().then((res) => {
      // console.log('res', res)
      if(res){
        Taro.setStorage({key: 'tenant', data: res.tenant})
      }
    }).catch()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
