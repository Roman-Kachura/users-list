const listElement = document.getElementById('list')
const inputElement = document.getElementById('input')

let USERS = []


async function getUsers() {
  try {
    const users = await fetch('https://jsonplaceholder.typicode.com/users', {method: 'GET'}).then(res => res.json())
    return users
  } catch (e) {
    console.log('error', e)
    return []
  }
}

async function renderUsers() {
  const users = await getUsers()
  const items = users
    .map((u, i) => `<li class="list-group-item list-group-item-action list-group-item-${i % 2 === 0 ? 'primary' : 'light'}">${u.name}</li>`)
    .join('')
  listElement.innerHTML = items
}

renderUsers()