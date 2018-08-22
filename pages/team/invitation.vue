<template>
  <div class="team-invitation">
    <v-list class="py-0"
            dense
            two-line>
      <template v-for="(item, index) in invitations">
        <v-list-tile :key="item.applyForId">

          <v-list-tile-content class="pl-2">
            <v-list-tile-title v-text="item.teamName"></v-list-tile-title>
            <v-list-tile-sub-title v-text="item.createTime"></v-list-tile-sub-title>

          </v-list-tile-content>
          <div>
            <v-checkbox :value="item.applyForId"
                        v-model="checked"
                        color="primary"
                        class="flex-0"></v-checkbox>
          </div>
        </v-list-tile>
        <div class="px-3"
             v-if="index !== invitations.length - 1"
             :key="index">
          <v-divider/>
        </div>
      </template>
      <base-infinite @infinite="infinite($event, fetchInvitations)"></base-infinite>
    </v-list>
    <bottom-btns border
                 rounded
                 :disabled="!checked.length"
                 @yes="accept"
                 @no="reject"
                 class="px-4 py-3 border-bottom">
      <template slot="yes">
        <v-btn color="primary"
               class="ma-0 elevation-0"
               :disabled="checked.length !== 1"
               @click="accept"
               block>同意</v-btn>
      </template>
    </bottom-btns>
  </div>
</template>

<script>
import BottomBtns from '@/components/BottomBtns'
import { mapActions, mapGetters } from 'vuex'
import { page } from '@mixins'
import { labelToValue } from '@helper'
import { teamInvitationHandlerTypes } from '@const'
export default {
  components: {
    BottomBtns
  },
  head: () => ({
    title: '战队邀请'
  }),
  meta: {
    title: '战队邀请'
  },
  mixins: [page],
  data: () => ({
    checked: []
  }),
  computed: {
    ...mapGetters({
      invitations: 'team/invitations'
    })
  },
  methods: {
    ...mapActions({
      fetchInvitations: 'team/fetchInvitations',
      handleInvitation: 'team/handleInvitation',
      removeUser: 'team/removeMissonAppliedUser'
    }),
    reject() {
      if (this.checked.length > 0) {
        let status = labelToValue('reject', teamInvitationHandlerTypes)
        let actions = this.checked.map(id => Promise.resolve(this.handleInvitation({ id, status })))
        Promise.all(actions)
          .then(res => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    accept() {
      let status = labelToValue('accept', teamInvitationHandlerTypes)
      let id = this.checked[0]
      if (id) {
        this.handleInvitation({ id, status }).then(res => {
          this.$router.push('/team')
        })
      }
    }
  }
}
</script>
