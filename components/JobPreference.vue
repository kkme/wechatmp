<template>
  <div class="job-preference white min-h-100">
    <v-layout class="job-preference-city pt-2"
              align-center>
      <div class="body-2 pl-3">城市</div>
      <v-icon class="icon--text ml-3 mr-0">iconfont icon-location</v-icon>
      <city-selector auto-select
                     disable-county
                     v-model="currentLocation"
                     @input="getData">
        <v-btn color="primary"
               class="ma-0"
               flat
               small
               :loading="!currentLocation.city || !currentLocation.city.areaname">{{ currentLocation.city.areaname }}</v-btn>
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
                      :disabled="region.length >= maxRegion && !region.includes(item.id)"
                      v-model="region"
                      :value="item.id"
                      v-if="!isNonRegionItem(item.id)"
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
                      v-model="district"
                      :value="item.id"
                      :label="item.name"></v-checkbox>
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
      <v-layout class="py-4">
        <v-btn block
               class="mx-4"
               color="primary"
               :loading="loading"
               @click="onUpdatePreference">确定</v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
import CitySelector from '@/components/CitySelector'
import { mapActions, mapGetters } from 'vuex'
import { paymentTypes } from '@const'
import constant from '@const/public'
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
    maxRegion: constant.PREFERENCE_MAX_REGION,
    metro: [],
    district: [],
    startTime: '',
    endTime: '',
    paymentType: '',
    subscribe: '',
    allow: '',
    loading: false
  }),
  methods: {
    ...mapActions({
      fetchCities: 'common/fetchCities',
      fetchDistricts: 'common/fetchDistricts',
      fetchMetroes: 'common/fetchMetroPlatforms',
      updatePreference: 'users/updatePreference',
      fetchPreference: 'users/fetchPreference'
    }),
    getData(location) {
      this.fetchCities({ pid: location.city.id })
      // this.fetchDistricts({ areaid: location.city.id })
      this.fetchMetroes({ areaid: location.city.id, metroid: 0 })
    },
    getPreference() {
      this.fetchPreference({})
        .then(res => {
          if (res) {
            this.currentLocation.city.id = res.cityid
            this.allow = res.isrecommend
            this.subscribe = res.subscription
            this.paymentType = res.wageclearing
            this.startTime = res.jobperiodbegin
            this.endTime = res.jobperiodend
            this.region = res.countyids
            this.district = res.districtids
            this.metro = res.metroAndPlatform
            this.$emit('input', res)
          } else {
          }
        })
        .catch(error => {
          console.log(error)
          // this.getPreference({})
        })
    },
    onUpdatePreference() {
      this.loading = true
      let preference = {
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
      }
      this.updatePreference(preference)
        .then(res => {
          this.loading = false
          this.$emit('input', preference)
        })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    },
    isNonRegionItem(id) {
      id = id.substr(id.length - 2, id.length)
      return +id === 99
    }
  },
  computed: {
    ...mapGetters({
      areas: 'common/areas',
      districts: 'common/districts',
      metroes: 'common/metroPlatforms',
      preference: 'users/preference'
    }),
    currentCounties() {
      if (!this.currentLocation || !this.currentLocation.city) return []
      let counties = this.areas.filter(area => +area.pid === +this.currentLocation.city.id)
      return counties
    },
    metroLines() {
      if (!this.currentLocation || !this.currentLocation.city) return []
      // let metroes = this.metroes.filter(metro => this.currentLocation.city.id === metro.areaid && +metro.metroid === 0)
      let metroes = this.metroes.filter(
        metro => +metro.areaid === +this.currentLocation.city.id && +metro.metroid === 0
      )
      return metroes.sort((a, b) => a.sort - b.sort)
    },
    businessDistricts() {
      // let businessDistricts = this.districts.filter(district => +this.currentLocation.city.id === 5101 )
      let businessDistricts = this.districts.filter(district => this.region.includes(district.areaid))
      return businessDistricts
    }
  },
  watch: {
    region(newValue) {
      if (newValue && newValue.length) {
        newValue.forEach(areaid => {
          let district = this.districts.find(district => +district.areaid === +areaid)
          if (!district) {
            this.fetchDistricts({ areaid })
          }
        })
      }
    }
  },
  mounted() {
    this.getPreference()
  }
}
</script>

<style lang="scss">
.job-preference {
  .v-label {
    font-size: $size1;
  }
  .v-input--selection-controls__input {
    align-self: flex-start;
  }
}
</style>
