import Taro, {Component} from "@tarojs/taro";
import {View, Image} from "@tarojs/components";
import Auth from './auth'
import './login.module.scss';

export default class Login extends Component {
  config = {
    navigationBarTitleText: "登录"
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
  }

  render() {
    let img_path = 'http://file.meirixinxue.com/assets/201908171738Pb0ff11415f7f0e33ab88d18670c5ec4c.png'
    return (
      <View className="login">
        <Image src={img_path} alt="" className="logo"/>
        <View className="intro">
          求撩
        </View>
        <Auth />
      </View>
    );
  }
}
