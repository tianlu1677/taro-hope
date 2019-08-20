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

    if(user) {
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
      Taro.showToast({
        title: "未登录成功， 请点击重试",
        icon: "none",
        duration: 500
      });
    }
  }

  fetchSessionKey = async () => {
    const code_res = await Taro.login()
    const res_login = await getSessionKey({code: code_res.code, app_id: CurrentAPPId, client_type: CurrentClientType});
    const session_key = res_login.session_key
    await Taro.setStorage({key: 'session_key', data: session_key})
    return session_key
  }

  realLogin = async (detail, relogin = false) => {
    if(relogin) {
      await this.fetchSessionKey()
      let session_key = Taro.getStorageSync('session_key')
      await this.getUserInfo(session_key, detail)
      return
    }

    let session_key = Taro.getStorageSync('session_key')
    if (session_key.length < 1) {
      await this.fetchSessionKey()
    }

    await this.getUserInfo(session_key, detail)
  }


  onSignIn = async (event) => {
    const {detail} = event
    try {
      if (detail.errMsg === 'getUserInfo:ok') {
        Taro.checkSession({
          success: async (sevent) => {
            // console.log('success', sevent)
            if(sevent.errMsg === 'checkSession:ok') {
              await this.realLogin(detail, false)
            } else {
              await this.realLogin(detail, true)
            }
          },
          fail: async (e) => {
            // console.log('error', e)
            await this.realLogin(detail, true)
          }
        })
      } else {
        Taro.showToast({
          title: "未登录成功请重试",
          icon: "none",
          duration: 1000
        });
      }
    }catch (e) {
      await this.realLogin(detail, true)
    }
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
