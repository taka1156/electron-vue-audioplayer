<template>
  <div>
    <div class="load">
      <p v-show="playlistLen !== 0" class="load__text">
        {{ playlistLen + 1 }}曲目を読み込み中...
      </p>
      <div class="load__spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loadging',
  props: {
    playlistLen: {
      type: Number,
      default: 0,
      required: true
    }
  }
};
</script>

<style scoped>
.load {
  margin: 35vh auto;
}

.load__text {
  font-size: 15px;
  text-align: center;
}

/* 待機時のスピナー表示 */

.load__spinner {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 100%;
  background-color: white;
  animation: spinner-anime 2s infinite;
}

@keyframes spinner-anime {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
