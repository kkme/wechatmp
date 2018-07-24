<template>
  <div class="points-item">
    <div class="pointes-item-title subheading px-3 py-2 grey lighten-2">5月</div>
    <v-layout row
              wrap
              class="px-3 py-2 border-bottom"
              v-for="n of 10"
              :key="n">
      <div>2018-02-02 08:02</div>
      <v-flex class="px-3">系统评价</v-flex>
      <div>43.8</div>
    </v-layout>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.points-item {
}
</style>
