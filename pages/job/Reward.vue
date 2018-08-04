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
                  class="px-3 py-3 border-bottom"
                  v-for="n of 10"
                  :key="n">
          <span class="subheading">421</span>
          <div class="px-3">
            <div>每日登录</div>
            <div class="text-muted caption">2018-08-08</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn v-bind="{outline: n%2===0}"
                 :color="n%2 !== 0 ? 'primary' : 'grey'"
                 small
                 class="ma-0 px-3">领取</v-btn>
        </v-layout>
      </v-tab-item>
      <v-tab-item class="white">
        <v-layout align-center
                  class="px-3 py-3 border-bottom"
                  v-for="n of 10"
                  :key="n">
          <span class="subheading">421</span>
          <div class="px-3">
            <div>每日登录</div>
            <div class="text-muted caption">2018-08-08</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn v-bind="{outline: n%2===0}"
                 :color="n%2 !== 0 ? 'primary' : 'grey'"
                 small
                 class="ma-0 px-3">领取</v-btn>
        </v-layout>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Stars from '@/components/Stars'
export default {
  components: {
    Stars
  },
  head: () => ({
    title: '领取奖励'
  }),
  meta: {
    title: '领取奖励'
  },
  data: () => ({
    active: null
  })
}
</script>

<style lang="scss">
.job-reward {
  button {
    min-width: unset;
  }
}
</style>
