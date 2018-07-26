<template>
  <div>
    <comment-item v-for="n in 10"
                  :key="n"></comment-item>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import { mapGetters, mapActions } from 'vuex'
export default {
  head: () => ({
    title: '我的评价'
  }),
  meta: {
    title: '我的评价'
  },
  components: {
    CommentItem
  },
  data: () => ({
    tabs: null
  }),
  computed: {
    ...mapGetters({
      comments: 'users/comments'
    })
  },
  methods: {
    ...mapActions({
      fetchComments: 'users/fetchComments'
    })
  },
  mounted() {
    this.fetchComments()
  }
}
</script>

<style lang="scss">
</style>
