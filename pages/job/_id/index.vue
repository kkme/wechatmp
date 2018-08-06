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
        <div>
          <div class="job-detial-title subheading border-bottom py-2 px-3">工作地点</div>
          <div class="py-3">
            <no-ssr placeholder="地图加载中...">
              <baidu-map class="bm-view"
                         :center="{ lng: 104.064995, lat: 30.662979 }"
                         :zoom="15">
                <bm-marker :position="{ lng: 104.064995, lat: 30.662979 }"
                           :icon="mapIcon"
                           :offset="mapIconOffset">
                </bm-marker>
              </baidu-map>
            </no-ssr>
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
        <div class="job-similar pb-5">
          <v-layout align-center
                    justify-center
                    class="text-xs-center subheading py-2 grey lighten-3 job-similar-title">
            <v-icon class="mx-1">iconfont icon-dot</v-icon>
            <div>类似职位推荐</div>
            <v-icon class="mx-1">iconfont icon-dot</v-icon>
          </v-layout>
          <job-item></job-item>
          <job-item></job-item>
          <job-item></job-item>
        </div>
        <div class="job-detail-action">
          <bottom-btns>
            <v-btn slot="no"
                   color="white"
                   class="ma-0"
                   depressed
                   large
                   block
                   @click="addToCollection({id:$route.params.id})">
              <v-icon color="accent"
                      class="icon--text">iconfont icon-star</v-icon>
              已收藏
            </v-btn>
            <v-btn slot="yes"
                   color="primary"
                   class="ma-0"
                   depressed
                   large
                   block>报名参加</v-btn>
          </bottom-btns>
        </div>
      </v-tab-item>
      <v-tab-item class="job-detail-item">
        <corp-item disableStatus
                   class="white"></corp-item>
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
        <div class="pb-3">
          <div class="job-detial-title subheading border-bottom py-2 px-3">公司介绍</div>
          <p class="pa-3 mb-0 rich-text"
             v-html="c"></p>
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
import { mapActions } from 'vuex'
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
    active: null,
    isCollected: false,
    a: `急招传单派发人员60名，周末，平时，节假日。
工资待遇：无责任底薪120元天日结，男女不限，16到25岁之间，做事认真踏实，不乱扔单页。
工作时间：上午9点到下午6点，下午半天，半天2点到6点
工作地点：成都市区各大商场及郊县大学食堂门口就近安排，工资做完就结，不拖欠，能做的请发送简历，谢谢`,
    b: `1、金融IT系统研发工作；
2、进行系统的需求分析、架构设计以及产品规划相关工作；
3、参与核心模块编写，问题分析等工作；
4、协助主管进行团队管理、能力建设相关工作；
5、良好的文档编写能力；协调沟通能力；项目管理能力。 `,
    c: `华为是谁？
华为是全球领先的ICT（信息与通信）基础设施和智能终端提供商，致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界。我们在通信网络、IT、智能终端和云服务等领域为客户提供有竞争力、安全可信赖的产品、解决方案与服务，与生态伙伴开放合作，持续为客户创造价值，释放个人潜能，丰富家庭生活，激发组织创新。华为坚持围绕客户需求持续创新，加大基础研究投入，厚积薄发，推动世界进步。华为成立于1987年，是一家由员工持有全部股份的民营企业，目前有18万员工，业务遍及170多个国家和地区。

我们为世界带来了什么？
为客户创造价值。华为和运营商一起，在全球建设了1,500多张网络，帮助世界超过三分之一的人口实现联接。华为携手合作伙伴，为政府及公共事业机构，金融、能源、交通、制造等企业客户，提供开放、灵活、安全的端管云协同ICT基础设施平台，推动行业数字化转型；为云服务客户提供稳定可靠、安全可信和可持续演进的云服务。华为智能终端和智能手机，正在帮助人们享受高品质的数字工作、生活和娱乐体验。

推动产业良性发展。华为主张开放、合作、共赢，与客户合作伙伴及友商合作创新、扩大产业价值，形成健康良性的产业生态系统。华为加入360多个标准组织、产业联盟和开源社区，积极参与和支持主流标准的制定、构建共赢的生态圈。我们面向云计算、NFV/SDN、5G等新兴热点领域，与产业伙伴分工协作，推动产业持续良性发展。

促进经济增长。华为不仅为所在国家带来直接的税收贡献，促进当地就业，形成产业链带动效应，更重要的是通过创新的ICT解决方案打造数字化引擎，推动各行各业数字化转型，促进经济增长，提升人们的生活质量与福祉。

推动社会可持续发展。作为负责任的企业公民，华为致力于消除全球数字鸿沟，在珠峰南坡和北极圈内，在西非埃博拉疫区、日本海啸核泄漏、中国汶川大地震等重大灾难现场，都有华为人的身影；推进绿色、低碳的环保理念，从产品规划、设计、研发、制造、交付以及运维，华为向客户提供领先的节能环保产品和解决方案；华为“未来种子”项目已经覆盖108个国家和地区，帮助培养本地ICT人才，推动知识迁移，提升人们对于ICT行业的了解和兴趣，并鼓励各国家及地区参与到建设数字化社区的工作中。

为奋斗者提供舞台。华为坚持“以奋斗者为本”，以责任贡献来评价员工和选拔干部，为员工提供了全球化发展平台、与世界对话的机会，使大量年轻人有机会担当重任，快速成长，也使得十几万员工通过个人的努力，收获了合理的回报与值得回味的人生经历。

我们坚持什么？
华为30年坚持聚焦在主航道，抵制一切诱惑；坚持不走捷径，拒绝机会主义，踏踏实实，长期投入，厚积薄发；坚持以客户为中心，以奋斗者为本，长期艰苦奋斗，坚持自我批判。

我们不会辜负时代慷慨赋予我们的历史性机遇，为构建万物互联的智能世界，一往无前。`,
    center: { lng: 0, lat: 0 },
    zoom: 3
  }),
  methods: {
    ...mapActions({
      fetchJob: 'job/fetchJob',
      addToCollection: 'job/addToCollection'
    }),
    mapReady({ BMap, map }) {
      console.log(BMap, map)
    }
  },
  mounted() {
    this.fetchJob({ id: this.$route.params.id }).then(res => {})
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
