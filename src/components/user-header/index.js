import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import UIcon from '@/components/uicon'
import Header from '@/components/header'
import HasNotice from '@/assets/images/has-notice.png'
import NoNotice from '@/assets/images/no-notice.png'
import {AtBadge} from 'taro-ui'


import './index.module.scss'

class UserHeader extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    user: {name: ''},
    userMeta: {},
    showFollow: false,
    showEdit: false,
    showLogin: false,
    unreadNotification: 0,
    onFollow: () => {
    }
  }

  onGoEditUser = () => {
    Taro.navigateTo({url: '/pages/users/edit'})
  }

  onGoLogin = () => {
    Taro.redirectTo({url: '/pages/login/login'})
  }

  onGoNotice = () => {
    Taro.navigateTo({url: '/pages/notifications/index'})
  }

  render() {
    const {showFollow, showEdit, showLogin, user, userMeta, unreadNotification} = this.props
    const showHeader = !(showEdit || showLogin)

    return (<View className="user-header">
        {
          showHeader && <View className="header">
            <Header title={user.name}/>
          </View>

        }
        <View className="avatar" style={{marginTop: showHeader ? Taro.pxTransform(150) : ''}}>
          <Image src={user.avatar_url} className="avatar-img" lazyLoad>
          </Image>

          <View className="name">
            {user.name && user.name.substr(0, 9)}
          </View>

          {
            showFollow &&
            (userMeta.followed
              ? <View className="follow-button" onClick={this.props.onFollow}>
                <Text className="text">关注中</Text>
              </View>
              :
              <View className="unfollow-button" onClick={this.props.onFollow}>
                <Text className="text">关注</Text>
              </View>)
          }

          {
            showEdit &&
            <View className="logined-user">
              <View className="edit-button" onClick={this.onGoEditUser}>
                <Text className="text">编辑</Text>
              </View>
              <View className="notice" onClick={this.onGoNotice}>
                {unreadNotification > 0 ? <AtBadge value={1} maxValue={99}>
                    <Image src={NoNotice} className="img"/>
                  </AtBadge>
                  : <AtBadge dot={false}>
                    <Image src={NoNotice} className="img"/>
                  </AtBadge>
                }
              </View>
            </View>
          }

          {
            showLogin && <View className="edit-button" onClick={this.onGoLogin}>
              <Text className="text">登录</Text>
            </View>
          }
        </View>

        <View className="detail">
          <UIcon icon={user.gender_text === '男' ? 'man' : 'girl'} ex-class="icon"/>
          {
            user.location &&
            <View className="location">
              <Text>{user.location || ''}</Text>
            </View>
          }
        </View>

        <View className="numbers">
          <View className="item">
            <View className="num">{user.topics_count || 0}</View>
            <View className="txt">动态</View>
          </View>
          <View className="item">
            <View className="num">{user.following_count || 0}</View>
            <View className="txt">关注</View>
          </View>
          <View className="item">
            <View className="num">{user.followers_count || 0}</View>
            <View className="txt">被关注</View>
          </View>
          <View className="item">
            <View className="num">{user.topics_likes_hits > 0 ? user.topics_likes_hits : 0}</View>
            <View className="txt">被喜欢</View>
          </View>
        </View>
      </View>
    );
  }
}


export default UserHeader;
