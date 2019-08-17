import Taro, {Component} from "@tarojs/taro";
import {Button, Text} from "@tarojs/components";
import UIcon from '@/components/uicon'

import './index.module.scss'

class ShareIcon extends Component {
  static externalClasses = ['ex-class']

  static defaultProps = {
    size: 'middle',
    title: '',
    cover: '',
    type: '',
    id: ''
  }

  render() {
    const {size, title, cover, type, id} = this.props
    return (
      <Button
        open-type="share"
        className="share-button"
        share-id={id}
        data-nickname={title}
        data-cover={cover}
        data-type={type}
        data-id={id}
      >
        <UIcon icon='share' ex-class={`icon icon-${size}`}/>
        <Text className={`icon-text text-${size}`}>分享</Text>
      </Button>
    );
  }
}

export default ShareIcon;
