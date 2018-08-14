<template>
  <div class="pa-3 white">
    <div class="subheading mb-3">自我描述</div>
    <v-textarea outline
                solo
                flat
                v-model="about"
                label="过人的能力及特长会为您带来好工作哦~"
                counter="300"
                class="textarea-thin"></v-textarea>
    <div class="body-2 mt-4">
      请对自己做个简单的描述，增加获取工作的机会吧~
    </div>
    <p class="mt-2">
      懒虫提醒，你可以从性格描述、参加活动经历、兼职经历、成长性等方面进行描述哦~
    </p>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               @click="submit"
               color="primary">确定</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  head: () => ({
    title: '自我评价'
  }),
  meta: {
    title: '自我评价'
  },
  data: () => ({
    about: '',
    loading: false
  }),
  methods: {
    ...mapActions({
      updateUserAbout: 'users/updateUserAbout'
    }),
    submit() {
      this.loading = true
      this.updateUserAbout({checkSign: this.about}).then(res => {
        this.loading = false
      })
    },
    setDefaultData() {
      let about = this.$route.params.about
      if (about) {
        this.about = about
      }
    }
  },
  mounted() {
    this.setDefaultData()
  }
}
</script>

<style>
</style>
