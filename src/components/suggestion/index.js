import Taro, {Component} from "@tarojs/taro";
import {View, Text, Input} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import { AtSwipeAction } from "taro-ui"
import UIcon from '@/components/uicon'

import {
  dispathAddSuggestion,
  dispathEditSuggestion,
  dispathDeleteSuggestion,
  dispatchInitSuggestions,
  dispathEmptySuggestions,
} from "@/actions"

import './index.module.scss'

const options = [{
  text: '取消',
  type: 'cancel',
  style: {
    backgroundColor: '#6190E8'
  }
},
  {
    text: '删除',
    type: 'success',
    style: {
      backgroundColor: '#FF4949'
    }
  }]

@connect(state => state.topic, {
  dispathAddSuggestion,
  dispathEditSuggestion,
  dispathDeleteSuggestion,
  dispatchInitSuggestions,
  dispathEmptySuggestions,
})

class Suggestion extends Component {

  static defaultProps = {
    disabled: false,
    topic_id: '',
    onClick: () => {},
  }

  componentDidMount() {
    if(this.props.topic_id) {
      this.props.dispatchInitSuggestions({topic_id: this.props.topic_id})
    } else {
      this.props.dispathEmptySuggestions()
    }
  }

  onChangeSuggestion = (baseSuggestion, index, event) => {
    const {value, cursor, keyCode} = event.detail
    // console.log(value)
    let sug = {...baseSuggestion, title: value}
    this.props.dispathEditSuggestion(sug, index)
  }

  onChangeSuggestionStatus = (baseSuggestion, index, event) => {
    event.stopPropagation();

    let status = baseSuggestion.status === 'finish' ? 'new' : 'finish'
    let sug = {...baseSuggestion, status: status}
    this.props.dispathEditSuggestion(sug, index)
  }

  onAddSuggestion = () => {
    let baseSuggestion = { topic_id: this.topic_id, id: '', editable: true, title: '', status: 'new' }
    this.props.dispathAddSuggestion(baseSuggestion)
  }

  onDeleteSuggestion = (index, event) => {
    // event.stopPropagation()
    console.log('event', event)
    if(event.type === 'success') {
      this.props.dispathDeleteSuggestion(index)
    }
  }

  render() {
    const {  editSuggestionList  } = this.props
    return (<View className="suggestion-wrap">
        <View className="suggestion-list">
          {
            editSuggestionList.map((baseSuggestion, index) => {

              return <AtSwipeAction
                autoClose
                className="delete-wrap"
                key={baseSuggestion.id}
                onClick={this.onDeleteSuggestion.bind(this, index)}
                options={options}
              >
              <View className="base-suggestion" key={baseSuggestion.id}>
                <View className="select-box" onClick={this.onChangeSuggestionStatus.bind(this, baseSuggestion, index)}>
                  { baseSuggestion.status === 'finish' ? <UIcon icon="plus" ex-class="finished"/> : '' }
                </View>
                  <View className="title-wrap">
                    {
                      <Input
                        className="title"
                        type="text"
                        maxLength={200}
                        value={baseSuggestion.title}
                        placeholder="请输入您的清单"
                        adjustPosition
                        onInput={this.onChangeSuggestion.bind(this, baseSuggestion, index)}
                      />
                    }
                  </View>
              </View>
              </AtSwipeAction>
            })
          }

        </View>

        <View className="add-sug" onClick={this.onAddSuggestion}>
          + 添加清单事项
        </View>
      </View>
    );
  }
}


export default Suggestion;
