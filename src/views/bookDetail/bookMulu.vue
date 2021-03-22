<template>
  <div>
    <van-nav-bar title="目录" fixed left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="wap-home" size="18" @click="toIndex" />
      </template>
    </van-nav-bar>
    <div class="top">
      <van-cell>
        <img class="iconSort" :src="isSort?daoxu:zhenxu" />
        <span class="sum">共{{bookInfo.chapterCount}}章</span>
        <span class="sort" v-text="isSort?'正序':'倒序'" @click="change"></span>
      </van-cell>
    </div>
    <div class="content">
      <van-list>
        <van-cell id="empty"></van-cell>
        <van-cell v-for="item in chapterList[0]" :key="item.id" @click="toContent(item.id)">
          <span>{{item.name}}</span>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { bookMulu } from "../../utils/api";
import axiosGetHttp from "../../utils/axiosGetHttp";
export default {
  data() {
    return {
      id: this.$route.params.id,
      bookInfo: "",
      chapterList: [],
      isSort: true,
      zhenxu:require("../../images/正序.png"),
      daoxu:require("../../images/倒序.png")
    };
  },
  created() {
    this.getBookMulu();
  },

  methods: {
    onClickLeft() {
      // this.$router.push(`/bookDetail/${this.id}`);
      this.$router.go(-1)
    },
    async getBookMulu() {
      let res = await axiosGetHttp("get", bookMulu + this.id);
      if (res.msg == "ok") {
        let book = res.body;
        this.bookInfo = book.bookInfo;
        this.chapterList = [...this.chapterList, book.chapterList];
        console.log(this.chapterList);
        console.log(this.bookInfo);
      }
    },
    change() {
      this.isSort = !this.isSort;
      this.chapterList[0] = this.chapterList[0].reverse();
      console.log(this.chapterList);
    },
    toContent(id){
      this.$router.push(`/bookContent/${this.id}/${id}`);
    },
    toIndex() {
      this.$router.push(`/`);
    },
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar {
  background-color: white;
  .van-nav-bar__left {
    .van-icon {
      color: black;
    }
  }
  .van-nav-bar__right {
    left: 35px;
    .van-icon {
      color: black;
    }
  }
  .van-nav-bar__title {
    font-weight: 700;
    color: black;
  }
}

#empty {
  height: 54px;
}

/deep/.top {
  margin-top: 46px;

  .van-cell {
    z-index: 99;
    position: fixed;
    border-bottom: 1px solid #f2f2f2;
    .iconSort {
      z-index: 99;
      position: absolute;
      left: 87%;
      top: 22%;
      height: 16px;
      width: 16px;
    }
    .van-cell__value {
      padding: 5px 0 5px 0;
      position: relative;
      .sum {
        font-size: 16px;
        color: #999;
      }
      .sort {
        position: absolute;
        right: 0%;
        font-size: 12px;
        color: #999;
      }
    }
  }
}

/deep/.content {
  .van-list {
    .van-cell {
      .van-cell__value {
        padding: 5px 0 5px 0;
        color: #333;
        font-size: 16px;
      }
    }
  }
}
.van-cell::after {
}
</style>