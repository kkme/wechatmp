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
import { mapGetters, mapActions } from 'vuex'

export default {
  head: () => ({
    title: '我的收藏'
  }),
  meta: {
    title: '我的收藏'
  },
  components: {
    CollectionItem
  },
  data: () => ({
    tabs: null
  }),
  computed: {
    ...mapGetters({
      collections: 'users/collections'
    })
  },
  methods: {
    ...mapActions({
      fetchCollections: 'users/fetchCollections'
    })
  },
  mounted() {
    this.fetchCollections()
  }
}
</script>

<style lang="scss">
</style>
