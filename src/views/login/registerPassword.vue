<template>
  <div id="register">
    <navBar />
    <div class="register">
      <div class="main">
        <van-cell-group class="cell-group" :border="false">
          <div class="cell-group">
            <van-icon class-prefix="icon" name="mima" class="phoneIcon" />
            <van-field
              v-model="$store.state.register.newpassword"
              clearable
              placeholder="请输入6-11位登录密码"
              class="field"
              :type="pwdShow?'text':'password'"
              :border="false"
              :right-icon="pwdShow?'eye-o':'closed-eye'"
              @click-right-icon="pwdShow = !pwdShow"
            ></van-field>
          </div>
          <div class="cell-group">
            <van-icon class-prefix="icon" name="mima" class="phoneIcon" />
            <van-field
              v-model="newpassword"
              clearable
              placeholder="请输入6-11位登录密码"
              class="field"
              :type="pwdShow?'text':'password'"
              :border="false"
              :right-icon="pwdShow?'eye-o':'closed-eye'"
              @click-right-icon="pwdShow = !pwdShow"
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
        >确认</van-button>
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
      newpassword: "",
      pwdShow: false
    };
  },
  // created() {
  //   if (this.$METHOD.getStore("token")) {
  //     this.$router.push("/");
  //   }
  // },
  methods: {
    regFn() {
      var that = this;
      if (!this.$METHOD.isPassword(this.$store.state.register.newpassword)) {
        this.$toast.fail("请输入6-11位字母数字组合密码");
        return;
      }
      if (this.$store.state.register.newpassword != this.newpassword) {
        this.$toast.fail("两次密码不一致");
        return;
      }

      this.regLoading = true;
      this.$SERVER
        .register(this.$store.state.register)
        .then(res => {
          that.regLoading = false;
          if (window.navigator.userAgent.match(/APICloud/i)) {
            that.$METHOD.setStore("token", res.data.userinfo.token);
            that.$store.state.token = res.data.userinfo.token;
            that.$store.state.userInfo = res.data.userinfo_first;
            that.$toast.success(res.msg);
            var push = api.require("push");
            push.bind(
              {
                userName: res.data.userinfo_first.user_nickname,
                userId: res.data.userinfo_first.use_rid
              },
              function(ret, err) {}
            );
            that.$router.push("/");
          } else {
            window.location.href = that.$store.state.resUrl;
          }
        })
        .catch(err => {
          that.regLoading = false;
          that.$toast.fail(err.msg);
        });
    }
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
        .van-cell {
          padding-left: 30px;
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
  .field {
  }
  .checknumbtn {
    background: linear-gradient(
      90deg,
      rgba(249, 74, 81, 1),
      rgba(247, 109, 98, 1)
    );
    border: 0;
    border-radius: 18px;
  }
  .regbtn {
    background: linear-gradient(
      90deg,
      rgba(249, 74, 81, 1),
      rgba(247, 109, 98, 1)
    );
    border-radius: 100px;
    margin-top: 90px;
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
      color: rgba(249, 74, 81, 1);
    }
  }
}
</style>
