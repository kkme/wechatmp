<template>
  <v-tabs v-model="active"
          color="white"
          fixed-tabs
          slider-color="primary">
    <v-tab ripple>找任务</v-tab>
    <v-tab ripple>已领取</v-tab>
    <v-tab ripple>已申请</v-tab>
    <v-tab-item>
      <job-filter></job-filter>
      <base-divider></base-divider>
      <job-item>
        <team-append-job-item disableAvatar
                              disableCount></team-append-job-item>
        <base-divider></base-divider>
      </job-item>

    </v-tab-item>
    <v-tab-item>
      <job-item>
        <team-append-job-item disableCount></team-append-job-item>
        <base-divider></base-divider>
      </job-item>
    </v-tab-item>
    <v-tab-item>
      <job-item>
        <team-append-job-item disableCount></team-append-job-item>
        <base-divider></base-divider>
      </job-item>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import JobFilter from '@/components/JobFilter'
import JobItem from '@/components/JobItem'
import TeamAppendJobItem from '@/components/TeamAppendJobItem'
export default {
  components: {
    JobFilter,
    JobItem,
    TeamAppendJobItem
  },
  head: () => ({
    title: '战队任务'
  }),
  meta: {
    title: '战队任务'
  },
  data: () => ({
    active: null
  })
}
</script>

<style lang="scss">
</style>
