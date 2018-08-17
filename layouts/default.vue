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
    <v-snackbar v-model="showSnackbar"
                :timeout="3000"
                top
                center
                :color="snackbar.color ? snackbar.color : 'primary'"
                auto-height>
      {{snackbar.msg}}
      <v-spacer></v-spacer>
      <v-btn color="currentColor"
             flat
             icon
             @click="showSnackbar = false">
        <v-icon>iconfont icon-x</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav'
import { mapGetters } from 'vuex'
export default {
  components: {
    BottomNav
  },
  middleware: 'meta',
  data() {
    return {
      bottomNav: 'center',
      showSnackbar: false
    }
  },
  computed: {
    ...mapGetters({
      snackbar: 'sys/snackbar'
    }),
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
  },
  watch: {
    snackbar(newValue) {
      this.showSnackbar = newValue.show
    }
  }
}
</script>
<style scss="lang">
.main-container {
  height: 100%;
}
</style>
