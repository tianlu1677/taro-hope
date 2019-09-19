import Taro, {Component} from "@tarojs/taro";
import {View, Text, Input} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import UIcon from '@/components/uicon'

import './base-suggestion.module.scss'

class BaseSuggestion extends Component {

  static defaultProps = {
    compStyle: '',
    textStyle: '',
    openType: '',
    plain: false,
    loading: false,
    disabled: false,
    onClick: () => {},
    onGetUserInfo: () => {},
    baseSuggestion: {},
  }


  componentDidMount() {

  }

  render() {
    const { baseSuggestion } = this.props
    return (
      <View className="base-suggestion">
        <View className="select-box">
          { baseSuggestion.status === 'finish' ? <UIcon icon="plus" ex-class="finished"/> : '' }
        </View>
        <View className="title-wrap">
          <View className="title">
            { baseSuggestion.title }
          </View>
        </View>
      </View>
    );
  }
}


export default BaseSuggestion;
