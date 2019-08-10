import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import './index.module.scss'

class UserHeader extends Component {

  static defaultProps = {
    user: {},
    onClick: () => {
    },
    onGetUserInfo: () => {
    }
  }


  componentDidMount() {

  }

  render() {
    return (<View className="user-header">
        <View className="avatar">
          <Image src="" className="avatar-img">
          </Image>

          <View className="name">
            东半球丸子
          </View>

          <View className="follow">
            <Text className="text">关注</Text>
          </View>
        </View>

        <View className="detail">
          <Text>性别</Text>
          <Text className="location">天津</Text>
        </View>

        <View className="numbers">
          <View className="item">
            <Text className="num">56</Text>
            <Text className="txt">动态</Text>
          </View>
          <View className="item">
            <Text className="num">56</Text>
            <Text className="txt">关注</Text>
          </View>
          <View className="item">
            <Text className="num">56</Text>
            <Text className="txt">被关注</Text>
          </View>
          <View className="item">
            <Text className="num">56</Text>
            <Text className="txt">被喜欢</Text>
          </View>
        </View>
      </View>
    );
  }
}


export default UserHeader;
