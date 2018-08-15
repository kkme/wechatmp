<template>
  <job-preference></job-preference>
</template>

<script>
import JobPreference from '@/components/JobPreference'
export default {
  components: {
    JobPreference
  },
  head: () => ({
    title: '定制推荐'
  }),
  meta: {
    title: '定制推荐'
  }
}
</script>

<style>
</style>
