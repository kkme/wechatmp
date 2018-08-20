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
                <span class="headline fun-events-item-title">标题标题</span>
              </v-flex>
            </v-layout>
          </v-card-media>
        </v-card>
        <base-infinite v-if="active === 0"
                       @infinite="getMoreFunEvents"></base-infinite>
      </v-tab-item>
      <v-tab-item>
        <div class="white pa-3"
             v-for="item of appliedFunEvents"
             :key="item.id">
          <v-layout align-center>
            <v-card class="ma-0 py-0 fun-thumb flex-auto"
                    flat>
              <v-card-media class="white--text"
                            height="80px"
                            :src="item.contentimage">
                <v-layout column
                          justify-space-between>
                  <v-spacer></v-spacer>
                  <div class="fun-thumb-text text-xs-center">预约</div>
                </v-layout>
              </v-card-media>
            </v-card>
            <v-flex class="caption ml-3">
              <v-layout align-center>
                <div class="body-2">{{item.title}}</div>
                <v-spacer></v-spacer>
                <v-btn small
                       color="primary"
                       @click="onReserve(item)"
                       class="my-0 mr-0">预约</v-btn>
              </v-layout>
              <div class="grey--text text--darken-2">活动时间：{{item.jobbegintime}} - {{item.jobendtime}}</div>
              <div class="grey--text text--darken-2">活动地址：{{item.address}}</div>
            </v-flex>
          </v-layout>
          <div class="caption"
               v-if="item.reservationLiteList.length">
            <v-layout align-center
                      class="my-2">
              <span class="subheading">预约记录</span>
              <v-spacer class="border-bottom-dash mx-2"></v-spacer>
              <span class="subheading primary--text">{{item.deliveryStatus}}</span>
            </v-layout>
            <div class="grey--text text--darken-2">签到时间：2018年9月15日 13:00</div>
            <div class="grey--text text--darken-2">验证码：
              <span class="body-2 primary--text">890585
                <span class="error--text ml-1 caption">
                  <v-icon class="icon--text ma-0"
                          color="error">iconfont icon-warning</v-icon>
                  请在体验时将验证码出示给体验提供方
                </span>
              </span>
            </div>
            <div class="grey--text text--darken-2">
              预约时间：2018年05月05日 15:00 - 2018年05月05日 15:00
            </div>
          </div>
        </div>
        <base-infinite v-if="active === 1"
                       @infinite="getMoreAppliedFunEvents"></base-infinite>
      </v-tab-item>
      <v-tab-item>
        <base-infinite v-if="active === 2"
                       @infinite="getMoreComments"></base-infinite>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="dialog"
              max-width="500px">
      <v-card>
        <v-card-title class="justify-center pt-4">
          <span class="title">请选择日期</span>
        </v-card-title>
        <v-card-text>
          <div class="mx-3 border-bottom">
            <base-date-picker v-model="fun.begintime"
                              placeholder="开始日期"
                              :min="dateRange.min"
                              :max="dateRange.max"
                              ltr></base-date-picker>
          </div>
          <div class="mx-3 mt-2 border-bottom">
            <base-date-picker v-model="fun.endtime"
                              placeholder="结束日期"
                              :min="dateRange.min"
                              :max="dateRange.max"
                              ltr></base-date-picker>
          </div>
          <v-card-actions>
            <v-btn color="primary"
                   block
                   class="mx-4 my-3"
                   :disabled="!fun.begintime || !fun.endtime"
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
export default {
  components: {},
  head: () => ({
    title: '趣味体验'
  }),
  meta: {
    title: '趣味体验'
  },
  mixins: [page],
  data: () => ({
    active: 1,
    baseUrl: constant.BASE_URL,
    fun: {},
    dialog: false,
    dateRange: {},
    loading: false
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
      this.dialog = true
      this.dateRange = {
        min: item.jobbegintime.replace(/\./g, '-'),
        max: item.jobendtime.replace(/\./g, '-')
      }
      this.fun = {
        recruitmenid: item.recruitmentId,
        applyid: item.id,
        begintime: null,
        endtime: null
      }
    },
    submit() {
      this.loading = true
      this.reserveFunEvent(this.fun)
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
</style>
