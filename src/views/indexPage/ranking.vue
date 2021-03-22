<template>
  <div>
    <van-nav-bar title="排行榜" fixed />
    <van-tabs v-model="activeName">
      <van-tab title="男生" name="a">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list finished-text="我是有底线的..." v-model="loading" :finished="finished" @load="onLoad">
            <van-card
              v-for="item in manBooks"
              :key="item.id"
              :thumb="item.picUrl"
              @click="toDetail(item.bookId)"
            >
              <template #title>
                <span class="title">{{item.bookName}}</span>
              </template>
              <template #desc>
                <p class="content">{{item.desc}}</p>
                <span class="rate">{{item.orderNumber}}</span>
                <span class="type">{{item.tag}}</span>
                <span class="author">{{item.author}}</span>
              </template>
            </van-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="女生" name="b">
        <van-pull-refresh v-model="refreshing1" @refresh="onRefresh1">
          <van-list finished-text="我是有底线的..." v-model="loading1" :finished="finished1" @load="onLoad1">
            <van-card
              v-for="item in womanBooks"
              :key="item.id"
              :thumb="item.picUrl"
              @click="toDetail(item.bookId)"
            >
              <template #title>
                <span class="title">{{item.bookName}}</span>
              </template>
              <template #desc>
                <p class="content">{{item.desc}}</p>
                <span class="rate">{{item.orderNumber}}</span>
                <span class="type">{{item.tag}}</span>
                <span class="author">{{item.author}}</span>
              </template>
            </van-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
/deep/.van-nav-bar {
  .van-nav-bar__title {
    font-weight: 700;
  }
}
/deep/.van-tab--active {
  color: orangered;
}
/deep/.van-tabs {
  margin-top: 50px;
  margin-bottom: 100px;
  .van-tabs__wrap {
    .van-tabs__nav {
      z-index: 99;
      height: 40px;
      width: 100%;
      position: fixed;
      top: 46px;
      .van-tabs__line {
        background-color: orangered;
      }
    }
  }
}
/deep/.van-tab__pane {
  .van-card {
    background-color: white;

    .van-card__header {
      .van-card__content {
        position: relative;
        .title {
          margin-top: 5px;
          font-size: 16px;
          font-weight: 400;
          position: absolute;
          top: 3%;
        }
        .content {
          display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
          -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
          overflow: hidden; /*超出的文本隐藏*/
          text-overflow: ellipsis; /* 溢出用省略号*/
          -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
          margin-top: 5px;
          font-size: 12px;
          position: absolute;
          top: 35%;
        }
        .rate {
          font-size: 16px;
          position: absolute;
          right: 3%;
        }
        .author {
          position: absolute;
          bottom: 0%;
          font-size: 13px;
          color: #bbb;
        }
        .type {
          position: absolute;
          right: 3%;
          bottom: 0%;
          color: #999;
          border: 1px solid #aaa;
          padding: 0.5px 5.5px 0.5px 5.5px;
        }
      }
      .van-card__thumb {
        width: 88px;
        height: 110px;
        padding-top: 10px;
        padding-right: 10px;
        .van-image {
          .van-image__img {
            border-radius: 0px;
          }
        }
      }
    }
  }
}
/deep/.van-card:nth-of-type(1),
.van-card:nth-of-type(2),
.van-card:nth-of-type(3) {
  .rate {
    color: red;
  }
}
</style>
<script>
import { topMan, topWoman } from "../../utils/api.js";
import axiosGetHttp from "../../utils/axiosGetHttp";
export default {
  data() {
    return {
      activeName: "a",
      pageMan: 0,
      pageWoman: 0,
      manBooks: [],
      womanBooks: [],
      loading: false,
      finished: false,
      refreshing: false,
      loading1: false,
      finished1: false,
      refreshing1: false
    };
  },
  created() {
    // this.getTopMan();
    // this.getTopWoman();
  },
  methods: {
    async getTopMan() {
      let res = await axiosGetHttp("get", topMan + "&page=" + this.pageMan);
      if (res.msg == "ok") {
        let manBooks = res.body.books;
        this.manBooks = [...this.manBooks, ...manBooks];
        console.log(this.manBooks);
      }
    },
    async getTopWoman() {
      let res = await axiosGetHttp("get", topWoman + "&page=" + this.pageWoman);
      if (res.msg == "ok") {
        let womanBooks = res.body.books;
        this.womanBooks = [...this.womanBooks, ...womanBooks];
        console.log(this.womanBooks);
      }
    },
    toDetail(id) {
      console.log("666");
      this.$router.push(`/bookDetail/${id}`);
    },
    onLoad() {
      setTimeout(() => {
        this.pageMan++;
        // console.log(this.pageMan)
        this.getTopMan();
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.manBooks.length >= 50) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    onLoad1() {
      setTimeout(() => {
        this.pageWoman++;
        console.log(this.pageWoman)
        this.getTopWoman();
        // 加载状态结束
        this.loading1 = false;

        // 数据全部加载完成
        if (this.womanBooks.length >= 50) {
          this.finished1 = true;
        }
      }, 500);
    },
    onRefresh1() {
      // 清空列表数据
      this.finished1 = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading1 = true;
      this.onLoad1();
    }
  }
};
</script>
