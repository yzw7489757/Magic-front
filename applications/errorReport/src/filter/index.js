import { parseTime } from '@/utils/util'
export default function timeFormat(Vue) {
  Vue.filter('time', function(value) {
    if (!value || new Date(value).toLocaleDateString() === 'Invalid Date') return '-'
    return parseTime(value, '{y}-{m}-{d} {h}:{i}:{s}')
  })
  Vue.filter('day', function(value) {
    if (!value || new Date(value).toLocaleDateString() === 'Invalid Date') return '-'
    return parseTime(value, '{y}-{m}-{d}')
  })
}
