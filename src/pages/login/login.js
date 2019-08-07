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
    let img_path = 'http://file.meirixinxue.com/assets/201810222022Pc7f465bda62f206335e603e3a0c56147.jpeg'
    return (
      <View className="login">
        <Image src={img_path} alt="" className="logo"/>
        <Auth />
        {/*<View className="login-button">*/}
        {/*微信用户快速登录*/}
        {/*</View>*/}
      </View>
    );
  }
}
