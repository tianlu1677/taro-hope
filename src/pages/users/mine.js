import Taro, {Component} from "@tarojs/taro";
import {View, Text, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dispatchCurrentUser} from '@/actions'
import withShare from '@/utils/with_share';

import UserHeader from '@/components/user-header';

@withShare({
  title: '',
  imageUrl: '',
  path: '',
  target_id: '',
  target_type: ''
})

@connect(state => state.user, { dispatchCurrentUser })

class Mine extends Component {
  config = {
    navigationBarTitleText: "我"
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

        <UserHeader/>
        <Button type="primary" onClick={() => { Taro.navigateTo({url: '/pages/login/login'})}}>登录</Button>
      </View>
    );
  }
}


export default Mine;
