import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";

class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {

  }

  render() {
    return ( <View/>
    );
  }
}


export default Index;
