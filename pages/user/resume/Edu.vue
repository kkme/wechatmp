<template>
  <div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学校所在地址</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div class="caption text-muted">四川省成都市锦江区</div>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学校名称</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入学校名称"></base-input>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile @click="$refs.eduSheet.active()">
        <v-list-tile-content>
          <v-list-tile-title>学历</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-bottom-sheet class="caption text-muted"
                           v-model="edu.edu"
                           :items="eduList"
                           placeholder="请选择学历"
                           ref="eduSheet"></base-bottom-sheet>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>专业</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请选择专业"></base-input>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile @click="$refs.dayone.active()">
        <v-list-tile-content>
          <v-list-tile-title>入学时间</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div class="caption text-muted">
          <base-date-picker type="month"
                            placeholder="请选择入学日期"
                            ref="dayone"></base-date-picker>
        </div>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile @click="$refs.graduate.active()">
        <v-list-tile-content>
          <v-list-tile-title>毕业时间</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div class="caption text-muted">
          <base-date-picker type="month"
                            placeholder="请选择毕业日期"
                            ref="graduate"></base-date-picker>
        </div>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               color="primary">保存</v-btn>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import { eduList } from '@const'
export default {
  head: () => ({
    title: '学历信息'
  }),
  meta: {
    title: '学历信息'
  },
  data: () => ({
    iconRight: require('@svg/right.svg'),
    eduList,
    edu: {}
  })
}
</script>

<style>
</style>
