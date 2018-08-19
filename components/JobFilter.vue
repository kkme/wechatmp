<template>
  <div class="job-filter white">
    <v-layout class="job-filter-wrap text-xs-center border-top border-bottom"
              id="filter">
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0 border-right__list"
               :loading="!currentCity.position"
               @click="onClickTab(1)">{{currentCity.areaname}}</v-btn>
        <transition>
          <job-regions class="job-filter-item-regions"
                       v-show="active === 1"
                       @touchmove="preventWindowScroll"></job-regions>
        </transition>
      </v-flex>
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0 border-right__list"
               @click="onClickTab(2)">职位类型</v-btn>
        <transition>
          <job-positions class="job-filter-item-positions"
                         v-show="active === 2"></job-positions>
        </transition>
      </v-flex>
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0 border-right__list"
               @click="onClickTab(3)">智能排序</v-btn>
        <transition>
          <job-orderby class="job-filter-item-orderby"
                       v-show="active === 3"></job-orderby>
        </transition>
      </v-flex>
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0"
               @click="onClickTab(4)">筛选</v-btn>
        <transition>
          <job-conditions class="job-filter-item-conditions"
                          v-show="active === 4"></job-conditions>
        </transition>
      </v-flex>
    </v-layout>
    <base-location location-only></base-location>
  </div>
</template>

<script>
import JobRegions from '@/components/JobRegions'
import JobPositions from '@/components/JobPositions'
import JobOrderby from '@/components/JobOrderby'
import JobConditions from '@/components/JobConditions'
import { mapGetters } from 'vuex'
import { preventWindowScroll } from '@mixins'
export default {
  components: {
    JobRegions,
    JobPositions,
    JobOrderby,
    JobConditions
  },
  data: () => ({
    active: -1
  }),
  mixins: [preventWindowScroll],
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
        z-index: 2;
        .job-filter-item {
            .job-filter-item-title.border-right__list::after {
                transform: scaleY(0.5);
            }
            .job-filter-item-regions,
            .job-filter-item-positions,
            .job-filter-item-orderby,
            .job-filter-item-conditions {
                position: absolute;
                left: 0;
                top: 100%;
                width: 100vw;
                text-align: left;
                max-height: calc(100vh - #{$top-nav-height + $bottom-nav-height + 36px});
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 100vw;
                    left: 0;
                    top: 0;
                    height: calc(100vh - #{$top-nav-height + $bottom-nav-height + 36px});
                    background-color: rgba(0, 0, 0, 0.3);
                    z-index: -1;
                }
            }
        }
    }
}
</style>
