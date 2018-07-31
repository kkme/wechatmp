<template>
  <v-card>
    <base-divider></base-divider>
    <v-layout row
              wrap
              class="pa-3">

      <svg-message-dot class="svg-sm" />
      <span class="subheading">签到任务被驳回</span>
      <v-flex xs12
              class="py-1">2018-7-31 09:32:33</v-flex>
      <v-flex xs12
              text-muted>
        消息内容消息内容消息内容消息内容 消息内容消息内容消息内容消息内容 消息内容消息内容消息内容消息内容 消息内容消息内容消息内容消息内容 消息内容消息内容消息内容消息内容 消息内容消息内容消息内容消息内容
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="scss">
.message-item.active {
  svg circle {
    fill: #8bc271;
  }
}
</style>
