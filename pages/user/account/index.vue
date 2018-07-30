<template>
  <v-list dense
          flat
          class="py-0">
    <template v-for="(item, index) in items">
      <v-list-tile nuxt
                   :key="index"
                   :to="item.href">

        <v-list-tile-content class="pl-2">
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
        <svg-right class="svg-sm" />
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
    title: '账户安全'
  }),
  meta: {
    title: '账户安全'
  },
  data: () => ({
    items: [
      { href: '/user/account/phone', title: '修改手机号' },
      { href: '/user/account/pwd', title: '修改密码' }
    ]
  })
}
</script>

<style>
</style>
