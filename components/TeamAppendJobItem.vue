<template>
  <div class="team-append-job-item white"
       v-if="item">
    <v-layout align-center
              class="px-3 py-2">
      <div class="text-muted">
        <div>{{item.teamMinNumber}} - {{item.teamMaxNumber}}人战队</div>
        <div class="caption">截止：{{item.endTime}}</div>
      </div>
      <v-spacer />
      <span class="pr-3"
            v-if="disableCount === false">已报名32人</span>
      <slot>
        <v-btn color="primary ma-0"
               @click="$emit('click')">领取任务</v-btn>
      </slot>
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
    item: Object,
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
