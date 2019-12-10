<template>
  <div class="empty-cart" v-if="empty">
    <img :src="img" />
  </div>
</template>

<script>import img from "@/assets/images/empty.png";
export default {
  props: {
    empty: {
      type: Boolean,
      default() {
        return false;
      },
      required: true
    }
  },
  data(){
      return {
          img
      }
  }
};
</script>

<style lang="less" scoped>
.empty-cart {
  padding: 80px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    max-width: 300px;
    display: block;
    margin: auto;
  }
}
</style>