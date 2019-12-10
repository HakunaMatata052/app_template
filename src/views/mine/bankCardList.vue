<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="bank-list">
        <div class="item" v-for="(item,i) in list" :key="i">
          <div class="ico">
            <img :src="item.bank_img" />
          </div>
          <div class="info">
            <h3>{{item.bank_name}}</h3>
            <p>{{item.bank_code}}</p>
          </div>
          <van-icon name="cross" class="close" color="#fff" size="18px" @click="del(item.id)" />
        </div>
        <div class="add item" @click="$router.push('/addBankCard')">
          <div class="ico">
            <van-icon name="add-o" size="39px" color="#c8c8c8" />
          </div>
          <h4>Add bank card</h4>
        </div>
      </div>
      <password-box @onSuccess="submit" ref="passwordBox" />
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import passwordBox from "@/components/operation/passwordBox.vue";

export default {
  name: "bankCardList",
  data() {
    return {
      list: [],
      delId:null
    };
  },
  components: {
    navBar,
    passwordBox
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$SERVER.userBank().then(res => {
        this.list = res.data;
      });
    },
    del(id) {
      this.$refs.passwordBox.showFn()
      this.delId = id
    },
    submit(pwd){
      
      this.$SERVER.BankDel({
        id:this.delId,
        paypwd:pwd
      }).then(res => {
        this.$refs.passwordBox.hideFn();
        this.$toast.success(res.msg)
        this.getList();
      }).catch(err=>{
        this.$refs.passwordBox.clearFn();
      })
    }
  }
};
</script>

<style lang="less" scoped>
.bank-list {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #f5f6f7;
    border-radius: 5px;
    margin-bottom: 15px;
    &:nth-child(2n + 1) {
      background-color: #f46864;
    }
    &:nth-child(2n) {
      background-color: #1ac0a8;
    }
    &.add {
      background-color: #f5f6f7;
    }
    .ico {
      flex-shrink: 0;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
      }
    }
    h4 {
      flex-grow: 1;
      font-size: 15px;
      font-weight: bold;
      color: #c8c8c8;
      padding: 0 15px;
    }
    .info {
      flex-grow: 1;
      color: #fff;
      overflow: hidden;
      padding: 0 15px;
      h3 {
        font-size: 13px;
        line-height: 39/2px;
      }
      p {
        font-size: 13px;
        line-height: 39/2px;
      }
    }
    .close {
      flex-shrink: 0;
    }
  }
}
</style>