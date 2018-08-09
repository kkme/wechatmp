<template>
  <div class="job-filter white">
    <v-layout class="job-filter-wrap text-xs-center border-top border-bottom"
              id="filter">
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0 border-right__list"
               :loading="!currentCity.areaname"
               @click="onClickTab(0)">{{currentCity.areaname}}</v-btn>
        <transition>
          <job-regions v-if="active === 0"></job-regions>
        </transition>
      </v-flex>
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0 border-right__list"
               @click="onClickTab(1)">职位类型</v-btn>
        <transition>
          <job-positions v-if="active === 1"></job-positions>
        </transition>
      </v-flex>
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0 border-right__list"
               @click="onClickTab(2)">智能排序</v-btn>
        <transition>
          <job-orderby v-if="active === 2"></job-orderby>
        </transition>
      </v-flex>
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0"
               @click="onClickTab(3)">筛选</v-btn>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import JobRegions from '@/components/JobRegions'
import JobPositions from '@/components/JobPositions'
import JobOrderby from '@/components/JobOrderby'
import { mapGetters } from 'vuex'
export default {
  components: {
    JobRegions,
    JobPositions,
    JobOrderby
  },
  data: () => ({
    active: -1
  }),
  computed: {
    ...mapGetters({
      currentCity: 'common/currentCity'
    })
  },
  methods: {
    scrollToFilter() {
      this.$vuetify.goTo('#filter', {
        duration: 500,
        offset: -48,
        easing: 'easeInOutCubic'
      })
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
  .job-filter-wrap {
    position: relative;
    .job-filter-item {
      .job-filter-item-title.border-right__list::after {
        transform: scaleY(0.5);
      }
    }
  }
}
</style>
