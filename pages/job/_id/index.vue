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
          <v-layout row
                    wrap
                    class="pa-3">
            <div class="subheading">{{detail.title}}</div>
            <v-spacer></v-spacer>
            <div class="error--text">
              <span class="body-2">{{detail.wagebegin}} - {{detail.wageend}}</span>元/天
            </div>
            <v-flex xs12>
              <base-tag>{{detail.wageclearing}}</base-tag>
              <base-tag color="primary">
                <v-icon class="icon--text mr-0">iconfont icon-safety</v-icon>{{detail.wagegeneration}}</base-tag>
              <base-tag>{{detail.wagemode}}</base-tag>
            </v-flex>
          </v-layout>
          <v-divider class="mx-3"></v-divider>
          <div class="pa-3">
            <p class="mb-0">
              <span class="text-muted">兼职周期：</span>{{detail.jobbegintime}}-{{detail.jobendtime}}</p>
            <p class="mb-0">
              <span class="text-muted">工作时段：</span>{{detail.isanyjobperiod ? '不限' : detail.jobperiod }}</p>
            <p class="mb-0">
              <span class="text-muted">招聘时间：</span>{{detail.createtime}} - {{detail.endtime}}</p>
            <p class="mb-0">
              <span class="text-muted">公司名称：</span>{{detail.comname}}</p>
          </div>
          <v-divider class="mx-3"></v-divider>
          <div class="pa-3">
            <p class="mb-0">
              <span class="text-muted">行业类别：</span>{{detail.industryname}}>{{detail.postionname}}</p>
            <p class="mb-0">
              <span class="text-muted">招聘人数：</span>{{detail.peoplenumber}}人</p>
            <p class="mb-0">
              <span class="text-muted">最低学历：</span>{{detail.mineducation | valueToLabel(eduList)}}</p>
          </div>
          <base-divider></base-divider>
          <div class="pb-3">
            <div class="job-detail-title subheading border-bottom py-2 px-3">薪资福利</div>
            <div class="pt-3 px-3">
              <p class="mb-0">
                <span class="text-muted">工资模式：</span>{{detail.wagemode}}</p>
              <p class="mb-0">
                <span class="text-muted">基本底薪：</span>{{detail.wagebase}}元</p>
              <p class="mb-0">
                <span class="text-muted">提成工资：</span>{{detail.wagecommission}}元/单</p>
              <p class="mb-0">
                <span class="text-muted">工资结算：</span>{{detail.wageclearing}}</p>
            </div>
          </div>
          <base-divider></base-divider>
          <div>
            <div class="job-detail-title subheading border-bottom py-2 px-3">工作地点</div>
            <div class="py-3"
                 v-if="!detail.anyaddress && detail.longitude && detail.latitude">
              <no-ssr placeholder="地图加载中...">
                <!-- <baidu-map class="map-view"
                           :center="{ lng: detail.longitude, lat: detail.latitude }"
                           :zoom="15">
                  <bm-marker :position="{ lng: detail.longitude, lat: detail.latitude }"
                             :icon="mapIcon"
                             :offset="mapIconOffset">
                  </bm-marker>
                </baidu-map> -->

                <div class="map-view"
                     @touchstart.stop="handleTouch">
                  <el-amap :center="center"
                           :zoom="15">
                    <el-amap-marker :position="center"></el-amap-marker>
                  </el-amap>
                </div>
              </no-ssr>
              <v-divider class="mt-2"></v-divider>
            </div>
            <div class="px-3 py-2">
              <v-icon class="icon--text mr-0">iconfont icon-location</v-icon>
              详细地址：{{detail.anyaddress ? '不限地址' : (!!detail.longitude && !!detail.latitude) ? detail.address : '地址不明确,请联系发布方确认地址'}}
            </div>
          </div>
          <base-divider></base-divider>
          <div>
            <div class="job-detail-title subheading border-bottom py-2 px-3">工作描述</div>
            <p class="pa-3 mb-0 rich-text"
               v-html="detail.workdescription"></p>
          </div>
          <base-divider></base-divider>
          <div>
            <div class="job-detail-title subheading border-bottom py-2 px-3">任职要求</div>
            <p class="pa-3 mb-0 rich-text"
               v-html="detail.jobrequirements">
            </p>
          </div>
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
              <v-btn slot="yes"
                     color="primary"
                     class="ma-0"
                     depressed
                     large
                     block
                     @click="join">报名参加</v-btn>
            </bottom-btns>
          </div>
        </template>
        <base-infinite v-show="!detail"></base-infinite>
      </v-tab-item>
      <v-tab-item class="job-detail-item">
        <corp-item disableStatus
                   class="white"
                   :info="companyInfo"></corp-item>
        <base-divider></base-divider>
        <v-list dense
                flat
                class="py-0">
          <v-list-tile nuxt
                       :to="`/job/${$route.params.id}/recruiting`">
            <v-list-tile-content class="pl-2">
              <v-list-tile-title>公司在招职位</v-list-tile-title>
            </v-list-tile-content>
            <svg-right class="svg-sm" />
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile nuxt
                       :to="`/job/${$route.params.id}/recruited`">
            <v-list-tile-content class="pl-2">
              <v-list-tile-title>已完成的招聘</v-list-tile-title>
            </v-list-tile-content>
            <svg-right class="svg-sm" />
          </v-list-tile>
        </v-list>
        <base-divider></base-divider>
        <div class="pb-3"
             v-if="companyInfo">
          <div class="job-detail-title subheading border-bottom py-2 px-3">公司介绍</div>
          <p class="pa-3 mb-0 rich-text"
             v-html="companyInfo.introduce"></p>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import CorpItem from '@/components/CorpItem'
import JobItem from '@/components/JobItem'
import BottomBtns from '@/components/BottomBtns'
import constant from '@const/public'
import { eduList } from '@const'
import { mapActions } from 'vuex'
import { bdDecrypt } from '@helper'
export default {
  components: {
    CorpItem,
    JobItem,
    BottomBtns
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
    active: 0,
    detail: null,
    marked: null,
    applied: null,
    recommend: [],
    companyInfo: null,
    id: null
  }),
  computed: {
    center() {
      return bdDecrypt(104.070093, 30.662956)
      // return bdEncrypt(this.detail.longitude, this.detail.latitude)
    }
  },
  methods: {
    ...mapActions({
      fetchJob: 'job/fetchJob',
      addToJobCollection: 'job/addToJobCollection',
      deleteJobCollection: 'users/deleteJobCollection',
      fetchRecommendJobs: 'job/fetchRecommendJobs',
      fetchCompanyInfo: 'job/fetchCompanyInfo',
      applyJob: 'job/applyJob'
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
      // this.applyJob({ id: this.$route.params.id })
    },
    fetchData() {
      this.fetchJob({ id: this.$route.params.id })
        .then(job => {
          this.detail = job.parttime
          this.marked = +job.collection
          this.applied = +job.delivery
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
        $infinite.loaded()
        $infinite.complete()
      })
    },
    handleTouch() {}
  },
  mounted() {
    this.id = this.fetchData()
  }
}
</script>

<style lang="scss">
.job-detail {
  .job-detail-item {
    min-height: calc(100vh - #{$top-nav-height} - 40px);
  }
  .job-detail-title::before {
    content: '';
    display: inline;
    border-left: 2px solid $primary;
    margin-right: 0.5rem;
    border-radius: $border-radius;
    transform: scaleY(0.8);
  }
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
