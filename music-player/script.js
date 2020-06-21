// 获取节点
const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const audio = document.getElementById("audio")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const title = document.getElementById("title")
const cover = document.getElementById("cover")

// 歌曲名称
const songs = ["hey", "summer", "ukulele"]
// 歌曲下标
let songIndex = 2

// 初始化页面
loadSong(songs[songIndex])

function loadSong (song) {
  title.innerHTML = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}

// 播放暂停
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')
  if (isPlaying) {
    // 暂停
    pauseSong()
  } else {
    // 播放
    playSong()
  }
})

// 切换歌曲
// 上一首
prevBtn.addEventListener('click', prevSong)
// 下一首
nextBtn.addEventListener('click', nextSong)

// 更新进度条
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

// 播放结束自动切换
audio.addEventListener('ended', nextSong)

function playSong () {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}

function pauseSong () {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  audio.pause()
}

function prevSong () {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}

function nextSong () {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

// 更新进度条
function updateProgress (e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

// 拖动进度条
function setProgress (e) {
  const width = this.clientWidth
  const clickX = e.clientX
  const duration = audio.duration
  audio.currentTime = (clickX / width) * duration
}
