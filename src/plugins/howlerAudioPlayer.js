import { HowlAudio } from '@/plugins/howlerAudioClass.js';
import store from '@/store/index.js';

let audioPlayer = null;

// vuex初期化
function initVuex() {
  // 現在の再生時刻をリセット
  store.commit('audioPlayer/setPreSeekTime', 0);
  store.commit('audioPlayer/setSeekEndTime', 0);
  // canvasリセット
  store.commit('audioPlayer/stateChangeIsCanvas', false);
  store.commit('audioPlayer/setCanvas', null);
}

// 曲停止時のvuexへの伝搬
function stopVuex() {
  store.commit('audioPlayer/stateChangePlay');
  store.commit('audioPlayer/setPreSeekTime', 0);
}

// 現在の時間更新
function updateTimefunc(seek) {
  if (isNaN(seek)) {
    seek = 0;
  }
  store.commit('audioPlayer/setPreSeekTime', Math.floor(seek));
}

// 曲の終わり時間の更新
function updateTimeEndfunc(duration) {
  if (isNaN(duration)) {
    duration = 0;
  }
  store.commit('audioPlayer/setSeekEndTime', Math.floor(duration));
}

// オーディオプレイヤー生成
function generateHowlAudio(music) {
  return new HowlAudio(music, stopVuex, updateTimefunc, updateTimeEndfunc);
}

export default {
  init() {
    const music = store.getters['audioPlayer/playedSong'].music;

    if (audioPlayer == null) {
      audioPlayer = generateHowlAudio(music);
    } else {
      if (store.getters['audioPlayer/isPlay']) {
        audioPlayer.stop();
      }
      initVuex();
      audioPlayer.changeMusic(music);
    }

    // ビジュアライザーの値を渡す
    store.commit('audioPlayer/setCanvas', audioPlayer.getHowl());
    audioPlayer.init(store.getters['audioPlayer/isPlay']);
  },
  // 時間の更新(シークバーからの操作)
  updateTime(time) {
    store.commit('audioPlayer/setPreSeekTime', time);
    audioPlayer.updateTime(time);
  },
  // 音量の更新(シークバーからの操作)
  updateVolume(vol) {
    store.commit('audioPlayer/setPreVolume', vol);
    audioPlayer.volume(vol);
  },
  play() {
    store.commit('audioPlayer/stateChangeIsCanvas', true);
    store.commit('audioPlayer/stateChangePlay');
    audioPlayer.play(store.getters['audioPlayer/isLoop']);
  },
  // UIからの停止(一時停止)はコッチ
  pause() {
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
    audioPlayer.loop();
  },
  visual() {
    // ビジュアライザーの値を渡す
    store.commit('audioPlayer/stateChangeIsCanvas', false);
    if (store.getters['audioPlayer/isPlay']) {
      this.pause();
      this.play();
    }
  }
};
