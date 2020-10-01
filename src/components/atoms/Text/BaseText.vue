<template functional>
  <p class="base-text" :class="data.staticClass || ''">{{ props.text }}</p>
</template>

<style scoped>
.base-text {
  margin: 0;
  font-size: 13px;
  text-align: left;
}

.base-text--artwork {
  margin: 5px;
  text-align: center;
}
</style>
