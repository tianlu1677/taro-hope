import Taro, {
  Component
} from "@tarojs/taro";
import {
  View, Button
} from "@tarojs/components";

import { AtInput } from 'taro-ui';

import {
  connect
} from "@tarojs/redux";
import { phoneLogin } from '@/api/user_api'

class Auth extends Component {
  static options = {
    addGlobalClass: true
  }

  state = {
    phone: '18612341234',
    password: '123456'
  }

  onSignIn = async () => {
    const { phone, password} = this.state;
    if(!phone || !password) {
      return
    }

    const res = await phoneLogin({phone_number: phone, password: password})
    if(res.error) {
      Taro.showToast({
        title: res.error,
        icon: "none",
        duration: 1500
      })
    } else {
      Taro.showToast({
        title: "登录成功",
        icon: "none",
        duration: 500
      });
      const user = res.user
      Taro.setStorageSync("token", user.auth_token);
      Taro.setStorage({ key: "user_id", data: user.id });
      Taro.setStorage({ key: "user_name", data: user.name });
      let fromPath = Taro.getStorageSync("last_path") || "/pages/home/index";
      Taro.removeStorageSync("last_path");
      Taro.reLaunch({ url: fromPath });
    }
  }

  handlePhoneChange = (e) => {
    this.setState({
      phone: e
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e
    })
  }

  render() {
    return (<View>
        <View style={{marginTop: '30px'}} />
        <AtInput
          name='phone'
          title='手机号'
          type='text'
          placeholder='手机号'
          value={this.state.phone}
          onChange={this.handlePhoneChange}
        />

        <AtInput
          name='password'
          title='密码'
          type='text'
          placeholder='密码'
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <View style={{marginTop: '20px'}} />
        <Button type="primary" onClick={this.onSignIn}>登录</Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
