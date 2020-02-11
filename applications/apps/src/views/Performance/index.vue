<template>
  <div></div>
</template>

<script>
import { getRecordList } from '@/api/performance'
export default {
  name: "Performance",
  data() {
    return {
      recordList: []
    }
  },
  components: {
    // ChartWrap: () => import('@/components/ChartWrap/index')
  },
  methods: {
    getRecord() {
      getRecordList()
    }
  },
  mounted() {
    this.getRecord()
  }
}
</script>
