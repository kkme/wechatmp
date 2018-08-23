<template>
  <div class="job-recommend white">
    <base-divider></base-divider>
    <v-layout class="job-recommend-match px-3 py-2 border-bottom"
              align-center>
      <span class="subheading">任务匹配设置</span>
      <v-spacer></v-spacer>
      <div class="px-3">
        <full-screen-dialog>
          <v-btn slot="preview"
                 flat
                 :loading="!preference"
                 class="ma-0">{{ preference ? `${preference.jobperiodbegin} - ${preference.jobperiodend}` : '加载中...'}}</v-btn>
          <job-preference v-model="preference"></job-preference>
        </full-screen-dialog>
      </div>
      <svg-right class="svg-sm"></svg-right>
    </v-layout>
    <v-layout align-center
              class="pa-3">
      <span class="flex-auto subheading">日期设置：</span>
      <v-flex>
        <base-date-picker v-model="jobBeginDate"
                          bordered
                          placeholder="开始日期"
                          ltr
                          class="mr-2"></base-date-picker>
      </v-flex>
      <v-flex>
        <base-date-picker v-model="jobEndDate"
                          bordered
                          placeholder="结束日期"
                          ltr
                          class="ml-2"></base-date-picker>
      </v-flex>
    </v-layout>
    <v-btn color="success"
           @click="submit">text</v-btn>
    <v-tabs v-model="active"
            light
            hide-slider
            v-if="false">
      <v-tab ripple
             v-for="n of 10"
             color="primary"
             :key="n">
        <div class="px-2 mr-1 py-1 grey darken-3 white--text job-recommend-tab-btn">08.0{{n}}</div>
      </v-tab>
      <v-tab-item class="grey lighten-3"
                  v-for="n of 10"
                  :key="n">
        asdsadsadsadsadsaasdasasdasdsaasasaasasdasdasasdasd
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import FullScreenDialog from '@/components/FullScreenDialog'
import JobPreference from '@/components/JobPreference'
import { mapActions } from 'vuex'
export default {
  components: {
    FullScreenDialog,
    JobPreference
  },
  head: () => ({
    title: '组合推荐'
  }),
  meta: {
    title: '组合推荐'
  },
  data: () => ({
    active: 0,
    preference: null,
    jobBeginDate: '',
    jobEndDate: ''
  }),
  methods: {
    ...mapActions({
      fetchPackageJobs: 'job/fetchPackageJobs'
    }),
    submit() {
      let filter = {
        jobBeginDate: this.jobBeginDate,
        jobEndDate: this.jobEndDate,
        periodBeginTime: this.preference.jobperiodbegin,
        periodEndTime: this.preference.jobperiodend
      }
      this.fetchPackageJobs(filter)
    }
  }
}
</script>

<style lang="scss">
.job-recommend {
  .job-recommend-tab-btn {
    border-radius: 1rem;
  }
}
</style>
