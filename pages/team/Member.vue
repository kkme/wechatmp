<template>
  <v-list class="py-0 team-member"
          dense
          three-line>
    <template v-for="(member, index) in members">
      <v-list-tile :key="member.id">
        <div class="avatar mx-3 flex-auto">
          <base-avatar :src="member.avatar"></base-avatar>
        </div>
        <v-list-tile-content class="pl-2">
          <v-list-tile-title>
            <div class="d-flex align-center">
              <span class="flex-auto">{{member.username}}</span>
              <base-tag color="accent"
                        class="flex-auto mx-3">{{member.position | valueToLabel(teamRoles)}}</base-tag>
            </div>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <span>
              <v-icon class="icon--text mr-0">icon-phone iconfont</v-icon>{{member.tel}} |</span>
            <span>等级:{{member.level}} |</span>
            <span>信誉:{{member.reputation}}</span>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title>
            <span>入队时间:{{member.createtime}}</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <div class="px-3"
           v-if="index !== members.length - 1"
           :key="index">
        <v-divider/>
      </div>
    </template>
    <base-infinite @infinite="infinite($event, fetchMembers)"></base-infinite>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { page } from '@mixins'
import { teamRoles } from '@const'
export default {
  head: () => ({
    title: '战队成员'
  }),
  meta: {
    title: '战队成员'
  },
  mixins: [page],
  data: () => ({
    teamRoles
  }),
  computed: {
    ...mapGetters({
      members: 'team/members'
    })
  },
  methods: {
    ...mapActions({
      fetchMembers: 'team/fetchMembers'
    })
  }
}
</script>

<style lang="scss">
.team-member {
  .team-member-action-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid $border-color;
    .team-member-aciton {
      position: relative;
      border: 1px solid $primary;
      border-radius: $border-radius * 2;
    }
  }
}
</style>
