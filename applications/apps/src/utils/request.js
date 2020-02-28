import axios from 'axios'
import Message from '@/components/Messgae/index.js'
import { router } from '@/main'
// import store from '@/store'

const baseUrl = process.env.VUE_APP_REQUEST_URL
const NOT_PRO = process.env.NODE_ENV !== 'production'
// 重试次数
axios.defaults.retry = 1
axios.defaults.retryDelay = 1000

// 配置切换路由取消请求,
// const { CancelToken } = axios;
// const source = CancelToken.source();
// store.dispatch('ChangeRequestToken', source);

const tip = (msg, time = 5) => Message.error({
  text: msg,
  duration: time * 1000
})

const service = axios.create({
  baseURL: `//${baseUrl}`,
  timeout: 30 * 1000
  // cancelToken: source.token
})

function reLogin() {
  window.sessionStorage.removeItem('token')
  router.push({
    path: '/login'
  })
  tip('登录失效，请重新登录', 3)
}

service.interceptors.request.use(
  config => {
    // config.cancelToken = store.getters.source.token;
    if (sessionStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}` // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { code, data, message = '' } = response.data
    if (code === 401) {
      reLogin()
      return Promise.reject(message)
    } else if (code !== 200) {
      NOT_PRO && tip(message)
    } else {
      return Promise.resolve(data)
    }
  },
  error => {
    const { config = {}, response, message = '' } = error
    if (response && response.status === 401) {
      // 401 token有误
      reLogin()
      return Promise.reject(error)
    }
    //  If config does not exist or the retry option is not set, reject
    if (!config.retry) {
      if (message) tip(message)
      return Promise.reject(error)
    }

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0

    //  Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      tip('请求失败，重新请求中...', 30)
      return Promise.reject(error)
    }
    config.__retryCount += 1

    // Create new promise to handle exponential backoff
    const backoff = new Promise(resolve => {
      // console.log('Re-request Num:', config.__retryCount)
      setTimeout(() => {
        resolve()
      }, config.retryDelay || 1)
    })

    // Return the promise in which recalls axios to retry the request
    return backoff.then(() => service(config))
  }
)

export default service
