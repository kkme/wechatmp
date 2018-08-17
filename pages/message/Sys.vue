<template>
  <div class="white py-2 min-h-100">
    <msg-item v-for="msg of msgs"
              :key="msg.id"
              class="message-item active"
              :item="msg"></msg-item>
    <base-infinite @infinite="infinite($event, fetchMsgs, {msgType: 'system'})"></base-infinite>
  </div>
</template>

<script>
import MsgItem from '@/components/MessageItem'
import { page } from '@mixins'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    MsgItem
  },
  head: () => ({
    title: '消息中心'
  }),
  mixins: [page],
  meta: {
    title: '消息中心'
  },
  data: () => ({}),
  methods: {
    ...mapActions({
      fetchMsgs: 'message/fetchMsgs'
    })
  },
  computed: {
    ...mapGetters({
      msgs: 'message/systemMsgs'
    })
  }
}
</script>
