<template>
  <div class="team-append-job-item white"
       v-if="item">
    <v-layout align-center
              class="px-3 py-2">
      <div class="text-muted">
        <div>{{item.teamMinNumber}} - {{item.teamMaxNumber}}人战队</div>
        <div class="caption">截止：{{item.endTime}}</div>
      </div>
      <v-spacer />
      <span class="pr-3"
            v-if="disableCount === false">已报名32人</span>
      <slot></slot>
    </v-layout>
    <v-layout v-if="disableAvatar === false"
              align-center
              class="grey lighten-4 py-2 px-3">
      <div class="avatar-sm mr-2"
           v-if="item.applyUsers && item.applyUsers.length > 0"
           v-for="user of item.applyUsers"
           :key="user.userId">
        <base-avatar :src="user.avatar" />
      </div>
      <v-spacer></v-spacer>
      <template v-if="item.applyNumber > 0">
        <full-screen-dialog title="已报名人员">
          <template slot="preview">
            <span>已报名{{item.applyNumber}}人</span>
          </template>
          <team-member-selector :items="item.applyUsers"
                                v-bind="{noSelect: noAction}"
                                v-if="item.applyUsers && item.applyUsers.length > 0"
                                v-model="selectedAppliedUsers" />
          <template v-if="!noAction">
            <bottom-btns single
                         class="px-4 py-3">
              <v-btn slot="yes"
                     color="error"
                     class="ma-0"
                     depressed
                     :disabled="!selectedAppliedUsers.length"
                     :loading="false"
                     @click="onRemoveUsers(item.taskId)"
                     block>移除</v-btn>
            </bottom-btns>
          </template>
        </full-screen-dialog>
        <v-icon>iconfont icon-right</v-icon>
      </template>
      <span v-else>暂无人报名</span>
    </v-layout>
    <v-divider></v-divider>
  </div>
</template>

<script>
import TeamMemberSelector from '@/components/TeamMemberSelector'
import FullScreenDialog from '@/components/FullScreenDialog'
import BottomBtns from '@/components/BottomBtns'
import { mapActions } from 'vuex'
export default {
  components: {
    TeamMemberSelector,
    FullScreenDialog,
    BottomBtns
  },
  props: {
    item: Object,
    disableAvatar: {
      type: [String, Boolean],
      default: false
    },
    disableCount: {
      type: [String, Boolean],
      default: false
    },
    noAction: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    selectedAppliedUsers: []
  }),
  methods: {
    ...mapActions({
      removeUser: 'team/removeMissonAppliedUser'
    }),
    onRemoveUsers(taskId) {
      if (this.selectedAppliedUsers.length > 0) {
        let actions = this.selectedAppliedUsers.map(userId => this.removeUser({ taskId, userId }))
        Promise.all(actions)
          .then(res => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style>
</style>
