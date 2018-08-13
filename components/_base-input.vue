<template>
  <v-layout class="base-input"
            v-bind="{'align-center': solo, 'align-end': !solo}"
            :class="{'base-input-bordered': bordered !== false }">
    <v-flex>
      <v-text-field single-line
                    hide-details
                    :flat="flat"
                    :solo="solo"
                    @input="$emit('input', inputValue)"
                    v-on="$listeners"
                    v-bind="$attrs"
                    :value="value"
                    class="mt-0"
                    v-model="inputValue"></v-text-field>
    </v-flex>
    <div>
      <v-btn class="base-input-btn body-1 ma-0"
             v-if="sms !== null"
             outline
             small
             color="primary"
             :disabled="!valiPhone || disableSms"
             @click="getCode">获取验证码{{ countDown ? countDown : '' }}</v-btn>
    </div>
    <div>
      <v-btn class="base-input-btn body-1 mx-0 px-0"
             v-if="captcha !== null"
             flat
             small
             color="primary"
             @click="changeImg">
        <img :src="url"
             class="w-100">
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import constant from '@const/public'
import rules from '@const/rules'
import { mapActions } from 'vuex'
import { smsTypes } from '@const'
import { labelToValue } from '@helper'
export default {
  inheritAttrs: false,
  props: {
    sms: {
      type: String,
      default: null
    },
    smsType: String,
    captcha: {
      type: String,
      default: null
    },
    value: String,
    bordered: {
      type: [String, Boolean],
      default: false
    },
    flat: {
      type: Boolean,
      default: true
    },
    solo: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      handler: function(newVal, oldVal) {
        this.inputValue = newVal
        // console.log(newVal, oldVal, this.inputValue)
      },
      immediate: true
    }
  },
  data: () => ({
    inputValue: null,
    initCountDown: constant.SMS_COUNTDOWN,
    countDown: 0,
    disableSms: false,
    url: constant.BASE_URL_CAPTCHA
  }),
  computed: {
    valiPhone() {
      return rules.phone.test(this.sms)
    }
  },
  methods: {
    ...mapActions({
      sendSmsCode: 'common/sendSmsCode'
    }),
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
        this.sendSmsCode({
          tel: this.sms,
          codeType: labelToValue(this.smsType || 'signup', smsTypes)
        })
      }
    },
    changeImg() {
      this.url = `${constant.BASE_URL_CAPTCHA}?${Math.random()}`
    }
  }
}
</script>

<style lang="scss">
.base-input {
    // position: relative;
    .v-text-field.v-text-field--solo .v-input__control {
        min-height: 35px;
        background-color: transparent;
    }
    &.base-input-bordered {
        .v-text-field input {
            padding: 4px 0 4px;
        }
        .v-text-field.v-text-field--solo .v-input__control {
            min-height: 28px;
            border: 1px solid $border-color-dark;
            border-radius: $border-radius;
        }
    }
    .base-input-action {
        // margin-right: 8em;
    }
    .base-input-btn {
        // position: absolute;
        // right: 0;
        // top: auto;
        // z-index: 1;
    }
    input:focus {
        font-size: 16px;
    }
    input::placeholder {
        font-size: 14px;
    }
}
</style>
