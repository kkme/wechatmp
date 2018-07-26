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
    title: '我的信誉'
  }),
  meta: {
    title: '我的信誉'
  },
  computed: {
    ...mapGetters({
      scoreLog: 'users/scoreLog'
    })
  },
  methods: {
    ...mapActions({
      fetchScoreLog: 'users/fetchScoreLog'
    })
  },
  mounted() {
    this.fetchScoreLog()
  }
}
</script>

<style>
</style>
