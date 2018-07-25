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
  VTabs,
  VTextField,
  VRadioGroup,
  VTextarea,
  VDatePicker
} from 'vuetify'

import { Ripple } from 'vuetify/es5/directives'

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
    VTabs,
    VTextField,
    VRadioGroup,
    VTextarea,
    VDatePicker
  },
  theme: {
    primary: '#8bc271',
    secondary: '#424242',
    accent: '#ffa433',
    error: '#fe4343',
    info: '#2196F3',
    success: '#62b13b',
    warning: '#FFC107'
  },
  icons: {
    radioOn: 'iconfont icon-radio_on',
    radioOff: 'iconfont icon-radio_off'
  },
  directives: {
    Ripple
  }
})
