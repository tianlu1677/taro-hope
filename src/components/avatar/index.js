import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import { followUser, unfollowUser } from "@/api/user_api";
import goPage from '@/utils/page_path'
import {connect} from "@tarojs/redux";

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

  goUserDetail() {
    goPage.goUserDetail(this.props.user.id)
  }

  render() {
    const { user, showFollow } = this.props
    return (
      <View className="avatar">
        <View className="left" onClick={this.goUserDetail}>
          <View className="cover">
            <Image src={user.avatar_url} className="cover-img"/>
          </View>
          <View className="name">
            {user.name}
          </View>
        </View>

        {
          showFollow && <View className="right">
            { this.state.followed &&
              <View className="follow" onClick={this.onFollow.bind(this, !this.state.followed)}>
                <Text className="txt">已关注</Text>
              </View>
            }
            {
              !this.state.followed && <View className="unfollow" onClick={this.onFollow.bind(this, !this.state.followed)}>
                <Text className="txt">关注</Text>
              </View>
            }

          </View>
        }

      </View>
    );
  }
}


export default Avatar;
