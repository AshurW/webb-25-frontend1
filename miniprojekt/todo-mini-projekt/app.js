const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')

let todoListArray = []

function saveToLocalStorage(todo) {
    todoListArray.push(todo)
    const data = JSON.stringify(todoListArray)
    localStorage.setItem('todos', data)
}

function loadFromLocalStorage() {
    const todos = localStorage.getItem('todos')
    if (todos) {
        todoListArray = JSON.parse(todos)
        todoListArray.forEach(todo => {
            createTodo(todo)
        });
    }
}


function createTodo(todo) {
    const listItem = document.createElement('li')
    listItem.id = todo.id
    listItem.className = 'list-container'
    
    const checkboxInput = document.createElement('input')
    checkboxInput.type = 'checkbox'
    if (todo.checked) {
        checkboxInput.checked = todo.checked
        listItem.classList.add('done')
    } 
    checkboxInput.addEventListener('change', (e) => {
        // listItem.classList.toggle('done')
        const isChecked = e.target.checked
        if (isChecked) {
            listItem.classList.add('done')
        } else {
            listItem.classList.remove('done')
        }
        const parent = e.target.parentElement
        const todoId = Number(parent.id)
        todoListArray.forEach(todo => {
            if (todo.id === todoId) {
               todo.checked = isChecked 
            }
        });
        const data = JSON.stringify(todoListArray)
        localStorage.setItem('todos', data)
    })
    listItem.appendChild(checkboxInput)
    
    const titleSpan = document.createElement('span')
    titleSpan.textContent = todo.title
    listItem.appendChild(titleSpan)
    
    const deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    deleteButton.addEventListener('click', (e) => {
        const target = e.target
        const parent = target.parentElement
        const todoId = Number(parent.id)
        parent.remove()
        todoListArray = todoListArray.filter(todo => todo.id !== todoId)
        const data = JSON.stringify(todoListArray)
        localStorage.setItem('todos', data)
    })
    listItem.appendChild(deleteButton)

    todoList.appendChild(listItem)
}


todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = todoInput.value
    const id = todoListArray.length + 1

    const todo = {
        id: id,
        title: title,
        checked: false 
    }
    createTodo(todo)
    saveToLocalStorage(todo)
    todoInput.value = ""
})

document.addEventListener('DOMContentLoaded', (e) => {
    loadFromLocalStorage()
})