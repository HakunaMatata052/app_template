<template>
  <div class="container">
    <navBar title :kefu="false">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        shape="round"
        left-icon
        class="search"
        slot="title"
      >
        <van-icon name="search" slot="right-icon" @click="onSearch(true);saveKeywords()" />
      </van-search>
    </navBar>
    <div class="main">
      <div class="search-t" v-if="searchList.length!=0">
        <h3>History search</h3>
        <span @click="clearKeywords">Clear</span>
      </div>
      <div class="tag-list">
        <p v-for="(item,i) in searchList" :key="i" @click="searchK(item)">
          {{item}}
          <van-icon name="cross" class="ico" @click.stop="delKeywords(i)" />
        </p>
      </div>
      <div class="hot-recommend">
        <div class="title">
          <h3>Hot Recommend</h3>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="no more" @load="onSearch">
          <goods-item :data="item" v-for="(item,i) in list" :key="i" />
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import goodsItem from "@/components/goods/goodsItem.vue";
export default {
  name: "search",
  data() {
    return {
      keyword: "",
      page: 1,
      loading: false,
      finished: false,
      list: [],
      searchList: []
    };
  },
  components: {
    navBar,
    goodsItem
  },
  created() {
    if (this.$METHOD.getStore("search")) {
      this.searchList = JSON.parse(this.$METHOD.getStore("search"));
    } else {
      this.$METHOD.setStore("search", []);
    }
  },
  methods: {
    saveKeywords() {
      if (this.keyword.length == 0) {
        this.$toast.fail("Please enter keywords");
        return;
      }
      if (this.searchList.length <= 5) {
        this.searchList = [...new Set([...this.searchList, this.keyword])];
        this.$METHOD.setStore("search", this.searchList);
      } else {
      }
    },
    delKeywords(index) {
      this.searchList.splice(index, 1);
      this.$METHOD.setStore("search", this.searchList);
    },
    clearKeywords() {
      this.$METHOD.setStore("search", []);
      this.searchList = [];
    },
    onSearch(isClear) {
      var go = true;
      if (isClear) {
        this.page = 1;
        this.finished = false;
        if (this.keyword.length == 0) {
          this.$toast.fail("Please enter keywords");
          go = false;
        }
      }
      if (go) {
        this.loading = true;
        this.$SERVER
          .search({
            page: this.page,
            keyword: this.keyword
          })
          .then(res => {
            this.loading = false;
            this.page++;
            if (isClear) {
              this.list = res.data;
            } else {
              if (res.data.length == 0) {
                this.finished = true;
              }
              this.list = [...this.list, ...res.data];
            }
          });
      }
    },
    searchK(val) {
      this.keyword = val;
      this.onSearch(true);
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-t {
  padding: 20px 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 17px;
    font-weight: bold;
  }
  span {
    text-decoration: underline;
    font-size: 15px;
    color: #1ac0a8;
  }
}
.tag-list {
  padding: 10px 0;
  p {
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    background-color: #f0f1f2;
    border-radius: 15px;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px;
    .ico {
      margin-left: 5px;
      color: #9fa6b0;
    }
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
</style>