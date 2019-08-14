import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image, } from "@tarojs/components";
import {connect} from "@tarojs/redux";
import Avatar from '@/components/avatar'
import ImageBox from '@/components/image-box'
import UIcon from '@/components/uicon'
import Division from '@/components/division'
import goPage from '@/utils/page_path'

import './index.module.scss'

class BaseTopic extends Component {
  static defaultProps = {
    baseTopic: {},
    onClick: () => {},
    onGetUserInfo: () => {}
  }

  componentDidMount() {

  }

  goTopicDetail = (id) => {
    goPage.goTopicDetail(id)
  }

  render() {
    const { baseTopic } = this.props

    return ( <View className="topic-item">
        <View className="avatar-wrapper">
          <Avatar
            showFollow={false}
            user={baseTopic.user}
          />
        </View>

        <View className="body" onClick={this.goTopicDetail.bind(this, baseTopic.id)}>
          {baseTopic.body}
        </View>

        <View className="medias">
          <ImageBox
            medias={baseTopic.medias}
            video_content={baseTopic.video_content}
            topic_id={baseTopic.id}
          >
          </ImageBox>
        </View>

        <View className='action'>
          <View className='action-left'>
            <UIcon icon="view-user" ex-class="icon"/> <Text className='icon-text'>{baseTopic.hits}</Text>
            <UIcon icon="like" ex-class="icon"/> <Text className='icon-text'>{baseTopic.likes_count}</Text>
            <UIcon icon="comment" ex-class="icon"/> <Text className='icon-text'>231</Text>
          </View>
          <View className='action-right'>
            <UIcon icon="share" ex-class="icon"/> <Text className='icon-text'>231</Text>
          </View>
        </View>
        <Division/>
      </View>
    );
  }
}


export default BaseTopic;
