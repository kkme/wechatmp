<template>
  <v-dialog ref="dialog"
            class="time-picker"
            v-model="modal"
            :return-value.sync="time"
            persistent
            lazy
            full-width
            width="290px">
    <base-input slot="activator"
                v-model="time"
                readonly
                class="px-0"
                :placeholder="$attrs.placeholder"
                :bordered="$attrs.bordered"
                ref="activator"></base-input>
    <v-time-picker v-if="modal"
                   v-model="time"
                   format="24hr"
                   scrollable>
      <v-spacer></v-spacer>
      <v-btn flat
             color="primary"
             @click="modal = false">取消</v-btn>
      <v-btn flat
             color="primary"
             @click="onClick">确定</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
import constant from '@const/public'
export default {
  inheritAttrs: false,
  props: {
    min: {
      type: String,
      defalut: constant.DATA_PICKER_MIN_DATE
    },
    max: String,
    ltr: {
      type: [String, Boolean],
      defalut: false
    }
  },
  data: () => ({
    time: null,
    modal: false
  }),
  methods: {
    active() {
      this.$refs.activator.click()
    },
    onClick() {
      this.$refs.dialog.save(this.time)
      this.$emit('input', this.time)
    }
  }
}
</script>

<style lang="scss">
.time-picker {
    .v-date-picker-years {
        -webkit-overflow-scrolling: touch;
        user-select: none;
        li:hover {
            background: unset;
        }
    }
    .v-btn:hover:before {
        background: unset;
    }
}
</style>
