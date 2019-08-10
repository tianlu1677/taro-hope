import Taro, {Component} from "@tarojs/taro";
import {View, Text, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dispatchCurrentUser, dispatchUserDetail} from '@/actions'
import withShare from '@/utils/with_share';

import UserHeader from '@/components/user-header';
import './detail.module.scss'

@withShare({
  title: '',
  imageUrl: '',
  path: '',
  target_id: '',
  target_type: ''
})

@connect(state => state.user, { dispatchCurrentUser, dispatchUserDetail })


class Detail extends Component {
  config = {
    navigationBarTitleText: "Ta的主页"
  };

  constructor() {
    super(...arguments);
    this.user_id = this.$router.params.user_id
  }

  componentDidMount() {
    this.props.dispatchUserDetail({user_id: this.user_id}).then((res) =>{
      console.log('eeee', res)
    })
    this.props.dispatchCurrentUser()
  }

  render() {

    const { currentUser } = this.props
    return ( <View>

        <UserHeader
          showFollow
        />

        <View className="division">
        </View>
      </View>
    );
  }
}


export default Detail;
