<template>
  <div class="team-create white min-h-100">
    <v-layout align-center
              justify-center>
      <div class="my-4 text-xs-center">
        <img src="@img/avatar.jpg"
             class="avatar-xl">
        <div class="pt-2 caption">点击上传旗帜</div>
      </div>
    </v-layout>
    <base-divider></base-divider>
    <div class="team-create-content px-3">
      <div class="py-2 team-create-name">
        <base-input prepend-inner-icon="iconfont icon-edit"
                    placeholder="请输入战队名称"></base-input>
        <v-divider></v-divider>
      </div>
      <base-textarea placeholder="来一段霸气的战队宣言或者口号吧~"
                     v-model="text"></base-textarea>
    </div>
    <base-divider></base-divider>
    <div class="team-create-invite px-3">
      <v-layout class="py-3">
        <span class="subheading">邀请好友
          <span class="text-muted caption">(请至少邀请5名)</span>
        </span>
        <v-spacer></v-spacer>
        <span class="text-muted">共6人</span>
      </v-layout>
      <v-container grid-list-lg
                   fluid
                   class="px-0">
        <v-layout row
                  wrap>
          <v-flex xs2
                  class="text-xs-center team-invite-item"
                  v-for="n of 5"
                  :key="n">
            <img src="@img/avatar.jpg"
                 class="w-100">
            <div class="caption">林蛋大</div>
            <div class="team-invite-item-close">
              <v-btn small
                     icon
                     color="secondary darken-3"
                     class="ma-0">
                <v-icon class="caption"
                        color="white">iconfont icon-x</v-icon>
              </v-btn>
            </div>
          </v-flex>
          <v-flex xs2
                  v-ripple
                  class="text-xs-center">
            <svg-plus class="w-100"></svg-plus>
            <div class="caption">邀请</div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-layout class="mt-3"
                align-center
                justify-center>
        <v-flex xs10>
          <v-btn color="primary"
                 block>提交</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  head: () => ({
    title: '创建战队'
  }),
  meta: {
    title: '创建战队'
  },
  data: () => ({
    text: ''
  })
}
</script>

<style lang="scss">
.team-create {
  .team-create-content .team-create-name {
    .v-input__control .v-input__slot {
      padding: 0;
    }
  }
  .team-create-invite .team-invite-item {
    position: relative;
    .team-invite-item-close {
      position: absolute;
      transform: scale(0.5);
      top: 0;
      right: 0;
      transform-origin: top right;
    }
  }
}
</style>
