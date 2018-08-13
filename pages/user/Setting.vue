<template>
  <v-layout class="min-h-100"
            justify-center
            align-center
            column
            white>
    <div class="px-5 w-100">
      <v-btn color="error"
             block
             @click="onLogOut">退出登录</v-btn>
    </div>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      logOut: 'auth/logOut'
    }),
    onLogOut() {
      this.logOut().then(res => {
        this.$router.push('/user/signin')
      })
    }
  }
}
</script>

<style>
</style>
