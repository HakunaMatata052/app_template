<template>
  <van-loading />
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default() {
        return false;
      },
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
</style>