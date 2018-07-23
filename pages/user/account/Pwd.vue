<template>
  <div class="white pb-3">
    <v-layout align-center>
      <div class="pl-3 flex-auto">新密码</div>
      <v-flex>
        <base-input v-model="phone"
                    placeholder="请输入新密码"
                    :append-icon="show1 ? 'iconfont icon-eye_open' : 'iconfont icon-eye_close'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    class="input-rtl" />
      </v-flex>
    </v-layout>
    <v-layout align-center>
      <div class="pl-3 flex-auto">验证码</div>
      <v-flex>
        <base-input v-model="smsCode"
                    placeholder="确认密码"
                    :append-icon="show2 ? 'iconfont icon-eye_open' : 'iconfont icon-eye_close'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    class="input-rtl" />
      </v-flex>
    </v-layout>
    <v-layout justify-center
              class="mt-5">

      <v-flex xs10>
        <v-btn color="primary"
               block>提交</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  head: () => ({
    titleTemplate: 's% - 修改密码'
  }),
  meta: {
    title: '修改密码'
  },
  data: () => ({
    phone: '',
    smsCode: '',
    show1: false,
    show2: false
  })
}
</script>

<style>
</style>
