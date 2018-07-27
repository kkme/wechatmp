<template>
  <v-layout class="certificate-uploader px-3 my-3">
    <v-flex class="d-flex align-center justify-center mr-2 certificate-uploader-btn"
            v-ripple>
      <span class="text-xs-center">
        <v-icon color="white">iconfont icon-plus</v-icon>
        <div class="mt-2">上传身份证正面</div>
      </span>
      <input type="file"
             class="d-none"
             ref="uploadImage"
             accept="image/*"
             @change="onFilePicked(_, 'front')" />
    </v-flex>
    <v-flex class="d-flex align-center justify-center ml-2 certificate-uploader-btn"
            v-ripple>
      <span class="text-xs-center">
        <v-icon color="white">iconfont icon-plus</v-icon>
        <div class="mt-2">上传身份证反面</div>
      </span>
      <input type="file"
             class="d-none"
             ref="uploadImage"
             accept="image/*"
             @change="onFilePicked(_, 'back')" />
    </v-flex>
  </v-layout>
</template>

<script>
import { readFiles } from '@helper'
export default {
  props: {
    max: Number,
    multiple: {
      default: true
    }
  },
  data: () => ({
    certificate: {}
  }),
  methods: {
    // ...mapActions(['uploadFile']),
    onFilePicked(event, flag) {
      this.loading = true
      console.log(event, flag)

      // readFiles(event.target.files).then(res => {
      //   console.log(res)
      //   this.$emit('input', res[0])
      // })
      this.loading = false
      // TODO: upload file to server

      // this.images = files[0]
      // let formData = new FormData()
      // formData.append('file', files[0])
      // var request = new XMLHttpRequest();
      // request.open("POST", "http://192.168.0.105:8085/common/upload");
      // request.send(formData);
      // this.uploadFile(formData).then(res => {
      //   this.$emit('input', res.src)
      //   this.loading = false
      // })
    }
  }
}
</script>

<style lang="scss">
.certificate-uploader {
  height: 100px;
  .certificate-uploader-btn {
    border: 1px dashed $primary;
    border-radius: $border-radius;
    i.iconfont {
      background-color: $primary;
      border-radius: 50%;
      padding: 6px;
    }
  }
}
</style>
