<template>
  <div>
    <ProjectController @onSearch="triggerToSearchApplication" ref="projectFilter"></ProjectController>
    <ApplicationList :appList="applicationList"></ApplicationList>
     <y-page
      v-model="pageNum"
      :page-count="countPage"
      :page-range="3"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      container-class='pagination'
      :first-last-button="true">
    </y-page>
  </div>
</template>

<script>
import ApplicationList from './components/applicationList'
import ProjectController from './components/project-controller'
import { getApplicationList } from '@/api/application'
import pagination from '@/mixins/pagination'
export default {
  name: "project",
  mixins: [pagination],
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
      const { list, countPage, count } = await getApplicationList({ ...formInfo, pageNum: this.pageNum, pageSize: this.pageSize })
      this.applicationList = list
      this.countPage = countPage
      this.count = count
    },
    pageChanged() {
      this.triggerToSearchApplication(this.$refs.projectFilter.application)
    }
  },
  mounted() {
    this.triggerToSearchApplication()
  }
}
</script>

<style lang="scss" scoped>

</style>
