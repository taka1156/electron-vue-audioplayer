import store from '@/store/index.js';
const audio = new Audio();

// 曲データ配列およびそのコントロール、シークは、Vuexで管理(audioの実行順序の複雑さをVuex、Viewと分離)
// こちらは、再生、停止、ループ、初期化、再生時間関連、(+実行順序の担保)などの管理

export default {
  init() {
    if (store.getters['audioPlayer/isPlay']) {
      this.stop();
    }
    audio.src = store.getters['audioPlayer/playedSong'].music;
    audio.load();
    audio.addEventListener('loadedmetadata', () => {
      store.commit('audioPlayer/setSeekEndTime', audio.duration);
    });
  },
  next() {
    store.commit('audioPlayer/nextIndex');
    this.init();
  },
  prev() {
    store.commit('audioPlayer/prevIndex');
    this.init();
  },
  play() {
    // 再生状態
    store.commit('audioPlayer/stateChangePlay');
    audio.play();
    // 再生時間の取得
    audio.addEventListener('timeupdate', () => {
      store.commit('audioPlayer/setPreSeekTime', audio.currentTime);
    });
    // 曲の終了
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      this.stop();
    });
  },
  stop() {
    store.commit('audioPlayer/stateChangePlay');
    audio.pause();
  },
  loop() {
    store.commit('audioPlayer/stateChangeLoop');
    audio.loop = !audio.loop;
  },
  ctrlVolume(vol) {
    store.commit('audioPlayer/setPreVolume', vol);
    audio.volume = vol;
  },
  ctrlSeek(seekTime) {
    store.commit('audioPlayer/setPreSeekTime', seekTime);
    audio.currentTime = seekTime;
  },
  changeIndex(index) {
    store.commit('audioPlayer/setIndex', index);
    this.init();
  }
};
