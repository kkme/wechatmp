<template>
  <div class="job-preference white min-h-100">
    <v-layout class="job-preference-city pt-3">
      <div class="body-2 pl-3">城市</div>
      <v-icon class="icon--text ml-3">iconfont icon-location</v-icon>
      <city-selector auto-select
                     disable-county
                     v-model="currentLocation"
                     @input="getData">
        <span class="primary--text"
              v-if="currentLocation.city">{{ currentLocation.city.areaname }}</span>
      </city-selector>
    </v-layout>
    <div class="job-preference-region mt-3">
      <div class="px-3">地区</div>
      <v-layout wrap
                class="px-3">
        <v-flex xs3
                v-for="item of currentCounties"
                :key="item.id">
          <v-checkbox color="primary"
                      class="caption mt-1"
                      off-icon="iconfont icon-checkbox_off"
                      on-icon="iconfont icon-checkbox_on"
                      hide-details
                      v-model="region"
                      :value="item.id"
                      :label="item.areaname"></v-checkbox>
        </v-flex>
      </v-layout>
    </div>
    <div class="job-preference-district mt-3">
      <div class="px-3">商区</div>
      <v-layout wrap
                class="px-3">
        <v-flex xs3
                v-for="item of businessDistricts"
                :key="item.id">
          <v-checkbox color="primary"
                      class="caption mt-1"
                      off-icon="iconfont icon-checkbox_off"
                      on-icon="iconfont icon-checkbox_on"
                      hide-details
                      v-model="region"
                      :value="item.id"
                      :label="item.areaname"></v-checkbox>
        </v-flex>
      </v-layout>
    </div>
    <div class="job-preference-metro mt-3">
      <div class="px-3">地铁</div>
      <v-layout wrap
                class="px-3">
        <v-flex xs3
                v-for="item of metroLines"
                :key="item.id">
          <v-checkbox color="primary"
                      class="caption mt-1"
                      off-icon="iconfont icon-checkbox_off"
                      on-icon="iconfont icon-checkbox_on"
                      hide-details
                      v-model="metro"
                      :value="item.id"
                      :label="item.name"></v-checkbox>
        </v-flex>
      </v-layout>
    </div>
    <div class="job-preference-time mt-3">
      <div class="px-3">工作时段</div>
      <v-layout class="px-3 mt-2"
                align-center>
        <div class="pr-3">
          <base-time-picker v-model="startTime"
                            bordered></base-time-picker>
        </div>
        <div> - </div>
        <div class="pl-3">
          <base-time-picker v-model="endTime"
                            bordered
                            class="flex-auto"></base-time-picker>
        </div>
      </v-layout>
    </div>
    <div class="job-preference-payment mt-3">
      <div class="px-3">结算方式</div>
      <v-layout wrap
                class="px-3">
        <base-tag height="28px"
                  v-for="payment of paymentTypes"
                  block
                  :key="payment.value"
                  :color="paymentType === payment.value ? 'primary': 'grey'"
                  @click="paymentType = payment.value">{{payment.label}}</base-tag>
      </v-layout>
    </div>
    <div class="job-preference-action mt-3">
      <v-layout align-center
                justify-center>
        <v-checkbox color="primary"
                    class="caption mt-1 flex-auto mx-2"
                    off-icon="iconfont icon-checkbox_off"
                    on-icon="iconfont icon-checkbox_on"
                    hide-details
                    v-model="allow"
                    label="允许简历推荐"></v-checkbox>
        <v-checkbox color="primary"
                    class="caption mt-1 flex-auto mx-2"
                    off-icon="iconfont icon-checkbox_off"
                    on-icon="iconfont icon-checkbox_on"
                    hide-details
                    v-model="subscribe"
                    label="订阅"></v-checkbox>
      </v-layout>
      <v-layout class="my-4">
        <v-btn block
               class="mx-4"
               color="primary"
               @click="onUpdatePreference">确定</v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
import CitySelector from '@/components/CitySelector'
import { mapActions, mapGetters } from 'vuex'
import { paymentTypes } from '@const'
export default {
  components: {
    CitySelector
  },
  data: () => ({
    paymentTypes,
    currentLocation: {
      city: {}
    },
    region: [],
    metro: [],
    district: [],
    startTime: '',
    endTime: '',
    paymentType: '',
    subscribe: '',
    allow: ''
  }),
  methods: {
    ...mapActions({
      fetchCities: 'common/fetchCities',
      fetchDistricts: 'common/fetchDistricts',
      fetchMetroes: 'common/fetchMetroPlatforms',
      updatePreference: 'users/updatePreference'
    }),
    getData(location) {
      this.fetchCities({ pid: location.city.id })
      // this.fetchDistricts({ areaid: location.city.id })
      this.fetchDistricts({ areaid: 51 })

      // this.fetchMetroes({ areaid: location.city.id, metroid: 0 })
      this.fetchMetroes({ areaid: 5101, metroid: 0 })
    },
    onUpdatePreference() {
      this.updatePreference({
        cityid: this.currentLocation.city.id,
        isrecommend: this.allow,
        subscription: this.subscribe,
        // wagegeneration: this.paymentType,
        wageclearing: this.paymentType,
        jobperiodbegin: this.startTime,
        jobperiodend: this.endTime,
        countyids: this.region,
        districtids: this.district,
        metroAndPlatform: this.metro
      })
    }
  },
  computed: {
    ...mapGetters({
      areas: 'common/areas',
      districts: 'common/districts',
      metroes: 'common/metroPlatforms'
    }),
    currentCounties() {
      if (!this.currentLocation || !this.currentLocation.city) return []
      let counties = this.areas.filter(area => +area.pid === +this.currentLocation.city.id)
      return counties
    },
    metroLines() {
      if (!this.currentLocation || !this.currentLocation.city) return []
      // let metroes = this.metroes.filter(metro => this.currentLocation.city.id === metro.areaid && +metro.metroid === 0)
      let metroes = this.metroes.filter(metro => +metro.areaid === 5101 && +metro.metroid === 0)
      return metroes.sort((a, b) => a.sort - b.sort)
    },
    businessDistricts() {
      // let businessDistricts = this.districts.filter(district => +this.currentLocation.city.id === 5101 )
      let businessDistricts = this.districts.filter(district => +district.areaid === 5101)
      return businessDistricts
    }
  }
}
</script>

<style lang="scss">
.job-preference {
  .v-label {
    font-size: $size1;
  }
}
</style>
