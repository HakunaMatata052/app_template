<template>
  <div class="container">
    <navBar :search="true">
      <van-icon
        name="shopping-cart-o"
        :size="cartNum==0?23:22"
        slot="right"
        :info="cartNum==0?'':cartNum"
        @click="$router.push('/cart')"
      />
    </navBar>
    <div class="main" ref="main">
      <van-swipe :autoplay="3000" indicator-color="white" class="banner">
        <van-swipe-item v-for="(item,i) in storeInfo.slider_image" :key="i">
          <img :src="item" />
        </van-swipe-item>
      </van-swipe>
      <div class="info">
        <div class="top">
          <div class="goods-name">{{storeInfo.store_name}}</div>
          <div class="balance">balance: {{$store.state.currency}}{{balance}}</div>
        </div>
        <div class="goods-short-name">{{storeInfo.store_info}}</div>
        <p>{{storeInfo.sales}} people have snapped up</p>
        <s>{{$store.state.currency}}{{storeInfo.ot_price}}</s>
      </div>
      <div class="option">
        <h3>Exclusive Member Discounts</h3>
        <div class="con">
          <div class="dropdown-menu" @click="show=true">
            <van-icon name="arrow-down" color="#999" class="ico" />Pre-sale 60-day delivery
          </div>
          <div class="price">{{$store.state.currency}}{{storeInfo.price}}</div>
        </div>
      </div>
      <div class="price-info">
        <h3>Special agent exclusive price</h3>
        <h4>{{$store.state.currency}}1,154.00</h4>
        <h5>Enjoy a higher discount forever</h5>
        <p>Become a special agent</p>
      </div>
      <div class="product-details" v-if="storeInfo.index_attr">
        <h3>- product details -</h3>
        <p>
          <span v-for="(attr,i) in storeInfo.index_attr.split('&')" :key="i">
            {{attr}}
            <br />
          </span>
        </p>
      </div>
      <div class="share-btn" @click="$router.push('/shareOrder/1')">
        <van-icon class-prefix="icon" name="camera" color="#fff" class="ico" />
        <span>SHARE THE SAME ITEM</span>
      </div>
      <div class="goods-content" v-html="storeInfo.description"></div>
      <div class="hot-recommend">
        <div class="title">
          <van-icon class-prefix="icon" name="hot" color="#1ac0a8" class="ico" />
          <h3>Hot Recommend</h3>
        </div>
        <goods-item :data="item" v-for="(item,i) in likeInfo" :key="i" />
      </div>
      <div class="safe-area-inset-bottom"></div>
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <van-sku
        v-model="skuShow"
        :sku="sku"
        :goods="storeInfo"
        :goods-id="storeInfo.id"
        @buy-clicked="onSubmit"
        stepper-title="number"
        :hide-stock="true"
        :hide-selected-text="true"
        class="sku"
        safe-area-inset-bottom
        :show-add-cart-btn="false"
        button-type="warning"
        buy-text="confirm"
      >
        <!-- 自定义 sku-header-price -->
        <template slot="sku-header-price" slot-scope="props">
          <div class="sku-right">
            <div class="goods-name">iPhone 11 Pro</div>
            <div class="goods-short-name">Midnight Green 4G+128G</div>
            <p>Pre-sale 60-day delivery</p>
            <div class="sku-info">
              <div class="price">
                <h3>{{ props.price }}</h3>
                <s>{{$store.state.currency}}{{storeInfo.ot_price}}</s>
              </div>
            </div>
          </div>
        </template>

        <template slot="sku-body-top" slot-scope="props">
          <div class="option">
            <h3>Exclusive Member Discounts</h3>
            <div class="con">
              Pre-sale 60-day delivery
              <div class="price">{{$store.state.currency}}{{storeInfo.price}}</div>
            </div>
          </div>
          <div class="price-info">
            <h3>Special agent exclusive price</h3>
            <h4>$1,154.00</h4>
            <h5>Enjoy a higher discount forever</h5>
            <p>Become a special agent</p>
          </div>
        </template>
      </van-sku>
    </div>
    <van-goods-action class="goods-action" safe-area-inset-bottom v-if="!skuShow">
      <van-goods-action-icon icon="audio" />
      <van-goods-action-icon icon="cart-o" :info="cartNum ==0?'':cartNum" to="/cart" />
      <van-goods-action-button
        color="#1ac0a8"
        type="warning"
        text="add Cart"
        @click="onBuyClicked(1)"
      />
      <van-goods-action-button type="danger" text="buy" color="#fb581d" @click="onBuyClicked(0)" />
    </van-goods-action>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import goodsItem from "@/components/goods/goodsItem.vue";
export default {
  name: "goodsDetails",
  components: {
    navBar,
    goodsItem
  },
  data() {
    return {
      isAddCart: 0,
      cartNum: 0,
      show: false,
      skuShow: false,
      actions: [
        { name: "选项" },
        { name: "选项" },
        { name: "选项", subname: "描述信息" }
      ],
      balance: null,
      storeInfo: {
        index_attr: ""
      },
      data: {},
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "specifications", // skuKeyName：规格类目名称
            v: [
              {
                id: 0
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        stock_num: null,
        price: "" // 默认价格（单位元）
      },
      likeInfo: []
    };
  },
  watch: {
    $route() {
      this.getDetails();
    }
  },
  created() {
    this.getCartNum();
  },
  mounted() {
    this.getDetails();
    if (this.$route.params.open == "1") {
      setTimeout(() => {
        this.skuShow = true;
      }, 500);
    }
  },
  methods: {
    getCartNum() {
      if (this.$METHOD.getStore("token")) {
        this.$SERVER.cartCount().then(res => {
          this.cartNum = res.data.count;
        });
      }
    },
    getDetails() {
      this.$refs.main.scrollTop = 0;
      this.$SERVER.productDetail(this.$route.params.id).then(res => {
        this.balance = res.data.now_money;
        this.storeInfo = res.data.storeInfo;
        this.sku.price = res.data.storeInfo.price;
        this.likeInfo = res.data.likeInfo;
        this.sku.stock_num = res.data.storeInfo.stock;
        if (res.data.productAttr.length == 0) {
          this.sku.tree = [];
          return;
        }
        this.sku.tree[0].v = [];
        for (let i in res.data.productValue) {
          this.sku.tree[0].v.push({
            id: res.data.productValue[i].unique, // skuValueId：规格值 id
            name: res.data.productValue[i].suk.replace(/,/gi, "+"), // skuValueName：规格值名称
            imgUrl: res.data.productValue[i].image, // 规格类目图片，只有第一个规格类目可以定义图片
            previewImgUrl: res.data.productValue[i].image // 用于预览显示的规格类目图片
          });
          this.sku.list.push({
            id: res.data.productValue[i].product_id,
            price: res.data.productValue[i].price * 100, // 价格（单位分）
            stock_num: res.data.productValue[i].stock, // 当前 sku 组合对应的库存
            s1: res.data.productValue[i].unique // 规格类目 k_s 为 s1 的对应规格值 id
          });
        }
        // this.sku.tree[0] = res.data.productValue
      });
    },
    onSelect() {
      this.show = false;
    },
    onBuyClicked(type) {
      this.isAddCart = type;
      this.skuShow = true;
    },
    onSubmit(sku) {
      var json = {};
      var path;
      json.cartNum = sku.selectedNum;
      json.productId = sku.goodsId;
      if (sku.selectedSkuComb) {
        json.uniqueId = sku.selectedSkuComb.s1;
      } else {
        json.uniqueId = "";
      }
      if (this.isAddCart) {
        json.new = 0;
        this.$SERVER.addCart(json).then(res => {
          this.$toast.success(res.msg);
          this.skuShow = false;
          this.getCartNum();
        });
      } else {
        json.new = 1;
        this.$SERVER.addCart(json).then(res => {
          this.$router.push("/confirmationOrder/" + res.data.cartId);
        });
      }
    }
  }
};
</script>
<style lang="less">
.goods-content {
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 220px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.info {
  margin-bottom: 35px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .goods-name {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      width: 50%;
    }
    .balance {
      width: 50%;
      background-color: #f2f2f2;
      border-radius: 50px;
      text-align: center;
      padding: 5px 10px;
      font-size: 15px;
      font-weight: bold;
      display: inline-block;
      margin-bottom: 5px;
    }
  }
  .goods-short-name {
    font-size: 15px;
    line-height: 20px;
  }
  p {
    font-size: 15px;
    line-height: 20px;
    color: #999999;
  }
  s {
    font-size: 15px;
    line-height: 20px;
    color: #999999;
  }
}
.option {
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 13px;
  margin-bottom: 17px;
  h3 {
    font-size: 15px;
    color: #999999;
    margin-bottom: 15px;
  }
  .con {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dropdown-menu {
      flex-shrink: 0;
      width: 210px;
      height: 40px;
      line-height: 40px;
      background-color: #f5f6f7;
      border-radius: 20px;
      border: solid 1px #f5f6f7;
      font-size: 15px;
      color: #999999;
      text-align: center;
      .ico {
        margin-right: 5px;
      }
    }
    .price {
      flex-shrink: 0;
      font-size: 20px;
      font-weight: bold;
      color: #fb581d;
    }
  }
}
.price-info {
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 13px;
  margin-bottom: 17px;
  h3 {
    font-size: 15px;
    font-weight: bold;
  }
  h4 {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  h5 {
    font-size: 15px;
    color: #999999;
  }
  p {
    text-decoration: underline;
    font-size: 15px;
    color: #1ac0a8;
  }
}
.product-details {
  background-color: #f5f6f7;
  border-radius: 5px;
  padding: 20px;
  h3 {
    font-size: 15px;
    font-weight: bold;
    color: #999999;
    margin-bottom: 10px;
  }
  p {
    font-size: 15px;
    line-height: 24px;
    color: #999999;
  }
}
.share-btn {
  width: 270px;
  height: 44px;
  line-height: 44px;
  background-color: #fb581d;
  border-radius: 22px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  margin: 22px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .ico {
    font-size: 28px;
    margin-right: 5px;
  }
}
.hot-recommend {
  padding-bottom: 65px;
  .title {
    display: flex;
    align-items: center;
    .ico {
      font-size: 28px;
      margin-right: 5px;
    }
    h3 {
      font-size: 19px;
      font-weight: bold;
    }
  }
}
.sku {
  .sku-right {
    flex-grow: 1;
    .goods-name {
      font-size: 17px;
      font-weight: bold;
    }
    .goods-short-name {
      font-size: 12px;
    }
    p {
      font-size: 12px;
      color: #999999;
    }
    .sku-info {
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
.submit-bar {
  margin-top: 10px;
  position: static;
}
.goods-action {
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
}
</style>