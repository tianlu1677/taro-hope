import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {dispatchCurrentUser} from '@/actions'
import {connect} from "@tarojs/redux";
import { getNotificationList } from '@/api/notification_api'
import BaseNotify from '@/components/notification/base_notify'
import {AtLoadMore} from 'taro-ui'
import Empty from '@/components/empty'

import './index.module.scss'

@connect(state => state.user, { dispatchCurrentUser })


class Notification extends Component {
  config = {
    navigationBarTitleText: "消息通知",
  };

  state = {
    notificationList: [],
    loading: false,
    paginate: {
      hasMore: true,
      nextPage: 1,
      busy: false,
    },
  }

  componentDidMount() {
    this.props.dispatchCurrentUser()
  }

  componentDidShow() {
    this.loadMore()
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
    const res = await getNotificationList({...params});
    // console.log('res', res)
    if (opts.pull_down) {
      this.setState({
        notificationList: res.topics
      })
    } else {
      this.setState({
        notificationList: this.state.notificationList.concat(res.notifications)
      })
    }
    this.pagination(res.meta);
  }

  pagination = (meta = {}) => {
    this.setState({
      paginate: { hasMore: meta.has_more, nextPage: meta.current_page + 1, busy: false }
    })
  }

  render() {
    const { notificationList, loading } = this.state

    return (
      <View className="notifications">
        {
          notificationList.map((notify) => {
            return <BaseNotify key={notify.id}
              user={notify.actor}
              notification={notify}
            />
          })
        }

        {
          loading && <AtLoadMore status="loading"/>
        }

        {
          notificationList.length <= 0 && <Empty customStyle={{paddingTop: '100px'}} content="暂时还没有消息" />
        }
      </View>
    );
  }
}


export default Notification;
