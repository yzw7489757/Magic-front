<template>
  <div>
    <ProjectController @onSearch="triggerToSearchApplication"></ProjectController>
    <ApplicationList :appList="applicationList"></ApplicationList>
  </div>
</template>

<script>
import ApplicationList from './components/applicationList'
import ProjectController from './components/project-controller'
import { getApplicationList } from '@/api/application'

export default {
  name: "project",
  data() {
    return {
      applicationList: [
        {
          id: 2,
          projectName: 'string', // 项目名称
          createTime: Date.now(), // 创建时间
          platform: 'all', // 项目运行环境
          running: true, // 服务状态
          creator: 'string' // 创建者
        },
        {
          id: 22,
          projectName: 'string', // 项目名称
          createTime: Date.now(), // 创建时间
          platform: 'all', // 项目运行环境
          running: false, // 服务状态
          creator: 'string' // 创建者
        },
        {
          id: 24,
          projectName: 'string', // 项目名称
          createTime: Date.now(), // 创建时间
          platform: 'H5', // 项目运行环境
          running: false, // 服务状态
          creator: 'string' // 创建者
        },
        {
          id: 52,
          projectName: 'string', // 项目名称
          createTime: Date.now(), // 创建时间
          platform: 'PC', // 项目运行环境
          running: true, // 服务状态
          creator: 'string' // 创建者
        }
      ]
    }
  },
  components: {
    ApplicationList,
    ProjectController
  },
  methods: {
    async triggerToSearchApplication(formInfo = {}) {
      const result = await getApplicationList(formInfo)
    }

  },
  mounted() {
    this.triggerToSearchApplication()
  }
}
</script>

<style lang="scss" scoped>

</style>
