<template>
  <v-list flat
          two-line
          v-if="items">
    <v-list-tile v-for="(item, index) of items"
                 :key="index"
                 class="border-bottom"
                 nuxt
                 :to="`/job/mission/${item.deliveryId}`">
      <v-list-tile-content>
        <v-list-tile-title>
          <v-layout align-center>
            <span class="subheading">{{item.title}}</span>
            <slot :item="item">
              <v-spacer></v-spacer>
              <base-tag outline
                        color="accent"
                        height="20px"
                        class="my-0">{{item.deliveryType | valueToLabel(applyTypes,'label2')}}</base-tag>
            </slot>
          </v-layout>
        </v-list-tile-title>
        <v-list-tile-sub-title class="pt-2">
          <v-layout class="caption"
                    align-center>
            <span>{{item.county}}/{{item.distance | formatDistance}} {{item.jobBeginTime}} - {{item.jobEndTime}}</span>
            <v-spacer></v-spacer>
            <span>{{item.createTime}}</span>
          </v-layout>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
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
  })
}
</script>

<style>
</style>
