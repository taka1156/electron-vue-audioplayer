import store from '../../store/index.js'
let audio = new Audio()

// 曲データ配列およびそのコントロール、シークは、Vuexで管理(audioの実行順序の複雑さをVuex、Viewと分離)
// こちらは、再生、停止、ループ、初期化、再生時間関連、(+実行順序の担保)などの管理

export default {
  init () {
    if (store.getters.isPlay) {
      this.stop()
    }
    audio.src = store.getters.playedSong.path
    audio.load()
    audio.addEventListener('loadedmetadata', () => {
      store.commit('setSeekEndTime', audio.duration)
    })
  },
  next () {
    store.commit('nextIndex')
    this.init()
  },
  prev () {
    store.commit('prevIndex')
    this.init()
  },
  play () {
    // 再生状態
    store.commit('stateChangePlay')
    audio.play()
    // 再生時間の取得
    audio.addEventListener('timeupdate', () => {
      store.commit('setPreSeekTime', audio.currentTime)
    })
    // 曲の終了
    audio.addEventListener('ended', () => {
      audio.currentTime = 0
      this.stop()
    })
  },
  stop () {
    store.commit('stateChangePlay')
    audio.pause()
  },
  loop () {
    store.commit('stateChangeLoop')
    audio.loop = !audio.loop
  },
  ctrlVolume (vol) {
    store.commit('setPreVolume', vol)
    audio.volume = vol
  },
  ctrlSeek (seekTime) {
    store.commit('setPreSeekTime', seekTime)
    audio.currentTime = seekTime
  },
  changeIndex (index) {
    store.commit('setIndex', index)
    this.init()
  }
}
