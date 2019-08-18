import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import goPage from '@/utils/page_path'
import hideMan from '@/assets/images/qiuliao-man.png'
import hideWoMan from '@/assets/images/qiuliao-woman.png'

import './topic-avatar.module.scss'

class TopicAvatar extends Component {
  static defaultProps = {
    user: {},
    is_hide: false,
  }

  goUserDetail() {
    const { is_hide, user } = this.props
    if(is_hide) {
      Taro.showToast({
        title: '无法查看匿名用户个人主页',
        icon: 'none'
      })
    } else {
      goPage.goUserDetail(user.id)
    }
  }

  render() {
    const { user, is_hide } = this.props
    const user_avatar = is_hide ? (user.gender === 'man' ? hideMan : hideWoMan) : user.avatar_url
    return (
      <View className="avatar">
        <View className="left" onClick={this.goUserDetail}>
          <View className="cover">
            <Image src={user_avatar} className="cover-img"/>
          </View>
          <View className="name">
            {is_hide ? '匿名用户' : user.name}
          </View>
        </View>
      </View>
    );
  }
}

export default TopicAvatar;
