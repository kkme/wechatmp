<template>
  <div>
    <div class="pointes-item-title body-2 pa-3 grey lighten-2">请上传身份证正反面照片</div>
    <certificate-uploader></certificate-uploader>
    <div class="pointes-item-title body-2 pa-3 grey lighten-2">请上传身份证正反面照片</div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学校名称</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入学校名称"
                    class="input-rtl"></base-input>
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学号</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入学号"
                    class="input-rtl"></base-input>
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学校所在地</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-city-selector />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>详细地址</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入详细地址"
                    class="input-rtl"></base-input>
      </v-list-tile>
    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               color="primary">确定</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CertificateUploader from '@/components/CertificateUploader'
export default {
  components: {
    CertificateUploader
  }
}
</script>

<style>
</style>
