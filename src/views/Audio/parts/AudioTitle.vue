<template>
  <div class="AudioTitle">
    <div class="title__box">
      <p class="title__text" :class="{ 'title__box--anime': audioTitle.length > 8 }">
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
.title__box {
  margin: auto;
  width: 55%;
  overflow: hidden;
}

.title__box--anime {
  animation: flow-text 8s 0s linear infinite normal;
}

.title__text {
  margin: 5px auto;
  white-space: nowrap;
  font-size: 15px;
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
