import request from '@/utils/request'

export const Login = data =>
  request({
    url: '/api/user/login',
    method: 'post',
    data
  })
export const Register = data =>
  request({
    url: '/api/user/insert',
    method: 'post',
    data
  })
