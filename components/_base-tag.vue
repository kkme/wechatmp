<template>
  <!-- <div class="base-tag"
       :class="`${color}--text`">
    <slot>已认证</slot>
  </div> -->
  <v-btn :outline="outline"
         small
         :color="color"
         tag="div"
         depressed
         :ripple="false"
         class="base-tag">
    <slot>已认证</slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    outline: {
      type: [String, Boolean],
      default: true
    }
  }
}
</script>

<style lang="scss">
.base-tag {
  border-radius: 2px;
  color: $primary;
  font-size: $size1;
  height: $size2 + 2px;
  line-height: $size2 + 2px;
  min-width: $size1 * 3;
}
</style>
