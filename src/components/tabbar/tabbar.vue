<template>
  <div>
    <div class="footer safe-area-inset-bottom boxshadow-top" id="footer">
      <ul class="tabbar-list">
        <li
          v-for="(item, index) in tabList"
          :key="index"
          @touchend="switchTab(item, index)"
          :class="['tabbar-item', { active: $store.state.tabActiveIndex === index }]"
        >
          <svg-icon
            :icon-class="item.meta.icon"
            v-if="item.meta.icon"
            slot="right"
          ></svg-icon>
          <h3 :class="item.meta.icon ? 'tabbar-name' : 'iconShow'">{{ item.meta.title }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tabActiveIndex: 0,
      bottom: 0,
      show: false,      
      tabList: []
    };
  },
  created() {
  this.tabList  = this.$router.options.routes[0].children
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
  background-color: #ffffff;
  position: relative;
  z-index: 9999;
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
      color: #1ac0a8;
      svg {
        color: #1ac0a8;
      }
    }
  }
}
</style>
