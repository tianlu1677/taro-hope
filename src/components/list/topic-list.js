import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import BaseTopic from '@/components/base-topic'
import {AtLoadMore, AtDivider} from 'taro-ui';
import Division from '@/components/division'

import './topic-list.module.scss'

class TopicList extends Component {

  static defaultProps = {
    topicList: [],
    loading: false,
    showUser: true,
    bottom: false
  }

  componentDidMount() {
  }

  render() {
    const {topicList, loading, showUser, bottom} = this.props
    return (
      <View>
        {
          topicList.map((baseTopic, baseTopicIndex) => {
            return <View key={baseTopic.id}>
              <BaseTopic
                baseTopic={baseTopic}
                showUser={showUser}
              />
              {baseTopicIndex !== topicList.length - 1 &&  <Division /> }
            </View>
          })
        }

        { loading && <AtLoadMore status="loading"/> }

        { bottom && <View className="bottom">
                     <Text>到底啦</Text>
                    </View>
        }


      </View>
    );
  }
}

export default TopicList;
