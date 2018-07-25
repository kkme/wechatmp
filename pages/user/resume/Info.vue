<template>
  <v-list dense
          flat
          class="py-0">
    <v-list-tile nuxt
                 to="/user/resume/online">
      <v-list-tile-content>
        <v-list-tile-title>个人头像</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted font-weight-bold">已完成：</span>
      <span class="success--text body-2">40%</span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>

    <v-divider class="mx-3"></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>真实姓名</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <base-input placeholder="请输入真实姓名"
                  class="input-rtl"></base-input>
    </v-list-tile>

    <v-divider class="mx-3"></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>最高学历</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted">高中</span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>

    <v-divider class="mx-3"></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>性别</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted">女</span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>
    <v-divider class="mx-3"></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>身份</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted">非学生</span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>
    <v-divider class="mx-3"></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>民族</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted">汉</span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>
    <v-divider class="mx-3"></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>出生年月</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted">
        <base-birthday-picker></base-birthday-picker>
      </span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>
    <v-divider class="mx-3"></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>居住地</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted">成都</span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>
    <v-divider class="mx-3"></v-divider>

  </v-list>
</template>

<script>
export default {
  head: () => ({
    title: '基本信息'
  }),
  meta: {
    title: '基本信息'
  },
  data: () => ({
    iconRight: require('~/static/svg/right.svg')
  })
}
</script>

<style>
</style>
