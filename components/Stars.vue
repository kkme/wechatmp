<template>
  <div class="d-flex">
    <v-icon class="iconfont icon-star icon--text"
            v-for="n of 5"
            :key="n"
            :class="{ 'accent--text': n <= stars }" />
  </div>
</template>

<script>
export default {
  props: {
    stars: {
      type: [Number, String],
      default: 5
    }
  }
}
</script>
