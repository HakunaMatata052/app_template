<template>
  <div class="goods-items" @click.stop="$router.push('/goodsDetails/'+data.id+'/0')">
    <div class="left" :style="'width:'+leftWidth">
      <img :src="data.image" />
    </div>
    <div class="right">
      <div class="goods-name van-ellipsis">{{data.store_name}}</div>
      <div class="goods-short-name van-ellipsis">{{data.store_info}}</div>
      <p>{{data.sales}} people have snapped up</p>
      <div class="info">
        <div class="price">
          <s>{{$store.state.currency}}{{data.ot_price}}</s>
          <h3>{{$store.state.currency}}{{data.price}}</h3>
        </div>
        <div class="btn" @click.stop="$router.push('/goodsDetails/'+data.id+'/1')">buy</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    leftWidth: {
      type: String,
      default() {
        return "105px";
      },
      required: false
    }
  }
};
</script>

<style lang="less" scoped>
.goods-items {
  display: flex;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  margin-top: 16px;
  .left {
    flex-shrink: 0;
    width: 105px;
    height: 105px;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .right {
    flex-grow: 1;
    overflow: hidden;
    .goods-name {
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .goods-short-name {
      font-size: 12px;
      line-height: 20px;
    }
    p {
      font-size: 12px;
      color: #999999;
      line-height: 20px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      .price {
        s {
          font-size: 12px;
          color: #999999;
        }
        h3 {
          font-size: 18px;
          color: #fb581d;
          font-weight: bold;
        }
      }
      .btn {
        width: 80px;
        height: 33px;
        line-height: 33px;
        background-color: #fb581d;
        border-radius: 17px;
        text-align: center;
        font-size: 15px;
        color: #fff;
      }
    }
  }
}
</style>