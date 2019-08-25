import Taro, {Component} from "@tarojs/taro";
import {View, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {getSessionKey} from '@/api/user_api'

const CurrentAPPId = 'wxee56e8f240c9e89b'
const CurrentClientType = 'wechat'

class Auth extends Component {
  static options = {
    addGlobalClass: true
  }

  onSignIn = async (event) => {
    const { detail } = event

    if(detail.errMsg !== 'getUserInfo:ok') {
      Taro.showToast({
        title: "请授权当前用户",
        icon: "none",
        duration: 500
      });
      return
    }

    Taro.showToast({
      title: "登录中...",
      icon: "none",
      duration: 1500
    });

    const code_res = await Taro.login()
    // console.log('xxxx', detail)
    const res_login = await getSessionKey({
      code: code_res.code,
      app_id: CurrentAPPId,
      client_type: CurrentClientType,
      user_info: detail.userInfo
    });
    const session_key = res_login.session_key
    // const userInfo = await Taro.getUserInfo()
    // console.log('userinfo', userInfo)

    const user = res_login.user
    Taro.setStorageSync('session_key', session_key)
    Taro.setStorageSync("auth_token", user.auth_token);
    Taro.setStorage({key: "user_id", data: user.id});

    Taro.showToast({
      title: "登录成功",
      icon: "none",
      duration: 800
    });
    let fromPath = Taro.getStorageSync("last_path") || "/pages/home/index";
    Taro.removeStorageSync("last_path");
    Taro.reLaunch({url: fromPath});
  }

  render() {
    return (<View>
        <Button open-type="getUserInfo" type="primary" onGetUserInfo={this.onSignIn} class="login-button">
          微信用户快速登录
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
