<template>
  <div>
    <div class="audio-title">
      <p
        class="audio-title__text"
        :class="{ 'audio-title__text--anime': audioTitle.length > 8 }"
      >
        {{ audioTitle }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioTitle',
  props: {
    audioTitle: {
      type: String,
      default: '不明',
      required: true
    }
  }
};
</script>

<style scoped>
.audio-title__box {
  margin: auto;
  width: 55%;
  overflow: hidden;
}
.taudio-title__text {
  margin: 0;
  white-space: nowrap;
  font-size: 15px;
}

.audio-title__text--anime {
  animation: flow-text 8s 0s linear infinite normal;
}

@keyframes flow-text {
  from {
    transform: translate(100%);
  }
  to {
    transform: translate(-100%);
  }
}
</style>
