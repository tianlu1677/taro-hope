import Taro, {Component} from "@tarojs/taro";
import {View, Video, Text, Button, Textarea, RichText, Radio, Input, Image, CoverView, CoverImage} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import { createTopic, getTopicDetail, updateTopicDetail, deleteTopic } from "@/api/topic_api";
import { createSuggestions } from '@/api/suggestions_api'
import addVideoImg from '@/assets/images/add-video.png';
import addPhotoImg from '@/assets/images/add-photo.png';
import removeMediaImg from '@/assets/images/close.png'
import playVideoImg from '@/assets/images/play-video.png'
import Header from '@/components/header'
import goPage from '@/utils/page_path'
import SuggestionList from '@/components/suggestion'
import UIcon from '@/components/uicon'

import { AtTextarea, AtSwitch, AtInput  } from 'taro-ui'
import { uploadImages, uploadVideo } from "@/utils/upload_images"
import {
  dispatchCurrentUser,
  dispatchInitSuggestions,
} from "@/actions"

import './new-topic.module.scss';

const defaultState = {
  title: '',
  topic_id: "",
  node_id: '',
  selectImages: [],
  body: "",
  video_content: "",
  validateForm: false,
  submitting: false,
  public_at: new Date(),
  is_hide: false,
  suggestionList: []
}

@connect(state => state, {
  dispatchCurrentUser,
  dispatchInitSuggestions
})

class NewTopic extends Component {
  config = {
    navigationBarTitleText: "发布心愿",
    navigationStyle: "custom",
  };
  constructor() {
    super(...arguments);
    this.topic_id = this.$router.params.topic_id
    this.tenant = Taro.getStorageSync('tenant')
  }

  state = defaultState

  componentDidMount() {
    this.props.dispatchCurrentUser()
    if(this.topic_id) {
      this.loadTopicDetail(this.topic_id)
    }
  }

  componentDidShow() {
    this.props.dispatchCurrentUser()
  }

  // 新建与编辑
  async loadTopicDetail(topic_id) {
    const res = await getTopicDetail(topic_id)
    const { title, body, public_at, medias, video_content, is_hide } = res.topic;
    this.setState({
      title: title,
      body: body,
      public_at: public_at,
      selectImages: medias,
      is_hide: is_hide,
      video_content: video_content || ''
    })
  }
  // 文字
  addTitle = (event) => {
    this.setState({
      title: event.detail.value
    })
  }

  // 文字
  addPlainText = (event) => {
    this.setState({
      body: event.detail.value
    })
  }

  // 图片相关内容
  chooseImage = async () => {
    let leftImgLength = 9 - this.state.selectImages.length;
    if (!!this.state.video_content) {
      leftImgLength -= 1;
    }
    const res = await Taro.chooseImage({
      count: leftImgLength,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"]
    });
    this.setState({
      selectImages: this.state.selectImages.concat(res.tempFilePaths)
    }, () => {
      this.uploadAllImage()
    })
  }

  onRemoveImage = (index) => {
    let { selectImages } = this.state
    selectImages.splice(index, 1)
    this.setState({
      selectImages: selectImages
    })
  }

  onReviewImage(media_index) {
    let images = this.state.selectImages.map((file) => (file.split('?')[0]))
    Taro.previewImage({
      urls: images,
      current: images[media_index]
    });
  }

  uploadAllImage = async () => {
    const { selectImages } = this.state
    let localImages = selectImages.filter((file) => (file.indexOf("meirixinxue") < 0));
    let existFiles = selectImages.filter((file) => (file.indexOf("meirixinxue") > 0));
    if(localImages.length <= 0) {
      this.setState({
        selectImages: existFiles
      })
      return
    }

    localImages = localImages.map((file) => (file.split("?")[0]))
    const assets = await uploadImages(localImages)
    this.setState({
      selectImages: existFiles.concat(assets)
    })
  }

  //视频相关内容
  onRemoveVideo = () => {
    this.setState({
      video_content: ''
    })
  }

  onPreviewVideo = () => {
    goPage.goPreviewVideo(this.state.video_content)
  }

  chooseLocalVideo = async () => {
    const res = await Taro.chooseVideo({sourceType: ["album"], maxDuration: 60});
    Taro.showToast({
      title: `上传视频中...`,
      icon: "none",
      duration: 20000
    });
    const video_url = await uploadVideo(res.tempFilePath)
    if(video_url) {
      this.setState({
        video_content: video_url
      })
      Taro.showToast({
        title: `上传完成`,
        icon: "none",
        duration: 500
      });
    }
  }

  chooseAnonymous = (event) => {
    // console.log('event', event)
    this.setState({
      is_hide: event
    })
  }

  choosePublic = (event) => {
    let public_at = new Date()
    if(event) {
      this.setState({
        public_at: public_at
      })
    } else {
      this.setState({
        public_at: ''
      })
    }
  }

  // 提交保存以及修改保存
  onSubmit = async () => {
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

  deleteTopic = async () => {
    const res = await Taro.showModal({
      title: '提示',
      content: '确定删除后将无法找回，是否仍要删除？',
    })
    if(res.confirm) {
      deleteTopic(this.topic_id)
      Taro.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1500,
        mask: true,
        success: () => {
          Taro.switchTab({url: '/pages/users/todo-list'})
        }
      })
    }
  }

  async _submitFormTopic(topic_id) {
    const data = this._formatTopicForm()
    let topic_res = {}
    if (topic_id) {
      topic_res = await updateTopicDetail(topic_id, data)
    } else {
      topic_res = await createTopic(data)

    }
    if (topic_res.status === 'failed') {
      Taro.showModal({title: "提示", content: topic_res.msg, showCancel: false, confirmColor: "#00D2FF"});
    } else {
      // console.log('topic', topic_res)
      this._submitSuggestions(topic_res.topic.id)
      Taro.redirectTo({url: `/pages/topics/topic-detail?topic_id=${topic_res.topic.id}` });
      this.resetTopicForm();
    }
  }

  _formatTopicForm = () => {
    const {  selectImages, title, body, public_at, video_content, is_hide } = this.state
    let topicTitle = title || (body && body.substr(0, 15)) || this.props.topic.editSuggestionList[0].title || ''
    return {
      id: this.topic_id,
      is_hide: is_hide,
      title: topicTitle,
      public_at: public_at,
      medias: selectImages.map((file) => (file.split("?")[0])),
      body: body || '',
      video_content: video_content,
    };
  }

  _submitSuggestions = (topic_id) => {
    let suggestions = this.props.topic.editSuggestionList
    createSuggestions({data: suggestions, topic_id: topic_id})
  }


  resetTopicForm() {
    // this._clearCacheTopic();
  }

  isValidateForm = () => {
    let status = false
    const { selectImages, video_content, body } = this.state
    if (this.props.topic.editSuggestionList.length > 0 &&  this.props.topic.editSuggestionList[0].title.length >= 1) {
      return true;
    } else {
      return false;
    }
    // if (!selectImages && !video_content) {
    //   status = false;
    // } else {
    //   let has_text = body.length > 0;
    //   let has_image = selectImages.length > 0;
    //   let has_video = video_content && video_content.indexOf('meirixinxue') >= 0
    //   status = has_text || (has_image || has_video);
    // }

    // return status
  }

  handleBack = () => {
    Taro.navigateBack({delta: 1})
  }

  render() {
    const { title, video_content, body, selectImages } = this.state
    let isShowPhotoUpload = (selectImages.length < 9 && !video_content) || (selectImages.length < 8 && video_content)
    let video_content_m3u8 = video_content.indexOf('meirixinxue') > 0 ? video_content.split('.mp4')[0] + '.m3u8' : ''

    return (<View>
        <View className="header">
          <Header
            title={ this.topic_id ? '编辑心愿' : '发布心愿' }
            handleBack={this.handleBack}
          />
        </View>
        <View className="new-topic-detail">

          <View className="title-content">
            <Textarea
              placeholder='给心愿清单起个标题名字吧'
              placeholderClass="title-placeholder"
              autoHeight
              maxlength={100}
              value={title}
              onInput={this.addTitle}
              className={!!title ? `title` : `title empty-title`}
            />

          </View>
          <View className="content">
            <View className="plain-content-block">

              <Textarea
                placeholder={(this.tenant && this.tenant.permissions.tip_message) || '此刻说出你想对Ta说的话吧 ~'}
                placeholderStyle="color: #BDBDBD"
                autoHeight
                maxlength={2000}
                value={body}
                onInput={this.addPlainText}
                className="body-content"
              />


              {/*<AtTextarea*/}
                {/*value={body}*/}
                {/*onChange={this.addPlainText}*/}
                {/*maxLength={2000}*/}
                {/*height={150}*/}
                {/*count={false}*/}
                {/*placeholder={this.tenant.permissions.tip_message || '此刻说出你想对Ta说的话吧 ~'}*/}
                {/*placeholderStyle="color: #BDBDBD"*/}
              {/*/>*/}
            </View>

            <View className="suggestions-wrap">
              <SuggestionList
                suggestionList={this.state.suggestionList}
                topic_id={this.topic_id}
              />
            </View>

            {/*图片*/}
            <View className="medias-block">
              {
                selectImages && selectImages.map((media, media_index) => {
                  return <View className="media-item" key={media}>
                    <View className="photo">
                      <Image
                        src={media}
                        alt=""
                        className="photo"
                        onClick={this.onReviewImage.bind(this, media_index)}
                        mode="aspectFill" />
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
                    <Image
                      src={video_content + '?vframe/jpg/offset/1/rotate/auto'}
                      alt=""
                      className="photo"
                      mode="aspectFill"
                      lazyLoad />
                    <View className="remove" onClick={this.onRemoveVideo}>
                      <Image className="topic-close" src={removeMediaImg}/>
                    </View>
                    <Image src={playVideoImg} alt="" className="play-video" onClick={this.onPreviewVideo}/>
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

          {
            <View className="is-hide">
              <AtSwitch title='是否公开可见' checked={!!this.state.public_at} color="#FD7C97" border={false} onChange={this.choosePublic} />
            </View>
          }

          {
            this.topic_id && <View className="edit-publish-button">
              <View className={this.isValidateForm() ? 'ready save-btn' : 'no-ready save-btn'} onClick={this.onSubmit}>
                保存
              </View>
              <View className="delete-btn" onClick={this.deleteTopic}>
                <UIcon icon="trash" ex-class="trash-color" />
              </View>
            </View>
          }
          {
            !this.topic_id && <View className="publish-button" onClick={this.onSubmit}>
              <View className={this.isValidateForm() ? 'ready' : 'no-ready'}>
                发布
              </View>
            </View>
          }

        </View>
      </View>
    )
  }
}

export default NewTopic;
