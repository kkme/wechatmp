<template>
  <div>
    <points-item v-for="n of list"
                 :key="n"></points-item>
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
      scoreLog: 'users/scoreLog'
    })
  },
  methods: {
    ...mapActions({
      fetchScoreLog: 'users/fetchScoreLog'
    }),
    getMoreData($state) {
      setTimeout(() => {
        const temp = []
        for (let i = this.list.length + 1; i <= this.list.length + 2; i++) {
          temp.push(i)
        }
        this.list = this.list.concat(temp)
        $state.loaded()
      }, 1000)
    }
  },
  mounted() {
    this.fetchScoreLog()
  }
}
</script>

<style>
</style>
