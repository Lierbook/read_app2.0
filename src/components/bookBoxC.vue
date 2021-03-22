<template>
  <div class="box" @click="toBookDetail(book.bookId)">
    <img :src="book.picUrl" alt />
    <div class="right">
      <div class="title">{{book.bookName}}</div>
      <div class="num">{{book.orderNumber}}</div>
      <div class="summary">【{{book.completeState | lianzai}}】{{book.desc}}</div>
      <div class="author">{{book.author}}</div>
      <div class="tag" v-if="book.category">{{book.category}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["book"],
  filters:{
    lianzai(msg){
      return msg=="N" ? "连载" : "完结"
    }
  },
  methods:{
    toBookDetail(id){
      console.log(id);
      this.$router.push(`/bookDetail/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 352px;
  height: 120px;
  margin: 0 auto 20px;
  img {
    width: 90px;
    height: 120px;
    float: left;
    box-shadow: 0 2px 15px -5px #707070;
  }
  .right {
    width: 250px;
    height: 120px;
    float: right;
    position: relative;
    .num{
        position: absolute;
        right: 0;
        top: 2px;
        font-size: 18px;
        color: #5f5f5f;
    }
    .title {
      display: inline-block;
      width: 220px;
      color: #5f5f5f;
      font-weight: 600;
      font-size: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .author {
      color: #acacacf1;
      font-weight: 600;
      font-size: 14px;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .summary {
      height: 59px;
      color: #666666;
      font-size: 15px;
      overflow: hidden;
      margin-top: 5px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; // 控制多行的行数
      -webkit-box-orient: vertical;
    }
    .tag {
      display: inline-block;
      border: 1px solid #969696;
      color: #969696;
      font-size: 12px;
      height: 18px;
      line-height: 16px;
      text-align: center;
      border-radius: 3px;
      opacity: 0.7;
      padding: 0 7px;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>