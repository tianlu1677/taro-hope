import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import {followUser, unfollowUser} from "@/api/user_api";
import goPage from '@/utils/page_path'
import hideMan from '@/assets/images/qiuliao-man.png'
import hideWoMan from '@/assets/images/qiuliao-woman.png'

import './index.module.scss'

class Avatar extends Component {
  static defaultProps = {
    user: {},
    showFollow: false,
    canEdit: false,
    topic: {},
    is_hide: false,
    size: 'middle',
    currentUserId: '',
  }
  state = {
    followed: false
  };

  onFollow = followed => {
    let {user} = this.props;
    if (followed) {
      followUser(user.id).then((res) => {
        Taro.showToast({
          title: "关注成功",
          icon: "none",
          duration: 500
        });
        this.setState({
          followed: followed
        });
      })
    } else {
      unfollowUser(user.id).then((res) => {
        this.setState({
          followed: followed
        });
      })
    }
  };

  goEditTopic = () => {
    Taro.navigateTo({url: '/pages/topics/new-topic?topic_id=' + this.props.topic.id})
  }

  componentDidMount() {
    this.setState({
      followed: this.props.followed_user
    });
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
    const {user, showFollow, canEdit, is_hide, topic, currentUserId, size} = this.props
    const hide_user_avatar_url = user.gender === 'man' ? hideMan : hideWoMan

    return (
      <View className="avatar">
        {
          is_hide &&  <View className="left" onClick={this.goUserDetail}>
            <View className="cover">
              <Image src={hide_user_avatar_url} className={`cover-img ${size}-cover-img`}/>
            </View>
            <View className={`name ${size}-name`}>
              { user.id === currentUserId ? '匿名用户(自己)' : '匿名用户' }
            </View>
          </View>
        }
        {!is_hide && <View className="left" onClick={this.goUserDetail}>
          <View className="cover">
            <Image src={user.avatar_url} className={`cover-img ${size}-cover-img`}/>
          </View>
          <View className={`name ${size}-name`}>
            { user.name }
          </View>
        </View>
        }

        {
          !is_hide && showFollow && <View className="right">
            {this.state.followed &&
            <View className="follow" onClick={this.onFollow.bind(this, !this.state.followed)}>
              <Text className="txt">已关注</Text>
            </View>
            }
            {
              !this.state.followed &&
              <View className="unfollow" onClick={this.onFollow.bind(this, !this.state.followed)}>
                <Text className="txt">关注</Text>
              </View>
            }
          </View>
        }

        {
          canEdit && <View className="right">
            <View className="edit-btn" onClick={this.goEditTopic}>
              <Text className="txt">编辑</Text>
            </View>
          </View>
        }

      </View>
    );
  }
}


export default Avatar;
