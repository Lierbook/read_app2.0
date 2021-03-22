<template>
  <div class="container">
    <talk-box :urlKey="urlKey"></talk-box>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 375px;
  display: flex;
  flex-wrap: wrap;
}
</style>

<script>
import talkBox from "../crossTalk/talkBox";
import crossTalkUrl from "../../utils/api";

export default {
  data() {
    return {
      url: "",
      urlKey: "35",
    };
  },
  components: {
    talkBox,
  },
  created() {},
};
</script>