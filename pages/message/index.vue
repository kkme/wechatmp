<template>
  <v-layout row
            class="message-index">
    <v-flex xs12>
      <v-card class="h-100">
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile :key="item.index"
                         nuxt
                         :to="item.href">
              <v-list-tile-avatar>
                <component :is="item.icon"
                           class="svg-sm" />
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>

              <span class="caption text-muted">共
                <span class="primary--text body-2">23</span>条动态</span>
              <v-list-tile-action>
                <svg-right class="svg-sm" />
              </v-list-tile-action>
            </v-list-tile>
            <v-divider inset
                       :key="item.title"
                       v-if="index !== items.length - 1"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  head: () => ({
    title: '消息中心'
  }),
  meta: {
    title: '消息中心'
  },
  data() {
    return {
      items: [
        {
          icon: 'SvgNoticeMission',
          title: '任务通知',
          href: '/message/mission'
        },
        { icon: 'SvgNoticeApply', title: '申请确认', href: '/message/apply' },
        { icon: 'SvgNoticeTeam', title: '战队消息', href: '/message/team' },
        { icon: 'SvgNoticeSys', title: '系统消息', href: '/message/sys' },
        { icon: 'SvgNoticeCharge', title: '投诉反馈', href: '/message/charge' }
      ]
    }
  }
}
</script>

<style lang="scss">
.message-index {
  .v-list__tile__action {
    min-width: 2em;
  }
}
</style>
