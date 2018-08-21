<template>
  <div class="white py-3">
    <v-form ref="form"
            v-model="valid"
            :lazy-validation="true">
      <div class="px-3">
        <div class="mb-2">我的评价</div>
        <v-textarea outline
                    flat
                    name="input-7-4"
                    label="请对这次体验做出评价,不能少于80字哟"
                    v-model="comment"
                    :rules="commentRules"
                    counter="500"
                    class="textarea-thin"></v-textarea>
      </div>
      <div class="px-3">
        <div class="mb-2">意见反馈</div>
        <v-textarea outline
                    flat
                    name="input-7-4"
                    label="请提出你的宝贵意见"
                    :rules="feedbackRules"
                    v-model="feedback"
                    counter="500"
                    class="textarea-thin"></v-textarea>
      </div>
      <base-divider></base-divider>
      <div class="px-3">
        <div class="subheading py-3 mb-3 border-bottom">上传凭证
          <span class="text-muted body-1">(不超过5张)</span>
        </div>
      </div>
      <image-uploader v-model="imagesList"></image-uploader>
      <v-layout class="mt-3"
                align-center
                justify-center>
        <v-flex xs10>
          <v-btn color="primary"
                 :loading="loading"
                 @click="submit"
                 :disabled="!(imagesList.length >= 3)"
                 block>提交</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
import { mapActions } from 'vuex'
import constant from '@const/public'
// import { valueToLabel } from '@helper'
export default {
  components: {
    ImageUploader
  },
  head: () => ({
    title: '投诉反馈'
  }),
  meta: {
    title: '投诉反馈'
  },
  data: () => ({
    valid: false,
    id: '',
    loading: false,
    imagesList: [],
    disabled: false,
    comment: '',
    feedback: '',
    commentRules: [
      v => !!v || '请对本次体验做出评价',
      v => (v && v.length >= constant.FUN_EVENT_COMMENT_MIN_LETTER_LENGTH) || '最少需要80字哟'
    ],
    feedbackRules: [
      v => !!v || '请填写你对本次体验的意见',
      v => (v && v.length >= constant.FUN_EVENT_FEEDBACK_MIN_LETTER_LENGTH) || '最少需要80字哟'
    ]
  }),
  methods: {
    ...mapActions({
      addComment: 'fun/addComment'
    }),
    submit() {
      if (this.$refs.form.validate() && this.images.length) {
        this.addComment({
          id: this.id,
          experienceEvaluation: this.comment,
          feedback: this.feedback,
          images: this.images
        }).then(() => {
          this.$store.dispatch('sys/showSnackbar', { msg: '添加评论成功', color: 'primary' })
          this.$router.back()
        })
      }
    }
  },
  computed: {
    images() {
      if (!this.imagesList.length) return []
      return this.imagesList.map(img => img.src).join(',')
    }
  },
  mounted() {
    let id = this.$route.params.id
    if (!id) this.$router.back()
    this.id = id
  }
}
</script>

<style lang="scss">
.feedback-note {
  &.v-text-field--outline .v-input__slot {
    border-width: 1px;
  }
  &.v-text-field--outline:not(.v-input--is-focused) .v-input__slot:hover {
    border-width: 1px;
  }
}
</style>
