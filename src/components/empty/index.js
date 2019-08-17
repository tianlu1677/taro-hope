import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";

import './index.module.scss'

class Empty extends Component {

  static defaultProps = {
    content: '',
    onClick: () => {
    },
  }

  componentDidMount() {

  }

  render() {
    return (
      <View className="empty" onClick={this.props.onClick}>
        {this.props.content || '暂时还有内容'}
      </View>
    );
  }
}


export default Empty;
