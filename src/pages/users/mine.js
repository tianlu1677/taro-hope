import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dispatchCurrentUser} from '@/actions'
import withShare from '@/utils/with_share';

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
    this.props.dispatchCurrentUser()
  }

  render() {
    return ( <View>Mine</View>
    );
  }
}


export default Mine;
