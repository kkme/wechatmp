<template>
  <div class="job min-h-100">
    <div class="job-carousel_wrap">
      <v-carousel hide-controls
                  interval="3000"
                  class="job-carousel elevation-0"
                  delimiter-icon="iconfont icon-dot">
        <v-carousel-item v-for="(item,i) in banners"
                         :key="i"
                         :src="imgBaseUrl + item.imgpath"
                         reverse-transition="fade"
                         @click="jump(item)"
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
      <base-infinite @infinite="getMoreData"
                     v-if="currentLocation.position"></base-infinite>
    </div>

    <!-- <no-ssr v-if="!currentCity.id">
      <baidu-map class="d-none"
                 @ready="gotLocation">
      </baidu-map>
    </no-ssr> -->
  </div>
</template>

<script>
import JobFilter from '@/components/JobFilter'
import JobSearsh from '@/components/JobSearsh'
import JobItem from '@/components/JobItem'
import { mapGetters, mapActions } from 'vuex'
import { page } from '@mixins'
import { jumpPageTypes } from '@const'
import { labelToValue, valueToLabel } from '@helper'
import constant from '@const/public'
export default {
  components: {
    JobFilter,
    JobSearsh,
    JobItem
  },
  data: () => ({
    shortcuts: [
      { icon: 'svg-my-mission', title: '我的任务', href: '/job/mission' },
      { icon: 'svg-fun', title: '趣味体验', href: '/job/fun' },
      { icon: 'svg-recommend', title: '组合推荐', href: '/job/recommend' },
      { icon: 'svg-reward', title: '领取奖励', href: '/job/reward' }
    ],
    imgBaseUrl: constant.BASE_URL
  }),
  mixins: [page],
  computed: {
    ...mapGetters({
      jobs: 'job/jobs',
      currentLocation: 'common/currentLocation',
      currentCity: 'common/currentCity',
      jumpPages: 'common/jumpPages'
    }),
    banners() {
      return this.jumpPages.filter(
        page => valueToLabel(page.linktype, jumpPageTypes, 'name') === 'banner' && page.imgpath !== ''
      )
    }
  },
  methods: {
    ...mapActions({
      fetchJobs: 'job/fetchJobs',
      fetchCities: 'common/fetchCities',
      duibaLogin: 'common/duibaLogin',
      fetchJumpPages: 'common/fetchJumpPages'
    }),
    // ...mapMutations({
    //   updateCurrentLocation: 'common/UPDATE_CURRENT_LOCATION',
    //   updateCurrentCity: 'common/UPDATE_CURRENT_CITY'
    // }),
    getMoreData($state) {
      let opts = {}
      if (!this.currentLocation.position) return
      opts.longitude = this.currentLocation.position.lng
      opts.latitude = this.currentLocation.position.lat
      this.getPage(this.page, opts)
      this.fetchJobs(this.page)
        .then(res => {
          $state.loaded()
          if (res.length < this.page.pagesize || res.length === 0) {
            $state.complete()
          }
        })
        .catch(error => {
          $state.complete()
          throw error.msg
        })
    },
    jump(item) {
      let url = item.jumpurl
      if (url) {
      }
    }
    // gotLocation({ BMap, map }) {
    //   var geolocation = new BMap.Geolocation()
    //   let self = this
    //   geolocation.getCurrentPosition(
    //     function(r) {
    //       console.log(r)

    //       if (r.point) self.currentLocation = r.point
    //     },
    //     { enableHighAccuracy: true }
    //   )
    // }
  },
  mounted() {
    this.fetchCities({ pid: 0 })
    this.fetchJumpPages({ linkType: labelToValue('banner', jumpPageTypes) })
    // this.duibaLogin()
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

  .job-list {
    min-height: 100vh;
  }
}
</style>
