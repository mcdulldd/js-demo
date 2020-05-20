// 获取节点
const wordEl = document.getElementById("word")
const wrongLettersEl = document.getElementById("wrong-letters")
const playAgainBtn = document.getElementById("play-button")
const popup = document.getElementById("popup-container")
const notification = document.getElementById("notification-container")
const finalMessage = document.getElementById("final-message")
const figureParts = document.querySelectorAll(".figure-part")

const words = ["application", "programming", "interface", "wonder"]

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = []
const wrongLetters = []

// 显示单词函数
function displayWord () {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>`).join("")}`
  // 清除换行符
  const innerWord = wordEl.innerText.replace(/\n/g, '')
  if (innerWord === selectedWord) {
    finalMessage.innerText = '恭喜你输入正确😃'
    popup.style.display = "flex"
  }
}

// 键盘出发事件
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLettersEl()
      } else {
        showNotification()
      }
    }
  }
})

// 提示已输入该字母
function showNotification () {
  notification.classList.add('show')
  setTimeout(() => {
    notification.classList.remove('show')
  }, 1000)
}


// 输入错误
function updateWrongLettersEl () {
  // 显示错误字母
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>错误:</p>" : ""}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `
  // 显示火柴人
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length
    if (index < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = "none"
    }
    // 机会用完显示弹出框
    if (wrongLetters.length === figureParts.length) {
      finalMessage.innerText = "抱歉,游戏结束"
      popup.style.display = 'flex'
    }
  })
}

// 再玩一次
playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = words[Math.floor(Math.random() * words.length)]
  displayWord()
  updateWrongLettersEl()
  popup.style.display = "none"
})

// 初始化
displayWord()