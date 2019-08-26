import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {dispatchCurrentUser} from '@/actions'
import {connect} from "@tarojs/redux";

import './index.module.scss'

@connect(state => state.user, { dispatchCurrentUser })


class Notification extends Component {
  config = {
    navigationBarTitleText: "消息通知",
  };

  componentDidMount() {
    this.props.dispatchCurrentUser()
  }

  render() {
    return (
      <View className="notifications">

      </View>
    );
  }
}


export default Notification;
