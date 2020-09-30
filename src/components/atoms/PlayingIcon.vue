<template functional>
  <div class="playing-icon">
    <p>((</p>
    <img src="@/assets/ui-icon/playing.svg" />
    <p>))</p>
  </div>
</template>

<style scoped>
.playing-icon {
  display: flex;
  margin: 0;
  margin-left: 80%;
  padding: 0;
  height: 10px;
  width: 10px;
  font-size: 10px;
  color: #28a745;
  animation: playing 2s linear infinite;
}

.playing-icon p,
.playing-icon img {
  margin: 0;
  padding: 0;
}

/* アニメーション */
@keyframes playing {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(1px, 1px);
  }
  50% {
    transform: translate(0, 1px);
  }
  75% {
    transform: translate(1px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
