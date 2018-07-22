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
  VTabs
} from 'vuetify'

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
    VTabs
  },
  theme: {
    primary: '#8bc271',
    secondary: '#424242',
    accent: '#ffa433',
    error: '#fe4343',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
