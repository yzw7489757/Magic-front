import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
import Modal from '@/components/Dialog'
import Form from '@/components/Form'
import FormItem from '@/components/Form/formItem'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Pagination from '@/components/Pagination'
import Swtich from '@/components/Swtich'
import Message from '@/components/Message/index.js'

Vue.use(Message)

// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('y-modal', Modal)
Vue.component('y-form', Form)
Vue.component('y-form-item', FormItem)
Vue.component('y-input', Input)
Vue.component('y-button', Button)
Vue.component('y-select', Select)
Vue.component('y-page', Pagination)
Vue.component('y-swtich', Swtich)
