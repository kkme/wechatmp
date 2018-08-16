<template>
  <v-list v-if="items">
    <v-list-tile v-for="item in items"
                 avatar
                 :key="item.rank">
      <v-list-tile-avatar>
        <template v-if="+item.rank === 1"><img src="@img/1st.png"></template>
        <template v-else-if="+item.rank === 2"><img src="@img/2nd.png"></template>
        <template v-else-if="+item.rank === 3"><img src="@img/3rd.png"></template>
        <template v-else>{{item.rank}}</template>
      </v-list-tile-avatar>
      <v-list-tile-avatar>
        <img :src="item.avatar">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.name"></v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <div>{{item.number}}{{unit}}</div>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  props: ['items', 'unit'],
  data: () => ({
    // items: [
    //   { rank: 1, number: '321', name: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
    //   { rank: 2, number: '123', name: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
    //   { rank: 3, number: '5323', name: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
    //   { rank: 4, number: '123', name: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
    // ]
  })
}
</script>

<style>
</style>
