<template>
  <v-card v-if="item">
    <base-divider></base-divider>
    <v-layout row
              wrap
              class="pa-3">
      <svg-message-dot class="svg-sm" />
      <span class="subheading">{{item.title}}</span>
      <v-flex xs12
              class="py-1">{{item.createtime}}</v-flex>
      <v-flex xs12
              text-muted>
        {{item.content}}
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss">
.message-item.active {
  svg circle {
    fill: #8bc271;
  }
}
</style>
