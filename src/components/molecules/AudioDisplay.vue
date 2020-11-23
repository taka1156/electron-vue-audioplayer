<template>
  <div>
    <!--情報の表示-->
    <div class="audio-display">
      <base-text
        class="base-text--artwork"
        :text="`track[${trackInfo.now + 1}/${trackInfo.max}]`"
      />
      <base-flow-text :flow-text="playedSong.title" />
      <base-text class="base-text--artwork" :text="playedSong.artist" />
      <base-img class="img--artwork" :img-url="playedSong.picture" />
    </div>
  </div>
</template>

<script>
import BaseText from '../atoms/Text/BaseText';
import BaseFlowText from '../atoms/Text/BaseFlowText';
import BaseImg from '../atoms/BaseImg';

export default {
  name: 'AudioDisplay',
  components: {
    'base-flow-text': BaseFlowText,
    'base-text': BaseText,
    'base-img': BaseImg
  },
  props: {
    trackInfo: {
      type: Object,
      default: () => {},
      required: true
    },
    playedSong: {
      type: Object,
      default: () => {},
      required: true
    }
  }
};
</script>

<style scoped>
/* 再生中の曲に関する情報 */
.audio-display {
  height: 200px;
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

.audio-display__track {
  margin: 10px auto;
  font-size: 10px;
}
</style>
