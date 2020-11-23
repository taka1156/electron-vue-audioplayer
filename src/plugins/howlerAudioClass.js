import { Howl } from 'howler';

/**
 * Howlのボリュームその他を維持したまま曲だけ差し替える関数
 * ! ライブラリが公式でサポートしてるわけではないので注意
 * @param {Object} o - data(base64 String)、format(string)
 */

Howl.prototype.changeMusic = function(o) {
  var self = this;
  self.unload(true);
  self._duration = 0;
  self._sprite = {};
  self._src = typeof o.data !== 'string' ? o.data : [o.data];
  self._format = typeof o.format !== 'string' ? o.format : [o.format];
};

class HowlAudio {
  /**
   *
   * @param {Object} music - data(base64 String)、format(string)
   * @param {Function} updateTimeFunc - 現在の再生時間の更新する関数(vuexなど)
   * @param {Function} updateTimeEndFunc - 終わりの再生時間を更新する関数(vuexなど)
   */

  constructor(music, updateIsPlay, updateTimeFunc, updateTimeEndFunc) {
    this.howl = new Howl({
      src: music.data,
      format: music.format,
      preload: false,
      autoplay: false,
      loop: false,
      volume: 1
    });

    this.updateIsPlay = updateIsPlay;
    this.updateTimeFunc = updateTimeFunc;
    this.updateTimeEndFunc = updateTimeEndFunc;
  }

  /**
   * @return {Howl} - ビジュアライザーにデータを適用させるためにHowlオブジェクトを渡す
   */

  getHowl() {
    return this.howl;
  }

  // 読み込みを行い、読み込み完了時に音声ファイルの終わり時間を設定
  init() {
    this.howl.load();
    this.howl.on('load', () => {
      this.updateTimeEndFunc(this.howl.duration());
    });
  }

  /**
   * 再生する楽曲を変更
   * @param {Object} music - data(base64 String)、format(string)
   */

  changeMusic(music) {
    this.resetTimer();
    this.howl.changeMusic(music);
  }

  // timerをセット
  setTimer() {
    this.timer = setInterval(() => {
      this.updateTimeFunc(this.howl.seek());
    }, 200);
  }

  // timerのリセット
  resetTimer() {
    clearInterval(this.timer);
    delete this.timer;
  }

  /**
   * 音声ファイルの再生
   * @param {Boolean} isLoop - ループしているか判定
   */

  play(isLoop) {
    this.howl.play();
    // 現在の再生位置を取得
    this.howl.on('play', () => {
      this.setTimer();
    });
    // 終了時
    this.howl.on('end', () => {
      if (!isLoop) {
        this.stop();
      }
    });
  }

  // 曲の終わりの停止はコッチ
  stop() {
    this.resetTimer();
    this.updateIsPlay();
    this.howl.stop();
  }

  // UIからの停止(一時停止)はコッチ
  pause() {
    this.resetTimer();
    this.howl.pause();
  }

  /**
   * 時間の更新(シークバーからの操作)
   * @param {Number} time - 進める時間の大きさを指定(s)
   */

  seek(time) {
    this.howl.seek(time);
  }

  /**
   * 音量の更新(シークバーからの操作)
   * @param {Number} vol - 音量の大きさを指定(0~1)
   */

  volume(vol) {
    this.howl.volume(vol);
  }

  // ループ設定を変える
  loop() {
    const isloop = !this.howl.loop();
    this.howl.loop(isloop);
  }
}

export { HowlAudio };
