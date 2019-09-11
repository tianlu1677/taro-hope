import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import AddTopicImg from '@/assets/images/add-topic.png'
import goPage from "@/utils/page_path"

class AddTopic extends Component {

  static defaultProps = {
  }

  goNewTopic = () => {
    goPage.goNewTopic()
  }

  render() {
    return (<View onClick={this.goNewTopic}>
        <Image src={AddTopicImg} style={{'height': '90rpx', width: '90rpx', borderRadius: '50%'}} />
      </View>
    );
  }
}

export default AddTopic;
