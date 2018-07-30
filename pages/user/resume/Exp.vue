<template>
  <div>
    <v-list dense
            flat
            class="py-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>公司所在地址</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <div class="caption text-muted">四川省成都市锦江区</div>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>公司名称</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请选择地址"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>岗位</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入联系电话"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>工作性质</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-input class="caption text-muted input-rtl"
                    placeholder="请输入电子邮箱"></base-input>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile @click="$refs.beginDate.active()">
        <v-list-tile-content>
          <v-list-tile-title>工作开始日期</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-date-picker type="month"
                          placeholder="工作开始日期"
                          ref="beginDate"></base-date-picker>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
      <v-list-tile @click="$refs.endDate.active()">
        <v-list-tile-content>
          <v-list-tile-title>工作结束日期</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <base-date-picker type="month"
                          placeholder="工作结束日期"
                          ref="endDate"></base-date-picker>
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
                        v-model="exp.note"
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
               :class="{ 'grey--text': !exp.note }"> {{ exp.note || '添加工作经验' }}</div>
        </full-screen-dialog>
        <svg-right class="svg-sm" />
      </v-list-tile>

      <v-divider class="mx-3"></v-divider>
    </v-list>
    <v-layout justify-center
              class="mt-5">
      <v-flex xs10>
        <v-btn block
               color="primary">保存</v-btn>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import FullScreenDialog from '@/components/FullScreenDialog'
export default {
  components: {
    FullScreenDialog
  },
  head: () => ({
    title: '工作经验'
  }),
  meta: {
    title: '工作经验'
  },
  data: () => ({
    exp: {}
  })
}
</script>

<style>
</style>
