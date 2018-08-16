<template>
  <div class="white py-3">
    <div class="px-3">
      <div class="subheading">请选择你遇到的问题
        <span class="caption grey--text">(所有项目必填)</span>
      </div>
      <v-radio-group v-model="choosedFeedback">
        <v-radio v-for="feedback in feedbackTypes"
                 :key="feedback.value"
                 :label="feedback.label"
                 :value="feedback.value"
                 hide-details
                 :disabled="feedbackTypes.length === 1"
                 class="text-muted body-1"
                 color="primary"></v-radio>
      </v-radio-group>
      <v-text-field v-model="title"
                    hide-details
                    clearable
                    class="mb-3 mt-0"
                    placeholder="标题"></v-text-field>
      <base-textarea outline
                     solo
                     flat
                     v-model="note"
                     label="请描述你的问题"
                     counter="200"
                     class="feedback-note body-1"></base-textarea>
    </div>
    <base-divider></base-divider>
    <div class="px-3">
      <div class="subheading py-3 mb-3 border-bottom">上传凭证
        <span class="text-muted body-1">(不超过5张)</span>
      </div>
    </div>
    <image-uploader v-model="images"></image-uploader>
    <v-layout class="mt-3"
              align-center
              justify-center>
      <v-flex xs10>
        <v-btn color="primary"
               :loading="loading"
               @click="submit"
               :disabled="disabled"
               block>提交</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
import { feedbackTypes } from '@const'
import { mapActions } from 'vuex'
import { valueToLabel } from '@helper'
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
    note: null,
    loading: false,
    title: '',
    images: []
  }),
  methods: {
    ...mapActions({
      platformFeedback: 'users/platformFeedback',
      companyFeedback: 'users/companyFeedback'
    }),
    submit() {
      let type = valueToLabel(this.choosedFeedback, feedbackTypes, 'name')
      console.log(type)

      if (!type) return
      if (type === 'customService' || type === 'suggest') {
        this.platformFeedback(this.feedback).then(res => {
          this.$router.back()
        })
      } else {
        this.companyFeedback(
          Object.assign({ recruitmentid: this.$route.query.id, comid: this.$route.query.comid }, this.feedback)
        ).then(res => {
          this.$router.back()
        })
      }
    }
  },
  computed: {
    feedback() {
      return {
        feedbacktype: this.choosedFeedback,
        title: this.title,
        content: this.note,
        annex: this.images
      }
    },
    feedbackTypes() {
      let query = this.$route.query.type
      if (!query) {
        return feedbackTypes.filter(type => type.name === 'customService' || type.name === 'suggest')
      } else {
        return [feedbackTypes.find(type => type.name === query)]
      }
    },
    disabled() {
      return !(this.companyFeedback && this.note && this.title)
    }
  },
  watch: {
    feedbackTypes: {
      handler(newValue) {
        if (newValue && newValue.length === 1) {
          console.log(newValue)
          this.choosedFeedback = newValue[0].value
        }
      },
      immediate: true
    }
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
