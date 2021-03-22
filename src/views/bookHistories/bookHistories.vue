<template>
  <div>
    <van-nav-bar title="浏览记录" left-arrow @click-left="onClickLeft" />
    <div>
      <van-cell class="dele" title="一键清空" icon="delete" @click="del" />
    </div>
    <!-- <div v-for="(item, idx) in books" :key="idx"></div> -->
    <van-cell v-for="item in books" :key="item.id" @click="toDetail(item.id)">
      {{ item.bookName }}
      <p>{{ item.time | dateFormat }}</p>
    </van-cell>
  </div>
</template>
<script>
import { bookDetail, history } from "../../utils/api.js";
import axiosGetHttp from "../../utils/axiosGetHttp";
export default {
  data() {
    return {
      list: [666],
      loading: false,
      finished: false,
      bookList: [],
      books: [],
    };
  },
  async created() {
    let { user, password } = this.$store.state.userInfo;
    let res = await axiosGetHttp("get", history, { name: user, password });
    if (res != []) {
      res.forEach((item) => {
        if (this.isJSON(item.history)) {
          let history = JSON.parse(item.history);
          this.bookList.push(history);
        }
      });
      for (var i = 0, len = this.bookList.length; i < len; i++) {
        var flag = 1;
        for (var j = 0, len2 = this.books.length; j < len2; j++) {
          if (this.books[j].id === this.bookList[i].id) {
            flag = 0;
            break;
          }
        }
        flag === 1 ? this.books.push(this.bookList[i]) : false;
      }
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/bookDetail/${id}`);
    },
    onClickLeft() {
      this.$router.push("/mine");
    },
    del() {
      this.books = [];
      // /book/delhistory
      // axiosGetHttp("get","/book/delhistory",this.$store.state.userInfo)
      let { user, password } = this.$store.state.userInfo;
      axiosGetHttp("get", "/book/delhistory", { name: user, password });
    },
    isJSON(str) {
      if (typeof str == "string") {
        try {
          var obj = JSON.parse(str);
          if (typeof obj == "object" && obj) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.log("error：" + str + "!!!" + e);
          return false;
        }
      }
      console.log("It is not a string!");
    },
  },
};
</script>
<style lang="scss" scoped>
.dele {
  padding-left: 73%;
  padding-right: 0%;
  opacity: 0.7;
  font-size: 16px;
  /deep/.van-cell__left-icon {
    font-size: 20px;
  }
}
[class*="van-hairline"]::after {
  border: none;
}
/deep/.van-nav-bar__left {
  .van-icon {
    color: black;
  }
}
</style>
