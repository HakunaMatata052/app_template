<template>
  <div class="container">
    <navBar :goback="false" title="SHARE ORDER" />
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <div class="share-item" v-for="(item,i) in list" :key="i">
          <div class="user-info">
            <div class="avatar">
              <img :src="item.avatar||user_img" />
            </div>
            <div class="user-name">
              <h3>{{item.nickname}}</h3>
              <p>{{item.created_at | format('yyyy-MM-dd hh:mm:ss')}}</p>
            </div>
          </div>
          <div class="content">{{item.content}}</div>
          <van-row :gutter="8" class="image-list">
            <van-col span="8" v-for="(item2,index) in item.imgs" :key="index">
              <van-image
                fit="cover"
                class="image"
                :src="item2"
                @click.stop="imagePreview(item.imgs,index)"
              />
            </van-col>
          </van-row>
          <div class="bottom">
            <van-button
              plain
              round
              type="primary"
              class="btn"
              @click="$router.push('/goodsDetails/'+item.goods_id)"
            >I ALSO WANT TO BUY</van-button>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
import navBar from "@/components/navbar/navbar.vue";
import user_img from "@/assets/images/default.png";
export default {
  name: "",
  data() {
    return {
      page: 1,
      finished: false,
      loading: false,
      list: [],
      mediaList: [],
      user_img: user_img
    };
  },
  components: {
    navBar
  },
  methods: {
    getList() {
      this.$SERVER
        .dryingList({
          page: this.page
        })
        .then(res => {
          if (res.data.length == 0) {
            console.log(1);
            this.finished = true;
          }
          this.loading = false;
          this.page++;
          this.list = [...this.list, ...res.data];
        });
    },
    imagePreview(imgs, index) {
      var that = this;
      ImagePreview({
        images: imgs,
        startPosition: index,
        onClose() {
          // do something
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.share-item {
  margin-bottom: 40px;
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar {
      position: relative;
      flex-shrink: 0;
      margin-right: 15px;
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .user-name {
      flex-grow: 1;
      h3 {
        font-size: 17px;
        font-weight: bold;
      }
      p {
        font-size: 15px;
        color: #999;
      }
    }
  }
  .content {
    font-size: 15px;
    line-height: 18px;
    padding: 10px;
  }
  .image-list {
    margin-bottom: 20px;
    .image {
      width: 110px;
      height: 110px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
  .bottom {
    display: flex;
    flex-flow: row-reverse;
    .btn {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>