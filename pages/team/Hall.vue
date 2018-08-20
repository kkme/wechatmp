<template>
  <v-tabs v-model="active"
          color="white"
          fixed-tabs
          slider-color="primary">
    <v-tab ripple>正在招募</v-tab>
    <v-tab ripple>已报名</v-tab>
    <v-tab ripple>已完成</v-tab>
    <v-tab-item class="team-mission-item">
      <job-item :items="missions"
                :team="true"
                v-if="missions">
        <team-append-job-item disableAvatar
                              slot-scope="{item}"
                              :item="item"
                              @click="claimMission(item.recruitmentId)"
                              disableCount>
          <span v-if="item.applyNumber > 0">已报名{{item.applyNumber}}人</span>
          <v-btn color="primary ma-0"
                 small
                 @click="onApplyMission(item.taskId)">领取任务</v-btn>
        </team-append-job-item>
        <base-divider></base-divider>
      </job-item>
      <base-infinite v-if="active === 0"
                     @infinite="getMoreRecruitingMissions"></base-infinite>
    </v-tab-item>
    <v-tab-item class="team-mission-item">
      <job-item :items="claimedMissions"
                v-if="claimedMissions"
                :team="true">
        <team-append-job-item disableCount
                              slot-scope="{item}"
                              no-action
                              :item="item">
          <span>{{item.teamDelivStatus}}</span>
          <v-btn color="primary ma-0"
                 small
                 @click="onQuitMission(item.taskId)">领取任务</v-btn>
        </team-append-job-item>
        <base-divider></base-divider>
      </job-item>
      <base-infinite v-if="active === 1"
                     @infinite="getMoreAppliedMissions"></base-infinite>
    </v-tab-item>
    <v-tab-item class="team-mission-item">
      <job-item :items="appliedMissions"
                v-if="appliedMissions"
                :team="true">

        <team-append-job-item disableCount
                              no-action
                              slot-scope="{item}"
                              :item="item">
          <span>{{item.teamDelivStatus}}</span>
        </team-append-job-item>
        <base-divider></base-divider>
      </job-item>
      <base-infinite v-if="active === 2"
                     @infinite="getMoreFinishedMissions"></base-infinite>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import JobFilter from '@/components/JobFilter'
import JobItem from '@/components/JobItem'
import TeamAppendJobItem from '@/components/TeamAppendJobItem'
import { mapGetters, mapActions } from 'vuex'
import { page } from '@mixins'
import JobApplyDialog from '@/components/JobApplyDialog'
export default {
  components: {
    JobFilter,
    JobItem,
    TeamAppendJobItem,
    JobApplyDialog
  },
  head: () => ({
    title: '任务大厅'
  }),
  meta: {
    title: '任务大厅'
  },
  mixins: [page],
  data: () => ({
    active: 0
  }),
  computed: {
    ...mapGetters({
      missions: 'team/missionsForOwner',
      claimedMissions: 'team/claimedMissionsForOwner',
      appliedMissions: 'team/appliedMissionsForOwner'
    })
  },
  methods: {
    ...mapActions({
      fetchRecruitingMission: 'team/fetchRecruitingMission',
      fetchAppliedMission: 'team/fetchAppliedMission',
      fetchFinishedMission: 'team/fetchFinishedMission',
      applyMission: 'team/applyMission',
      quitMission: 'team/quitMission'
    }),
    getMoreRecruitingMissions($infinite) {
      this.infiniteLoading($infinite, this.fetchRecruitingMission, 'recruitingMissionPage')
    },
    getMoreAppliedMissions($infinite) {
      this.infiniteLoading($infinite, this.fetchAppliedMission, 'appliedMissionPage')
    },
    getMoreFinishedMissions($infinite) {
      this.infiniteLoading($infinite, this.fetchFinishedMission, 'finishedMissionPage')
    },
    onApplyMission(id) {
      this.applyMission({ id })
    },
    onQuitMission(id) {
      this.quitMission({ id })
    }
  }
}
</script>
