import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import BaseTopic from '@/components/base-topic'
import './topic-list.module.scss'

class TopicList extends Component {

  static defaultProps = {
    topicList: []
  }

  componentDidMount() {
  }

  render() {
    const { topicList } = this.props
    return (
      <View>
        { topicList.map((baseTopic) => {
          return <View key={baseTopic.id}>
            <BaseTopic
              baseTopic={baseTopic}
            />
          </View>
        })
        }
      </View>
    );
  }
}

export default TopicList;
