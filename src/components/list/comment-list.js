import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import PropTypes from "prop-types";
import Avatar from '@/components/avatar'
import Empty from '@/components/empty'

import './comment-list.module.scss';

class CommentList extends Component {
  constructor() {
    super(...arguments);
  }

  static propTypes = {
    commentList: PropTypes.array,
    comments_count: PropTypes.number,
    empty: PropTypes.bool
  }

  static defaultProps = {
    commentList: [],
    onDeletedComment: () => {},
    onReplyComment: () => {}
  }

  componentDidMount() {
  }

  choseAction = async (comment, commentIndex) => {
    let currentUserId = Taro.getStorageSync('user_id');
    if (!currentUserId) {
      return
    }
    if(currentUserId !== comment.user_id) {
      const res = await Taro.showActionSheet({itemList: ['回复']})
      this.props.onReplyComment(comment)
      return;
    }
    if(currentUserId === comment.user_id) {
      const reply_res = await Taro.showActionSheet({itemList: ["回复", "删除"]})
      if(reply_res.tapIndex === 0) {
        this.props.onReplyComment(comment)
      } else if (reply_res.tapIndex === 1) {
        this.props.onDeletedComment(comment.id, commentIndex);
      }
    }
  }

  render() {
    const {commentList, comments_count, empty} = this.props
    return (
      <View className="comment-list">
        <View className="comment-list-title">
          <View className="text">全部评论</View>
          {/*<Text className="comments-count">{comments_count || commentList.length}</Text>*/}
        </View>
        { comments_count <= 0 ? <Empty title="暂时还没评论" /> : '' }
        <View>
          {
            commentList.map((comment, comment_index) => {
              return <View className="comment" key={comment.id}>
                <Avatar
                  user={comment.user}
                  showFollow={false}
                >
                </Avatar>
                <View className="content">
                  <View className="comment-content" onClick={this.choseAction.bind(this, comment, comment_index)}>
                    <Text>{comment.body}</Text>
                    {
                      comment.reply_to_id &&
                      <View className="reply">
                        <Text className="account-name">{comment.reply_user ? comment.reply_user.name : '匿名用户'}: </Text>
                        <Text className="text">{comment.reply_body || '已删除'}</Text>
                      </View>
                    }
                    <View className="reply-count">
                      {comment.created_at_text} · 回复{comment.child_comments_count > 0 ? comment.child_comments_count : ''}
                    </View>
                  </View>
                </View>
              </View>
            })
          }
        </View>
      </View>
    );
  }
}

export default CommentList;
