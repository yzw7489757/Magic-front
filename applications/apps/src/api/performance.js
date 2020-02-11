import request from '@/utils/request'

export const getRecordList = data =>
  request({
    url: '/api/performance/list',
    method: 'get',
    data
  })
export const insertRecord = data =>
  request({
    url: '/api/performance/insert',
    method: 'post',
    data
  })
