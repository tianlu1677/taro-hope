import Taro, {Component} from "@tarojs/taro";
import {View, Text, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dispatchCurrentUser, dispatchUserDetail, dispatchFollowUser, dispatchUnFollowUser} from '@/actions'
import withShare from '@/utils/with_share';
import { AtActivityIndicator } from 'taro-ui'

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
    loading: true
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.props.dispatchUserDetail({user_id: this.user_id}).then((res) =>{
      this.setState({
        loading: false
      })
    })
    this.props.dispatchCurrentUser()
  }

  onFollow = (followed) => {
    if(this.props.userMeta.followed) {
      this.props.dispatchUnFollowUser({user_id: this.user_id})
    } else {
      this.props.dispatchFollowUser({user_id: this.user_id})
    }
  }

  render() {
    const { userDetail, userMeta } = this.props
    console.log('user', userDetail)
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
      </View>
    );
  }
}


export default Detail;
