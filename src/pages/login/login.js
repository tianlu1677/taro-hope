import Taro, {Component} from "@tarojs/taro";
import {View, Image} from "@tarojs/components";
import Header from '@/components/header'
import goPage from '@/utils/page_path'

import Auth from './auth'

import './login.module.scss';

export default class Login extends Component {
  config = {
    // navigationBarTitleText: "登录",
    navigationStyle: "custom",
  };

  constructor() {
    super(...arguments);
    this.tenant = Taro.getStorageSync('tenant')
  }

  componentDidMount() {
  }

  goHome = () => {
    goPage.goHomeUrl()
  }

  render() {
    let img_path = this.tenant.cover_url //'http://file.meirixinxue.com/assets/201908171738Pb0ff11415f7f0e33ab88d18670c5ec4c.png'
    return (
      <View className="login">
        <View className="login-header">
          <Header
            title="登录"
            handleBack={this.goHome}
          />
        </View>

        <Image src={img_path} alt="" className="logo"/>
        <View className="intro">
          { this.tenant.nickname }
        </View>
        <Auth />
      </View>
    );
  }
}
