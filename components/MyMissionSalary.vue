<template>
  <div class="my-mission-salary">
    <v-layout align-center
              justify-center
              py-4
              class="text-xs-center">
      <div class="text-xs-center">
        <div class="headline primary--text mb-2">￥5a656</div>
        累计结算金额
      </div>
    </v-layout>
    <div class="body-2 py-2 px-3 grey lighten-3">工资记录</div>
    <div class="my-mission-salary-log">
      <div class="my-mission-salary-log-item"
           v-for="n of 10"
           :key="n">
        <v-layout align-center
                  class="border-bottom px-3 py-2">
          <span class="subheading grey--text text--darken-2">2018-08-08</span>
          <v-spacer></v-spacer>
          <span v-if="n%3 === 0"
                class="subheading">已确认</span>
          <div v-else>
            <v-btn outline
                   small
                   color="primary"
                   class="my-0 mr-0">申述</v-btn>
            <v-btn outline
                   small
                   color="primary"
                   class="my-0 mr-0">确认</v-btn>
          </div>
        </v-layout>
        <v-layout align-center
                  class="pa-3 caption">
          <span>
            <span class="title">2652</span>元</span>
          <div class="px-3">
            <div>工作天数：
              <span class="subheading">12</span>天</div>
            <div>基本工资：
              <span class="subheading">12</span>
              <span class="caption">元</span>/天</div>
          </div>
          <v-spacer></v-spacer>
          <div>
            <div>完成单量：
              <span class="subheading">
                <span class="caption">无单量</span>
              </span>

            </div>
            <div>每单提成：
              <span class="subheading">12</span>
              <span class="caption">元</span>/单</div>
          </div>
        </v-layout>
        <base-divider></base-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.my-mission-salary {
    .my-mission-salary-btn {
        border: 3px solid $primary;
        border-radius: 50%;
    }
    .my-mission-salary-log-item {
        position: relative;
        z-index: 2;
        img {
            position: absolute;
            z-index: 1;
            right: 2rem;
            top: 0.5rem;
            width: 20vw;
        }
    }
}
</style>
