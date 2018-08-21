<template>
  <div class="team-create white min-h-100">
    <v-layout align-center
              justify-center>
      <div class="my-4 text-xs-center">
        <div class="avatar-lg mx-3">
          <base-avatar v-bind="{src: avatar ? `${baseImageUrl}${avatar.src}`: false}"></base-avatar>
        </div>
        <div class="pt-2 caption"
             @click="$refs.imageInput.chooseFile()">
          <image-uploader class="d-none"
                          ref="imageInput"
                          v-model="avatar"
                          :max="1" /> 点击上传旗帜
        </div>
      </div>
    </v-layout>
    <base-divider></base-divider>
    <div class="team-create-content px-3">
      <div class="py-2 team-create-name">
        <base-input prepend-inner-icon="iconfont icon-edit"
                    placeholder="请输入战队名称"
                    v-model="team.name"></base-input>
        <v-divider></v-divider>
      </div>
      <base-textarea placeholder="来一段霸气的战队宣言或者口号吧~"
                     counter="500"
                     v-model="team.slogan"></base-textarea>
    </div>
    <base-divider></base-divider>
    <div class="team-create-invite px-3">
      <v-layout class="py-3">
        <span class="subheading">邀请好友
          <span class="text-muted caption">(请至少邀请{{minInvite}}名)</span>
        </span>
        <v-spacer></v-spacer>
        <span class="text-muted">共{{inviteList.length || 0}}人</span>
      </v-layout>
      <v-container grid-list-lg
                   fluid
                   class="px-0">
        <v-layout row
                  wrap>
          <v-flex xs2
                  class="text-xs-center team-invite-item"
                  v-for="(user, index) of inviteList"
                  :key="user.userId">
            <div v-ripple>
              <base-avatar :src="user.avatar"></base-avatar>
            </div>
            <div class="caption mt-2">{{user.username}}</div>
            <div class="team-invite-item-close">
              <v-btn small
                     icon
                     color="secondary darken-3"
                     @click="inviteList.splice(index, 1)"
                     class="ma-0">
                <v-icon class="caption"
                        color="white">iconfont icon-x</v-icon>
              </v-btn>
            </div>
          </v-flex>
          <v-flex xs2
                  class="text-xs-center">
            <div v-ripple
                 @click="dialog = true"
                 class="line-height-0">
              <svg-plus class="w-100"></svg-plus>
            </div>
            <div class="caption mt-2">邀请</div>
            <v-dialog v-model="dialog"
                      max-width="500px">
              <v-card>
                <v-card-title class="justify-center pt-4">
                  <span class="title">邀请加入战队</span>
                </v-card-title>
                <v-card-text>
                  <div class="mx-3">
                    <v-text-field label="关键字"
                                  v-model="keyword"
                                  clearable></v-text-field>
                  </div>
                  <v-card-actions>
                    <v-btn color="primary"
                           block
                           class="mx-4 my-3"
                           :disabled="!keyword"
                           :loading="loading"
                           @click="search">确定</v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>

      <v-divider></v-divider>
      <v-layout class="mt-3"
                align-center
                justify-center>
        <v-flex xs10>
          <v-btn color="primary"
                 :disabled="disabled"
                 @click="submit"
                 block>提交</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
import { mapActions } from 'vuex'
import constant from '@const/public'
export default {
  components: {
    ImageUploader
  },
  head: () => ({
    title: '创建战队'
  }),
  meta: {
    title: '创建战队'
  },
  data: () => ({
    team: {},
    avatar: null,
    inviteList: [],
    dialog: false,
    loading: false,
    keyword: null,
    baseImageUrl: constant.BASE_URL,
    minInvite: constant.TEAM_CREATE_MIN_MEMBER
  }),
  computed: {
    disabled() {
      return !(
        this.team.name &&
        this.team.slogan &&
        this.inviteList.length >= this.minInvite &&
        this.avatar &&
        this.avatar.src
      )
    }
  },
  methods: {
    ...mapActions({
      searchUser: 'team/searchUser',
      createTeam: 'team/createTeam'
    }),
    search() {
      if (this.keyword) {
        this.loading = true
        this.searchUser({ keyword: this.keyword, id: '' })
          .then(res => {
            if (this.inviteList.find(user => user.userId === res.userId)) {
              this.$store.dispatch('sys/showSnackbar', { msg: '一个账号只能添加一次！', color: 'error' })
            } else {
              this.inviteList.push(res)
            }
            this.loading = false
            this.dialog = false
          })
          .catch(error => {
            this.loading = false
            this.dialog = false
            console.log(error)
          })
      }
    },
    submit() {
      this.team.avatar = this.baseImageUrl + this.avatar.src
      this.team.userIdList = this.inviteList.map(user => user.userId)
      this.createTeam(this.team).then(res => {
        this.$router.push('/team')
      })
    }
  }
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
