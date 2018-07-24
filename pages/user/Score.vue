<template>
  <div>
    <points-item></points-item>
    <points-item></points-item>
    <points-item></points-item>
  </div>
</template>

<script>
import PointsItem from '@/components/PointsItem'
export default {
  components: {
    PointsItem
  },
  head: () => ({
    title: '我的信誉'
  }),
  meta: {
    title: '我的信誉'
  }
}
</script>

<style>
</style>
