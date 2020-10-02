<template>
  <div class="AudioController">
    <div class="ctrl">
      <!--ループやシャッフルの制御-->
      <span v-show="!isLoop">
        <base-button
          class="base-button--sm"
          :img-url="require('@/assets/ui-icon/loop.svg')"
          @click="loop"
        />
      </span>
      <span v-show="isLoop">
        <base-button
          class="base-button--sm"
          :img-url="require('@/assets/ui-icon/loop-true.svg')"
          @click="loop"
        />
      </span>
      <base-button
        class="base-button--sm"
        :img-url="require('@/assets/ui-icon/shuffle.svg')"
        @click="shuffle"
      />
      <!--再生位置-->
      <div class="ctrl__seek">
        <base-time-range :seek-info="seekInfo" @update-time="updateTime" />
      </div>
      <!--トラックを戻す-->
      <base-button
        class="base-button--lg"
        :img-url="require('@/assets/ui-icon/prev.svg')"
        @click="prev"
      />
      <!--再生-->
      <span v-show="!isPlay">
        <base-button
          class="base-button--lg"
          :img-url="require('@/assets/ui-icon/play.svg')"
          @click="play"
        />
      </span>
      <!--停止-->
      <span v-show="isPlay">
        <base-button
          class="base-button--lg"
          :img-url="require('@/assets/ui-icon/stop.svg')"
          @click="pause"
        />
      </span>
      <!--トラックを進める-->
      <base-button
        class="base-button--lg"
        :img-url="require('@/assets/ui-icon/next.svg')"
        @click="next"
      />
      <!--音量調節-->
      <div class="ctrl__seek">
        <base-volume-range :volume="volume" @update-volume="updateVolume" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseTimeRange from '../atoms/Range/BaseTimeRange';
import BaseVolumeRange from '../atoms/Range/BaseVolumeRange';
import BaseButton from '../atoms/BaseButton';

export default {
  name: 'AudioController',
  components: {
    'base-time-range': BaseTimeRange,
    'base-volume-range': BaseVolumeRange,
    'base-button': BaseButton
  },
  props: {
    isPlay: {
      type: Boolean,
      default: false,
      required: true
    },
    isLoop: {
      type: Boolean,
      default: false,
      required: true
    },
    seekInfo: {
      type: Object,
      default: () => {},
      required: true
    },
    volume: {
      type: Number,
      default: 1,
      required: true
    }
  },
  methods: {
    updateTime(time) {
      this.$emit('update-Time', time);
    },
    updateVolume(vol) {
      this.$emit('update-volume', vol);
    },
    next() {
      this.$emit('next');
    },
    prev() {
      this.$emit('prev');
    },
    play() {
      this.$emit('play');
    },
    pause() {
      this.$emit('pause');
    },
    loop() {
      this.$emit('loop');
    },
    shuffle() {}
  }
};
</script>

<style scoped>
/* 共通css */

.ctrl {
  text-align: center;
  margin: 25px auto;
  padding: 0;
  height: 150px;
  width: 95%;
  border: 0.1px solid white;
}

.ctrl__seek {
  margin: 0;
  padding: 0;
  text-align: center;
}

/* 共通css */
</style>
