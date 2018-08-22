<template>
  <div class="avatar-wrap">
    <v-avatar size="100%"
              ref="avatar"
              color="primary">
      <img :src="src ? `${baseImgUrl}${src}` : defalutAvatar"
           v-bind="$attrs"
           v-on="$listeners">
    </v-avatar>
  </div>

</template>

<script>
import constant from '@const/public'
export default {
  inheritAttrs: false,
  props: ['src'],
  data: () => ({
    baseImgUrl: constant.BASE_URL,
    defalutAvatar: constant.AVATAR
  })
}
</script>

<style lang="scss">
.avatar-wrap {
  width: 100%;
  padding-top: 100%;
  position: relative;
  .v-avatar {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }
}
</style>
