<!-- 相声的播放页-->
<template>
  <div>
    <van-nav-bar
      title
      left-text
      left-arrow
      right-text="💿"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-tabs v-model="active">
      <van-tab title="MP3">
        <div class="bbg">
          <img class="bg" :src="img" />
          <aplayer
            :music="{
              title: title,
              artist: albumTitle,
              src: voice,
              pic: img,
              lrc: '',
              theme: '',
            }"
          ></aplayer>
        </div>
      </van-tab>

      <!-- <van-tab title="视频">
        
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        >
        </video-player>
      </van-tab> -->

      <van-tab title="推荐"
        ><div class="bbg">
          <img class="bg" :src="img" />
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item
              v-for="item in recommend"
              :key="item.albumId"
              @click="toUrl(item.albumId)"
            >
              <div class="head">
                <img :src="item.coverMiddle" alt class="bg" />
                <img :src="item.coverMiddle" alt />
                <div class="title">{{ item.title }}</div>
                <div class="info">{{ item.intro }}</div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axiosGetHttp from "../../utils/axiosGetHttp";
import { playUrl } from "../../utils/api";
import Aplayer from "vue-aplayer";

export default {
  components: {
    aplayer: Aplayer,
  },
  //引入播放器插件
  data() {
    return {
      active: 0,
      albumTitle: "",
      title: "",
      img: "",
      voice: "",
      video: "",
      recommend: [],
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "video/mp4",
            //url地址
            src:
              "http://aod.cos.tx.xmcdn.com/group83/M04/E3/5B/wKg5HV8MNQbSJJzyAHMw8IHDtb4099.m4a",
          },
        ],
        //你的封面地址
        poster: "",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true,
        },
      },
    };
  },
  created() {
    console.log("当前相声的ID为：", this.$route.params.id);
    this.getInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 返回上一页
    onClickRight() {
      this.$router.go(-2);
    },
    toUrl(albumId) {
      this.$router.push(`/talkDetail/${albumId}`);
    },

    async getInfo() {
      let res = await axiosGetHttp("get", playUrl(this.$route.params.id));
      console.log(res);

      let albumTitle = res.trackInfo.albumTitle;
      console.log(albumTitle);

      let title = res.trackInfo.title;
      console.log(title);

      let img = res.trackInfo.coverLarge;
      console.log(img);

      let voice = res.trackInfo.playUrl64;
      console.log(voice);

      let video = res.trackInfo.playPathAacv224;
      console.log(video);

      let recommend = res.associationAlbumsInfo;
      console.log(recommend);

      this.recommend = recommend;
      this.albumTitle = albumTitle;
      this.title = title;
      this.img = img;
      this.voice = voice;
      this.video = video;
    },
  },
};
</script>


<style lang="scss" scoped>
/deep/.van-tab {
  color: rgba(255, 255, 255, 0.815);
}
/deep/.van-tab--active {
  color: #f6987f;
}
/deep/.van-tabs__nav {
  background: rgba(255, 7, 7, 0);
}
/deep/.van-tabs__wrap {
  position: absolute;
  z-index: 100;
  background: rgba(0, 0, 0, 0);
  width: 100%;
}
/deep/.van-tabs__line {
  display: none;
}
.bbg {
  position: relative;
  overflow: hidden;
  height: 621px;
}
.bg {
  width: 667px;
  height: 667px;
  filter: blur(10px) brightness(30%);
  position: absolute;
  transform: translateX(-200px);
  margin: 0;
}
.aplayer {
  width: 100%;
  height: 621px;
  margin: 0;
  background: rgba(0, 0, 0, 0);
}
/deep/.aplayer-body {
  width: 100%;
  height: 100%;
  //   background-color: rgb(111, 155, 124);
}
/deep/.aplayer-info {
  width: 100%;
  height: 230px !important;
  bottom: 0;
  position: absolute;
}
/deep/.aplayer-pic {
  width: 240px;
  height: 240px;
  margin: 80px auto;
  margin-top: 120px;
  left: 0;
  right: 0;
  border-radius: 15px;
  box-shadow: 0 0 20px 10px #ffffff36;
}
/deep/.aplayer-thumb {
  animation: twinkling 2.1s infinite ease-in-out;
}
@keyframes twinkling {
  0% {
    opacity: 0.5;
    filter: alpha(opacity=20);
    -webkit-transform: scale(1) brightness(80%);
  }
  50% {
    opacity: 1;
    filter: alpha(opacity=50);
    -webkit-transform: scale(1.12) brightness(120%);
  }
  100% {
    opacity: 0.5;
    filter: alpha(opacity=20) brightness(80%);
    -webkit-transform: scale(1);
  }
}
/deep/.aplayer-title {
  font-size: 25px !important;
  color: white !important;
  display: block;
  margin-bottom: 15px;
}
/deep/.aplayer-music {
  margin: 0 auto !important;
  width: 320px;
  height: 116px !important;
  flex-grow: 0 !important;
}
/deep/.aplayer-author {
  font-size: 16px !important;
  color: white !important;
}
/deep/.aplayer-play {
  width: 40px !important;
  height: 40px !important;
  border: 2px solid rgb(255, 255, 255) !important;
  margin: 0 -25px -25px 0 !important;
  animation: twinkling 3s infinite ease-in-out;
}
/deep/ .aplayer-played {
  background: #04bdc0 !important;
}
/deep/.aplayer-pause {
  width: 40px !important;
  height: 40px !important;
  border: 2px solid #fff;
  bottom: 50% !important;
  right: 50% !important;
  margin: 0 -25px -25px 0 !important;
}
/deep/svg {
  width: 28px;
  height: 28px;
  margin: 3px 0 0 3px;
}
/deep/.aplayer-controller {
  width: 100%;
  height: 50px;
  flex-direction: column;
  top: 0;
}
/deep/.aplayer-bar-wrap {
  width: 320px !important;
  height: 20px !important;
  padding: 0;
  flex: none;
  margin: 0px !important;
}
/deep/.aplayer-time {
  height: 10px;
}
/deep/.aplayer-time button {
  display: none;
}

/deep/.aplayer-bar {
  background: rgb(219, 219, 219) !important;
}

/deep/.aplayer-time {
  position: relative;
  color: rgb(228, 228, 228) !important;
  width: 320px;
}
/deep/.aplayer-dtime {
  position: absolute;
  right: 0 !important;
}

// 推荐
.my-swipe {
  width: 95% !important;
  border-radius: 5px;
  top: 60px;
  margin: auto;
  overflow: hidden;
}
.my-swipe .van-swipe-item {
  color: #fff;
}
.head {
  // margin-top: 46px;
  width: 100%;
  height: 180px;
  position: relative;
  .bg {
    width: 100%;
    height: 180px;
    overflow: hidden;
    position: absolute;
    filter: blur(20px) brightness(85%);
    transform: translateX(0);
    margin: 0;
  }
  img {
    width: 130px;
    height: 130px;
    box-shadow: 0 0 10px 2px rgba(138, 138, 138, 0.623);
    margin: 25px 25px 25px 15px;
    filter: blur(0px);
    position: absolute;
  }
  .title {
    width: 200px;
    font-size: 18px;
    font-weight: 500;
    position: absolute;
    top: 25px;
    left: 160px;
    color: white;
    height: 45px;
    overflow: scroll;
  }
  .info {
    width: 200px;
    height: 40px;
    color: rgb(255, 255, 255);
    position: absolute;
    left: 160px;
    bottom: 60px;
    font-size: 14px;
    overflow: scroll;
  }
  .update {
    width: 200px;
    color: rgb(255, 255, 255);
    position: absolute;
    left: 170px;
    bottom: 35px;
    font-size: 14px;
  }
}
</style>