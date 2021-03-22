<template>
  <div class="person-wrap" ref="personWrap">
    <ul class="person-list" ref="personTab">
      <li class="person-item" v-for="book in books" :key="book.bookId">
        <bookBoxMini :book="book"></bookBoxMini>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import bookBoxMini from "./bookBoxMini"
export default {
  data() {
    return {
      bScroll: null,
      iconList: [],
    };
  },
  props:["books"],
  components: {
      bookBoxMini
  },
  created() {
    this.$nextTick(() => {
      this.personScroll();
    });
  },
  mounted() {
    let scroll = new BScroll(this.$refs.personWrap, {
      probeType: 3,
    });
  },
  methods: {
    personScroll() {
      // 默认有六个li子元素，每个子元素的宽度为80px
      let width = 34;
      this.$refs.personTab.style.width = width + "rem";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            bounce: false,
            eventPassthrough: "vertical",
            scrollbar: {
              fade: true,
              // interactive: false // 1.8.0 新增
            },
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
  },
  //滑动模块
};
</script>


<style lang="scss" scoped>
.person-wrap {
  background-color: #fff;
  padding-bottom: 30px;
  .person-list {
    .person-item {
        margin-left: 15px;
        display: inline-block;
        background-color: #fff;
    }
    
  }
}
/deep/.bscroll-horizontal-scrollbar {
  bottom: auto !important;
  height: 3px !important;
}
</style>