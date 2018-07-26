<template>
  <v-list dense
          flat
          class="py-0">
    <v-list-tile nuxt
                 to="/user/resume/online">
      <v-list-tile-content>
        <v-list-tile-title>在线简历</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted font-weight-bold">已完成：</span>
      <span class="success--text body-2">40%</span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>

    <v-divider class="mx-3"></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>附件简历</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted">已上传</span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>

    <v-divider class="mx-3"></v-divider>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>默认投递简历</v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <span class="caption text-muted">附件简历</span>
      <simple-svg :filepath="iconRight" />
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  head: () => ({
    title: '我的简历'
  }),
  meta: {
    title: '我的简历'
  },
  data: () => ({
    iconRight: require('~/static/svg/right.svg')
  }),
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser'
    })
  },
  mounted() {
    console.log(1)

    // this.fetchUser()
  }
}
</script>

<style>
</style>
