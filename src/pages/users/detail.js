import Taro, {Component} from "@tarojs/taro";
import {View, Text, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dispatchCurrentUser} from '@/actions'
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

@connect(state => state.user, { dispatchCurrentUser })


class Detail extends Component {
  config = {
    navigationBarTitleText: "Ta的主页"
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    // this.props.dispatchCurrentUser()
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
