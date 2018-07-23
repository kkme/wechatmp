<template>
  <!-- <v-layout class="bottom-nav text-xs-center">
    <v-flex>1</v-flex>
    <v-flex>1</v-flex>
    <v-flex>1</v-flex>
    <v-flex>1</v-flex>
    <v-flex>1</v-flex>
  </v-layout> -->
  <v-bottom-nav :active.sync="bottomNav"
                :value="true"
                fixed
                app
                color="white"
                class="bottom-nav">
    <v-btn nuxt
           :to="link.href"
           flat
           v-for="(link, index) in links"
           :key="index"
           :value="link.label">
      <span v-text="link.title"></span>
      <simple-svg :filepath="link.icon" />
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  data: () => ({
    bottomNav: 'user',
    links: [
      {
        title: '兼职',
        href: '/job',
        label: 'job',
        icon: require('@svg/job.svg')
      },
      {
        title: '战队',
        label: 'team',
        href: '/team',
        icon: require('@svg/team.svg')
      },
      {
        title: '排行榜',
        label: 'ranking',
        href: '/ranking',
        icon: require('@svg/ranking.svg')
      },
      {
        title: '消息',
        label: 'message',
        href: '/message',
        icon: require('@svg/message.svg')
      },
      {
        title: '我的',
        label: 'user',
        href: '/user',
        icon: require('@svg/center.svg')
      }
    ]
  })
}
</script>

<style lang="scss">
.bottom-nav {
  .v-btn {
    opacity: 0.75;
    min-width: inherit;
  }
  .v-btn--active {
    opacity: 1;
    svg path.st0 {
      fill: #8bc271;
    }
  }
  .simple-svg-wrapper {
    width: 24px;
    height: 24px;
    path.st0 {
      fill: transparent;
    }

    path:not(.st0) {
      fill: #292828;
    }
  }
}
</style>
