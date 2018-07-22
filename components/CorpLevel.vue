<template>
  <div class="corp-level">
    <simple-svg :filepath="svg"
                v-for="n in level"
                :key="n" />
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: [Number, String],
      default: 5
    }
  },
  data: () => ({
    svg: require('~/static/svg/corp_level.svg')
  })
}
</script>

<style lang="scss">
.corp-level {
    display: flex;
}
</style>
