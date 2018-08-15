<template>
  <div v-if="items">
    <div v-for="(item, index) of items"
         :key="index"
         class="border-bottom px-3 py-2"
         @click="$router.push(`/job/mission/${item.deliveryId}`)">
      <v-layout align-center>
        <span class="subheading">{{item.title}}</span>
        <slot :item="item">
          <v-spacer></v-spacer>
          <!-- <base-tag outline
                    color="accent"
                    height="20px"
                    class="my-0">{{item.deliveryType | valueToLabel(applyTypes,'label2')}}</base-tag> -->
        </slot>
      </v-layout>
      <v-layout class="caption mt-2"
                align-center>
        <span>{{item.county}}/{{item.distance | formatDistance}} {{item.jobBeginTime}} - {{item.jobEndTime}}</span>
        <v-spacer></v-spacer>
        <span>{{item.createTime}}</span>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { applyStatuses, applyTypes } from '@const'
export default {
  props: {
    items: Array
  },
  data: () => ({
    applyStatuses,
    applyTypes
  }),
  methods: {
    navigareTo(id) {
      this.$router.push(`/job/mission/${id}`)
    }
  }
}
</script>

<style>
</style>
