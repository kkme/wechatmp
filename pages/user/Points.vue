<template>
  <div>
    <points-item v-for="item in pointsLog"
                 :key="item[0]"
                 :items="item"></points-item>
    <base-infinite @infinite="getMoreData"></base-infinite>
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
      pointsLog: 'users/groupedPointsLog'
    })
  },
  methods: {
    ...mapActions({
      fetchPointsLog: 'users/fetchPointsLog'
    }),
    getMoreData($state) {
      this.fetchPointsLog().then(res => {
        $state.loaded()
        if (res.length < 20 || res.length === 0) {
          $state.complete()
        }
      })
    }
  }
}
</script>

<style>
</style>
