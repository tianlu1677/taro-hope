import Taro, {Component} from "@tarojs/taro";
import {View, Image, Text, Picker} from "@tarojs/components";
import {connect} from "@tarojs/redux";

import withShare from '@/utils/with_share';
import {dispatchCurrentUser, dispatchUpdateCurrentUser} from "@/actions"
import { uploadImages } from "@/utils/upload_images"
import {siteConfig} from "@/utils"


import './edit.module.scss'

@connect(state => state.user, {dispatchCurrentUser, dispatchUpdateCurrentUser})

class Edit extends Component {
  config = {
    navigationBarTitleText: "编辑"
  };

  constructor() {
    super(...arguments);
  }

  state = {
    gender: ["女", "男", "不显示"]
  }

  componentDidMount() {
    this.props.dispatchCurrentUser()
  }

  changeAvatar = async () => {
    const res = await Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"]
    });
    Taro.showToast({
      title: '上传中...',
      duration: 500,
      mask: true
    })
    const photo_urls = await uploadImages(res.tempFilePaths)
    this.props.dispatchUpdateCurrentUser({user: { remote_avatar_url: photo_urls[0]}})
  }

  goEditUser = (column) => {
    Taro.navigateTo({url: "/pages/users/edit-detail?column=" + column})
  }

  changeGender = (event) => {
    let index = event.detail.value;
    let gender = ["woman", "man", "other"][index];
    this.props.dispatchUpdateCurrentUser({user: { gender: gender }})
  }

  changeBirthday = (event) => {
    console.log('event', event)
  }

  render() {
    const {currentUser} = this.props
    return (<View>
        <View className="edit-account">
          <View className="edit-form">
            <View className="group">
              <View className="label">头像</View>
              <View className="content" onClick={this.changeAvatar}>
                <Image src={currentUser.avatar_url} className="photo" alt=""/>
              </View>
            </View>
            <View className="border-top-1px"/>
            <View className="group">
              <View className="label">昵称</View>
              <View className="content" onClick={this.goEditUser.bind(this, 'name')}>
                <View className="right-text">{currentUser.name || ''}</View>
              </View>
            </View>
            <View className="border-top-1px"/>
            <View className="group">
              <View className="label">性别</View>
              <View className="content">
                <Picker
                  mode="selector"
                  className="right-text"
                  value={currentUser.gender_text}r
                  range={this.state.gender}
                  onChange={this.changeGender}
                >
                  <view className="picker">
                    {currentUser.gender_text}
                  </view>
                </Picker>

                <View className="icon-arrow-right"/>
              </View>
            </View>
            <View className="border-top-1px"/>
            {/*<View className="group">*/}
              {/*<View className="label">生日</View>*/}
              {/*<View className="content">*/}
                {/*<Picker*/}
                  {/*mode="date"*/}
                  {/*className="right-text"*/}
                  {/*start="1980-01-01"*/}
                  {/*end="2010-01-01"*/}
                  {/*value={currentUser.birthday}*/}
                  {/*onChange={this.changeBirthday}*/}
                {/*>*/}
                  {/*<View className="picker">*/}
                    {/*{currentUser.birthday}wwww*/}
                  {/*</View>*/}
                {/*</Picker>*/}
                {/*<View className="icon-arrow-right"/>*/}
              {/*</View>*/}
            {/*</View>*/}
            <View className="border-top-1px"/>
            {/*<View className="group">*/}
              {/*<View className="label">地区</View>*/}
              {/*<View className="content">*/}
                {/*<View className="right-text">{currentUser.city}</View>*/}
                {/*<View className="icon-arrow-right"/>*/}
              {/*</View>*/}
            {/*</View>*/}
            <View className="border-top-1px"/>
            <View className="group">
              <View className="label">简介</View>
              <View className="content" onClick={this.goEditUser.bind(this, 'tagline')}>
                <View className="right-text intro">{currentUser.tagline || ''}</View>
                <View className="icon-arrow-right"/>
              </View>
            </View>
            <View className="border-top-1px"/>
          </View>
        </View>
      </View>
    );
  }
}


export default Edit;
