import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import goPage from '@/utils/page_path'

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
    return (
      <View className="avatar">
        <View className="left" onClick={this.goUserDetail}>
          <View className="cover">
            <Image src={is_hide ? 'http://file.meirixinxue.com/assets/201908160114P781f3210085aa854d1e8dcfc397e824a.jpg?imageView2/0/h/100/interlace/1|imageslim' : user.avatar_url} className="cover-img"/>
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
