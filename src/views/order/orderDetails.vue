<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="top">
        <p>Shipping countdown : 35 days</p>
        <p>
          <span>Official repo</span>
          <van-icon name="question-o" color="#9fa6b0" />
        </p>
      </div>
      <div class="img">
        <img src="http://lorempixel.com/345/220" />
      </div>
      <div class="goods-info">
        <div class="left">
          <div class="goods-name">iPhone 11 Pro</div>
          <div class="goods-short-name">Midnight Green 4G+128G</div>
          <s>{{$store.state.currency}}2000</s>
        </div>
        <div class="right">
          <van-button type="warning" class="btn" round>buy again</van-button>
        </div>
      </div>
      <van-divider />
      <div class="order-info">
        <p>
          Order Number : 1234567891011
          <br />Pre-sale 60-day delivery :
          <span>$1,254.95</span>X2
          <br />Total : $2,509.90
          <br />Freight (total weight:1.2kg) : $20.00
          <br />Actual Payment : $2,509.90
          <br />Payment Method : Balance Bayment $2,509.90
          <br />Payment Time : 2019.11.27 15:41:21
          <br />Delivery Address : JKT GREAT INDONESIA 101-11
        </p>
      </div>
      <div class="repo-info">
        <van-button type="primary" class="btn" round plain>Official repo</van-button>
        <van-icon name="question-o" size="26px" color="#9fa6b0" />
        <p>
          Total repurchases:$2,509.90
          <br />Refund shipping:$1.90
          <br />Repurchase fee:5%
        </p>
      </div>
    </div>
    <div class="bottom-btn safe-area-inset-bottom boxshadow-top">
      <van-icon name="service-o" size="23px" color="#1ac0a8" />
      <span>Contact Customer Service</span>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "orderDetails",
  data() {
    return {};
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  p {
    font-size: 15px;
    span {
      text-decoration: underline;
      font-size: 15px;
      font-weight: bold;
      color: #1ac0a8;
      margin-right: 5px;
    }
  }
}
.img {
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    background-color: #ccc;
    border-radius: 10px;
  }
}
.goods-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .goods-name {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .goods-short-name {
    font-size: 12px;
    line-height: 20px;
  }
  s {
    font-size: 12px;
    color: #999999;
  }
  .btn {
    font-weight: bold;
    font-size: 15px;
  }
}
.order-info {
  margin-bottom: 25px;
  p {
    line-height: 25px;
    span {
      font-size: 20px;
      font-weight: bold;
      color: #fb581d;
      margin-right: 10px;
    }
  }
}
.repo-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 25px;
  .btn {
    font-size: 15px;
    font-weight: bold;
    padding: 0 50px;
    margin-right: 15px;
  }
  p {
    margin-top: 15px;
    width: 100%;
    line-height: 24px;
    color: #fb581d;
  }
}
.bottom-btn {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 15px;
    color: #1ac0a8;
    padding-left: 15px;
  }
}
</style>