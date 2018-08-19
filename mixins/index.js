import constant from '@const/public'

const page = {
  data: () => ({
    DEFAULT_PAGE_SIZE: constant.DEFAULT_PAGE_SIZE,
    page: null
  }),
  methods: {
    getPage(newPage, opts, property = 'page') {
      let page = null
      // console.log({ newPage }, { opts }, { property })
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
    infiniteLoading($infinite, apiCall, property, opts) {
      this.getPage(this[property], opts, property)
      return apiCall(this[property]).then(res => {
        let length = 0
        if (res.list) length = res.list.length
        else length = res.length
        if (length) {
          $infinite.loaded()
          if (length < this[property].pagesize) {
            $infinite.complete()
            // this[property] = null
          }
        } else {
          this[property] = null
          $infinite.complete()
        }
        return res
      })
    },
    infinite($infinite, apiCall, opts, property = 'page') {
      this.infiniteLoading($infinite, apiCall, property, opts)
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
