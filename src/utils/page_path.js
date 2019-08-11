import Taro from "@tarojs/taro";

export default class goPage {
  static goHomeUrl(params = "") {
    Taro.switchTab({url: "/pages/home/index"});
  }

  static goTopicDetail(id) {

  }

  static goEditUser() {
    Taro.navigateTo({url: '/pages/users/edit'})
  }

  // 兴趣广场
  // static goCategoryListUrl() {
  //   Taro.navigateTo({url: "/pages/categories/category-list"});
  // }
}
