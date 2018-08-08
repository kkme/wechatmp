<template>
  <div class="white">
    <points-item v-for="item in scoreLog"
                 :key="item.id"
                 :items="item"></points-item>
    <base-infinite @infinite="getMoreData"></base-infinite>
  </div>
</template>

<script>
import PointsItem from '@/components/PointsItem'
import { mapGetters, mapActions } from 'vuex'
import { page } from '@mixins'
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
  mixins: [page],
  computed: {
    ...mapGetters({
      scoreLog: 'users/groupedScoreLog'
    })
  },
  methods: {
    ...mapActions({
      fetchScoreLog: 'users/fetchScoreLog'
    }),
    getMoreData($infinite) {
      this.getPage(this.page)
      this.fetchScoreLog(this.page).then(res => {
        $infinite.loaded()
        if (res.length < this.page.pagesize || res.length === 0) {
          $infinite.complete()
        }
      })
    }
  }
}
</script>
