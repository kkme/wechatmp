<template>
  <div class="white">
    <v-layout align-center
              pa-3>
      <img src="@img/avatar.jpg"
           class="avatar">
      <v-flex class="pl-3">
        <div class="subheading">马小姐爱</div>
        <div class="grey--text">等级：66</div>
      </v-flex>
      <v-btn color="primary"
             small
             class="mr-0">邀请赚钱</v-btn>
    </v-layout>
    <v-layout class="text-xs-center py-2 border-top">
      <v-flex>
        <div class="primary--text subheading">36</div>
        <div class="grey--text">信誉</div>
      </v-flex>
      <v-flex>
        <div class="primary--text subheading">400</div>
        <div class="grey--text">积分</div>
      </v-flex>
      <v-flex>
        <div class="error--text subheading">250</div>
        <div class="grey--text">钱包</div>
      </v-flex>
    </v-layout>
    <base-divider></base-divider>
    <v-layout class="center-shortcut pa-3 text-xs-center">
      <v-flex xs6>
        <div class="mr-2 center-resume d-flex align-center justify-center rounded">
          <span>我的简历<br>
            <span class="grey--text caption">完善简历提高您的录取率</span>
          </span>
        </div>
      </v-flex>
      <v-flex xs6>
        <div class="ml-2 center-custom d-flex align-center justify-center rounded">
          <span>定制推荐<br>
            <span class="grey--text caption">精准岗位匹配和推荐</span>
          </span>
        </div>
      </v-flex>
    </v-layout>
    <base-divider></base-divider>
    <v-list dense
            flat
            class="py-0 center-links">
      <template v-for="(item, index) in items">
        <v-list-tile :class="{'border-top': index !== 0}"
                     nuxt
                     :key="index"
                     :to="item.href">

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
export default {
  head: () => ({
    title: '个人中心'
  }),
  data: () => ({
    items: [
      { icon: 'collection', title: '我的收藏', href: '/user/collection' },
      { icon: 'history', title: '浏览记录', href: '/user/history' },
      { icon: 'comment', title: '我的评价', href: '/user/comment' },
      { icon: 'safety', title: '账户安全', href: '/user/safety' },
      { icon: 'contactus', title: '联系客服', href: '/user/contactus' },
      { icon: 'feedback', title: '投诉反馈', href: '/user/feedback' },
      { icon: 'setting', title: '设置', href: '/user/setting' }
    ]
  })
}
</script>

<style lang="scss">
.center-shortcut {
  .center-resume,
  .center-custom {
    background: no-repeat center;
    background-size: 100%;
    min-height: 70px;
  }
  .center-resume {
    background-image: url('~@img/center-bg-1.jpg');
  }
  .center-custom {
    background-image: url('~@img/center-bg-2.jpg');
  }
}
.center-links {
  .svg {
    width: 1.5rem;
  }
}
</style>
