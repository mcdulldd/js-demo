// 获取节点
const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []

addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)

// fetch获取数据
async function getRandomUser () {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()

  const user = data.results[0]
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser)
}

// 添加账户
function addData (obj) {
  data.push(obj)
  updateDom()
}

// 更新数据
function updateDom (provideData = data) {
  // 清除main
  main.innerHTML = '<h2><strong> Person</strong>Wealth</h2>'
  provideData.forEach(item => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`
    main.appendChild(element)
  })
}

// 格式化货币格式
function formatMoney (money) {
  return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

// 资金翻倍
function doubleMoney () {
  data = data.map(user => {
    return { ...user, money: user.money * 2 }
  })
  updateDom()
}

// 排序
function sortByRichest () {
  data.sort((a, b) => {
    return b.money - a.money
  })
  updateDom()
}

// 筛选
function showMillionaires () {
  data = data.filter(user => {
    return user.money > 1000000
  })
  updateDom()
}

// 求和
function calculateWealth () {
  const wealth = data.reduce((acc, user) => (
    acc += user.money
  ), 0)
  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthEl)
}