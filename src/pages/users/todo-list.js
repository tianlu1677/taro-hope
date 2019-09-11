import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import withShare from '@/utils/with_share';

import './todo-list.module.scss'

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

class TodoList extends Component {
  config = {
    navigationBarTitleText: "我的心愿"
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {

  }

  render() {
    return ( <View className="todo-list">
        <View className="blank"></View>
        <View className="todo">
          <View className="content">
            <View>国庆要做的十件事情</View>
            <View className="time">刚刚</View>
          </View>

          <View className="status">
            <View>ok</View>
          </View>
        </View>

        <View className="todo">
          <View className="content">
            <View>国庆要做的十件事情</View>
            <View className="time">刚刚</View>
          </View>

          <View className="status">
            <View>ok</View>
          </View>
        </View>

        <View className="todo">
          <View className="content">
            <View>国庆要做的十件事情</View>
            <View className="time">刚刚</View>
          </View>

          <View className="status">
            <View>ok</View>
          </View>
        </View>
      </View>
    );
  }
}


export default TodoList;
