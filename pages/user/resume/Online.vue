<template>
  <div class="resume-online white">
    <base-divider></base-divider>
    <v-layout align-center
              class="px-3 pb-2">
      <v-flex>
        <div class="subheading">QWERT
          <v-btn icon
                 nuxt
                 to="/user/resume/info"
                 class="mx-0">
            <v-icon color="primary">iconfont icon-edit</v-icon>
          </v-btn>
        </div>
        <div>
          <span>男</span>
          <span>22</span>
          <span>汉族</span>
          <span>学生</span>
        </div>
        <div>学历：
          <span>大专</span>
        </div>
      </v-flex>
      <img class="avatar-lg"
           src="@img/avatar.jpg" />
    </v-layout>

    <base-divider></base-divider>
    <div class="px-3 pb-2 resume-online-contact">
      <v-layout class="border-bottom"
                align-center>
        <div class="subheading">通讯信息</div>
        <v-spacer></v-spacer>
        <v-btn icon
               nuxt
               to="/user/resume/contact"
               class="ma-0">
          <v-icon color="primary">iconfont icon-edit</v-icon>
        </v-btn>
      </v-layout>
      <v-layout class="py-2"
                wrap>
        <div class="d-flex">
          <simple-svg :filepath="require('@svg/phone.svg')" />13551065642</div>
        <v-spacer></v-spacer>
        <div class="d-flex">
          <simple-svg :filepath="require('@svg/wechat.svg')" />13551066564</div>
      </v-layout>
      <v-layout class="py-2"
                wrap>
        <div class="d-flex">
          <simple-svg :filepath="require('@svg/mail.svg')" />lirunw@gmail.com</div>
        <v-spacer></v-spacer>
        <div class="d-flex">
          <simple-svg :filepath="require('@svg/qq.svg')" />363372111</div>
      </v-layout>
    </div>

    <base-divider></base-divider>
    <div>
      <div class="px-3">
        <v-layout class="border-bottom py-2"
                  align-center>
          <div class="subheading">学历信息</div>
        </v-layout>
        <div class="resume-online-item mt-3">
          <v-layout align-center
                    :class="n!==3 ? 'mb-3' : ''"
                    v-for="n of 3"
                    :key="n">
            <div class="resume-online-item-icon mr-3 white">
              <simple-svg :filepath="listIcon" />
            </div>
            <v-flex>
              <div>2013-09 - 2016-08</div>
              <div class="py-1">加速度按时间段大学</div>
              <div class="caption text-muted">艺术设计 | 本科</div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn icon
                   nuxt
                   to="/user/resume/edu"
                   class="ma-0">
              <v-icon color="primary">iconfont icon-edit</v-icon>
            </v-btn>
          </v-layout>
        </div>
      </div>
      <div class="mt-3 border-top">
        <v-btn flat
               block
               large
               nuxt
               to="/user/resume/edu"
               class="ma-0">
          <v-icon color="primary"
                  class="mx-2">iconfont icon-plus</v-icon>添加学历信息
        </v-btn>
      </div>
    </div>

    <base-divider></base-divider>
    <div>
      <div class="px-3">
        <v-layout class="border-bottom py-2"
                  align-center>
          <div class="subheading">工作经验</div>
        </v-layout>
        <div class="resume-online-item mt-3">
          <v-layout align-center
                    :class="n!==5 ? 'mb-3' : ''"
                    v-for="n of 5"
                    :key="n">
            <div class="resume-online-item-icon mr-3 white">
              <simple-svg :filepath="listIcon" />
            </div>
            <v-flex>
              <div>销售顾问︱兼职</div>
              <div class="py-1">成都海天物流有限责任公司</div>
              <div class="caption text-muted">2015.09.08-2016.08.09</div>
              <div class="caption text-muted mt-2">
                <div>工作内容：</div>
                <p>
                  1,负责公司产品的销售服务和客户咨询服务<br>2,负责公司产品的销售服务和客户咨询服务<br>3,负责公司产品的销售服务和客户咨询服务
                </p>
              </div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn icon
                   nuxt
                   to="/user/resume/exp"
                   class="ma-0">
              <v-icon color="primary">iconfont icon-edit</v-icon>
            </v-btn>
          </v-layout>
        </div>
      </div>
      <div class="mt-3 border-top">
        <v-btn flat
               block
               large
               nuxt
               to="/user/resume/exp"
               class="ma-0">
          <v-icon color="primary"
                  class="mx-2">iconfont icon-plus</v-icon>添加工作经验
        </v-btn>
      </div>
    </div>

    <base-divider></base-divider>
    <div class="px-3 pb-2">
      <v-layout class="border-bottom"
                align-center>
        <div class="subheading">自我评价</div>
        <v-spacer></v-spacer>
        <v-btn icon
               nuxt
               to="/user/resume/about"
               class="ma-0">
          <v-icon color="primary">iconfont icon-edit</v-icon>
        </v-btn>
      </v-layout>
      <p class="py-3 mt-1">
        本人性格开朗、稳重、有活力，待人热情、真诚；工作认真负责，积极主动对待工作认真负责，善于沟通、协调有较强的组织能力与团队精神；活泼开朗、乐观上进、有爱心并善于施教并行。
      </p>
    </div>

    <base-divider></base-divider>
    <div class="px-3 pb-2">
      <v-layout class="border-bottom"
                align-center>
        <div class="subheading">能力及特长</div>
        <v-spacer></v-spacer>
        <v-btn icon
               nuxt
               to="/user/resume/skill"
               class="ma-0">
          <v-icon color="primary">iconfont icon-edit</v-icon>
        </v-btn>
      </v-layout>
      <p class="py-3 mt-1">
        1：从小学习绘画，功底不错。 2：班上担任班干部，团队领导能力和协作能力比较突出，在校期间经常获得奖学金。 3：会跳些许简单的舞蹈，和一些乐器。
      </p>
    </div>

    <base-divider></base-divider>
  </div>
</template>

<script>
export default {
  head: () => ({
    title: '在线简历'
  }),
  meta: {
    title: '在线简历'
  },
  data: () => ({
    listIcon: require('@svg/resume_online_item_icon.svg')
  })
}
</script>

<style lang="scss">
.resume-online {
  .resume-online-contact {
    svg {
      .st1 {
        fill: #666666;
      }
      .st2 {
        fill: #cccccc;
      }
      .st3 {
        fill: #ffffff;
      }
    }
  }
  .resume-online-item {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 0;
      left: $svg-icon-width / 2;
      transform: translateX(-50%);
      z-index: 0;
      border-left: 1px solid $border-color;
    }
    .resume-online-item-icon {
      position: relative;
      z-index: 2;
      padding: 2px 0;
      .st1 {
        fill: #73b256;
      }
      .st2 {
        fill: #c8efb6;
      }
    }
  }
}
</style>
