<template>
  <div>
    <div class="pointes-item-title body-2 pa-3 grey lighten-2">请上传身份证正反面照片</div>
    <certificate-uploader v-model="certificate"
                          text="身份证"></certificate-uploader>
    <div class="pointes-item-title body-2 pa-3 grey lighten-2">请确认以下信息</div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>真实姓名</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入真实姓名"
                    class="input-rtl"
                    v-model="identity.name"></base-input>
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>身份证号码</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入身份证号码"
                    class="input-rtl"
                    v-model="identity.idcard"></base-input>
      </v-list-tile>

    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               color="primary"
               :loading="loading"
               :disabled="!certificate.front || !certificate.back || !identity.idcard || !identity.name"
               @click="submit">确定</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CertificateUploader from '@/components/CertificateUploader'
export default {
  components: {
    CertificateUploader
  },
  data: () => ({
    identity: {},
    certificate: {},
    loading: false
  }),
  methods: {
    ...mapActions({
      identifyByIdCard: 'users/identifyByIdCard',
      fetchCertification: 'users/fetchCertification'
    }),
    submit() {
      this.loading = true
      this.identity.idcardpositivefile = this.certificate.front
      this.identity.idcardnegativefile = this.certificate.back
      this.identifyByIdCard(this.identity).then(res => {
        this.loading = false
        this.fetchCertification({}).then(() => {
          this.$router.replace('/user/certification')
        })
      })
    }
  },
  computed: {
    disableBtn() {
      if (!(this.identity.detailAddr && this.identity.schoolname && this.identity.studentid)) return true
      if (!(this.region.province && this.region.city && this.region.county)) return true
      if (!(this.certificate.front && this.certificate.back)) return true
      return false
    }
  }
}
</script>

<style>
</style>
