<template>
  <div class="container">
    <navBar :goback="false" :search="true">
      <van-icon name="envelop-o" :dot="message_count>0" size="23px" slot="left" @click="$router.push('/messageList')" />
      <van-icon
        name="shopping-cart-o"
        :size="cartNum==0?23:22"
        slot="right"
        :info="cartNum==0?'':cartNum"
        @click="$router.push('/cart')"
      />
    </navBar>

    <div class="main">
      <van-tabs
        v-model="active"
        class="cat-tabs boxshadow-bottom"
        :line-height="0"
        :line-width="0"
        title-active-color="#1ac0a8"
        :border="false"
        @change="selectTabs"
        :swipe-threshold="5"
        :ellipsis="false"
      >
        <van-tab class="tab" :name="-1">
          <div class="tabs-title" slot="title">
            <van-icon class-prefix="icon" name="all" class="ico" size="35px" />
            <h3>All</h3>
          </div>
        </van-tab>
        <van-tab v-for="(item,i) in categoryList" :key="i" :name="i">
          <div class="tabs-title" slot="title">
            <van-icon :name="item.pic" class="ico" />
            <h3>{{item.cate_name}}</h3>
          </div>
        </van-tab>
      </van-tabs>
      <div class="tree-select">
        <div class="left">
          <div
            class="item"
            v-for="(item,i) in activeCat"
            :key="i"
            @click="selectSCat(item.id)"
            :class="activeSCat==item.id?'active':''"
          >
            <van-icon :name="item.pic" class="ico" />
            <h3>{{item.cate_name}}</h3>
          </div>
        </div>
        <div class="right">
          <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="no more"
            @load="selectSCat(activeSCat)"
            immediate-check
          > -->
            <goods-item :data="item" v-for="(item,i) in goodsList" :key="i" left-width="85px" />
          <!-- </van-list> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import goodsItem from "@/components/goods/goodsItem.vue";
export default {
  name: "categories",
  data() {
    return {
      cartNum: 0,
      message_count:0,
      categoryList: [],
      goodsList: [],
      active: -1,
      activeCat: [],
      activeSCat: 0,
      limit:99999
    };
  },
  components: {
    navBar,
    goodsItem
  },
  created() {
    this.getCartNum();
    this.getCategory();
  },
  deactivated() {},
  methods: {
    getCartNum() {
      if (this.$METHOD.getStore("token")) {
        this.$SERVER.cartCount().then(res => {
          this.cartNum = res.data.count;
          this.message_count = res.data.message_count
        });
      }
    },
    getCategory() {
      this.$SERVER.category().then(res => {
        this.categoryList = res.data;
        this.selectTabs(this.active);
      });
    },
    selectTabs() {
      if (this.active == -1) {
        this.activeCat = this.categoryList[0].children;
        this.selectSCat(0)
      } else {
        this.activeCat = this.categoryList[this.active].children;
        this.selectSCat( this.categoryList[this.active].children[0].id)
      }
    },
    selectSCat(id) {
      this.activeSCat = id;
      this.$SERVER
        .search({
          sid: id,
          limit: this.limit
        })
        .then(res => {
          this.goodsList = res.data;
        });
    }
  }
};
</script>
<style lang="less">
.cat-tabs {
  .van-tabs__wrap {
    height: auto !important;
    .van-tab {
      line-height: normal !important;
    }
    .van-tab--active {
      h3 {
        font-weight: bold;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.main {
  padding: 0;
  display: flex;
  flex-flow: column;
}
.cat-tabs {
  position: relative;
  z-index: 998;
  .tabs-title {
    h3 {
      font-size: 12px;
    }
    .ico {
      font-size: 35px;
      color: #1ac0a8;
    }
  }
}
.tree-select {
  flex-grow: 1;
  display: flex;
  .left {
    width: 80px;
    background-color: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(35, 38, 42, 0.2);
    padding: 30px 0;
    overflow-y: scroll;
    position: relative;
    z-index: 997;
    flex-shrink: 0;
    .item {
      display: flex;
      align-items: center;
      flex-flow: column;
      margin-bottom: 30px;
      &.active {
        color: #1ac0a8;
      }
      .ico {
        width: 38px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        border-radius: 50%;
        font-size: 32px;
        background-color: #ffffff;
        box-shadow: 0px 2px 3px 0px rgba(35, 38, 42, 0.16);
        margin-bottom: 5px;
      }
      h3 {
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
  .right {
    flex-grow: 1;
    margin-left: -10px;
    padding-right: 10px;
    overflow-y: scroll;
  }
}
</style>

