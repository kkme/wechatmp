<template>
  <div class="team-create white min-h-100">
    <v-layout align-center
              justify-center>
      <div class="my-4 text-xs-center">
        <div class="avatar-lg mx-3">
          <base-avatar v-bind="{src: avatar ? `${avatar.src}`: false}"></base-avatar>
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
                    v-model="name"></base-input>
        <v-divider></v-divider>
      </div>
      <base-textarea placeholder="来一段霸气的战队宣言或者口号吧~"
                     counter="500"
                     v-model="slogan"></base-textarea>
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
                 @click="$refs.searchDialog.active()"
                 class="line-height-0">
              <svg-plus class="w-100"></svg-plus>
            </div>
            <div class="caption mt-2">邀请</div>
            <team-invite-dialog @search="onSearch"
                                ref="searchDialog"></team-invite-dialog>
          </v-flex>
        </v-layout>
      </v-container>

      <v-divider></v-divider>
      <div>
        <bottom-btns class="pa-3"
                     rounded
                     border>
          <v-btn slot="no"
                 class="ma-0"
                 color="white"
                 depressed
                 @click="$refs.modal.active()"
                 block>取消创建</v-btn>
          <v-btn slot="yes"
                 class="ma-0"
                 color="primary"
                 depressed
                 @click="submit"
                 block>修改</v-btn>
        </bottom-btns>
      </div>
    </div>
    <base-modal ref="modal"
                @confirm="dissolveTeam" />
  </div>
</template>

<script>
import BottomBtns from '@/components/BottomBtns'
import ImageUploader from '@/components/ImageUploader'
import TeamInviteDialog from '@/components/TeamInviteDialog'
import { mapActions, mapGetters } from 'vuex'
import constant from '@const/public'
export default {
  components: {
    ImageUploader,
    TeamInviteDialog,
    BottomBtns
  },
  head: () => ({
    title: '创建战队'
  }),
  meta: {
    title: '创建战队'
  },
  data: () => ({
    team: {},
    name: '',
    slogan: '',
    avatar: null,
    inviteList: [],
    minInvite: constant.TEAM_CREATE_MIN_MEMBER,
    creating: false,
    id: null,
    dialog: false
  }),
  computed: {
    ...mapGetters({
      teamCreateInfo: 'team/teamCreateInfo'
    }),
    disabled() {
      return !(this.name && this.slogan && this.inviteList.length >= this.minInvite && this.avatar && this.avatar.src)
    }
  },
  methods: {
    ...mapActions({
      createTeam: 'team/createTeam',
      fetchTeamCreateInfo: 'team/fetchTeamCreateInfo',
      dissolveTeam: 'team/dissolveTeam'
    }),
    onSearch(data) {
      if (this.inviteList.find(user => user.userId === data.userId)) {
        this.$store.dispatch('sys/showSnackbar', { msg: '一个账号只能添加一次！', color: 'error' })
      } else {
        this.inviteList.push(data)
      }
    },
    submit() {
      this.creating = true
      this.team.avatar = this.avatar.src
      this.team.userIdList = this.inviteList.map(user => user.userId)
      this.team.name = this.name
      this.team.slogan = this.slogan
      if (this.id) this.team.id = this.id
      this.createTeam(this.team).then(res => {
        this.creating = false
        this.$router.push('/team')
      })
    }
  },
  mounted() {
    this.fetchTeamCreateInfo().then(res => {
      if (res) {
        this.name = res.name
        this.slogan = res.slogan
        this.avatar = {}
        this.$set(this.avatar, 'src', res.avatar)
        this.inviteList = res.inviteUsers
        this.id = res.id
      }
    })
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
