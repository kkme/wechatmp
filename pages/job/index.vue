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
      <div class="job-search-wrap py-2 px-3">
        <v-layout class="job-search white elevation-1"
                  align-center>
          <city-selector>
            <v-btn flat
                   large
                   class="ma-0 px-3 body-1">
              <span class="cart">请选择城市</span>
            </v-btn>
          </city-selector>
          <v-flex class="job-search-input">
            <base-input placeholder="请输入要搜索的兼职"
                        prepend-inner-icon="iconfont icon-search"
                        autofocus
                        clearable
                        v-model="inputValue"></base-input>
          </v-flex>
        </v-layout>
      </div>
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
              class="text-xs-center job-title text-muted py-3">
      <svg-medal-left class="svg-sm"></svg-medal-left>
      <v-icon>iconfont icon-dot</v-icon>
      <span class="body-2 text--primay">兼职打怪</span>
      <v-icon>iconfont icon-dot</v-icon>
      <svg-medal-right class="svg-sm"></svg-medal-right>
    </v-layout>
    <job-filter></job-filter>
    <div class="job-list">
      <job-item v-for="n of 10"
                :key="n"></job-item>
    </div>
  </div>
</template>

<script>
import CitySelector from '@/components/CitySelector'
import JobFilter from '@/components/JobFilter'
import JobItem from '@/components/JobItem'
export default {
  components: {
    CitySelector,
    JobFilter,
    JobItem
  },
  data: () => ({
    items: [
      { src: require('@img/slider0.jpg') },
      { src: require('@img/slider1.jpg') }
    ],
    shortcuts: [
      { icon: 'svg-my-mission', title: '我的任务', href: '/job/' },
      { icon: 'svg-fun', title: '趣味体验', href: '/job' },
      { icon: 'svg-recommend', title: '组合推荐', href: '/job' },
      { icon: 'svg-reward', title: '领取奖励', href: '/job' }
    ],
    inputValue: null
  })
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
    .job-search-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .job-search {
        border-radius: $border-radius * 2;
        .job-search-input {
          position: relative;
          &::before {
            content: '';
            height: 100%;
            border-left: 2px solid $border-color;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            transform: scale(0.6);
          }
        }
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
