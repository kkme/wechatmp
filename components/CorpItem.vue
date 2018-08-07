<template>
  <div v-if="info">
    <base-divider></base-divider>
    <v-layout class="px-3 pt-2"
              column>
      <v-flex>
        <v-layout align-center>
          <v-flex class="subheading text-truncate pr-3">{{info.comName}}</v-flex>
          <corp-level :level="info.reputation"></corp-level>
        </v-layout>
      </v-flex>
      <v-flex class="pt-2 caption text-muted">
        <v-icon class="iconfont icon-location icon--text"></v-icon>四川省成都市青羊区青羊工业园D区28栋
      </v-flex>
      <v-flex class="caption text-muted mt-1 pb-1">
        <v-layout align-center>
          <v-icon class="iconfont icon-corp icon--text"></v-icon>{{info.nature}}
          <base-tag v-if="info.businessLicenseFile"></base-tag>
          <v-spacer></v-spacer>
          <v-btn icon
                 @click="onAddToCorpCollection(info.comId)">
            <v-icon color="accent">iconfont icon-collection</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout v-if="disableStatus === false">
      <v-flex class="py-2 mt-2 border-top">
        <v-layout align-center
                  class="px-3 text-muted">
          <v-flex class="body-1">正在招聘</v-flex>
          <div>
            <v-icon class="iconfont icon-right icon--text mr-0"></v-icon>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CorpLevel from '@/components/CorpLevel'
import { mapActions } from 'vuex'
export default {
  components: {
    CorpLevel
  },
  props: {
    disableStatus: {
      type: [String, Boolean],
      default: false
    },
    info: Object
  },
  methods: {
    ...mapActions({
      addToCorpCollection: 'job/addToCorpCollection'
    }),
    onAddToCorpCollection(id) {
      this.addToCorpCollection({ id })
    }
  }
}
</script>

<style>
</style>
