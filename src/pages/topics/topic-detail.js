import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import withShare from '@/utils/with_share';
import {dispatchCurrentUser, dispatchFollowUser, dispatchUnFollowUser, dispatchUserDetail, dispatchTopicDetail} from "@/actions"

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
      <View>
        {topicDetail.body}
      </View>
    );
  }
}


export default TopicDetail;
