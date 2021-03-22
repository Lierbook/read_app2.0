<template>
  <div class="box" @click="toBookDetail(book.bookId)">
    <img :src="book.picUrl" alt />
    <div>{{book.bookName}}</div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 110px;
  img {
    width: 100%;
    box-shadow: 0 2px 15px -5px #707070;
  }
  div {
    width: 110px;
    font-size: 15px;
    color: #585858;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

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