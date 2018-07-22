<template>
  <div>
    <v-tabs fixed-tabs
            slider-color="primary"
            v-model="tabs">
      <v-tab>任务</v-tab>
      <v-tab>企业</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs"
                  class="white">
      <v-tab-item class="collection-tab">
        <collection-item></collection-item>
        <collection-item></collection-item>
      </v-tab-item>
      <v-tab-item>
        <collection-item></collection-item>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import CollectionItem from '@/components/CollectionItem'
export default {
  components: {
    CollectionItem
  },
  data: () => ({
    tabs: null
  })
}
</script>

<style lang="scss">
.collection-tab {
    // min-height: calc(100vh-96px-56px);
}
</style>
