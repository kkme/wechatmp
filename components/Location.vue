<template>
  <no-ssr>
    <div class="amap-page-container">
      <el-amap vid="amap"
               :plugin="plugin"
               class="amap-demo">
      </el-amap>
      <div class="toolbar"
           v-if="locationOnly === false">
        <slot>
          <span v-if="loaded">
            {{ city }}
          </span>
          <span v-else>正在定位...</span>
        </slot>
      </div>
    </div>
  </no-ssr>
</template>

<script>
export default {
  props: {
    locationOnly: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    let self = this
    return {
      loaded: false,
      city: '',
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  let address = result.addressComponent
                  self.$emit('located', {
                    province: address.province,
                    city: address.city,
                    district: address.district,
                    township: address.township,
                    street: address.street,
                    streetNumber: address.streetNumber,
                    address: result.formattedAddress,
                    position: {
                      lat: result.position.lat,
                      lng: result.position.lng
                    }
                  })
                  self.city = address.city
                  self.loaded = true
                }
              })
            }
          }
        }
      ]
    }
  }
}
</script>

<style>
</style>
