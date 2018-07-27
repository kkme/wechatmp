<template>
  <div class="white">
    <points-item v-for="item in scoreLog"
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
    title: '我的信誉'
  }),
  meta: {
    title: '我的信誉'
  },
  data: () => ({
    list: []
  }),
  computed: {
    ...mapGetters({
      scoreLog: 'users/groupedScoreLog'
    })
  },
  methods: {
    ...mapActions({
      fetchScoreLog: 'users/fetchScoreLog'
    }),
    getMoreData($state) {
      this.fetchScoreLog().then(res => {
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
