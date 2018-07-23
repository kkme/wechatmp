<template>
  <div class="white pb-3">
    <v-layout align-center>
      <div class="pl-3 flex-auto">新手机号</div>
      <v-flex>
        <base-input v-model="phone"
                    placeholder="请输入新手机号"
                    class="input-rtl" />
      </v-flex>
    </v-layout>
    <v-layout align-center>
      <div class="pl-3 flex-auto">验证码</div>
      <v-flex>
        <base-input v-model="smsCode"
                    placeholder="请输入验证码"
                    :sms="phone"
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
    title: '绑定手机'
  }),
  meta: {
    title: '绑定手机'
  },
  data: () => ({
    phone: '',
    smsCode: ''
  })
}
</script>

<style>
</style>
