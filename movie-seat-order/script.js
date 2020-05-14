const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value  // 类型隐式转换 变为number

// 渲染数据
populateUI()

// 座位点击事件
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    updateSelectedCount()
  }
})

// 更新座位数和票价
function updateSelectedCount () {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const selectedSeatsCount = selectedSeats.length
  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat)
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
  count.innerText = selectedSeatsCount
  total.innerText = ticketPrice * selectedSeatsCount
}

// 电影下拉框事件监听
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value

  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCount()
})

// 保存电影索引值和票价
function setMovieData (movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// 获取本地数据并渲染样式
function populateUI () {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice')

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
    ticketPrice = selectedMoviePrice
  }
}

// 设置初始座位和总票价
updateSelectedCount()