<template>
  <v-tabs v-model="active"
          color="white"
          fixed-tabs
          slider-color="primary">
    <v-tab ripple>找任务</v-tab>
    <v-tab ripple>已领取</v-tab>
    <v-tab ripple>已申请</v-tab>
    <v-tab-item class="team-mission-item">
      <job-filter></job-filter>
      <base-divider></base-divider>
      <job-item :items="missions"
                :team="true"
                v-if="missions">
        <team-append-job-item disableAvatar
                              slot-scope="{item}"
                              :item="item"
                              @click="claimMission(item.recruitmentId)"
                              disableCount>
          <job-apply-dialog :jobDetail="item">
            <v-btn color="primary"
                   class="ma-0"
                   depressed
                   small
                   :disabled="!!item.teamDelivStatus">{{!!item.teamDelivStatus ? '已领取' : '领取任务'}}</v-btn>
          </job-apply-dialog>
        </team-append-job-item>
        <base-divider></base-divider>
      </job-item>
      <base-infinite v-if="active === 0"
                     @infinite="getMoreMission"></base-infinite>
    </v-tab-item>
    <v-tab-item class="team-mission-item">
      <job-item :items="claimedMissions"
                v-if="claimedMissions"
                :team="true">
        <team-append-job-item disableCount
                              slot-scope="{item}"
                              :item="item">
        </team-append-job-item>
        <base-divider></base-divider>
      </job-item>
      <base-infinite v-if="active === 1"
                     @infinite="getMoreClaimedMission"></base-infinite>
    </v-tab-item>
    <v-tab-item class="team-mission-item">
      <job-item :items="appliedMissions"
                v-if="appliedMissions"
                :team="true">

        <team-append-job-item disableCount
                              slot-scope="{item}"
                              :item="item"></team-append-job-item>
        <base-divider></base-divider>
      </job-item>
      <base-infinite v-if="active === 2"
                     @infinite="getMoreAppliedMission"></base-infinite>
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
    title: '战队任务'
  }),
  meta: {
    title: '战队任务'
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
      fetchMisiionByOwner: 'team/fetchMisiionByOwner',
      fetchClaimedMissionByOwner: 'team/fetchClaimedMissionByOwner',
      fetchAppliedMissionByOwner: 'team/fetchAppliedMissionByOwner'
    }),
    getMoreMission($infinite) {
      this.infiniteLoading($infinite, this.fetchMisiionByOwner, 'missionPage')
    },
    getMoreClaimedMission($infinite) {
      this.infiniteLoading($infinite, this.fetchClaimedMissionByOwner, 'claimedMissionPage')
    },
    getMoreAppliedMission($infinite) {
      this.infiniteLoading($infinite, this.fetchAppliedMissionByOwner, 'appliedMissionPage')
    },
    claimMission(id) {
      console.log(id)
    }
  }
}
</script>

<style lang="scss">
.job-filter {
  position: sticky;
  top: 0;
  z-index: 1;
}
.team-mission-item {
  min-height: calc(100vh - #{$top-nav-height * 2});
}
</style>
