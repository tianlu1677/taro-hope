import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import './base_notify.module.scss'

class BaseNotify extends Component {

  static defaultProps = {
    compStyle: '',
    textStyle: '',
    openType: '',
    plain: false,
    loading: false,
    disabled: false,
    onClick: () => {},
    onGetUserInfo: () => {}
  }

  componentDidMount() {
  }

  render() {
    return ( <View>BaseNotify</View>
    );
  }
}


export default BaseNotify;
