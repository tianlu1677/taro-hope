import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import BaseTopic from '@/components/base-topic'
import {AtLoadMore} from 'taro-ui';

import './topic-list.module.scss'

class TopicList extends Component {

  static defaultProps = {
    topicList: [],
    loading: false
  }

  componentDidMount() {
  }

  render() {
    const {topicList, loading} = this.props
    return (
      <View>
        {topicList.map((baseTopic) => {
          return <View key={baseTopic.id}>
            <BaseTopic
              baseTopic={baseTopic}
            />
          </View>
        })
        }
        {loading && <AtLoadMore status="loading"/>}
      </View>
    );
  }
}

export default TopicList;
