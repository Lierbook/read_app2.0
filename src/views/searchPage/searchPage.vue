<template>
  <div class="root">
    <title-com :title="'搜索'"></title-com>
    <div class="main">
      <van-search
        v-model.trim="value"
        :clearable="false"
        show-action
        placeholder="请输入搜索内容"
        @search="onSearch(value)"
      >
        <template #action>
          <div @click="onSearch(value)">搜索</div>
        </template>
        <template #right-icon>
          <van-icon name="clear" @click="onClear" />
        </template>
      </van-search>

      <!-- 历史搜索 -->
      <div class="history" v-if="historyShow">
        <div class="title">
          历史搜索
          <svg
            @click="clearHistory"
            t="1600776116729"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5513"
            width="32"
            height="32"
          >
            <path
              d="M912.3 191.5H749.6v-30c0-53.3-43.6-97-97-97H371.3c-53.3 0-97 43.6-97 97v30H111.7c-21.7 0-39.4 17.7-39.4 39.4s17.7 39.4 39.4 39.4h45.7v592.2c0 53.3 43.6 97 97 97h530.7c53.3 0 97-43.6 97-97V270.4h30.3c21.7 0 39.4-17.7 39.4-39.4s-17.8-39.5-39.5-39.5z m-566.8-9.2c0-26.8 22-48.8 48.8-48.8H636c26.8 0 48.8 22 48.8 48.8v9.2H345.5v-9.2zM811 841.7c0 26.8-22 48.8-48.8 48.8H271c-26.8 0-48.8-22-48.8-48.8V270.4H811v571.3z"
              fill="#6A6A6A"
              p-id="5514"
            />
            <path
              d="M335.8 767.9c21.7 0 39.4-17.7 39.4-39.4V428.3c0-21.7-17.7-39.4-39.4-39.4s-39.4 17.7-39.4 39.4v300.1c0 21.7 17.7 39.5 39.4 39.5zM512 767.9c21.7 0 39.4-17.7 39.4-39.4V428.3c0-21.7-17.7-39.4-39.4-39.4s-39.4 17.7-39.4 39.4v300.1c0 21.7 17.7 39.5 39.4 39.5zM688.2 767.9c21.7 0 39.4-17.7 39.4-39.4V428.3c0-21.7-17.7-39.4-39.4-39.4s-39.4 17.7-39.4 39.4v300.1c0 21.7 17.7 39.5 39.4 39.5z"
              fill="#6A6A6A"
              p-id="5515"
            />
          </svg>
        </div>
        <div class="box">
          <span
            v-for="(item, index) in history"
            :key="index"
            @click="onSearch(item)"
            >{{ item }}</span
          >
        </div>
      </div>

      <div class="content" ref="content">
        <div class="title">{{ data.title }}</div>
        <ul>
          <li v-for="(book, index) in data.books" :key="book.bookId" @click="toBookDetail(book.bookId)">
            <van-tag>{{ index + 1 }}</van-tag>
            <span>{{ book.bookName }}</span>
          </li>
        </ul>
      </div>

      <!-- 搜索出来的内容 -->
      <div class="search-content" ref="searchContent">
        <!-- 触底刷新与下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
            <template #default>
              <book-box-b
                v-for="book in searchData"
                :book="book"
                :key="book.bookId"
              ></book-box-b>
            </template>
          </van-list>
        </van-pull-refresh>
      </div>

      <!-- 没有找到 -->
      <img src="../../images/没有找到.png" alt class="nothing" ref="nothing" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main{
  margin-top: 45px !important;
}
.van-icon-clear {
  color: #cacaca;
}
.van-search__action {
  font-size: 16px;
  color: #707070;
}
.van-list {
  padding-top: 10px;
}
.search-content {
  display: none;
}
.nothing {
  position: absolute;
  left: 50%;
  top: 160px;
  transform: translateX(-50%);
  display: none;
}
.history {
  margin-left: 15px;
  margin-top: 20px;
  .title {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: #999999;
    margin-bottom: 10px;
    svg {
      width: 16px;
      height: 16px;
      vertical-align: text-bottom;
      float: right;
      margin-right: 20px;
    }
  }
  .box {
    padding-bottom: 20px;
    span {
      display: inline-block;
      margin: 10px 10px 0 10px;
      font-size: 14px;
      font-weight: 600;
      color: #8d8d8d;
    }
  }
}
.content {
  margin-left: 15px;
  margin-top: 20px;
  .title {
    font-size: 12px;
    color: #999999;
    margin-bottom: 10px;
  }
  ul {
    margin-left: 10px;
    li {
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      color: #777777;
      .van-tag {
        vertical-align: text-bottom;
        margin-right: 5px;
      }
    }
    li:nth-child(1) .van-tag {
      background-color: #ff5852;
    }
    li:nth-child(2) .van-tag {
      background-color: #ff4800c0;
    }
    li:nth-child(3) .van-tag {
      background-color: #ff9100c0;
    }
  }
}
</style>

<script>
import titleCom from "../../components/titleCom";
import bookBoxB from "../../components/bookBoxB";
import { searchPageUrl, searchUrl } from "../../utils/api";
import axiosGetHttp from "../../utils/axiosGetHttp";

export default {
  data() {
    return {
      value: "",
      valueCopy: "",
      page: 1,
      data: "",
      searchData: [],
      loading: false,
      finished: false,
      refreshing: false,
      history: [],
      historyShow: false,
    };
  },
  components: {
    titleCom,
    bookBoxB,
  },
  methods: {
    async onSearch(keywords) {
      if (keywords) {
        this.page = 1;
        this.finished = false;
        this.loading = false;
        this.$refs.content.style.display = "none";
        this.historyShow = false;
        this.value = keywords;
        this.valueCopy = keywords;
        if (this.history.indexOf(keywords) === -1) {
          let Arr = Array.from(new Set(this.history));
          this.history = [keywords, ...Arr];
        }
        localStorage.setItem("historys", JSON.stringify(this.history));
        // 发送请求
        let res = await axiosGetHttp("get", searchUrl, {
          keyword: keywords,
          pageSize: 10,
        });
        if (res.msg == "ok" && res.body.pageInfo.totalPage != 0) {
          this.searchData = res.body.books;
          this.$refs.searchContent.style.display = "block";
          this.$refs.nothing.style.display = "none";
          this.refreshing = false;
          console.log("重新请求数据，我是第", this.page, "页");
        } else {
          this.$refs.nothing.style.display = "block";
          this.$refs.searchContent.style.display = "none";
        }
      } else {
        this.$notify("请输入搜索内容");
      }
    },
    onClear() {
      console.log("清除");
      this.$refs.searchContent.style.display = "none";
      this.$refs.nothing.style.display = "none";
      this.$refs.content.style.display = "block";
      this.value = "";
      this.historyShow = true;
    },
    clearHistory() {
      this.history = [];
      localStorage.removeItem("historys");
      this.historyShow = false;
    },
    async onLoad() {
      this.page++;
      let res = await axiosGetHttp("get", searchUrl, {
        keyword: this.value,
        page: this.page,
        pageSize: 10,
      });
      if (this.page <= res.body.pageInfo.totalPage && res.msg == "ok") {
        console.log("请求第", this.page, "页");
        setTimeout(() => {
          let searchData = this.searchData.concat(res.body.books);
          this.searchData = searchData;
          this.loading = false;
        }, 1000);
      } else {
        this.finished = true;
      }
    },
    onRefresh() {
      if (this.value) {
        this.onSearch(this.value);
      } else {
        this.onSearch(this.valueCopy);
      }
    },
    toBookDetail(id){
      console.log(id);
      this.$router.push(`/bookDetail/${id}`);
    }
  },
  async created() {
    let res = await axiosGetHttp("get", searchPageUrl);
    if (res.msg == "ok") {
      this.data = res.body;
    }
  },
  mounted() {
    let history = localStorage.getItem("historys");
    if (history) {
      this.history = JSON.parse(history);
      this.historyShow = true;
      // console.log(history);
    }
  },
};
</script>