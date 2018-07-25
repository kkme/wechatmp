<template>
  <v-date-picker ref="picker"
                 v-model="date"
                 :max="new Date().toISOString().substr(0, 10)"
                 min="1950-01-01"
                 @change="save"></v-date-picker>
</template>

<script>
export default {}
</script>

<style>
</style>
