<template>
  <v-dialog v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition">
    <div slot="activator">
      <slot name="preview">
        <span class="px-3">添加工作描述</span>
      </slot>
    </div>
    <v-card>
      <v-toolbar flat
                 dense
                 class="border-bottom"
                 color="white">
        <v-btn icon
               @click.native="dialog = false">
          <v-icon>iconfont icon-x</v-icon>
        </v-btn>
        <v-toolbar-title class="body-1"
                         v-if="title">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <slot></slot>
      <slot name="action">
      </slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: String
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    active() {
      this.dialog = true
    },
    deactive() {
      this.dialog = false
      this.$emit('deactived')
    }
  }
}
</script>

<style>
</style>
