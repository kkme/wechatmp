<template>
  <div class="job-item">
    <v-layout class="px-3 pt-3 white"
              column
              @click="$router.push('/job/1')"
              v-ripple>
      <v-flex>
        <v-layout align-center>
          <v-flex class="subheading text-truncate pr-3">我秦始皇!打钱!</v-flex>
          <div class="error--text body-2">20-30元/天</div>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout row
                  align-center>
          <v-flex>
            <div class="pt-2 caption text-muted">
              <v-icon class="iconfont icon-location icon--text"></v-icon>武侯区/7km
              <span class="pl-2">5月12日 -7月21日</span>
            </div>
            <v-layout class="caption text-muted mt-1"
                      align-center>
              <v-icon class="iconfont icon-time icon--text"></v-icon>刚刚
              <base-tag color="grey">日结</base-tag>
              <base-tag>工资保障</base-tag>
            </v-layout>
          </v-flex>
          <div class="primary--text">
            +20积分
          </div>
        </v-layout>
      </v-flex>
      <v-divider class="mt-2 job-item-divider"></v-divider>
    </v-layout>
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.job-item:last-child {
  .job-item-divider {
    border-color: transparent;
  }
}
</style>
