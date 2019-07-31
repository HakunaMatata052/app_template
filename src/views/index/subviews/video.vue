<template>
    <div class="container" id="video">
      <navBar :search="true" />
      <div class="main">
        视频
      </div>
    </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "video",
  components: {
    navBar,
  },
  data() {
    return {
    };
  },
  created(){
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
</style>

