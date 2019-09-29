import Taro, {Component} from "@tarojs/taro";
import {View, Text, Input, Image, Swiper, SwiperItem, Button} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {getTopicReplies, createTopicReplies, copyTopic} from "@/api/topic_api";
import {
  dispatchCurrentUser,
  dispatchFollowUser,
  dispatchUnFollowUser,
  dispatchUserDetail,
  dispatchTopicDetail,
  dispatchLikeTopic,
  dispatchUnLikeTopic,
  dispatchTopicDetailSuggestions
} from "@/actions"
import Avatar from '@/components/avatar'
import CommentList from '@/components/list/comment-list'
import {AtActivityIndicator} from 'taro-ui'
import {deleteReply} from '@/api/reply_api'
import Header from '@/components/header'
import UIcon from '@/components/uicon'
import goPage from "@/utils/page_path"
import ShareIcon from '@/components/share-icon'
import playVideoImg from '@/assets/images/play-video.png'
import SuggestionList from '@/components/suggestion/suggestion-list'
import Poster from '@/components/poster'
import WechatShareFriend from '@/assets/images/wechat-share-friend.png'
import WechatShareZone from '@/assets/images/wechat-share-zone.png'
import QQShareFriend from '@/assets/images/qq-friend.png'
import QQShareZone from '@/assets/images/qq-share-zone.png'

import './topic-detail.module.scss'

@connect(state => state, {
  dispatchCurrentUser,
  dispatchUserDetail,
  dispatchFollowUser,
  dispatchUnFollowUser,
  dispatchTopicDetail,
  dispatchLikeTopic,
  dispatchUnLikeTopic,
  dispatchTopicDetailSuggestions,
})

class TopicDetail extends Component {
  config = {
    navigationBarTitleText: "心愿详情",
    navigationStyle: "custom",
  };

  state = {
    commentList: [],
    currentComment: {body: '', topic_id: '', placeholder: '写点评论吧'},
    loading: true,
    show_comment: false,
    rssConfig: null
  }

  constructor() {
    super(...arguments);
    this.topic_id = this.$router.params.topic_id
    this.currentUserId = parseInt((Taro.getStorageSync('user_id') || 0))
    this.currentUserName = Taro.getStorageSync('username')
  }

  componentDidMount() {
    this.props.dispatchTopicDetail({topic_id: this.topic_id}).then((res) => {
      this.setState({
        loading: false
      })
    })
    this.getTopicReplyList(this.topic_id)
    this.props.dispatchTopicDetailSuggestions(this.topic_id)

  }

  componentDidShow() {
    this.props.dispatchCurrentUser()
  }

  getTopicReplyList = async (topic_id) => {
    const res = await getTopicReplies(topic_id)
    this.setState({
      commentList: res.replies
    })
  }

  onPreview = (currentImg) => {
    let currentImgUrl = currentImg.split("?")[0];
    Taro.previewImage({
      urls: this.props.topic.topicDetail.medias.map((file) => (file.split("?")[0])),
      current: currentImgUrl
    });
  }

  previewVideo = (video_content, event) => {
    event.stopPropagation()
    goPage.goPreviewVideo(video_content)
  }

  //1. 删除评论
  onDeleteComment = (comment_id, commentIndex) => {
    // console.log('comment', comment_id, commentIndex)
    let commentList = this.state.commentList
    commentList.splice(commentIndex, 1)
    this.setState({
      commentList: commentList
    })
    deleteReply(comment_id)
  }
  //2. 回复评论
  onReplyComment = (comment = {}) => {
    this.setState({
      show_comment: true
    })
    if (comment.id) {
      let username = this.state.topicDetail.is_hide ? '匿名用户' : comment.user.name
      this.setState({
        currentComment: {
          placeholder: "回复: @" + username,
          body: '',
          topic_id: this.topic_id,
          reply_to_id: comment.id,
        }
      })
    } else {
      this.setState({
        currentComment: {
          placeholder: "写下对ta想说的话吧…",
          topic_id: this.topic_id,
          body: '',
        }
      })
    }
  }

  // 3. 发表新评论
  publishComment = async (event) => {
    event.stopPropagation();

    const {currentComment} = this.state
    if (currentComment.body.length >= 2) {
      Taro.showLoading({title: "发送中...", mask: true});
      let res = await createTopicReplies(this.topic_id, currentComment);

      if (res.status === 'failed') {
        Taro.hideLoading();
        Taro.showModal({title: "提示", content: res.msg, showCancel: false, confirmColor: "#00D2FF"});
        return
      }
      this.setState({
        currentComment: {boyd: ''},
        show_comment: false
      })
      this.getTopicReplyList(this.topic_id)
      Taro.pageScrollTo({
        scrollTop: 200,
        duration: 300
      });
      Taro.hideLoading();
      Taro.showToast({
        title: "发布成功啦",
        icon: "success",
        mask: true,
        duration: 1500
      });
    }
  }

  // 同步内容
  saveComment = (event) => {
    this.setState({
      currentComment: {...this.state.currentComment, body: event.detail.value}
    })
  }

  // 清除评论
  clearComment = (event) => {
    if (!event.detail.value) {
      this.setState({
        show_comment: false,
        currentComment: {placeholder: '写点评论吧', body: '', topic_id: this.topic_id}
      })
    }
  }

  onLike = (liked) => {
    if (liked) {
      this.props.dispatchLikeTopic({obj_type: 'topic', obj_id: this.topic_id})
    } else {
      this.props.dispatchUnLikeTopic({obj_type: 'topic', obj_id: this.topic_id})
    }
  }

  onCopyTopic = async () => {
    const {topic: {topicMeta}} = this.props
    if (topicMeta.child_topic_id) {
      const go_my_topic_res = await Taro.showModal({
        title: '提示',
        content: '已保存到我的心愿清单，是否现在查看？'
      })
      if (go_my_topic_res.confirm) {
        goPage.goEditTopic(topicMeta.child_topic_id)
      }
      return
    }

    const topic_res = await copyTopic(this.topic_id)
    if (topic_res.topic && topic_res.topic.id) {
      this.props.dispatchTopicDetail({topic_id: this.topic_id})
      const go_my_topic_res = await Taro.showModal({
        title: '提示',
        content: '已保存到我的心愿清单，是否现在查看？'
      })
      if (go_my_topic_res.confirm) {
        goPage.goEditTopic(topic_res.topic.id)
      }
    }
  }

  onShareAppMessage() {
    return {
      title: this.props.topic.topicDetail.title,
      path: '/pages/topics/topic-detail?topic_id=' + this.topic_id,
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    };
  }

  render() {
    const {topic, topic: {topicDetail, topicSuggestions}} = this.props
    const {topic: {topicMeta}} = this.props
    const {currentComment, show_comment, loading} = this.state
    const topicMedias = topicDetail.medias.map((file) => (file.split('?')[0] + '?imageMogr2/thumbnail/!1125x735r/gravity/Center/crop/1125x735'))
    const canEdit = topicDetail.abilities && topicDetail.abilities.update
    const MediaLength = topicMedias.length + (topicDetail.video_content ? 1 : 0)
    let video_content = topicDetail.video_content ? topicDetail.video_content + '?vframe/jpg/offset/1/rotate/auto' : ''

    if (loading) {
      return <AtActivityIndicator content='加载中...' mode="center"/>
    }

    return (
      <View className="topic-detail">
        <View className="header">
          <Header title='心愿详情'/>
        </View>
        <View className="topic-wrapper">
          <View className="avatar-wrapper">
            <Avatar
              user={topicDetail.user}
              showFollow={!canEdit}
              followed_user={topicMeta.followed_user}
              topic={topicDetail}
              currentUserId={this.currentUserId}
              canEdit={canEdit}
              is_hide={topicDetail.is_hide}
            >
            </Avatar>
          </View>

          {
            MediaLength > 0 && <View className="images">
              <Swiper
                indicatorDots={MediaLength > 1}
                indicatorColor="#E6E6E6"
                indicatorActiveColor="#FD7C97"
                circular
                className="media-list"
                style={{height: Taro.pxTransform(490)}}
              >
                <View>
                  {topicMedias.map((media) => {
                    return <SwiperItem className="media" key={media}>
                      <Image
                        src={media}
                        className="media-img"
                        onClick={this.onPreview.bind(this, media)}
                      >
                      </Image>
                    </SwiperItem>
                  })}
                  {
                    video_content &&
                    <SwiperItem className="media" key={video_content}>
                      <Image
                        src={video_content}
                        className="media-img"
                        onClick={this.previewVideo.bind(this, video_content)}
                        mode="widthFix"
                        lazyLoad>
                      </Image>
                      <Image
                        src={playVideoImg}
                        alt=""
                        onClick={this.previewVideo.bind(this, video_content)}
                        className="play-video"/>
                    </SwiperItem>
                  }
                </View>
              </Swiper>
            </View>
          }

          {
            topicDetail.title && <View className="title">
              {topicDetail.title}
            </View>
          }

          {
            topicDetail.body && <View className="body">
              {
                topicDetail.body.split("\n").map(i => {
                  return <View className={i ? '' : 'txt'} key={i}>{i}</View>
                })
              }
            </View>
          }

          {
            <View className="suggestions-wrap">
              <SuggestionList suggestionList={topicSuggestions}/>
            </View>
          }

          <View className="numbers">
            <View className="left-content">
              <View className="item">
                <UIcon icon="view-user" ex-class="icon"/> <Text className="txt">{topicDetail.hits}</Text>
              </View>
              <View className="item" onClick={this.onLike.bind(this, !topic.topicMeta.liked)}>
                <UIcon icon={topic.topicMeta.liked ? 'liked' : 'like'}
                       ex-class={`icon ${topicMeta.liked ? 'liked' : 'like'}`}/>
                <Text className="txt">{topic.topicMeta.liked ? '已喜欢' : '喜欢'}</Text>
              </View>
              <View className="item" onClick={this.onReplyComment}>
                <UIcon icon="comment" ex-class="icon"/> <Text className="txt">评论</Text>
              </View>
            </View>

            <View className="created_at">
              {topicDetail.created_at_text}
            </View>
          </View>


          <View className="share-wrapper">
            <View className="share-user">
              <Button open-type="share" share-type="1" className="share-btn">
                {process.env.TARO_ENV === 'weapp' && <Image src={WechatShareFriend} className="share-cover"/>}
                {process.env.TARO_ENV === 'qq' && <Image src={QQShareFriend} className="share-cover"/>}
              </Button>
            </View>
            <View className="share-friend">
              {process.env.TARO_ENV === 'qq' &&
              <Button open-type="share" share-type="2" className="share-btn">
                <Image src={QQShareZone} className="share-cover" style={{width: '271rpx'}} />
              </Button>
              }
              {
                process.env.TARO_ENV === 'weapp' &&
                <Poster
                  title={topicDetail.title}
                  username={topicDetail.user.name}
                  user_avatar={topicDetail.user.avatar_url}
                  cover_url={topicDetail.medias[0]}
                  created_at={topicDetail.created_at}
                >
                  <Button className="share-btn">
                    <Image src={WechatShareZone} className="share-cover"/>
                  </Button>
                </Poster>
              }

            </View>
          </View>
        </View>
        <View className="border-top-1px"/>
        <View className="comment-wrapper">
          <CommentList
            commentList={this.state.commentList}
            comments_count={topicDetail.replies_count}
            onReplyComment={this.onReplyComment}
            onDeletedComment={this.onDeleteComment}
            currentUserId={this.currentUserId}
            topic={topicDetail}
          />
        </View>

        {
          !show_comment && (topicDetail.user.id !== this.currentUserId) &&
          <View className="topic-bottom border-top-1px">
            <View className="bottom-item" onClick={this.onReplyComment}>
              <UIcon icon="comment" ex-class="icon comment"/> <Text className="txt">你写个评论呗</Text>
            </View>
            <View className="bottom-item copy-btn" onClick={this.onCopyTopic}>
              <UIcon icon="topic-copy" ex-class="icon topic-copy"/> <Text className="txt">
              {topic.topicMeta.child_topic_id ? '已保存到我的心愿清单' : '保存到我的心愿清单'}
            </Text>
            </View>
          </View>
        }
        {
          !show_comment && (topicDetail.user.id === this.currentUserId) && <Button open-type="share" className="share-bottom border-top-1px">
            <Button className="share-bottom-btn">
              马上分享给好友吧
            </Button>
          </Button>
        }
        {
          show_comment && <View className="topic-bottom border-top-1px">
            <View className="comment-input">
              <Input
                placeholder={currentComment.placeholder}
                className="comment-content"
                value={currentComment.content}
                cursorSpacing="10"
                focus
                autoFocus
                confirmType="发送"
                // adjustPosition
                type="text"
                maxLength="100"
                onConfirm={this.publishComment}
                onBlur={this.clearComment}
                onInput={this.saveComment}
              />
              <View
                onClick={this.publishComment}
                className="publish-comment"
                style={{color: (currentComment.body.length >= 2 ? '#219BFF' : '')}}>
                发送
              </View>
            </View>
          </View>
        }
      </View>
    );
  }
}


export default TopicDetail;
