import Taro, {Component} from "@tarojs/taro";
import {View, Text, Image} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import FormId from '@/components/formid'
import playVideoImg from '@/assets/images/play-video.png'

import './index.module.scss'

class ImageBox extends Component {

  static defaultProps = {
    medias: [],
    topic_id: '',
    video_content: ''
  }

  componentDidMount() {

  }

  goTopicDetail = () => {

  }

  previewPhoto = (medias, media, event) => {
    event.stopPropagation()
    media = media.split("?")[0];
    Taro.previewImage({
      urls: medias.map((file) => (file.split("?")[0])),
      current: media
    });
  }

  previewVideo = (event) => {
    event.stopPropagation()
    // console.log('baseTopic.video_content', baseTopic.video_content)
    // goPage.goVideoUrl(baseTopic.video_content)
  }

  render() {
    const { medias, video_content, topic_id } = this.props
    const show_medias = !!video_content ? medias.slice(0, 2) : medias.slice(0, 3)
    return (<View>
        {/*图片*/}
        <View className="media" onClick={this.goTopicDetail.bind(this, topic_id)}>
          <View className="item-list">
            {
              video_content &&
              <View className="media-item" onClick={this.previewVideo.bind(this)}>
                <Image
                  src={video_content}
                  className={medias.length === 0 ? 'media-single' : 'media-multi'}
                  mode="aspectFill"
                  lazyLoad
                />
                <Image src={playVideoImg} alt="" className="play-video"/>
              </View>
            }

            {
              show_medias.map((media) => {
                return <View className="media-item" key={media} onClick={this.previewPhoto.bind(this, medias, media)}>
                  <FormId customStyle={{borderRadius: '12px'}}>
                    <Image
                      src={media}
                      className={medias.length + (video_content ? 1 : 0) >= 2 ? 'media-multi' : 'media-single'}
                      mode="widthFix"
                      lazyLoad
                    />
                  </FormId>
                </View>
              })
            }
          </View>
          {/* 3+ */}
          {
            medias.length > 3 &&
            <View className="media-count">
              <Text>{medias.length - 3}+</Text>
            </View>
          }
        </View>
      </View>
    );
  }
}


export default ImageBox;
