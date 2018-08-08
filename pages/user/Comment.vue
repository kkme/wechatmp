<template>
  <div class="white">
    <comment-item v-for="item in comments"
                  :key="item.id"
                  :items="item"></comment-item>
    <base-infinite @infinite="getMoreData"></base-infinite>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import { mapGetters, mapActions } from 'vuex'
import { page } from '@mixins'
export default {
  components: {
    CommentItem
  },
  head: () => ({
    title: '我的评价'
  }),
  meta: {
    title: '我的评价'
  },
  mixins: [page],
  computed: {
    ...mapGetters({
      comments: 'users/comments'
    })
  },
  methods: {
    ...mapActions({
      fetchComments: 'users/fetchComments'
    }),
    getMoreData($infinite) {
      this.getPage(this.page)
      this.fetchComments(this.page).then(res => {
        $infinite.loaded()
        if (!res || res.length < this.page.pagesize || res.length === 0) {
          $infinite.complete()
        }
      })
    }
  }
}
</script>
