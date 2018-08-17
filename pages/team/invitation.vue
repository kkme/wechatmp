<template>
  <div class="team-invitation">
    <v-list class="py-0"
            dense
            two-line>
      <template v-for="(item, index) in invitations">
        <v-list-tile :key="item.id">

          <v-list-tile-content class="pl-2">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-text="item.date"></v-list-tile-sub-title>

          </v-list-tile-content>
          <div>
            <v-checkbox :value="item.id"
                        v-model="checked"
                        color="primary"
                        class="flex-0"></v-checkbox>
          </div>
        </v-list-tile>
        <div class="px-3"
             v-if="index !== items.length - 1"
             :key="index">
          <v-divider/>
        </div>
      </template>
      <base-infinite @infinite="infinite($event, fetchInvitations)"></base-infinite>
    </v-list>
    <bottom-btns :disabled="!checked"
                 border
                 rounded
                 class="px-4 py-3 border-bottom"></bottom-btns>
  </div>
</template>

<script>
import BottomBtns from '@/components/BottomBtns'
import { mapActions, mapGetters } from 'vuex'
import { page } from '@mixins'
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
    checked: false
  }),
  computed: {
    ...mapGetters({
      invitations: 'team/invitations'
    })
  },
  methods: {
    ...mapActions({
      fetchInvitations: 'team/fetchInvitations'
    })
  }
}
</script>

<style lang="scss">
</style>
