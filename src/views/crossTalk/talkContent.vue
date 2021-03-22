<!-- 相声的专辑列表-->

<template>
  <div class="content">
    <div class="title">
      <div class="playAll">
        <img src="../../../src/images/播放.png" alt />播放全部
      </div>
      <!-- 使用自定义复选框实现顺序逆序 -->
      <van-checkbox class="sort" v-model="checked" @click="changeSort">
        <template #icon="props">
          <img :src="props.checked ? positiveOrder:reverseOrder" />
          {{props.checked ? "正序":"倒序"}}
        </template>
      </van-checkbox>

      <div is-link @click="showPopup" class="selected">
        <img src="../../../src/images/选集.png" alt />选集
      </div>
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <!-- 这是选集弹出内容 -->

        <van-picker
          ref="pickerRef"
          show-toolbar
          :columns="sliceNum"
          @confirm="onConfirm"
          visible-item-count="6"
          @cancel="show = false"
        />
      </van-popup>
    </div>
    <div class="child">
      <router-link
        class="box"
        v-for="item in talkList"
        :key="item.id"
        :id="'box'+item.orderNo"
        :to="'/play/' + item.id"
      >
        <div class="order">{{item.orderNo}}</div>
        <div class="talk">
          <div class="talkTitle">{{item.title}}</div>
          <div class="number">
            <div class="played">
              <img src="../../../src/images/play.png" alt />
              {{item.playtimes|handlePlayCount}}
            </div>
            <div class="comment">
              <img src="../../../src/images/评论.png" alt />
              {{item.comments}}
            </div>
            <div class="time">
              <img src="../../../src/images/钟.png" alt />
              {{item.duration|SecondToDate}}
            </div>
          </div>
        </div>
        <div class="publishTime">{{item.createdAt|moment}}</div>
      </router-link>
    </div>
  </div>
</template>


<script>
import positiveOrder from "../../images/正序.png";
import reverseOrder from "../../images/倒序.png";
import moment from "moment/moment";

export default {
  data() {
    return {
      checked: true,
      positiveOrder,
      reverseOrder,
      show: false,
      sliceNum: [],
      num: [],
      list: [],
    };
  },

  methods: {
    changeSort: function (talkList) {
      this.talkList = this.talkList.reverse();
    },
    showPopup() {
      this.show = true;
      if (this.talkList[0].orderNo > this.talkList[1].orderNo) {
        this.talkList = this.talkList.sort(function (a, b) {
          return a.orderNo - b.orderNo;
        });
      }
    },

    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      let start = `${index}`;
      start = start * 5 + 1;
      document.querySelector(`#box${start}`).scrollIntoView(true);
      this.show = false;
    },
  },
  props: ["talkList"],
  beforeUpdate() {
    console.log(this.talkList);
    let sliceNum = [];
    this.talkList.forEach((element, index) => {
      if ((index + 5) % 5 == 0) {
        let i = element.orderNo + 4;
        sliceNum.push(element.orderNo + " ~ " + i);
      }
    });
    this.sliceNum = sliceNum;
  },

  filters: {
    handlePlayCount: function (value) {
      if (value < 10000) {
        return value;
      } else if (value >= 10000 && value < 100000000) {
        return parseInt(value / 10000) + "万";
      } else if (value >= 100000000) {
        return parseInt(value / 100000000) + "亿";
      }
    },
    SecondToDate: function (msd) {
      var time = msd;

      if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
          time =
            parseInt(time / 60.0) +
            "分" +
            parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
            "秒";
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
          time =
            parseInt(time / 3600.0) +
            "时" +
            parseInt(
              (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
            ) +
            "分" +
            parseInt(
              (parseFloat(
                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
              ) -
                parseInt(
                  (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
                )) *
                60
            ) +
            "秒";
        } else if (time >= 60 * 60 * 24) {
          time =
            parseInt(time / 3600.0 / 24) +
            "天" +
            parseInt(
              (parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) *
                24
            ) +
            "时" +
            parseInt(
              (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
            ) +
            "分" +
            parseInt(
              (parseFloat(
                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
              ) -
                parseInt(
                  (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
                )) *
                60
            ) +
            "秒";
        } else {
          time = parseInt(time) + "秒";
        }
      }

      return time;
    },
    moment: function (value, formatString) {
      formatString = formatString || "YYYY-MM-DD";
      return moment(value).format(formatString);
    },
  },
};
</script>




<style lang="scss" scoped>
.child {
  height: 341px;
  overflow: scroll;
}
.title {
  margin-top: 2px;
  margin-bottom: 4px;
  width: 100%;
  height: 50px;
  box-shadow: 0 0 10px 3px rgba(184, 184, 184, 0.26);
  display: flex;
  // position: fixed;
  // background-color: white;
  // z-index: 100;

  .playAll {
    width: 100px;
    height: 30px;
    margin-top: 10px;
    line-height: 32px;
    margin-left: 10px;
    font-size: 16px;

    img {
      width: 20px;
      transform: translateY(4px);
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  /deep/.sort {
    width: 80px;
    height: 30px;
    margin-top: 10px;
    margin-left: 110px;
    line-height: 32px;
    color: #707070;
    font-size: 16px;
    .van-checkbox__icon {
      width: 80px;
      height: 30px;
      line-height: 32px;
      color: #707070;
      font-size: 16px;
    }
    img {
      width: 16px;
      transform: translateY(2px);
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  .selected {
    width: 80px;
    height: 30px;
    margin-top: 10px;
    line-height: 32px;
    color: #707070;
    font-size: 16px;

    img {
      width: 16px;
      transform: translateY(2px);
      margin-left: 5px;
      margin-right: 5px;
    }
  }
}

.box {
  width: 100%;
  height: 60px;
  display: flex;
  border-bottom: 1px solid rgb(200, 200, 200);
  background-color: white;
}
.order {
  width: 15%;
  height: 60px;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
  color: gray;
}
.talk {
  width: 68%;
  height: 60px;
  display: flex;
  flex-direction: column;
  .talkTitle {
    width: 100%;
    height: 50%;
    overflow: scroll;
    font-size: 16px;
    font-weight: 600;
    line-height: 30px;
    color: rgb(66, 66, 66);
  }
  .number {
    width: 100%;
    height: 50%;
    display: flex;
    .played,
    .comment,
    .time {
      width: 31%;
      height: 30px;
      font-size: 14px;
      color: #8a8a8a;
      line-height: 30px;
      img {
        width: 14px;
        height: 14px;
        transform: translateY(2px);
        margin: 0 3px;
      }
    }
    .time {
      width: 43%;
    }
    .comment {
      width: 26%;
    }
  }
}
.publishTime {
  width: 25%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 15px;
  color: #707070;
}
</style>