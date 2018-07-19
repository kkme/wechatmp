<template>
  <v-app light>
    <v-toolbar flat
               fixed
               app
               dense
               :clipped-left="clipped">
      <v-btn icon
             @click.stop="clipped = !clipped">
        <v-icon class="iconfont icon-left"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '懒虫动动兼职平台'
    }
  }
}
</script>
