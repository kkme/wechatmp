<template>
  <v-layout class="user-certification white px-4"
            justify-space-around
            column>
    <div class="subheading">请完善你的资料</div>
    <v-layout class="user-certification-action white--text mb-3"
              justify-space-around
              column>
      <v-layout class="user-certification-not-student image--bg mb-3 py-3"
                fill-height
                justify-space-around
                align-center
                column
                v-if="!idcard.id"
                @click="$router.push('/user/certification/identity')">
        <div class="user-certification-avatar mt-1">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 1024 1024">
            <path fill="#FFA433"
                  d="M877.9,165H144.7c-44.9,0-81.5,36.4-81.5,81.5v520c0,44.9,36.4,91,81.5,91
                    h733.2c44.9,0,81.5-46.1,81.5-91v-520C959.4,201.4,922.9,165,877.9,165z M332,324.3c49.5,0,89.7,40.7,89.7,91s-40.2,91-89.7,91
                    s-89.7-40.7-89.7-91C242.5,365.1,282.6,324.3,332,324.3z M154.2,688.5c11-89.9,86.5-159.3,177.8-159.3s166.8,69.6,177.8,159.3
                    H154.2z M869.7,599.9c0,11.2-9.1,20.3-20.3,20.3H598.8c-11.2,0-20.3-9.1-20.3-20.3v-4.8c0-11.2,9.1-20.3,20.3-20.3h250.6
                    c11.2,0,20.3,9.1,20.3,20.3V599.9z M869.7,508.8c0,11.2-9.1,20.3-20.3,20.3H598.8c-11.2,0-20.3-9.1-20.3-20.3v-4.8
                    c0-11.2,9.1-20.3,20.3-20.3h250.6c11.2,0,20.3,9.1,20.3,20.3V508.8z M869.7,417.7c0,11.2-9.1,20.3-20.3,20.3H598.8
                    c-11.2,0-20.3-9.1-20.3-20.3V413c0-11.2,9.1-20.3,20.3-20.3h250.6c11.2,0,20.3,9.1,20.3,20.3V417.7z" />
          </svg>
        </div>
        <div class="subheading">实名认证</div>
        <div>- 上传身份证信息完成认证 -</div>
      </v-layout>
      <v-layout class="user-certification-not-student image--bg mb-3 py-3 h-100"
                align-center
                justify-space-between
                column
                v-else>
        <v-layout class="mt-4 w-100"
                  align-center>
          <span class="avatar flex-auto ml-4 mr-3">
            <img src="@img/img0.png"
                 alt=""
                 class="w-100">
          </span>
          <v-flex>
            <div>{{idcard.name}}</div>
            <div>{{idcard.idcard}}</div>
          </v-flex>
          <div class="flex-auto">
            <div class="user-certification-status">{{idcard.checkstatus}}</div>
          </div>
        </v-layout>
        <div style="align-self: flex-end"
             class="mx-3 mt-5">提交时间：{{idcard.certifiedtime}}</div>
      </v-layout>
      <v-layout class="user-certification-student image--bg mt-3 py-3"
                fill-height
                justify-space-around
                align-center
                column
                v-if="!student.id"
                @click="$router.push('/user/certification/student')">
        <div class="avatar"><img src="@img/student.png"></div>
        <div class="subheading">学生认证</div>
        <div>- 上传学生证信息完成认证 -</div>
      </v-layout>
      <v-layout class="user-certification-student image--bg mt-3 py-3 h-100"
                align-center
                justify-space-between
                column
                v-else>
        <v-layout class="mt-4 w-100"
                  align-center>
          <span class="avatar flex-auto ml-4 mr-3">
            <img src="@img/img1.png"
                 alt=""
                 class="w-100">
          </span>
          <v-flex>
            <div>{{student.schoolname}}</div>
            <div>{{student.studentid}}</div>
          </v-flex>
          <div class="flex-auto">
            <div class="user-certification-status">{{student.checkstatus}}</div>
          </div>
        </v-layout>
        <div style="align-self: flex-end"
             class="mx-3 mt-5">提交时间：{{student.certifiedtime}}</div>
      </v-layout>
    </v-layout>
    <div class="text-xs-center text-muted caption">完成认证，增加信用、奖励积分，获得更优质的工作</div>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  head: () => ({
    title: '实名认证'
  }),
  meta: {
    title: '实名认证'
  },
  data: () => ({
    idcard: {},
    student: {}
  }),
  computed: {
    ...mapGetters({
      collections: 'users/collections'
    })
  },
  methods: {
    ...mapActions({
      fetchCertification: 'users/fetchCertification'
    })
  },
  created() {
    this.fetchCertification({}).then(res => {
      if (res && res.iDcardVerified) {
        this.idcard = res.iDcardVerified
      }
      if (res && res.studendVerified) {
        this.student = res.studendVerified
      }
    })
  }
}
</script>

<style lang="scss">
.user-certification {
  height: calc(100vh - 48px);
  .user-certification-action {
    height: 60vh;
    flex: 0 0 60vh;
    > div {
      border-radius: $border-radius * 1.5;
    }
  }
  .user-certification-avatar {
    width: 50px;
    height: 50px;
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;
  }
  .user-certification-not-student {
    background-image: url('~@img/certification_bg_yellow.jpg');
    svg {
      width: 100%;
    }
  }
  .user-certification-student {
    background-image: url('~@img/certification_bg_blue.jpg');
  }
  .user-certification-status {
    background-color: $white;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    color: $accent;
    padding: 0.1rem 1rem;
  }
}
</style>
