<template>
  <div class="mission-detail white"
       v-if="detail">
    <v-layout class="mission-detail-info"
              align-center>
      <v-flex class="subheading pl-3 py-2">{{detail.title}}</v-flex>
      <v-menu bottom
              left>
        <v-btn slot="activator"
               flat
               color="primary"
               icon>
          <v-icon class="icon--text mr-0">iconfont icon-plus</v-icon>
        </v-btn>

        <v-list dense
                class="py-0">
          <v-list-tile class="border-bottom">
            <v-list-tile-title>任务取消</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="border-bottom">
            <v-list-tile-title>提前结束任务</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="border-bottom">
            <v-list-tile-title>延长工作时间</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="border-bottom">
            <v-list-tile-title>任务补签</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-layout>
    <div class="px-3">
      <div>任务周期：
        <template v-if="detail.jobBeginTime">
          {{detail.jobBeginTime}} - {{detail.jobEndTime}}
        </template>
      </div>
      <div>工作时段：
        <template v-if="detail.periodBegin">
          {{detail.periodBegin}} - {{detail.periodEnd}}
        </template>
      </div>
      <div>工作地址：
        <template v-if="detail.address || detail.province">
          {{detail.address ? detail.address : `${detail.province}${detail.city}${detail.county}`}}
        </template>
      </div>
      <div>领取时间：
        <template v-if="detail.userPeriodBegin">
          {{detail.userPeriodBegin}} - {{detail.userPeriodEnd}}
        </template>
      </div>
      <div>领取周期： {{detail.userJobBeginTime ? `${detail.userJobBeginTime} - ${detail.userJobEndTime || '长期'}` : ''}}</div>
    </div>
    <base-divider class="mt-2"></base-divider>
    <v-tabs v-model="active"
            slider-color="primary"
            grow>
      <v-tab ripple>签到</v-tab>
      <v-tab ripple>单量</v-tab>
      <v-tab ripple>工资</v-tab>
      <v-tab ripple>详情</v-tab>
      <v-tab-item>
        <my-mission-check-in-out></my-mission-check-in-out>
      </v-tab-item>
      <v-tab-item>
        <my-mission-orders></my-mission-orders>
      </v-tab-item>
      <v-tab-item>
        <my-mission-salary></my-mission-salary>
      </v-tab-item>
      <v-tab-item>
        <job-detail :detail="detail"></job-detail>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import MyMissionCheckInOut from '@/components/MyMissionCheckInOut'
import MyMissionOrders from '@/components/MyMissionOrders'
import MyMissionSalary from '@/components/MyMissionSalary'
import JobDetail from '@/components/JobDetail'
import { mapActions } from 'vuex'
export default {
  components: {
    MyMissionCheckInOut,
    MyMissionOrders,
    MyMissionSalary,
    JobDetail
  },
  head: () => ({
    title: '任务详情'
  }),
  meta: {
    title: '任务详情'
  },
  data: () => ({
    active: 2,
    detail: {}
  }),
  computed: {},
  methods: {
    ...mapActions({
      fetchDetail: 'mission/fetchDetail'
    }),
    getDetail() {
      let id = this.$route.params.id
      if (id) {
        this.fetchDetail({id}).then(res => {
          this.detail = res
        })
      }
    }
  },
  mounted() {
    this.getDetail()
  }
}
</script>

<style lang="scss">
</style>
