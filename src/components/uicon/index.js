import Taro, { Component } from "@tarojs/taro";
import { Text, View } from "@tarojs/components";
import PropTypes from "prop-types";
import './index.module.scss'

class UIcon extends Component {
  static externalClasses = ['ex-class']

  static options = {
    addGlobalClass: true
  }

  constructor() {
    super(...arguments);
  }

  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    icon: PropTypes.string
  }

  static defaultProps = {
    icon: '',
    size: 12,
    color: ''
  }

  render() {
    return <Text className={`ex-class u-icon icon-${this.props.icon}`} />
  }
}


export default UIcon;
