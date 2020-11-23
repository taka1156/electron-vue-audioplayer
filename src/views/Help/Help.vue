<template>
  <div>
    <div class="center">
      <h4 @click="runBrowser">使い方</h4>
      <hr />
      <ul>
        <p>詳しい情報は、githubページをみてください</p>
        <li>Help</li>
        <p>簡単に各ページの紹介をしています</p>
        <li>Music</li>
        <p>曲の再生ページ</p>
        <li>List</li>
        <p>取り込んだ曲リスト表示</p>
        <li>Setting</li>
        <p>色やビジュアライザーなどの設定(開発中)</p>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help',
  methods: {
    runBrowser() {
      console.log('browser test');
      window.open(location.href, null, 'top=100,left=100,width=280,height=470');
    }
  }
};
</script>

<style scoped>
.center {
  margin: 0 auto;
  height: 87vh;
  width: 95%;
  border: solid 1px white;
}

p {
  line-height: 8px;
  font-size: 11.2px;
}
</style>
