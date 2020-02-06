import request from '@/utils/request'

export const addNewApplication = (data) => request({
  url: '/api/application/insert',
  method: 'post',
  data
})
export const getApplicationList = (params) => request({
  url: '/api/application/list',
  method: 'get',
  params
})
export const updateApplication = (data) => request({
  url: '/api/application/update',
  method: 'post',
  data
})
