<template>
  <div>
    <history-item />
    <history-item />
    <history-item />
    <history-item />
  </div>
</template>

<script>
import HistoryItem from '@/components/HistoryItem'
export default {
  asyncData (context) {
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
    HistoryItem
  }
}
</script>

<style>
</style>
