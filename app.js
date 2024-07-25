const listElement = document.getElementById('list')
const inputElement = document.getElementById('input')

let USERS = []

function getUsers(delay) {
  listElement.innerHTML = `<h3>Loading...</h3>`
  inputElement.disabled = true
  setTimeout(async function (){
    try {
      const users = await fetch('https://jsonplaceholder.typicode.com/users', {method: 'GET'}).then(res => res.json())
      USERS = users
      render(users)
    } catch (e) {
      console.log('Error', e)
    } finally {
      inputElement.disabled = false
    }
  }, delay)
}

function filterUsers(name){
  return USERS.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
}

function render(users = []) {
  let html = ''
  if(users.length > 0){
    html = users.map(toHTML).join('')
  } else{
    html = `<h3 class="text-danger">Users with such name not found :(</h3>`
  }
  listElement.innerHTML = html
  addEvents()
}

function toHTML(user, index){
  return (
    `<li class="list-group-item list-group-item-${index % 2 === 0 ? 'primary' : 'light'}">
      <div class="d-flex align-items-center justify-content-between">
        <span>${user.name}</span>
        <button type="button" class="user-btn btn btn-outline-dark" data-target="user-info-${user.id}">more</button>
      </div>
      <div id="user-info-${user.id}" class="user-info d-none d-flex-column align-items-center justify-content-between mt-3">
        <h6 class="m-0 py-2">c.${user.address.city}, st.${user.address.street} ${user.address.suite}</h6>
        <h6 class="m-0 py-2">Phone: <a href="tel:${user.phone}">${user.phone}</a></h6>
      </div>
     </li>`
  )
}

function showUserInfo(e){
  const id = e.currentTarget.dataset.target
  const userInfo = document.querySelectorAll('.user-info')
  const element = document.getElementById(`${id}`)

  userInfo.forEach(el => el.id !== id ? el.classList.add('d-none') : el)

  element.classList.toggle('d-none')
}

function addEvents(){
  const userButtons = document.querySelectorAll('.user-btn')

  userButtons.forEach(button => {
    button.addEventListener('click', showUserInfo)
  })
}

inputElement.addEventListener('input', function(e){
  const filteredUsers = filterUsers(e.currentTarget.value)
  render(filteredUsers)
})

getUsers(2000)