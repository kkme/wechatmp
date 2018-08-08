<template>
  <div class="white">
    <job-item v-for="item in histories"
              :key="item.id"
              :items="item"></job-item>
    <base-infinite @infinite="getMoreData"></base-infinite>
  </div>
</template>

<script>
import JobItem from '@/components/JobItem'
import { mapGetters, mapActions } from 'vuex'
import { page } from '@mixins'
export default {
  components: {
    JobItem
  },
  head: () => ({
    title: '我的足迹'
  }),
  meta: {
    title: '我的足迹'
  },
  mixins: [page],
  computed: {
    ...mapGetters({
      histories: 'users/histories'
    })
  },
  methods: {
    ...mapActions({
      fetchHistories: 'users/fetchHistories'
    }),
    getMoreData($infinite) {
      this.getPage(this.page)
      this.fetchHistories(this.page).then(res => {
        $infinite.loaded()
        if (res.length < this.page.pagesize || res.length === 0) {
          $infinite.complete()
        }
      })
    }
  }
}
</script>
