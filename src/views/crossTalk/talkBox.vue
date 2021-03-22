<template>
  <div>
    <van-list
      class="container"
      v-model="loading"
      :finished="finished"
      finished-text="就这么多了Σ(っ °Д °;)っ"
      @load="onLoad"
    >
      <router-link
        class="box van-multi-ellipsis--l2"
        v-for="item in crossTalk"
        :key="item.albumId"
        :to="'/talkDetail/' + item.albumId"
      >
        <img :src="item.pic" alt />
        <div class="title">{{ item.title }}</div>
        <div class="played">▶ {{ item.playsCount | handlePlayCount }}</div>
      </router-link>
    </van-list>
    <!-- 触底刷新 -->
  </div>
</template> 


<script>
import axiosGetHttp from "../../utils/axiosGetHttp";
import { crossTalkUrl } from "../../utils/api";

export default {
  data() {
    return {
      crossTalk: [],
      loading: false,
      finished: false,
      size: 21,
    };
  },
  created() {
    this.onLoad();
  },

  methods: {
    //获取数据
    async getInfo() {
      let res = await axiosGetHttp("get", crossTalkUrl(this.urlKey, this.size));
      let crossTalk = res.list;
      this.crossTalk = crossTalk;
      // console.log("数据请求成功,牛逼啊", crossTalk);
      this.size = this.size + 21;

      // 加载状态结束
      this.loading = false;
      if (this.size >= 1000) {
        this.finished = true;
      }
    },
    onLoad() {
      // 异步更新数据
      this.getInfo();
    },
  },

  filters: {
    handlePlayCount: function (value) {
      if (value < 10000) {
        return value;
      } else if (value >= 10000 && value < 100000000) {
        return parseInt(value / 10000) + "万";
      } else if (value >= 100000000) {
        return parseInt(value / 100000000) + "亿";
      }
    },
  },

  props: ["urlKey"],
  // urlKey为父组件传来的值，表示跳转的接口地址
};
</script>
<style lang="scss" scoped>
/deep/.van-list__finished-text {
  left: 0;
  right: 0;
  margin: auto;
  color: rgb(200, 200, 200);
  margin-top: 20px;
}
/deep/ .van-loading__text {
  color: rgb(200, 200, 200);
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}
.container {
  width: 375px;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 100px;
}
.box {
  width: 110px;
  height: 164px;
  margin-left: 11.25px;
  margin-top: 20px;
  border-radius:10px ;
  background-color: #fff;

  position: relative;
  img {
    width: 110px;
    height: 110px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .title {
    margin-top: 10px;
    width: 110px;
    padding: 0 3px;
    font-size: 14px;
    color: rgb(49, 49, 49);
    font-family: PingFangSC-Ultralight, sans-serif;
  }
  .played {
    width: 70px;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    background-color: rgba(197, 197, 197, 0.87);
    text-align: center;
    border-radius: 25px;
    position: absolute;
    left: 0;
    top: 97px;
    color: white;
  }
}
</style>