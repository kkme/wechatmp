<template>
  <div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>居住地址</v-list-tile-title>
        </v-list-tile-content>
        <!-- <div class="caption text-muted">四川省成都市锦江区</div> -->
        <v-spacer></v-spacer>
        <city-selector v-model="region"
                       class="mr-3"
                       placeholder="请选择区域"
                       :defalutRegion="defalutRegion">
        </city-selector>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>详细地址</v-list-tile-title>
        </v-list-tile-content>

        <base-input class="caption text-muted input-rtl"
                    placeholder="请选择地址"
                    v-model="contact.resideaddress"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>备用电话</v-list-tile-title>
        </v-list-tile-content>

        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入备用电话"
                    v-model="contact.backuptel"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>邮箱</v-list-tile-title>
        </v-list-tile-content>

        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入电子邮箱"
                    v-model="contact.email"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>QQ</v-list-tile-title>
        </v-list-tile-content>

        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入QQ号码"
                    v-model="contact.qq"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>微信</v-list-tile-title>
        </v-list-tile-content>

        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入微信账号"
                    v-model="contact.wechat"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               :loading="loading"
               :disabled="disabled"
               @click="submit"
               color="primary">保存</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CitySelector from '@/components/CitySelector'
export default {
  components: {
    CitySelector
  },
  head: () => ({
    title: '联系方式'
  }),
  meta: {
    title: '联系方式'
  },
  data: () => ({
    region: {},
    disabled: true,
    loading: false,
    contact: {}
  }),
  computed: {
    ...mapGetters({
      resume: 'users/resume'
    }),
    defalutRegion() {
      return [this.contact.resideprovinceid, this.contact.residecityid, this.contact.residecountyid]
    }
  },
  methods: {
    ...mapActions({
      updateUserContacts: 'users/updateUserContacts',
      fetchResume: 'users/fetchResume'
    }),
    submit() {
      this.loading = true
      this.updateUserContacts(this.contact).then(res => {
        this.loading = false
      })
    }
  },

  mounted() {
    this.fetchResume().then(res => {
      this.disabled = false
      this.contact = {
        resideprovinceid: res.userInfo.resideprovinceid,
        residecityid: res.userInfo.residecityid,
        residecountyid: res.userInfo.residecountyid,
        resideaddress: res.userInfo.resideaddress,
        backuptel: res.userInfo.backuptel,
        email: res.userInfo.email,
        qq: res.userInfo.qq,
        wechat: res.userInfo.wechat
      }
    })
  }
}
</script>

<style>
</style>
