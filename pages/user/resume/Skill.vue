<template>
  <div class="pa-3 white">
    <div class="subheading mb-3">能力及特长描述</div>
    <v-textarea outline
                solo
                flat
                v-model="skill"
                label="过人的能力及特长会为您带来好工作哦~"
                counter="300"
                class="textarea-thin"></v-textarea>
    <div class="body-2 mt-4">
      懒虫帮您想到一些描述自己能力及特长的思路哦~
    </div>
    <p class="mt-2">
      <span class="primary--text pr-2">1.</span>你在校期间担任过的职务，获得的能力<br>
      <span class="primary--text pr-2">2.</span>你的艺术细胞~ 绘画、跳舞、写作等等<br>
      <span class="primary--text pr-2">3.</span>你会的电脑软件，Ps、Office等，或者拥有的技能证书<br>
      <span class="primary--text pr-2">4.</span>你的动手能力，组织能力，领导能力和交际能力等
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
    title: '能力及特长'
  }),
  meta: {
    title: '能力及特长'
  },
  data: () => ({
    skill: {},
    loading: false
  }),
  methods: {
    ...mapActions({
      updateUserSkill: 'users/updateUserSkill'
    }),
    submit() {
      this.loading = true
      this.updateUserSkill({checkSign: this.skill}).then(res => {
        this.loading = false
      })
    },
    setDefaultData() {
      let skill = this.$route.params.skill
      if (skill) {
        this.skill = skill
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
