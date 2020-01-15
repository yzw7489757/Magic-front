export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      pageSizes: [2, 5, 10, 15, 20]
    }
  },
  methods: {
    /**
     * 每页条数改变
     */
    triggerToPageSizeChange(pageSize, fn) {
      this.pageSize = pageSize
      fn && fn()
    },
    /**
     * 当前页更改
     */
    triggerToCurrentPageNumChange(pageNum, fn) {
      this.pageNum = pageNum
      fn && fn()
    }
  }
}
