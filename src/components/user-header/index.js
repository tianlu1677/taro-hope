import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import UIcon from '@/components/uicon'

import './index.module.scss'

class UserHeader extends Component {
  static defaultProps = {
    user: {},
    userMeta: {},
    showFollow: false,
    showEdit: false,
    onFollow: () => {}
  }

  onGoEditUser = () => {
    Taro.navigateTo({url: '/pages/users/edit'})
  }

  render() {

    const { showFollow, showEdit, user, userMeta} = this.props
    return (<View className="user-header">
        <View className="avatar">
          <Image src={user.avatar_url} className="avatar-img" lazyLoad>
          </Image>

          <View className="name">
            {user.name}
          </View>

          {
            showFollow && userMeta.followed && <View className="follow-button" onClick={this.props.onFollow}>
              <Text className="text">已关注</Text>
            </View>
          }

          {showFollow && !userMeta.followed && <View className="unfollow-button" onClick={this.props.onFollow}>
            <Text className="text">关注</Text>
          </View>}

          {
            showEdit && <View className="edit-button" onClick={this.onGoEditUser}>
              <Text className="text">编辑</Text>
            </View>
          }

        </View>

        <View className="detail">
          <UIcon icon={user.gender_text === '男' ? 'man' : 'girl'} ex-class="icon"/>
          {/*<Text>{user.gender_text}</Text>*/}
          <View className="location">
            <Text>{user.location || ''}</Text>
          </View>

        </View>

        <View className="numbers">
          <View className="item">
            <View className="num">{user.topics_count}</View>
            <View className="txt">动态</View>
          </View>
          <View className="item">
            <View className="num">{user.following_count}</View>
            <View className="txt">关注</View>
          </View>
          <View className="item">
            <View className="num">{user.followers_count}</View>
            <View className="txt">被关注</View>
          </View>
          <View className="item">
            <View className="num">{user.topics_likes_hits || 0}</View>
            <View className="txt">被喜欢</View>
          </View>
        </View>
      </View>
    );
  }
}


export default UserHeader;
