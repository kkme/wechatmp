<template>
  <div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>公司所在地址</v-list-tile-title>
        </v-list-tile-content>
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
          <v-list-tile-title>公司名称</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入公司名称"
                    v-model="exp.comname"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>岗位</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入岗位"
                    v-model="exp.post"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile @click="$refs.jobTypeSheet.active()">
        <v-list-tile-content>
          <v-list-tile-title>工作性质</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-bottom-sheet class="caption text-muted"
                           v-model="exp.worktype"
                           :items="jobTypes"
                           placeholder="请选择工作性质"
                           ref="jobTypeSheet"></base-bottom-sheet>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile @click="$refs.beginDate.active()">
        <v-list-tile-content>
          <v-list-tile-title>工作开始日期</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-date-picker placeholder="工作开始日期"
                          ref="beginDate"
                          v-model="exp.begintime"></base-date-picker>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile @click="$refs.endDate.active()">
        <v-list-tile-content>
          <v-list-tile-title>工作结束日期</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-date-picker placeholder="工作结束日期"
                          ref="endDate"
                          v-model="exp.endtime"></base-date-picker>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>工作描述</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <full-screen-dialog title="工作描述">
          <div class="pa-3">
            <div class="subheading mb-3">工作内容描述</div>
            <v-textarea outline
                        solo
                        flat
                        v-model="exp.description"
                        label="请简单的描述一下您的工作内容吧~"
                        counter="300"
                        class="textarea-thin"></v-textarea>
            <div class="body-2 mt-4">
              懒虫帮您整理了一些工作描述的要点哦~
            </div>
            <p class="mt-2">
              <span class="primary--text pr-2">1.</span>你的工作主要内容，负责哪些部分<br>
              <span class="primary--text pr-2">2.</span>你的工作内容的基本步骤
            </p>
          </div>
          <div slot="preview"
               class="px-3"
               :class="{ 'grey--text': !exp.description }"> {{ exp.description || '添加工作经验' }}</div>
        </full-screen-dialog>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               @click="submit"
               :loading="loading"
               color="primary">保存</v-btn>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CitySelector from '@/components/CitySelector'
import FullScreenDialog from '@/components/FullScreenDialog'
import { labelToValue } from '@helper'
import { jobTypes } from '@const'
export default {
  components: {
    FullScreenDialog, CitySelector
  },
  head: () => ({
    title: '工作经验'
  }),
  meta: {
    title: '工作经验'
  },
  data: () => ({
    region: {},
    exp: {},
    jobTypes,
    loading: false
  }),
  computed: {
    defalutRegion() {
      // return [this.edu.provinceid, this.edu.cityid, this.edu.countyid]
    }
  },
  methods: {
    ...mapActions({
      updateUserJobExp: 'users/updateUserJobExp'
    }),
    submit() {
      this.loading = true
      this.updateUserJobExp(this.exp).then(res => {
        this.loading = false
      })
    },
    setDefaultData() {
      let exp = this.$route.params.exp
      if (exp) {
        exp.worktype = labelToValue(exp.worktype, jobTypes)
        this.exp = exp
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
begintime:"2010-08-08"
comname:"公司名称"
createtime:"2018-07-30 11:41:25"
description:"工作描述"
endtime:null
id:"1532922085460705"
lastupdatetime:"2018-07-30 11:41:25"
post:"工作岗位"
userid:"1532062909184208"
worktype:"兼职"
