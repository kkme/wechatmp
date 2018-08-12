<template>
  <div class="my-mission-orders">
    <v-layout class="py-4"
              align-center
              justify-center>
      <div class="my-mission-orders-btn">
        <v-btn color="primary"
               fab
               large
               flat
               class="ma-0 body-2">单量</v-btn>
      </div>
    </v-layout>
    <v-layout align-center
              justify-center
              pb-3
              class="text-xs-center">
      <div class="px-4">
        <div class="title primary--text pb-2">286</div>
        <div>总单量</div>
      </div>
      <div class="px-4">
        <div class="title primary--text pb-2">286</div>
        <div>已确认</div>
      </div>
      <div class="px-4">
        <div class="title primary--text pb-2">286</div>
        <div>已驳回</div>
      </div>
    </v-layout>
    <div class="body-2 py-2 px-3 grey lighten-3">单量记录</div>
    <div class="my-mission-orders-log">
      <v-layout class="my-mission-orders-log-item mt-2"
                align-center
                wrap
                v-for="n of 10"
                :key="n">
        <span class="px-3 flex-auto">
          <span class="subheading">502</span>
          <span class="grey--text">单</span>
        </span>
        <v-flex>
          <div>提交时间：
            <span class="caption">2018-08-08 05:05</span>
          </div>
          <div class="mt-2"
               v-if="n%4===0 || n%3===0">确认时间：
            <span class="caption">2018-08-08 05:05</span>
          </div>
        </v-flex>
        <span class="subheading primary--text pr-3 flex-auto">待确认</span>
        <v-flex xs12
                class="mt-2"
                v-if="n%3 === 0">
          <v-divider></v-divider>
          <div class="grey--text px-3 mt-2 caption">
            驳回原因：啊大家快来睡觉奥点开链接阿斯加德卡拉手机打开链接阿斯顿就上课了静安寺打卡拉斯的快乐撒娇的快乐卡死打卡拉斯打卡机按时
            <v-divider class="mt-2"></v-divider>
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn outline
                     small
                     color="primary"
                     class="mb-0">申述</v-btn>
            </v-layout>
          </div>
        </v-flex>
        <img src="@img/reject.png"
             v-if="n%3 === 0">
        <v-flex xs12
                class="mt-2">
          <base-divider></base-divider>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.my-mission-orders {
    .my-mission-orders-btn {
        border: 3px solid $primary;
        border-radius: 50%;
    }
    .my-mission-orders-log-item {
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
