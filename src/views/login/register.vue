<template>
  <div id="register">
    <navBar />
    <div class="register">
      <div class="main">
        <van-cell-group class="cell-group" :border="false">
          <div class="cell-group">
            <van-field
              v-model.number="$store.state.register.user_account"
              clearable
              placeholder="请输入手机号"
              class="field"
              type="number"
              :border="false"
              pattern="[0-9]*"
               autofocus="autofocus"
            ></van-field>
          </div>
          <div class="cell-group">
            <van-field
              v-model="$store.state.register.captcha"
              center
              clearable
              class="field"
              placeholder="请输入短信验证码"
            >
              <van-button
                slot="button"
                size="small"
                type="primary"
                class="checknumbtn"
                @click="sendchecknum"
                :disabled="checkNumDisabled"
                :hairline="false"
              >
                <span v-if="checkNumDisabled">{{countDown}}秒后重试</span>
                <span v-else>发送验证码</span>
              </van-button>
            </van-field>
          </div>
          <div class="cell-group">
            <p class="recommendedPhone">邀请码</p>
            <van-field
              v-model="$store.state.register.retail_code"
              placeholder="请输入邀请码"
              class="field choose"
              readonly
              :border="false"
            ></van-field>
          </div>
        </van-cell-group>
        <van-button
          type="primary"
          size="large"
          :loading="regLoading"
          loading-type="spinner"
          @click="regFn"
          class="regbtn"
          :hairline="false"
        >下一步</van-button>
        <div class="gologin">
          已有账号，
          <span @click="$router.push('/login')">立即登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "register",
  components: {
    navBar
  },
  data() {
    return {
      regLoading: false,
      checkNumDisabled: false,
      countDown: 60,
      checked: true,
      timer: null,
      tipsShow:false
    };
  },
  created() {
    if (this.$route.params.val) {
      this.$store.state.register.retail_code = this.$route.params.val;
    }
  },
  methods: {
    sendchecknum() {
      if (this.$METHOD.isPhone(this.$store.state.register.user_account)) {
        const timer_COUNT = 60;
        if (!this.timer) {
          this.countDown = timer_COUNT;
          this.checkNumDisabled = true;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
              this.countDown--;
            } else {
              this.checkNumDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.$SERVER
          .smscode({
            mobile: this.$store.state.register.user_account
          })
          .then(res => {
            this.$toast.success("验证码发送成功！");
          })
          .catch(res => {
            this.$store.state.register.captcha = "";
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      } else {
        this.$toast.fail("请输入正确的手机号码");
      }
    },
    regFn() {
      var that = this;
      if (!this.$METHOD.isPhone(this.$store.state.register.user_account)) {
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      if (this.$store.state.register.captcha == "") {
        this.$toast.fail("请输入验证码");
        return;
      }
      if (this.$store.state.register.retail_code == "") {
        this.$toast.fail("请输入邀请码");
        return;
      }
      that.$router.push("/registerPassword");
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
#register {
  width: 100%;
  height: 100%;
  .register {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    background: #fff;
    padding: 28px 0 45px 0;
  }
  .main {
    width: 90%;
    & > p {
      text-align: center;
      margin-top: 10px;
      color: #999;
      font-size: 14px;
      span {
        text-decoration: underline;
        color: rgba(249,74,81,1);
      }
    }
    .cell-group {
      .cell-group {
        display: flex;
        position: relative;
        border-bottom: 1px solid #e6e6e6;
        .phoneIcon,
        .securityIcon {
          position: absolute;
          top: 10px;
          z-index: 1;
          font-size: 20px;
          color: rgba(173, 173, 173, 1);
        }
        .recommendedPhone {
          font-size: 15px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          width: 110px;
          line-height: 44px;
        }
        .choose {
          padding-left: 18px;
        }
      }
    }
  }
  .checknumbtn {
    background: linear-gradient(90deg,rgba(249,74,81,1),rgba(247,109,98,1));
    border: 0;
    border-radius: 18px;
  }
  .regbtn {
    background: linear-gradient(90deg,rgba(249,74,81,1),rgba(247,109,98,1));
    border-radius: 100px;
    margin-top: 30px;
    border: 0;
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
  .gologin {
    text-align: center;
    margin-top: 50px;
    color: #999;
    span {
      text-decoration: underline;
      color: rgba(249,74,81,1);
    }
  }
}
</style>
