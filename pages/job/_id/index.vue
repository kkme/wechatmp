<template>
  <div class="job-detail">
    <v-tabs v-model="active"
            fixed-tabs
            grow
            height="40"
            slider-color="primary">
      <v-tab ripple
             :class="{ 'primary--text': active === 0}">职位详情</v-tab>
      <v-tab ripple
             :class="{ 'primary--text': active === 1}">企业信息</v-tab>
      <v-tab-item class="job-detail-item white">
        <template v-if="detail">
          <job-detail :detail="detail"></job-detail>
          <div class="job-similar pb-5">
            <v-layout align-center
                      justify-center
                      class="text-xs-center subheading py-2 grey lighten-3 job-similar-title">
              <v-icon class="mx-1">iconfont icon-dot</v-icon>
              <div>类似职位推荐</div>
              <v-icon class="mx-1">iconfont icon-dot</v-icon>
            </v-layout>
            <job-item :items="recommend"></job-item>
            <base-infinite @infinite="handleInfinite"></base-infinite>
          </div>
          <div class="job-detail-action">
            <bottom-btns>
              <v-btn slot="no"
                     color="white"
                     class="ma-0"
                     depressed
                     large
                     block
                     @click="addMarker">
                <v-icon :color="marked ? 'accent' : 'grey'"
                        class="icon--text">iconfont icon-star</v-icon>
                {{marked ? '已收藏' : '收藏'}}
              </v-btn>

              <v-dialog slot="yes"
                        v-model="dialog"
                        persistent
                        max-width="500px"
                        class="w-100">
                <v-btn slot="activator"
                       color="primary"
                       class="ma-0"
                       depressed
                       large
                       block
                       @click="join">报名参加</v-btn>
                <v-card>

                  <v-card-text>
                    <v-layout align-center>
                      <v-flex>
                        <div>
                          <template v-if="detail.mintaskday">最短申请周期:{{detail.mintaskday}}天</template>
                          <template v-else>全程参加</template>
                        </div>
                        <div class="py-2">
                          <base-date-picker v-model="job.jobbegintime"
                                            placeholder="兼职开始日期"
                                            :min="minDay"
                                            :max="minAvailableDay"
                                            ltr
                                            bordered></base-date-picker>
                        </div>
                        <div class="py-2">
                          <base-date-picker v-model="job.jobendtime"
                                            placeholder="兼职结束日期"
                                            :min="maxAvailableDay"
                                            :max="maxDay"
                                            ltr
                                            bordered></base-date-picker>
                        </div>
                      </v-flex>

                    </v-layout>
                    <v-layout align-center
                              class="mt-2"
                              v-if="!detail.isanyjobperiod">
                      <v-flex>

                        <div>
                          <template v-if="detail.mintaskday">最短申请时段:{{detail.mintaskhour}}小时</template>
                          <template v-else>全程参加</template>
                        </div>
                        <div class="py-2">
                          <base-time-picker v-model="job.jobperiodbegin"
                                            :min="minTime"
                                            :max="maxTime"
                                            bordered
                                            placeholder="开始时间"></base-time-picker>
                        </div>
                        <div class="py-2">
                          <base-time-picker v-model="job.jobperiodend"
                                            :min="minTime "
                                            :max="maxTime"
                                            bordered
                                            placeholder="结束时间"></base-time-picker>
                        </div>
                      </v-flex>
                    </v-layout>
                    <div v-else>
                      不限工作时段
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent"
                           flat
                           @click.native="dialog = false">取消</v-btn>
                    <v-btn color="primary"
                           flat
                           @click="join"
                           :loading="loading"
                           :disabled="disableApply">申请</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </bottom-btns>
          </div>
        </template>
        <base-infinite v-show="!detail"></base-infinite>
      </v-tab-item>
      <v-tab-item class="job-detail-item"
                  v-if="companyInfo && companyInfo.companyInfo">
        <corp-item disableStatus
                   class="white"
                   :info="companyInfo.companyInfo"></corp-item>
        <base-divider></base-divider>
        <div class="pb-3">
          <div class="job-detail-title subheading border-bottom py-2 px-3">公司介绍</div>
          <p class="pa-3 mb-0 rich-text"
             v-html="companyInfo.companyInfo.introduce"></p>
        </div>
        <base-divider></base-divider>
        <div class="pb-3"
             v-if="companyInfo.inRecruit">
          <div class="job-detail-title subheading border-bottom py-2 px-3">公司在招职位</div>
          <p class="py-3 mb-0">
            <job-item :items="companyInfo.inRecruit"></job-item>
          </p>
        </div>
        <base-divider></base-divider>
        <div class="pb-3"
             v-if="companyInfo.finished">
          <div class="job-detail-title subheading border-bottom py-2 px-3">已完成的招聘</div>
          <p class="py-3 mb-0">
            <job-item :items="companyInfo.finished"></job-item>
          </p>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import CorpItem from '@/components/CorpItem'
import JobItem from '@/components/JobItem'
import BottomBtns from '@/components/BottomBtns'
import JobDetail from '@/components/JobDetail'
import constant from '@const/public'
import { eduList, paymentTypes, salaryTypes, paymentPlatfroms, applyTypes } from '@const'
import { mapActions, mapGetters } from 'vuex'
import { bdDecrypt, addDays, addHour, dateGreater, labelToValue } from '@helper'
export default {
  components: {
    CorpItem,
    JobItem,
    BottomBtns,
    JobDetail
  },
  head: () => ({
    title: '职位详情'
  }),
  meta: {
    title: '职位详情'
  },
  data: () => ({
    mapIcon: constant.BAIDU_MAP_POSITION_ICON,
    mapIconOffset: constant.BAIDU_MAP_POSITION_ICON_OFFSET,
    eduList,
    paymentTypes,
    salaryTypes,
    paymentPlatfroms,
    active: 0,
    detail: null,
    marked: null,
    applied: null,
    recommend: [],
    companyInfo: null,
    id: null,
    dialog: false,
    job: {
      recruitmentid: '',
      jobbegintime: '',
      jobendtime: '',
      jobperiodbegin: '',
      jobperiodend: '',
      deliverytype: ''
    },
    loading: false
  }),
  computed: {
    ...mapGetters({
      today: 'common/today'
    }),
    center() {
      // return bdDecrypt(104.070093, 30.662956)
      return bdDecrypt(this.detail.longitude, this.detail.latitude)
    },
    minDay() {
      if (!this.detail) return ''
      let begin = this.detail.jobbegintime || ''
      if (begin) {
        begin = begin.replace(/\./g, '-')
      }
      return dateGreater(addDays(this.today, 1), begin)
    },
    minAvailableDay() {
      return this.job.jobendtime
        ? addDays(this.job.jobendtime, -this.detail.mintaskday + 1)
        : addDays(this.maxDay, -this.detail.mintaskday + 1)
    },
    maxDay() {
      if (!this.detail) return ''
      let end = this.detail.jobendtime || ''
      if (end) {
        end = end.replace(/\./g, '-')
      }
      return end
    },
    maxAvailableDay() {
      return this.job.jobbegintime
        ? addDays(this.job.jobbegintime, +this.detail.mintaskday - 1)
        : addDays(this.minDay, +this.detail.mintaskday - 1)
    },
    disableDate() {
      return this.detail ? !this.detail.mintaskday : false
    },
    minTime() {
      if (!this.detail) return '00:00'
      let begin = this.detail.jobperiod
      return begin ? begin.split('-')[0].trim() : '00:00'
    },
    minAvailableTime() {
      if (this.detail.isanyjobperiod) return '23:59'
      return this.job.jobperiodend
        ? addHour(this.job.jobperiodend, -this.detail.mintaskhour)
        : addHour(this.maxTime, -this.detail.mintaskhour)
    },
    maxTime() {
      if (!this.detail) return '00:00'
      let end = this.detail.jobperiod
      return end ? end.split('-')[1].trim() : '23:59'
    },
    maxAvailableTime() {
      if (this.detail.isanyjobperiod) return '23:59'
      return this.job.jobperiodbegin
        ? addHour(this.job.jobperiodbegin, +this.detail.mintaskhour)
        : addHour(this.minTime, +this.detail.mintaskhour)
    },
    disableTime() {
      return this.detail ? this.detail.isanyjobperiod : false
    },
    disableApply() {
      return !(
        this.job.recruitmentid !== '' &&
        this.job.jobbegintime !== '' &&
        this.job.jobendtime !== '' &&
        this.job.jobperiodbegin !== '' &&
        this.job.jobperiodend !== '' &&
        this.job.deliverytype !== ''
      )
    }
  },
  methods: {
    ...mapActions({
      fetchJob: 'job/fetchJob',
      addToJobCollection: 'job/addToJobCollection',
      deleteJobCollection: 'users/deleteJobCollection',
      fetchRecommendJobs: 'job/fetchRecommendJobs',
      fetchCompanyInfo: 'job/fetchCompanyInfo',
      applyJob: 'job/applyJob',
      datetime: 'common/fetchDateTime'
    }),
    mapReady({ BMap, map }) {
      console.log(BMap, map)
    },
    addMarker() {
      let id = this.$route.params.id
      if (this.marked) {
        this.deleteJobCollection({ id })
        this.marked = false
      } else {
        this.addToJobCollection({ id })
        this.marked = true
      }
    },
    join() {
      this.loading = true
      this.applyJob(this.job).then(res => {
        this.loading = false
      })
    },
    fetchData() {
      this.fetchJob({ id: this.$route.params.id })
        .then(job => {
          this.detail = job.parttime
          this.marked = +job.collection
          this.applied = +job.delivery
          this.job.recruitmentid = this.detail.id
          this.job.deliverytype = labelToValue('user', applyTypes)
          return job.parttime
        })
        .then(job => {
          this.fetchRecommendJobs({ checkSign: job.id, id: job.positionid }).then(res => {
            this.recommend = res.filter(job => job.recruitmentId !== this.detail.id)
          })
          this.fetchCompanyInfo({ id: job.comid }).then(res => {
            this.companyInfo = res
          })
        })
    },
    handleInfinite($infinite) {
      if (!this.detail.id) return
      this.fetchRecommendJobs({ checkSign: this.detail.id, id: this.detail.positionid }).then(res => {
        this.recommend = res.filter(job => job.recruitmentId !== this.detail.id)
        $infinite.complete()
      })
    },
    handleTouch() {
      console.log('stop propagation')
    }
  },
  mounted() {
    this.id = this.fetchData()
    this.datetime()
  }
}
</script>

<style lang="scss">
.job-detail {
    .job-similar {
        .job-similar-title {
            i.iconfont {
                color: $primary;
                transform: scale(0.5);
            }
        }
    }
    .job-detail-action {
        button {
            border-radius: 0;
        }
    }
}
</style>
