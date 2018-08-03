<template>
  <v-tabs v-model="active"
          color="white"
          fixed-tabs
          slider-color="primary">
    <v-tab ripple>成员列表</v-tab>
    <v-tab ripple>管理人员</v-tab>
    <v-tab ripple>入队申请</v-tab>
    <v-tab-item>
      <v-list class="py-0 team-member"
              dense
              two-line>
        <template v-for="(item, index) in items">
          <v-list-tile :key="item.id">
            <v-list-tile-avatar>
              <img src="@img/avatar.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content class="pl-2">
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
              <v-list-tile-sub-title>
                <span>
                  <v-icon class="icon--text mr-0">icon-phone iconfont</v-icon>{{item.level}}1355106564 |</span>
                <span>等级:{{item.level}} |</span>
                <span>信誉:{{item.level}} |</span>
                <span>入队时间:{{item.level}}</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <span>
                <v-checkbox :value="item.id"
                            v-model="checked"
                            color="primary"
                            class="flex-0"></v-checkbox>
              </span>
            </v-list-tile-action>
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
                   class="px-4 py-3 border-bottom">
        <v-btn slot="no"
               color="white"
               class="ma-0 elevation-0"
               :disabled="!checked"
               block>移除成员</v-btn>
        <v-btn slot="yes"
               color="primary"
               class="ma-0 elevation-0"
               :disabled="!checked"
               block>赠送积分</v-btn>
      </bottom-btns>
    </v-tab-item>
    <v-tab-item>

    </v-tab-item>
    <v-tab-item>

    </v-tab-item>
  </v-tabs>
</template>

<script>
import BottomBtns from '@/components/BottomBtns'
export default {
  components: {
    BottomBtns
  },
  head: () => ({
    title: '人员管理'
  }),
  meta: {
    title: '人员管理'
  },
  data: () => ({
    items: [
      { id: '1a', name: '击杀风毒龙', level: '12' },
      { id: '2b', name: '击杀风毒龙', level: '12' },
      { id: '3c', name: '击杀风毒龙', level: '12' },
      { id: '4d', name: '击杀风毒龙', level: '12' },
      { id: '5e', name: '击杀风毒龙', level: '12' }
    ],
    checked: false,
    active: null
  })
}
</script>

<style lang="scss">
</style>
