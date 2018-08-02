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
        <v-layout row
                  wrap
                  class="pa-3">
          <div class="subheading">我Hitler,打钱!</div>
          <v-spacer></v-spacer>
          <div class="error--text">
            <span class="body-2">120-160</span>元/天
          </div>
          <v-flex xs12>
            <base-tag>日结</base-tag>
            <base-tag>包吃住</base-tag>
            <base-tag color="primary">包开心</base-tag>
          </v-flex>
        </v-layout>
        <v-divider class="mx-3"></v-divider>
        <div class="pa-3">
          <p class="mb-0">
            <span class="text-muted">兼职周期：</span>2018.05.01-2018.05.22</p>
          <p class="mb-0">
            <span class="text-muted">工作时段：</span>09:00-18:00</p>
          <p class="mb-0">
            <span class="text-muted">招聘时间：</span>2018.05.01-2018.06.21</p>
          <p class="mb-0">
            <span class="text-muted">公司名称：</span>成都台食记手工作坊有限公司</p>
        </div>
        <v-divider class="mx-3"></v-divider>
        <div class="pa-3">
          <p class="mb-0">
            <span class="text-muted">行业类别：</span>餐饮>洗碗工</p>
          <p class="mb-0">
            <span class="text-muted">招聘人数：</span>5人</p>
          <p class="mb-0">
            <span class="text-muted">性别要求：</span>不限性别</p>
          <p class="mb-0">
            <span class="text-muted">最低学历：</span>不限学历</p>
        </div>
        <base-divider></base-divider>
        <div class="pb-3">
          <div class="job-detial-title subheading border-bottom py-2 px-3">薪资福利</div>
          <div class="pt-3 px-3">
            <p class="mb-0">
              <span class="text-muted">工资模式：</span>底薪加提成</p>
            <p class="mb-0">
              <span class="text-muted">基本底薪：</span>120元</p>
            <p class="mb-0">
              <span class="text-muted">提成工资：</span>20元/单</p>
            <p class="mb-0">
              <span class="text-muted">工资结算：</span>日结</p>
          </div>
        </div>
        <base-divider></base-divider>
        <div class="">
          <div class="job-detial-title subheading border-bottom py-2 px-3">工作地点</div>
          <div class="py-3">
            <!-- <baidu-map class="bm-view"
                       :center="center"
                       :zoom="zoom"
                       @ready="mapReady">
            </baidu-map> -->
            <baidu-map class="bm-view"
                       :center="{lng: 116.404, lat: 39.915}"
                       :zoom="15">
              <bm-marker :position="{lng: 116.404, lat: 39.915}"
                         animation="BMAP_ANIMATION_BOUNCE">
                <bm-label content="我爱北京天安门"
                          :labelStyle="{color: 'red', fontSize : '24px'}"
                          :offset="{width: -35, height: 30}" />
              </bm-marker>
            </baidu-map>
          </div>
          <v-divider></v-divider>
          <div class="px-3 py-2">
            <v-icon class="icon--text mr-0">iconfont icon-location</v-icon>详细地址：北京市海淀区上地十街10号
          </div>
        </div>
        <base-divider></base-divider>
        <div class="pb-3">
          <div class="job-detial-title subheading border-bottom py-2 px-3">工作描述</div>
          <p class="pa-3 mb-0 rich-text"
             v-html="a"></p>
        </div>
        <base-divider></base-divider>
        <div class="pb-3">
          <div class="job-detial-title subheading border-bottom py-2 px-3">任职要求</div>
          <p class="pa-3 mb-0 rich-text"
             v-html="b">
          </p>
        </div>
        <base-divider></base-divider>
      </v-tab-item>
      <v-tab-item class="job-detail-item">2</v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  head: () => ({
    title: '职位详情'
  }),
  meta: {
    title: '职位详情'
  },
  data: () => ({
    active: null,
    a: `急招传单派发人员60名，周末，平时，节假日。
工资待遇：无责任底薪120元天日结，男女不限，16到25岁之间，做事认真踏实，不乱扔单页。
工作时间：上午9点到下午6点，下午半天，半天2点到6点
工作地点：成都市区各大商场及郊县大学食堂门口就近安排，工资做完就结，不拖欠，能做的请发送简历，谢谢`,
    b: `1、金融IT系统研发工作；
2、进行系统的需求分析、架构设计以及产品规划相关工作；
3、参与核心模块编写，问题分析等工作；
4、协助主管进行团队管理、能力建设相关工作；
5、良好的文档编写能力；协调沟通能力；项目管理能力。 `,
    center: { lng: 0, lat: 0 },
    zoom: 3
  }),
  methods: {
    mapReady({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  }
}
</script>

<style lang="scss">
.job-detail {
  .job-detail-item {
    min-height: calc(100vh - #{$top-nav-height} - 40px);
  }
  .job-detial-title::before {
    content: '';
    display: inline;
    border-left: 2px solid $primary;
    margin-right: 0.5rem;
    border-radius: $border-radius;
    transform: scaleY(0.8);
  }
}
</style>
