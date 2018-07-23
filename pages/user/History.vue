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
  head: () => ({
    title: '浏览记录'
  }),
  meta: {
    haha: 11111
  },
  components: {
    HistoryItem
  }
}
</script>

<style>
</style>
