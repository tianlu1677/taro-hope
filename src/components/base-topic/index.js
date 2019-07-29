import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";

class BaseTopic extends Component {
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
    return ( <View>BaseTopic</View>
    );
  }
}


export default BaseTopic;
