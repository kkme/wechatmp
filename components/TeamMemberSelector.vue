<template>
  <v-list class="py-0 team-member"
          v-if="items"
          dense
          avatar
          three-line>
    <template v-for="(item, index) in items">
      <v-list-tile :key="item.userId">
        <div class="avatar mx-3 flex-auto">
          <base-avatar :src="item.avatar"></base-avatar>
        </div>
        <v-list-tile-content class="pl-2">
          <v-list-tile-title v-text="item.username"></v-list-tile-title>
          <v-list-tile-sub-title class="caption">
            <span>
              <v-icon class="icon--text mr-0">icon-phone iconfont</v-icon>{{item.tel}} |</span>
            <span>等级:{{item.level}} |</span>
            <span>信誉:{{item.reputation}}</span>

          </v-list-tile-sub-title>
          <v-list-tile-sub-title class="caption">
            <span>入队时间:{{item.createtime}}</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <span>
            <v-checkbox :value="item.userId"
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
</template>

<script>
export default {
  props: ['items'],
  data: () => ({
    checked: []
  }),
  watch: {
    checked: {
      handler(newValue) {
        this.$emit('input', this.checked)
      },
      immediate: true
    }
  }
}
</script>

<style>
</style>
