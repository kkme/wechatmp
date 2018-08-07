import constant from '@const/public'

const page = {
  data: () => ({
    DEFAULT_PAGE_SIZE: constant.DEFAULT_PAGE_SIZE
  }),
  methods: {
    getPage(newPage, opts) {
      if (!newPage.pageindex) {
        newPage.pagesize = this.DEFAULT_PAGE_SIZE
        newPage.pageindex = 1
        return Object.assign(newPage, opts || {})
      } else {
        newPage.pageindex += 1
        return newPage
      }
    }
  }
}

export { page }
