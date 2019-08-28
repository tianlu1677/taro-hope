import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import Avatar from '@/components/avatar'
import Division from '@/components/division'
import goPage from '@/utils/page_path'
import './base_notify.module.scss'

class BaseNotify extends Component {

  static defaultProps = {
    compStyle: '',
    textStyle: '',
    user: {},
    notification: {mention: {}, reply: {}, topic: {}},

    onClick: () => {},
  }

  componentDidMount() {
  }

  goTopicDetail(topic_id) {
    goPage.goTopicDetail(topic_id)
  }

  render() {
    const { user, notification, notification: { created_at_text, notify_type, reply, topic, mention, target_type, target_id} } = this.props

    const topic_id = (topic && topic.id) || (reply && reply.topic_id) || (mention  && mention.topic_id)

    // console.log('xxx', topic_id)

    return ( <View className="notify">
        <Avatar user={user} />

        <View className="content">
          {/*创建topic*/}
          {
            notify_type === 'topic' && topic && <View onClick={this.goTopicDetail.bind(this, topic.id)}>发布了新动态</View>
          }
          {/*回复topic*/}

          {
            notify_type === 'topic_reply' &&
            <View onClick={this.goTopicDetail.bind(this, notification.reply.topic_id)}>
              <View>{notification.reply.body}</View>
              <View className="root-reply"><Text className="me">我: </Text> 原动态</View>
            </View>
          }

          {/*评论的回复*/}

          {
            notify_type === 'mention' && mention && <View onClick={this.goTopicDetail.bind(this, notification.mention.topic_id)}>
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

          <View className="bottom" onClick={this.goTopicDetail.bind(this, topic_id)}>
            <View>{created_at_text}</View> ·
            <View>回复</View>
          </View>
        </View>
      </View>
    );
  }
}


export default BaseNotify;
