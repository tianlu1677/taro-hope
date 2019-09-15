import Taro, {Component} from "@tarojs/taro";
import {View, Textarea, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dispatchCurrentUser, dispatchUpdateCurrentUser} from "@/actions"

import './edit-detail.module.scss'

@connect(state => state.user, {dispatchCurrentUser, dispatchUpdateCurrentUser})


class EditDetail extends Component {
  config = {
    navigationBarTitleText: "编辑"
  };

  constructor() {
    super(...arguments);
    this.editColumn = this.$router.params.column
  }
  state = {
    valid: false,
    name: '',
    tagline: ''
  }

  componentDidMount() {
    this.props.dispatchCurrentUser().then((res) => {
      this.setState({
        name: this.props.currentUser.name,
        tagline: this.props.currentUser.tagline,
      })
    });

  }

  // 文字
  addPlainText = (event) => {
    this.setState({
      name: event.detail.value,
      valid: event.detail.value.length > 0
    })
  }

  addTaglineText = (event) => {
    this.setState({
      tagline: event.detail.value,
      valid: event.detail.value.length > 0
    })
  }

  submitHandler = () => {
    if(this.state.valid) {
      this.props.dispatchUpdateCurrentUser({user: {name: this.state.name, tagline: this.state.tagline}})
      Taro.navigateBack({delta: 1})
    }
  }

  render() {
    const { name, tagline } = this.props.currentUser
    return (
        <View className="edit-account-input">
          {
            this.editColumn === 'name' && <View className="textarea-wrp">
              <Textarea
                autoFocus
                focus
                value={name}
                onInput={this.addPlainText}
                maxlength="20"/>
            </View>
          }

          {
            this.editColumn === 'tagline' && <View className="textarea-wrp">
            <Textarea
              autoFocus
              focus
              value={tagline}
              maxlength="50"
              onInput={this.addTaglineText}/>
            </View>
          }

          <View className="publish-button" onClick={this.submitHandler}>
            <View className={this.state.valid ? 'ready' : 'no-ready'}>
              保存
            </View>
          </View>
        </View>
    );
  }
}


export default EditDetail;
