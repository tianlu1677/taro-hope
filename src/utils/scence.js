import Taro from "@tarojs/taro";

export const topicDetailScene = (scene_value = '') => {
  let scene = scene_value.toString()
  // console.log('xxxx', scene_value)
  const SceneKey = 'scene=2000'
  if(!scene || scene.indexOf(SceneKey) < 0) {
    return false
  }
  let topic_id = scene.replace(SceneKey+'&topic_id=', '')
  if(topic_id) {
    Taro.redirectTo({url: 'pages/topics/topic-detail?topic_id=' + topic_id})
    return true
  } else {
    return false
  }
}
