<template>
  <div>
    <comment-item v-for="n in 10"
                  :key="n"></comment-item>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
export default {
  head: () => ({
    title: '我的评价'
  }),
  meta: {
    title: '我的评价'
  },
  metaInfo() {
    return {
      title1: 'wcaa'
    }
  },
  components: {
    CommentItem
  },
  data: () => ({
    tabs: null
  })
}
</script>

<style lang="scss">
</style>
