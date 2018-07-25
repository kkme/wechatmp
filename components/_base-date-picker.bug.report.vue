<template>
  <v-dialog ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px"
            class="data-picker-dialog">
    <!-- <v-text-field slot="activator"
                  v-model="date"
                  label="Picker in dialog"
                  prepend-icon="event"
                  readonly></v-text-field> -->
    <base-input slot="activator"
                v-model="date"
                readonly
                class="input-rtl px-0"></base-input>
    <v-date-picker v-model="date"
                   v-bind="$attrs"
                   locale="zh-cn"
                   :min="min"
                   :max="max"
                   :day-format="date => date.split('-')[2]"
                   scrollable
                   color="primary">
      <v-spacer></v-spacer>
      <v-btn flat
             color="primary"
             @click="modal = false">取消</v-btn>
      <v-btn flat
             color="primary"
             @click="$refs.dialog.save(date)">确定</v-btn>
    </v-date-picker>
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
    max: String
  },
  data: () => ({
    date: null,
    modal: false
  })
}
</script>

<style lang="scss">
.v-date-picker-years {
    -webkit-overflow-scrolling: touch;
    user-select: none;
    // li:hover {
    //     background: unset;
    // }
}
// .v-btn:hover:before {
//     background: unset;
// }
</style>
