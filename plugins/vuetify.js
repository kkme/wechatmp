import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VCard,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VBottomNav,
  VDivider,
  VDialog,
  VTabs,
  VTextField,
  VRadioGroup,
  VTextarea,
  VDatePicker,
  VbottomSheet,
  VCheckbox
} from 'vuetify'

import { Ripple, Scroll } from 'vuetify/es5/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VBottomNav,
    VDivider,
    VDialog,
    VTabs,
    VTextField,
    VRadioGroup,
    VTextarea,
    VDatePicker,
    VbottomSheet,
    VCheckbox
  },
  theme: {
    primary: '#8bc271',
    secondary: '#e6e6e6',
    accent: '#ffa433',
    error: '#fe4343',
    info: '#2196F3',
    success: '#62b13b',
    warning: '#FFC107'
  },
  icons: {
    radioOn: 'iconfont icon-radio_on',
    radioOff: 'iconfont icon-radio_off',
    checkboxOn: 'iconfont icon-check_on',
    checkboxOff: 'iconfont icon-radio_off',
    clear: 'iconfont icon-clear'
  },
  directives: {
    Ripple,
    Scroll
  }
})
