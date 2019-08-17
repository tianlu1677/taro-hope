import Taro, {Component} from "@tarojs/taro";
import {View, Text, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dispatchCurrentUser, dispatchCurrentUserMoreInfo} from '@/actions'
import withShare from '@/utils/with_share';
import UserHeader from '@/components/user-header';
import { AtActivityIndicator } from 'taro-ui'
import { getCurrentUserTopicList } from '@/api/user_api'
import TopicList from '@/components/list/topic-list'

import './mine.module.scss';

@withShare({
  title: '',
  imageUrl: '',
  path: '',
  target_id: '',
  target_type: ''
})

@connect(state => state.user, { dispatchCurrentUser, dispatchCurrentUserMoreInfo })


class Mine extends Component {
  config = {
    navigationBarTitleText: "我",
    enablePullDownRefresh: true,
  };

  constructor() {
    super(...arguments);
    this.current_user_id = Taro.getStorageSync('user_id')
  }

  state = {
    loading: false,
    topicList: [],
    paginate: {
      hasMore: true,
      nextPage: 1,
      busy: false,
    },
    currentUserId: '',
  }

  componentDidMount() {
    let currentUserId = Taro.getStorageSync('user_id')
    this.setState({
      currentUserId: currentUserId
    })
    if(currentUserId) {
      this.loadCurrentUser(currentUserId)
      this.loadMore()
    }
    this.setState({
      loading: false
    })
  }

  loadCurrentUser = (currentUserId) => {
    this.setState({
      loading: true
    })
    if(currentUserId) {
      this.props.dispatchCurrentUser()
      this.props.dispatchCurrentUserMoreInfo()
    }
  }

  async onReachBottom () {
    await this.loadMore();
    Taro.stopPullDownRefresh()
  }

  async onPullDownRefresh() {
    await this.loadCurrentUser()
    Taro.stopPullDownRefresh()
  }

  async loadMore() {
    let { paginate } = this.state
    if (!paginate.hasMore) {
      this.isLoading(false)
      return;
    }
    try {
      this.isLoading(true)
      await this.getItemList({page: paginate.nextPage});
      this.isLoading(false)
    } catch (e) {
      this.isLoading(false)
    }
  }

  isLoading = (status = false) => {
    this.setState((state, props) => {
      return { ...state, paginate: {...state.paginate, busy: status}}
    })
  }

  async getItemList(params = {}, opts = { pull_down: false }) {
    const res = await getCurrentUserTopicList(this.current_user_id, {...params, detail: 'show'});
    // console.log('res', res)
    if (opts.pull_down) {
      this.setState({
        topicList: res.topics
      })
    } else {
      this.setState({
        topicList: this.state.topicList.concat(res.topics)
      })
    }
    this.pagination(res.meta);
  }

  pagination = (meta = {}) => {
    this.setState({
      paginate: {hasMore: meta.has_more, nextPage: meta.current_page + 1, busy: false}
    })
  }


  render() {
    const { currentUser } = this.props
    const { topicList, loading, paginate, currentUserId } = this.state

    const hideUser = {name: '未登录', avatar_url: 'http://file.meirixinxue.com/assets/201908171738Pb0ff11415f7f0e33ab88d18670c5ec4c.png'}

    if(loading) {
      return <AtActivityIndicator content='加载中...' mode="center"/>
    }
    return (<View>
        {
          currentUserId &&
          <UserHeader
            showEdit
            user={currentUser}
          />
        }
        {
          !currentUserId &&
          <UserHeader user={hideUser} showLogin />
        }

        <View className="division">
        </View>
        <View className="list">
          <TopicList
            topicList={topicList}
            loading={paginate.busy}
            showUser={false}
            bottom={!paginate.hasMore}
          />
        </View>
      </View>
    );
  }
}


export default Mine;
