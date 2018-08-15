<template>
  <div class="job-recommend white">
    <base-divider></base-divider>
    <v-layout class="job-recommend-match px-3 py-2 border-bottom">
      <span class="subheading">任务匹配设置</span>
      <v-spacer></v-spacer>
      <div class="px-3">2018-08-08 - 2018-05-08</div>
      <svg-right class="svg-sm"></svg-right>
    </v-layout>
    <v-tabs v-model="active"
            light
            hide-slider>
      <v-tab ripple
             v-for="n of 10"
             :key="n">
        <div class="px-2 mr-1 py-1 grey darken-3 white--text job-recommend-tab-btn">08.0{{n}}</div>
      </v-tab>
      <v-tab-item class="grey lighten-3"
                  v-for="n of 10"
                  :key="n">
        asdsadsadsadsadsa
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  head: () => ({
    title: '组合推荐'
  }),
  meta: {
    title: '组合推荐'
  },
  data: () => ({
    active: null
  })
}
</script>

<style lang="scss">
.job-recommend {
  .job-recommend-tab-btn {
    border-radius: 1rem;
  }
}
</style>
