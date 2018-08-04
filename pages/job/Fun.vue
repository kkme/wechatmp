<template>
  <div class="white">
    <v-layout row
              wrap
              class="pa-3">
      <v-flex xs12>
        <v-layout row
                  wrap>
          <div class="subheading">听说还没开始设计!</div>
          <v-spacer></v-spacer>
          <stars stars="2"></stars>
        </v-layout>
      </v-flex>
      <v-flex xs12
              class="text-muted pt-1">武侯区/7km 0218-05-05 - 2018-05-08
        <div class="caption">发布时间：2018-05-09 08:55</div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Stars from '@/components/Stars'
export default {
  components: {
    Stars
  },
  head: () => ({
    title: '趣味体验'
  }),
  meta: {
    title: '趣味体验'
  },
  data: () => ({})
}
</script>

<style lang="scss">
</style>
