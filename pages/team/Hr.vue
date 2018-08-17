<template>
  <v-tabs v-model="active"
          color="white"
          fixed-tabs
          slider-color="primary">
    <v-tab ripple>成员列表</v-tab>
    <v-tab ripple>管理人员</v-tab>
    <v-tab ripple>入队申请</v-tab>
    <v-tab-item>
      <team-member-selector :items="members"
                            v-model="selectedMember"></team-member-selector>
      <base-infinite @infinite="getMoreMember"></base-infinite>
      <bottom-btns :disabled="!selectedMember || selectedMember.length === 0"
                   border
                   rounded
                   class="px-4 py-3 border-bottom">
        <v-btn slot="no"
               color="white"
               class="ma-0 elevation-0"
               @click="onRemoveMember"
               :disabled="!selectedMember || selectedMember.length === 0"
               block>移除成员</v-btn>
        <v-btn slot="yes"
               color="primary"
               class="ma-0 elevation-0"
               :disabled="!selectedMember || selectedMember.length === 0"
               block>赠送积分</v-btn>
      </bottom-btns>
    </v-tab-item>
    <v-tab-item>
      <team-member-selector></team-member-selector>
    </v-tab-item>
    <v-tab-item>
      <team-member-selector></team-member-selector>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import BottomBtns from '@/components/BottomBtns'
import { page } from '@mixins'
import { mapGetters, mapActions } from 'vuex'
import TeamMemberSelector from '@/components/TeamMemberSelector'
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
    items: [
      { id: '1a', name: '击杀风毒龙', level: '12' },
      { id: '2b', name: '击杀风毒龙', level: '12' },
      { id: '3c', name: '击杀风毒龙', level: '12' },
      { id: '4d', name: '击杀风毒龙', level: '12' },
      { id: '5e', name: '击杀风毒龙', level: '12' }
    ],
    active: null,
    selectedMember: []
  }),
  computed: {
    ...mapGetters({
      members: 'team/members'
    })
  },
  methods: {
    ...mapActions({
      fetchMembers: 'team/fetchMembers',
      removeMember: 'team/removeMember'
    }),
    getMoreMember($infinite) {
      this.infiniteLoading($infinite, this.fetchMembers, 'memberPage')
    },
    onRemoveMember() {
      if (this.selectedMember.length) {
        this.selectedMember.forEach(id => {
          this.removeMember({ id })
        })
      }
    }
  }
}
</script>

<style lang="scss">
</style>
