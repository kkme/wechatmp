<template>
  <div class="job-search"
       :class="{ 'active': active }"
       @touchmove="preventWindowScroll">
    <v-toolbar flat
               dense
               clipped-left
               color="white"
               class="border-bottom"
               v-show="active">
      <v-btn icon
             @click.stop="active = false">
        <v-icon class="iconfont icon-left"></v-icon>
      </v-btn>
      <div>搜索职位</div>
    </v-toolbar>
    <div :class="{ 'white active': formBg }"
         class="job-search-form">
      <v-layout class="pl-3 py-2"
                :class="{'pr-3': !active}"
                align-center>
        <v-flex>
          <v-layout class="job-search-content white"
                    :class="{
                'elevation-1': !active,
                'bordered grey lighten-3' : active
              }"
                    align-center>
            <city-selector>
              <v-btn flat
                     large
                     :loading="!currentCity.position"
                     class="ma-0 px-3 body-1">
                <span class="cart">请选择城市</span>
              </v-btn>
            </city-selector>
            <v-flex class="job-search-input"
                    @click="active = true">
              <base-input placeholder="请输入要搜索的兼职"
                          prepend-inner-icon="iconfont icon-search"
                          :background-color="active ? 'transparent' : ''"
                          autofocus
                          clearable
                          v-model="inputValue"></base-input>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-btn flat
               v-show="active"
               class="ma-1 px-3 job-search-btn">搜索</v-btn>
      </v-layout>
    </div>
    <transition name="fall"
                mode="in-out"
                appear
                @after-leave="onClose">
      <div class="white job-search-shortcut px-3"
           v-show="active">
        <v-layout wrap
                  class="mt-2">
          <span class="subheading">历史搜索</span>
          <v-spacer />
          <v-icon class="icon--text">iconfont icon-delete</v-icon>
          <v-flex xs12>
            <base-tag height="24px">包吃</base-tag>
            <base-tag height="24px">包住</base-tag>
            <base-tag height="24px"
                      color="primary">包开心</base-tag>
          </v-flex>
        </v-layout>
        <v-layout wrap
                  class="mt-2">
          <span class="subheading">热门搜索</span>
          <v-spacer />
          <v-icon class="icon--text"
                  color="accent">iconfont icon-hot</v-icon>
          <v-flex xs12>
            <base-tag height="24px">包吃</base-tag>
            <base-tag height="24px">包住</base-tag>
            <base-tag height="24px"
                      color="primary">包开心</base-tag>
          </v-flex>
        </v-layout>
      </div>
    </transition>
  </div>
</template>

<script>
import CitySelector from '@/components/CitySelector'
import { preventWindowScroll } from '@mixins'
import { mapGetters } from 'vuex'
export default {
  components: {
    CitySelector
  },
  data: () => ({
    inputValue: null,
    formBg: false
  }),
  mixins: [preventWindowScroll],
  computed: {
    ...mapGetters({
      currentCity: 'common/currentCity'
    })
  },
  methods: {
    onClose() {
      this.formBg = false
    }
  }
}
</script>

<style lang="scss">
.job-search {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    &.active {
        position: fixed;
        z-index: 5;
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.36);
    }
    .job-search-form {
        position: relative;
        z-index: 2;
        &:not(.active) {
            transition: background 800ms;
        }
        .job-search-content {
            position: relative;
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
        .job-search-btn {
            min-width: unset;
        }
    }
    .job-search-shortcut {
        position: relative;
        z-index: 1;
        transform: translateY(0%);
        width: 100%;
        flex: 1;
    }

    .fall-enter-active,
    .fall-leave-active {
        transition: transform 300ms;
        transform: translateY(0%);
    }
    .fall-enter,
    .fall-leave-to {
        transform: translateY(-100%);
    }
}
</style>
