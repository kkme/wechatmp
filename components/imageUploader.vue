<template>
  <div class="image-uploader">
    <div v-for="(img, index) of imagesUrl"
         v-if="imagesUrl.length"
         :key="index"
         :style="`backgroundImage: url(${img.base64})`">
      <v-btn small
             icon
             color="secondary"
             class="image-uploader-item-close ma-0">
        <v-icon class="caption"
                color="white">iconfont icon-x</v-icon>
      </v-btn>
    </div>
    <div class="image-uploader-btn d-flex align-center"
         v-if="!(imagesUrl.length >= maxImages)">
      <v-btn small
             class="ma-0 pa-0"
             outline
             color="grey"
             @click="chooseFile"
             :loading="loading">
        <v-icon color="grey"
                large>iconfont icon-plus</v-icon>
      </v-btn>
      <input type="file"
             class="d-none"
             ref="uploadImage"
             accept="image/*"
             @change="onFilePicked"
             :multiple="!!multiple">
    </div>
  </div>
</template>

<script>
import { unionBy } from 'lodash'
import constant from '@const/public'
import { readFiles } from '@helper'
import { mapActions } from 'vuex'
export default {
  props: {
    max: Number,
    multiple: {
      default: true
    }
  },
  data: () => ({
    loading: false,
    images: [],
    imagesUrl: []
  }),
  computed: {
    maxImages() {
      return this.max ? this.max : constant.MAX_IMAGES_UPLOAD
    }
  },
  methods: {
    // ...mapActions(['uploadFile']),
    chooseFile() {
      this.$refs.uploadImage.click()
    },
    onFilePicked(event) {
      this.loading = true
      let files = event.target.files
      readFiles(files).then(res => {
        if (!this.multiple) {
          this.$emit('input', res[0])
        } else {
          this.imagesUrl = unionBy(res, this.imagesUrl, 'name')
          this.$emit('input', this.imagesUrl)
        }
      })
      this.loading = false
      // TODO: upload file to server

      // let formData = new FormData()
      // formData.append('file', files)
      // return this.uploadFile(formData).
      let formDataPromise = Array.from(files).map(file => {
        let formData = new FormData()
        formData.append('file', file)
        return this.uploadFile(formData)
      })

      Promise.all(formDataPromise).then(res => {
        console.log({ res })
      })
    },
    ...mapActions({
      uploadFile: 'common/uploadFile'
    })
  }
}
</script>

<style lang="scss">
.image-uploader {
  display: flex;
  flex-wrap: wrap;
  & > div {
    flex: 0 0 88px;
    width: 88px;
    height: 88px;
    margin: 16px;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    img {
      width: 100%;
    }
  }
  .image-uploader-btn {
    .v-btn.v-btn--outline {
      border-style: dashed;
      height: 100%;
      width: 100%;
      display: block;
      border-radius: $border-radius * 2;
    }
  }
  .image-uploader-item-close {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 24px;
    transform: translate3d(50%, -50%, 0);
  }
}
</style>
