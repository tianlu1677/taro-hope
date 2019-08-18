import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import UIcon from '@/components/uicon'
import goPage from '@/utils/page_path'

import './index.module.scss'

class Header extends Component {

  static defaultProps = {
    title: '',
    handleBack: async () => {
      let pages = Taro.getCurrentPages()
      // console.log('getCurrentPageUrl', pages.length)

      if(pages.length > 1) {
        Taro.navigateBack({delta: 1})
      } else {
        goPage.goHomeUrl()
      }
    }
  }

  componentDidMount() {
  }

  goHome = () => {
    goPage.goHomeUrl()
  }

  render() {
    const {handleBack, title} = this.props
    return (<View className="header">
        <View className="left">
          <View onClick={handleBack}>
            <UIcon icon="arrow-left" ex-class="i-back"/>
          </View>
          <View className="line">|</View>
          <View onClick={this.goHome}>
            <UIcon icon="home" ex-class="i-home"/>
          </View>
        </View>

        <View className="title">
          {title.substr(0,10)}
        </View>
      </View>
    );
  }
}


export default Header;
