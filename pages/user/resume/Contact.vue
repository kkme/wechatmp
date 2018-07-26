<template>
  <div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>居住地址</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div class="caption text-muted">四川省成都市锦江区</div>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>详细地址</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请选择地址"></base-input>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>联系电话</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入联系电话"></base-input>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>邮箱</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入电子邮箱"></base-input>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>QQ</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入QQ号码"></base-input>
        <simple-svg :filepath="iconRight" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>微信</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入微信账号"></base-input>
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
export default {
  head: () => ({
    title: '联系方式'
  }),
  meta: {
    title: '联系方式'
  },
  data: () => ({
    iconRight: require('@svg/right.svg')
  })
}
</script>

<style>
</style>
