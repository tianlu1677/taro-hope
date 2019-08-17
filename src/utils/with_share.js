import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
// import { createAction } from "@/api/action_api";

function SettingShare(opts = {}) {

  // 设置默认
  const defalutPath = '/pages/home';
  const defalutTitle = '';
  const defaultImageUrl = '';

  return function demoComponent(Component) {
    class withShare extends Component {
      async componentWillMount() {
        Taro.showShareMenu({
          withShareTicket: true
        });

        if (super.componentWillMount) {
          super.componentWillMount();
        }
      }

      // 点击分享的那一刻会进行调用
      onShareAppMessage(options) {
        // console.log('options', options)
        let { title, imageUrl, path = null, target_id, target_type } = opts;

        // 从继承的组件获取配置
        if (this.$setSharePath && typeof this.$setSharePath === 'function') {
          path = this.$setSharePath();
        }

        // 从继承的组件获取配置
        if (this.$setShareTitle && typeof this.$setShareTitle === 'function') {
          title = this.$setShareTitle();
        }

        // 从继承的组件获取配置
        if (
          this.$setShareImageUrl &&
          typeof this.$setShareImageUrl === 'function'
        ) {
          imageUrl = this.$setShareImageUrl();
        }

        // 从继承的组件获取配置， 调用API
        if (this.$setShareTargetId && typeof this.$setShareTargetId === 'function') {
          target_id = this.$setShareTargetId();
        }

        if (!path) {
          path = defalutPath;
        }

        //发送记录
        // if(!!target_id && !!target_type) {
        //   createAction({ target_id: target_id, target_type: target_type, type: 'share' });
        // }

        // // 心得列表
        if (options.from === "button" && options.target) {
          if(options.target.dataset.type === "topic") {
            // console.log('options', options)
            let { nickname, cover, id } = options.target.dataset;
            // createAction({ target_id: id, target_type: 'Topic', type: 'share' });
            return {
              title: `${nickname}的动态`,
              path: `/pages/topics/topic-detail?topic_id=${id}`,
              imageUrl: `${cover}`
            };
          }
        }

        // 每条分享都补充用户的分享id
        // 如果path不带参数，分享出去后解析的params里面会带一个{''： ''}
        const currentAccountId = Taro.getStorageSync('user_id')
        const sharePath = `${path}&share_from_user_id=${currentAccountId}`;

        return {
          title: title || defalutTitle,
          path: sharePath,
          imageUrl: imageUrl || defaultImageUrl
        };
      }

      render() {
        return super.render();
      }
    }

    return withShare;
  };
}

export default SettingShare;
