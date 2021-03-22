<template>
  <div id="root">
    <search></search>
    <!-- 轮播 -->
    <van-swipe :autoplay="3000" :duration="1500">
      <van-swipe-item v-for="item in data1.items" :key="item.id">
        <img v-lazy="item.picUrl" @click="toBookDetail(item.url)"/>
      </van-swipe-item>
    </van-swipe>

    <!-- 力荐榜 -->
    <div class="recommend">
      <van-cell :title="data2.name" center>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon center>
          <div id="more" @click="toSeeMore(data2.id)">
            查看更多
            <van-icon name="arrow" />
          </div>
        </template>
      </van-cell>

      <div class="lijian">
        <div v-for="(book, index) in data2.books" :key="book.bookId" @click="toBookDetail(book.bookId)">
          <img :src="book.picUrl" class="bookimg" alt />
          <div class="right">
            <div class="title">{{ book.bookName }}</div>
            <div class="mark">
              力荐值
              <div>{{ book.rankValue }}</div>
            </div>
          </div>
          <div class="icon">{{ index + 1 }}</div>
        </div>
      </div>
    </div>

    <!-- 今日热读 -->
    <div class="today-hot">
      <van-cell :title="data3.name" center>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon center>
          <div to="/searchPage" tag="div" id="more" @click="refresh(3)">
            <van-icon name="replay" />换一换
          </div>
        </template>
      </van-cell>
      <div class="content">
        <book-box-mini
          v-for="item in data3.books"
          :key="item.bookId"
          :book="item"
        ></book-box-mini>
      </div>
    </div>

    <!-- 玄幻、都市人气榜 -->
    <div class="popularity-list">
      <better-scroll
        :sectionCategory="data4.sectionCategory"
        @func="toSeeMoreB"
      ></better-scroll>
    </div>

    <!-- 火爆精品 -->
    <div class="hyper-hot">
      <van-cell :title="data5.name" center>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon center>
          <div to="/searchPage" tag="div" id="more" @click="refresh(5)">
            <van-icon name="replay" />换一换
          </div>
        </template>
      </van-cell>
      <div class="content">
        <book-box
          v-for="book in data5.books"
          :key="book.bookId"
          :book="book"
        ></book-box>
      </div>
    </div>

    <!-- 口碑佳作 -->
    <div class="masterpiece">
      <van-cell :title="data6.name" center></van-cell>
      <masterpiece :books="data6.books"></masterpiece>
    </div>

    <!-- 新书优选 -->
    <div class="new-book">
      <van-cell :title="data7.name" center>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon center>
          <div id="more" @click="toSeeMore(data7.id)">
            查看更多
            <van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
      <div class="content">
        <bookBox
          v-for="book in data7.books"
          :key="book.bookId"
          :book="book"
        ></bookBox>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#root {
  overflow: hidden;
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
#more {
  color: #a0a0a0;
  i {
    vertical-align: text-top;
  }
}
.lijian {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #fff;
  :nth-child(1) .icon {
    background-color: #ff5852;
  }
  :nth-child(2) .icon {
    background-color: #ff4800c0;
  }
  :nth-child(3) .icon {
    background-color: #ff9100c0;
  }
  > div {
    width: 165px;
    height: 65px;
    margin-bottom: 10px;
    position: relative;
    .bookimg {
      width: 50px;
      height: 100%;
      float: left;
    }
    .right {
      width: 105px;
      height: 100%;
      float: right;
      .title {
        font-size: 15px;
        color: #6e6e6e;
        font-weight: 600;
        margin: 2px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mark {
        font-size: 12px;
        margin: 5px 0;
        color: #949494b9;
        font-weight: 600;
        div {
          color: #ff7676e1;
        }
      }
    }
    .icon {
      width: 14px;
      height: 18px;
      line-height: 18px;
      background-color: #8f8f8fc0;
      color: #fff;
      font-size: 12px;
      text-align: center;
      position: absolute;
    }
  }
}
.today-hot {
  margin-top: 8px;
  background-color: #fff;
  padding-bottom: 20px;
  .content {
    display: flex;
    justify-content: space-evenly;
  }
}
.hyper-hot {
  background-color: #fff;
  .content {
    margin-bottom: 10px;
    padding-bottom: 20px;
  }
}

.new-book {
  background-color: #fff;
  .content {
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
}
</style>

<script>
import search from "./search";
import betterScroll from "./betterScroll";
import masterpiece from "./masterpiece";
import bookBoxMini from "./bookBoxMini";
import bookBox from "./bookBox";
export default {
  components: {
    search,
    betterScroll,
    masterpiece,
    bookBoxMini,
    bookBox,
  },
  data() {
    return {
      newData: [],
    };
  },
  props: [
    "data1",
    "data2",
    "data3",
    "data4",
    "data5",
    "data6",
    "data7",
    "sort",
  ],
  methods: {
    async refresh(key) {
      console.log("刷新");
      this.$emit("func", key);
    },
    toSeeMore(id) {
      console.log(id);
      this.$router.push({
        path: "/seemore",
        query: {
          id,
        },
      });
    },
    toSeeMoreB(id) {
      console.log(id);
      this.$router.push({
        path: "/seemore",
        query: {
          id,
        },
      });
    },
    toBookDetail(id){
      console.log(id);
      this.$router.push(`/bookDetail/${id}`);
    }
  },
};
</script>