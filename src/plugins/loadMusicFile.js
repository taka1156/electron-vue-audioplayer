const { parseBlob } = require('music-metadata-browser');

// 拡張子を取り除く
// (曲名が取り出せない時はファイル名から拡張子を抜いてタイトルとする)
function replaceFileNameToTitle(name) {
  return name.replace(/(.mp3|.m4a|.wav)/i, '');
}

function replaceFileNameToFormat(name) {
  return name
    .split('.')
    .pop()
    .toLowerCase();
}

// 音楽ファイルに含まれるID3の情報を整形
async function shapedID3(file) {
  try {
    const { common } = await parseBlob(file);
    const { title, artist, picture } = common;

    let albumArtUrl = null;
    if (picture) {
      const { format: type, data: byteArray } = picture[0];
      const blob = new Blob([byteArray], { type });
      albumArtUrl = URL.createObjectURL(blob);
    }

    return {
      title: title || replaceFileNameToTitle(file.name),
      artist: artist || '不明',
      picture: albumArtUrl || require('@/assets/Noimg.png')
    };
  } catch (e) {
    console.log(e.message);
    return {
      title: replaceFileNameToTitle(file.name),
      artist: '不明',
      picture: require('@/assets/Noimg.png')
    };
  }
}

// 音声データ読み込み
async function loadAudioFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function loadMusicFile(file) {
  const { title, artist, picture } = await shapedID3(file);
  const music = await loadAudioFile(file);
  return {
    title: title,
    artist: artist,
    picture: picture,
    music: {
      data: music,
      format: replaceFileNameToFormat(file.name)
    }
  };
}

export { loadMusicFile };
