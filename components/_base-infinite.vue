<template>
  <no-ssr>
    <infinite-loading v-bind="$attrs"
                      v-on="$listeners"
                      :spinner="spinner"></infinite-loading>
  </no-ssr>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  inheritAttrs: false,
  props: {
    spinner: {
      type: String,
      default: 'bubbles'
    }
  },
  components: {
    InfiniteLoading
  }

}
</script>

<style>
</style>
