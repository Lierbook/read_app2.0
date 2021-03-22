<template>
  <div class="box" @click="toBookDetail(book.bookId)">
    <img :src="book.picUrl" alt />
    <div class="right">
      <div class="title">{{book.bookName}}</div>
      <div :class="['icon', book.completeState=='连载'?'lianzai':'wanjie']">{{book.completeState}}</div>
      <div class="author">{{book.author}}</div>
      <div class="summary">{{book.desc}}</div>
      <div class="tag" v-if="book.category">{{book.category}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["book"],
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
  height: 150px;
  margin: 0 auto 20px;
  img {
    width: 110px;
    height: 150px;
    float: left;
    box-shadow: 0 2px 15px -5px #707070;
  }
  .right {
    width: 230px;
    height: 150px;
    float: right;
    position: relative;
    .title {
      display: inline-block;
      width: 180px;
      color: #5f5f5f;
      font-size: 16px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .lianzai {
      border: 1px solid #ff6969;
      color: #ff6969;
    }
    .wanjie {
      border: 1px solid #69c3ff;
      color: #69c3ff;
    }
    .icon {
      font-size: 12px;
      width: 40px;
      height: 18px;
      line-height: 16px;
      text-align: center;
      border-radius: 3px;
      opacity: 0.7;
      display: inline-block;
      position: absolute;
      top: 2px;
    }
    .author {
      color: #6b6b6b;
      font-size: 13px;
      margin: 10px 0 15px 0;
    }
    .summary {
      height: 32px;
      color: #969696;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 控制多行的行数
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
      margin-top: 25px;
      padding: 0 5px;
    }
  }
}
</style>