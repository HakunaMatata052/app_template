<template>
  <van-popup v-model="show" position="bottom">
    <!-- 密码输入框 -->
    <p>请输入交易密码</p>
    <van-password-input :value="password" :length="maxlength" />
    <span @click="$router.push('/setPayPassword')">忘记密码</span>
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="password"
      class="number-keyboard"
      :maxlength="maxlength"
      :show="true"
      title="安全键盘"
      safe-area-inset-bottom
    />
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      maxlength: 6,
      password: ""
    };
  },
  watch: {
    password(val) {
      if (val.length == this.maxlength) {
        this.$emit("onSuccess", val);
      }
    }
  },
  methods: {
    showFn() {
      this.show = true;
    },
    hideFn() {
      this.show = false;
    },
    clearFn() {
      this.password = "";
    }
  }
};
</script>
<style lang="less" scoped>
p {
  font-size: 15px;
  text-align: center;
  padding: 10px 0;
  color: #999;
  font-weight: 500;
}
span {
  font-size: 15px;
  font-weight: 500;
  color: rgba(81, 150, 255, 1);
  margin-top: 10px;
  padding-right: 10px;
  display: block;
  text-align: right;
}
.number-keyboard {
  position: relative;
  margin-top: 10px;
}
</style>
