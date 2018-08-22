<template>
  <div>
    <v-tabs v-model="active"
            color="white"
            fixed-tabs
            slider-color="primary">
      <v-tab ripple>正在招募</v-tab>
      <v-tab ripple>我的报名</v-tab>
      <v-tab ripple>我的评价</v-tab>
      <v-tab-item class="white py-1 fun-events-item">
        <v-card class="ma-3 py-2"
                nuxt
                :to="`/job/fun/${item.id}`"
                v-for="item of funEvents"
                :key="item.id">
          <v-card-media class="white--text"
                        height="25vh"
                        :src="baseUrl + item.imgPath">
            <v-layout fill-height
                      class="px-3">
              <v-flex xs12
                      align-end
                      flexbox>
                <span class="subheading fun-events-item-title">{{item.title}}</span>
              </v-flex>
            </v-layout>
          </v-card-media>
        </v-card>
        <base-infinite v-if="active === 0"
                       @infinite="getMoreFunEvents"></base-infinite>
      </v-tab-item>
      <v-tab-item>
        <div class="white"
             v-for="item of appliedFunEvents"
             :key="item.id">
          <fun-event-item :item="item"
                          @onQrCode="onQrCode">
            <v-btn v-if="item.reservation && valueToLabel(item.deliveryStatus, funStatusTypes, 'name') === 'accept'"
                   small
                   color="primary"
                   @click="onReserve(item)"
                   class="mr-0">预约</v-btn>
            <span v-if="!item.reservation">免预约</span>
          </fun-event-item>
          <base-divider></base-divider>
        </div>
        <base-infinite v-if="active === 1"
                       @infinite="getMoreAppliedFunEvents"></base-infinite>
      </v-tab-item>
      <v-tab-item>
        <div class="white py-3"
             v-if="comments.length"
             v-for="item of comments"
             :key="item.id">
          <fun-event-item :item="item">
            <v-btn v-if="!item.evaluationId"
                   small
                   color="primary"
                   @click="$router.push({name: 'job-fun-comment-id', params: {id: item.recruitmentId}})"
                   class="mr-0">评价</v-btn>
            <span v-if="item.evaluationId">已评价</span>
          </fun-event-item>
        </div>
        <base-infinite v-if="active === 2"
                       @infinite="getMoreComments"></base-infinite>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="qrDialog"
              max-width="300px">
      <v-card height="300px" width="300px">
        <v-layout align-center justify-center fill-height column>
          <qr-code :value="qrCodeValue"
                 level="H"
                 :options="{ size: 250 }"></qr-code>
                 <div class="pt-1">验证码： <span class="primary--text">{{qrCodeValue}}</span></div>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog"
              max-width="500px">
      <v-card>
        <v-card-title class="justify-center pt-4">
          <span class="title">请选择日期</span>
        </v-card-title>
        <v-card-text>
          <v-layout class="mx-3 border-bottom"
                    align-center>
            <v-flex>
              <base-date-picker v-model="startDate"
                                placeholder="开始日期"
                                :min="dateRange.min"
                                :max="dateRange.max"
                                ltr></base-date-picker>
            </v-flex>
            <v-flex>
              <base-time-picker v-model="startTime"
                                placeholder="开始时间"
                                ltr></base-time-picker>
            </v-flex>
          </v-layout>
          <v-layout class="mx-3 border-bottom"
                    align-center>
            <v-flex>
              <base-date-picker v-model="endDate"
                                placeholder="结束日期"
                                :min="dateRange.min"
                                :max="dateRange.max"
                                ltr></base-date-picker>
            </v-flex>
            <v-flex>
              <base-time-picker v-model="endTime"
                                placeholder="结束时间"
                                ltr></base-time-picker>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-btn color="primary"
                   block
                   class="mx-4 my-3"
                   :disabled="!startDate || !startTime || !endDate || !endTime"
                   :loading="loading"
                   @click="submit">确定</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import constant from '@const/public'
import { page } from '@mixins'
import FunEventItem from '@/components/FunEventItem'
import { valueToLabel } from '@helper'
import { funStatusTypes } from '@const'
import qrCode from '@xkeshi/vue-qrcode'
export default {
  components: { FunEventItem, qrCode },
  head: () => ({
    title: '趣味体验'
  }),
  meta: {
    title: '趣味体验'
  },
  mixins: [page],
  data: () => ({
    active: 0,
    baseUrl: constant.BASE_URL,
    fun: {},
    dialog: false,
    dateRange: {},
    timeRange: {},
    loading: false,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    funStatusTypes,
    qrDialog: false,
    qrCodeValue: ''
  }),
  computed: {
    ...mapGetters({
      funEvents: 'fun/funEvents',
      appliedFunEvents: 'fun/appliedFunEvents',
      comments: 'fun/comments'
    })
  },
  methods: {
    ...mapActions({
      fetchFunEvents: 'fun/fetchFunEvents',
      fetchAppliedFunEvents: 'fun/fetchAppliedFunEvents',
      fetchComments: 'fun/fetchComments',
      applyFunEvent: 'fun/applyFunEvent',
      reserveFunEvent: 'fun/reserveFunEvent',
      addComment: 'fun/addComment'
    }),
    valueToLabel,
    getMoreFunEvents($infinite) {
      this.infiniteLoading($infinite, this.fetchFunEvents, 'funEventsPage')
    },
    getMoreAppliedFunEvents($infinite) {
      this.infiniteLoading($infinite, this.fetchAppliedFunEvents, 'appliedFunEventsPage')
    },
    getMoreComments($infinite) {
      this.infiniteLoading($infinite, this.fetchComments, 'commentsPage')
    },
    onReserve(item) {
      this.dateRange = {
        min: item.jobbegintime.replace(/\./g, '-'),
        max: item.jobendtime.replace(/\./g, '-')
      }
      this.fun = {
        recruitmentid: item.recruitmentId,
        applyid: item.id
      }
      this.resetDateTime()
      this.dialog = true
    },
    resetDateTime() {
      this.startDate = ''
      this.endDate = ''
      this.startTime = ''
      this.endTime = ''
    },
    submit() {
      this.loading = true
      this.reserveFunEvent({
        recruitmentid: this.fun.recruitmentid,
        applyid: this.fun.applyid,
        begintime: `${this.startDate} ${this.startTime}`,
        endtime: `${this.endDate} ${this.endTime}`
      })
        .then(() => {
          this.dialog = false
          this.loading = false
        })
        .catch(error => {
          this.dialog = false
          this.loading = false
          console.log(error)
        })
    },
    onQuitMission(id) {
      this.quitMission({ id })
    },
    onQrCode(value) {
      this.qrCodeValue = value
      this.qrDialog = true
    }
  }
}
</script>
<style lang="scss">
.fun-thumb {
  width: 80px;
  height: 80px;
}
.fun-events-item {
  .fun-events-item-title {
    text-shadow: 1px 1px 1px #000;
  }
}
.qr-wrap {
  width: 300px;
  height: 300px;
}
</style>
