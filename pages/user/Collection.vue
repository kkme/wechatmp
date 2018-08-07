<template>
  <div>
    <v-tabs fixed-tabs
            slider-color="primary"
            v-model="tabs">
      <v-tab>任务</v-tab>
      <v-tab>企业</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs"
                  class="white">
      <v-tab-item class="collection-tab">
        <job-item :items="jobCollections"></job-item>
        <base-infinite v-if="tabs === 0"
                       @infinite="getMoreJob" />
      </v-tab-item>
      <v-tab-item>
        <corp-item></corp-item>
        <base-infinite v-if="tabs === 1"
                       @infinite="getMoreCorp" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import JobItem from '@/components/JobItem'
import CorpItem from '@/components/CorpItem'
import { mapGetters, mapActions } from 'vuex'
import { page } from '@mixins'

export default {
  components: {
    JobItem,
    CorpItem
  },
  head: () => ({
    title: '我的收藏'
  }),
  meta: {
    title: '我的收藏'
  },
  data: () => ({
    tabs: 0,
    list: [],
    list1: [],
    jobPagination: {},
    corpPagination: {}
  }),
  mixins: [page],
  computed: {
    ...mapGetters({
      jobCollections: 'users/jobCollections',
      corpCollections: 'users/corpCollections'
    })
  },
  methods: {
    ...mapActions({
      fetchCollections: 'users/fetchCollections'
    }),

    getMoreJob($infinite) {
      this.jobPagination = this.getPage(this.jobPagination)
      this.fetchCollections({ payload: this.jobPagination, type: 'job' }).then(res => {
        $infinite.loaded()
        if (res.length < this.jobPagination.pagesize || res.length === 0) {
          $infinite.complete()
        }
      })
    },
    getMoreCorp($infinite1) {
      this.corpPagination = this.getPage(this.corpPagination)
      this.fetchCollections({ payload: this.jobPagination, type: 'corp' }).then(res => {
        $infinite1.loaded()
        if (res.length < 20 || res.length === 0) {
          $infinite1.complete()
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
