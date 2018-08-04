<template>
  <v-layout class="job-my-mission white min-h-100"
            column>
    <div>
      <v-layout class="py-3"
                align-center
                justify-center>
        <span class="px-2">2081.12</span>
        <svg-calender class="svg-sm" />
      </v-layout>
      <v-card class="mx-3 my-mission-summary">
        <v-layout row
                  align-center>
          <v-btn icon
                 flat
                 color="primary">
            <v-icon>iconfont icon-left_circle</v-icon>
          </v-btn>
          <v-flex class="py-3">
            <v-layout class="text-xs-center">
              <v-flex>
                <div class="primary--text">254</div>
                <div class="text-muted caption">领取任务</div>
              </v-flex>
              <v-flex>
                <div class="primary--text">254</div>
                <div class="text-muted caption">完成任务</div>
              </v-flex>
              <v-flex>
                <div class="primary--text">254</div>
                <div class="text-muted caption">收入</div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-btn icon
                 flat
                 color="primary">
            <v-icon>iconfont icon-right_circle</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
      <v-divider class="mt-3"></v-divider>
      <v-list dense
              flat>
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
              light
              grow
              slider-color="primary"
              class="my-mission-tabs">
        <v-tab ripple>已领取</v-tab>
        <v-tab ripple>收到邀请</v-tab>
        <v-tab ripple>申请列表</v-tab>
        <v-tab ripple>已完成</v-tab>
        <v-tab-item>
          <my-mission-item />
        </v-tab-item>
        <v-tab-item>
          <my-mission-item>
            <template slot-scope="slotProps">
              <base-tag outline
                        color="accent"
                        height="20px"
                        class="my-0">战队</base-tag>
              <v-spacer></v-spacer>
              <span class="caption text-muted">已拒绝</span>
            </template>
          </my-mission-item>
        </v-tab-item>
        <v-tab-item>
          <my-mission-item>
            <template slot-scope="slotProps">
              <base-tag outline
                        color="accent"
                        height="20px"
                        class="my-0">战队</base-tag>
              <v-spacer></v-spacer>
              <span class="caption text-muted">等待确认</span>
            </template>
          </my-mission-item>
        </v-tab-item>
        <v-tab-item>
          <my-mission-item>
            <template slot-scope="slotProps">
              <base-tag outline
                        color="accent"
                        height="20px"
                        class="my-0">战队</base-tag>
              <v-spacer></v-spacer>
              <span class="caption text-muted">点击评价</span>
            </template>
          </my-mission-item>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import MyMissionItem from '@/components/MyMissionItem'
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
  data: () => ({
    active: 1
  })
}
</script>

<style lang="scss">
.job-my-mission {
  .my-mission-tabs {
    .v-tabs__bar {
      position: sticky;
      top: 48px;
      z-index: 2;
    }
  }
}
</style>
