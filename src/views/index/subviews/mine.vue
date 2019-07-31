<template>
  <div id="mine">
    <navBar :stl="'nobg'" />
    <div class="main">
      我的
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "mine",
  components: {
    navBar
  },
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
  },
  activated() {}
};
</script>

<style lang="less" scoped>
</style>

