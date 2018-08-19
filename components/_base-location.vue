<template>
  <no-ssr>
    <div class="amap-page-container"
         v-if="currentCity.status !== 'loading' && currentCity.status !== 'located'">
      <el-amap vid="amap"
               :plugin="plugin"
               class="amap-demo">
      </el-amap>
      <div class="toolbar"
           v-if="locationOnly === false">
        <slot>
          <div class="d-inline-block">
            <v-icon class="icon--text mr-0">iconfont icon-location</v-icon>
            <span v-if="loaded">
              {{ address !== null ? currentAddress : cityName }}
            </span>
            <span v-else>正在定位...</span>
          </div>
        </slot>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    locationOnly: {
      type: [Boolean, String],
      default: false
    },
    address: {
      type: [Boolean, String],
      default: null
    },
    city: {
      type: [Boolean, String],
      default: null
    }
  },
  data() {
    let self = this
    return {
      loaded: false,
      cityName: '',
      currentAddress: '',
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              console.log({ o })
              self.updateCurrentCity({ status: 'loading' })
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  console.log(result)
                  let address = result.addressComponent
                  let location = {
                    adcode: address.adcode,
                    province: address.province,
                    city: address.city || address.province,
                    district: address.district,
                    township: address.township,
                    street: address.street,
                    streetNumber: address.streetNumber,
                    address: result.formattedAddress,
                    position: {
                      lat: result.position.lat,
                      lng: result.position.lng
                    }
                  }
                  self.$emit('input', location)
                  self.updateCurrentLocation(location)
                  self.updateCurrentCity({
                    areaname: location.city || location.province,
                    id: location.adcode.substr(0, 4),
                    pid: location.adcode.substr(0, 2),
                    position: location.position,
                    status: 'located'
                  })
                  self.currentAddress = result.formattedAddress
                  self.cityName = address.city || address.province
                  self.loaded = true
                }
              })
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentLocation: 'common/currentLocation',
      currentCity: 'common/currentCity'
    })
  },
  methods: {
    ...mapMutations({
      updateCurrentLocation: 'common/UPDATE_CURRENT_LOCATION',
      updateCurrentCity: 'common/UPDATE_CURRENT_CITY'
    })
  }
}
</script>

<style>
</style>
