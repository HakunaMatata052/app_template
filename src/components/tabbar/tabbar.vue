<template>
  <div>
    <div class="footer" id="footer">
      <ul class="tabbar-list">
        <li
          v-for="(item, index) in tabList"
          :key="index"
          @touchend="switchTab(item, index)"
          :class="['tabbar-item', { active: $store.state.tabActiveIndex === index }]"
        >
          <svg-icon
            :icon-class="$store.state.tabActiveIndex === index ? item.icon_press : item.icon"
            v-if="item.icon"
            slot="right"
          ></svg-icon>
          <h3 :class="item.icon ? 'tabbar-name' : 'iconShow'">{{ item.title }}</h3>
        </li>
      </ul>
      <div class="iphonX-box" :style="'height:'+bottom+'px'"></div>
    </div>
    <div class="footer-empty" :style="'padding-top:'+bottom+'px'"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tabActiveIndex: 0,
      bottom: 0,
      show: false,      
      tabList: [
        {
          title: "首页",
          path: "/",
          icon: "home",
          icon_press: "home-active",
          index: 0
        },
        {
          title: "视频",
          path: "/video",
          icon: "video",
          icon_press: "video-active",
          index: 1
        },
        {
          title: "发布",
          icon: "release",
          icon_press: "release",
          index: 2
        },
        {
          title: "游戏",
          path: "/game",
          icon: "game",
          icon_press: "game-active",
          index: 3
        },
        {
          title: "我的",
          path: "/mine",
          icon: "user",
          icon_press: "user-active",
          index: 4
        }
      ]
    };
  },
  created() {
    this.$store.state.tabActiveIndex = this.tabList.findIndex(
      item => item.path === this.$route.path
    );
    window.addEventListener("popstate", () => {
      this.$store.state.tabActiveIndex = this.tabList.findIndex(
        item => item.path === this.$route.path
      );
    });
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.bottom = api.safeArea.bottom;
    }
  },
  methods: {
    switchTab(item, idx) {
      if (this.$store.state.tabActiveIndex > idx) {
          this.$store.state.navAn = "slide-right";
        } else {
          this.$store.state.navAn = "slide-left";
        }
        if (this.$store.state.tabActiveIndex !== idx) {
          this.$store.state.tabActiveIndex = idx;
          this.$router.push(item.path);
        }
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
}
.footer-empty {  
  height: 60px;
}
.iphonX-box {
  height: 0;
}
.tabbar-list {
  display: flex;
  box-sizing: border-box;
  .tabbar-item {
    flex: 1;
    height: 60px;
    position: relative;
    color: #333333;
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tabbar-icon {
      width: 25px;
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translate(-50%);
    }
    .tabbar-name {
      box-sizing: border-box;
      font-size: 10px;
      text-align: center;
      line-height: 1.5;
    }
    .iconShow {
      line-height: 50px;
      font-size: 16px;
    }
    svg {
      width: 2em;
      height: 2em;
    }
    &.active {
      color: #333;
    }
  }
}
.van-dialog {
  background: none;
  bottom: 20px;
  top: auto;
}
.release-dialog {
  padding: 5px;
  .release-group {
    display: flex;
    justify-content: space-between;
    .release-item {
      svg {
        width: 45px;
        height: 45px;
        border: 3px solid #fff;
        background: #ffd948;
        padding: 10px;
        border-radius: 50%;
        margin-bottom: 15px;
      }
      span {
        color: #fff;
        display: block;
        text-align: center;
        flex-direction: column-reverse;
      }
    }
  }
  .release-close {
    width: 30px;
    height: 30px;
    padding: 10px;
    border-radius: 50%;
    background: #c2c1c1;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    flex-direction: column-reverse;
    align-items: center;
    .icon {
      font-size: 28px;
    }
  }
}
</style>
