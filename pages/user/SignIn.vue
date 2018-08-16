<template>
  <v-layout class="signin min-h-100 white"
            column
            align-center
            justify-center>
    <img src="@img/logo.png"
         class="logo">
    <div class="pa-3 signin-form white">
      <v-form v-model="valid"
              class="px-3"
              ref="form"
              lazy-validation>
        <base-input v-model="username"
                    :rules="nameRules"
                    placeholder="手机号"
                    :flat="false"
                    :solo="false"
                    class="mt-3"
                    prepend-inner-icon="iconfont icon-user"
                    clearable
                    required></base-input>
        <!-- <base-input v-model="password"
                    :rules="passwordRules"
                    :flat="false"
                    :solo="false"
                    type="password"
                    placeholder="密码"
                    prepend-inner-icon="iconfont icon-lock"
                    clearable
                    required
                    :sms="username"></base-input> -->
        <base-input v-if="currentLoginType === 'account'"
                    v-model="password"
                    :rules="passwordRules"
                    :flat="false"
                    :solo="false"
                    type="password"
                    placeholder="密码"
                    class="mt-3"
                    prepend-inner-icon="iconfont icon-lock"
                    clearable
                    required
                    @keyup.enter="submit"></base-input>

        <base-input v-if="currentLoginType === 'mobile'"
                    v-model="password"
                    :rules="smsRules"
                    :flat="false"
                    :solo="false"
                    placeholder="请输入手机验证码"
                    class="mt-3"
                    prepend-inner-icon="iconfont icon-lock"
                    clearable
                    :sms="username"
                    :smsType="smsType"
                    required
                    @keyup.enter="submit"></base-input>

        <!-- <base-input v-model="captcha"
                    :rules="captchaRules"
                    :flat="false"
                    :solo="false"
                    placeholder="验证码"
                    prepend-inner-icon="iconfont icon-lock"
                    captcha
                    required></base-input> -->
        <v-btn color="primary"
               block
               class="mt-5"
               :disabled="!valid"
               @click="submit"
               :loading="loading">登录</v-btn>
      </v-form>
    </div>
    <div>
      <v-layout class="signin-links mt-5">
        <v-btn flat
               color="grey darken-2"
               nuxt
               to="/user/signup">注册账户</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat
               color="grey darken-2"
               @click="changeLoginType">短信登录</v-btn>
      </v-layout>
    </div>
  </v-layout>
</template>

<script>
// import rules from '@const/rules'
import { mapActions } from 'vuex'
import { loginTypes, smsTypes } from '@const'
import { labelToValue } from '@helper'
export default {
  head: () => ({
    title: '登录'
  }),
  meta: {
    title: '登录'
  },
  data: () => ({
    username: '',
    password: '',
    captcha: '',
    valid: false,
    loading: false,
    currentLoginType: 'account',
    nameRules: [v => !!v || '', v => (v && v.length >= 11) || ''],
    passwordRules: [v => !!v || '', v => (v && v.length >= 6) || ''],
    captchaRules: [v => !!v || '', v => (v && v.length >= 4) || ''],
    smsRules: [v => !!v || '', v => (v && v.length >= 4) || '']
  }),
  computed: {
    loginType() {
      return labelToValue(this.currentLoginType, loginTypes)
    },
    smsType: () => labelToValue('signin', smsTypes)
  },
  methods: {
    ...mapActions({
      logIn: 'auth/logIn'
    }),
    changeLoginType() {
      this.currentLoginType = this.currentLoginType === 'account' ? 'mobile' : 'account'
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.logIn({
          account: this.username,
          password: this.password,
          imgCode: this.captcha,
          loginType: this.loginType
        })
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
  }
}
</script>

<style lang="scss">
.signin {
  .logo {
    width: 60vw;
    max-width: 310px;
  }
  .signin-form,
  .signin-links {
    width: 80vw;
    max-width: 300px;
  }
  .signin-form {
    border-radius: $border-radius * 5;
    box-shadow: 0 2px 10px 0 rgba($primary, 0.2);
    margin-top: -1rem;
  }
}
</style>
