<template>
  <div class="root">
    <loading v-if="pageLoad"></loading>
    <div class="container" v-else>
      <title-com :title="data.title"></title-com>
      <div class="content">
        <van-list
          v-model="ld"
          :finished="finished"
          finished-text="我是有底线的"
          @load="onLoad"
        >
          <book-box-c
            v-for="book in books"
            :key="book.bookId"
            :book="book"
          ></book-box-c>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import bookBoxC from "../../components/bookBoxC";
import titleCom from "../../components/titleCom";
import { rankUrl } from "../../utils/api";
import axiosGetHttp from "../../utils/axiosGetHttp";
import loading from "../../components/loading";
export default {
  components: {
    bookBoxC,
    titleCom,
    loading,
  },
  data() {
    return {
      id: 0,
      page: 1,
      totalPage: 1,
      data: {},
      books: [],
      pageLoad: true,
      finished: false,
      ld: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      // console.log(this.$route.query, 666);
      this.id = this.$route.query.id;
      //如果当前页数小于总页数，就发送请求
      if (this.page <= this.totalPage) {
        // 发送请求，得到res
        let res = await axiosGetHttp("get", rankUrl, {
          sectionId: this.id,
          page: this.page,
        });
        // 如果res的msg是ok，则说明请求成功，可以拿到数据
        if (res.msg == "ok") {
          this.totalPage = res.body.pageInfo.totalPage;
          this.data = res.body;
          this.books = [...this.books, ...res.body.books];
          this.pageLoad = false;
          this.ld = false;
        }
      } else {
        //如果当前页数大于总页数，令finished=true，停止触底刷新
        this.finished = true;
      }
    },
    onLoad() {
      this.page++;
      this.getData();
      console.log(this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding-top: 50px;
  .van-list {
    div:nth-child(1),div:nth-child(2),div:nth-child(3) {
      /deep/.num {
        color: #ff0000be;
      }
    }
  }
}
</style>