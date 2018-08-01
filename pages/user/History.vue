<template>
  <div>
    <job-item />
    <job-item />
    <job-item />
    <job-item />
  </div>
</template>

<script>
import JobItem from '@/components/JobItem'
export default {
  asyncData(context) {
    // called every time before loading the component
    return { name: 'World' }
  },
  head: () => ({
    title: '浏览记录'
  }),
  meta: {
    title: '浏览记录'
  },
  components: {
    JobItem
  }
}
</script>

<style>
</style>
