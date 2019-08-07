import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import withShare from '@/utils/with_share';
import { dispatchTopicList } from "@/actions";

import './index.module.scss'

@withShare({
  title: '',
  imageUrl: '',
  path: '',
  target_id: '',
  target_type: ''
})

@connect(state => state.user, { dispatchTopicList })

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
    console.log('xxxx')
  }

  async componentDidMount() {
    // console.log('xxxx')
    // this.props.dispatchTopicList().then((res) => {
    //   console.log('11111', res)
    // })
    // console.log('22222')
    //
    // const res = await this.props.dispatchTopicList()
    // console.log('sss', res)
    // console.log('333333')
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View><Text>qqqq</Text></View>
      </View>
    )
  }
}

export default Index
