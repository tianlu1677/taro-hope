import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image,Button } from "@tarojs/components";
import {connect} from "@tarojs/redux";
import Avatar from '@/components/avatar'
import ImageBox from '@/components/image-box'
import UIcon from '@/components/uicon'
import Division from '@/components/division'
import goPage from '@/utils/page_path'
import TopicAvatar from './topic-avatar'

import './index.module.scss'

class BaseTopic extends Component {
  static defaultProps = {
    baseTopic: {user: {}},
    onClick: () => {},
    onGetUserInfo: () => {}
  }

  componentDidMount() {

  }

  goTopicDetail = (id) => {
    goPage.goTopicDetail(id)
  }

  render() {
    const { baseTopic, baseTopic: { user } } = this.props
    const username = baseTopic.is_hide ? '匿名用户' : baseTopic.user.name
    return ( <View className="topic-item">
        <View className="avatar-wrapper">
          <TopicAvatar
            user={user}
            is_hide={baseTopic.is_hide}
          />
        </View>

        <View className="body" onClick={this.goTopicDetail.bind(this, baseTopic.id)}>
          <View className="body-text">
            {baseTopic.body}
          </View>
          {
            baseTopic.body.length > 120
            && <View className="body-more">
              更多
            </View>
          }
        </View>

        <View className="medias">
          <ImageBox
            medias={baseTopic.medias}
            video_content={baseTopic.video_content}
            topic_id={baseTopic.id}
            onTopicDetail={this.goTopicDetail.bind(this, baseTopic.id)}
          >
          </ImageBox>
        </View>

        <View className='action-list'>
          <View className='action-left' onClick={this.goTopicDetail.bind(this, baseTopic.id)}>
            <View className="action">
              <UIcon icon="view-user" ex-class="icon"/>
              <Text className='icon-text'>{baseTopic.hits}</Text>
            </View>
            <View className="action">
              <UIcon icon="like" ex-class="icon"/>
              <Text className='icon-text'>{baseTopic.likes_count > 0 ? baseTopic.likes_count : '喜欢'}</Text>
            </View>
            <View className="action">
              <UIcon icon="comment" ex-class="icon"/>
              <Text className='icon-text'>撩ta</Text>
            </View>
          </View>
          {/*<View className='action-right'>*/}
            <Button
              open-type="share"
              className="share-button"
              share-id={baseTopic.id}
              data-nickname={username}
              data-cover={baseTopic.medias[0]}
              data-type="topic"
              data-id={baseTopic.id}
            >
              <UIcon icon='share' ex-class="icon" />
              <Text className="icon-text">分享</Text>
            </Button>
          {/*</View>*/}
        </View>
        <Division />
      </View>
    );
  }
}


export default BaseTopic;
