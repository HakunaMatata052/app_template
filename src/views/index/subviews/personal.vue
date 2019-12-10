<template>
  <div class="container">
    <navBar :goback="false" title="PERSONAL CENTER" />
    <div class="main">
      <div class="user-card">
        <div class="top">
          <van-uploader
            :after-read="uploadAvatar"
            :accept="'image/*'"
            :max-count="1"
            class="avatar"
          >
            <img :src="$store.state.userInfo.avatar || user_img" />
          </van-uploader>
          <div class="user-info">
            <h4>{{$store.state.userInfo.vip_name}}</h4>
            <h3>{{$store.state.userInfo.nickname}}</h3>
            <p>My invitation code: {{$store.state.userInfo.code}}</p>
          </div>
          <div class="logout" @click="logout">sign out</div>
        </div>
        <div class="order-info">
          <dl>
            <dt>{{$store.state.userInfo.spread_count}}</dt>
            <dd>spread_count</dd>
          </dl>
          <dl>
            <dt>286</dt>
            <dd>shopping cart</dd>
          </dl>
          <dl>
            <dt>286</dt>
            <dd>bought</dd>
          </dl>
        </div>
      </div>
      <div class="wallet">
        <div class="btn-group">
          <van-button round type="primary" class="btn">Top Up</van-button>
          <van-button round plain type="primary" class="btn">withdraw</van-button>
        </div>
        <div class="account-info">
          <dl>
            <dt>{{$store.state.currency}}{{$store.state.userInfo.now_money}}</dt>
            <dd>Account Balance</dd>
          </dl>
          <dl>
            <dt>{{$store.state.currency}}{{$store.state.userInfo.brokerage_price}}</dt>
            <dd>Rebate</dd>
          </dl>
          <dl>
            <dt>{{$store.state.currency}}{{$store.state.userInfo.spread_count}}</dt>
            <dd>Repurchase profit</dd>
          </dl>
        </div>
      </div>
      <van-cell-group>
        <van-cell
          :title="item.name"
          size="large"
          v-for="(item,i) in menu"
          :key="i"
          is-link
          :to="item.path"
          class="menu"
        >
          <van-icon class-prefix="icon" :name="item.icon" slot="icon" class="ico" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import user_img from "@/assets/images/default.png";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "personal",
  data() {
    return {
      menu: [
        { name: "Bill", path: "/", icon: "order" },
        { name: "Bank Cards", path: "/bankCardList", icon: "creditcard" },
        { name: "My Address", path: "/", icon: "map" },
        { name: "Invite", path: "/", icon: "favorites" },
        { name: "VIP Privilege", path: "/", icon: "bussiness-man" },
        { name: "Payment Password", path: "/", icon: "password" },
        { name: "Login Password", path: "/", icon: "password" },
        { name: "Replace Bound Phone", path: "/", icon: "ipad" },
        { name: "My Share Order", path: "/", icon: "cameraswitching" },
        { name: "About Us", path: "/", icon: "Customermanagement" }
      ],
      user_img: user_img
    };
  },
  components: {
    navBar
  },
  computed: {},
  methods: {
    uploadAvatar(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      this.$SERVER
        .upload(formData)
        .then(res => {
          this.$store.state.userInfo.avatar = res.data.url;
          this.userEdit();
        })
        .catch(err => {
          this.$toast.fail(err.msg);
        });
    },
    userEdit() {
      this.$SERVER
        .userEdit({
          avatar: this.$store.state.userInfo.avatar,
          nickname: this.$store.state.userInfo.nickname
        })
        .then(res2 => {
          this.$toast.success(res2.msg);
          this.$store.state.userInfo.avatar = res.data.url;
        });
    },
    logout() {
      if (window.navigator.userAgent.match(/APICloud/i)) {
        var push = api.require("push");
        push.unbind(
          {
            userName: this.$store.state.nickname,
            userId: this.$store.state.uid
          },
          function(ret, err) {}
        );
      }
      this.$METHOD.removeStore("token");
      this.$store.state.userInfo = {};
      this.$SERVER.logout().then(res => {
        this.$toast.success(res.msg);
      });
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
.user-card {
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  margin-top: 10px;
  .top {
    display: flex;
    padding: 15px 20px;

    .avatar {
      margin-right: 10px;
      flex-shrink: 0;
      img {
        width: 49px;
        height: 49px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .user-info {
      flex-grow: 1;
      margin-right: 10px;
      h4 {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 3px;
      }
      h3 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      p {
        font-size: 15px;
      }
    }
    .logout {
      flex-shrink: 0;
      text-decoration: underline;
      font-size: 15px;
      color: #1ac0a8;
    }
  }
  .order-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 15px 0;
    dl {
      border-left: 1px solid #e0e0e0;
      position: relative;
      width: 33.333%;
      dt {
        font-size: 24px;
      }
      dd {
        font-size: 13px;
      }
      &:first-child {
        border-left: 0;
        color: #fb581d;
      }
    }
  }
}
.wallet {
  padding: 25px 0;
  .btn-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 25px;
    .btn {
      width: 140px;
      height: 41px;
    }
  }
  .account-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    dl {
      dt {
        font-size: 15px;
        font-weight: bold;
        color: #fb581d;
        margin-bottom: 10px;
      }
    }
  }
}
.menu {
  .ico {
    margin-right: 5px;
    color: #1ac0a8;
  }
}
</style>