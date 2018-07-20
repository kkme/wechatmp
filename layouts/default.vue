<template>
  <v-app light>
    <v-toolbar flat
               fixed
               app
               dense
               :clipped-left="clipped">
      <v-btn icon
             @click.stop="clipped = !clipped">
        <v-icon class="iconfont icon-left"></v-icon>
      </v-btn>
      <div v-text="title"></div>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-container>
      <v-card height="200px"
              flat>
        <v-bottom-nav :active.sync="bottomNav"
                      :value="true"
                      absolute
                      color="transparent">
          <v-btn color="teal"
                 flat
                 value="prattime">
            <span>兼职</span>
            <v-icon>history</v-icon>
          </v-btn>

          <v-btn color="teal"
                 flat
                 value="team">
            <span>战队</span>
            <v-icon>favorite</v-icon>
          </v-btn>

          <v-btn color="teal"
                 flat
                 value="ranking">
            <span>排行榜</span>
            <v-icon>favorite</v-icon>
          </v-btn>

          <v-btn color="teal"
                 flat
                 value="message">
            <span>消息</span>
            <v-icon>favorite</v-icon>
          </v-btn>

          <v-btn color="teal"
                 flat
                 value="center">
            <span>我的</span>
            <v-icon>place</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      title: '懒虫动动兼职平台',
      bottomNav: 'center'
    }
  }
}
</script>
