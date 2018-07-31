<template>
  <div class="team white">
    <div class="team--search">
      <div class="white lighten-2 py-2">
        <v-text-field placeholder="请输入ID或者战队名称"
                      solo
                      prepend-inner-icon="iconfont icon-search"
                      clearable
                      flat
                      hide-details
                      class="mx-3"></v-text-field>
      </div>
      <div class="pb-5 team--index-banner secondary">
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
    btnBg
  })
}
</script>

<style lang="scss">
.team {
  .team--search {
    .v-text-field--solo .v-input__slot {
      background: lighten($secondary, 5%);
    }
  }
  .team--index-banner {
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
}
</style>
