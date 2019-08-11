import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image, Swiper, SwiperItem} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import withShare from '@/utils/with_share';
import {dispatchCurrentUser, dispatchFollowUser, dispatchUnFollowUser, dispatchUserDetail, dispatchTopicDetail} from "@/actions"
import Avatar from '@/components/avatar'
import Division from '@/components/division'
import './topic-detail.module.scss'

@withShare({
  title: '',
  imageUrl: '',
  path: '',
  target_id: '',
  target_type: ''
})
@connect(state => state, { dispatchCurrentUser, dispatchUserDetail, dispatchFollowUser, dispatchUnFollowUser,dispatchTopicDetail })

class TopicDetail extends Component {
  config = {
    navigationBarTitleText: "动态详情"
  };

  constructor() {
    super(...arguments);
    this.topic_id = this.$router.params.topic_id
  }

  componentDidMount() {
    this.props.dispatchTopicDetail({topic_id: this.topic_id})
  }

  render() {
    const { topicDetail } = this.props.topic
    return (
      <View className="topic-detail">
        <View className="user">
          <Avatar
            user={topicDetail.user}
          >
          </Avatar>
        </View>

        {
          topicDetail.medias &&  <View className="images">
            <Swiper
              indicatorDots
              indicatorColor={'rgba(0, 0, 0, .3)'}
              indicator-active-color={"#000000"}
              circular
              className="media-list"
              style={{height: '490px'}}
            >
              <View>
                {topicDetail.medias.map((media) => {
                  return <SwiperItem className="media" key={media}>
                    <Image src={media} className="media-img">
                    </Image>
                  </SwiperItem>
                })}
              </View>
            </Swiper>
          </View>
        }

        {
          topicDetail.body && <View className="body">
            字节跳动方面，今日头条App升级的新版本中给予了小程序更高的权重，更加突出小游戏和小程序的信息流推荐。在App的频道中新增了“小游戏”类目，将小游戏作为中心化入口进行分发。在信息流页面中出现了直推的小程序服务。信息流是今日头条核心的流量，通过信息流小程序将有更多的被曝光的机会。 百度在今年的AI开发者大会上也给予了小程序更多的曝光，开源的智能小程序将为APP构建一座座桥梁，打通App形成的信息孤岛。用户通过搜索和信息流接触到企业相关信息后，可以直接通过百度智能小程序完成体验、购买等直接操作
          </View>
        }


        <View className="numbers">
          <View className="created_at">
            6月11日发布
          </View>

          <View className="views_count">
            浏览998
          </View>
        </View>

        <Division/>
      </View>
    );
  }
}


export default TopicDetail;
