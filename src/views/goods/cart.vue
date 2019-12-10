<template>
  <div class="container">
    <navBar />
    <div class="cart-top">
      <span>{{count}} in total</span>
      <van-button
        plain
        type="primary"
        round
        class="btn"
        @click="delAll"
        v-if="cartList.valid"
      >Empty shopping cart</van-button>
    </div>
    <div class="main">
      <empty :empty="count==0" />
      <div class="cart-list">
        <div class="order-item" v-for="(item,index) in cartList.valid" :key="index">
          <van-checkbox v-model="item.checked" class="checkbox" @click="switchSelect(index)"></van-checkbox>
          <div
            class="goods-items"
            @click.stop="$router.push('/goodsDetails/'+item.productInfo.id+'/0')"
          >
            <div class="left">
              <img :src="item.productInfo.attrInfo.image" v-if="item.productInfo.attrInfo" />
              <img :src="item.productInfo.image" v-else />
            </div>
            <div class="right">
              <div class="goods-name">{{item.productInfo.store_name}}</div>
              <div
                class="goods-short-name"
                v-if="item.productInfo.attrInfo"
              >{{item.productInfo.attrInfo.suk.replace(/,/gi, "+")}}</div>
              <ul v-if="item.productInfo.index_attr">
                <li v-for="(attr,i) in item.productInfo.index_attr.split('&')" :key="i">{{attr}}</li>
              </ul>
              <s>{{$store.state.currency}}{{item.productInfo.ot_price}}</s>
            </div>
          </div>
          <div class="option">
            <h3>Exclusive Member Discounts</h3>
            <div class="con">
              <div class="dropdown-menu">
                <van-icon name="arrow-down" color="#999" class="ico" />Pre-sale 60-day delivery
              </div>
              <div class="price" v-if="item.productInfo.attrInfo">
                <span>{{$store.state.currency}}{{item.productInfo.attrInfo.price}}</span>
              </div>

              <div class="price" v-else>
                <span>{{$store.state.currency}}{{item.productInfo.price}}</span>
              </div>
            </div>
          </div>
          <div class="price-info">
            <div class="top">
              <h3>Special agent exclusive price</h3>
              <h4>{{$store.state.currency}}1,154.00</h4>
            </div>
            <h5>Enjoy a higher discount forever</h5>
            <p>Become a special agent</p>
          </div>
          <van-stepper
            v-model="item.cart_num"
            class="stepper"
            @plus="plus(index)"
            @minus="reduce(index)"
            :disable-input="true"
          />
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="hot-recommend">
        <div class="title">
          <van-icon class-prefix="icon" name="hot" color="#1ac0a8" class="ico" />
          <h3>Hot Recommend</h3>
        </div>
        <goods-item :data="item" v-for="(item,i) in hotList" :key="i" />
      </div>
    </div>

    <van-submit-bar
      label="Total:"
      :currency="$store.state.currency"
      :price="countmoney*100"
      button-text="Settlement"
      @submit="placeOrder"
      button-type="warning"
      safe-area-inset-bottom
    >
      <van-checkbox v-model="isAllSelect" @click="allChecked">select all</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import empty from "@/components/goods/empty.vue";
const CHECKED_IDS = "cart_checked";
import { mul, add } from "@/common/js/bc.js";
export default {
  name: "",
  components: {
    navBar,
    empty
  },
  data: function() {
    return {
      cartList: { invalid: [], valid: [] },
      isAllSelect: false,
      cartCount: 0,
      countmoney: 0,
      goodsHidden: true,
      footerswitch: false,
      count: 0,
      checkedIds: [],
      loaded: false,
      checkedAll: false,
      hotList: []
    };
  },
  watch: {
    $route(n) {
      if (n.name === "cart") {
        this.carnum();
        this.countMoney();
        this.getCartList();
        this.gainCount();
        this.goodsHidden = true;
        this.footerswitch = false;
      }
    }
  },
  mounted: function() {
    let that = this;
    that.carnum();
    that.countMoney();
    that.getCartList();
    that.gainCount();
    that.getHotGoods();
  },
  methods: {
    getHotGoods() {
      this.$SERVER.productHot().then(res => {
        this.hotList = res.data;
      });
    },
    getCartList: function() {
      let that = this;
      this.$SERVER.cartList().then(res => {
        that.cartList = res.data;
        let checkedIds = that.$METHOD.getCookie(CHECKED_IDS) || [];
        if (!Array.isArray(checkedIds)) checkedIds = [];
        // this.cartList.valid.forEach(cart => {
        //   if (checkedIds.length) {
        //     if (checkedIds.indexOf(cart.id) !== -1) cart.checked = true;
        //     else cart.checked = false;
        //   } else {
        //     cart.checked = true;
        //     that.checkedIds.push(cart.id);
        //   }
        // });
        if (checkedIds.length) {
          that.checkedIds = checkedIds;
        }
        that.isAllSelect =
          that.checkedIds.length === this.cartList.valid.length;
        that.carnum();
        that.countMoney();
        this.loaded = true;
      });
    },
    delAll() {
      var that = this;

      if (this.cartList.valid.length != 0) {
        this.$dialog
          .alert({
            message: "Are you sure you want to empty the shopping cart?"
          })
          .then(() => {
            let arr = [];
            for (let i = 0; i < this.cartList.valid.length; i++) {
              arr.push(this.cartList.valid[i].id);
            }
            this.$SERVER
              .cartDel({
                ids: arr.join(",")
              })
              .then(res => {
                that.cartList.valid = [];
                that.carnum();
                that.countMoney();
                that.gainCount();
              });
          });
      }
    },
    //删除商品；
    delgoods: function() {
      let that = this,
        id = [],
        valid = [],
        list = that.cartList.valid;
      list.forEach(function(val) {
        if (val.checked === true) {
          id.push(val.id);
        }
      });
      if (id.length === 0) {
        that.$toast.fail("Please select a product");
        return;
      }
      postCartDel(id).then(function() {
        list.forEach(function(val, i) {
          if (val.checked === false || val.checked === undefined)
            valid.push(list[i]);
        });
        that.$set(that.cartList, "valid", valid);
        that.carnum();
        that.countMoney();
        that.gainCount();
      });
    },
    // //获取数量
    gainCount: function() {
      let that = this;
      if (that.$METHOD.getStore("token")) {
        this.$SERVER.cartCount().then(res => {
          that.count = res.data.count;
        });
      }
    },
    //清除失效产品；
    delInvalidGoods: function() {
      let that = this,
        id = [],
        list = that.cartList.invalid;
      list.forEach(function(val) {
        id.push(val.id);
      });
      postCartDel(id).then(function() {
        list.splice(0, list.length);
        that.gainCount();
      });
    },
    //批量收藏;
    collectAll: function() {
      let that = this,
        data = { id: [], category: "" },
        list = that.cartList.valid;
      list.forEach(function(val) {
        if (val.checked === true) {
          data.id.push(val.product_id);
          data.category = val.type;
        }
      });
      if (data.id.length === 0) {
        that.$toast.fail("Please select a product");
        return;
      }
      postCollectAll(data).then(function() {
        that.$dialog.toast({ mes: "收藏成功!" });
      });
    },
    //立即下单；
    placeOrder: function() {
      let that = this,
        list = that.cartList.valid,
        id = [];
      list.forEach(function(val) {
        if (val.checked === true) {
          id.push(val.id);
        }
      });
      if (id.length === 0) {
        that.$toast.fail("Please select a product");
        return;
      }
      this.$router.push("/confirmationOrder/" + id);
    },
    manage: function() {
      let that = this;
      that.footerswitch = !that.footerswitch;
    },
    goodsOpen: function() {
      let that = this;
      that.goodsHidden = !that.goodsHidden;
    },
    //加
    plus: function(index) {
      let that = this;
      let list = that.cartList.valid[index];
      list.cart_num++;
      if (list.attrInfo) {
        if (list.cart_num >= list.attrInfo.stock) {
          that.$set(list, "cart_num", list.attrInfo.stock);
        }
      } else {
        if (list.cart_num >= list.stock) {
          that.$set(list, "cart_num", list.stock);
        }
      }
      that.carnum();
      that.countMoney();
      that.syncCartNum(list);
    },
    //减
    reduce: function(index) {
      let that = this;
      let list = that.cartList.valid[index];
      list.cart_num--;
      if (list.cart_num < 1) {
        that.$set(list, "cart_num", 1);
      }
      that.carnum();
      that.countMoney();
      that.syncCartNum(list);
    },
    syncCartNum(cart) {
      this.$SERVER.cartNum({
        id: cart.id,
        number: Math.max(cart.cart_num, 1) || 1
      });
    },
    //单选
    switchSelect: function(index) {
      let that = this,
        cart = that.cartList.valid[index],
        i = this.checkedIds.indexOf(cart.id);
      cart.checked = !cart.checked;

      if (i !== -1) this.checkedIds.splice(i, 1);
      if (cart.checked) {
        this.checkedIds.push(cart.id);
      }
      let len = that.cartList.valid.length;
      let selectnum = [];
      for (let i = 0; i < len; i++) {
        if (that.cartList.valid[i].checked === true) {
          selectnum.push(true);
        }
      }
      that.isAllSelect = selectnum.length === len;
      that.$set(that, "cartList", that.cartList);
      that.$set(that, "isAllSelect", that.isAllSelect);
      that.$METHOD.setCookie(CHECKED_IDS, that.checkedIds);
      that.carnum();
      that.countMoney();
    },
    //全选
    allChecked: function() {
      let that = this;
      let selectAllStatus = that.isAllSelect;
      selectAllStatus = !selectAllStatus;
      let checkedIds = [];
      // for (let i = 0; i < array.length; i++) {
      //   array[i].checked = selectAllStatus;
      //   checked.push()
      // }
      that.cartList.valid.forEach(cart => {
        cart.checked = selectAllStatus;
        if (selectAllStatus) checkedIds.push(cart.id);
      });
      that.$set(that, "cartList", that.cartList);
      that.$set(that, "isAllSelect", selectAllStatus);
      this.checkedIds = checkedIds;
      that.$METHOD.setCookie(CHECKED_IDS, checkedIds);
      that.carnum();
      that.countMoney();
    },
    //数量
    carnum: function() {
      let that = this;
      var carnum = 0;
      var array = that.cartList.valid;
      for (let i = 0; i < array.length; i++) {
        if (array[i].checked === true) {
          carnum += parseInt(array[i].cart_num);
        }
      }
      that.$set(that, "cartCount", carnum);
    },
    //总共价钱；
    countMoney: function() {
      let that = this;
      let carmoney = 0;
      let array = that.cartList.valid;
      for (let i = 0; i < array.length; i++) {
        if (array[i].checked === true) {
          carmoney = add(carmoney, mul(array[i].cart_num, array[i].truePrice));
        }
      }
      that.countmoney = Number(carmoney);
    }
  }
};
</script>
<style lang="less">
.stepper {
  width: 130px;
  display: flex;
  align-items: center;
  padding: 0;
  border: solid 1px #1ac0a8;
  border-radius: 50px;
  float: right;
  button {
    width: 35px;
    height: 35px;
    border-radius: 50px;
    color: #1ac0a8;
    background-color: transparent;
  }
  input {
    flex-grow: 1;
    background-color: transparent;
    font-weight: bold;
    font-size: 20px;
  }
  .van-stepper__minus::before,
  .van-stepper__plus::before {
    width: 20px !important;
    height: 4px !important;
    border-radius: 2px;
  }
  .van-stepper__minus::after,
  .van-stepper__plus::after {
    width: 4px !important;
    height: 20px !important;
    border-radius: 2px;
  }
  .van-stepper__input[disabled] {
    color: #323233;
    background-color: transparent;
  }
}
</style>
<style lang="less" scoped>
.main {
  height: 100%;
}
.cart-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  flex-shrink: 0;
  span {
    font-size: 15px;
    color: #1ac0a8;
  }
  .btn {
    height: 30px;
    line-height: 30px;
  }
}
.order-item {
  padding: 15px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  margin-top: 16px;
  border-radius: 5px;

  position: relative;
  .checkbox {
    position: absolute;
    left: 10px;
    top: 10px;
    background-color: #f2f4f5;
    border-radius: 50%;
  }
  .goods-items {
    display: flex;
    margin-bottom: 20px;
    .left {
      flex-shrink: 0;
      width: 95px;
      height: 120px;
      padding-left: 25px;
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
      }
      .goods-short-name {
        font-size: 12px;
        margin-bottom: 5px;
      }

      s {
        font-size: 12px;
        color: #999999;
      }
      ul {
        margin-bottom: 10px;
        li {
          font-size: 13px;
          line-height: 17px;
          color: #999999;
          position: relative;
          padding-left: 15px;
          &::before {
            display: block;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -2px;
            content: "";
            width: 4px;
            height: 4px;
            background-color: #fb581d;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .option {
    margin-bottom: 17px;
    h3 {
      font-size: 15px;
      color: #999999;
      margin-bottom: 10px;
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
        color: #fb581d;
        span {
          font-weight: bold;
        }
      }
    }
  }
  .price-info {
    margin-bottom: 10px;
    .top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 10px;
      h3 {
        font-size: 15px;
        font-weight: bold;
        margin-right: 5px;
      }
      h4 {
        font-size: 20px;
        font-weight: bold;
      }
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
}
.hot-recommend {
  padding-bottom: 65px;
  margin-top: 20px;
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
</style>