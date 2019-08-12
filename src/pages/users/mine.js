import Taro, {Component} from "@tarojs/taro";
import {View, Text, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dispatchCurrentUser} from '@/actions'
import withShare from '@/utils/with_share';
import UserHeader from '@/components/user-header';
import { AtActivityIndicator } from 'taro-ui'
import './mine.module.scss';

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

  state = {
    loading: true
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  componentDidShow() {
    this.props.dispatchCurrentUser((res) => {
      this.setState({
        loading: false
      })
    })
  }

  render() {
    const { currentUser } = this.props

    if(this.state.loading) {
      return <AtActivityIndicator content='加载中...' mode="center"/>
    }
    return (<View>
        <UserHeader
          showEdit
          user={currentUser}
        />
        <View className="division">
        </View>
        <View className="list">
        </View>
      </View>
    );
  }
}


export default Mine;
