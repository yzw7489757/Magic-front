import loading from '@/directive/loading'

const install = function(Vue) {
  Vue.directive('loading', loading)
}

export default install
