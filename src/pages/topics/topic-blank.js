import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";

class TopicBlank extends Component {
  config = {
    navigationBarTitleText: "发布心愿"
  };

  constructor() {
    super(...arguments);
  }

  componentDidShow() {
    Taro.redirectTo({url: '/pages/topics/new-topic'})
  }

  render() {
    return (<View />
    );
  }
}

export default TopicBlank;
