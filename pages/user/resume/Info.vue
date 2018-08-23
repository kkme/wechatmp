<template>
  <div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile @click="$refs.imageInput.chooseFile()">
        <v-list-tile-content>
          <v-list-tile-title>个人头像</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div class="avatar-sm">
          <base-avatar :src="avatar.src || userAvatar.src"></base-avatar>
        </div>
        <image-uploader class="d-none"
                        ref="imageInput"
                        :multiple="false"
                        v-model="avatar"
                        :max="1" />
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>真实姓名</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入真实姓名"
                    v-model="info.name"
                    class="input-rtl"></base-input>
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile @click="$refs.eduSheet.active()">
        <v-list-tile-content>
          <v-list-tile-title>最高学历</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-bottom-sheet class="caption text-muted"
                           v-model="info.education"
                           :items="eduList"
                           placeholder="请选择学历"
                           ref="eduSheet"></base-bottom-sheet>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile @click="$refs.genderSheet.active()">
        <v-list-tile-content>
          <v-list-tile-title>性别</v-list-tile-title>
        </v-list-tile-content>
        <base-bottom-sheet class="caption text-muted"
                           v-model="info.sex"
                           :items="genderTypes"
                           placeholder="请选择性别"
                           ref="genderSheet"></base-bottom-sheet>
        <svg-right class="svg-sm" />
      </v-list-tile>
      <v-divider class="mx-3"></v-divider>

      <v-list-tile @click="$refs.identitySheet.active()">
        <v-list-tile-content>
          <v-list-tile-title>身份</v-list-tile-title>
        </v-list-tile-content>
        <base-bottom-sheet class="caption text-muted"
                           v-model="info.identitytype"
                           :items="identityTypes"
                           placeholder="请选择身份"
                           ref="identitySheet"></base-bottom-sheet>
        <svg-right class="svg-sm" />
      </v-list-tile>
      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>民族</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入名族"
                    v-model="info.family"
                    class="input-rtl"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>
      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>出生年月</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div class="caption text-muted">
          <base-date-picker type="date"
                            placeholder="请选择出生年月"
                            v-model="info.birthday"></base-date-picker>
        </div>
        <svg-right class="svg-sm" />
      </v-list-tile>
      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>居住地</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <span class="caption text-muted">成都</span>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>支付宝</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input placeholder="请输入支付宝"
                    v-model="info.alipay"
                    class="input-rtl"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>
    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               color="primary"
               :loading="loading"
               :disabled="disabled"
               @click="submit">保存</v-btn>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import { gender, identity, eduList } from '@const'
import ImageUploader from '@/components/ImageUploader'
import { mapActions, mapGetters } from 'vuex'
import { labelToValue } from '@helper'
export default {
  components: {
    ImageUploader
  },
  head: () => ({
    title: '基本信息'
  }),
  meta: {
    title: '基本信息'
  },
  data: () => ({
    info: {
      gender: '',
      identity: ''
    },
    genderTypes: gender,
    identityTypes: identity,
    eduList,
    avatar: {},
    loading: false,
    disabled: true,
    defaultAvatar: require('@img/avatar.jpg')
  }),
  computed: {
    ...mapGetters({
      resume: 'users/resume'
    }),
    userAvatar() {
      return this.avatar.base64 || this.info.avatar || this.defaultAvatar
    }
  },
  methods: {
    ...mapActions({
      updateUserBaseInfo: 'users/updateUserBaseInfo',
      fetchResume: 'users/fetchResume'
    }),
    submit() {
      this.loading = true
      this.updateUserBaseInfo(this.info)
        .then(res => {
          this.loading = false
          this.fetchResume()
          this.$router.back()
        })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    }
  },
  mounted() {
    this.fetchResume().then(res => {
      this.disabled = false
      this.info = {
        avatar: res.userInfo.avatar,
        name: res.userInfo.name,
        education: res.userInfo.education,
        sex: labelToValue(res.userInfo.sex, gender),
        identitytype: labelToValue(res.userInfo.identitytype, identity),
        family: res.userInfo.family,
        birthday: res.userInfo.birthday,
        censusprovinceid: res.userInfo.censusprovinceid,
        censuscityid: res.userInfo.censuscityid,
        censuscountyid: res.userInfo.censuscountyid,
        alipay: res.userInfo.alipay
      }
    })
  }
}
</script>

<style>
</style>
