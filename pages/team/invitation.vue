<template>
  <div class="team-invitation">
    <v-list class="py-0"
            dense
            two-line>
      <template v-for="(item, index) in items">
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
    </v-list>
    <bottom-btns :disabled="!checked"
                 border
                 rounded
                 class="px-4 py-3 border-bottom"></bottom-btns>
  </div>
</template>

<script>
import BottomBtns from '@/components/BottomBtns'
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
  data: () => ({
    items: [
      { id: '1a', title: '击杀风毒龙', date: '2018-08-09 08:00' },
      { id: '2b', title: '击杀风毒龙', date: '2018-08-09 08:00' },
      { id: '3c', title: '击杀风毒龙', date: '2018-08-09 08:00' },
      { id: '4d', title: '击杀风毒龙', date: '2018-08-09 08:00' },
      { id: '5e', title: '击杀风毒龙', date: '2018-08-09 08:00' }
    ],
    checked: false
  })
}
</script>

<style lang="scss">
</style>
