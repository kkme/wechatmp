<template>
  <div>
    <points-item></points-item>
    <points-item></points-item>
    <points-item></points-item>
  </div>
</template>

<script>
import PointsItem from '@/components/PointsItem'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    PointsItem
  },
  head: () => ({
    title: '我的积分'
  }),
  meta: {
    title: '我的积分'
  },
  computed: {
    ...mapGetters({
      pointsLog: 'users/pointsLog'
    })
  },
  methods: {
    ...mapActions({
      fetchPointsLog: 'users/fetchPointsLog'
    })
  },
  mounted() {
    this.fetchPointsLog()
  }
}
</script>

<style>
</style>
