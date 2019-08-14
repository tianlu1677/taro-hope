import Taro, {Component} from '@tarojs/taro'
import {Button, Form} from '@tarojs/components'

// import { uploadFormId } from '@/api/notify_record_api'

import './index.module.scss'

export default class FormId extends Component {

  handleSubmit = e => {
    let key = 'form_ids';
    console.log('e', e.detail)
    let form_id = e.detail.formId

    // uploadFormId({form_ids: [form_id]})

    // let form_ids = Taro.getStorageSync(key);
    // if (form_ids.length > 0) {
    //   form_ids.push(form_id);
    //   Taro.setStorage({key: key, data: form_ids});
    // } else {
    //   Taro.setStorage({key: key, data: [form_id]});
    // }
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
