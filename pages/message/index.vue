<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list two-line
                subheader>

          <v-list-tile v-for="item in items"
                       :key="item.title"
                       @click="">
            <v-list-tile-avatar>
              <simple-svg :filepath="item.icon" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <simple-svg :filepath="require('@svg/right.svg')" />
            </v-list-tile-action>
          </v-list-tile>
          <v-divider inset></v-divider>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import iconMission from '@svg/notice_mission.svg'
import iconApply from '@svg/notice_apply.svg'
import iconTeam from '@svg/notice_team.svg'
import iconSys from '@svg/notice_sys.svg'
import iconCharge from '@svg/notice_charge.svg'
export default {
  head: () => ({
    title: '消息中心'
  }),
  meta: {
    title: '消息中心'
  },
  data () {
    return {
      items: [
        { icon: iconMission, iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
        { icon: iconApply, iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
        { icon: iconTeam, iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' },
        { icon: iconSys, iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' },
        { icon: iconCharge, iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
