<template>
  <v-layout class="job-regions white border-bottom border-top">
    <v-flex xs4
            class="job-regions-item border-right__list">
      <v-list dense>
        <v-list-tile @click="levelOne = 'metro'"
                     :class="{'primary': levelOne === 'metro' }"
                     ripple>
          <v-list-tile-content>
            <v-list-tile-title>地铁线</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="levelOne = 'businessDistricts'"
                     :class="{'primary': levelOne === 'businessDistricts' }"
                     ripple>
          <v-list-tile-content>
            <v-list-tile-title>商区</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs4
            class="job-regions-item border-right__list">
      <v-list dense>
        <v-list-tile @click="handleLevelTwo(item)"
                     ripple
                     v-for="item of levelTwo"
                     :key="item.id"
                     :class="{'primary': currentLevelTwo.id === item.id }">
          <v-list-tile-content>
            <v-list-tile-title>{{item.name || item.areaname}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-flex>
    <v-flex xs4
            class="job-regions-item">
      <v-list dense>
        <v-list-tile @click="handleLevelThree(item)"
                     ripple
                     v-for="item of levelThree"
                     :key="item.id"
                     :class="{'primary': currentLevelThree.id === item.id }">
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    levelOne: 'metro',
    currentLevelTwo: {},
    currentLevelThree: {}
  }),
  computed: {
    ...mapGetters({
      metroes: 'common/metroPlatforms',
      districts: 'common/districts',
      currentCity: 'common/currentCity',
      areas: 'common/areas'
    }),
    levelTwo() {
      if (this.levelOne === 'metro') {
        let metroes = this.metroes.filter(metro => this.currentCity.id === metro.areaid && +metro.metroid === 0)
        return metroes.sort((a, b) => a.sort - b.sort)
      } else if (this.levelOne === 'businessDistricts') {
        let businessDistricts = this.areas.filter(area => this.currentCity.id === area.pid)
        return businessDistricts
      }
    },
    levelThree() {
      if (this.levelOne === 'metro') {
        let metroes = this.metroes.filter(metro => this.currentLevelTwo.id === metro.metroid)
        return metroes.sort((a, b) => a.sort - b.sort)
      } else if (this.levelOne === 'businessDistricts') {
        let businessDistricts = this.districts.filter(district => this.currentLevelTwo.id === district.areaid)
        return businessDistricts
      }
    }
  },
  methods: {
    ...mapActions({
      fetchMetroes: 'common/fetchMetroPlatforms',
      fetchDistricts: 'common/fetchDistricts',
      fetchArea: 'common/fetchCities'
    }),
    handleLevelTwo(item) {
      this.currentLevelTwo = item
      this.currentLevelThree = {}
      if (this.levelOne === 'metro') {
        this.fetchMetroes({ areaid: item.areaid, metroid: item.id })
      } else if (this.levelOne === 'businessDistricts') {
        this.fetchDistricts({ areaid: item.id })
      }
    },
    handleLevelThree(item) {
      this.currentLevelThree = item
      if (this.levelOne === 'metro') {
      } else if (this.levelOne === 'businessDistricts') {
      }
    }
  },
  mounted() {
    this.fetchMetroes({ areaid: this.currentCity.id, metroid: 0 })
    // this.fetchDistricts({})
    this.fetchArea({ pid: this.currentCity.id })
  }
}
</script>

<style lang="scss">
</style>
