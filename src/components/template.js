import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";

class Template extends Component {
  
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
    return ( <View>Template</View>
    );
  }
}


export default Template;
