<template>
  <v-layout row
            justify-center
            class="city-selector">
    <v-dialog v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition">
      <div slot="activator">
        <slot>打开</slot>
      </div>
      <v-card>
        <div class="city-selector-action">
          <v-toolbar light
                     dense
                     flat
                     color="white"
                     class="border-bottom pr-0">
            <v-btn icon
                   light
                   @click.native="dialog = false">
              <v-icon class="iconfont icon-x"></v-icon>
            </v-btn>
            <div>选择城市</div>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn light
                     flat
                     @click="done"
                     class="mx-0 px-0">确定</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div class="secondary py-2">
            <base-input placeholder="请输入城市名称"
                        prepend-inner-icon="iconfont icon-search"
                        autofocus
                        clearable
                        v-model="inputValue"
                        class="mx-3"></base-input>
          </div>
          <div class="d-flex px-3 py-2 border-bottom">
            当前位置：
            <span class="primary--text">成都</span>
            <v-spacer></v-spacer>
            刷新
          </div>
        </div>
        <v-layout class="city-selector-main">
          <v-list class="city-selector-main-provinces secondary">
            <!-- <v-list-tile class="active city-selector-main-province">
              <v-list-tile-content>
                <span class="body-1">热门</span>
              </v-list-tile-content>
            </v-list-tile> -->
            <v-list-tile class="city-selector-main-province"
                         :class="{active: +province.id === +currentProvince.id}"
                         v-for="province of provinces"
                         :key="province.id"
                         @click="setCurrentProvince(province)">
              <v-list-tile-content>
                <span class="body-1">{{ province.areaname }}</span>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
          <v-list class="city-selector-main-cities">
            <v-list-tile class="city-selector-main-city"
                         v-for="city of currentCities"
                         :key="city.id"
                         @click="setCurrentCity(city)">
              <v-list-tile-content>
                <span class="px-4 body-1"
                      :class="{active: +city.id === +currentCity.id}">{{ city.areaname }}</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list class="city-selector-main-cities">
            <v-list-tile class="city-selector-main-city"
                         v-for="county of currentCounties"
                         :key="county.id"
                         @click="setCurrentCounty(county)">
              <v-list-tile-content>
                <span class="px-4 body-1"
                      :class="{active: +county.id === +currentCounty.id}">{{ county.areaname }}</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    disableCity: {
      type: [String, Boolean],
      default: false
    },
    disableCounty: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    return {
      dialog: true,
      inputValue: '',
      currentProvince: {},
      currentCity: {},
      currentCounty: {}
    }
  },
  computed: {
    ...mapGetters({
      areas: 'common/areas'
    }),
    provinces() {
      return this.areas.filter(area => +area.pid === 0)
    },
    currentCities() {
      if (!this.currentProvince) return []
      let cities = this.areas.filter(
        area => +area.pid === +this.currentProvince.id
      )
      return cities
    },
    currentCounties() {
      if (!this.currentCity) return []
      let counties = this.areas.filter(
        area => +area.pid === +this.currentCity.id
      )
      return counties
    }
  },
  methods: {
    ...mapActions({
      fetchCities: 'common/fetchCities'
    }),
    setCurrentProvince(province) {
      this.currentProvince = province
      this.currentCity = {}
      this.currentCounty = {}
      this.fetchCities({ id: province.id })
    },
    setCurrentCity(city) {
      this.currentCity = city
      this.currentCounty = 0
      this.fetchCities({ id: city.id })
    },
    setCurrentCounty(county) {
      this.currentCounty = county
    },
    done() {
      this.dialog = false
      this.$emit('input', {
        province: this.currentProvince,
        city: this.currentCity,
        county: this.currentCounty,
        location: this.currentProvince
      })
    },
    getLocation() {
      let location = ''
      location += this.currentProvince.areaname
      if (this.disableCity === false) {
        location += this.currentCity.areaname
        if (this.disableCounty === false) {
          location += this.currentCounty.areaname
        }
        return location
      }
      return location
    }
  },
  mounted() {
    this.fetchCities()
  }
}
</script>

<style lang="scss">
.city-selector-action {
  // position: fixed;
  // top: 0;
  // left:0;
  // width: 100%;
}
.city-selector-main {
  height: calc(100vh - 138px);
  display: flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  ul {
    list-style: none;
    padding: 0;
  }
  .city-selector-main-provinces {
    flex: 0 0 25%;
    width: 25%;
    height: 100%;
    overflow: auto;
    .city-selector-main-province {
      position: relative;
      &.active {
        background-color: #ffffff;
        &::before {
          content: '';
          position: absolute;
          border-left: 2px solid $primary;
          border-radius: 4px;
          height: 100%;
          top: 0;
          left: 0.5em;
          transform: scaleY(0.5);
        }
      }
    }
  }
  .city-selector-main-cities {
    overflow: auto;
    height: 100%;
    flex: 1;
    .city-selector-main-city span {
      border-radius: $border-radius;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: lighten($primary, 15%);
      }
    }
  }
}
</style>
