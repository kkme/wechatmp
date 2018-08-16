<template>
  <div class="job-reward">
    <v-tabs v-model="active"
            light
            :grow="true"
            slider-color="primary">
      <v-tab ripple>积分</v-tab>
      <v-tab ripple>经验</v-tab>
      <v-tab-item class="white">
        <v-layout align-center
                  v-if="pointsLog.length"
                  class="px-3 py-3 border-bottom"
                  v-for="item of pointsLog"
                  :key="item.id">
          <span class="subheading">421</span>
          <div class="px-3">
            <div>{{item.directions}}</div>
            <div class="text-muted caption">{{item.createtime}}</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn small
                 class="ma-0 px-3"
                 v-bind="{outline: item.isreceive}"
                 :color="!item.isreceive ? 'primary' : 'grey'"
                 :disabled="item.isreceive"
                 :loading="item.loading"
                 @click="onCollectPoiont(item)">领取</v-btn>
        </v-layout>
        <base-infinite @infinite="getMorePointsLog"
                       ref="pointsLog"
                       v-if="active === 0"></base-infinite>
      </v-tab-item>
      <v-tab-item class="white">
        <v-layout align-center
                  class="px-3 py-3 border-bottom"
                  v-for="item of expLog"
                  :key="item.id">
          <span class="subheading">{{item.number}}</span>
          <div class="px-3">
            <div>{{item.directions}}</div>
            <div class="text-muted caption"
                 v-if="!item.isreceive">{{item.createtime}}</div>
            <div class="text-muted caption"
                 v-else>领取时间：{{item.receivetime}}</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn v-bind="{outline: item.isreceive}"
                 :color="!item.isreceive ? 'primary' : 'grey'"
                 small
                 class="ma-0 px-3"
                 :loading="!!item.loading"
                 @click="onCollectExp(item)">领取</v-btn>
        </v-layout>
        <base-infinite @infinite="getMoreExpLog"
                       ref="expLog"
                       v-if="active === 1"></base-infinite>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { page } from '@mixins'
import { mapGetters, mapActions } from 'vuex'
export default {
  head: () => ({
    title: '领取奖励'
  }),
  meta: {
    title: '领取奖励'
  },
  mixins: [page],
  data: () => ({
    active: 1
  }),
  methods: {
    ...mapActions({
      fetchPointsLog: 'users/fetchPointsLog',
      collectPoints: 'users/collectPoints',
      fetchExpLog: 'users/fetchExpLog',
      collectExp: 'users/collectExp'
    }),
    getMorePointsLog($infinite) {
      this.infiniteLoading($infinite, this.fetchPointsLog, 'pointsLogPage', { flag: false }).then(res =>
        console.log(res)
      )
    },
    getMoreExpLog($infinite) {
      this.infiniteLoading($infinite, this.fetchExpLog, 'expLogPage').then(res => console.log(res))
    },
    onCollectPoiont(item) {
      this.$set(item, 'loading', true)
      this.collectPoints({ id: item.id })
        .then(res => {
          this.$set(item, 'isreceive', true)
          this.$set(item, 'loading', false)
        })
        .catch(error => {
          this.$set(item, 'loading', false)
          console.log(error)
        })
    },
    onCollectExp(item) {
      this.$set(item, 'loading', true)
      this.collectExp({ id: item.id })
        .then(res => {
          this.$set(item, 'isreceive', true)
          this.$set(item, 'loading', false)
        })
        .catch(error => {
          this.$set(item, 'loading', false)
          console.log(error)
        })
    }
  },
  computed: {
    ...mapGetters({
      pointsLog: 'users/pointsLog',
      expLog: 'users/expLog'
    })
  }
}
</script>

<style lang="scss">
.job-reward {
  button {
    min-width: unset;
  }
}
</style>
