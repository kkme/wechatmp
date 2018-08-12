<template>
  <div class="my-mission-checkinout">
    <v-layout class="py-5"
              align-center
              justify-center>
      <div class="btn-fancy">
        <v-btn color="primary"
               fab
               large
               depressed
               class="ma-0 body-2">上班签到</v-btn>
      </div>
    </v-layout>
    <v-layout align-center
              justify-center
              pb-3
              class="text-xs-center">
      <div class="px-4">
        <div class="title primary--text pb-2">286</div>
        <div>总签到</div>
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
    <v-layout align-center
              class="py-2 px-3 text-muted"
              wrap>
      当前位置：
      <span>
        <base-location address></base-location>
      </span>
    </v-layout>
    <div class="body-2 py-2 px-3 grey lighten-3">签到记录</div>
    <div class="my-mission-checkinout-log">
      <div v-for="n of 10"
           :key="n"
           class="my-mission-checkinout-log-item">
        <v-layout class="border-bottom px-3 py-2 body-2 grey--text text--darken-2">2018-02-05 星期五
          <v-spacer/>
          <span>申述中</span>
        </v-layout>
        <div class="py-2 px-3">
          <span class="primary--text">上班签到</span>
          <v-layout class="mt-1"
                    align-center>
            <v-icon class="icon--text"
                    color="grey darken-2">iconfont icon-location</v-icon>
            <span class="body-2 mr-4">地址滴好滴是滴是滴赛迪滴</span>
            <v-spacer></v-spacer>
            <v-icon class="icon--text mx-1"
                    color="grey darken-2">iconfont icon-time</v-icon>
            <span class="body-2">14:00</span>
          </v-layout>
        </div>
        <div class="py-2 px-3">
          <span class="primary--text">下班签到</span>
          <v-layout class="mt-1"
                    align-center>
            <v-icon class="icon--text"
                    color="grey darken-2">iconfont icon-location</v-icon>
            <span class="body-2 mr-4">地址滴好滴是滴是滴赛迪萨</span>
            <v-spacer></v-spacer>
            <v-icon class="icon--text mx-1"
                    color="grey darken-2">iconfont icon-time</v-icon>
            <span class="body-2">14:00</span>
          </v-layout>
        </div>
        <v-divider class="mx-3"></v-divider>
        <p class="px-3 py-2 mb-0 text-muted">
          驳回原因：氨基酸看得开拉圣诞快乐斯卡迪接口阿斯顿卡打开手机啊大叔控打开撒娇的空间撒卡掉了啊圣诞节快乐阿萨德科技三等级阿斯加德考虑傻得可怜
        </p>
        <base-divider v-if="n !== 10"></base-divider>
        <img src="@img/reject.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.my-mission-checkinout {
    .my-mission-checkinout-log-item {
        position: relative;
        z-index: 2;
        img {
            position: absolute;
            z-index: 1;
            right: 2rem;
            top: 5rem;
            width: 20vw;
        }
    }
}
</style>
