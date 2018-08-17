<template>
  <v-avatar size="100%"
            color="primary">
    <img :src="src || defalutAvatar"
         v-bind="$attrs"
         v-on="$listeners">
  </v-avatar>

</template>

<script>
import constant from '@const/public'
export default {
  inheritAttrs: false,
  props: ['src'],
  data: () => ({
    defalutAvatar: constant.AVATAR
  })
}
</script>

<style>
</style>
