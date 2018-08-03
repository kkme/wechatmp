<template>
  <div>
    <base-divider></base-divider>
    <v-layout class="px-3 pt-2"
              column>
      <v-flex>
        <v-layout align-center>
          <v-flex class="subheading text-truncate pr-3">四川淘淘信息技术有限公司</v-flex>
          <corp-level level="3"></corp-level>
        </v-layout>
      </v-flex>
      <v-flex class="pt-2 caption text-muted">
        <v-icon class="iconfont icon-location icon--text"></v-icon>四川省成都市青羊区青羊工业园D区28栋
      </v-flex>
      <v-flex class="caption text-muted mt-1">
        <v-icon class="iconfont icon-corp icon--text"></v-icon>国企
        <base-tag></base-tag>
      </v-flex>
    </v-layout>
    <v-layout v-if="disableStatus === false">
      <v-flex class="py-2 mt-2 border-top">
        <v-layout align-center
                  class="px-3 text-muted">
          <v-flex class="body-1">正在招聘</v-flex>
          <div>3
            <v-icon class="iconfont icon-right icon--text mr-0"></v-icon>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CorpLevel from '@/components/CorpLevel'
export default {
  components: {
    CorpLevel
  },
  props: {
    disableStatus: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>

<style>
</style>
