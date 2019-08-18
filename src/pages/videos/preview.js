import Taro, {Component} from "@tarojs/taro";
import {View, Video} from "@tarojs/components";

class TopicVideo extends Component {
  config = {
    navigationBarTitleText: "",
    enablePullDownRefresh: false,
    navigationBarTextStyle: "white",
    navigationBarBackgroundColor: "#000000",
    backgroundColor: ""
  };

  constructor() {
    super(...arguments);
    // this.videoUrl = this.$router.params.video_url
    this.videoContext = ''
  }

  state = {
    videoUrl: ''
  }

  async componentDidMount() {
    let videoUrl = this.$router.params.video_url
    const res = await Taro.getSystemInfoSync();
    if(res.model.indexOf('iPhone') >= 0) {
      this.setState({
        videoUrl: videoUrl
      })
    } else {
      videoUrl = videoUrl.split('.mp4')[0] + '.m3u8'
      this.setState({
        videoUrl: videoUrl
      })
    }

    this.videoContext = Taro.createVideoContext("topic_video_content");
    // this.videoContext.play();

    //iphone x下隐藏状态栏，仅对IPHONE X生效
    if (res.model.search("iPhone X") !== -1) {
      this.videoContext.hideStatusBar();
    }
  }

  onPlayEnded = () => {
    this.videoContext.seek(0);
  }


  onChangeVideoScreen = (event) => {
    // console.log('event', event)
  }

  render() {
    const { videoUrl} = this.state
    return (
      <View className="topic-video" style={{position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999999,
        width: '100%',
        height: '100%'}}
      >
        <Video
          src={videoUrl}
          // src="http://xinxuefile.meirixinxue.com/assets/201907310126Paae0d9632de310d1d03c332b382aa222.m3u8"
          customCache
          autoplay
          controls
          objectFit="contain"
          showFullscreenBtn={false}
          id="topic_video_content"
          className="video-content"
          style={{height: '100%', width: '100%'}}
          onEnded={this.onPlayEnded}
        />
      </View>
    );
  }
}

export default TopicVideo;

