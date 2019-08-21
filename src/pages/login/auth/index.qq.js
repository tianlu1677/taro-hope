import Taro, {Component} from "@tarojs/taro";
import {View, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {loginSystem, getSessionKey} from '@/api/user_api'

const CurrentAPPId = '1109668561'
const CurrentClientType = 'qq'

class Auth extends Component {
  static options = {
    addGlobalClass: true
  }

  getUserInfo = async (session_key, detail) => {
    let account_response = await loginSystem({
      session_key: session_key,
      encrypted_data: detail.encryptedData,
      iv: detail.iv,
      raw_data: detail.rawData,
      app_id: CurrentAPPId,
      client_type: CurrentClientType
    });

    let user = account_response.user

    if (user) {
      Taro.setStorageSync("auth_token", user.auth_token);
      Taro.setStorage({key: "user_id", data: user.id});
      Taro.setStorage({key: "user_name", data: user.name});
      Taro.hideLoading();
      Taro.showToast({
        title: "登录成功",
        icon: "none",
        duration: 500
      });
      let fromPath = Taro.getStorageSync("last_path") || "/pages/home/index";
      Taro.removeStorageSync("last_path");
      Taro.reLaunch({url: fromPath});
    } else {
      // Taro.setStorage({key: 'session_key', data: ''})
      // Taro.reLaunch({url: "/pages/home/index"});
      Taro.showToast({
        title: "未登录成功， 请点击重试",
        icon: "none",
        duration: 500
      });

      // await this.getUserInfo(Taro.getStorageSync('session_key'), detail)
    }
  }

  fetchSessionKey = async () => {
    const code_res = await Taro.login()
    const res_login = await getSessionKey({code: code_res.code, app_id: CurrentAPPId, client_type: CurrentClientType});
    const session_key = res_login.session_key
    await Taro.setStorageSync('session_key', session_key)
    return session_key
  }

  realLogin = async (detail, relogin = false) => {
    if (relogin) {
      let session_key = await this.fetchSessionKey()
      // let session_key = Taro.getStorageSync('session_key')
      await this.getUserInfo(session_key, detail)
      return
    }

    let session_key = Taro.getStorageSync('session_key')
    if (!session_key) {
      session_key = await this.fetchSessionKey()
    }

    await this.getUserInfo(session_key, detail)
  }


  // onSignIn = async (event) => {
  //   const {detail} = event
  //   try {
  //     if (detail.errMsg === 'getUserInfo:ok') {
  //       Taro.checkSession({
  //         success: async (sevent) => {
  //           // console.log('success', sevent)
  //           if(sevent.errMsg === 'checkSession:ok') {
  //             await this.realLogin(detail, false)
  //           } else {
  //             await this.realLogin(detail, true)
  //           }
  //         },
  //         fail: async (e) => {
  //           // console.log('error', e)
  //           // await this.realLogin(detail, true)
  //         }
  //       }).catch(async () => {
  //         await this.realLogin(detail, true)
  //       })
  //     } else {
  //       Taro.showToast({
  //         title: "未登录成功请重试",
  //         icon: "none",
  //         duration: 1000
  //       });
  //     }
  //   }catch (e) {
  //     await this.realLogin(detail, true)
  //   }
  // }


  onSignIn = async (event) => {
    if(event.errMsg !== 'getUserInfo:ok') {
      Taro.showToast({
        title: "请授权当前用户",
        icon: "none",
        duration: 500
      });
      return
    }

    Taro.showToast({
      title: "登录中",
      icon: "none",
      duration: 500
    });
    const { detail } = event
    const code_res = await Taro.login()
    // console.log('xxxx', detail)
    const res_login = await getSessionKey({
      code: code_res.code,
      app_id: CurrentAPPId,
      client_type: CurrentClientType,
      user_info: detail.userInfo
    });
    const session_key = res_login.session_key
    const userInfo = await Taro.getUserInfo()
    // console.log('userinfo', userInfo)

    const user = res_login.user
    Taro.setStorageSync('session_key', session_key)
    Taro.setStorageSync("auth_token", user.auth_token);
    Taro.setStorage({key: "user_id", data: user.id});
    // await updateRawInfo({user_info: userInfo.userInfo, auth_token: user.auth_token});

    Taro.showToast({
      title: "登录成功",
      icon: "none",
      duration: 500
    });
    let fromPath = Taro.getStorageSync("last_path") || "/pages/home/index";
    Taro.removeStorageSync("last_path");
    Taro.reLaunch({url: fromPath});
  }

  render() {
    return (<View>
        <Button open-type="getUserInfo" type="primary" onGetUserInfo={this.onSignIn} class="login-button">
          QQ用户快速登录
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
