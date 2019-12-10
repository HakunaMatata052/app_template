<template>
  <div class="container">
    <navBar :kefu="false">
      <van-icon name="delete" slot="right" @click="del" color="#fb581d" />
    </navBar>
    <div class="main" ref="main" v-show="data.created_at">
      <div class="title">{{data.title}}</div>
      <div class="content" v-html="data.content"></div>
      <div class="info">
        <div class="avatar">
          <img :src="data.admin_avatar" alt />
        </div>
        <p>{{data.account}}</p>
        <p>{{data.created_at | format('yyyy/MM/dd hh:mm:ss')}}</p>
      </div>
      <div class="np">
        <div class="btn" v-if="data.top_id!=0" @click="$router.push('/messageDetails/'+data.top_id)">Previous</div>
        <div class="btn" v-if="data.down_id!=0" @click="$router.push('/messageDetails/'+data.down_id)">Next</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "messageDetails",
  data() {
    return {
      data: {}
    };
  },
  components: {
    navBar
  },
  watch:{
    $route(){
      this.getDetails();
    }
  },
  mounted() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.$refs.main.scrollTop = 0;
      this.$SERVER
        .messageEdit({
          id: this.$route.params.id
        })
        .then(res => {
          this.data = res.data;
          
        });
    },
    del() {
      this.$SERVER
        .messageDel({
          id: this.$route.params.id
        })
        .then(res => {
          this.$router.go(-1);
          this.$toast.success(res.msg);
        });
    },
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 30px;
}
.title {
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 20px;
}
.content {
  font-size: 15px;
  line-height: 23px;
  color: #999999;
  margin-bottom: 30px;
  * {
    max-width: 100%;
  }
}
.info {
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  .avatar {
    margin-bottom: 10px;
    img {
      width: 43px;
      height: 43px;
      display: block;
      border-radius: 50%;
    }
  }
  p {
    font-size: 15px;
    line-height: 25px;
    color: #999999;
  }
}
.np {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #1ac0a8;
    border-radius: 20px;
    margin: 0 25/2px;

    font-size: 15px;
    font-weight: bold;
	color: #ffffff;
  }
}
</style>