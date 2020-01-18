<template>
  <div>
    <ProjectController @onSearch="triggerToSearchApplication" ref="projectFilter"></ProjectController>
    <ApplicationList :appList="applicationList"></ApplicationList>
     <y-page
      v-if="count"
      v-model="pageNum"
      :page-count="countPage"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      container-class='pagination'>
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
      applicationList: []
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
    this.pageChanged()
  }
}
</script>

<style lang="scss" scoped>

</style>
