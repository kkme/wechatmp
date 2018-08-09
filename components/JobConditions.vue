<template>
  <div class="job-conditions white py-3 border-top">
    <v-layout align-center
              class="pl-3 pr-2">
      <span>工资保障</span>
      <v-spacer></v-spacer>
      <span>
        <v-checkbox color="primary"
                    class="ma-0"
                    hide-details
                    v-model="condition.wageGeneration"></v-checkbox>
      </span>
    </v-layout>
    <v-layout align-center
              class="pl-3 pr-2">
      <span>积分奖励</span>
      <v-spacer></v-spacer>
      <span>
        <v-checkbox color="primary"
                    class="ma-0"
                    hide-details
                    v-model="condition.personalRewardPoints"></v-checkbox>
      </span>
    </v-layout>
    <div class="py-1 px-3">
      <div class="body-2">兼职周期</div>
      <v-layout align-center
                class="mt-1">
        <div class="job-conditions-input">
          <base-date-picker v-model="condition.jobBeginTime"
                            placeholder="兼职开始日期"
                            ltr
                            bordered></base-date-picker>
        </div>
        <span class="px-3">-</span>
        <div class="job-conditions-input">
          <base-date-picker v-model="condition.jobEndTime"
                            placeholder="兼职结束日期"
                            ltr
                            bordered></base-date-picker>
        </div>
      </v-layout>
    </div>
    <div class="py-1 px-3">
      <div class="body-2">工作时段</div>
      <v-layout align-center
                class="mt-1">
        <div class="job-conditions-input">
          <base-time-picker v-model="condition.jobPeriodBegin"
                            bordered
                            placeholder="开始时间"></base-time-picker>
        </div>
        <span class="px-3">-</span>
        <div class="job-conditions-input">
          <base-time-picker v-model="condition.jobPeriodEnd"
                            bordered
                            placeholder="开始时间"></base-time-picker>
        </div>
      </v-layout>
    </div>
    <div class="py-1 px-3">
      <div class="body-2">工资模式</div>
      <div class="d-flex">
        <base-tag height="24px">不限</base-tag>
        <base-tag height="24px">不限</base-tag>
        <base-tag height="24px">不限</base-tag>
        <base-tag height="24px">不限</base-tag>
      </div>
    </div>
    <div class="py-1 px-3">
      工资范围
      <v-layout align-center>
        <div class="job-conditions-input">
          <base-input placeholder="最低薪资"
                      bordered></base-input>
        </div>
        <span class="px-3">-</span>
        <div class="job-conditions-input">
          <base-input placeholder="最高薪资"
                      bordered></base-input>
        </div>
      </v-layout>
    </div>
    <div class="py-1 px-3">
      <div class="body-2">结算方式</div>
      <div class="d-flex">
        <base-tag height="24px">不限</base-tag>
        <base-tag height="24px">不限</base-tag>
        <base-tag height="24px">不限</base-tag>
        <base-tag height="24px">不限</base-tag>
      </div>
    </div>
    <div class="py-1 px-3">
      <div class="body-2">特色兼职</div>
      <div class="d-flex">
        <base-tag height="24px">不限</base-tag>
        <base-tag height="24px">不限</base-tag>
        <base-tag height="24px">不限</base-tag>
        <base-tag height="24px">不限</base-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    condition: {
      wageGeneration: false, // 工资保障
      personalRewardPoints: false, // 积分奖励
      jobBeginTime: '', // 兼职周期
      jobEndTime: '',
      jobPeriodBegin: '', // 工作时段
      jobPeriodEnd: '',
      wageBegin: '', // 工资范围
      wageEnd: '',
      wageMode: '', // 工资模式
      wageClearing: '', // 结算方式
      featuresId: ''// 特色兼职
    }
  })
}
</script>

<style lang="scss">
.job-conditions {
    .job-conditions-input {
        width: 8em;
    }
    .job-conditions-special-item {
        display: inherit;
        margin-left: $tag-space;
    }
}
</style>
