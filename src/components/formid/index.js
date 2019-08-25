import Taro, {Component} from '@tarojs/taro'
import {Button, Form} from '@tarojs/components'

import { createFormId } from '@/api/notify_record_api'

import './index.module.scss'

export default class FormId extends Component {

  handleSubmit = (e) => {
    let form_id = e.detail.formId
    Taro.getStorage({
      key: 'auth_token',
      success: (e) => {
        createFormId({form_ids: [form_id]})
      },
      fail: () => {
        // console.log(fail)
      }
    }).catch(() => {
      // console.log(catch_err)
    })
  }

  render() {
    return (
      <Form reportSubmit style={this.props.customStyle} className="form" onSubmit={this.handleSubmit}>
        {this.props.children}

        <Button formType="submit" className="form-btn" hoverClass="none">
        </Button>
      </Form>
    )
  }
}
