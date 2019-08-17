import Taro, {Component} from "@tarojs/taro";
import {View, Text, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dispatchCurrentUser, dispatchUserDetail, dispatchFollowUser, dispatchUnFollowUser} from '@/actions'
import withShare from '@/utils/with_share';
import { AtActivityIndicator } from 'taro-ui'
import { getUserTopicList } from '@/api/user_api'
import TopicList from '@/components/list/topic-list'
import UserHeader from '@/components/user-header';
import './detail.module.scss'

@withShare({
  title: '',
  imageUrl: '',
  path: '',
  target_id: '',
  target_type: ''
})

@connect(state => state.user, { dispatchCurrentUser, dispatchUserDetail, dispatchFollowUser, dispatchUnFollowUser })


class Detail extends Component {
  config = {
    navigationBarTitleText: "Ta的主页"
  };

  constructor() {
    super(...arguments);
    this.user_id = this.$router.params.user_id
  }

  state = {
    loading: false,
    topicList: [],
    paginate: {
      hasMore: true,
      nextPage: 1,
      busy: false,
    },
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.props.dispatchUserDetail({user_id: this.user_id}).then((res) =>{
      this.setState({
        loading: false
      })
      const username = `${res.data.user.name}的主页`
      Taro.setNavigationBarTitle({title: username})
    })
    this.loadMore()
  }

  componentDidUpdate() {
  }

  onFollow = () => {
    let followed =this.props.userMeta.followed
    if(followed) {
      this.props.dispatchUnFollowUser({user_id: this.user_id})
    } else {
      this.props.dispatchFollowUser({user_id: this.user_id})
    }
  }

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
    const res = await getUserTopicList(this.user_id, {...params, detail: 'show'});
    console.log('res', res)
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
    const { userDetail, userMeta } = this.props
    const { topicList, loading, paginate } = this.state
    if(this.state.loading) {
      return <AtActivityIndicator content='加载中...' mode="center"/>
    }

    return ( <View>
        <UserHeader
          showFollow
          user={userDetail}
          userMeta={userMeta}
          onFollow={this.onFollow}
        />

        <View className="division">
        </View>

        <View className="list">
          <TopicList
            topicList={topicList}
            loading={loading}
            showUser={false}
            bottom={!paginate.hasMore}
          />
        </View>
      </View>
    );
  }
}


export default Detail;
