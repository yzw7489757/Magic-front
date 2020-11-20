<template>
  <div>
    <Controller
      @onSearch="triggerToSearchApplication"
      ref="projectFilter"
    />
    <ListContent
      :appList="applicationList"
      @onChange="triggerToModifyAppStatus"
    />
    <a-pagination
      class="pagination"
      show-size-changer
      @showSizeChange="pageChange"
      v-if="count"
      v-model="pageNum"
      :page-size.sync="pageSize"
      :total="count"
      show-less-items
    />
  </div>
</template>

<script>
import Controller from './components/Controller';
import { getApplicationList, updateApplication } from "@/api/application";

import pagination from "@/mixins/pagination";
export default {
  name: "project",
  mixins: [pagination],
  data() {
    return {
      applicationList: [],
    };
  },
  components: {
    "ListContent": () => import('./components/ListContent'),
    Controller
  },
  methods: {
    async triggerToSearchApplication(formInfo = {}) {
      const { list, count } = await getApplicationList({
        ...formInfo,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.applicationList = list;
      this.count = count;
    },
    pageChanged() {
      this.triggerToSearchApplication(this.$refs.projectFilter.formInfo);
    },
    async triggerToModifyAppStatus(item, status) {
      await updateApplication({
        id: item.id,
        running: status + "",
      });
      this.pageChanged();
    },
  },
  mounted() {
    this.pageChanged();
  },
};
</script>

<style lang="less" scoped>
</style>
