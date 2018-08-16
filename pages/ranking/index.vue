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
                  v-if="team"
                  class="primary white--text mt-1 px-4 py-3">
          <v-flex v-if="!team.name">
            <div class="subheading">战队排行榜</div>
            <div>您还未参见战队</div>
          </v-flex>
          <v-flex v-else
                  class="white--text">
            <div class="subheading">{{team.name}}</div>
            <v-layout class="text-xs-center mt-2">
              <div>
                <div class="subheading">No. {{teamSumary.level}}</div>
                <div>等级</div>
              </div>
              <div class="ml-4">
                <div class="subheading">No. {{teamSumary.mission}}</div>
                <div>单量</div>
              </div>
              <div class="ml-4">
                <div class="subheading">No. {{teamSumary.member}}</div>
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
            <v-tab-item>
              <ranking-item :items="teamMission"
                            unit="单"></ranking-item>
            </v-tab-item>
            <v-tab-item>
              <ranking-item :items="teamLevel"
                            unit="级"></ranking-item>
            </v-tab-item>
            <v-tab-item>
              <ranking-item :items="teamMember"
                            unit="人"></ranking-item>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-tab-item>
      <v-tab-item>
        <v-layout align-center
                  justify-center
                  class="primary white--text mt-1 px-4 py-3">
          <v-flex class="white--text">
            <div class="subheading">{{user.name}}</div>
            <v-layout class="text-xs-center mt-2">
              <div>
                <div class="subheading">No. {{userSumary.mission}}</div>
                <div>
                  单量
                </div>
              </div>
              <div class="ml-4">
                <div class="subheading">No. {{userSumary.level}}</div>
                <div>
                  等级
                </div>
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
            <v-tab-item>
              <ranking-item :items="userMission"
                            unit="单"></ranking-item>
            </v-tab-item>
            <v-tab-item>
              <ranking-item :items="userLevel"
                            unit="人"></ranking-item>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import RankingItem from '@/components/RankingItem'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    RankingItem
  },
  head: () => ({
    title: '排行榜'
  }),
  meta: {
    title: '排行榜'
  },
  data: () => ({
    active: 0,
    activeTeamSub: 0,
    activeSub: 0
  }),
  computed: {
    ...mapGetters({
      team: 'ranking/teamRanking',
      user: 'ranking/userRanking'
    }),
    teamSumary() {
      if (!this.team) return null
      let member = this.team.peopleRank || 0
      let level = this.team.levelRank || 0
      let mission = this.team.deliveryNumRank || 0
      return {
        member,
        level,
        mission
      }
    },
    teamMission() {
      if (!this.team) return null
      return this.team.deliveryRankList
    },
    teamMember() {
      if (!this.team) return null
      return this.team.peopleRankList
    },
    teamLevel() {
      if (!this.team) return null
      return this.team.levelRankList
    },
    userSumary() {
      if (!this.user) return null
      let level = this.user.levelRank || -1
      let mission = this.user.deliveryNumRank || -1
      return {
        level,
        mission
      }
    },
    userMission() {
      if (!this.user) return null
      return this.user.deliveryRankList
    },
    userLevel() {
      if (!this.user) return null
      return this.user.levelRankList
    }
  },
  methods: {
    ...mapActions({
      fetchTeamRanking: 'ranking/fetchTeamRanking',
      fetchUserRanking: 'ranking/fetchUserRanking'
    })
  },
  mounted() {
    this.fetchTeamRanking()
    this.fetchUserRanking()
  }
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
