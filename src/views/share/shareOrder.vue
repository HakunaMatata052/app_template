<template>
  <div class="container">
    <navBar />
    <div class="main">
      <textarea
        class="textarea"
        v-model="form.text"
        cols="30"
        rows="10"
        placeholder="No more than 60 words"
        maxlength="300"
      ></textarea>
      <div class="preview">
        <van-uploader
          v-model="fileList"
          :max-count="3"
          multiple
          :max-size="3000000"
          @oversize="oversize"
        />
      </div>
      <van-button type="primary" round class="btn" @click="submit">SAVE</van-button>

      <van-overlay :show="show" @click="show = false" class="overlay">
        <van-loading type="spinner" color="#1989fa" />
      </van-overlay>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "",
  data() {
    return {
      fileList: [],
      num: 0,
      show: false,
      form: {
        text: ""
      },
      imgs: []
    };
  },
  watch: {
    num(val) {
      if (val == this.fileList.length) {
        this.save();
      }
    }
  },
  components: {
    navBar
  },
  methods: {
    oversize() {
      this.$toast.fail("Picture too large");
    },
    upload(data) {
      let formData = new FormData();
      formData.append("file", data);
      this.$SERVER
        .upload(formData)
        .then(res => {
          this.imgs.push(res.data.url);
          this.num++;
        })
        .catch(err => {
          this.$toast.fail(err.msg);
        });
    },
    submit() {
      if (this.form.text.length == 0) {
        this.$toast.fail("Please enter content!");
        return;
      }
      this.show = true;
      if (this.fileList.length != 0) {
        for (var i = 0; i < this.fileList.length; i++) {
          this.upload(this.fileList[i].file);
        }
      } else {
        this.save();
      }
    },
    save() {
      this.show = false;
      //
      this.$SERVER
        .dryingAdd({
          goods_id: this.$route.params.id,
          content: this.form.text,
          imgs: this.imgs.join(",")
        })
        .then(res => {
          this.$toast.success(res.msg);
          this.$router.go(-1);
        });
    }
  }
};
</script>
<style lang="less">
.preview {
  .van-uploader {
    width: 100%;
  }
  .van-uploader__wrapper {
    & > div {
      width: 108px !important;
      height: 108px !important;
      margin: 0 7px 0 0 !important;
    }
    .van-uploader__preview-image {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
<style lang="less" scoped>
.textarea {
  width: 100%;
  height: 140px;
  margin-top: 10px;
  border: 0;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 20px 25px;
  box-sizing: border-box;
}
.preview {
  margin-top: 25px;
}
.btn {
  display: block;
  width: 270px;
  height: 44px;
  line-height: 44px;
  font-size: 17px;
  font-weight: bold;
  color: #ffffff;
  margin: 135px auto 0;
}
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>