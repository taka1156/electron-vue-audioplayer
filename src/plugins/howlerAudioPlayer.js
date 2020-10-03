import store from '@/store/index.js';
import { Howl } from 'howler';

let audioPlayer = null;
let timerid = 0;

export default {
  init() {
    if (store.getters['audioPlayer/isPlay']) {
      this.stop();
    }
    // vuexの現在の再生時刻をリセット
    store.commit('audioPlayer/setPreSeekTime', 0);
    // 生成
    const { data, format } = store.getters['audioPlayer/playedSong'].music;
    audioPlayer = new Howl({
      src: data,
      format: format,
      preload: true,
      autoplay: false,
      loop: false,
      volume: 1
    });

    // リセット
    store.commit('audioPlayer/stateChangeIsCanvas', false);
    store.commit('audioPlayer/setCanvas', null);
    // ビジュアライザーの値を渡す
    store.commit('audioPlayer/setCanvas', audioPlayer);
    // 終わりの時間をvuexに渡す
    audioPlayer.load();
    audioPlayer.on('load', () => {
      store.commit('audioPlayer/setSeekEndTime', parseInt(audioPlayer.duration()));
    });
  },
  // 時間の更新(シークバーからの操作)
  updateTime(time) {
    store.commit('audioPlayer/setPreSeekTime', time);
    audioPlayer.seek(time);
  },
  // 音量の更新(シークバーからの操作)
  updateVolume(vol) {
    store.commit('audioPlayer/setPreVolume', vol);
    audioPlayer.volume(vol);
  },
  play() {
    store.commit('audioPlayer/stateChangeIsCanvas', true);
    store.commit('audioPlayer/stateChangePlay');
    audioPlayer.play();
    // 現在の再生位置を取得
    audioPlayer.on('play', () => {
      timerid = setInterval(() => {
        store.commit('audioPlayer/setPreSeekTime', audioPlayer.seek());
      }, 200);
    });
    // 終了時
    audioPlayer.on('end', () => {
      if (!store.getters['audioPlayer/isLoop']) {
        this.stop();
      }
    });
  },
  // 曲の終わりの停止はコッチ
  stop() {
    clearInterval(timerid);
    store.commit('audioPlayer/stateChangePlay');
    audioPlayer.stop();
  },
  // UIからの停止(一時停止)はコッチ
  pause() {
    clearInterval(timerid);
    store.commit('audioPlayer/stateChangePlay');
    audioPlayer.pause();
  },
  next() {
    store.commit('audioPlayer/nextIndex');
    this.init();
  },
  prev() {
    store.commit('audioPlayer/prevIndex');
    this.init();
  },
  // プレイリストからのページジャンプ
  changeIndex(index) {
    store.commit('audioPlayer/setIndex', index);
    this.init();
  },
  loop() {
    store.commit('audioPlayer/stateChangeLoop');
    audioPlayer.loop(true);
  },
  visual() {
    store.commit('audioPlayer/stateChangeIsCanvas', false);
    if (store.getters['audioPlayer/isPlay']) {
      this.pause();
      this.play();
    }
  }
};
