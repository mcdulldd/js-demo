const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const pwd = document.getElementById('pwd')
const pwdConfirm = document.getElementById('pwdconfirm')

// 事件监听
form.addEventListener('submit', function (e) {
  e.preventDefault()
  checkRequired([username, email, pwd, pwdConfirm])
  checkLength(username, 3, 15)
  checkLength(pwd, 6, 12)
  checkEmail(email)
  checkPasswordsMatch(pwd, pwdConfirm)
})

function showError (input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')
  formControl.className = 'form-control error'
  small.innerText = message
}

function showSuccess (input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

// 验证必填项
function checkRequired (inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getKeyword(input)}为必填项`)
    } else {
      showSuccess(input)
    }
  })
}

// 验证长度
function checkLength (input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getKeyword(input)}至少${min}个字符`)
  } else if (input.value.length > max) {
    showError(input, `${getKeyword(input)}不超过${max}个字符`)
  } else {
    showSuccess(input)
  }
}

// 验证邮箱
function checkEmail (input) {
  const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  if (re.test(String(input.value.trim()))) {
    showSuccess(input)
  } else {
    showError(input, '邮箱格式不正确')
  }
}

// 验证两次密码是否一致
function checkPasswordsMatch (pwd, pwdConfirm) {
  if (pwd.value !== pwdConfirm.value) {
    showError(pwdConfirm, '两次密码不一致')
  }
}

function getKeyword (input) {
  return input.placeholder.slice(3)
}

