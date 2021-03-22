<!-- 相声专辑详情页-->
<template>
  <div>
    <van-nav-bar title="专辑详情" left-text left-arrow @click-left="onClickLeft" />
    <div class="head">
      <img :src="img" alt class="bg" v-cloak/>
      <img :src="img" alt />
      <div class="title">{{title}}</div>
      <div class="info">{{info}}</div>
      <div class="update" v-cloak>已更新到{{update}}期</div>
    </div>
    <van-tabs v-model="active">
      <van-tab title="详情">
        <short-intro :allInfo="allInfo"></short-intro>
      </van-tab>
      <van-tab title="节目">
        <talk-content :talkList="talkList" v-if="talkList !== undefined"></talk-content>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import shortIntro from "../crossTalk/shortIntro";
import talkContent from "../crossTalk/talkContent";
import axiosGetHttp from "../../utils/axiosGetHttp";
import { talkDetailUrl } from "../../utils/api";

export default {
  data() {
    return {
      active: 1,
      talkList: [],
      title: "",
      info: "",
      update: "",
      img: "",
      allInfo: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async getInfo() {
      let res = await axiosGetHttp(
        "get",
        talkDetailUrl(this.$route.params.albumId)
      );
      
      let title = res.data.album.title;
      let info = res.data.album.shortIntro;
      let update = res.data.album.tracks;
      let img = res.data.album.coverWebLarge;
      let allInfo = res.data.album.introRich;
      let talkList = res.data.tracks.list;
      this.talkList = talkList;
      this.title = title;
      this.info = info;
      this.update = update;
      this.img = img;
      this.allInfo = allInfo;
      console.log(res)
    },
  },
  components: {
    shortIntro,
    talkContent,
  },

  created() {
    console.log(this.$route.params.albumId);
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar__title {
  color: rgb(0, 0, 0);
  font-weight: 500;
}
// /deep/.van-hairline--bottom{
//     position: fixed!important;
//     width: 100%;
//     top: 0;
//     height: 46px;
// }

.head {
  // margin-top: 46px;
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
  .bg {
    width: 200%;
    height: 300px;
    
    position: absolute;
    filter: blur(20px) brightness(60%);
    transform: translateX(-10%);

    margin: 0;
  }
  img {
    width: 130px;
    height: 130px;
    box-shadow: 0 0 10px 2px rgba(138, 138, 138, 0.623);
    margin: 25px 25px 25px 25px;
    filter: blur(0px);
    position: absolute;
  }
  .title {
    width: 200px;
    font-size: 18px;
    font-weight: 500;
    position: absolute;
    top: 25px;
    left: 170px;
    color: white;
    height: 45px;
    overflow: scroll;
  }
  .info {
    width: 200px;
    height: 40px;
    color: rgb(189, 189, 189);
    position: absolute;
    left: 170px;
    bottom: 60px;
    font-size: 14px;
    overflow: scroll;
  }
  .update {
    width: 200px;
    color: rgb(223, 223, 223);
    position: absolute;
    left: 170px;
    bottom: 35px;
    font-size: 14px;
  }
}
</style>