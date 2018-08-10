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
         class="base-tag"
         v-bind="$attrs"
         v-on="$listeners"
         :style="height ? style : ''">
    <slot>已认证</slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'grey'
    },
    outline: {
      type: [String, Boolean],
      default: true
    },
    height: {
      type: String,
      default: ''
    }
  },
  computed: {
    style() {
      return {
        height: this.height
      }
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
  margin-left: 0;
  margin-right: 0;
  + .base-tag {
    margin-left: $tag-space;
  }
}
</style>
