<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <div class="message-list">
          <div class="item" :class="item.state?'':'unread'" v-for="(item,i) in list" :key="i">
            <div class="avatar" @click="$router.push('/messageDetails/'+item.id)">
              <img :src="item.admin_avatar" />
            </div>
            <div class="info" @click="$router.push('/messageDetails/'+item.id)">
              <h3>{{item.title}}</h3>
              <p class="van-ellipsis">{{item.content}}</p>
            </div>
            <div class="op">
              <div class="time">{{item.created_at | timeSwitchString}}</div>
              <van-checkbox v-model="item.checked" class="checked"></van-checkbox>
            </div>
          </div>
        </div>
      </van-list>
      <div class="operation" v-if="countTotal>0">
        <div class="item" @click="delMessage">
          <van-icon name="delete" color="#1ac0a8" size="23px" />
          <p>Delete</p>
        </div>
        <div class="item" @click="selectAll">
          <van-icon name="passed" color="#1ac0a8" size="23px" />
          <p>Select all</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "messageList",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  components: {
    navBar
  },
  computed: {
    countTotal() {
      var checkedNum = 0;
      this.list.forEach(function(item) {
        if (item.checked) {
          checkedNum++;
        }
      });
      return checkedNum;
    }
  },
  methods: {
    getList() {
      this.$SERVER
        .messageList({
          page: this.page
        })
        .then(res => {
          this.loading = false;
          if (res.data.length == 0) {
            this.finished = true;
            return;
          }
          this.page++;
          this.list = [...this.list, ...res.data];
        });
    },
    selectAll() {
      var that = this;
      this.list.forEach(function(item, i) {
        that.$set(that.list[i], "checked", true);
      });
    },
    delMessage() {
      var arr = [];
      this.list.forEach(function(item, i) {
        if (item.checked) arr.push(item.id);
      });
      this.$SERVER.messageDel({
        id:arr.join(',')
      }).then(res=>{
        this.$toast.success(res.msg)
        this.page = 1
        this.list = []
      })
      // messageEdit
    }
  }
};
</script>

<style lang="less" scoped>
.message-list {
  .item {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 12px;
    &.unread {
      .avatar {
        &::before {
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          background-color: #fb581d;
          position: absolute;
          right: 0;
          top: 0;
          border-radius: 50%;
        }
      }
      .info {
        h3 {
          color: #333;
        }
      }
    }
    .avatar {
      flex-shrink: 0;
      position: relative;
      img {
        display: block;
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
    }
    .info {
      flex-grow: 1;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      padding: 0 10px;
      overflow: hidden;
      h3 {
        font-size: 15px;
        font-weight: bold;
        color: #999;
      }
      p {
        color: #999;
      }
    }
    .op {
      flex-shrink: 0;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      .time {
        font-size: 15px;
        color: #999999;
      }
      .checked {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
.operation {
  position: absolute;
  left: 50%;
  bottom: 70px;
  margin-left: -265/2px;
  width: 265px;
  height: 45px;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.18);
  border-radius: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item {
    flex-grow: 1;
    text-align: center;
    color: #999999;
    font-size: 13px;
  }
}
</style>