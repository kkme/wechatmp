<template>
  <v-layout class="job-my-mission white min-h-100"
            column>
    <div>
      <v-layout class="py-3"
                align-center
                justify-center>
        <span class="px-2 title">{{currentMonth}}</span>

        <div>
          <base-date-picker type="month"
                            v-model="pickedMonth"
                            :max="today">
            <svg-calender class="svg-sm d-flex" />
          </base-date-picker>
        </div>
      </v-layout>
      <v-card class="mx-3 my-mission-summary">
        <v-layout row
                  align-center>
          <v-btn icon
                 flat
                 color="primary"
                 @click="prevMonth"
                 :loading="prevMonthLoading"
                 :disabled="disableBtn || nextMonthLoading">
            <v-icon>iconfont icon-left_circle</v-icon>
          </v-btn>
          <v-flex class="py-3">
            <v-layout class="text-xs-center">
              <v-flex>
                <div class="primary--text">{{countInfo.catched || 0}}</div>
                <div class="text-muted caption">领取任务</div>
              </v-flex>
              <v-flex>
                <div class="primary--text">{{countInfo.finish || 0}}</div>
                <div class="text-muted caption">完成任务</div>
              </v-flex>
              <v-flex>
                <div class="primary--text">{{countInfo.salary || 0}}</div>
                <div class="text-muted caption">收入</div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-btn icon
                 flat
                 color="primary"
                 @click="nextMonth"
                 :loading="nextMonthLoading"
                 :disabled="disableBtn || prevMonthLoading">
            <v-icon>iconfont icon-right_circle</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
      <v-divider class="mt-3"></v-divider>
      <v-list dense
              flat
              v-if="false">
        <v-list-tile>
          <svg-level-rank-medal class="svg-sm" />
          <v-list-tile-content class="px-2">
            <v-list-tile-title>等级排名</v-list-tile-title>
          </v-list-tile-content>
          <svg-right class="svg-sm" />
        </v-list-tile>
        <v-divider class="mx-3"></v-divider>
        <v-list-tile>
          <svg-mission-rank class="svg-sm" />
          <v-list-tile-content class="px-2">
            <v-list-tile-title>完成任务排名</v-list-tile-title>
          </v-list-tile-content>
          <svg-right class="svg-sm" />
        </v-list-tile>
      </v-list>
      <base-divider></base-divider>
    </div>
    <v-flex>
      <v-tabs v-model="active"
              grow
              slider-color="primary"
              class="my-mission-tabs sticky-to-top">
        <v-tab ripple>已领取</v-tab>
        <v-tab ripple>收到邀请</v-tab>
        <v-tab ripple>申请列表</v-tab>
        <v-tab ripple>已完成</v-tab>
        <v-tab-item>
          <my-mission-item :items="currentMonthMyMissions" />
          <base-infinite @infinite="getMoreMyMissions"
                         ref="myMissionsInfinite"
                         v-if="active === 0 && this.dateRange"></base-infinite>
        </v-tab-item>
        <v-tab-item>
          <my-mission-item :items="currentMonthInvitations">
            <template slot-scope="slotProps">
              <base-tag outline
                        color="accent"
                        height="20px"
                        class="my-0 ml-2">{{slotProps.item.deliveryType | valueToLabel(applyTypes,'label2')}}</base-tag>
              <v-spacer></v-spacer>
              <span class="caption text-muted"></span>
              <div @click.stop.prevent="stopPop">
                <v-menu bottom
                        :disabled="getApplyStatusName(slotProps.item.deliveryStatus) !== 'comfirm'"
                        left>
                  <v-btn slot="activator"
                         flat
                         :color="getBtnColor(slotProps.item.deliveryStatus)"
                         class="ma-0 body-1">
                    {{slotProps.item.deliveryStatus | valueToLabel(applyStatuses)}}
                    <v-icon>iconfont icon-more</v-icon>
                  </v-btn>
                  <v-list dense>
                    <v-list-tile class="px-0"
                                 @click="handleInvitation(slotProps.item.deliveryId, true)">
                      <v-list-tile-title class="text-xs-center primary--text">同意</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile class="px-0"
                                 @click="handleInvitation(slotProps.item.deliveryId, false)">
                      <v-list-tile-title class="text-xs-center error--text">拒绝</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </div>
            </template>

          </my-mission-item>
          <base-infinite @infinite="getMoreMyInvitations"
                         ref="myInvitationsInfinite"
                         v-if="active === 1 && this.dateRange"></base-infinite>
        </v-tab-item>
        <v-tab-item>
          <my-mission-item :items="currentMonthApplications">
            <template slot-scope="slotProps">
              <base-tag outline
                        color="accent"
                        height="20px"
                        class="my-0 ml-2">{{slotProps.item.deliveryType | valueToLabel(applyTypes,'label2')}}</base-tag>
              <v-spacer></v-spacer>
              <span class="body-1 text-muted">{{slotProps.item.deliveryStatus | valueToLabel(applyStatuses)}}</span>
            </template>
          </my-mission-item>
          <base-infinite @infinite="getMoreMyApplication"
                         ref="myApplicationInfinite"
                         v-if="active === 2 && this.dateRange"></base-infinite>
        </v-tab-item>
        <v-tab-item>
          <my-mission-item :items="currentMonthCompletedMissions">
            <template slot-scope="slotProps">
              <base-tag outline
                        color="accent"
                        height="20px"
                        class="my-0 ml-2">{{slotProps.item.deliveryType | valueToLabel(applyTypes,'label2')}}</base-tag>
              <v-spacer></v-spacer>
              <div @click.stop.prevent="stopPop">
                <v-btn flat
                       color="primary"
                       :disabled="getApplyStatusName(slotProps.item.deliveryStatus) !== 'done'"
                       @click="postComment(slotProps.item.deliveryId)"
                       class="ma-0">{{getApplyStatusName(slotProps.item.deliveryStatus) === 'done' ? '点击评价' : '已评价'}}</v-btn>
              </div>

            </template>
          </my-mission-item>
          <base-infinite @infinite="getMoreCompletedMissions"
                         ref="completedMissionsInfinite"
                         v-if="active === 3 && this.dateRange"></base-infinite>
        </v-tab-item>
      </v-tabs>
    </v-flex>
    <v-bottom-sheet v-model="commentSheet">

    </v-bottom-sheet>
    <v-bottom-sheet v-model="commentSheet">
      <div class="comment white">
        <v-layout align-center
                  justify-center
                  column>
          <div class="subheading text-xs-center py-3"> 对这工作感觉怎么样呢？ </div>
          <div class="comment-stars">
            <v-layout align-center
                      class="py-2"
                      v-for="n of 5"
                      :key="n">
              <span class="mr-3 pl-2 comment-rate">评价指标</span>
              <v-flex class="d-flex">
                <v-icon class="mx-2">iconfont icon-star</v-icon>
                <v-icon class="mx-2">iconfont icon-star</v-icon>
                <v-icon class="mx-2">iconfont icon-star</v-icon>
                <v-icon class="mx-2">iconfont icon-star</v-icon>
                <v-icon class="mx-2">iconfont icon-star</v-icon>
              </v-flex>
            </v-layout>
          </div>
          <div class="comment-text mt-2">
            <base-textarea outline
                           solo
                           flat
                           label="除了评分，还有什么其他想说的吗~"
                           counter="200"
                           class="body-1"></base-textarea>
            <v-btn color="primary"
                   class="mt-3 mb-5"
                   block>确定</v-btn>
          </div>
        </v-layout>
      </div>
    </v-bottom-sheet>
  </v-layout>
</template>

<script>
import MyMissionItem from '@/components/MyMissionItem'
import { page } from '@mixins'
import { mapGetters, mapActions } from 'vuex'
import { formatTime, getFirstAndLastDay, valueToLabel } from '@helper'
import { applyStatuses, applyTypes } from '@const'

export default {
  components: {
    MyMissionItem
  },
  head: () => ({
    title: '我的任务'
  }),
  meta: {
    title: '我的任务'
  },
  mixins: [page],
  data: () => ({
    active: 0,
    valid: false,
    commentSheet: false,
    disabled: false,
    loading: false,
    missionsPage: {},
    invitationsPage: {},
    applyListPage: {},
    completedMissionsPage: {},
    applyStatuses,
    applyTypes,
    pickedMonth: '',
    prevMonthLoading: false,
    nextMonthLoading: false,
    disableBtn: false
  }),
  computed: {
    ...mapGetters({
      countInfo: 'mission/countInfo',
      myMissions: 'mission/myMissions',
      invitations: 'mission/invitations',
      applications: 'mission/applications',
      completedMissions: 'mission/completedMissions',
      today: 'common/today'
    }),
    currentMonth() {
      let today = this.today
      if (!today) return null
      if (!this.dateRange) {
        return formatTime(today, 'yyyy.MM')
      } else {
        return formatTime(this.dateRange.startDate, 'yyyy.MM')
      }
    },
    dateRange() {
      return this.pickedMonth ? getFirstAndLastDay(this.pickedMonth + '-01') : getFirstAndLastDay(this.today)
    },
    currentMonthMyMissions() {
      return this.myMissions.filter(mission => this.isThisMonth(mission))
    },
    currentMonthInvitations() {
      return this.invitations.filter(invitation => this.isThisMonth(invitation))
    },
    currentMonthApplications() {
      return this.applications.filter(application => this.isThisMonth(application))
    },
    currentMonthCompletedMissions() {
      return this.completedMissions.filter(completedMission => this.isThisMonth(completedMission))
    }
  },
  watch: {
    dateRange(newValue, oldValue) {
      if (!(newValue && oldValue)) return
      this.$nextTick(() => {
        if (this.$refs.myMissionsInfinite) {
          this.$refs.myMissionsInfinite.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
          this.myMissionsPage = null
          this.$refs.myMissionsInfinite.$refs.infiniteLoading.attemptLoad()
        }
        if (this.$refs.myInvitationsInfinite) {
          this.$refs.myInvitationsInfinite.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
          this.invitationsPage = null
          this.$refs.myInvitationsInfinite.$refs.infiniteLoading.attemptLoad()
        }
        if (this.$refs.myApplicationInfinite) {
          this.$refs.myApplicationInfinite.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
          this.applyListPage = null
          this.$refs.myApplicationInfinite.$refs.infiniteLoading.attemptLoad()
        }
        if (this.$refs.completedMissionsInfinite) {
          this.$refs.completedMissionsInfinite.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
          this.completedMissionsPage = null
          this.$refs.completedMissionsInfinite.$refs.infiniteLoading.attemptLoad()
        }
        this.fetchCountInfo(this.dateRange)
      })
    }
  },
  methods: {
    ...mapActions({
      fetchCountInfo: 'mission/fetchCountInfo',
      fetchMyMissions: 'mission/fetchMyMissions',
      fetchInvitations: 'mission/fetchInvitations',
      fetchApplications: 'mission/fetchApplications',
      fetchCompletedMissions: 'mission/fetchCompletedMissions',
      updateInvitation: 'mission/handleInvitation',
      fetchDateTime: 'common/fetchDateTime',
      fetchCommentTag: 'common/fetchCommentTag'
    }),
    getMoreMyMissions($infinite) {
      this.infiniteLoading($infinite, this.fetchMyMissions, 'myMissionsPage', this.dateRange).then(() =>
        this.resetBtn()
      )
    },
    getMoreMyInvitations($infinite) {
      this.infiniteLoading($infinite, this.fetchInvitations, 'invitationsPage', this.dateRange).then(() =>
        this.resetBtn()
      )
    },
    getMoreMyApplication($infinite) {
      this.infiniteLoading($infinite, this.fetchApplications, 'applyListPage', this.dateRange).then(() =>
        this.resetBtn()
      )
    },
    getMoreCompletedMissions($infinite) {
      this.infiniteLoading($infinite, this.fetchCompletedMissions, 'completedMissionsPage', this.dateRange).then(() =>
        this.resetBtn()
      )
    },
    nextMonth() {
      if (!this.currentMonth) return
      let date = this.currentMonth.split('.')
      date[1] = +date[1] + 1
      if (date[1] === 13) {
        date[1] = 1
        date[0] = +date[0] + 1
      }
      let today = this.today.split('-')
      if (+date[0] >= +today[0] && +date[1] > +today[1]) return
      this.nextMonthLoading = true
      this.pickedMonth = date.join('.')
    },
    prevMonth() {
      if (!this.currentMonth) return
      let date = this.currentMonth.split('.')
      date[1] = +date[1] - 1
      if (date[1] === 0) {
        date[1] = 12
        date[0] = +date[0] - 1
      }
      this.prevMonthLoading = true
      this.pickedMonth = date.join('.')
    },
    resetBtn() {
      this.disableBtn = false
      this.nextMonthLoading = false
      this.prevMonthLoading = false
    },
    isThisMonth(item) {
      let endMonth = new Date(item.jobEndTime).getMonth() + 1
      let thisMonth = new Date(this.currentMonth).getMonth() + 1
      return endMonth === thisMonth
    },
    stopPop() {
      console.log('stop')
    },
    handleInvitation(id, flag) {
      this.updateInvitation({id, flag})
    },
    getBtnColor(val) {
      if (valueToLabel(val, applyStatuses, 'name') === 'pass') return 'primary'
      else if (valueToLabel(val, applyStatuses, 'name') === 'reject') return 'error'
      else return 'accent'
    },
    getApplyStatusName(val) {
      return valueToLabel(val, applyStatuses, 'name')
    },
    postComment(id) {
      this.commentSheet = true
    }
  },
  mounted() {
    this.fetchDateTime()
    this.fetchCountInfo({})
    this.fetchCommentTag()
  }
}
</script>
<style lang="scss">
.comment {
    .comment-rate {
        flex-basis: 6em;
    }
    .comment-text {
        width: 80%;
    }
}
</style>
