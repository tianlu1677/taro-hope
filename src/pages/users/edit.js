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

// @connect(({topic: {currentAccount}}) => ({
//   currentAccount
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

class Edit extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {

  }

  render() {
    return ( <View>Template</View>
    );
  }
}


export default Edit;
