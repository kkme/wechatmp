<template>
  <div class="wallet">
    <v-layout align-center
              class="wallet-balance">

      <v-layout align-center
                justify-center
                class="px-3 mb-5 primary--text">
        <div class="display-1">￥ {{ baseInfo.balance }}</div>
        <v-divider class="mx-4"
                   inset
                   vertical
                   style="border-color: currentColor"></v-divider>

        <v-btn color="primary"
               class="px-4 ma-0"
               outline
               round>我要提现</v-btn>
      </v-layout>
    </v-layout>
    <div class="px-3 py-2 subheading border-bottom">钱包</div>
    <div class="px-3">
      <v-layout class="py-2 border-bottom"
                align-center
                v-for="n of 10"
                :key="n">
        <v-flex class="text-truncate pr-3">
          <div class="body-2 text-truncate">提现
            <span class="caption text-muted "
                  v-if="n%2!==0">(试吃调研项目，第二期工资结算)</span>
          </div>
          <div class="caption">2018-02-05 08:00</div>
        </v-flex>
        <div>
          <div class="error--text text-xs-right body-2"
               :class="n%2===0 ? 'error--text' : 'success--text'">-200</div>
          <div class="caption"
               v-if="n%2===0">提现失败</div>
        </div>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  head: () => ({
    title: '我的钱包'
  }),
  meta: {
    title: '我的钱包'
  },
  computed: {
    ...mapGetters({
      walletLog: 'users/walletLog',
      baseInfo: 'users/baseInfo'
    })
  },
  methods: {
    ...mapActions({
      fetchBaseInfo: 'users/fetchBaseInfo',
      fetchWalletLog: 'users/fetchWalletLog'
    })
  },
  mounted() {
    if (!(this.baseInfo.balance >= 0)) {
      this.fetchBaseInfo()
    }
    this.fetchWalletLog()
  }
}
</script>

<style lang="scss">
.wallet {
  .wallet-balance {
    background: url('~@svg/wallet_bg.svg') no-repeat center bottom;
    background-size: 100%;
    height: 26.98vh;
    & > div {
      height: 48px;
    }
  }
}
</style>
