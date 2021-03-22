<template>
  <div>
    <div id="warning" v-if="$store.state.userInfo.user == undefined">
      请先登录
    </div>
    <div v-else>
      <van-nav-bar title="书架" />
      <div class="top">
        <van-cell>
          <span>共</span>
          <span class="number">{{ pageInfo.total }}</span>
          <span>本书</span>
          <span
            class="delete"
            @click="change"
            v-text="isSelected ? '删除' : '完成'"
          ></span>
        </van-cell>
      </div>
      <div class="bookcard">
        <van-card v-for="item in books" :key="item.id" :thumb="item.picUrl">
          <template #title>
            <span class="title" @click="toDetail(item.bookId)">{{
              item.bookName
            }}</span>
          </template>
          <template #desc>
            <van-icon
              class="fei"
              :name="isSelected ? 'arrow' : 'cross'"
              @click="del(item.bookId)"
            />
            <p class="content">已读至第{{ item.chapterId }}章</p>
            <span class="rate">{{ item.orderNumber }}</span>
            <span class="type">最新</span>
            <span class="author">{{ item.lastChapter }}</span>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#warning {
  margin-top: 50px;
  font-weight: 600;
  text-align: center;
  font-size: 26px;
  color: red;
}
/deep/.van-nav-bar {
  .van-nav-bar__title {
    font-weight: 700;
  }
}
.top {
  .van-cell {
    span {
      margin: 5px;
    }
    position: relative;
    .number {
      font-size: 16px;
      color: orangered;
    }
    .delete {
      position: absolute;
      right: 0px;
      color: rgb(165, 165, 165);
    }
  }
}

/deep/.bookcard {
  margin-bottom: 60px;
  background-color: rgb(235, 232, 232);
  padding-top: 10px;
  padding-bottom: 10px;
  height: 517px;
  overflow: scroll;

  .van-card {
    background-color: rgb(255, 255, 255);
    // box-shadow: 0 0 10px 2px rgb(202, 202, 202);
    width: 95%;
    margin: auto;
    margin-top: 20px;

    overflow: hidden;
    /deep/ .van-card__header {
      .van-icon-arrow {
        display: none;
      }
      .van-icon-cross::before {
        content: none !important;
      }
      .van-card__content {
        position: relative;
        .title {
          margin-top: 5px;
          font-size: 16px;
          font-weight: 400;
          position: absolute;
          top: 3%;
        }
        .fei {
          position: absolute;
          background-color: rgb(240, 240, 240);
          right: 0;
          top: 0;
          transform: translate(16px, -8px);
          box-shadow: 0 0 10px 1px rgb(202, 202, 202);
          width: 0;
          height: 0;
          border-bottom: 38px solid rgb(255, 255, 255);
          border-right: 38px solid #ebe8e8;
          .van-icon {
            display: none;
            contain: none !important;
            left: 0 !important;
            bottom: 0 !important;
          }
        }
        .content {
          display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
          -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
          overflow: hidden; /*超出的文本隐藏*/
          text-overflow: ellipsis; /* 溢出用省略号*/
          -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
          margin-top: 25px;
          font-size: 12px;
          position: absolute;
          top: 25%;
        }
        .rate {
          font-size: 16px;
          color: orangered;
          position: absolute;
          right: 3%;
        }
        .author {
          position: absolute;
          left: 20%;
          bottom: 0%;
          font-size: 13px;
          color: #bbb;
        }
        .type {
          position: absolute;
          left: 0%;
          bottom: 0%;
          color: orangered;
          border: 1px solid orangered;
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
            box-shadow: 0 0 10px 2px rgb(209, 209, 209);
          }
        }
      }
    }
  }
}
</style>
<script>
import { bookshelf, deletebook } from "../../utils/api";
import axiosGetHttp from "../../utils/axiosGetHttp";
export default {
  data() {
    return {
      books: [],
      pageInfo: "",
      isSelected: true,
    };
  },
  created() {
    this.getBookShelf();
  },
  methods: {
    async getBookShelf() {
      let res = await axiosGetHttp("get", bookshelf);
      if (res.msg == "ok") {
        let book = res.body;
        this.books = book.books;
        this.pageInfo = book.pageInfo;
        console.log(this.books, 555);
      }
    },
    change() {
      this.isSelected = !this.isSelected;
    },
    async delShelf(id) {
      let res = await axiosGetHttp(
        "get",
        deletebook +
          "/del?bookId=" +
          id +
          "&chapterId=1&usr=j30059520&ku=j30059520&kt=a254d6aea3f2266c94cb447f0b9a3142"
      );
      this.$toast.success("删除成功");
      this.getBookShelf();
      // this.isShelf = true;
    },
    del(id) {
      this.delShelf(id);
      // this.reload()
    },
    toDetail(id) {
      this.$router.push(`/bookDetail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  margin: 10px;
  text-align: center;
}
</style>