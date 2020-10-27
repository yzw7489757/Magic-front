/* eslint-disable prefer-destructuring */
/** 两种调用方式 引入组件message.success('123');和this.$msg.success('123')
 *
 * @description xxxxxx
 * @author yuanziwen
 * @since 19/05/21
 */

import Vue from 'vue'
import Message from './index.vue'

function msg(type, text, callback) {
  let msg
  let duration
  if (typeof text === 'string') {
    msg = text
  } else if (text instanceof Object) {
    // 如果传进来的是对象配置
    msg = text.text || ''
    duration = text.duration
  }
  const VueMessage = Vue.extend({
    components: { Message },
    render(h) {
      // 渲染Message组件
      return h('Message', {
        props: {
          type,
          duration: duration || Message.data().duration,
          callback,
          text: msg
        },
        data() {
          return {
            // duration: duration || Message.data().duration
          }
        }
      })
    }
  })
  const newMessage = new VueMessage()
  const vm = newMessage.$mount()
  var el = vm.$el
  document.body.appendChild(el)
}

const MESSAGE = {
  info(text, callBack) {
    msg('info', text || '', callBack)
  },
  success(text, callBack) {
    msg('success', text || '', callBack)
  },
  error(text, callBack) {
    msg('error', text || '', callBack)
  },
  warning(text, callBack) {
    msg('warning', text || '', callBack)
  },
  primary(text, callBack) {
    msg('primary', text || '', callBack)
  },
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    // 挂载到vue原型上，暴露四个方法
    Vue.prototype.$msg = {
      info: MESSAGE.info,
      success: MESSAGE.success,
      error: MESSAGE.error,
      primary: MESSAGE.primary,
      warning: MESSAGE.warning,
      destory: () => {
        document.querySelectorAll('.y-message').forEach(intance => {
          intance.remove()
        })
      }
    }
  }
}

export default MESSAGE
