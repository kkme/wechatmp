<template>
  <div class="ranking">
    <v-tabs v-model="active"
            grow
            slider-color="primary"
            class="ranking-tabs">
      <v-tab ripple
             :class="{'primary--text': active === 0}">战队</v-tab>
      <v-tab ripple
             :class="{'primary--text': active === 1}">个人</v-tab>
      <v-tab-item>
        <v-layout align-center
                  justify-center
                  class="primary white--text mt-1 px-4 py-3">
          <v-flex v-if="false">
            <div class="subheading">战队排行榜</div>
            <div>您还未参见战队</div>
          </v-flex>
          <v-flex class="white--text">
            <div class="subheading">林蛋大和楚中天战队</div>
            <v-layout class="text-xs-center mt-2">
              <div>
                <div class="subheading">No. 1254</div>
                <div>等级</div>
              </div>
              <div class="ml-4">
                <div class="subheading">No. 1254</div>
                <div>单量</div>
              </div>
              <div class="ml-4">
                <div class="subheading">No. 1254</div>
                <div>人数</div>
              </div>
            </v-layout>
          </v-flex>
          <div class="avatar-xl">
            <img src="@img/trophy.png">
          </div>
        </v-layout>
        <div>
          <v-tabs v-model="activeTeamSub"
                  grow
                  color="primary darken-1"
                  slider-color="transparent"
                  class="ranking-tabs-sub">
            <v-tab ripple
                   class="white--text">单量</v-tab>
            <v-tab ripple
                   class="white--text">等级</v-tab>
            <v-tab ripple
                   class="white--text">人数</v-tab>
            <v-tab-item>单量</v-tab-item>
            <v-tab-item>等级</v-tab-item>
            <v-tab-item>人数</v-tab-item>
          </v-tabs>
        </div>
      </v-tab-item>
      <v-tab-item>
        <v-layout align-center
                  justify-center
                  class="primary white--text mt-1 px-4 py-3">
          <v-flex class="white--text">
            <div class="subheading">林蛋大</div>
            <v-layout class="text-xs-center mt-2">
              <div>
                <div class="subheading">No. 1254</div>
                <div>等级</div>
              </div>
              <div class="ml-4">
                <div class="subheading">No. 1254</div>
                <div>单量</div>
              </div>
            </v-layout>
          </v-flex>
          <div class="avatar-xl">
            <img src="@img/trophy.png">
          </div>
        </v-layout>
        <div>
          <v-tabs v-model="activeSub"
                  grow
                  color="primary darken-1"
                  slider-color="transparent"
                  class="ranking-tabs-sub">
            <v-tab ripple
                   class="white--text">单量</v-tab>
            <v-tab ripple
                   class="white--text">等级</v-tab>
            <v-tab-item>单量</v-tab-item>
            <v-tab-item>等级</v-tab-item>
          </v-tabs>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  head: () => ({
    title: '排行榜'
  }),
  meta: {
    title: '排行榜'
  },
  data: () => ({
    active: 1,
    activeTeamSub: 1,
    activeSub: 1
  })
}
</script>

<style lang="scss">
.ranking {
  .avatar-xl {
    position: relative;
    z-index: 1;
    img {
      border-radius: 0;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: $white;
      border-radius: 50%;
      transform: scale(0.8);
    }
  }
  .ranking-tabs {
    .v-tabs__slider {
      transform: scaleX(0.3);
    }
    .ranking-tabs-sub {
      .v-tabs__slider {
        transform: scaleX(1);
        position: relative;
        height: 0;
        &::after {
          position: absolute;
          display: inline-block;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 0;
          content: '';
          margin-left: -0.4em;
          border-top: 0;
          border-right: 0.4em solid transparent;
          border-bottom: 0.4em solid $white;
          border-left: 0.4em solid transparent;
        }
      }
    }
  }
}
</style>
