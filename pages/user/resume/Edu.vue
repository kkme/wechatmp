<template>
  <div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学校所在地址</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <!-- <div class="caption text-muted">四川省成都市锦江区</div> -->
        <v-spacer></v-spacer>
        <city-selector v-model="region"
                       class="mr-3"
                       placeholder="请选择区域"
                       :defalutRegion="defalutRegion">
        </city-selector>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>学校名称</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入学校名称"
                    v-model="edu.schoolname"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile @click="$refs.eduSheet.active()">
        <v-list-tile-content>
          <v-list-tile-title>学历</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-bottom-sheet class="caption text-muted"
                           v-model="edu.educationtype"
                           :items="eduList"
                           placeholder="请选择学历"
                           ref="eduSheet"></base-bottom-sheet>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>专业</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请选择专业"
                    v-model="edu.professionname"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile @click="$refs.dayone.active()">
        <v-list-tile-content>
          <v-list-tile-title>入学时间</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div class="caption text-muted">
          <base-date-picker type="month"
                            placeholder="请选择入学日期"
                            ref="dayone"
                            v-model="edu.admissiontime"></base-date-picker>
        </div>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile @click="$refs.graduate.active()">
        <v-list-tile-content>
          <v-list-tile-title>毕业时间</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div class="caption text-muted">
          <base-date-picker type="month"
                            placeholder="请选择毕业日期"
                            ref="graduate"
                            v-model="edu.graduationtime"></base-date-picker>
        </div>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               :loading="loading"
               @click="submit"
               color="primary">保存</v-btn>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CitySelector from '@/components/CitySelector'
import { labelToValue } from '@helper'
import { eduList } from '@const'
export default {
  components: { CitySelector },
  head: () => ({
    title: '学历信息'
  }),
  meta: {
    title: '学历信息'
  },
  data: () => ({
    region: {},
    eduList,
    edu: {},
    loading: false
  }),
  computed: {
    defalutRegion() {
      return [this.edu.provinceid, this.edu.cityid, this.edu.countyid]
    }
  },
  mounted() {
    this.setDefaultData()
  },
  methods: {
    ...mapActions({
      updateUserEducation: 'users/updateUserEducation'
    }),
    setDefaultData() {
      let edu = this.$route.params.edu
      if (edu) {
        edu.educationtype = labelToValue(edu.educationtype, eduList)
        this.edu = edu
      }
    },
    submit() {
      this.loading = true
      this.updateUserEducation(this.edu).then(res => {
        this.loading = false
      })
    }
  }
}
</script>

<style>
</style>
