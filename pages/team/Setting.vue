<template>
  <div class="team-create white min-h-100"
       v-if="myTeam">
    <v-layout align-center
              justify-center>
      <div class="my-4 text-xs-center">
        <div class="avatar-lg mx-3">
          <base-avatar v-bind="{src: avatar ? `${baseImageUrl}${avatar.src }`:`${baseImageUrl}${team.avatar }`}"></base-avatar>
        </div>
        <div class="pt-2 caption"
             @click="$refs.imageInput.chooseFile()">
          <image-uploader class="d-none"
                          ref="imageInput"
                          v-model="avatar"
                          :max="1" /> 点击更换旗帜
        </div>
      </div>
    </v-layout>
    <base-divider></base-divider>
    <div class="team-create-content px-3">
      <div class="py-2 team-create-name">
        <base-input prepend-inner-icon="iconfont icon-edit"
                    placeholder="请输入战队名称"
                    :disabled="true"
                    v-model="team.name"></base-input>
        <v-divider></v-divider>
      </div>
      <base-textarea placeholder="来一段霸气的战队宣言或者口号吧~"
                     counter="200"
                     v-model="team.slogan"></base-textarea>
    </div>
    <base-divider></base-divider>
    <div>
      <div class="py-2 px-3 border-bottom">
        入队验证
      </div>
      <v-radio-group v-model="team.permission"
                     class="px-3">
        <v-radio v-for="type of types"
                 color="primary"
                 :key="type.name"
                 :label="type.label"
                 :value="type.value"></v-radio>
      </v-radio-group>
    </div>
    <div class="px-4">
      <v-btn color="primary"
             :disabled="disabled"
             :loading="updating"
             @click="submit"
             block>确认</v-btn>
    </div>
  </div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
import { mapActions, mapGetters } from 'vuex'
import constant from '@const/public'
import { teamPermissionTypes } from '@const'
export default {
  components: {
    ImageUploader
  },
  head: () => ({
    title: '战队设置'
  }),
  meta: {
    title: '战队设置'
  },
  data: () => ({
    team: {},
    avatar: null,
    baseImageUrl: constant.BASE_URL,
    types: teamPermissionTypes,
    updating: false
  }),
  computed: {
    ...mapGetters({
      myTeam: 'team/myTeam'
    }),
    disabled() {
      return !(!!this.team.name && !!this.team.slogan && !!this.team.permission)
    }
  },
  methods: {
    ...mapActions({
      updateSettings: 'team/updateSettings',
      fetchMyTeamInfo: 'team/fetchMyTeamInfo',
      fetchSettings: 'team/fetchSettings'
    }),
    submit() {
      if (this.avatar) this.team.avatar = this.avatar.src
      this.updating = true
      this.updateSettings(this.team).then(res => {
        this.updating = false
        this.fetchMyTeamInfo()
        this.$router.back()
      })
    }
  },
  mounted() {
    if (!this.myTeam) {
      this.fetchMyTeamInfo().then(res => {
        this.team = res
      })
    } else {
      this.team = Object.assign({}, this.myTeam)
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
