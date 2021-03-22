<template>
  <div class="root">
    <loading v-if="pageload"></loading>
    <div class="container" v-else>
      <title-com :title="data.category.name"></title-com>
      <!-- 顶部标签 -->
      <div class="label">
        <ul class="filter">
          <li class="select" @click="filter('')">全部</li>
          <li @click="filter('N')">连载</li>
          <li @click="filter('Y')">完结</li>
        </ul>
        <ul class="sort">
          <li class="select" @click="sort(1)">热门</li>
          <li @click="sort(3)">更新</li>
          <li @click="sort(4)">评分</li>
          <li @click="sort(2)">最新</li>
        </ul>
      </div>
      <!-- 内容 -->
      <loading v-if="load"></loading>
      <div class="content" v-else>
        <van-list
          v-model="ld"
          :finished="finished"
          finished-text="我是有底线的"
          @load="onLoad"
        >
          <book-box-b
            v-for="(book,index) in books"
            :key="index"
            :book="book"
          ></book-box-b>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import titleCom from "../../components/titleCom";
import bookBoxB from "../../components/bookBoxB";
import { sortUrl } from "../../utils/api";
import axiosGetHttp from "../../utils/axiosGetHttp";
import loading from "../../components/loading";
export default {
  components: {
    titleCom,
    bookBoxB,
    loading,
  },
  data() {
    return {
      load: true,
      pageload: true,
      data: {},
      books: [],
      order: 1,
      filterInfo: "",
      page: 1,
      finished: false,
      ld: false,
    };
  },
  created() {
    this.getData({
      order: 1,
    });
  },
  beforeUpdate() {
    $(function () {
      $(".label .filter li").click(function () {
        $(this).addClass("select").siblings().removeClass("select");
        console.log(666);
      });
      $(".label .sort li").click(function () {
        $(this).addClass("select").siblings().removeClass("select");
      });
    });
  },
  methods: {
    async getData({ order = 1, filterInfo = "" }) {
      // console.log(this.$route.query.url)
      let { resourcesId, categoryId } = this.$route.query;
      //   console.log(resourcesId, categoryId);
      let res = await axiosGetHttp("get", sortUrl, {
        resourcesId,
        categoryId,
        order,
        filterInfo,
        page: this.page,
        pageSize: 10,
      });
      console.log(
        "当前是order:" + res.tplData.order,
        "filter:" + res.tplData.filterInfo.val,
        "page:" + res.tplData.pageInfo.page,
        "pageSize:" + res.tplData.pageInfo.pageSize
      );
      if (res.tplData && this.page <= res.tplData.pageInfo.totalPage) {
        this.data = res.tplData;
        this.books = [...this.books, ...res.tplData.books];
        this.load = false;
        this.pageload = false;
        this.ld = false;
      } else {
        this.finished = true;
      }
    },
    filter(keyWord) {
      this.load = true;
      if (keyWord) {
        this.filterInfo = keyWord;
        this.getData({
          order: this.order,
          filterInfo: { 2: `${this.filterInfo}` },
        });
      } else {
        this.getData({
          order: this.order,
        });
      }
      //   console.log(this.filterInfo)
    },
    sort(keyId) {
      this.load = true;
      this.order = keyId;
      if (this.filterInfo) {
        this.getData({
          order: this.order,
          filterInfo: { 2: `${this.filterInfo}` },
        });
      } else {
        this.getData({
          order: this.order,
        });
      }
    },
    onLoad() {
      this.page++;
      setTimeout(() => {
        if (this.filterInfo) {
          this.getData({
            order: this.order,
            filterInfo: { 2: `${this.filterInfo}` },
          });
        } else {
          this.getData({
            order: this.order,
          });
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  .label {
    margin-top: 45px;
    padding-bottom: 1px;
    padding-top: 0.1px;
    box-shadow: 0 12px 30px -5px #e6e6e675;
    font-weight: 600;
    ul {
      margin: 10px;
      display: block;
      /deep/li {
        float: left;
        font-size: 15px;
        color: gray;
        border-radius: 4px;
        padding: 5px 12px;
      }
      .select {
        background-color: #ffeaeee0;
        color: #f0625dd3;
      }
    }
    ul:after {
      content: "";
      display: table;
      clear: both;
    }
  }
  .content {
    padding-top: 15px;
  }
}
</style>