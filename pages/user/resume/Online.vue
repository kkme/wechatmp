<template>
  <div class="resume-online white"
       v-if="userInfo">
    <base-divider></base-divider>
    <v-layout align-center
              class="px-3 pb-2"
              v-if="userInfo">
      <v-flex>
        <div class="subheading">{{userInfo.name}}
          <v-btn icon
                 nuxt
                 to="/user/resume/info"
                 class="mx-0">
            <v-icon color="primary">iconfont icon-edit</v-icon>
          </v-btn>
        </div>
        <div>
          <span>{{userInfo.sex}}</span>
          <span>{{userInfo.family}}</span>
          <span>{{userInfo.identitytype}}</span>
        </div>
        <div>学历：
          <span>{{userInfo.education | valueToLabel(eduList)}}</span>
        </div>
      </v-flex>
      <img class="avatar-lg"
           :src="userInfo.avatar" />
    </v-layout>

    <base-divider></base-divider>
    <div class="px-3 pb-2 resume-online-contact"
         v-if="userInfo">
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
          <svg-phone class="svg-sm" />{{userInfo.tel}}</div>
        <v-spacer></v-spacer>
        <div class="d-flex">
          <svg-wechat class="svg-sm" />{{userInfo.wechat}}</div>
      </v-layout>
      <v-layout class="py-2"
                wrap>
        <div class="d-flex">
          <svg-mail class="svg-sm" />{{userInfo.email}}</div>
        <v-spacer></v-spacer>
        <div class="d-flex">
          <svg-qq class="svg-sm" />{{userInfo.qq}}</div>
      </v-layout>
    </div>

    <base-divider></base-divider>
    <div>
      <div class="px-3">
        <v-layout class="border-bottom py-2"
                  align-center>
          <div class="subheading">学历信息</div>
        </v-layout>
        <div class="resume-online-item mt-3"
             v-if="education">
          <v-layout align-center
                    v-for="(edu, index) of education"
                    :class="index!== education.length - 1 ? 'mb-3' : ''"
                    :key="index">
            <div class="resume-online-item-icon mr-3 white">
              <SvgResumeItemListIcon class="svg-sm" />
            </div>
            <v-flex>
              <div>{{edu.admissiontime}} - {{edu.graduationtime}}</div>
              <div class="py-1">{{edu.schoolname}}</div>
              <div class="caption text-muted">{{edu.professionname}} | {{edu.educationtype}}</div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn icon
                   nuxt
                   :to="{ name: 'user-resume-Edu', params: { edu }}"
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
        <div class="resume-online-item mt-3"
             v-if="exps">
          <v-layout align-center
                    v-for="(exp, index) of exps"
                    :class="index!==exps.length-1 ? 'mb-3' : ''"
                    :key="index">
            <div class="resume-online-item-icon mr-3 white">
              <SvgResumeItemListIcon class="svg-sm" />
            </div>
            <v-flex>
              <div>{{exp.post}}︱{{exp.worktype}}</div>
              <div class="py-1">{{exp.comname}}</div>
              <!-- <div class="caption text-muted">2015.09.08-2016.08.09</div> -->
              <div class="caption text-muted mt-2">
                <div>工作内容：</div>
                <div class="rich-text"
                     v-html="exp.description"></div>
              </div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn icon
                   nuxt
                   :to="{ name: 'user-resume-Exp', params: { exp }}"
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
               v-if="userInfo"
               :to="{ name: 'user-resume-About', params: { about: userInfo.selfevaluation }}"
               class="ma-0">
          <v-icon color="primary">iconfont icon-edit</v-icon>
        </v-btn>
      </v-layout>
      <div class="py-3 mt-1 rich-text"
           v-if="userInfo"
           v-html="userInfo.selfevaluation"></div>
    </div>

    <base-divider></base-divider>
    <div class="px-3 pb-2">
      <v-layout class="border-bottom"
                align-center>
        <div class="subheading">能力及特长</div>
        <v-spacer></v-spacer>
        <v-btn icon
               nuxt
               v-if="userInfo"
               :to="{ name: 'user-resume-Skill', params: { skill: userInfo.abilityppecialty }}"
               class="ma-0">
          <v-icon color="primary">iconfont icon-edit</v-icon>
        </v-btn>
      </v-layout>
      <div class="py-3 mt-1 rich-text"
           v-if="userInfo"
           v-html="userInfo.abilityppecialty"></div>
    </div>

    <base-divider></base-divider>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { eduList } from '@const'
export default {
  head: () => ({
    title: '在线简历'
  }),
  meta: {
    title: '在线简历'
  },
  data: () => ({eduList}),
  computed: {
    ...mapGetters({
      resume: 'users/resume'
    }),
    userInfo() {
      return this.resume.userInfo
    },
    education() {
      return this.resume.education
    },
    exps() {
      return this.resume.wordExperience
    }
  },
  methods: {
    ...mapActions({
      fetchResume: 'users/fetchResume'
    })
  },
  mounted() {
    this.fetchResume()
  }
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
