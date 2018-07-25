<template>
  <v-bottom-sheet v-model="sheet"
                  lazy
                  v-if="items">
    <div slot="activator">
      {{ currentLabel | valueToLabel(items) }}
    </div>
    <v-list>
      <template v-for="(item, index) in items">
        <v-list-tile :key="index"
                     @click="onChange(item)">
          <v-list-tile-title class="text-xs-center body-1"
                             :class="{ 'primary--text': item.value === value }">{{ item.label }}</v-list-tile-title>
        </v-list-tile>
        <v-divider v-if="index !== items.length - 1"
                   class="mx-3" />
      </template>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    value: [String, Object],
    items: Array,
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  computed: {
    currentLabel() {
      return this.picked || this.value || this.placeholder
    }
  },
  data: () => ({
    picked: null,
    sheet: false
  }),
  methods: {
    onChange(val) {
      this.picked = val.label
      this.sheet = false
      this.$emit('input', val.value)
    },
    active() {
      this.sheet = true
    }
  }
}
</script>

<style>
</style>
