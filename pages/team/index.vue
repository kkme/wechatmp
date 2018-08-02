<template>
  <div class="team-index white">
    <div class="team-search"
         v-if="!isTeamMenmber">
      <div class="white lighten-2 py-2">
        <v-text-field placeholder="请输入ID或者战队名称"
                      solo
                      prepend-inner-icon="iconfont icon-search"
                      clearable
                      flat
                      hide-details
                      class="mx-3"></v-text-field>
      </div>
      <div class="pb-5 team-index-banner secondary">
        <img src="@img/team_banner.jpg"
             class="w-100">
        <v-layout class="team--index-banner-action w-100 py-2 justify-center">
          <v-card class="team--create align-center justify-center white mx-3 py-2 px-3"
                  to="/team/create"
                  nuxt>
            <span class="px-2"><img src="@img/team_create.png"
                   class="flex-0"></span> 创建战队
          </v-card>
          <v-card class="team--invitation align-center justify-center white mx-3 py-2 px-3"
                  to="/team/invitation"
                  nuxt>
            <span class="px-2"><img src="@img/team_invitation.png"
                   class="flex-0"></span>战队邀请
          </v-card>
        </v-layout>
      </div>
      <div class="team--index-team-list px-3">
        <v-layout class="align-center py-3 border-bottom"
                  v-for="n of 10"
                  :key="n">
          <img src="@img/avatar.jpg"
               class="avatar">
          <v-flex class="px-3">
            <div class="body-2">一起去吃屎吧,楚中天一起去吃屎吧,楚中天</div>
            <div class="caption">
              <span>人数:1223 |</span>
              <span>等级:1223 |</span>
              <span>信誉:4.99</span>
            </div>
          </v-flex>
          <v-btn class="pa-0 ma-0"
                 small
                 flat
                 :style="{ backgroundImage: `url(${btnBg})`}"></v-btn>
        </v-layout>
      </div>
    </div>
    <div class="team-my-team"
         v-else>
      <div class="team-my-team-info text-xs-center py-4 h-100 text--white">
        <v-layout align-center
                  dark>
          <div class="avatar-lg mx-3">
            <img src="@img/avatar.jpg">
          </div>
          <v-flex class="text-xs-left pr-3">
            <div class="subheading">林蛋大和楚中天的故事</div>
            <div class="pt-2 caption">
              <span class="mr-3">队长: 林蛋大</span>
              <span>副队长：楚中天</span>
            </div>
          </v-flex>
        </v-layout>
        <v-layout class="py-4 mb-5">
          <v-flex xs3>
            <span class="title">35</span><br>人数
          </v-flex>
          <v-flex xs3>
            <span class="title">35</span><br>等级
          </v-flex>
          <v-flex xs3>
            <span class="title">35</span><br>信誉
          </v-flex>
          <v-flex xs3>
            <span class="title">35</span><br>积分
          </v-flex>
        </v-layout>
      </div>
      <div class="team-my-team-content white pt-3 pb-5 elevation-1">
        <v-layout class="px-3"
                  justify-center>
          <v-flex>
            <v-layout align-center
                      justify-center
                      class="py-3"
                      @click="$router.push('/team/mymission')">
              <svg-team-lobby class="svg"></svg-team-lobby>
              <span class="px-3">任务大厅</span>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-layout align-center
                      justify-center
                      class="py-3"
                      @click="$router.push('/team/member')">
              <svg-team-member class="svg"></svg-team-member>
              <span class="px-3">战队成员</span>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-list dense
                flat
                class="py-3">
          <template v-for="(item, index) in items">
            <v-list-tile nuxt
                         :key="index.title"
                         :to="item.href">
              <v-list-tile-avatar>
                <component :is="item.icon"
                           class="svg-sm" />
              </v-list-tile-avatar>
              <v-list-tile-content class="pl-2">
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
              <svg-right class="svg-sm" />
            </v-list-tile>
            <div class="px-3"
                 v-if="index !== items.length - 1"
                 :key="index">
              <v-divider/>
            </div>
          </template>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import btnBg from '@img/team_btn.png'
export default {
  head: () => ({
    title: '战队'
  }),
  meta: {
    title: '战队'
  },
  data: () => ({
    btnBg,
    items: [
      { icon: 'svg-mission-manage', href: '/team/mission', title: '任务管理' },
      { icon: 'svg-hr', href: '/team/hr', title: '成员管理' },
      { icon: 'svg-notice', href: '/team/notice', title: '战队公告' },
      { icon: 'svg-sign-out', href: '/team/setting', title: '退出战队' },
      { icon: 'svg-setting', href: '/team/setting', title: '设置' }
    ]
  }),
  computed: {
    isTeamMenmber() {
      return true
    }
  }
}
</script>

<style lang="scss">
.team-index {
    position: relative;
    .team-search {
        .v-text-field--solo .v-input__slot {
            background: lighten($secondary, 5%);
        }
    }
    .team-index-banner {
        position: relative;
        .team--index-banner-action {
            position: absolute;
            bottom: 0;
            .team--create,
            .team--invitation {
                display: flex;
                border-radius: $border-radius * 2;
            }
        }
    }
    .team--index-team-list {
        .avatar {
            border-radius: 0.5em;
        }
        button {
            background-position: center;
            background-size: contain;
            min-width: 75px;
        }
    }
    .team-my-team {
        .team-my-team-info {
            position: fixed;
            top: $top-nav-height;
            left: 0;
            width: 100%;
            background-image: url('~@img/team_index_bg.jpg');
            background-repeat: no-repeat;
            background-position: top center;
            background-size: contain;
            color: $white;
        }
        .team-my-team-content {
            position: relative;
            z-index: 1;
            top: 187px;
            border-top-left-radius: 2em;
            border-top-right-radius: 2em;
            min-height: calc(100vh - 187px - #{$top-nav-height});
        }
    }
}
</style>
