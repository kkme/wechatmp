<template>
  <v-dialog v-model="dialog"
            v-if="detail"
            persistent
            max-width="500px"
            class="flex-auto">

    <template slot="activator">
      <slot>
        <v-btn color="primary"
               class="ma-0"
               depressed
               large
               :disabled="applied"
               block>{{applied ? '已报名' : '报名参加'}}</v-btn>
      </slot>
    </template>
    <v-card>

      <v-card-text>
        <v-layout align-center>
          <v-flex>
            <div>
              <template v-if="detail.minTaskDay">最短申请周期:{{detail.minTaskDay}}天</template>
              <template v-else>全程参加</template>
            </div>
            <div class="py-2">
              <base-date-picker v-model="job.jobBeginTime"
                                placeholder="开始日期"
                                :min="minDay"
                                :max="minAvailableDay"
                                ltr
                                bordered></base-date-picker>
            </div>
            <div class="py-2">
              <base-date-picker v-model="job.jobEndTime"
                                placeholder="结束日期"
                                :min="maxAvailableDay"
                                :max="maxDay"
                                ltr
                                bordered></base-date-picker>
            </div>
          </v-flex>
        </v-layout>
        <v-layout align-center
                  class="mt-2">
          <v-flex>

            <div>
              <template v-if="detail.minTaskHour">最短申请时段:{{detail.minTaskHour}}小时</template>
              <template v-else>全程参加</template>
            </div>
            <div>工作时段：{{+detail.jobPeriodBegin === 0 && detail.jobPeriodEnd === 0 ? '不限时段' : `${detail.jobPeriodEnd} - ${detail.jobPeriodEnd}` }}</div>
            <div class="py-2">
              <base-time-picker v-model="job.jobPeriodBegin"
                                bordered
                                placeholder="开始时间"></base-time-picker>
            </div>
            <div class="py-2">
              <base-time-picker v-model="job.jobPeriodEnd"
                                bordered
                                placeholder="结束时间"></base-time-picker>
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent"
               flat
               @click="dialog = false">取消</v-btn>
        <v-btn color="primary"
               flat
               @click="join"
               :loading="loading"
               :disabled="disableApply">申请</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { eduList, paymentTypes, salaryTypes, paymentPlatfroms, applyTypes } from '@const'
import { addDays, addHour, dateGreater, labelToValue } from '@helper'

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    teamInfo: Object,
    jobDetail: Object
  },
  data: () => ({
    dialog: false,
    detail: null,
    marked: false,
    applied: false,
    loading: false,
    disableApply: false,
    job: {}
  }),
  computed: {
    ...mapGetters({
      today: 'common/today'
    }),
    minDay() {
      // 工作开始的最小日期
      if (!this.detail) return ''
      let begin = this.detail.jobBeginTime || ''
      if (begin) {
        begin = begin.replace(/\./g, '-')
      }
      return dateGreater(addDays(this.today, 1), begin)
    },
    minAvailableDay() {
      // 选了最日期后 根据最短工作周期 算出最小日期
      return this.job.jobEndTime
        ? addDays(this.job.jobEndTime, -this.detail.minTaskDay + 1)
        : addDays(this.maxDay, -this.detail.minTaskDay + 1)
    },
    maxDay() {
      // 工作结束日期
      if (!this.detail) return ''
      let end = this.detail.jobEndTime || ''
      if (end) {
        end = end.replace(/\./g, '-')
      }
      return end
    },
    maxAvailableDay() {
      // 选了开始日期后 根据最短工作周期 算出最大日期
      return this.job.jobBeginTime // ? '2018-08-21' : '2018-08-22'
        ? addDays(this.job.jobBeginTime, +this.detail.minTaskDay - 1)
        : addDays(this.minDay, +this.detail.minTaskDay - 1)
    }
  },
  watch: {
    active(newValue) {
      this.dialog = newValue
    }
  },
  methods: {
    ...mapActions({
      datetime: 'common/fetchDateTime',
      fetchJob: 'job/fetchJob',
      claimMissionByOwner: 'team/claimMissionByOwner'
    }),
    setDetail() {
      // if (this.jobDetail) {
      //   this.detail = Object.assign({}, this.jobDetail)
      //   this.marked = !!this.detail.collection
      //   this.applied = !!this.detail.delivery
      // } else if (this.teamInfo) {
      //   this.fetchJob({ id: this.teamInfo.recruitmentId }).then(job => {
      //     this.detail = job.parttime
      //     return job.parttime
      //   })
      // } else {
      //   console.error('参数错误', `'jobDetail'和'teamInfo'必须要传一个`)
      // }
      this.detail = Object.assign({}, this.jobDetail)
    },
    join() {
      this.job.parttimeId = this.detail.recruitmentId
      this.claimMissionByOwner(this.job)
    }
  },
  mounted() {
    if (!this.today) this.datetime()
    this.setDetail()
  }
}
</script>

<style>
</style>
