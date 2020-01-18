export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      countPage: 0,
      count: 0,
      pageLoading: false
    }
  },
  watch: {
    pageNum(newVal, oldVal) {
      if (newVal !== oldVal) this.pageChange(this.pageNum, this.pageSize)
    }
  },
  methods: {
    async pageChange(pageNum) {
      this.pageLoading = true
      if (this.pageChanged) {
        await this.pageChanged()
      }
      this.pageLoading = false
    }

  }
}
