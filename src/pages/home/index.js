import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import withShare from '@/utils/with_share';
import { dispatchTopicList } from "@/actions";
import { getTopicList } from '@/api/topic_api'
import TopicList from '@/components/list/topic-list'
import HookTopicList from '@/components/list/hook-topic-list'
import './index.module.scss'


@connect(state => state.user, { dispatchTopicList })

@withShare({
  title: '求撩',
  imageUrl: '',
  path: '/pages/home/index',
  target_id: '',
  target_type: ''
})

class Index extends Component {
  config = {
    navigationBarTitleText: '求撩',
    enablePullDownRefresh: true,
    onReachBottomDistance: 100,
    backgroundTextStyle: "dark",
  }

  state = {
    topicList: [],
    loading: false,
    paginate: {
      hasMore: true,
      nextPage: 1,
      busy: false,
    },
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
    // console.log('xxxx')
  }

  async componentDidMount() {
    await this.loadMore();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  async onReachBottom () {
    await this.loadMore();
  }

  async onPullDownRefresh() {
    await this.getItemList({}, { pull_down: true });
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
    const res = await getTopicList({...params, detail: 'show'});
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
      paginate: { hasMore: meta.has_more, nextPage: meta.current_page + 1, busy: false }
    })
  }

  render () {
    return (
      <View className='index'>
        {
          <TopicList
            topicList={this.state.topicList}
            loading={this.state.paginate.busy}
          />
        }
      </View>
    )
  }
}

export default Index
