<template>
  <div class="job">
    <div class="job-carousel_wrap">
      <v-carousel hide-controls
                  interval="3000"
                  class="job-carousel elevation-0"
                  delimiter-icon="iconfont icon-dot">
        <v-carousel-item v-for="(item,i) in items"
                         :key="i"
                         :src="item.src"
                         reverse-transition="fade"
                         transition="fade"></v-carousel-item>
      </v-carousel>
      <job-searsh></job-searsh>
    </div>
    <v-layout class="job-shortcut text-xs-center">
      <v-flex xs3
              v-for="(shortcut, index) of shortcuts"
              :key="index"
              v-ripple
              @click="$router.push(shortcut.href)"
              class="py-3">
        <component :is="shortcut.icon"
                   class="svg-lg"></component>
        <div v-text="shortcut.title"></div>
      </v-flex>
    </v-layout>
    <base-divider></base-divider>
    <v-layout align-center
              justify-center
              class="text-xs-center job-title text-muted py-2">
      <svg-medal-left class="svg-xs"></svg-medal-left>
      <v-icon>iconfont icon-dot</v-icon>
      <span class="body-2 text--primay">兼职打怪</span>
      <v-icon>iconfont icon-dot</v-icon>
      <svg-medal-right class="svg-xs"></svg-medal-right>
    </v-layout>
    <job-filter></job-filter>
    <div class="job-list">
      <job-item :items="jobs"></job-item>
      <base-infinite @infinite="getMoreData"></base-infinite>
    </div>

    <no-ssr v-if="!currentLocation">
      <baidu-map class="d-none"
                 @ready="gotLocation">
      </baidu-map>
    </no-ssr>
  </div>
</template>

<script>
import JobFilter from '@/components/JobFilter'
import JobSearsh from '@/components/JobSearsh'
import JobItem from '@/components/JobItem'
import { mapGetters, mapActions } from 'vuex'
import { page } from '@mixins'

export default {
  components: {
    JobFilter,
    JobSearsh,
    JobItem
  },
  data: () => ({
    items: [{ src: require('@img/slider0.jpg') }, { src: require('@img/slider1.jpg') }],
    shortcuts: [
      { icon: 'svg-my-mission', title: '我的任务', href: '/job/mission' },
      { icon: 'svg-fun', title: '趣味体验', href: '/job/fun' },
      { icon: 'svg-recommend', title: '组合推荐', href: '/job/recommend' },
      { icon: 'svg-reward', title: '领取奖励', href: '/job/reward' }
    ],
    currentLocation: null,
    pagination: {}
  }),
  mixins: [page],
  computed: {
    ...mapGetters({
      jobs: 'job/jobs'
    })
  },
  methods: {
    ...mapActions({
      fetchJobs: 'job/fetchJobs'
    }),
    getMoreData($state) {
      this.pagination = this.getPage(this.pagination)
      this.fetchJobs(this.pagination).then(res => {
        $state.loaded()
        if (res.length < this.pagination.pagesize || res.length === 0) {
          $state.complete()
        }
      })
    },
    gotLocation({ BMap, map }) {
      var geolocation = new BMap.Geolocation()
      let self = this
      geolocation.getCurrentPosition(
        function(r) {
          console.log(r)

          if (r.point) self.currentLocation = r.point
        },
        { enableHighAccuracy: true }
      )
    }
  }
}
</script>

<style lang="scss">
.job {
    position: relative;
    .job-carousel_wrap {
        .fade {
            &-enter-active,
            &-leave-active,
            &-leave-to {
                transition: 0.3s ease-out;
                position: absolute;
                top: 0;
                left: 0;
            }
            &-enter,
            &-leave,
            &-leave-to {
                opacity: 0;
            }
        }
        .job-carousel {
            height: 210px;
            .v-carousel__controls {
                background: transparent;
                button {
                    margin: 0 !important;
                    i.iconfont {
                        font-size: 12px;
                    }
                }
            }
            img {
                width: 100%;
            }
        }
    }
    .job-title {
        i.iconfont {
            font-size: 12px;
            vertical-align: middle;
            padding: 3px;
            transform: scale(0.5);
        }
    }
}
</style>
