<template>
  <div class="base-tag">
    <slot>已认证</slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.base-tag {
    display: inline-flex;
    border: 1px solid $primary;
    border-radius: 2px;
    color: $primary;
    font-size: $size1;
    padding: 2px 1em;
    line-height: 1;
    margin-bottom: 6px;
    margin-left: 1em;
}
</style>
