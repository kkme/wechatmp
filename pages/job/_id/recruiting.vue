<template>
  <div class="white">
    <job-item></job-item>
    <job-item></job-item>
    <job-item></job-item>
  </div>
</template>

<script>
import JobItem from '@/components/JobItem'
export default {
  components: {
    JobItem
  },
  head: () => ({
    title: '正在招聘'
  }),
  meta: {
    title: '正在招聘'
  },
  deta: () => ({})
}
</script>

<style lang="scss">
</style>
