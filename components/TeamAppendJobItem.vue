<template>
  <div class="team-append-job-item white">
    <v-layout align-center
              class="px-3 py-2">
      <div class="text-muted">
        <div>5-10人战队</div>
        <div class="caption">截止：2018-08-08 08:05</div>
      </div>
      <v-spacer />
      <span class="pr-3"
            v-if="disableCount === false">已报名32人</span>
      <v-btn color="primary ma-0">领取任务</v-btn>
    </v-layout>
    <v-divider></v-divider>
    <v-layout v-if="disableAvatar === false"
              align-center
              class="grey lighten-4 py-2 px-3">
      <div class="avatar-sm mr-2"
           v-for="n of 5"
           :key="n">
        <img src="@img/avatar.jpg">
      </div>
      <v-spacer></v-spacer>
      <span>已报名32人</span>
      <v-icon>iconfont icon-right</v-icon>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    disableAvatar: {
      type: [String, Boolean],
      default: false
    },
    disableCount: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>

<style>
</style>
