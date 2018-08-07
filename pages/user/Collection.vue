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
        <job-item :items="collections"></job-item>
        <base-infinite @infinite="getMoreJob" />
      </v-tab-item>
      <v-tab-item>
        <corp-item :info="{}"></corp-item>
        <base-infinite @infinite="getMoreCorp" />
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
    jobPagination: {},
    corpPagination: {}
  }),
  mixins: [page],
  computed: {
    ...mapGetters({
      collections: 'users/collections'
    })
  },
  methods: {
    ...mapActions({
      fetchCollections: 'users/fetchCollections'
    }),

    getMoreJob($infinite) {
      this.jobPagination = this.getPage(this.jobPagination, { type: 'COLLECTION_TYPE_PARTTIME' })
      this.fetchCollections(this.jobPagination).then(res => {
        $infinite.loaded()
        if (res.length < 20 || res.length === 0) {
          $infinite.complete()
        }
      })
    },
    getMoreCorp($infinite1) {
      this.corpPagination = this.getPage(this.corpPagination, { type: 'COLLECTION_TYPE_COMPANY' })
      this.fetchCollections(this.corpPagination).then(res => {
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
