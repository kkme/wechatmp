<template>
  <div class="job-mission-detail">
    <v-layout class="job-mission-detail-info"
              align-center
              wrap>
      <span class="subheading px-3 py-2">我秦始皇!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!打钱!</span>
      <v-spacer></v-spacer>
      <v-menu bottom
              left>
        <v-btn slot="activator"
               dark
               icon>
          <v-icon color="primary"
                  class="icon--text">iconfont icon-plus</v-icon>
        </v-btn>

        <v-list dense>
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
    <v-tabs v-model="active"
            slider-color="primary"
            grow>
      <v-tab ripple>签到</v-tab>
      <v-tab ripple>单量</v-tab>
      <v-tab ripple>工资</v-tab>
      <v-tab ripple>详情</v-tab>
      <v-tab-item>签到</v-tab-item>
      <v-tab-item>单量</v-tab-item>
      <v-tab-item>工资</v-tab-item>
      <v-tab-item>详情</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Stars from '@/components/Stars'
export default {
  components: {
    Stars
  },
  head: () => ({
    title: '任务详情'
  }),
  meta: {
    title: '任务详情'
  },
  data: () => ({
    active: 0
  })
}
</script>

<style lang="scss">
</style>
