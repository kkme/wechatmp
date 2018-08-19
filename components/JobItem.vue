<template>
  <div class="job-items"
       v-if="items && items.length">
    <div class="job-item"
         v-for="item of items"
         :key="item.recruitmentId">
      <v-layout class="px-3 pt-3 white"
                column
                @click="$router.push({name: 'job-id', params: { id: item.recruitmentId, team }})"
                v-ripple>
        <v-flex>
          <v-layout align-center>
            <v-flex class="subheading text-truncate pr-3">{{item.title}}</v-flex>
            <div class="error--text body-2">{{item.wageBegin}}-{{item.wageEnd}}元/天</div>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-layout row
                    align-center>
            <v-flex>
              <div class="pt-2 caption text-muted">
                <v-icon class="iconfont icon-location icon--text"></v-icon>{{item.county}}
                <template v-if="item.distance">/{{ item.distance | formatDistance}}</template>
                <span class="pl-2">{{item.jobBeginTime | formatDateTime('MM.dd')}} - {{item.jobEndTime | formatDateTime('MM.dd')}}</span>
              </div>
              <v-layout class="caption text-muted mt-1"
                        align-center>
                <v-icon class="iconfont icon-time icon--text"></v-icon> {{ item.createTime | formatCreateTime}}
                <base-tag color="grey">{{item.wageClearing}}</base-tag>
                <base-tag color="primary">
                  <v-icon class="icon--text mr-0">iconfont icon-safety</v-icon>{{item.wageGeneration}}</base-tag>
              </v-layout>
            </v-flex>
            <div class="primary--text"
                 v-if="item.personalRewardPoints">
              +{{item.personalRewardPoints}}积分
            </div>
          </v-layout>
        </v-flex>
        <v-divider class="mt-2 job-item-divider"></v-divider>
      </v-layout>
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: [Array, Object]
    },
    team: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.job-items {
  .job-item:last-child {
    .job-item-divider {
      border-color: transparent;
    }
  }
}
</style>
