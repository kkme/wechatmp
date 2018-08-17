<template>
  <div>
    <div class="pointes-item-title body-2 pa-3 grey lighten-2">请上传学生证正反面照片</div>
    <certificate-uploader v-model="certificate"
                          text="学生证"></certificate-uploader>
    <div class="pointes-item-title body-2 pa-3 grey lighten-2">请完善以下信息</div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学校名称</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入学校名称"
                    class="input-rtl"
                    v-model="identity.schoolname"></base-input>
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学号</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入学号"
                    class="input-rtl"
                    v-model="identity.studentid"></base-input>
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学校所在地</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <city-selector v-model="region"
                       class="mr-3"
                       placeholder="请选择城市">
        </city-selector>
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>详细地址</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入详细地址"
                    class="input-rtl"
                    v-model="identity.detailAddr"></base-input>
      </v-list-tile>
    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               color="primary"
               :loading="loading"
               :disabled="disableBtn"
               @click="submit">确定</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CitySelector from '@/components/CitySelector'
import { mapActions } from 'vuex'
import CertificateUploader from '@/components/CertificateUploader'
export default {
  components: {
    CertificateUploader,
    CitySelector
  },
  data: () => ({
    identity: {},
    certificate: {},
    loading: false,
    region: {}
  }),
  computed: {
    disableBtn() {
      if (!(this.identity.detailAddr && this.identity.schoolname && this.identity.studentid)) return true
      if (!(this.region.province && this.region.city && this.region.county)) return true
      if (!(this.certificate.front && this.certificate.back)) return true
      return false
    }
  },
  methods: {
    ...mapActions({
      identifyByStudentCard: 'users/identifyByStudentCard'
    }),
    submit() {
      this.loading = true
      this.identity.provinceid = this.region.province.id
      this.identity.cityid = this.region.city.id
      this.identity.countyid = this.region.county.id
      this.identity.studentcontentfile = this.certificate.front
      this.identity.studentbackfile = this.certificate.back
      this.identifyByStudentCard(this.identity).then(res => {
        this.loading = false
      })
    }
  }
}
</script>

<style>
</style>
