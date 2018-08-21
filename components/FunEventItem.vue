<template>
  <div v-if="item"
       class="py-2">
    <v-layout align-center
              class="px-3">
      <div v-if="item.contentimage"
           class="mr-3">
        <v-card class="ma-0 py-0 fun-thumb flex-auto"
                flat>
          <v-card-media class="white--text"
                        height="80px"
                        :src="item.contentimage">
          </v-card-media>
        </v-card>
      </div>
      <v-flex class="caption">
        <v-layout align-center>
          <div class="body-2">{{item.title}}</div>
          <v-spacer></v-spacer>
          <slot :item="item"></slot>
        </v-layout>
        <div class="grey--text text--darken-2">活动时间：{{item.jobbegintime}} - {{item.jobendtime}}</div>
        <div class="grey--text text--darken-2">活动地址：{{item.address}}</div>
      </v-flex>
    </v-layout>
    <div class="caption"
         v-if="!noLog && item.reservationLiteList && item.reservationLiteList.length">
      <v-layout align-center
                class="my-2 px-3">
        <span class="subheading">预约记录</span>
        <v-spacer class="border-bottom-dash mx-2"></v-spacer>
        <span class="subheading primary--text">{{item.deliveryStatus | valueToLabel(funStatusTypes)}}</span>
      </v-layout>
      <v-list two-line
              dense
              class="py-0">
        <v-list-tile v-if="item.reservationLiteList.length"
                     v-for="log of item.reservationLiteList"
                     :key="log.id">
          <v-list-tile-content>
            <v-list-tile-title class="grey--text text--darken-2">
              <v-layout>
                <span>签到时间：{{log.signtime }}</span>
                <v-spacer /> {{log.reservationstatus | valueToLabel(funStatusTypes)}}
              </v-layout>
            </v-list-tile-title>
            <v-list-tile-sub-title class="grey--text text--darken-2"
                                   v-if="log.verifycode">验证码：
              <span class="body-2 primary--text">{{log.verifycode}}
                <span class="ml-1 caption"
                      @click="$emit('onQrCode', log.verifycode)">
                  查看二维码
                </span>
              </span>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title class="grey--text text--darken-2">
              预约时间：{{log.begintime | formatDateTime('yyyy.MM.dd hh:mm')}}-{{log.endtime | formatDateTime('yyyy.MM.dd hh:mm')}}</v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
    </div>
  </div>
</template>

<script>
import { funStatusTypes } from '@const'
export default {
  props: {
    item: Object,
    noLog: Boolean
  },
  data: () => ({
    funStatusTypes
  })
}
</script>
