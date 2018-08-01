<template>
  <v-list class="py-0 team-member"
          dense
          three-line>
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
            <span>信誉:{{item.level}}</span>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title>
            <span>入队时间:{{item.level}}</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <div class="px-3"
           v-if="index !== items.length - 1"
           :key="index">
        <v-divider/>
      </div>
    </template>
  </v-list>
</template>

<script>
export default {
  head: () => ({
    title: '战队成员'
  }),
  meta: {
    title: '战队成员'
  },
  data: () => ({
    items: [
      { id: '1a', name: '击杀风毒龙', level: '12' },
      { id: '2b', name: '击杀风毒龙', level: '12' },
      { id: '3c', name: '击杀风毒龙', level: '12' },
      { id: '4d', name: '击杀风毒龙', level: '12' },
      { id: '5e', name: '击杀风毒龙', level: '12' }
    ]
  })
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
