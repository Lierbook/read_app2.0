<template>
  <div class="content">
    <van-nav-bar
      :title="bookInfo.bookName"
      fixed
      left-arrow
      @click-left="onClickLeft"
      :style="{ 
        filter: 'brightness(' + brightness + '%)' ,
        color:fc,
        backgroundColor:bgc,
        
      }"
    >
      <template #right>
        <van-icon name="wap-home" size="18" @click="toIndex" />
      </template>
    </van-nav-bar>
    <van-cell
      
      :style="{ 
        filter: 'brightness(' + brightness + '%)',
        color:fc,
        backgroundColor:bgc,
        
        
        
        
        }"
    >
      <div v-html="this.content" @click="showPopup"
      :style="{
        color:fc,
        fontSize:fontSize+'px'
      }">
      
      </div>

      <div class="tiaozhuan">
        <span @click="lastChapter" :class="isGray ? 'gray' : ''">上一章</span>
        <span @click="onClickLeft">目录</span>
        <span @click="nextChapter" :class="isGray1 ? 'gray' : ''">下一章</span>
      </div>
    </van-cell>

    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <!-- 弹窗内容 -->
      <div class="brightness">
        <span>亮度</span>
        <van-slider v-model="brightness" @change="onChange" :min="20" :max="120" :step="10" />
      </div>

      <div class="bgc">
        <span>主题</span>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1" @click="changeStyle1">白纸</van-radio>
          <van-radio name="2"  @click="changeStyle2">夜间</van-radio>
          <van-radio name="3"  @click="changeStyle3">绿意盎然</van-radio>
        </van-radio-group>
      </div>

      <div class="fontSize">
        <span>字体</span>
   
         <van-slider v-model="fontSize" :min="6" :max="26"  @change="sizeChange" />
      
      </div>

      <div class="btn">
        <van-button round type="info" @click="lastChapter">上一章</van-button>
        <van-button round type="info" @click="nextChapter">下一章</van-button>
      </div>

    </van-popup>
  </div>
</template>

<script>
import { bookContent } from "../../utils/api";
import axiosGetHttp from "../../utils/axiosGetHttp";
export default {
  data() {
    return {
      radio: '1',
      brightness: 100,
      fontSize:12,
      show: false,
      bookId: this.$route.params.bookId,
      id: this.$route.params.id,
      content: "",
      bookInfo: "",
      isGray: false,
      isGray1: false,
      bgc:"#FFFFFF",
      fc:"#000000"
    };
  },
  created() {
    if (this.id == 1) {
      this.isGray = !this.isGray;
    }
    if (this.id == this.bookInfo.chapterCount) {
      this.isGray1 = !this.isGray1;
    }
    // console.log(this.id,this.bookInfo.chapterCount,666)
    this.getBookContent();
  },
  watch: {
    $route: function (to, from) {
      window.pageYOffset = 0;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  methods: {
    changeStyle1(){
      this.bgc="#FFFFFF",
      this.fc="#000000"
    },
    changeStyle2(){
      this.bgc="#000000",
      this.fc="#FFFFFF"
    },
    changeStyle3(){
      this.bgc="#339999",
      this.fc="#ffffff"
    },
    onChange(brightness) {
      console.log("亮度为：" + brightness);
    },
    sizeChange(fontSize) {
      var allBodyText = document.querySelectorAll('.bodytext');
      // console.log(allBodyText,"xxx")
      for(var i=0;i<allBodyText.length;i++){
        allBodyText[i].style.fontSize = fontSize+'px'
      }
    },
    showPopup() {
      this.show = true;
    },
    async getBookContent() {
      let res = await axiosGetHttp(
        "get",
        bookContent + this.bookId + "/" + this.id
      );
      if (res.msg == "ok") {
        let book = res.body;
        this.content = book.content;
        this.bookInfo = book.bookInfo;
        // console.log(this.content);
      }
    },
    onClickLeft() {
      // this.$router.push(`/bookMulu/${this.bookId}`);
      this.$router.go(-1);
    },
    lastChapter() {
      if (this.id > 1) {
        this.id = this.id - 1;
        if (this.id == 1) {
          this.isGray = !this.isGray;
        }
        this.$router.push(`/bookContent/${this.bookId}/${this.id}`);
        this.isGray1 = false;
        this.getBookContent();
         this.show = false;
      }
    },
    nextChapter() {
      if (this.id < this.bookInfo.chapterCount) {
        let id = this.id;
        id++;
        this.id = id;
        if (this.id == this.bookInfo.chapterCount) {
          this.isGray1 = !this.isGray1;
        }
        this.$router.push(`/bookContent/${this.bookId}/${this.id}`);
        this.isGray = false;
        this.getBookContent();
         this.show = false;
      }
    },
    toIndex() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style lang="scss" scoped>

.brightness,.bgc,.fontSize,.btn{
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
}
.btn{
  margin-top: 35px;
  justify-content: space-evenly;
  .van-button{
    height: 30px;
  }
}
.van-slider,.van-radio-group{
  margin-left: 20px;
  width: 70%;
}
.van-radio{
  width: 80px;
  margin-right: 0px;
}
/deep/.van-icon-success::before{
  content: none!important;
}
/deep/.van-icon{
  width: 15px !important;
  height: 15px !important;
}
/deep/.van-nav-bar {
  background-color: white;
  .van-nav-bar__left {
    .van-icon {
      color: gray;
      
    }
  }
  .van-nav-bar__right {
    left: 35px;
    .van-icon {
      color: gray;
    }
  }
  .van-nav-bar__title {
    font-weight: 700;
    color: gray;
  }
}
/deep/.van-cell {
  background-color: #f5f5f5;
  margin-top: 46px;
  .background-img-center {
    background: center center no-repeat;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .zhangyue-top-full-c {
    img {
      height: 100%;
      width: 100%;
    }
  }
  .zhangyue-tablebody {
    width: 100%;
    margin-top: 30px;
  }
  .biaoti,
  .copyright {
    padding-left: 5px;
    font-size: 12px;
    border: 1px solid lightgray;
  }
  .text-title-1,
  .text-title-1-c {
    font-size: 16px;
    margin: 10px 0 20px 0;
  }
  .bodytext {
    font-size: 18px;
    margin: 10px 0 10px 0;
    text-indent: 36px;
  }

  .tiaozhuan {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 30px 0 20px 0;
    span {
      width: 65px;
      border: 1px solid black;
      text-align: center;
      border-radius: 15px;
      padding: 1px 5px 1px 5px;
    }
  }
}
.gray {
  border: 1px solid lightgray !important;
  color: lightgray;
}
</style>