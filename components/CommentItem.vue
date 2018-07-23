<template>
  <div class="white">
    <base-divider></base-divider>
    <v-layout class="px-3 pt-2"
              column>
      <v-layout align-center>
        <v-flex class="subheading text-truncate pr-3">四川淘淘信息技术有限公司</v-flex>
        <comment-stars stars="3"></comment-stars>
      </v-layout>
      <v-flex class="caption text-muted mt-1">
        <v-icon class="iconfont icon-time icon--text"></v-icon>评价时间：2015-05-08 05:02
      </v-flex>
      <v-flex>
        <base-tag :outline="false"
                  height="24px">非常满意</base-tag>
        <base-tag :outline="false"
                  height="24px"
                  color="grey lighten-2">拖欠工资</base-tag>
      </v-flex>
      <v-divider class="mt-3"></v-divider>
    </v-layout>
    <p class="pa-3 body-2 mb-0">今天早晨收到一条消息，是一个昨天主动加我微信好友的人发来的，消息的内容是什么紧急诚聘，又说什么原本入职是需要收费的，之后呢我就按照她提供给我的那些条件拆穿她们的套路，防止大家继续上当。</p>
  </div>
</template>

<script>
import CommentStars from '@/components/CommentStars'
export default {
  components: {
    CommentStars
  }
}
</script>

<style>
</style>
