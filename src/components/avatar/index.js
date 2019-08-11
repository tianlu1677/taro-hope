import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import './index.module.scss'

class Avatar extends Component {

  static defaultProps = {
    user: {}
  }


  componentDidMount() {

  }

  render() {
    const { user } = this.props
    return (
      <View className="avatar">

        <View className="left">
          <View className="cover">
            <Image src={user.avatar_url} className="cover-img"/>
          </View>

          <View className="name">
            {user.name}
          </View>
        </View>

        <View className="right">
          <View className="follow">
            <Text className="txt">关注中</Text>
          </View>
        </View>
      </View>
    );
  }
}


export default Avatar;
