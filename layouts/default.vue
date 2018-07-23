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
      <v-container class="pa-0">
        <nuxt />
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
      // console.log(this)

      return this.$store.app.head.title || ''
    }
  },
  mounted() {
    console.log(this.$children[0].$children[1].$children[0].$children[0].$metaInfo.title)
  }
}
</script>
