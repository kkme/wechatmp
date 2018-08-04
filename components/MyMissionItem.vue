<template>
  <v-list flat
          two-line>
    <v-list-tile v-for="n of 30"
                 :key="n"
                 class="border-bottom">
      <v-list-tile-content>
        <v-list-tile-title>
          <v-layout align-center>
            <span class="subheading">我Hitler!打钱!</span>
            <slot :item="n">
              <v-spacer></v-spacer>
              <base-tag outline
                        color="accent"
                        height="20px"
                        class="my-0">战队</base-tag>
            </slot>
          </v-layout>
        </v-list-tile-title>
        <v-list-tile-sub-title class="pt-2">
          <v-layout class="caption"
                    align-center>
            <span>武侯区/7km 5月16日-7月21日</span>
            <v-spacer></v-spacer>
            <span>2018-09-09 15:30</span>
          </v-layout>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {}
</script>

<style>
</style>
