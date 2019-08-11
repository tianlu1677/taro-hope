import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import { followUser, unfollowUser } from "../../api/user_api";


import './index.module.scss'

class Avatar extends Component {

  static defaultProps = {
    user: {},
    showFollow: false
  }
  state = {
    followed: false
  };

  onFollow = followed => {
    let { user } = this.props;
    if (followed) {
      followUser(user.id);
      Taro.showToast({
        title: "关注成功",
        icon: "none",
        duration: 500
      });
    } else {
      unfollowUser(user.id);
    }

    this.setState({
      followed: followed
    });
  };


  componentDidMount() {
    this.setState({
      followed: this.props.followed_user
    });
  }

  render() {
    const { user, showFollow } = this.props
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

        {
          showFollow && <View className="right">
            <View className="follow" onClick={this.onFollow.bind(this, !this.state.followed)}>
              <Text className="txt">{ this.state.followed ? '已关注' : '未关注'}</Text>
            </View>
          </View>
        }

      </View>
    );
  }
}


export default Avatar;
