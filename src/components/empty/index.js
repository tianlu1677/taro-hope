import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";

import './index.module.scss'

class Empty extends Component {

  static defaultProps = {
    content: '',
    customStyle: '',
    onClick: () => {},
  }

  componentDidMount() {

  }

  render() {
    return (
      <View className="empty" style={this.props.customStyle} onClick={this.props.onClick}>
        {this.props.content || '暂时还有内容'}
      </View>
    );
  }
}


export default Empty;
