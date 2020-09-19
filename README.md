# electron-vue-audioplayer

>   [taka1156/audio-player](https://github.com/taka1156/audio-player)から移行したものです。

## プロジェクトの作り方

1. `vue create プロジェクト名`

1. `yarn install`

1. `vue add electron-builder`

1. `electron:serve`

## AudioPlayerの使い方

![8450768F-C078-434C-AC1C-ED15766ECF34](https://user-images.githubusercontent.com/47517002/81506168-65ddc480-932f-11ea-8c9c-76d146852c41.png)


### 未実装
- [X] 曲の再生
- [X] ファイルドラッグ もしくは、ファイル選択機能
- [ ] イコライザー
- [ ] 設定(背景画像、いろなど)
- [ ] 任意の秒数で飛ばす(+-15秒など)
- [X] データ構造を除いた簡単なUIを作る

## 現在の進捗
- 2020/3/27<br>
    ~~assetsに`mp3`データを入れて`AudioMain.vue`の`playList`にデータ定義をすれば再生できる状態にはできた。~~<br>

- 2020/3/28<br>
    ファイルドラッグによる取り込みを実装(レイアウトやウィンドウサイズも修正)

- 2020/09/19<br>
  [taka1156/audio-player](https://github.com/taka1156/audio-player)プロジェクトを移行
