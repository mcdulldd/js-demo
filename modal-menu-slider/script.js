// 获取节点
const toggle = document.getElementById('toggle')
const close = document.getElementById('close')
const open = document.getElementById('open')
const modal = document.getElementById('modal')

// 侧边栏时间监听
toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav')
})

// 显示登录弹窗
open.addEventListener('click', () => {
  modal.classList.add('show-modal')
})

// close隐藏登录弹窗
close.addEventListener('click', () => {
  modal.classList.remove('show-modal')
})

// 点击modal隐藏
window.addEventListener('click', e => {
  console.log(e.target)
  e.target == modal ? modal.classList.remove('show-modal') : false
})





