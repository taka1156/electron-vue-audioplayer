<template functional>
  <div class="base-flow-text">
    <p
      class="base-flow-text__text"
      :class="{ 'base-flow-text__text--flow': props.flowText.length > 13 }"
    >
      {{ props.flowText }}
    </p>
  </div>
</template>

<style scoped>
.base-flow-text {
  margin: 0 auto;
  width: 60%;
  overflow: hidden;
}

.base-flow-text__text {
  margin: 0 auto 0;
  white-space: nowrap;
  font-size: 15px;
}

.base-flow-text__text--flow {
  animation: flow-text 6s linear infinite normal;
}

@keyframes flow-text {
  from {
    transform: translate(0);
  }
  to {
    transform: translate(-100%);
  }
}
</style>
