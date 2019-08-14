import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import UIcon from '@/components/uicon'
import goPage from '@/utils/page_path'

import './index.module.scss'

class Header extends Component {

  static defaultProps = {
    title: '',
  }

  componentDidMount() {
  }

  goPageBack = () => {
    goPage.goHomeUrl()
  }

  render() {
    return ( <View className="header">
        <View className="left">
          <View onClick={this.goPageBack}>
            <UIcon icon="arrow-left" ex-class="i-home"  /> |
          </View>
          <View onClick={this.goPageBack}>
            <UIcon icon="home" ex-class="i-home"  />
          </View>
        </View>
      </View>
    );
  }
}


export default Header;
