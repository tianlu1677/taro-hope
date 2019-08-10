import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import './index.module.scss'

class UserHeader extends Component {
  static defaultProps = {
    user: {},
    showFollow: false,
    showEdit: false
  }

  render() {

    const { showFollow, showEdit} = this.props
    return (<View className="user-header">
        <View className="avatar">
          <Image src="" className="avatar-img">
          </Image>

          <View className="name">
            东半球丸子
          </View>

          {
            showFollow && <View className="follow-button">
              <Text className="text">关注</Text>
            </View>
          }

          {
            showEdit && <View className="edit-button">
              <Text className="text">编辑</Text>
            </View>
          }

        </View>

        <View className="detail">
          <Text>性别</Text>
          <Text className="location">天津</Text>
        </View>

        <View className="numbers">
          <View className="item">
            <View className="num">56</View>
            <View className="txt">动态</View>
          </View>
          <View className="item">
            <View className="num">56</View>
            <View className="txt">关注</View>
          </View>
          <View className="item">
            <View className="num">56</View>
            <View className="txt">被关注</View>
          </View>
          <View className="item">
            <View className="num">56</View>
            <View className="txt">被喜欢</View>
          </View>
        </View>
      </View>
    );
  }
}


export default UserHeader;
