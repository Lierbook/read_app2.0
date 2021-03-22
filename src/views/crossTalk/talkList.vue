<template>
  <div class="bg" id="bg">
    <div class="topTitle">相声评书</div>
    <van-tabs v-model="active" swipeable animated>
      <van-tab title="全部"><all></all></van-tab>
      <van-tab title="热门相声"><hot></hot></van-tab>
      <van-tab title="单口相声"><solo></solo></van-tab>
      <van-tab title="名家评书"><story></story></van-tab>
    </van-tabs>
   
    
  </div>
</template>

<style lang="scss" scoped>
/deep/.van-nav-bar__title {
  color: rgb(0, 0, 0);
  font-weight: 500;
}
/deep/.container .van-list{
  height: 577px;
  overflow: scroll;
  
}
/deep/.van-list__loading{
  margin: auto;
}
.bg{
  background-color: whitesmoke;
  
}
/deep/.van-tabs__line{
  background-color: #f6987f!important;
}
.ball{
  width: 50px;
  height: 50px;
  border-radius: 50%;
 
  z-index: 200;
  background-color: black;
  position: absolute;
  right: 0;
  top: 200px;
}
.black{
  background-color: black;
}
</style>

<script>

import all from '../crossTalk/all'
import hot from '../crossTalk/hot'
import solo from '../crossTalk/solo'
import story from '../crossTalk/story'
export default {
  data() {
    return {
      active:0,
    };
  },
  components:{
      all,
      hot,
      solo,
      story
  },
  methods:{
    change(){
      $("#bg").toggleClass("black")
    }
  }
};
</script>