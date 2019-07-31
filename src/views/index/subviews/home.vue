<template>
  <div class="container" id="home">
    <navBar :goback="false" :search="true" />
    <div class="main">
      首页
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "home",
  data() {
    return {
    };
  },
  components: {
    navBar,
  },
  created() {
  },
  deactivated() {    
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
</style>

