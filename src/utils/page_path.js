import Taro from "@tarojs/taro";

export default class goPage {
  static goHomeUrl(params = "") {
    Taro.switchTab({url: "/pages/home/index"});
  }
  // 兴趣广场
  // static goCategoryListUrl() {
  //   Taro.navigateTo({url: "/pages/categories/category-list"});
  // }

  static goUserDetail(user_id) {
    Taro.navigateTo({url: "/pages/users/detail?user_id=" + user_id});
  }

  static goTopicDetail(topic_id) {
    Taro.navigateTo({url: "/pages/topics/topic-detail?topic_id=" + topic_id});
  }
}

