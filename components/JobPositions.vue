<template>
  <div class="job-position white px-3 border-top">
    <div>
      <div class="my-3"
           v-for="item of positions"
           :key="item.header.id">
        <div>{{item.header.name}}</div>
        <div>
          <base-tag height="24px"
                    color="grey darken-1"
                    v-for="position of item.list"
                    :key="position.id">{{position.name}}</base-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { jobTypes } from '@const'
import { labelToValue } from '@helper'
export default {
  data: () => ({
    levelOne: 'metro',
    levelTwo: {},
    levelThree: {},
    jobType: '',
    jobTypes
  }),
  computed: {
    ...mapGetters({
      positions: 'common/groupedPositions'
    })
  },
  methods: {
    ...mapActions({
      fetchPositions: 'common/fetchPositions'
    })
  },
  mounted() {
    this.jobType = labelToValue('parttime', this.jobTypes)
    this.fetchPositions({ recruitmenttype: this.jobType })
  }
}
</script>
