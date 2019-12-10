<template>
  <div class="container">
    <navBar />
    <div class="main">
      <h3>Offline signing,Visit the company</h3>
      <div class="info">
        <dl>
          <dt>company address:</dt>
          <dd>JKT 122 1001-22</dd>
        </dl>
        <dl>
          <dt>Business hours:</dt>
          <dd>Monday to Friday 9:00-17:00</dd>
          <dd>Saturday to Sunday 9:00-17:00</dd>
        </dl>
        <dl>
          <dt>Consulting Appointment:</dt>
          <dd>whatsapp 0123456789</dd>
        </dl>
      </div>
      <h3>Online payments</h3>
      <div class="info">
        <van-button type="primary" class="btn" plain round block>Diamond membership   $20.356.30</van-button>
        <van-button type="primary" class="btn" plain round block>Diamond membership   $20.356.30</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "vip",
  data() {
    return {};
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
h3{
    font-size: 15px;
    font-weight: bold;
    color: #1ac0a8;
    margin: 25px 0 15px;
}
.info{
    background-color: #f5f6f7;
    border-radius: 15px;
    padding: 20px;
    dl{
        margin-bottom: 15px;
        dt{
            color: #999;
        }
        dd{
            font-size: 15px;
            line-height: 25px;
        }
    }
    .btn{
        margin-bottom: 10px;
    }
}
</style>