<template>
  <div class="white message-mission">
    <v-layout row
              wrap>
      <icon class="svg-sm" /> 消息
    </v-layout>
  </div>
</template>

<script>
import Icon from '@svg/message_dot.svg'
export default {
  components: {
    Icon
  },
  head: () => ({
    title: '消息中心'
  }),
  meta: {
    title: '消息中心'
  },
  deta: () => ({
    icon: Icon,
    items: [
      {
        title: '签到任务被驳回',
        date: '2018-09-08 08:00',
        msg:
          '寻找、分享自己家族的英雄故事（不同年代的报国家书老物件、报国故事等），将相关照片、视频、文字，发送至人民日报征集邮箱yingxiong@pdnews.cn，以及各平台征集邮箱。'
      }
    ]
  })
}
</script>

<style lang="scss">
.message-mission {
  min-height: inherit;
}
</style>
