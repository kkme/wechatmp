<template>
  <v-layout class="job-filter text-xs-center white border-top border-bottom"
            id="filter">
    <v-flex xs3
            class="job-filter-item border-right__list">
      <div class="text-truncate pa-2"
           @click="onClickTab(0)">全成都</div>
      <transition>
        <job-regions v-if="active === 0"
                     class="job-filter-region"></job-regions>
      </transition>
    </v-flex>
    <v-flex xs3
            class="job-filter-item border-right__list">
      <div class="text-truncate pa-2"
           @click="onClickTab(1)">职位类型</div>
    </v-flex>
    <v-flex xs3
            class="job-filter-item border-right__list">
      <div class="text-truncate pa-2"
           @click="onClickTab(2)">特色兼职</div>
    </v-flex>
    <v-flex xs3
            class="job-filter-item border-right__list">
      <div class="text-truncate pa-2"
           @click="onClickTab(3)">筛选</div>
    </v-flex>
  </v-layout>
</template>

<script>
import JobRegions from '@/components/JobRegions'
export default {
  components: {
    JobRegions
  },
  data: () => ({
    active: 1
  }),
  methods: {
    scrollToFilter() {
      this.$vuetify.goTo('#filter', {
        duration: 500,
        offset: -48,
        easing: 'easeInOutCubic'})
    },
    onClickTab(tab) {
      this.active = tab
      this.scrollToFilter()
    }
  }
}
</script>

<style lang="scss">
.job-filter {
    position: sticky;
    top: $top-nav-height;
    z-index: 1;
    .job-filter-item {
        position: relative;
        z-index: 1;
        &::after {
            transform: scaleY(0.5);
        }
        > div {
        }
    }
}
</style>
