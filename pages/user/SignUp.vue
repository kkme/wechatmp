<template>

  <v-form v-model="valid"
          ref="form"
          lazy-validation>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>手机号码</v-list-tile-title>
        </v-list-tile-content>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入手机号码"
                    v-model="user.tel"
                    :rules="phoneRules"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content class="flex-auto">
          <v-list-tile-title>手机验证码</v-list-tile-title>
        </v-list-tile-content>

        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入验证码"
                    v-model="user.veryCode"
                    :rules="captchaRules"
                    :sms="user.tel"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>登录密码</v-list-tile-title>
        </v-list-tile-content>

        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入密码"
                    v-model="user.password"
                    type="password"
                    :rules="passwordRules"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>确认密码</v-list-tile-title>
        </v-list-tile-content>

        <base-input class="caption text-muted input-rtl"
                    placeholder="请确认密码"
                    v-model="rePassword"
                    type="password"
                    :rules="rePasswordRules"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>姓名</v-list-tile-title>
        </v-list-tile-content>

        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入姓名"
                    v-model="user.name"
                    :rules="nameRules"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>身份</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div>
          <v-radio-group v-model="identityType"
                         row>
            <v-radio label="非学生"
                     value="other"
                     color="primary"
                     class="mb-0 caption"></v-radio>
            <v-radio label="学生"
                     value="student"
                     color="primary"
                     class="mb-0 caption"></v-radio>
          </v-radio-group>
        </div>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               color="primary"
               :loading="loading"
               @click="onSignUp">注册</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { identity } from '@const'
import { labelToValue } from '@helper'
import { mapActions } from 'vuex'
export default {
  head: () => ({
    title: '欢迎注册'
  }),
  meta: {
    title: '欢迎注册'
  },
  data: function() {
    return {
      valid: false,
      identityType: 'student',
      rePassword: '',
      user: {
        tel: '',
        veryCode: '',
        password: '',
        name: '',
        identityType: ''
      },
      phoneRules: [v => !!v || '', v => (v && v.length >= 11) || ''],
      nameRules: [v => !!v || '', v => (v && v.length >= 2) || ''],
      passwordRules: [v => !!v || '', v => (v && v.length >= 6) || ''],
      rePasswordRules: [v => !!v || '', v => this.user.password === v || ''],
      captchaRules: [v => !!v || '', v => (v && v.length >= 4) || ''],
      loading: false
    }
  },
  methods: {
    ...mapActions({
      signUp: 'users/signUp'
    }),
    onSignUp() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.user.identityType = this.identity
        this.signUp(this.user)
          .then(res => {
            this.loading = false
            this.$router.push('/job')
          })
          .catch(error => {
            this.loading = false
            console.log(error)
          })
      }
    }
  },
  computed: {
    identity() {
      return labelToValue(this.identityType, identity)
    }
  }
}
</script>

<style>
</style>
