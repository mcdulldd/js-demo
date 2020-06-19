// 获取节点
const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// 创建交易
// const dummyTransactions = [
//   { id: 1, text: "鲜花", amount: -20 },
//   { id: 2, text: "薪酬", amount: 300 },
//   { id: 3, text: "书籍", amount: -10 },
//   { id: 4, text: "相机", amount: 150 }
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// let transactions = dummyTransactions

// 添加交易
function addTransactionDOM (transaction) {
  // 判断是收入还是支出
  const sign = transaction.amount < 0 ? '-' : '+'
  // 创建节点
  const item = document.createElement('li')
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
  item.innerHTML = `
    ${transaction.text}
    <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`
  list.appendChild(item)
}

// 更新余额收入支出
function updateValues () {
  // 获取全部交易金额
  const amounts = transactions.map(transaction => transaction.amount)
  // 余额
  const total = amounts.reduce((arr, item) => (arr += item), 0)
  // 收入支出
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0)
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)
  // 更新到节点
  balance.innerHTML = `$${total}`
  money_plus.innerHTML = `$${income}`
  money_minus.innerHTML = `$${expense}`
}

function addTransaction (e) {
  e.preventDefault()
  // 验证内容是否为空
  if (text.value.trim() === '' || amount.value.trim() === '') {
    console.log('请输入交易名称和金额')
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    }
    transactions.push(transaction)
    addTransactionDOM(transaction)
    updateValues()
    updateLocalStorage()

    text.value = ''
    amount.value = ''
  }
}

// 创建id
function generateID (id) {
  return Math.floor(Math.random() * 100000000)
}

// 事件监听
form.addEventListener('submit', addTransaction)

// 删除交易
function removeTransaction (id) {
  transactions = transactions.filter(transaction => transaction.id !== id)
  updateLocalStorage()
  init()
}

// 更新本地存储数据
function updateLocalStorage () {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

// 初始化
function init () {
  list.innerHTML = ''
  transactions.forEach(addTransactionDOM)
  updateValues()
}

init()