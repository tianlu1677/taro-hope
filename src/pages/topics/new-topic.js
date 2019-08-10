import Taro, {Component} from "@tarojs/taro";
import {View, Video, Text, Button, Textarea, RichText, Radio, Image, CoverView, CoverImage} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import { createTopic, getTopic, updateTopic } from "@/api/topic_api";
import addVideoImg from '@/assets/images/add-video.jpg';
import addPhotoImg from '@/assets/images/add-photo.jpg';
import removeMediaImg from '@/assets/images/close.png'
import goPage from "@/utils/page_path"
import playVideoImg from '@/assets/images/play-video.png'
import { AtTextarea, AtForm, AtSwitch  } from 'taro-ui'

import './new-topic.module.scss';

const defaultState = {
  topic_id: "",
  node_id: '',
  selectedImgs: [],
  anonymous: false,
  body: "",
  video_content: "",
  validateForm: false,
  submitting: false,
  showTextarea: true,
}

class NewTopic extends Component {
  config = {
    navigationBarTitleText: "发布动态",
  };
  constructor() {
    super(...arguments);
    this.topic_id = this.$router.params.topic_id
  }

  state = defaultState

  componentDidMount() {
    if(this.topic_id) {
      this.loadTopicDetail(this.topic_id)
    } else {

    }
  }

  componentDidHide() {
    console.log('ddd', this.topic_id)
  }

  // 新建与编辑
  async loadTopicDetail(topic_id) {
    const res = await getTopic(topic_id)
    const { tag_list, body, topic_type, course_id, lesson_id, medias, course_name, lesson_name, video_content } = res.topic;
    this.setState({
      tag_list: tag_list,
      body: body,
      topic_type: topic_type,
      course_id: course_id,
      lesson_id: lesson_id,
      selectedImgs: medias,
      video_content: video_content
    })
  }

  // 文字
  addPlainText = (event) => {
    console.log(event)
    this.setState({
      body: event.detail.value
    })
  }

  // 图片相关内容
  chooseImage = async () => {
    let leftImgLength = 9 - this.state.selectedImgs.length;
    if (!!this.state.video_content) {
      leftImgLength -= 1;
    }
    const res = await Taro.chooseImage({
      count: leftImgLength,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"]
    });
    this.setState({
      selectedImgs: this.state.selectedImgs.concat(res.tempFilePaths)
    })
  }

  onRemoveImage = (index) => {
    let { selectedImgs } = this.state
    selectedImgs.splice(index, 1)
    this.setState({
      selectedImgs: selectedImgs
    })
  }

  onReviewImage(image) {
    Taro.previewImage({
      urls: this.state.selectedImgs,
      current: image
    });
  }

  uploadAllImage = async () => {
    let upload_url = process.env.BASE_URL + `/api/v1/assets`;
    const { selectedImgs } = this.state
    let localImages = selectedImgs.filter((file) => (file.indexOf("assets") < 0));
    let existFiles = selectedImgs.filter((file) => (file.indexOf("assets") > 0));
    if(localImages.length <= 0) {
      this.setState({
        selectedImgs: existFiles
      })
      return
    }

    localImages = localImages.map((file) => (file.split("?")[0]))
    const images = localImages.map((file) => {
      return new Promise((resolve, reject) => {
        return Taro.uploadFile({
          url: upload_url,
          filePath: file,
          name: "file",
          formData: {},
          success(res) {
            resolve(res.data);
          },
          fail(error) {
            reject(error);
          }
        });
      });
    });

    let result = await Promise.all(images);
    const assets = result.map((res) => {
      return JSON.parse(res).asset.url;
    });
    // console.log('assets', assets)
    this.setState({
      selectedImgs: existFiles.concat(assets)
    })
  }

  //视频相关内容
  onRemoveVideo = () => {
    this.setState({
      video_content: ''
    })
  }

  onPreviewVideo = () => {
    let videoContext = Taro.createVideoContext("videoPreview");
    videoContext.requestFullScreen({ direction: 0 });
  }

  chooseLocalVideo = async () => {
    const res = await Taro.chooseVideo({sourceType: ["album"], maxDuration: 60});
    if(res.tempFilePath) {
      this.setState({
        video_content: res.tempFilePath
      })
      Taro.showToast({
        title: `上传视频中...`,
        icon: "none",
        duration: 20000
      });
      await this.uploadVideo(res.tempFilePath)
    } else {
      Taro.showToast({
        title: `上传失败 ${res}`,
        icon: "none",
        duration: 2000
      });
    }
  }

  async uploadVideo(raw_file_path) {
    let upload_url = process.env.BASE_URL + `/api/v1/assets`;
    // let upload_url = 'http://localhost:5000' + `/api/v1/assets`;
    let isLocalVideo = raw_file_path.indexOf("assets") < 0;
    if (isLocalVideo) {
      const res = await Taro.uploadFile({
        url: upload_url,
        filePath: raw_file_path,
        name: "file",
        formData: {}
      });
      console.log("video", JSON.parse(res.data));
      this.setState({
        video_content: JSON.parse(res.data).asset.video_url
      })
      Taro.showToast({
        title: `上传完成`,
        icon: "none",
        duration: 500
      });
    }
  }

  chooseAnonymous = (event) => {
    console.log('event', event)
  }

  onChangeVideoScreen = (event) => {
    // console.log('event', event.detail)
    this.setState({showTextarea: !event.detail.fullScreen})
  }

  // 提交保存以及修改保存
  onSubmit = async (event) => {
    if (!this.isValidateForm() || this.state.submitting) { return; }
    this.setState({
      submitting: true
    })
    Taro.showLoading({ title: "正在保存中..." });
    try {
      await this.uploadAllImage();
      setTimeout(() => {
        this._submitFormTopic(this.topic_id);
      }, 100)
      this.setState({
        submitting: false
      })
    } catch (e) {
      Taro.hideLoading({});
      Taro.showToast({
        title: `发布失败 ${e}`,
        icon: "none",
        duration: 3000
      });
      this.setState({
        submitting: false
      })
    }
    Taro.hideLoading({});
  }

  async _submitFormTopic(topic_id) {
    const data = this._formatTopicForm()
    let topic_res = {}
    if (topic_id) {
      topic_res = await updateTopic(topic_id, data)
    } else {
      topic_res = await createTopic(data)
    }
    if (topic_res.status === 'failed') {
      Taro.showModal({title: "提示", content: topic_res.msg, showCancel: false, confirmColor: "#00D2FF"});
    } else {
      goPage.redirectTopicDetailUrl(topic_res.id, "new");
      this.resetTopicForm();
    }
  }

  _formatTopicForm = () => {
    const { course_id, lesson_id, topic_type, tag_list, selectedImgs, body, video_content } = this.state
    return {
      id: this.topic_id,
      course_id: course_id,
      lesson_id: lesson_id,
      type: topic_type,
      tag_list: tag_list,
      medias: selectedImgs.map((file) => (file.split("?")[0])),
      body: body,
      video_content: video_content
    };
  }

  resetTopicForm() {
    // this._clearCacheTopic();
  }

  isValidateForm = () => {
    let status = false
    const { selectedImgs, video_content, body } = this.state
    if (!selectedImgs && !video_content) {
      status = false;
    } else {
      let has_text = body.length > 0;
      let has_image = selectedImgs.length > 0;
      let has_video = video_content && video_content.indexOf('meirixinxue') >= 0
      status = has_text && (has_image || has_video);
    }

    return status
  }

  render() {
    const { video_content, body, selectedImgs } = this.state
    let isShowPhotoUpload = (selectedImgs.length < 9 && !video_content) || (selectedImgs.length < 8 && video_content)
    let video_content_m3u8 = video_content.indexOf('assets') > 0 ? video_content.split('.mp4')[0] + '.m3u8' : ''

    return (<View>
        <View className="new-topic-detail">
          <View className="content">
            <View className="plain-content-block">
              <AtTextarea
                value={this.state.body}
                onChange={this.addPlainText}
                maxLength={200}
                height={300}
                placeholder='此刻说出你想对Ta说的话'
              />
            </View>
            {/*<View className="plain-content-block">*/}
              {/*{this.state.showTextarea && <Textarea*/}
                {/*onBlur={this.addPlainText}*/}
                {/*placeholder="写下这一刻的学习心得...\n\n"*/}
                {/*maxlength="500"*/}
                {/*className="plain-content"*/}
                {/*autoHeight*/}
                {/*showConfirmBar*/}

                {/*value={body}*/}
                {/*placeholderClass="plain-content-place-holder"*/}
              {/*/>*/}
              {/*}*/}
            {/*</View>*/}

            {/*<View className='plain-content-block' style="height: 150px">*/}
            {/*<View>{body}</View>*/}
            {/*</View>*/}

            {/*图片*/}
            <View className="medias-block">
              {
                selectedImgs && selectedImgs.map((media, media_index) => {
                  return <View className="media-item" key={media}>
                    <View className="photo">
                      <Image src={media} alt="" className="photo" onClick={this.onReviewImage.bind(this, media)} mode="aspectFill" lazyLoad />
                      <View className="remove" onClick={this.onRemoveImage.bind(this, media_index)}>
                        <Image className="topic-close" src={removeMediaImg}/>
                      </View>
                    </View>
                  </View>
                })
              }

              {/*视频*/}
              {
                video_content && !video_content_m3u8 &&
                <View className="media-item">
                  <View className="photo" onClick={this.onPreviewVideo}>
                    <Video
                      src={video_content_m3u8}
                      controls
                      id="videoPreview"
                      objectFit="contain"
                      autoplay
                      showFullscreenBtn={false}
                      className="topic-video"
                      onFullscreenChange={this.onChangeVideoScreen}
                    >
                      <CoverView className="remove" onClick={this.onRemoveVideo}>
                        <CoverImage className="topic-close" src={removeMediaImg}/>
                      </CoverView>
                    </Video>
                  </View>
                </View>
              }

              {
                video_content_m3u8 &&
                <View className="media-item">
                  <View className="photo video-wrapper">
                    <Image src={video_content + '?vframe/jpg/offset/1/rotate/auto'} alt="" className="photo" mode="aspectFill" lazyLoad />
                    <View className="remove" onClick={this.onRemoveVideo}>
                      <Image className="topic-close" src={removeMediaImg}/>
                    </View>
                    <Image src={playVideoImg} alt="" className="play-video"/>
                  </View>
                </View>
              }

              {
                isShowPhotoUpload &&
                <View className="media-item" onClick={this.chooseImage}>
                  <Image src={addPhotoImg} alt="" className="photo"/>
                </View>
              }

              {
                isShowPhotoUpload && !video_content &&
                <View className="media-item" onClick={this.chooseLocalVideo}>
                  <Image src={addVideoImg} alt="" className="photo"/>
                </View>
              }

            </View>
          </View>

          {/*<View className="chose border-top-1px border-bottom-1px">*/}
            {/*<AtSwitch title='是否匿名发布' checked={this.state.anonymous} border={false} onChange={this.chooseAnonymous} />*/}
          {/*</View>*/}

          <AtForm>
            <AtSwitch title='是否匿名发布' checked={this.state.anonymous} onChange={this.chooseAnonymous} />
          </AtForm>

          <View className="publish-button" onClick={this.onSubmit}>
            <View className={this.isValidateForm() ? 'ready' : 'no-ready'}>
              发布
            </View>
          </View>
        </View>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTopic);
