<template>
  <div class="white">
    <v-layout align-center
              pa-3>
      <img :src="baseInfo.avatar"
           class="avatar">
      <v-flex class="pl-3">
        <v-layout class="subheading"
                  align-center>
          <span>{{ baseInfo.name }}</span>

          <v-btn small
                 icon
                 @click="$router.push({name: 'user-certification'})">
            <svg-certification class="certification svg-sm"
                               :class="{ checked: !!baseInfo.checkStatusIDcard, 'mt-1': !baseInfo.checkStatusIDcard }" />
          </v-btn>
        </v-layout>

        <div class="grey--text">等级：{{ baseInfo.level }}</div>
      </v-flex>
      <v-btn color="primary"
             small
             class="mr-0">邀请加入</v-btn>
    </v-layout>
    <v-layout class="text-xs-center border-top user-center-balance">
      <v-flex>
        <nuxt-link to="/user/score"
                   class="py-2"
                   v-ripple>
          <div class="primary--text subheading">{{ baseInfo.reputation }}</div>
          <div class="grey--text">信誉</div>
        </nuxt-link>
      </v-flex>
      <v-flex>
        <nuxt-link to="/user/points"
                   class="py-2"
                   v-ripple>
          <div class="primary--text subheading">{{ baseInfo.integra }}</div>
          <div class="grey--text">积分</div>
        </nuxt-link>
      </v-flex>
      <v-flex>
        <nuxt-link to="/user/wallet"
                   class="py-2"
                   v-ripple>
          <div class="error--text subheading">{{ baseInfo.balance}}</div>
          <div class="grey--text">钱包</div>
        </nuxt-link>
      </v-flex>
    </v-layout>
    <base-divider></base-divider>
    <v-layout class="user-center-shortcut pa-3 text-xs-center">
      <v-flex xs6>
        <nuxt-link to="/user/resume/online"
                   class="mr-2 user-center-resume d-flex align-center justify-center rounded text--primary">
          <span>我的简历<br>
            <span class="grey--text caption">完善简历提高您的录取率</span>
          </span>
        </nuxt-link>
      </v-flex>
      <v-flex xs6>
        <div class="ml-2 user-center-custom d-flex align-center justify-center rounded">
          <span>定制推荐<br>
            <span class="grey--text caption">精准岗位匹配和推荐</span>
          </span>
        </div>
      </v-flex>
    </v-layout>
    <base-divider></base-divider>
    <v-list dense
            flat
            class="py-0 user-center-links">
      <template v-for="(item, index) in items">
        <v-list-tile :class="{'border-top': index !== 0}"
                     v-bind="{
                        ['nuxt']: item.icon !== 'svg-contactus',
                        ['to']: item.icon !== 'svg-contactus' ? item.href : '',
                        ['href']: item.icon === 'svg-contactus' ?  item.href : '',
                        ['rel']: item.icon === 'svg-contactus' ?  'nofollow' : '',
                     }"
                     :key="index">

          <component v-if="item.icon"
                     :is="item.icon"
                     class="svg-sm" />

          <v-list-tile-content class="pl-2">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>

          <svg-right class="svg-sm" />
        </v-list-tile>
        <base-divider :key="item.icon"
                      v-if="index !== 0 && (index + 1) % 4 === 0 && (index + 1) !== item.length"></base-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
import constant from '@const/public'
import { mapActions, mapGetters } from 'vuex'
export default {
  head: () => ({
    title: '个人中心'
  }),
  meta: {
    title: '个人中心'
  },
  data: () => ({
    items: [
      { icon: 'svg-collection', title: '我的收藏', href: '/user/collection' },
      { icon: 'svg-history', title: '我的足迹', href: '/user/history' },
      { icon: 'svg-comment', title: '我的评价', href: '/user/comment' },
      { icon: 'svg-safety', title: '账户安全', href: '/user/account' },
      {
        icon: 'svg-contactus',
        title: '联系客服',
        href: `tel:${constant.CUSTOM_SERVICE_TEL}`
      },
      { icon: 'svg-feedback', title: '投诉反馈', href: '/user/feedback' },
      { icon: 'svg-setting', title: '设置', href: '/user/setting' }
    ]
  }),
  computed: {
    ...mapGetters({
      baseInfo: 'users/baseInfo'
    })
  },
  methods: {
    ...mapActions({
      fetchBaseInfo: 'users/fetchBaseInfo'
    })
  },
  mounted() {
    this.fetchBaseInfo()
  }
}
</script>

<style lang="scss">
.user-center-balance {
    a {
        display: block;
        height: 100%;
        width: 100%;
    }
    user-select: none;
}
.user-center-shortcut {
    .user-center-resume,
    .user-center-custom {
        background: no-repeat center;
        background-size: 100%;
        min-height: 70px;
    }
    .user-center-resume {
        background-image: url('~@img/center-bg-1.jpg');
    }
    .user-center-custom {
        background-image: url('~@img/center-bg-2.jpg');
    }
}
.user-center-links {
    .svg {
        width: 1.5rem;
    }
}
.certification {
    .st0 {
        fill: #ffa433;
    }
    .st1 {
        fill: transparent;
    }
    &.checked {
        .st1 {
            fill: #87b953;
        }
    }
    svg {
        width: 2em;
        height: 2em;
    }
}
</style>
