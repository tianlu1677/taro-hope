import Taro, {Component} from "@tarojs/taro";
import {View, Text, Button, Image} from "@tarojs/components";
import {TaroCanvasDrawer} from 'taro-plugin-canvas'; // npm 引入方式

import './index.module.scss'

class Poster extends Component {
  static externalClasses = ['ex-class']

  static defaultProps = {
    config: {
      title: '',
      cover_url: '',
      username: '',
      user_avatar: '',
    }
  }

  state = {
    config: null,
    // 绘制的图片
    shareImage: null,
    // TaroCanvasDrawer 组件状态
    canvasStatus: false,
    rssConfig: {
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
          text: '2019年我要读完的十本漫画书：不看你一定会后悔系列漫画书?',
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
          text: 'pille',
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
          text: '在三月十二日创建',
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
          url: 'http://pic.juncao.cc/rssfeed/images/demo.png',
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
          url: 'http://pic.juncao.cc/rssfeed/images/demo.png',
          width: 40,
          height: 40,
          y: 500,
          x: 80,
          borderRadius: 100,
          borderWidth: 0,
          zIndex: 10,
        },
        {
          url: 'https://pic.juncao.cc/cms/images/minapp.jpg',
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
    },
  }

  // 调用绘画 => canvasStatus 置为true、同时设置config
  canvasDrawFunc = (config = this.state.rssConfig) => {
    this.setState({
      canvasStatus: true,
      config: config,
    })
    Taro.showLoading({
      title: '绘制中...'
    })
  }

  // 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
  onCreateSuccess = (result) => {
    const {tempFilePath, errMsg} = result;
    Taro.hideLoading();
    if (errMsg === 'canvasToTempFilePath:ok') {
      this.setState({
        shareImage: tempFilePath,
        // 重置 TaroCanvasDrawer 状态，方便下一次调用
        canvasStatus: false,
        config: null
      })
    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      this.setState({
        canvasStatus: false,
        config: null
      })
      Taro.showToast({icon: 'none', title: errMsg || '出现错误'});
      console.log(errMsg);
    }
    // 预览
    Taro.previewImage({
      current: tempFilePath,
      urls: [tempFilePath]
    })
  }

  // 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvasDrawer 状态
  onCreateFail = (error) => {
    Taro.hideLoading();
    // 重置 TaroCanvasDrawer 状态，方便下一次调用
    this.setState({
      canvasStatus: false,
      config: null
    })
    console.log(error);
  }

  // 保存图片至本地
  saveToAlbum = () => {
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

        <View>
          <View className='flex-row'>
            <Button onClick={this.canvasDrawFunc.bind(this, this.state.rssConfig)}>绘制</Button>
            <Button onClick={this.saveToAlbum}>保存到相册</Button>
          </View>
        </View>

        {/*<Image*/}
          {/*className='shareImage'*/}
          {/*src={this.state.shareImage}*/}
          {/*mode='widthFix'*/}
          {/*lazy-load*/}
        {/*/>*/}
        {
          // 由于部分限制，目前组件通过状态的方式来动态加载
          this.state.canvasStatus &&
          (<TaroCanvasDrawer
              config={this.state.config} // 绘制配置
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
