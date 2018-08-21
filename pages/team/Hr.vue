<template>
  <div>
    <v-tabs v-model="active"
            color="white"
            fixed-tabs
            slider-color="primary">
      <v-tab ripple>成员列表</v-tab>
      <v-tab ripple>管理人员</v-tab>
      <v-tab ripple>入队申请</v-tab>
      <v-tab-item class="team-hr-item">
        <div v-if="active === 0">
          <team-member-selector :items="members"
                                v-model="selectedMember" />
          <base-infinite @infinite="getMoreMember" />
        </div>
      </v-tab-item>
      <v-tab-item class="team-hr-item">
        <team-member-selector :items="managers"
                              v-model="selectedManager" />
      </v-tab-item>
      <v-tab-item class="team-hr-item">
        <div v-if="active === 2">
          <team-member-selector :items="teamApplications"
                                v-model="selectedApplications" />
          <base-infinite @infinite="getMoreTeamApplications" />
        </div>
      </v-tab-item>
    </v-tabs>
    <bottom-btns :disabled="selectedMember.length === 0"
                 v-if="active === 0"
                 border
                 rounded
                 class="px-4 py-3 border-bottom">

      <v-btn slot="no"
             color="white"
             class="ma-0"
             depressed
             @click="onRemoveMember"
             :loading="removing"
             :disabled="selectedMember.length === 0"
             block>移除成员</v-btn>
      <v-flex>
        <v-btn block
               class="ma-0 border-right-radius-none"
               depressed
               :disabled="selectedMember.length === 0"
               :loading="promoting"
               @click="onChangeRole(selectedMember,labelToValue('manager', teamRoles), 'promoting')"
               color="primary">升职</v-btn>
      </v-flex>
      <v-btn slot="yes"
             color="primary"
             class="ma-0 border-left-radius-none"
             depressed
             :disabled="disableRewards"
             @click="pointsDialog = true"
             block>赠送积分</v-btn>
    </bottom-btns>
    <bottom-btns single
                 :disabled="selectedManager.length === 0"
                 v-if="active === 1"
                 border
                 rounded
                 class="px-4 py-3 border-bottom">
      <v-btn slot="yes"
             color="primary"
             class="ma-0"
             depressed
             :disabled="selectedManager.length === 0"
             @click="onChangeRole(selectedManager,labelToValue('member', teamRoles), 'changingRole')"
             :loading="changingRole"
             block>解除职位</v-btn>
    </bottom-btns>
    <bottom-btns :disabled="selectedApplications.length === 0"
                 v-if="active === 2"
                 border
                 :no-loading="rejecting"
                 :yes-loading="accepting"
                 rounded
                 @no="onHandleApplies('reject')"
                 @yes="onHandleApplies('accept')"
                 class="px-4 py-3 border-bottom">
    </bottom-btns>
    <v-form v-model="valid"
            ref="form"
            lazy-validation>
      <v-dialog v-model="pointsDialog"
                max-width="500px">
        <v-card>
          <v-card-title class="justify-center pt-4">
            <span class="title">赠送积分</span>
          </v-card-title>
          <v-card-text>
            <div class="mx-3">
              <v-text-field label="积分"
                            v-model.number="amount"
                            type="number"
                            :rules="amountRules"
                            clearable
                            min="1"></v-text-field>
            </div>
            <v-card-actions>
              <v-btn color="primary"
                     block
                     class="mx-4 my-3"
                     :disabled="!valid"
                     :loading="loading"
                     @click="onRewards">确定</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import BottomBtns from '@/components/BottomBtns'
import { page } from '@mixins'
import { mapGetters, mapActions } from 'vuex'
import TeamMemberSelector from '@/components/TeamMemberSelector'
import { teamRoles, teamApplicationHandleType } from '@const'
import { valueToLabel, labelToValue } from '@helper'
export default {
  components: {
    BottomBtns,
    TeamMemberSelector
  },
  head: () => ({
    title: '人员管理'
  }),
  meta: {
    title: '人员管理'
  },
  mixins: [page],
  data: () => ({
    active: 0,
    selectedMember: [],
    selectedManager: [],
    selectedApplications: [],
    teamRoles,
    valid: false,
    pointsDialog: false,
    loading: false,
    amount: null,
    amountRules: [v => v >= 1 || '最小限额为1分', v => !/[\\d]+$/.test(v) || '只能输入数字'],
    changingRole: false,
    promoting: false,
    rejecting: false,
    accepting: false,
    removing: false
  }),
  computed: {
    ...mapGetters({
      members: 'team/members',
      teamApplications: 'team/teamApplications'
    }),
    managers() {
      if (!this.members) return []
      return this.members.filter(member => {
        let type = valueToLabel(member.position, teamRoles, 'name')
        return type === 'owner' || type === 'manager'
      })
    },
    disableRewards() {
      return !(this.selectedMember.length > 0)
    }
  },
  methods: {
    ...mapActions({
      fetchMembers: 'team/fetchMembers',
      removeMember: 'team/removeMember',
      changeTeamRole: 'team/changeTeamRole',
      rewards: 'team/rewards',
      fetchTeamApplications: 'team/fetchTeamApplications',
      handleApplies: 'team/handleApplies'
    }),
    labelToValue,
    getMoreMember($infinite) {
      this.infiniteLoading($infinite, this.fetchMembers, 'memberPage')
    },
    getMoreTeamApplications($infinite) {
      this.infiniteLoading($infinite, this.fetchTeamApplications, 'teamApplicationsPage')
    },
    onRemoveMember() {
      if (this.selectedMember.length) {
        this.selectedMember.forEach(id => {
          this.removeMember({ id })
          this.removing = true
          let actions = this.selectedMember.map(userId => Promise.resolve(this.removeMember({ id })))
          Promise.all(actions)
            .then(res => {
              console.log(res)
              this.removing = false
              this.selectedMember = []
            })
            .catch(error => {
              console.log(error)
              this.removing = true
            })
        })
      }
    },
    onRewards() {
      if (this.selectedMember.length > 0 && this.$refs.form.validate()) {
        this.loading = true
        let actions = this.selectedMember.map(userId => this.rewards({ userId, intrgral: this.amount }))
        Promise.all(actions)
          .then(res => {
            console.log(res)
            this.pointsDialog = false
            this.loading = false
            this.selectedMember = []
          })
          .catch(error => {
            console.log(error)
            this.loading = false
          })
      }
    },
    onChangeRole(memberList, role, loading) {
      if (memberList.length > 0 && role) {
        this[loading] = true
        let actions = memberList.map(id => this.changeTeamRole({ id, checkSign: role }))
        Promise.all(actions)
          .then(res => {
            console.log(res)
            this[loading] = false
            memberList = []
          })
          .catch(error => {
            console.log(error)
            this[loading] = false
          })
      }
    },
    onHandleApplies(flag) {
      if (this.selectedApplications.length > 0) {
        this[`${flag}ing`] = true
        let type = labelToValue(flag, teamApplicationHandleType)
        let actions = this.selectedApplications.map(id => this.handleApplies({ id, type }))
        Promise.all(actions)
          .then(res => {
            console.log(res)
            this[`${flag}ing`] = false
            this.selectedApplications = []
          })
          .catch(error => {
            console.log(error)
            this[`${flag}ing`] = false
          })
      }
    }
  }
}
</script>
