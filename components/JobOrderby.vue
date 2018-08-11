<template>
  <div class="job-orderby white px-3 border-top">
    <v-list dense>
      <template v-for="(item, index) of jobOrderBy">
        <v-list-tile @click="handleOrderBy(item)"
                     ripple
                     :key="item.label">
          <v-list-tile-content>
            <v-list-tile-title>{{item.label}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index !== jobOrderBy.length - 1"
                   :key="index"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
import { jobOrderBy } from '@const'
export default {
  data: () => ({
    jobOrderBy
  })
}
</script>

<style lang="scss">
</style>
