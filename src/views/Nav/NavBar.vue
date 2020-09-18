<template>
  <div class="NaviBar">
    <nav class="nav">
      <div class="nav__list">
        <router-link to="/" class="nav__item">
          <img src="@/assets/nav-icon/help.svg" />
        </router-link>
        <router-link to="/music" class="nav__item">
          <img src="@/assets/nav-icon/music.svg" />
        </router-link>
        <router-link to="/list" class="nav__item">
          <img src="@/assets/nav-icon/list.svg" />
        </router-link>
        <router-link to="/setting" class="nav__item">
          <img src="@/assets/nav-icon/setting.svg" />
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NaviBar'
}
</script>

<style scoped>
.nav__list {
  text-align: center;
  margin-bottom: 40px;
}

.nav__item {
  display: inline-block;
  width: 23%;
  border: solid 0.05px white;
}
</style>
