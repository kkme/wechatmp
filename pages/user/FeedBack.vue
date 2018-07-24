<template>
  <div class="white py-3">
    <div class="px-3">
      <div class="subheading">请选择你遇到的问题</div>
      <v-radio-group v-model="choosedFeedback">
        <v-radio v-for="feedback in feedbacks"
                 :key="feedback.value"
                 :label="feedback.label"
                 :value="feedback.value"
                 class="text-muted body-1"
                 color="primary"></v-radio>
      </v-radio-group>
      <v-textarea outline
                  solo
                  flat
                  v-model="note"
                  label="请描述你的问题"
                  counter="200"
                  class="feedback-note body-1"></v-textarea>
    </div>
    <base-divider></base-divider>
    <div class="px-3">
      <div class="subheading py-3 mb-3 border-bottom">上传凭证
        <span class="text-muted body-1">(不超过5张)</span>
      </div>
    </div>
    <image-uploader></image-uploader>
    <v-layout class="mt-5"
              align-center
              justify-center>
      <v-flex xs10>
        <v-btn color="primary"
               block>提交</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
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
    choosedFeedback: null,
    feedbacks: [
      { value: '1', label: '客服服务态度反馈' },
      { value: '2', label: '意见与建议' },
      { value: '3', label: '平台问题反馈' }
    ],
    note: null
  })
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
