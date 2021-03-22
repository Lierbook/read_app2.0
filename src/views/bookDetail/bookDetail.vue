<template>
  <div>
    <van-nav-bar title="书籍详情" fixed left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="wap-home" size="18" @click="toIndex" />
      </template>
    </van-nav-bar>
    <van-card :title="bookInfo.bookName" :thumb="bookInfo.picUrl">
      <template #desc>
        <span class="type">{{bookInfo.author}} | {{bookInfo.category}}</span>
        <span class="word">{{word1+word2}} &nbsp; {{popular1+popular2}}</span>
        <span class="rate" v-if="bookInfo.bookRating">{{bookInfo.bookRating}}分</span>
      </template>
    </van-card>

    <div class="main">
      <van-cell>
        <van-icon :name="arrow?'arrow-down':'arrow-up'" @click="showMore"></van-icon>
        <p :class="arrow?'three':''">{{bookInfo.desc}}</p>
        <span v-for="item in sliceInfo" :key="item">{{item}}</span>
      </van-cell>
    </div>

    <div class="mulu">
      <van-cell>
        <van-icon name="arrow" @click="toMulu(bookInfo.bookId)"></van-icon>
        <span class="mulu-1">目录</span>
        <span class="mulu-2">{{bookInfo.completeState}}</span>
        <span class="mulu-3">{{newestChapter.lastChapter}}</span>
      </van-cell>
    </div>

    <div class="pinlun">
      <van-cell>
        <span class="pinlun-1">热评</span>
        <div v-if="pinlun.length!=0">
          <div class="avitor" v-for="item in pinlun.slice(0,3)" :key="item.id">
            <img class="pinlun-2" :src="item.avatar" />
            <span class="pinlun-3">{{item.nick}}</span>
            <p class="pinlun-4">{{item.content}}</p>
          </div>
        </div>
        <div class="logo-pinlun" v-else>
          <img src="../../images/nopinlun.jpg" alt />
        </div>
      </van-cell>
    </div>

    <div class="another">
      <van-cell icon="replay">
        <div class="change">
          <span class="change-1">书友还读过</span>
          <span class="change-2" @click="change">换一换</span>
        </div>
        <div class="another-dv">
          <div
            class="more"
            v-for="item in newBooksRecommend"
            :key="item.bookId"
            @click="toBookDetail(item.bookId)"
          >
            <img :src="item.picUrl" />
            <p>{{item.bookName}}</p>
          </div>
        </div>
      </van-cell>
    </div>

    <van-goods-action>
      <van-goods-action-icon text="分享给好友">
        <template #icon>
          <img src="../../images/微信.png" style="height:18px;width:18px" />
        </template>
      </van-goods-action-icon>
      <van-goods-action-icon :text="inShelf?'已在书架':'加入书架'" @click.once="addShelf()">
        <template #icon>
          <img :src="inShelf?trueshelf:falseshelf" style="height:18px;width:18px" />
        </template>
      </van-goods-action-icon>
      <van-goods-action-button type="danger" text="立即阅读" @click="toContent" />
    </van-goods-action>
  </div>
</template>


<style lang="scss" scoped>
.three {
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 3; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
[class*="van-hairline"]::after {
  border: none;
}
/deep/.van-nav-bar {
  background-color: #a3a0a0;
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
    color: white;
  }
}

/deep/.van-card {
  margin-top: 46px !important;
  height: 180px;
  background-color: #a3a0a0;
  .van-card__header {
    position: relative;
    .van-card__thumb {
      width: 90px;
      height: 120px;
      position: absolute;
      top: 20px;
      right: 3%;
      img {
        border-radius: 0px;
      }
    }
    .van-card__content {
      margin-top: 20px;
      position: relative;
      .van-card__title {
        font-size: 16px;
        font-weight: 700;
        color: white;
      }
      .type {
        margin-top: 5px;
        font-size: 10px;
        position: absolute;
        top: 25%;
        color: white;
      }
      .word {
        margin-top: 10px;
        font-size: 10px;
        position: absolute;
        top: 45%;
        color: white;
      }
      .rate {
        margin-top: 15px;
        font-size: 10px;
        position: absolute;
        top: 65%;
        border: 1px solid white;
        padding: 2px 4px 2px 4px;
        color: white;
      }
    }
  }
}

.main {
  .van-cell {
    position: relative;
    margin-bottom: 5px;
    .van-icon {
      color: #9c9c9c;
      position: absolute;
      right: 2%;
      bottom: 5px;
      font-size: 16px;
    }
    margin-top: 10px;
    .van-cell__value {
      p {
        font-size: 12px;
        color: #999;
      }
      span {
        margin-right: 10px;
        font-size: 10px;
        color: #999;
        background-color: #f2f2f2;
        padding: 4px 12px 4px 12px;
        border-radius: 10px;
      }
    }
  }
}

.mulu {
  .van-cell {
    border-bottom: 5px solid #f2f2f2;
    position: relative;
    .van-icon {
      position: absolute;
      color: #9c9c9c;
      right: 0%;
      top: 15%;
      font-size: 16px;
      z-index: 999;
    }
    .mulu-1 {
      font-size: 18px;
      font-weight: 700;
    }
    .mulu-2 {
      position: absolute;
      left: 20%;
      font-size: 16px;
      color: orangered;
    }
    .mulu-3 {
      position: absolute;
      left: 37%;
      font-size: 14px;
      color: #666;
    }
    .mulu-4 {
      position: absolute;
      left: 37%;
      font-size: 14px;
      color: #666;
    }
  }
}

/deep/.pinlun {
  .van-cell {
    border-bottom: 5px solid #f2f2f2;
    .logo-pinlun {
      height: 290px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pinlun-1 {
      font-size: 18px;
      font-weight: 700;
      display: block;
    }
    .avitor {
      position: relative;
      .pinlun-2 {
        border-radius: 50%;
        height: 30px;
        width: 30px;
        margin: 20px 0 5px 0;
      }
      .pinlun-3 {
        position: absolute;
        top: 23px;
        color: #666;
        font-size: 16px;
        margin-left: 15px;
      }
      .pinlun-4 {
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 3; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden; /*超出的文本隐藏*/
        text-overflow: ellipsis; /* 溢出用省略号*/
        -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
      }
    }
  }
}

/deep/.another {
  margin-bottom: 55px;
  .van-cell {
    position: relative;
    .van-icon {
      position: absolute;
      right: 13%;
      font-size: 12px;
      color: #999;
    }
    .change {
      margin-bottom: 15px;
      position: relative;
      .change-1 {
        font-size: 18px;
        font-weight: 700;
      }
      .change-2 {
        position: absolute;
        right: 0%;
        font-size: 12px;
        color: #999;
      }
    }
    .another-dv {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .more {
        width: 30%;
        display: flex;
        flex-direction: column;
        img {
          width: 100%;
          height: 150px;
        }
        p {
          color: #666;
          font-size: 16px;
        }
      }
    }
  }
}

/deep/.van-goods-action {
  .van-goods-action-icon {
    min-width: 25%;
  }
  .van-button {
    border-radius: 0px;
    height: 100%;
    margin: 0;
  }
}
</style>

<script>
import { bookDetail, addShelf, addhistory } from "../../utils/api.js";
import axiosGetHttp from "../../utils/axiosGetHttp";
export default {
  data() {
    return {
      arrow: true,
      id: this.$route.params.id,
      bookInfo: [],
      pinlun: [],
      newestChapter: [],
      newBooksRecommend: [],
      word1: "",
      word2: "",
      popular1: "",
      popular2: "",
      inShelf: 0,
      trueshelf: require("../../images/已在书架.png"),
      falseshelf: require("../../images/加入书架.png"),
      sliceInfo:[]
    };
  },
  created() {
    // console.log(this.$route.params.id);
    this.getBookDetail();
  },
  mounted() {
    // console.log(this.$refs.nopinlun, 111);
    // let userInfo = this.$store.state.userInfo
    // console.log(userInfo,"详情页获取的vuex")
  },
  watch: {
    $route: function(to, from) {
      window.pageYOffset = 0;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  methods: {
    async getBookDetail() {
      let res = await axiosGetHttp(
        "get",
        bookDetail +
          this.id +
          "?bookId=12099859&usr=j30059520&ku=j30059520&kt=a254d6aea3f2266c94cb447f0b9a3142"
      );
      if (res.msg == "ok") {
        let book = res.body;
        let bookInfo = book.bookInfo;
        let commentList = book.commentList;
        let newBooksRecommend = book.newBooksRecommend;
        let newestChapter = book.newestChapter;
        let inShelf = book.inShelf;
        let sliceInfo=[];

        // this.bookInfo=[...this.bookInfo,...bookInfo];
        // this.pinlun=[...this.pinlun,...commentList];
        // this.newestChapter=[...this.newestChapter,...newestChapter];
        // this.newBooksRecommend=[...this.newBooksRecommend,...newBooksRecommend];
        (this.word1 = bookInfo.wordCount[0]),
          (this.word2 = bookInfo.wordCount[1]),
          (this.popular1 = bookInfo.popularity[0]),
          (this.popular2 = bookInfo.popularity[1]),
          (this.bookInfo = bookInfo);
        this.sliceInfo=this.bookInfo.tag.slice(0,4)
        this.pinlun = commentList;
        this.newestChapter = newestChapter;
        this.newBooksRecommend = newBooksRecommend;
        this.inShelf = inShelf;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    toMulu(id) {
      this.$router.push(`/bookMulu/${id}`);
    },
    showMore() {
      this.arrow = !this.arrow;
    },
    change() {
      this.getBookDetail();
    },
    async toContent() {
      this.$router.push(`/bookContent/${this.id}/1`);
      let time = new Date();
      let history = JSON.stringify({
        time,
        bookName:this.bookInfo.bookName,
        id:this.bookInfo.bookId
      })
      let {user,password} = this.$store.state.userInfo
      console.log({name:user,password,history},"详情页获取的vuex")
      let res = await axiosGetHttp("post",addhistory,{
        name:user,
        password,
        history
      })
    },
    async addShelf() {
      let res = await axiosGetHttp(
        "get",
        addShelf +
          "/add?bookId=" +
          this.id +
          "&chapterId=1&usr=j30059520&ku=j30059520&kt=a254d6aea3f2266c94cb447f0b9a3142"
      );

      if (this.inShelf) {
        this.$toast.success("书籍已在书架");
      } else {
        this.$toast.success("加入成功");
      }
      this.inShelf = true;
    },
    toBookDetail(id) {
      this.$router.push(`/bookDetail/${id}`);
      location.reload();
    },
    toIndex() {
      this.$router.push(`/`);
    },
  }
};
</script>

