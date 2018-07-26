<template>
  <div class="white">
    <v-layout align-center
              pa-3>
      <img src="@img/avatar.jpg"
           class="avatar">
      <v-flex class="pl-3">
        <v-layout class="subheading"
                  align-center>
          <span>{{ baseInfo.name }}</span>
          <nuxt-link to="/user/certification">
            <simple-svg class="certification ml-3"
                        :class="{ checked: !!baseInfo.checkStatusIDcard, 'mt-1': !baseInfo.checkStatusIDcard }"
                        :filepath="require(`~/static/svg/certification.svg`)" />
          </nuxt-link>

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
        <nuxt-link to="/user/resume"
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
                        ['nuxt']: item.icon !== 'contactus',
                        ['to']: item.icon !== 'contactus' ? item.href : '',
                        ['href']: item.icon === 'contactus' ?  item.href : '',
                        ['rel']: item.icon === 'contactus' ?  'nofollow' : '',
                     }"
                     :key="index">

          <simple-svg v-if="item.icon"
                      :filepath="require(`~/static/svg/${item.icon}.svg`)" />

          <v-list-tile-content class="pl-2">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>

          <simple-svg :filepath="require('~/static/svg/right.svg')" />
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
      { icon: 'collection', title: '我的收藏', href: '/user/collection' },
      { icon: 'history', title: '浏览记录', href: '/user/history' },
      { icon: 'comment', title: '我的评价', href: '/user/comment' },
      { icon: 'safety', title: '账户安全', href: '/user/account' },
      {
        icon: 'contactus',
        title: '联系客服',
        href: `tel:${constant.CUSTOM_SERVICE_TEL}`
      },
      { icon: 'feedback', title: '投诉反馈', href: '/user/feedback' },
      { icon: 'setting', title: '设置', href: '/user/setting' }
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
