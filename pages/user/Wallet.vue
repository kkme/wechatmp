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
               @click="dialog = true"
               round>我要提现</v-btn>
      </v-layout>
    </v-layout>
    <div class="px-3 py-2 subheading border-bottom">钱包</div>
    <div class="px-3">
      <v-layout class="py-2 border-bottom"
                align-center
                v-for="item of walletLog"
                :key="item.id">
        <v-flex class="text-truncate pr-3">
          <div class="body-2 text-truncate">{{ item.financetype }}
            <span class="caption text-muted "
                  v-if="item.directions">({{ item.directions }})</span>
          </div>
          <div class="caption">{{ item.createtime }}</div>
        </v-flex>
        <div>
          <div class="error--text text-xs-right body-2"
               :class="item.amount < 0 ? 'error--text' : 'success--text'">{{ item.amount }}</div>
          <div class="caption"
               v-if="item.handlerType">{{ item.handlerType }}</div>
        </div>
      </v-layout>
      <base-infinite @infinite="getMoreData"></base-infinite>
    </div>
    <v-form v-model="valid"
            ref="form"
            lazy-validation>
      <v-dialog v-model="dialog"
                max-width="500px">
        <v-card>
          <v-card-title class="justify-center pt-4">
            <span class="title">我要提现到支付宝</span>
          </v-card-title>
          <v-card-text>
            <div class="mx-3">
              <v-text-field label="金额"
                            v-model.number="amount"
                            type="number"
                            :rules="amountRules"
                            clearable
                            min="1"></v-text-field>
            </div>
            <v-card-actions>
              <v-btn color="primary"
                     block
                     class="mx-4 my-3"
                     :disabled="!valid"
                     :loading="loading"
                     @click="submit">确定</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { page } from '@mixins'

export default {
  head: () => ({
    title: '我的钱包'
  }),
  meta: {
    title: '我的钱包'
  },
  mixins: [page],
  data: () => ({
    dialog: false,
    valid: false,
    loading: false,
    amount: null,
    amountRules: [
      // v => !/\\.\\d?\\.+/.test(v) || '禁止录入两个以上的点',
      // v => !/^0(\\d+)$/.test(v) || '禁止录入整数部分两位以上，但首位为0',
      // v => !/[\\d\\.]+$/.test(v) || '禁止录入任何非数字和点',
      // v => !/^(\\d+\\.\\d{2}).+/.test(v) || '禁止录入小数点后两位以上',

      v => v > 0 || '最小限额为1元'
    ]
  }),
  computed: {
    ...mapGetters({
      walletLog: 'users/walletLog',
      baseInfo: 'users/baseInfo'
    })
  },
  methods: {
    ...mapActions({
      fetchBaseInfo: 'users/fetchBaseInfo',
      fetchWalletLog: 'users/fetchWalletLog',
      withdraw: 'users/withdraw'
    }),
    getMoreData($infinite) {
      this.getPage(this.page)
      this.fetchWalletLog(this.page).then(res => {
        $infinite.loaded()
        if (res.length < this.page.pagesize || res.length === 0) {
          $infinite.complete()
        }
      })
    },
    submit() {
      if (this.valid) {
        this.loading = true
        this.withdraw({
          receiptremark: '支付宝提现',
          price: this.amount
        })
          .then(res => {
            this.loading = false
            this.dialog = false
          })
          .catch(error => {
            this.loading = false
            if (error.code === 5000002) {
              this.$router.push('/user/resume/info')
            }
            console.log(error)
          })
      }
    }
  },
  mounted() {
    if (!(this.baseInfo.balance >= 0)) {
      this.fetchBaseInfo()
    }
  }
}
</script>

<style lang="scss">
.wallet {
  .wallet-balance {
    background: url('~@svg/wallet_bg.svg') no-repeat center bottom;
    background-size: 100%;
    height: 27vh;
    & > div {
      height: 48px;
    }
  }
}
</style>
