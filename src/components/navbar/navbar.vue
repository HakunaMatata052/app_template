<template>
    <div class="navbar safe-area-inset-top" id="navbar">
      <van-nav-bar
        @click-left="onClickLeft()"
        :z-index="999"
        style="background:none"
        :border="false"
        class="nav-bar"
      >
        <van-search
          placeholder="Search for anything"
          v-model="value"
          shape="round"
          @focus="$router.push('/search')"
          slot="title"
          class="search"
          v-if="search"
        />

        <div slot="title" class="title" v-else>
          <span>{{title}}</span>
          <slot name="title"></slot>
        </div>
        <van-icon name="arrow-left" class="left" slot="left" v-if="goback" />
        <slot name="left" slot="left"></slot>
        <div class="right" slot="right">
          <slot name="right"></slot>
          <van-icon name="service-o" size="23px" @click="$router.push('/search/2')" v-if="kefu" />
        </div>
      </van-nav-bar>
    </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      value: ""
    };
  },
  props: {
    title: {
      type: String,
      default() {
        return this.$route.meta.title;
      },
      required: false
    },
    goback: {
      type: Boolean,
      default() {
        return true;
      },
      required: false
    },
    search: {
      type: Boolean,
      default() {
        return false;
      },
      required: false
    },
    kefu: {
      type: Boolean,
      default() {
        return true;
      },
      required: false
    }
  },
  components: {},
  methods: {
    onClickLeft() {
      if (this.goback) {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="less">
.nobg .van-hairline--bottom::after {
  border-bottom-width: 0;
}
.nav-bar {
  padding: 0 15px;
  .van-nav-bar__left, .van-nav-bar__right{
    position:static!important;
  }
  .van-nav-bar__title {
    flex-grow: 1;
    max-width: 100%!important;
    padding: 0 15px;
  }
}
</style>

<style lang="less" scoped>
.navbar {
  background: #fff;
  position: relative;
  z-index: 999;
  .title {
    span {
      font-weight: bold;
    }
  }
  .left,
  .right {
    font-size: 20px;
  }
  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.search {
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>