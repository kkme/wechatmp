<template>
  <div v-if="detail">
    <img :src="baseUrl+detail.contentImage"
         class="w-100">
    <div>
      <base-divider></base-divider>

      <div v-for="item of detail.experientials"
           :key="item.id"
           v-if="detail.experientials && detail.experientials.length">
        <fun-event-item :item="item"
                        no-log>
          <v-btn slot-scope="{item}"
                 small
                 color="primary"
                 :loading="item.loading"
                 :disabled="item.deliveryStatus || valueToLabel(item.deliveryStatus, funStatusTypes, 'name') === 'reject'"
                 @click="onApply(item)"
                 class="my-0 mr-0">立即报名</v-btn>
        </fun-event-item>
        <base-divider></base-divider>
      </div>
    </div>
  </div>
</template>

<script>
import constant from '@const/public'
import FunEventItem from '@/components/FunEventItem'
import { mapGetters, mapActions } from 'vuex'
import { labelToValue, valueToLabel } from '@helper'
import { funStatusTypes } from '@const'
export default {
  components: { FunEventItem },
  head: () => ({
    title: '趣味体验详情'
  }),
  meta: {
    title: '趣味体验详情'
  },
  data: () => ({
    detail: null,
    baseUrl: constant.BASE_URL,
    funStatusTypes
  }),
  computed: {
    ...mapGetters({
      funEvents: 'fun/funEvents',
      appliedFunEvents: 'fun/appliedFunEvents',
      comments: 'fun/comments'
    })
  },
  methods: {
    ...mapActions({
      fetchFunEventDetail: 'fun/fetchFunEventDetail',
      applyFunEvent: 'fun/applyFunEvent',
      reserveFunEvent: 'fun/reserveFunEvent'
    }),
    valueToLabel,
    onApply(item) {
      this.$set(item, 'loading', true)
      this.applyFunEvent({ recruitmentid: item.id, comid: item.comid }).then(res => {
        this.$set(item, 'deliveryStatus', labelToValue('new', funStatusTypes))
        this.$set(item, 'loading', false)
      })
    }
  },
  mounted() {
    let id = this.$route.params.id
    if (!id) {
      this.$route.replace('/job/fun')
    } else {
      this.fetchFunEventDetail({ id }).then(res => {
        this.detail = res
      })
    }
  }
}
</script>

<style lang="scss">
.fun-thumb {
  width: 80px;
  height: 80px;
  .fun-thumb-text {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
