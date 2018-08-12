import constant from '@const/public'

const page = {
  data: () => ({
    DEFAULT_PAGE_SIZE: constant.DEFAULT_PAGE_SIZE,
    page: null
  }),
  methods: {
    getPage(newPage, opts, property = 'page') {
      let page = null
      if (!newPage) newPage = {}
      if (!newPage.pageindex) {
        newPage.pagesize = this.DEFAULT_PAGE_SIZE
        newPage.pageindex = 1
        page = Object.assign(newPage, opts || {})
      } else {
        newPage.pageindex += 1
        page = newPage
      }
      this[property] = page
      return page
    },
    infiniteLoading($infinite, apiCall, property) {
      this.getPage(this[property], null, property)
      return apiCall(this[property]).then(res => {
        $infinite.loaded()
        if (res.length < this[property].pagesize || res.length === 0 || !res) {
          $infinite.complete()
        }
        return res
      })
    }
  }
}

const preventWindowScroll = {
  data: () => ({
    active: false
  }),
  methods: {
    preventWindowScroll(event) {
      console.log('something happened')
      // event.preventDefault()
      // event.stopPropagation()
    }
  },
  watch: {
    active(isActive) {
      if (isActive) {
        document.documentElement.style.overflow = 'hidden'
        this.formBg = true
      } else {
        document.documentElement.style.overflow = 'auto'
      }
    }
  }
}
export { page, preventWindowScroll }
