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
           to="/job"
           flat
           value="parttime">
      <span>兼职</span>
      <simple-svg :filepath="require(`~/static/svg/job.svg`)" />
    </v-btn>
    <v-btn nuxt
           to="/team"
           flat
           value="team">
      <span>战队</span>
      <simple-svg :filepath="require(`~/static/svg/team.svg`)" />
    </v-btn>
    <v-btn nuxt
           to="/ranking"
           flat
           value="ranking">
      <span>排行榜</span>
      <simple-svg :filepath="require(`~/static/svg/ranking.svg`)" />
    </v-btn>
    <v-btn nuxt
           to="/message"
           flat
           value="message">
      <span>消息</span>
      <simple-svg :filepath="require(`~/static/svg/message.svg`)" />
    </v-btn>

    <v-btn nuxt
           to="/user"
           flat
           value="center">
      <span>我的</span>
      <simple-svg :filepath="require(`~/static/svg/center.svg`)" />
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: 'center'
    }
  }
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
