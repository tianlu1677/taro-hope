import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import AddTopic from '@/components/add-topic';
import withShare from '@/utils/with_share';
import { dispatchCurrentUser, dispatchCurrentUserMoreInfo, dispatchUserUnReadNotification} from '@/actions'
import { getMineTopicList, getDefaultUserTopicList } from '@/api/user_api'
import goPage from "@/utils/page_path"
import UIcon from '@/components/uicon'
import './todo-list.module.scss'

@withShare({
  title: '',
  imageUrl: '',
  path: '',
  target_id: '',
  target_type: ''
})

@connect(state => state.user, { dispatchCurrentUser, dispatchCurrentUserMoreInfo, dispatchUserUnReadNotification })

class TodoList extends Component {
  config = {
    navigationBarTitleText: "我的心愿"
  };

  constructor() {
    super(...arguments);
    this.auth_token = Taro.getStorageSync('auth_token')
  }

  state = {
    topicList: []
  }

  componentDidMount() {
    if(this.auth_token) {
      this.currentUserTopicList()
    } else {
      this.defaultTopicList()
    }
  }

  defaultTopicList = () => {
    getDefaultUserTopicList().then((res) => {
      this.setState({
        topicList: res.topics
      })
    })
  }

  currentUserTopicList = () => {
    this.props.dispatchCurrentUser()
    getMineTopicList().then((res) => {
      this.setState({
        topicList: res.topics
      })
    })
  }

  render() {

    const { topicList } = this.state

    return ( <View className="todo-list">
        <View className="blank" />

        {
          topicList.map((topic) => {
            return <View className="todo" key={topic.id} onClick={() => (goPage.goTopicDetail(topic.id))}>
              <View className="content">
                <View className="title">{topic.title}</View>
                <View className="time">{topic.created_at_text}</View>
              </View>

              <View className="status">
                <View className="icons">{topic.public_at ? <UIcon icon="public" /> : <UIcon icon="private" />}</View>
              </View>
            </View>
          })
        }
        <View className="new-topic">
          <AddTopic />
        </View>

      </View>
    );
  }
}


export default TodoList;
