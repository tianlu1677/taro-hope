import Taro, {Component} from "@tarojs/taro";
import {View, Text, Button, Image} from "@tarojs/components";
import {TaroCanvasDrawer} from 'taro-plugin-canvas'; // npm 引入方式
import { AtToast } from "taro-ui"

import './index.module.scss'

class Poster extends Component {
  static externalClasses = ['ex-class']

  static defaultProps = {
    title: '',
    cover_url: '',
    username: '',
    user_avatar: '',
    created_at: ''
  }

  state = {
    isOpened: false,
    config: null,
    // 绘制的图片
    shareImage: null,
    // TaroCanvasDrawer 组件状态
    canvasStatus: false,
  }


  setConfig = () => {
    let title = this.props.title
    let cover_url = this.props.cover_url
    let username = this.props.username
    let user_avatar = this.props.user_avatar
    let created_at = this.props.created_at

    let rssConfig =  {
      width: 750,
        height: 750,
        backgroundColor: '#fff',
        debug: false,
        blocks: [
        {
          x: 0,
          y: 0,
          width: 750,
          height: 750,
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: 0,
          // borderColor: '#ccc',
          backgroundColor: '#EFF3F5',
          borderRadius: 0,
        },
        {
          x: 40,
          y: 40,
          width: 670,
          height: 670,
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: 0,
          // borderColor: '#ccc',
          backgroundColor: '#fff',
          borderRadius: 12,
        }
      ],
        texts: [
        {
          x: 80,
          y: 420,
          text: title,
          fontSize: 32,
          color: '#000',
          opacity: 1,
          baseLine: 'middle',
          lineHeight: 36,
          lineNum: 2,
          textAlign: 'left',
          width: 580,
          zIndex: 999,
        },
        {
          x: 130,
          y: 520,
          text: username,
          fontSize: 24,
          color: '#A4A4A4',
          opacity: 1,
          baseLine: 'middle',
          lineHeight: 24,
          lineNum: 1,
          textAlign: 'left',
          width: 580,
          zIndex: 999,
        },
        {
          x: 80,
          y: 560,
          text: created_at,
          fontSize: 24,
          color: '#A4A4A4',
          opacity: 1,
          baseLine: 'middle',
          lineHeight: 24,
          lineNum: 1,
          textAlign: 'left',
          width: 580,
          zIndex: 999,
        },

        // {
        //   x: 80,
        //   y: 590,
        //   text: '长按扫描二维码阅读完整内容',
        //   fontSize: 24,
        //   color: '#666',
        //   opacity: 1,
        //   baseLine: 'middle',
        //   textAlign: 'left',
        //   lineHeight: 36,
        //   lineNum: 1,
        //   zIndex: 999,
        // },
        {
          x: 80,
          y: 640,
          text: '分享来自 「 心愿清单 」',
          fontSize: 24,
          color: '#666',
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: 36,
          lineNum: 1,
          zIndex: 999,
        }
      ],
        images: [
        {
          url: cover_url,
          width: 670,
          height: 320,
          y: 40,
          x: 40,
          borderRadius: 12,
          zIndex: 10,
          // borderRadius: 150,
          // borderWidth: 10,
          // borderColor: 'red',
        },
        {
          url: user_avatar,
          width: 40,
          height: 40,
          y: 500,
          x: 80,
          borderRadius: 100,
          borderWidth: 0,
          zIndex: 10,
        },
        {
          url: 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHf7zoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL05rUGlyTXJsd2hxN3BCUnFNbTlNAAIEu1X8VwMEAAAAAA%3D%3D',
          width: 110,
          height: 110,
          y: 570,
          x: 560,
          borderRadius: 100,
          borderWidth: 0,
          zIndex: 10,
        },
      ],
        lines: [
        // {
        //   startY: 540,
        //   startX: 80,
        //   endX: 670,
        //   endY: 541,
        //   width: 1,
        //   color: '#eee',
        // }
      ]
    }

    return rssConfig
  }
  // 调用绘画 => canvasStatus 置为true、同时设置config
  canvasDrawFunc = async () => {
    // Taro.openSetting()
    const auth_res = await Taro.getSetting()
    if(!auth_res.authSetting['scope.writePhotosAlbum']) {
      Taro.showModal({
        title: '提示',
        content: '请您授权保存到您的相册中',
        success: (res) => {
          if (res.confirm) {
            Taro.openSetting()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }

    let config = this.setConfig()
    this.setState({
      canvasStatus: true,
      config: config,
    })
    Taro.showLoading({
      title: '生成中...'
    })
  }

    // 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
  onCreateSuccess = async (result) => {
    const {tempFilePath, errMsg} = result;
    Taro.hideLoading();
    if (errMsg === 'canvasToTempFilePath:ok') {
      this.setState({
        shareImage: tempFilePath,
        // 重置 TaroCanvasDrawer 状态，方便下一次调用
        canvasStatus: false,
        config: null
      }, () => {
        Taro.saveImageToPhotosAlbum({
          filePath: this.state.shareImage,
        });
        Taro.showToast({
          title: '海报已保存到您的相册中',
          icon: 'success',
          duration: 1500,
        });
      })

      // 预览
      setTimeout(() => {
        Taro.previewImage({
          current: tempFilePath,
          urls: [tempFilePath]
        })
      }, 1500)
    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      this.setState({
        canvasStatus: false,
        config: null
      })
      Taro.showToast({icon: 'none', title: errMsg || '出现错误'});
      console.log(errMsg);
    }
  }

  // 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvasDrawer 状态
  onCreateFail = (error) => {
    Taro.hideLoading();
    // 重置 TaroCanvasDrawer 状态，方便下一次调用
    this.setState({
      canvasStatus: false,
      config: null
    })
    Taro.hideLoading()
    console.log(error);
  }

  // 保存图片至本地
  saveToAlbum = async () => {
    const res = Taro.saveImageToPhotosAlbum({
      filePath: this.state.shareImage,
    });
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showToast({
        title: '保存图片成功',
        icon: 'success',
        duration: 2000,
      });
    }
  }

  render() {
    const {size, title, cover, type, id} = this.props
    return (

      <View className='shareImage-cont'>
        <AtToast isOpened={this.state.isOpened} duration={1000} text={'sss'} />

        <View>
          <View className='flex-row' onClick={this.canvasDrawFunc.bind(this)}>
            {
              this.props.children
            }
          </View>
        </View>
        {
          // 由于部分限制，目前组件通过状态的方式来动态加载
          this.state.canvasStatus &&
          (<TaroCanvasDrawer config={this.state.config} // 绘制配置
            onCreateSuccess={this.onCreateSuccess} // 绘制成功回调
            onCreateFail={this.onCreateFail} // 绘制失败回调
            />
          )
        }
      </View>
    );
  }
}

export default Poster;
