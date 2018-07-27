<template>
  <v-layout class="base-input"
            align-center>
    <v-flex>
      <v-text-field single-line
                    full-width
                    hide-details
                    flat
                    solo
                    @input="$emit('input', inputValue)"
                    v-on="$listeners"
                    v-bind="$attrs"
                    :value="value"
                    v-model="inputValue"></v-text-field>
    </v-flex>
    <v-btn class="base-input-btn1 body-1 ml-0 mr-3"
           v-if="sms !== null"
           depressed
           outline
           small
           color="primary"
           :disabled="!valiPhone || disableSms"
           @click="getCode">获取验证码{{ countDown ? countDown : '' }}</v-btn>
  </v-layout>
</template>

<script>
import constant from '@const/public'
import rules from '@const/rules'

export default {
  inheritAttrs: false,
  props: {
    sms: {
      type: String,
      default: null
    },
    value: String
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        this.inputValue = newVal
        console.log(newVal, oldVal, this.inputValue)
      },
      immediate: true
    }
  },
  data: () => ({
    inputValue: null,
    initCountDown: constant.SMS_COUNTDOWN,
    countDown: 0,
    disableSms: false
  }),
  computed: {
    valiPhone() {
      return rules.phone.test(this.sms)
    }
  },
  methods: {
    onAppend(e) {
      console.log(e)
    },
    getCode() {
      if (!this.valiPhone) {
        alert(1)
        return
      }
      if (!this.disableSms) {
        this.disableSms = true
        this.countDown = this.initCountDown
        let timer = setInterval(() => {
          this.countDown--
          if (this.countDown === 0) {
            this.countDown = this.countDown
            this.disableSms = false
            clearInterval(timer)
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
.base-input {
    position: relative;
    .v-text-field.v-text-field--solo .v-input__control {
        min-height: 35px;
        background-color: transparent;
    }
    .base-input-btn {
        position: absolute;
        right: 16px;
        top: 8px;
    }
    input:focus {
        font-size: 16px;
    }
    input::placeholder {
        font-size: 14px;
    }
}
</style>
