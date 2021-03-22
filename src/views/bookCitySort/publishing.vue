<template>
  <div id="root"> <!--  v-if="handlePublish(0) !== undefined" 加这句可以防止页面在未获取到数据的时候就渲染，此处因为有了loadding插件，所以不需要 -->
    <loading v-if="this.$store.state.load"></loading>
    <div class="container" v-if="handlePublish(0) !== undefined">
      <search></search>
      <!-- 轮播 -->
      <van-swipe :autoplay="3000" :duration="1500">
        <van-swipe-item v-for="item in handlePublish(0).items" :key="item.id">
          <img v-lazy="item.picUrl" />
        </van-swipe-item>
      </van-swipe>

      <!-- 出版小说 -->
      <div class="publish">
        <van-cell :title="handlePublish(1).name" center></van-cell>
        <div class="content">
          <book-box-mini v-for="item in handlePublish(1).books" :key="item.bookId" :book="item"></book-box-mini>
        </div>
      </div>

      <!-- 文学艺术 -->
      <div class="art">
        <van-cell :title="handlePublish(2).name" center></van-cell>
        <div class="content">
          <book-box v-for="book in handlePublish(2).books" :key="book.bookId" :book="book"></book-box>
        </div>
      </div>

      <!-- 经商管理 -->
      <div class="manage">
        <van-cell :title="handlePublish(3).name" center></van-cell>
        <div class="content">
          <book-box-mini v-for="item in handlePublish(3).books" :key="item.bookId" :book="item"></book-box-mini>
        </div>
      </div>

      <!-- 科学技术 -->
      <div class="science">
        <van-cell :title="handlePublish(4).name" center></van-cell>
        <div class="content">
          <book-box v-for="book in handlePublish(4).books" :key="book.bookId" :book="book"></book-box>
        </div>
      </div>

      <!-- 健康休闲 -->
      <div class="rest">
        <van-cell :title="handlePublish(5).name" center></van-cell>
        <div class="content">
          <book-box-mini v-for="item in handlePublish(5).books" :key="item.bookId" :book="item"></book-box-mini>
        </div>
      </div>

      <!-- 预产少儿 -->
      <div class="children">
        <van-cell :title="handlePublish(6).name" center></van-cell>
        <div class="content">
          <book-box v-for="book in handlePublish(6).books" :key="book.bookId" :book="book"></book-box>
        </div>
      </div>

      <!-- 成功励志 -->
      <div class="success">
        <van-cell :title="handlePublish(7).name" center></van-cell>
        <div class="content">
          <book-box-mini v-for="item in handlePublish(7).books" :key="item.bookId" :book="item"></book-box-mini>
        </div>
      </div>

      <!-- 历史传记 -->
      <div class="history">
        <van-cell :title="handlePublish(8).name" center></van-cell>
        <div class="content">
          <book-box v-for="book in handlePublish(8).books" :key="book.bookId" :book="book"></book-box>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: #f3f3f3;
  padding-bottom: 80px;
}
.van-swipe {
  height: 130px;
  img {
    width: 100%;
    height: 130px;
  }
  /deep/.van-swipe__indicator--active {
    background-color: #ffffff;
  }
}
.van-cell__title {
  span {
    font-weight: 900;
    font-size: 17px;
  }
  .van-cell__label {
    margin: 0;
  }
}

.publish,
.manage,
.rest,
.success {
  background-color: #ffffff;
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    > div {
      margin-bottom: 20px;
    }
  }
}

.art,
.science,
.children,
.history {
  background-color: #ffffff;
  padding-top: 10px;
  .content {
    margin-bottom: 10px;
    padding-bottom: 20px;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import search from "../../components/search";
import bookBoxMini from "../../components/bookBoxMini";
import bookBox from "../../components/bookBox";
import loading from "../../components/loading"

export default {
  components: {
    search,
    bookBoxMini,
    bookBox,
    loading
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters(["handlePublish"]),
  },
  created() {
    this.$store.dispatch("getPublishData");
  }
};
</script>