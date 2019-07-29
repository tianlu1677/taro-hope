import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import withShare from '@/utils/with_share';

@withShare({
  title: '',
  imageUrl: '',
  path: '',
  target_id: '',
  target_type: ''
})

// @connect(({topic: {topicDetail}}) => ({
//   topicDetail
// }), (dispatch) => ({
//   asyncTopicDetail(topic_id) {
//     dispatch(asyncTopicDetail(topic_id))
//   },
//   topicCreateAction(topic_id, action_type) {
//     dispatch(topicCreateAction(topic_id, action_type))
//   },
//   topicDestroyAction(topic_id, action_type) {
//     dispatch(topicDestroyAction(topic_id, action_type))
//   },
// }))

class Mine extends Component {
  config = {
    navigationBarTitleText: "我"
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
   
  }

  render() {
    return ( <View>Mine</View>
    );
  }
}


export default Mine;
