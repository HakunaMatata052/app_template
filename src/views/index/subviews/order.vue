<template>
  <div class="container">
    <navBar :goback="false" />
    <div class="main">
      <van-tabs
        v-model="activeType"
        :swipe-threshold="2"
        :ellipsis="false"
        :border="false"
        title-active-color="#1ac0a8"
        title-inactive-color="#999"
        :line-height="0"
        class="order-tabs"
      >
        <van-tab :title="item.name" :name="item.type" v-for="(item,i) in tabs" :key="i"></van-tab>
      </van-tabs>

      <div class="goods-list">
        <div class="goods-items" v-for="(item,i) in list" :key="i">
          <div class="goods-type">
            <div class="text">
              <span>To be paid</span>countdown:35days
            </div>
            <van-checkbox v-model="checked"></van-checkbox>
          </div>
          <div class="goods-info">
            <div class="left">
              <img src="https://picsum.photos/105/105" />
            </div>
            <div class="right">
              <div class="goods-name">iPhone 11 Pro</div>
              <div class="goods-short-name">Midnight Green 4G+128G</div>
              <p>Pre-sale 60-day delivery</p>
              <div class="price">
                <span>$1,254.95</span> X2
              </div>
              <div class="isVip">Exclusive for Diamond Members</div>
            </div>
          </div>
          <van-divider />
          <div class="bottom-info">
            <div class="text">
              <span>Expire after</span> 12:20:36
            </div>
            <van-button type="warning" round class="btn">To pay</van-button>
            <van-button type="primary" round plain class="btn">share order</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "",
  data() {
    return {
      activeType: 0,
      page:1,
      list:[],
      tabs: [
        { name: "ALL", type: 0 },
        { name: "TO BE PAID", type: 1 },
        { name: "TO BE DELIVERED", type: 2 },
        { name: "TO BE REPURCHASED", type: 3 },
        { name: "COMPLETED", type: 4 }
      ]
    };
  },
  components: {
    navBar
  },
  methods:{
    getList(){
      this.$SERVER.orderList({
        page:this.page,
        type:this.activeType
      }).then(res=>{
        this.list = res.data
      })
    }
  }
};
</script>
<style lang="less">
.order-tabs {

.van-tabs__wrap {
  height: 30px !important;
}
.van-tab {
  padding: 0 15px;
  font-size: 15px;
  line-height: 30px !important;
  border: solid 1px #fff;
  &.van-tab--active {
    border-radius: 36px;
    border: solid 1px #1ac0a8;
  }
  span {
    font-weight: bold !important;
  }
}
}
</style>

<style lang="less" scoped>
.goods-items {
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  margin-top: 16px;
  .goods-type {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .text {
      color: #999999;
      span {
        display: inline-block;
        height: 22px;
        line-height: 22px;
        padding: 0 10px;
        background-color: #1ac0a8;
        border-radius: 11px;
        font-size: 13px;
        font-weight: bold;
        color: #ffffff;
        margin-right: 5px;
      }
    }
  }
  .goods-info {
    display: flex;
    .left {
      flex-shrink: 0;
      width: 93px;
      height: 112px;
      margin-right: 23px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .right {
      flex-grow: 1;
      .goods-name {
        font-size: 17px;
        font-weight: bold;
      }
      .goods-short-name {
        font-size: 12px;
        margin-bottom: 10px;
      }
      p {
        font-size: 15px;
      }
      .price {
        font-size: 15px;
        color: #000000;
        margin-bottom: 5px;
        span {
          font-size: 20px;
          color: #fb581d;
          margin-right: 10px;
          font-weight: bold;
        }
      }
      .isVip {
        font-size: 13px;
        color: #999999;
      }
    }
  }
  .bottom-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      font-size: 15px;
      font-weight: bold;
      span {
        font-weight: bold;
        color: #999999;
      }
    }
    .btn {
      height: 35px;
      line-height: 35px;
      padding: 0 26px;
    }
  }
}
</style>