import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import Avatar from '@/components/avatar'
import Division from '@/components/division'
import './base_notify.module.scss'

class BaseNotify extends Component {

  static defaultProps = {
    compStyle: '',
    textStyle: '',
    user: {},
    notification: {mention: {}, reply: {}},

    onClick: () => {},
    onGetUserInfo: () => {}
  }

  componentDidMount() {
  }

  render() {
    const { user, notification, notification: { created_at_text, notify_type, target_type, target_id} } = this.props

    return ( <View className="notify">
        <Avatar user={user} />

        <View className="content">
          {/*创建topic*/}
          {
            notify_type === 'topic' && <View>发布了新动态</View>
          }
          {/*回复topic*/}

          {
            notify_type === 'topic_reply' &&
            <View>
              <View>{notification.reply.body}</View>
              <View className="root-reply"><Text className="me">我: </Text> 原动态</View>
            </View>
          }

          {/*评论的回复*/}

          {
            notify_type === 'mention' && <View>
              <View>{notification.mention.body}</View>
              <View className="root-reply"><Text className="me">我: </Text> {notification.mention.reply_body}</View>
            </View>
          }

          {/*关注*/}

          {
            notify_type === 'follow' && <View>
              <View>关注了你</View>
            </View>
          }


          {/*赞*/}

          <View className="bottom">
            <View>{created_at_text}</View> ·
            <View>回复</View>
          </View>
        </View>
      </View>
    );
  }
}


export default BaseNotify;
