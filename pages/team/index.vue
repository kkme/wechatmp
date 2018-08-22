<template>
  <div class="team-index white"
       v-if="showConent">
    <div class="team-search"
         v-if="!isTeamMenmber">
      <div class="white lighten-2 py-2">
        <v-text-field placeholder="请输入ID或者战队名称"
                      solo
                      prepend-inner-icon="iconfont icon-search"
                      clearable
                      flat
                      hide-details
                      v-model="keyword"
                      :loading="searching"
                      @keyup.enter="onSearch"
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
                  v-for="team of searchResult"
                  :key="team.teamId">
          <div class="avatar mx-3 flex-auto">
            <base-avatar :src="team.avatar"></base-avatar>
          </div>
          <v-flex class="px-3">
            <div class="body-2">{{team.teamName}}</div>
            <div class="caption">
              <span>人数:{{team.peopleNum}}</span>
              <span>等级:{{team.level}} |</span>
              <span>信誉:{{team.reputation}}</span>
            </div>
          </v-flex>
          <v-btn class="pa-0 ma-0"
                 small
                 flat
                 @click="onApplyTeam(team)"
                 :loading="team.loading"
                 :style="{ backgroundImage: `url(${btnBg})`}"></v-btn>
        </v-layout>
        <base-infinite @infinite="infinite($event, search, { keyword })"></base-infinite>
      </div>
    </div>
    <div class="team-my-team"
         v-else>
      <div class="team-my-team-info text-xs-center py-4 h-100 text--white">
        <v-layout align-center
                  dark>
          <div class="avatar-lg mx-3 flex-auto">
            <base-avatar :src="myTeam.avatar"></base-avatar>
          </div>
          <v-flex class="text-xs-left pr-3">
            <div class="subheading">{{myTeam.name}}</div>
            <div class="pt-2 caption">
              <span class="mr-3">队长: {{myTeam.mangerusername}}</span>
            </div>
          </v-flex>
          <v-flex>
            {{myTeam.postion | valueToLabel(teamRoles)}}
          </v-flex>
        </v-layout>
        <v-layout class="py-4 mb-5">
          <v-flex xs3>
            <span class="title">{{myTeam.peoplenum}}</span><br>人数
          </v-flex>
          <v-flex xs3>
            <span class="title">{{myTeam.level}}</span><br>等级
          </v-flex>
          <v-flex xs3>
            <span class="title">{{myTeam.reputation}}</span><br>信誉
          </v-flex>
          <v-flex xs3>
            <span class="title">{{myTeam.integra}}</span><br>积分
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
                      @click="$router.push('/team/hall')">
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
          <template v-if="role === 'owner'">
            <v-list-tile nuxt
                         to="/team/hr">
              <v-list-tile-avatar>
                <svg-hr class="svg-sm" />
              </v-list-tile-avatar>
              <v-list-tile-content class="pl-2">
                <v-list-tile-title>成员管理</v-list-tile-title>
              </v-list-tile-content>
              <svg-right class="svg-sm" />
            </v-list-tile>
            <div class="px-3">
              <v-divider/>
            </div>
          </template>
          <template v-if="role !== 'member'">
            <v-list-tile nuxt
                         to="/team/setting">
              <v-list-tile-avatar>
                <svg-setting class="svg-sm" />
              </v-list-tile-avatar>
              <v-list-tile-content class="pl-2">
                <v-list-tile-title>设置</v-list-tile-title>
              </v-list-tile-content>
              <svg-right class="svg-sm" />
            </v-list-tile>
            <div class="px-3">
              <v-divider/>
            </div>
          </template>
          <template v-if="role !== 'member'">
            <v-list-tile nuxt
                         to="/team/mission">
              <v-list-tile-avatar>
                <svg-mission-manage class="svg-sm" />
              </v-list-tile-avatar>
              <v-list-tile-content class="pl-2">
                <v-list-tile-title>任务管理</v-list-tile-title>
              </v-list-tile-content>
              <svg-right class="svg-sm" />
            </v-list-tile>
            <div class="px-3">
              <v-divider/>
            </div>
          </template>
          <v-list-tile class="team-notice">
            <v-list-tile-avatar>
              <svg-notice class="svg-sm" />
            </v-list-tile-avatar>
            <v-list-tile-content class="pl-2">
              <v-list-tile-title>公告</v-list-tile-title>
              <div class="py-2">
                {{myTeam.slogan || '没有设置公告'}}
              </div>
            </v-list-tile-content>
          </v-list-tile>
          <div class="px-3">
            <v-divider/>
          </div>
          <template v-if="role === 'owner'">
            <v-list-tile @click="$refs.searchDialog.active()">
              <v-list-tile-avatar>
                <svg-hr class="svg-sm" />
              </v-list-tile-avatar>
              <v-list-tile-content class="pl-2">
                <v-list-tile-title>邀请成员</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <div class="px-3">
              <v-divider/>
            </div>
          </template>
          <template v-if="role !== 'owner'">
            <v-list-tile @click="dialog = true">
              <v-list-tile-avatar>
                <svg-sign-out class="svg-sm" />
              </v-list-tile-avatar>
              <v-list-tile-content class="pl-2">
                <v-list-tile-title>退出战队</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <div class="px-3">
              <v-divider/>
            </div>
          </template>
        </v-list>
      </div>
    </div>
    <team-invite-dialog @search="onInvite"
                        ref="searchDialog"></team-invite-dialog>
    <v-dialog v-model="dialog"
              max-width="500">
      <v-card>
        <v-card-title class="headline">温馨提示</v-card-title>
        <v-card-text>
          确定要退出战队吗？
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary darken-1"
                 flat="flat"
                 @click="dialog = false">
            取消
          </v-btn>

          <v-btn color="error darken-1"
                 flat="flat"
                 :loading="quiting"
                 @click="onQuit">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import btnBg from '@img/team_btn.png'
import TeamInviteDialog from '@/components/TeamInviteDialog'
import { mapActions, mapGetters } from 'vuex'
import { teamRoles, teamStatuses } from '@const'
import { valueToLabel } from '@helper'
import { page } from '@mixins'
export default {
  components: {
    TeamInviteDialog
  },
  head: () => ({
    title: '战队'
  }),
  meta: {
    title: '战队'
  },
  mixins: [page],
  data: () => ({
    btnBg,
    showConent: false,
    teamRoles,
    keyword: '',
    searching: false,
    dialog: false,
    quiting: false
  }),
  computed: {
    ...mapGetters({
      myTeam: 'team/myTeam',
      searchResult: 'team/searchResult'
    }),
    isTeamMenmber() {
      return !!this.myTeam
    },
    role() {
      return valueToLabel(this.myTeam.postion, teamRoles, 'name')
    },
    teamStatus() {
      if (!this.myTeam) return ''
      return valueToLabel(this.myTeam.teamstatus, teamStatuses, 'name')
    }
  },
  methods: {
    ...mapActions({
      fetchMyTeamInfo: 'team/fetchMyTeamInfo',
      search: 'team/search',
      applyTeam: 'team/applyTeam',
      quitTeam: 'team/quitTeam',
      inviteUser: 'team/inviteUser'
      // dissolveTeam: 'team/dissolveTeam'
    }),
    onSearch() {
      this.searching = true
      this.search({ keyword: this.keyword, reset: true }).then(res => {
        this.searching = false
      })
    },
    onQuit() {
      this.quiting = true
      this.quitTeam()
        .then(res => {
          this.dialog = false
          return this.fetchMyTeamInfo()
        })
        .then(() => {
          this.quiting = false
        })
    },
    onApplyTeam(item) {
      this.$set(item, 'loading', true)
      this.applying = true
      this.applyTeam({ id: item.teamId })
        .then(() => {
          this.$set(item, 'loading', false)
          return this.fetchMyTeamInfo()
        })
        .catch(error => {
          this.applying = false
          console.log(error)
        })
    },
    onInvite(user) {
      // console.log(user)
      if (!user) return
      let id = user.userId
      this.inviteUser({ id })
    }
  },
  created() {
    this.fetchMyTeamInfo().then(res => {
      if (this.teamStatus === 'confirm') {
        this.$router.replace('/team/create')
      }
      this.showConent = true
    })
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
        .team-notice .v-list__tile {
            height: auto;
            .v-list__tile__content {
                justify-content: flex-start;
            }
        }
    }
}
</style>
