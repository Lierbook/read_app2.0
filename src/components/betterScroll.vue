<template>
  <div class="person-wrap" ref="personWrap">
    <ul class="person-list" ref="personTab">
      <li class="person-item" v-for="item in sectionCategory" :key="item.id">
        <div class="title">
          <div class="shadow">TOP</div>
          <div class="left">{{item.name}}</div>
          <div class="right" @click="toSeeMoreB(item.id)">查看更多 ></div>
        </div>
        <div class="content">
          <div class="box" v-for="(book,index) in item.books" :key="book.bookId" @click="toBookDetail(book.bookId)">
            <img :src="book.picUrl" alt />
            <div class="label">{{book.bookName}}</div>
            <div class="icon">{{index+1}}</div>
          </div>
        </div>
      </li>
      <!-- <li class="person-item">
        <div class="title">
          <div class="shadow">TOP</div>
          <div class="left">都市人气榜</div>
          <router-link class="right" to="/searchPage" tag="div">查看更多 ></router-link>
        </div>
        <div class="content">
          <div class="box">
            <img
              src="https://bookbk.img.zhangyue01.com/idc_1/m_1,w_300,h_400/fef83aa7/group61/M00/AB/CE/CmQUOF8jloSEbgG4AAAAANRi6rY324101978.jpg?v=3QOuM0oD&t=CmQUOF8jloU."
              alt
            />
            <div class="label">我叫label至尊神魔</div>
            <div class="icon">1</div>
          </div>
        </div>
      </li>-->
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      bScroll: null,
      iconList: [],
    };
  },
  components: {},
  props: ["sectionCategory"],
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
      let width = 16;
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
    toSeeMoreB(id){
      this.$emit('func',id)
    },
    toBookDetail(id){
      console.log(id);
      this.$router.push(`/bookDetail/${id}`);
    }
  },
  //滑动模块
};
</script>


<style lang="scss" scoped>
.person-wrap {
  .person-list {
    .person-item:nth-child(2) .title {
      background: linear-gradient(
        to right,
        #6fa1ff,
        #6dd5fa,
        #aae4ff
      ) !important;
    }
    .person-item {
      margin: 20px 0 20px 15px;
      display: inline-block;
      width: 270px;
      background-color: #fff;
      border-radius: 5px;
      .title {
        color: #ffffffde;
        border-radius: 5px 5px 0 0;
        font-weight: 600;
        height: 70px;
        position: relative;
        background: linear-gradient(to right, #ff5852, #ffaeae);
        .left {
          position: absolute;
          left: 10px;
          top: 17px;
          font-size: 18px;
        }
        .right {
          position: absolute;
          right: 5px;
          bottom: 15px;
          font-size: 12px;
        }
        .shadow {
          position: absolute;
          font-size: 35px;
          color: rgba(0, 0, 0, 0.116);
        }
      }

      .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding-bottom: 10px;
        :nth-child(1) .icon {
          background-color: #ff5852 !important;
        }
        :nth-child(2) .icon {
          background-color: #ff4800c0 !important;
        }
        :nth-child(3) .icon {
          background-color: #ff9100c0 !important;
        }
        .box {
          width: 122px;
          height: 70px;
          margin-top: 10px;
          position: relative;
          img {
            width: 50px;
            height: 100%;
            float: left;
            margin-right: 4px;
          }
          .label {
            height: 50px;
            font-size: 12px;
            font-weight: 600;
            color: #353535;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3; // 控制多行的行数
            -webkit-box-orient: vertical;
          }
          .icon {
            font-size: 10px;
            color: #fff;
            width: 18px;
            height: 13px;
            line-height: 13px;
            text-align: center;
            background-color: #8f8f8fc0;
            position: absolute;
            left: 54px;
            bottom: 2px;
          }
        }
      }
    }
  }
}
/deep/.bscroll-horizontal-scrollbar {
  bottom: auto !important;
  height: 3px !important;
}
</style>