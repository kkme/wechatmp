<template>
  <div class="white message-mission">
    <msg-item v-for="n of 10"
              :key="n"
              class="message-item"
              :class="{active: n%2 === 0}"></msg-item>
  </div>
</template>

<script>
import MsgItem from '@/components/MessageItem'
export default {
  components: {
    MsgItem
  },
  head: () => ({
    title: '消息中心'
  }),
  meta: {
    title: '消息中心'
  },
  deta: () => ({})
}
</script>
