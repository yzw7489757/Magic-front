<template>
  <div>
    <ApplicationList :appList="applicationList"></ApplicationList>
  </div>
</template>

<script>
import ApplicationList from './components/applicationList'
import { getRecordList } from '@/api/performance'
export default {
  name: "project",
  data(){
    return {
      applicationList:[
        {
          id: 2,
          projectName: 'string', //项目名称
          createTime: Date.now(), //创建时间
          platform: 'all',// 项目运行环境
          running: true,  // 服务状态
          creator: 'string',  // 创建者 
        },
        {
          id: 22,
          projectName: 'string', //项目名称
          createTime: Date.now(), //创建时间
          platform: 'all',// 项目运行环境
          running: false,  // 服务状态
          creator: 'string',  // 创建者 
        },
        {
          id: 24,
          projectName: 'string', //项目名称
          createTime: Date.now(), //创建时间
          platform: 'H5',// 项目运行环境
          running: false,  // 服务状态
          creator: 'string',  // 创建者 
        },
        {
          id: 52,
          projectName: 'string', //项目名称
          createTime: Date.now(), //创建时间
          platform: 'PC',// 项目运行环境
          running: true,  // 服务状态
          creator: 'string',  // 创建者 
        }
      ],
    }
  },
  components: {
    ApplicationList
  },
  methods:{
    getRecord(){
      getRecordList()
    }
  },
  mounted() {
    this.getRecord()
  },
}
</script>

<style lang="scss" scoped>

</style>
