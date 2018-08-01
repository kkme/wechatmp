<template>
  <div class="team-bottom-btns-wrap px-4 py-3">
    <v-layout class="team-bottom-btns"
              :class="{disabled: !disabled}">
      <v-flex>
        <slot name="no">
          <v-btn color="white"
                 class="ma-0 elevation-0"
                 :disabled="!disabled"
                 block
                 @click="$emit('no')">拒绝</v-btn>
        </slot>
      </v-flex>
      <v-flex>
        <slot name="yes">
          <v-btn color="primary"
                 class="ma-0 elevation-0"
                 :disabled="!disabled"
                 block
                 @click="$emit('yes')">同意</v-btn>
        </slot>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ['disabled']
}
</script>

<style lang="scss">
.team-bottom-btns-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid $border-color;
  .team-bottom-btns {
    position: relative;
    border: 1px solid $primary;
    border-radius: $border-radius * 2;
    &.disabled {
      border-color: transparent;
    }
  }
}
</style>
