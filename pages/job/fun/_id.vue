<template>
  <div v-if="detail">
    <img :src="baseUrl+detail.contentImage"
         class="w-100">
    <div class="white pa-3">
      <v-layout>
        <v-card class="ma-0 py-0 fun-thumb flex-auto">
          <v-card-media class="white--text"
                        height="80px"
                        :src="require('@img/avatar.jpg')">
            <v-layout column
                      justify-space-between>
              <v-spacer></v-spacer>
              <div class="fun-thumb-text text-xs-center">预约</div>
            </v-layout>
          </v-card-media>
        </v-card>
        <v-flex class="caption ml-3">
          <v-layout align-center>
            <div class="body-2">孔卡卡氨基酸的暗杀教室是是</div>
            <v-spacer></v-spacer>
            <v-btn small
                   color="primary"
                   class="my-0 mr-0">预约</v-btn>
          </v-layout>
          <div class="grey--text text--darken-2">活动时间：2018.09.01-2057.05.52</div>
          <div class="grey--text text--darken-2">活动地址：四川省睡觉觉阿加速度爱神的箭傻大姐</div>
        </v-flex>
      </v-layout>
      <div class="caption">
        <v-layout align-center
                  class="mb-2">
          <span class="subheading">预约时间</span>
          <v-spacer class="border-bottom-dash mx-2"></v-spacer>
          <span class="subheading primary--text">已签到</span>
        </v-layout>
        <div class="grey--text text--darken-2">签到时间：2018年9月15日 13:00</div>
        <div class="grey--text text--darken-2">验证码：
          <span class="body-2 primary--text">890585
            <span class="error--text ml-1 caption">
              <v-icon class="icon--text ma-0"
                      color="error">iconfont icon-warning</v-icon>
              请在体验时将验证码出示给体验提供方
            </span>
          </span>
        </div>
        <div class="grey--text text--darken-2">
          预约时间：2018年05月05日 15:00 - 2018年05月05日 15:00
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constant from '@const/public'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {},
  head: () => ({
    title: '趣味体验详情'
  }),
  meta: {
    title: '趣味体验详情'
  },
  data: () => ({
    detail: null,
    baseUrl: constant.BASE_URL
  }),
  computed: {
    ...mapGetters({
      funEvents: 'fun/funEvents',
      appliedFunEvents: 'fun/appliedFunEvents',
      comments: 'fun/comments'
    })
  },
  methods: {
    ...mapActions({
      fetchFunEventDetail: 'fun/fetchFunEventDetail',
      applyFunEvent: 'fun/applyFunEvent',
      reserveFunEvent: 'fun/reserveFunEvent'
    }),
    apply() {
      this.applyFunEvent({ recruitmentid: '1533717973543403', comid: '1532011309399128' })
    }
  },
  mounted() {
    let id = this.$route.params.id
    if (!id) {
      this.$route.replace('/job/fun')
    } else {
      this.fetchFunEventDetail({ id }).then(res => {
        this.detail = res
      })
    }
  }
}
</script>

<style lang="scss">
.fun-thumb {
  width: 80px;
  height: 80px;
  .fun-thumb-text {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
