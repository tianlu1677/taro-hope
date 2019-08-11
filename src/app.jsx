import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

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
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [
        {
        pagePath: "pages/home/index",
        iconPath: "./assets/tab-bar/qiuliao-1.png",
        selectedIconPath: "./assets/tab-bar/qiuliao-11.png",
        text: "首页"
      }, {
          pagePath: "pages/topics/new-topic",
          iconPath: "./assets/tab-bar/qiuliao-2.png",
          selectedIconPath: "./assets/tab-bar/qiuliao-2.png",
          text: "发布"
        },
      {
        pagePath: "pages/users/mine",
        iconPath: "./assets/tab-bar/qiuliao-3.png",
        selectedIconPath: "./assets/tab-bar/qiuliao-31.png",
        text: "我"
      }]
    }
  }

  componentDidMount () {}

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
