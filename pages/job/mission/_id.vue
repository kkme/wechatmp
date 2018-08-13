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
          <v-list-tile class="border-bottom"
                       @click="onCancelMission">
            <v-list-tile-title>任务取消</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="border-bottom"
                       @click="onEndMission">
            <v-list-tile-title>提前结束任务</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="border-bottom"
                       @click="onDelayMission">
            <v-list-tile-title>延长工作时间</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="border-bottom"
                       @click="overdueCheckIn">
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
            grow
            class="sticky-to-top white">
      <v-tab ripple>签到</v-tab>
      <v-tab ripple>单量</v-tab>
      <v-tab ripple>工资</v-tab>
      <v-tab ripple>详情</v-tab>
      <v-tab-item>
        <my-mission-check-in-out :id="detail.id"
                                 v-if="active === 0" />
      </v-tab-item>
      <v-tab-item>
        <my-mission-orders :id="detail.id"
                           v-if="active === 1" />
      </v-tab-item>
      <v-tab-item>
        <my-mission-salary :id="detail.id"
                           v-if="active === 2" />
      </v-tab-item>
      <v-tab-item>
        <job-detail :detail="jobDetail"
                    v-if="jobDetail"></job-detail>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="dialog"
              max-width="500px">
      <v-card>
        <v-card-title class="justify-center pt-4">
          <span class="title">申请{{dialogContent[currentDialog].description}}任务</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid"
                  class="px-3"
                  ref="form"
                  lazy-validation>
            <v-layout align-center>
              <div class="flex-auto">任务结束时间：</div>
              <v-flex>
                <base-input v-model="username"
                            :rules="nameRules"
                            placeholder="任务结束时间"
                            :flat="false"
                            :solo="false"
                            class="mt-0"
                            required></base-input>
              </v-flex>
            </v-layout>
            <v-layout align-center
                      class="mt-3">
              <div class="flex-auto">申请{{dialogContent[currentDialog].description}}：</div>
              <v-flex>
                <base-input v-model="username"
                            :rules="nameRules"
                            placeholder="申请结束时间"
                            :flat="false"
                            :solo="false"
                            class="mt-0"
                            required></base-input>
              </v-flex>
            </v-layout>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary"
                 block
                 class="mx-4 mt-3"
                 :disabled="!valid"
                 @click="submit"
                 :loading="loading">登录</v-btn>
        </v-card-actions>
        <div class="py-3 text-xs-center caption error--text">{{dialogContent[currentDialog].textLabel}}</div>
      </v-card>
    </v-dialog>
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
    active: 0,
    detail: {},
    jobDetail: null,
    dialog: true,
    currentDialog: 'cancelMission',
    dialogContent: {
      cancelMission: {
        description: '取消'
      },
      endMission: {
        description: '提前结束',
        textLabel: '提前结束任务将影响你的信誉值'
      },
      delayMission: {
        description: '延长'
      }
    }
  }),
  computed: {
    ...mapActions({
      cancelMission: 'mission/cancelMission',
      applyEndMission: 'mission/applyEndMission'
    })
  },
  methods: {
    ...mapActions({
      fetchDetail: 'mission/fetchDetail',
      fetchJobDetail: 'job/fetchJob'

    }),
    getDetail() {
      let id = this.$route.params.id
      if (id) {
        this.fetchDetail({ id })
          .then(res => {
            this.detail = res
            return res
          })
          .then(detail => {
            let jobId = detail.recruitmentId
            if (jobId) {
              this.getJobDetial(jobId)
            }
          })
      }
    },
    getJobDetial(id) {
      this.fetchJobDetail({ id }).then(res => {
        if (res) {
          this.jobDetail = res.parttime
        }
      })
    },
    onCancelMission() {
      this.currentDialog = 'cancelMission'
      this.dialog = true
    },
    onEndMission() {
      this.currentDialog = 'endMission'
      this.dialog = true
    },
    onDelayMission() { this.dialog = true },
    overdueCheckIn() { this.dialog = true }
  },
  mounted() {
    this.getDetail()
  }
}
</script>

<style lang="scss">
</style>
