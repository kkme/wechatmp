<template>
  <v-app light>
    <v-toolbar flat
               fixed
               app
               dense
               clipped-left
               color="white"
               class="border-bottom">
      <v-btn icon
             @click.stop="$router.back">
        <v-icon class="iconfont icon-left"></v-icon>
      </v-btn>
      <div v-text="title"></div>
    </v-toolbar>
    <v-content>
      <v-container class="pa-0 main-container">
        <nuxt/>
      </v-container>
    </v-content>
    <bottom-nav v-if="path"></bottom-nav>
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav'
export default {
  components: {
    BottomNav
  },
  middleware: 'meta',
  data() {
    return {
      bottomNav: 'center'
    }
  },
  computed: {
    path() {
      let p = this.$route.fullPath
      if (p) p = p.trim().split('/')
      else return false

      return p.length === 2
    },
    title() {
      let meta = this.$store.getters['sys/meta']
      return meta ? meta.title || '懒虫动动兼职平台' : '懒虫动动兼职平台'
    }
  }
}
</script>
<style scss="lang">
.main-container {
  height: 100%;
}
</style>
