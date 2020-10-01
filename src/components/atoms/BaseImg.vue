<template functional>
  <img
    :src="props.imgUrl"
    :alt="props.imgAlt"
    class="img"
    :class="data.staticClass || ''"
  />
</template>

<style scoped>
.img {
  display: block;
  margin: 5px auto;
}

.img--playlist {
  height: 50px;
  width: 20%;
  margin: 5px;
}

.img--artwork {
  height: 140px;
  width: 140px;
}
</style>
