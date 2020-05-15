const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp')

// 添加事件
video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus)
stop.addEventListener('click', stopVideo)
progress.addEventListener('change', setVideoProgress)

// 点击播放/暂停
function toggleVideoStatus () {
  if (video.paused) {
    video.play()
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
  } else {
    video.pause()
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
  }
}

// 点击video图标更新
function updatePlayIcon () {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
  }
}

// 更新进度条/时间戳
function updateProgress () {
  progress.value = (video.currentTime / video.duration) * 100
  // 获取分钟数
  let mins = Math.floor(video.currentTime / 60)
  // 获取秒数

  let secs = Math.floor(video.currentTime % 60)
  if (mins < 10) {
    mins = '0' + String(mins)
  }
  if (secs < 10) {
    secs = '0' + String(secs)
  }

  timestamp.innerHTML = `${mins}:${secs}`
}

// 停止视频
function stopVideo () {
  video.currentTime = 0
  video.pause()
}

// 拖动进度条
function setVideoProgress () {
  video.currentTime = +progress.value * video.duration / 100
}