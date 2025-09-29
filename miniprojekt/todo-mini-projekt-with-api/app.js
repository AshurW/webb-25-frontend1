const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')

// let todoListArray = []

// function saveToLocalStorage(todo) {
//     todoListArray.push(todo)
//     const data = JSON.stringify(todoListArray)
//     localStorage.setItem('todos', data)
// }

// function loadFromLocalStorage() {
//     const todos = localStorage.getItem('todos')
//     if (todos) {
//         todoListArray = JSON.parse(todos)
//         todoListArray.forEach(todo => {
//             createTodo(todo)
//         });
//     }
// }

async function loadTodos() {
    const response = await fetch('http://localhost:8000/todos/')
    const todos = await response.json()
    if (todos) {
        todoList.innerHTML = ""
        todos.forEach(todo => {
            createTodo(todo)
        });
    }
}

async function postTodo(todo) {
    const response = await fetch('http://localhost:8000/todos/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    await loadTodos()
}

async function updateTodo(id, payload) {
    const response = await fetch(`http://localhost:8000/todos/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    await loadTodos()
}

async function deleteTodo(id) {
    const response = await fetch(`http://localhost:8000/todos/${id}/`, {
        method: "DELETE"
    })
    await loadTodos()
}


function createTodo(todo) {
    const listItem = document.createElement('li')
    listItem.id = todo.id ?? 0
    listItem.className = 'list-container'
    
    const checkboxInput = document.createElement('input')
    checkboxInput.type = 'checkbox'
    if (todo.completed) {
        checkboxInput.checked = todo.completed
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
        todo.completed = isChecked
        updateTodo(todoId, todo)
        
        // const todoId = Number(parent.id)
        // todoListArray.forEach(todo => {
        //     if (todo.id === todoId) {
        //        todo.checked = isChecked 
        //     }
        // });
        // const data = JSON.stringify(todoListArray)
        // localStorage.setItem('todos', data)
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
        deleteTodo(todoId)
        // parent.remove()
        // todoListArray = todoListArray.filter(todo => todo.id !== todoId)
        // const data = JSON.stringify(todoListArray)
        // localStorage.setItem('todos', data)
    })
    listItem.appendChild(deleteButton)

    todoList.appendChild(listItem)
}


todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = todoInput.value

    const todo = {
        title: title,
        description: "test desc"
    }
    // createTodo(todo)
    // saveToLocalStorage(todo)
    postTodo(todo)
    todoInput.value = ""
})

document.addEventListener('DOMContentLoaded', (e) => {
    // loadFromLocalStorage()
    loadTodos()
})