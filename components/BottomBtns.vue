<template>
  <div class="bottom-btns-wrap">
    <v-layout class="bottom-btns"
              :class="{
                'bottom-btns-disabled': disabled !== false,
                'bottom-btns-rounded': rounded !== false,
                'bottom-btns-border': border !== false,
              }">
      <v-flex>
        <slot name="no">
          <v-btn color="white"
                 class="ma-0 elevation-0"
                 :disabled="disabled !== false"
                 block
                 @click="$emit('no')">拒绝</v-btn>
        </slot>
      </v-flex>
      <v-flex>
        <slot name="yes">
          <v-btn color="primary"
                 class="ma-0 elevation-0"
                 :disabled="disabled !== false"
                 block
                 @click="$emit('yes')">同意</v-btn>
        </slot>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: [String, Boolean],
      default: false
    },
    rounded: {
      type: [String, Boolean],
      default: false
    },
    border: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>

<style lang="scss">
.bottom-btns-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .bottom-btns {
    position: relative;

    &.bottom-btns-disabled {
      border-color: transparent !important;
    }
    &.bottom-btns-rounded {
      border-radius: $border-radius * 2;
    }
    &.bottom-btns-border {
      border: 1px solid $primary;
    }
  }
}
</style>
